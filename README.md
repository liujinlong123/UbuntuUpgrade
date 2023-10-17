# Ubuntu升级

## 软件升级

1. chrome升级[chrome](https://www.google.cn/intl/zh-CN/chrome/)
2. vscode[链接](https://code.visualstudio.com/)
3. 卸载Firefox `sudo snap remove firefox`
4. 截图工具Flameshot `sudo apt intall flameshot`
5. 图像裁剪GIMP `sudo apt install gimp`
6. 画图工具 [Krita](https://krita.org/zh/) `sudo apt install krita` [KDE工具](https://kde.org/zh-cn/)
7. 视频剪辑 [Kdenlive](https://kdenlive.org/zh/) `sudo apt install kdenlive` [KDE工具](https://kde.org/zh-cn/)
8. PDF标注工具 [Okular](https://apps.kde.org/zh-cn/okular/) `sudo apt intall okular` [KDE工具](https://kde.org/zh-cn/)
9. U盘制作工具 [Startup Disk Creator](https://en.wikipedia.org/wiki/Startup_Disk_Creator) `sudo apt install usb-creator-gtk`
10. 复制到剪切板 `sudo apt install xsel` e.g `pwd | xsel -b`
11. 键盘改键工具 [The via](https://github.com/the-via/releases/releases)


### 输入法设置

1. [中州韵](https://rime.im/)输入法
2. 安装 [fcitx](https://github.com/fcitx/fcitx-rime) `sudo apt install fcitx-rime`
3. 打开 `fcitx 配置`, 需要退出登录

### Android Studio设置

1. 下载程序包
2. android studio 安装路径 `/opt/android-studio`
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
4. 使用 `tweaks` 进行更改

### 顶栏优化

1. 下载 `gnome` 扩展 `sudo apt install gnome-shell-extensions`
2. 下载 [unite-shell](https://github.com/liujinlong123/unite-shell)
3. 下载 `unite-shell.zip` 文件后, 使用 `gnome-extensions install unite-shell.zip` 加载扩展
4. 加载成功后会在 `~/.local/share/gnome-shell/extensions` 文件夹下
    ```shell
    mk@m:~/.local/share/gnome-shell/extensions$ ls
    gestureImprovements@gestures  gsconnect@andyholmes.github.io  hidebook@aiden.com  unite@hardpixel.eu
    ```
5. 需要打开扩展使其生效
   + 或者使用 `gnome-extensions enable unite@hardpixel.eu` 使其生效

## 其他软件更新

### [Gsconnect](https://github.com/GSConnect/gnome-shell-extension-gsconnect/wiki)

1. 下载压缩包[地址](https://extensions.gnome.org/extension/1319/gsconnect/)
2. [安装](https://github.com/GSConnect/gnome-shell-extension-gsconnect/wiki/Installation#standard): `gnome-extensions install --force gsconnect@andyholmes.github.io.zip`
3. 手机应用 [KDE Connect](https://github.com/KDE/kdeconnect-android) 项目

### [Ubuntu 手势](https://github.com/harshadgavali/gnome-gesture-improvements)

1. 下载压缩包[地址](https://extensions.gnome.org/extension/4245/gesture-improvements/)
2. 安装 `gnome-extensions install gestureImprovements@gestures.zip`

### ProxyChains

1. 下载 `sudo apt install proxychains4`
2. 配置 `/etc/proxychains.conf`
    ```bash
    [ProxyList]
    # add proxy here ...
    # meanwile
    # defaults set to "tor"
    socks4 	127.0.0.1 1081
    socks5  127.0.0.1 1081
    http    127.0.0.1 8001
    ```
3. 使用 `proxychains4 flutter pub get`

### Vim - Tab设置4个空格
1. 在`/etc/vim/vimrc`中补充
    ```bash
    set ts=4
    set softtabstop=4
    set shiftwidth=4
    set expandtab
    set autoindent
    ```

### 抓包工具 [mitmproxy](https://mitmproxy.org/)

1. 下载后导入环境变量

### 图片OCR [Tesseract](https://github.com/tesseract-ocr/tesseract)

1. [如何安装](https://tesseract-ocr.github.io/tessdoc/Installation.html)
    ```bash
    sudo apt install tesseract-ocr
    sudo apt install libtesseract-dev
    ```

2. [如何使用](https://tesseract-ocr.github.io/tessdoc/Command-Line-Usage.html)
    ```bash
    tesseract 0001.png/jpg output
    ```

### PDF转换为图片 [pdftoppm](https://ubunlog.com/zh-CN/pdftoppm-%E5%B0%86-pdf-%E6%96%87%E4%BB%B6%E8%BD%AC%E6%8D%A2%E4%B8%BA%E5%9B%BE%E5%83%8F/)

1. 如何安装
    ```bash
    sudo apt install poppler-utils
    ```

2. 如何使用
    ```bash
    pdftoppm -png ../ATMEGA48A.PDF output
    ```

3. 输出结果
    ```bash
    $ls
    output-01.png  output-03.png  output-05.png  output-07.png  output-09.png  output-11.png  output-13.png  output-15.png  output-17.png  output-19.png  output-21.png  output-23.png  output-25.png  output-27.png  output-29.png  output-31.png  output-02.png  output-04.png  output-06.png  output-08.png  output-10.png  output-12.png  output-14.png  output-16.png  output-18.png  output-20.png  output-22.png  output-24.png  output-26.png  output-28.png  output-30.png  output-32.png
    ```


## 配置文件

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

### VScode 禁止GPU加速 (防闪屏)

1. 修改启动文件 `/usr/share/applications/code.desktop`
2. 在 `Exec=/usr/share/code/code --unity-launch --disable-gpu %F` 后补充 `--disable-gpu`

```bash
aw@m:~/Downloads$ cat /usr/share/applications/code.desktop

[Desktop Entry]
Name=Visual Studio Code
Comment=Code Editing. Redefined.
GenericName=Text Editor
Exec=/usr/share/code/code --unity-launch --disable-gpu %F
Icon=vscode
Type=Application
StartupNotify=false
StartupWMClass=Code
Categories=TextEditor;Development;IDE;
MimeType=text/plain;inode/directory;application/x-code-workspace;
Actions=new-empty-window;
Keywords=vscode;

[Desktop Action new-empty-window]
Name=New Empty Window
Exec=/usr/share/code/code --new-window --disable-gpu %F
Icon=vscode

aw@m:~/Downloads
```

## Android 应用

1. [USB 连接网络](https://github.com/Genymobile/gnirehtet)
2. [隐私合规检测](https://github.com/zhengjim/camille)

