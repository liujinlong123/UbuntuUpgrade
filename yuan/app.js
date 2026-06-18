(() => {
  "use strict";

  const config = window.YUAN_CONFIG;
  const PX_PER_CM = config.coordinateDpi / 2.54;
  const PX_PER_MM = config.coordinateDpi / 25.4;
  const state = {
    tables: [], selected: 0, matrix: [], mapped: null, sourceName: "",
    gap: config.defaultCellGapPx, margin: config.defaultOuterMarginPx,
    splitBaseline: null, splitBaselineSelected: 0
  };
  const $ = (id) => document.getElementById(id);
  const ui = {
    fileInput: $("fileInput"), dropZone: $("dropZone"), fileRow: $("fileRow"),
    fileName: $("fileName"), fileMeta: $("fileMeta"), replaceButton: $("replaceButton"), notice: $("notice"),
    previewSection: $("previewSection"), exportSection: $("exportSection"), tablePickerWrap: $("tablePickerWrap"),
    tablePicker: $("tablePicker"), gapInput: $("gapInput"), marginInput: $("marginInput"),
    splitRowsInput: $("splitRowsInput"), splitButton: $("splitButton"), resetSplitButton: $("resetSplitButton"),
    tablePreview: $("tablePreview"), tableSize: $("tableSize"),
    paperPreview: $("paperPreview"), paperMeta: $("paperMeta"), exportHint: $("exportHint"), downloadButton: $("downloadButton")
  };

  function configureNumberInput(input, range, value) {
    input.min = range.min;
    input.max = range.max;
    input.step = range.step;
    input.value = value;
  }

  configureNumberInput(ui.gapInput, config.cellGapRangePx, state.gap);
  configureNumberInput(ui.marginInput, config.outerMarginRangePx, state.margin);

  function showError(message) {
    ui.notice.textContent = message;
    ui.notice.classList.remove("hidden");
  }

  function clearError() { ui.notice.classList.add("hidden"); }
  function cleanText(value) { return value.replace(/\u00a0/g, " ").replace(/[ \t]+\n/g, "\n").trim(); }

  async function parseDocx(file) {
    const zip = await JSZip.loadAsync(await file.arrayBuffer());
    const documentFile = zip.file("word/document.xml");
    if (!documentFile) throw new Error("该文件不是有效的 DOCX 文档。");
    return parseWordXml(await documentFile.async("text"));
  }

  function directChildren(node, localName) {
    return Array.from(node.childNodes).filter((child) => child.nodeType === 1 && child.localName === localName);
  }

  function cellText(cell) {
    return directChildren(cell, "p").map((paragraph) => {
      const parts = [];
      Array.from(paragraph.getElementsByTagName("*")).filter((node) => ["t", "tab", "br", "cr"].includes(node.localName)).forEach((node) => {
        if (node.localName === "t") parts.push(node.textContent || "");
        else if (node.localName === "tab") parts.push("\t");
        else parts.push("\n");
      });
      return parts.join("");
    }).join("\n");
  }

  function parseWordXml(xml) {
    const doc = new DOMParser().parseFromString(xml, "application/xml");
    if (doc.querySelector("parsererror")) throw new Error("Word XML 内容无法解析。");
    const tables = Array.from(doc.getElementsByTagNameNS("*", "tbl")).map((table) =>
      directChildren(table, "tr").map((row) => directChildren(row, "tc").map(cellText))
    );
    return tables.filter((table) => table.length);
  }

  function parseHtmlOrXml(text) {
    let doc = new DOMParser().parseFromString(text, "text/html");
    let nodes = Array.from(doc.querySelectorAll("table"));
    if (!nodes.length) {
      doc = new DOMParser().parseFromString(text, "application/xml");
      nodes = Array.from(doc.getElementsByTagNameNS("*", "tbl"));
      if (nodes.length) return parseWordXml(text);
    }
    return nodes.map((table) => Array.from(table.rows).map((row) =>
      Array.from(row.cells).map((cell) => cleanText(cell.innerText || cell.textContent || ""))
    )).filter((table) => table.length);
  }

  async function extractTables(file) {
    const bytes = new Uint8Array(await file.slice(0, 8).arrayBuffer());
    const isZip = bytes[0] === 0x50 && bytes[1] === 0x4b;
    const isOle = bytes[0] === 0xd0 && bytes[1] === 0xcf && bytes[2] === 0x11 && bytes[3] === 0xe0;
    if (isZip || file.name.toLowerCase().endsWith(".docx")) return parseDocx(file);
    if (isOle) throw new Error("这是旧版二进制 .doc。纯静态网页无法安全解析该格式，请在 Word/WPS 中“另存为 .docx”后再选择。");
    return parseHtmlOrXml(await file.text());
  }

  async function handleFile(file) {
    if (!file) return;
    clearError();
    ui.fileName.textContent = file.name;
    ui.fileMeta.textContent = `${(file.size / 1024).toFixed(1)} KB · 正在本地解析…`;
    ui.fileRow.classList.remove("hidden");
    ui.dropZone.classList.add("hidden");
    try {
      const tables = await extractTables(file);
      if (!tables.length) throw new Error("文档中没有找到表格。");
      state.tables = tables.map(normalizeTable);
      state.splitBaseline = null;
      state.splitBaselineSelected = 0;
      ui.resetSplitButton.disabled = true;
      state.sourceName = file.name.replace(/\.(docx?|DOCX?)$/, "");
      state.selected = 0;
      ui.fileMeta.textContent = `${(file.size / 1024).toFixed(1)} KB · 找到 ${tables.length} 个表格`;
      populatePicker();
      selectTable(state.selected);
      ui.previewSection.classList.remove("muted");
      ui.exportSection.classList.remove("muted");
    } catch (error) {
      state.tables = [];
      ui.fileMeta.textContent = `${(file.size / 1024).toFixed(1)} KB · 解析失败`;
      showError(error.message || "文件解析失败，请检查文件格式。");
      resetPreview();
    }
  }

  function normalizeTable(table) {
    const cols = Math.max(0, ...table.map((row) => row.length));
    return table.map((row) => Array.from({ length: cols }, (_, index) => row[index] || ""));
  }

  function populatePicker() {
    ui.tablePicker.innerHTML = "";
    state.tables.forEach((table, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = `表格 ${index + 1}（${table.length} × ${Math.max(0, ...table.map((row) => row.length))}）`;
      ui.tablePicker.append(option);
    });
    ui.tablePicker.value = state.selected;
    ui.tablePickerWrap.classList.toggle("hidden", state.tables.length < 2);
  }

  function selectTable(index) {
    state.selected = Number(index);
    state.matrix = normalizeTable(state.tables[state.selected]);
    configureSplitControl();
    renderEditableTable();
    updateMapping();
  }

  function configureSplitControl() {
    const rows = state.matrix.length;
    ui.splitRowsInput.max = Math.max(1, rows - 1);
    ui.splitRowsInput.value = Math.max(1, Math.ceil(rows / 2));
    ui.splitButton.disabled = rows < 2;
  }

  function splitCurrentTable() {
    const rows = state.matrix.length;
    const rowsPerPart = Math.floor(Number(ui.splitRowsInput.value));
    if (!Number.isFinite(rowsPerPart) || rowsPerPart < 1 || rowsPerPart >= rows) {
      showError(`请输入 1 到 ${Math.max(1, rows - 1)} 之间的行数。`);
      return;
    }
    if (!state.splitBaseline) {
      state.splitBaseline = structuredClone(state.tables);
      state.splitBaselineSelected = state.selected;
    }
    const parts = [
      state.matrix.slice(0, rowsPerPart).map((row) => [...row]),
      state.matrix.slice(rowsPerPart).map((row) => [...row])
    ];
    const originalIndex = state.selected;
    state.tables.splice(originalIndex, 1, ...parts);
    ui.resetSplitButton.disabled = false;
    populatePicker();
    selectTable(originalIndex);
    ui.exportHint.textContent = `当前表格已拆分为 ${parts[0].length} 行和 ${parts[1].length} 行；ZIP 现在包含 ${state.tables.length} 个 JSON。`;
  }

  function resetSplits() {
    if (!state.splitBaseline) return;
    state.tables = structuredClone(state.splitBaseline);
    state.selected = Math.min(state.splitBaselineSelected, state.tables.length - 1);
    state.splitBaseline = null;
    ui.resetSplitButton.disabled = true;
    populatePicker();
    selectTable(state.selected);
    ui.exportHint.textContent = `已恢复拆分前的 ${state.tables.length} 张表格。`;
  }

  function renderEditableTable() {
    ui.tablePreview.innerHTML = "";
    const table = document.createElement("table");
    const body = document.createElement("tbody");
    state.matrix.forEach((row, rowIndex) => {
      const tr = document.createElement("tr");
      row.forEach((value, colIndex) => {
        const td = document.createElement("td");
        td.contentEditable = "true";
        td.spellcheck = false;
        td.textContent = value;
        td.setAttribute("aria-label", `第 ${rowIndex + 1} 行，第 ${colIndex + 1} 列`);
        td.addEventListener("input", () => {
          state.matrix[rowIndex][colIndex] = cleanText(td.innerText);
          state.tables[state.selected][rowIndex][colIndex] = state.matrix[rowIndex][colIndex];
          updateMapping();
        });
        tr.append(td);
      });
      body.append(tr);
    });
    table.append(body);
    ui.tablePreview.append(table);
  }

  function createGridModel(matrix, tableIndex = state.selected) {
    const rows = matrix.length;
    const cols = matrix[0]?.length || 0;
    if (!rows || !cols) throw new Error("当前表格没有可导出的单元格。");

    const mapped = structuredClone(window.MODEL_TEMPLATE);
    const pageWidth = Number(mapped.width) * PX_PER_CM;
    const pageHeight = Number(mapped.height) * PX_PER_CM;
    const gap = state.gap;
    const margin = state.margin;
    const cellWidth = (pageWidth - margin * 2 - gap * (cols - 1)) / cols;
    const cellHeight = (pageHeight - margin * 2 - gap * (rows - 1)) / rows;
    if (cellWidth <= 0 || cellHeight <= 0) throw new Error("格间距或四周边距过大，当前表格无法放入写字机边界。");

    const prototype = mapped.items[0] ? structuredClone(mapped.items[0]) : null;
    if (!prototype) throw new Error("model.json 没有可用的文字元素模板。");
    mapped.items = [];
    matrix.forEach((row, rowIndex) => row.forEach((text, colIndex) => {
      const item = structuredClone(prototype);
      item.name = `表格${tableIndex + 1}-R${rowIndex + 1}C${colIndex + 1}`;
      item.text = text;
      item.rotation = 0;
      item.x = margin + colIndex * (cellWidth + gap);
      item.y = margin + rowIndex * (cellHeight + gap);
      item.width = cellWidth;
      item.height = cellHeight;
      item.pageInfo.rotation = 0;
      item.pageInfo.pageWidth = cellWidth / PX_PER_MM;
      item.pageInfo.pageHeight = cellHeight / PX_PER_MM;
      mapped.items.push(item);
    }));
    return mapped;
  }

  function updateMapping() {
    const rows = state.matrix.length;
    const cols = Math.max(0, ...state.matrix.map((row) => row.length));
    ui.tableSize.textContent = `${rows} 行 × ${cols} 列`;
    try {
      state.mapped = createGridModel(state.matrix);
      clearError();
      ui.paperMeta.textContent = `model.json · ${rows} × ${cols} · 间距 ${state.gap}px · 边距 ${state.margin}px`;
      const totalItems = state.tables.reduce((sum, table) => sum + table.length * (table[0]?.length || 0), 0);
      ui.exportHint.textContent = `将把 ${state.tables.length} 张表格打包为 ZIP，共生成 ${totalItems} 个定位元素。`;
      ui.downloadButton.disabled = false;
      renderPaper(state.mapped);
    } catch (error) {
      state.mapped = null;
      showError(error.message);
      ui.downloadButton.disabled = true;
      renderPaper(null);
    }
  }

  function renderPaper(model) {
    ui.paperPreview.innerHTML = "";
    if (!model) {
      const empty = document.createElement("div");
      empty.className = "empty";
      empty.textContent = "选择表格后显示版面";
      ui.paperPreview.append(empty);
      return;
    }
    const maxX = Number(model.width) * PX_PER_CM;
    const maxY = Number(model.height) * PX_PER_CM;
    model.items.forEach((item) => {
      const element = document.createElement("div");
      element.className = "paper-item";
      element.style.left = `${item.x / maxX * 100}%`;
      element.style.top = `${item.y / maxY * 100}%`;
      element.style.width = `${item.width / maxX * 100}%`;
      element.style.height = `${item.height / maxY * 100}%`;
      element.style.transform = `rotate(${item.rotation || 0}deg)`;
      element.textContent = item.text;
      element.title = `${item.name}: ${item.text}`;
      ui.paperPreview.append(element);
    });
  }

  function resetPreview() {
    state.matrix = [];
    state.mapped = null;
    ui.previewSection.classList.add("muted");
    ui.exportSection.classList.add("muted");
    ui.tablePreview.innerHTML = '<div class="empty">选择有效 Word 文件后显示表格</div>';
    ui.tableSize.textContent = "等待文件";
    ui.paperMeta.textContent = "model.json · 等待文件";
    ui.splitRowsInput.value = "";
    ui.splitButton.disabled = true;
    ui.resetSplitButton.disabled = true;
    renderPaper(null);
    ui.exportHint.textContent = "选择含表格的 Word 文件后即可打包导出。";
    ui.downloadButton.disabled = true;
  }

  async function downloadAllJson() {
    if (!state.tables.length) return;
    const originalLabel = ui.downloadButton.innerHTML;
    ui.downloadButton.disabled = true;
    ui.downloadButton.textContent = "正在生成 ZIP…";
    const zip = new JSZip();
    state.tables.forEach((table, index) => {
      const model = createGridModel(table, index);
      zip.file(`${state.sourceName || "mapped"}-表格${index + 1}.json`, JSON.stringify(model, null, 2));
    });
    const blob = await zip.generateAsync({
      type: "blob", compression: "DEFLATE",
      compressionOptions: { level: config.zipCompressionLevel }
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${state.sourceName || "mapped"}-全部表格.zip`;
    link.click();
    URL.revokeObjectURL(url);
    ui.downloadButton.innerHTML = originalLabel;
    ui.downloadButton.disabled = false;
  }

  ui.fileInput.addEventListener("change", () => handleFile(ui.fileInput.files[0]));
  ui.replaceButton.addEventListener("click", () => {
    ui.fileInput.value = "";
    ui.fileInput.click();
  });
  ui.tablePicker.addEventListener("change", () => selectTable(ui.tablePicker.value));
  ui.splitButton.addEventListener("click", splitCurrentTable);
  ui.resetSplitButton.addEventListener("click", resetSplits);
  ui.gapInput.addEventListener("input", () => {
    state.gap = Math.min(config.cellGapRangePx.max, Math.max(config.cellGapRangePx.min, Number(ui.gapInput.value) || 0));
    if (state.matrix.length) updateMapping();
  });
  ui.marginInput.addEventListener("input", () => {
    state.margin = Math.min(config.outerMarginRangePx.max, Math.max(config.outerMarginRangePx.min, Number(ui.marginInput.value) || 0));
    if (state.matrix.length) updateMapping();
  });
  ui.downloadButton.addEventListener("click", () => downloadAllJson().catch((error) => {
    showError(`ZIP 生成失败：${error.message}`);
    ui.downloadButton.innerHTML = '下载全部 JSON（ZIP） <span>↓</span>';
    ui.downloadButton.disabled = false;
  }));
  ["dragenter", "dragover"].forEach((event) => ui.dropZone.addEventListener(event, (e) => {
    e.preventDefault(); ui.dropZone.classList.add("dragging");
  }));
  ["dragleave", "drop"].forEach((event) => ui.dropZone.addEventListener(event, (e) => {
    e.preventDefault(); ui.dropZone.classList.remove("dragging");
  }));
  ui.dropZone.addEventListener("drop", (event) => handleFile(event.dataTransfer.files[0]));
})();
