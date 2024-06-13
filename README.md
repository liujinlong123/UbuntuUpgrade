# Ubuntu升级

## 系统安装

### 系统分区

1. `/boot` 1GB
2. `Swap(交换分区)` 内存大小 x 1G
3. `/` 120GB
4. `/home` 剩余空间

### 自动挂载硬盘

1. `sudo blkid` 用于查看硬盘的 `uuid`
    ```shell
    aw@m:~/Downloads$ sudo blkid 
    /dev/nvme0n1p3: UUID="8d92c69c-7627-42ba-89f7-f0400340d7ec" TYPE="swap"
    /dev/sda1: UUID="a4b4a34b-4f0f-4851-b92c-c5b150b46dc9" BLOCK_SIZE="4096" TYPE="ext4"    PARTUUID="d70e9bd1-cd5f-4e0e-9bde-5a1bb13e9463"
    ```

2. 修改配置文件 `sudo vim /etc/fstab`
    ```shell
    # /etc/fstab: static file system information.
    #
    # Use 'blkid' to print the universally unique identifier for a
    # device; this may be used with UUID= as a more robust way to name devices
    # that works even if disks are added and removed. See fstab(5).
    #
    # <file system> <mount point>   <type>  <options>       <dump>  <pass>
    /dev/disk/by-uuid/8d92c69c-7627-42ba-89f7-f0400340d7ec none swap sw 0 0
    # / was on /dev/nvme0n1p4 during curtin installation
    /dev/disk/by-uuid/59829dfe-2550-4a3c-8627-d8f600bc817d / ext4 defaults 0 1
    # /home was on /dev/nvme0n1p5 during curtin installation
    /dev/disk/by-uuid/05ca2a21-1376-4005-b17c-7eaba6f285b4 /home ext4 defaults 0 1
    # /boot was on /dev/nvme0n1p1 during curtin installation
    /dev/disk/by-uuid/c7d7946c-6d77-4122-8a1d-c7414330a0ff /boot ext4 defaults 0 1
    # /boot/efi was on /dev/nvme0n1p2 during curtin installation
    /dev/disk/by-uuid/5BF7-95FA /boot/efi vfat defaults 0 1
    # /home/aw/backup
    /dev/disk/by-uuid/a4b4a34b-4f0f-4851-b92c-c5b150b46dc9 /home/aw/backup ext4 defaults 0 2
    ```

3. 最后一行 `/dev/disk/by-uuid/a4b4a34b-4f0f-4851-b92c-c5b150b46dc9 /home/aw/backup ext4 defaults 0 2` 是我们补充的, 其中第一个数字: 0表示开机不检查磁盘, 1表示开机检查磁盘; 第二个数字: 0表示交换分区, 1代表启动分区（Linux）, 2表示普通分区。

4. 设置好后务必执行 `sudo mount -a` 检查是否配置正确, 否则开机会出现黑屏

5. 重启

## 软件升级

### 基本软件安装

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

#### 新版本输入法

1. 新版本 `Ubuntu 23.10` 开始会自动安装 [`fcitx 5`](https://github.com/fcitx/fcitx5), 可以在设置中全局切换为 `fcitx`; 新版本的中文输入法支持联想功能, 使用舒适度上超过了 `中州韵` 输入法。

#### 已废弃

1. [中州韵](https://rime.im/) 输入法
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

1. 下载安装 [VirtualBox](https://www.virtualbox.org/)
2. 下载安装扩展 [Oracle VM VirtualBox Extension Pack](https://www.virtualbox.org/wiki/Downloads)
3. 如果显示不全，可以调节 `显存大小`

## 主题优化

### 主题、图标等更换

1. 下载gnome-tweaks `sudo apt install gnome-tweaks`
2. 下载扩展管理工具 gnome-shell-extensions `sudo apt install gnome-shell-extensions`
3. 主题`theme`更换位置
   + 用户目录 `~/.themes`
   + 根目录 `/usr/share/themes`
4. 图标`icon`更换位置
   + 用户目录 `~/.icons`
   + 根目录 `/usr/share/icons`
5. 使用 `tweaks` 进行更改

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

### KiCAD

1. [如何下载 `3D Models`](https://kicad.github.io/packages3d/)
    ```bash
    git clone https://gitlab.com/kicad/libraries/kicad-packages3D.git
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

## 问题解决

### [Ubuntu boot 空间不足解决方法](https://blog.csdn.net/BIT_HXZ/article/details/127305912)

1. 查看当前使用内核版本号 `uname -a`
    ```bash
    aw@mk:~/Downloads$ uname -a

    Linux mk 6.5.0-10-generic #10-Ubuntu SMP PREEMPT_DYNAMIC Fri Oct 13 13:49:38 UTC 2023 x86_64 x86_64 x86_64 GNU/Linux
    ```

2. 终端下查看已经安装的旧的内核 `dpkg --get-selections | grep linux-image`
    ```bash
    aw@mk:~/Downloads$ dpkg --get-selections | grep linux-image

    linux-image-6.5.0-10-generic			install
    linux-image-6.5.0-9-generic			deinstall
    ```

3. 删除操作其他不需要的内核 `sudo apt-get remove linux-image-(版本号)`

4. 下次分区的时候 `boot` 分区多分一点 `1G` 左右。

## Android 应用

1. [USB 连接网络](https://github.com/Genymobile/gnirehtet)
2. [隐私合规检测](https://github.com/zhengjim/camille)

