# Ubuntu升级

## 软件升级

1. chrome升级[chrome](https://www.google.cn/intl/zh-CN/chrome/)
2. vscode[链接](https://code.visualstudio.com/)
3. 卸载Firefox `sudo snap remove firefox`
4. 截图工具Flameshot `sudo apt intall flameshot`
5. 图像裁剪GIMP `sudo apt install gimp`
6. 画图工具[Krita](https://krita.org/zh/) `sudo apt install krita` [KDE工具](https://kde.org/zh-cn/)
7. 视频剪辑[Kdenlive](https://kdenlive.org/zh/) `sudo apt install kdenlive` [KDE工具](https://kde.org/zh-cn/)
8. PDF标注工具[Okular](https://apps.kde.org/zh-cn/okular/) `sudo apt intall okular` [KDE工具](https://kde.org/zh-cn/)
9. U盘制作工具[Startup Disk Creator](https://en.wikipedia.org/wiki/Startup_Disk_Creator) `sudo apt install usb-creator-gtk`


### 输入法设置

1. [中州韵](https://rime.im/)输入法
2. 安装[fcitx](https://github.com/fcitx/fcitx-rime) `sudo apt install fcitx-rime`
3. 打开`fcitx 配置`, 需要退出登录

### Android Studio设置

1. 下载程序包
2. android studio 安装路径`/opt/android-studio`
    ```shell
    aw@m:/opt$ ls -lhia
    总用量 16K
    7995393 drwxr-xr-x  4 root root 4.0K  6月 21 15:22 .
          2 drwxr-xr-x 20 root root 4.0K  6月 21 16:43 ..
    7995495 drwxrwxr-x  7 aw   aw   4.0K  1月  1  2010 android-studio
    7995394 drwxr-xr-x  3 root root 4.0K  6月 21 14:46 google
    aw@m:/opt$
    ```

### VirtualBox

1. 下载安装[VirtualBox](https://www.virtualbox.org/)
2. 下载安装扩展[Oracle VM VirtualBox Extension Pack](https://www.virtualbox.org/wiki/Downloads)
3. 如果显示不全，可以调节`显存大小`

## 主题优化

### 主题、图标等更换

1. 下载gnome-tweaks `sudo apt install gnome-tweaks`
2. 主题`theme`更换位置
   + 用户目录 `~/.themes`
   + 根目录 `/usr/share/themes`
3. 图标`icon`更换位置
   + 用户目录 `~/.icons`
   + 根目录 `/usr/share/icons`
4. 使用`tweaks`进行更改

### 顶栏优化

1. 下载顶栏扩展 `sudo apt install gnome-shell-extensions`
2. 下载[unite-shell](https://github.com/liujinlong123/unite-shell)
3. 后面补充图片


## 其他软件更新

### Latex

### Unity安装

### [Gsconnect](https://github.com/GSConnect/gnome-shell-extension-gsconnect/wiki)

1. 下载压缩包[地址](https://extensions.gnome.org/extension/1319/gsconnect/)
2. [安装](https://github.com/GSConnect/gnome-shell-extension-gsconnect/wiki/Installation#standard): `gnome-extensions install --force gsconnect@andyholmes.github.io`

## 配置文件

### Vscode 配置文件
```json
{
    "editor.suggestSelection": "first",
    "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",
    "editor.fontSize": 16,
    "java.imports.gradle.wrapper.checksums": [
        {
            "sha256": "e2b82129ab64751fd40437007bd2f7f2afb3c6e41a9198e628650b22d5824a14",
            "allowed": true
        }
    ],
    "files.exclude": {
        "**/.classpath": true,
        "**/.factorypath": true,
        "**/.localhooks": true,
        "**/.project": true,
        "**/.settings": true
    },
    "java.semanticHighlighting.enabled": true,
    "C_Cpp.default.includePath": [
        "${JAVA_HOME}/include",
        "${JAVA_HOME}/include/linux"
    ],
    "python.languageServer": "Pylance",
    "editor.formatOnType": true,
    "editor.formatOnSave": false,
    "editor.minimap.enabled": false,
    "cmake.configureOnOpen": true,
    "code-runner.runInTerminal": true,
    "security.workspace.trust.untrustedFiles": "open",
    "go.toolsManagement.autoUpdate": true,
    "latex-workshop.view.pdf.viewer": "tab",
    "latex-workshop.latex.autoClean.run": "onBuilt",
    "latex-workshop.latex.recipes": [
        // 中文
        // {
        //     "name": "xelatex -> bibtex -> xelatex*2",
        //     "tools": [
        //         "xelatex",
        //         "bibtex",
        //         "xelatex",
        //         "xelatex"
        //     ]
        // },
        {
            "name": "pdflatex -> bibtex -> pdflatex*2",
            "tools": [
                "pdflatex",
                "bibtex",
                "pdflatex",
                "pdflatex"
            ]
        },
        {
            "name": "xelatex",
            "tools": [
                "xelatex"
            ]
        },
        {
            "name": "latexmk",
            "tools": [
                "latexmk"
            ]
        },
    ],
    "latex-workshop.latex.tools": [
        {
            "name": "pdflatex",
            "command": "pdflatex",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "%DOC%"
            ]
        },
        {
            "name": "latexmk",
            "command": "latexmk",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "-pdf",
                "%DOC%"
            ]
        },
        {
            "name": "xelatex",
            "command": "xelatex",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "%DOC%"
            ]
        },
        {
            "name": "bibtex",
            "command": "bibtex",
            "args": [
                "%DOCFILE%"
            ]
        }
    ],
    "latex-workshop.latex.clean.fileTypes": [
        "*.aux",
        "*.bbl",
        "*.blg",
        "*.idx",
        "*.ind",
        "*.lof",
        "*.lot",
        "*.out",
        "*.toc",
        "*.acn",
        "*.acr",
        "*.alg",
        "*.glg",
        "*.glo",
        "*.gls",
        "*.ist",
        "*.fls",
        "*.log",
        "*.fdb_latexmk",
        "*.gz"
    ],
    "editor.wordWrap": "wordWrapColumn",
    "editor.wordWrapColumn": 120,
    "redhat.telemetry.enabled": true,
    "omnisharp.useGlobalMono": "always",
    "omnisharp.useModernNet": false,
    "window.titleBarStyle": "custom",
    // "omnisharp.path": "latest",
}
```


### shell配置文件

```bash
# flutter国内镜像
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn

export PATH=$JAVA_HOME/bin:/home/aw/Android/Sdk/platform-tools:/home/aw/Android/Sdk/build-tools/33.0.0:/home/aw/works/script/command:/home/aw/Android/flutter_linux_3.0.2-stable/flutter/bin:$PATH
```

### Ubuntu设置apt代理

```bash
aw@m:/etc/apt/apt.conf.d$ cat proxy.conf 
Acquire {
  HTTP::proxy "http://127.0.0.1:8001";
  HTTPS::proxy "http://127.0.0.1:8001";
}

aw@m:/etc/apt/apt.conf.d$
```
