// 页面可调配置。修改后刷新 index.html 即可生效。
window.YUAN_CONFIG = {
  // 单元格之间的默认间距（像素）
  defaultCellGapPx: 12,

  // 页面上、下、左、右的默认边距（像素）
  defaultOuterMarginPx: 30,

  // 输入框允许设置的范围
  cellGapRangePx: { min: 0, max: 50, step: 1 },
  outerMarginRangePx: { min: 0, max: 100, step: 1 },

  // model.json 的厘米尺寸转换为写字机坐标时采用的 DPI
  coordinateDpi: 96,

  // ZIP 压缩等级：0 表示不压缩，9 表示最高压缩
  zipCompressionLevel: 6
};
