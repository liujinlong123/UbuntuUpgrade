# Ubuntu 升级与重装手册

这是我自己在 Ubuntu 系统升级或重装后使用的一份个人文档，目标是把常用操作整理成一份可重复执行的清单。

适用场景：

- 新机器装 Ubuntu
- 老机器重装系统
- 大版本升级后补齐软件、开发环境和桌面配置

## 快速执行顺序

建议按下面顺序处理，避免遗漏：

1. 系统安装与分区
2. 磁盘挂载与开机检查
3. 基础软件安装
4. 输入法与开发环境
5. GNOME / 桌面优化
6. 代理与配置文件恢复
7. 常用工具补齐
8. 问题排查

## 1. 系统安装

### 1.1 推荐分区方案

- `/boot`：1GB
- `Swap`：内存大小 x 2
- `/`：120GB
- `/home`：剩余空间

### 1.2 自动挂载硬盘

#### 第一步：查看磁盘 UUID

执行 `sudo blkid`：

```shell
aw@m:~/Downloads$ sudo blkid
/dev/nvme0n1p3: UUID="8d92c69c-7627-42ba-89f7-f0400340d7ec" TYPE="swap"
/dev/sda1: UUID="a4b4a34b-4f0f-4851-b92c-c5b150b46dc9" BLOCK_SIZE="4096" TYPE="ext4" PARTUUID="d70e9bd1-cd5f-4e0e-9bde-5a1bb13e9463"
```

#### 第二步：修改 `/etc/fstab`

编辑文件：

```shell
sudo vim /etc/fstab
```

参考配置：

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

补充说明：

- 最后一行 `/dev/disk/by-uuid/a4b4a34b-4f0f-4851-b92c-c5b150b46dc9 /home/aw/backup ext4 defaults 0 2` 是额外挂载的数据盘。
- 第 5 列含义：`0` 表示开机不做 dump 检查。
- 第 6 列含义：`0` 表示不做 fsck，`1` 常用于系统启动分区，`2` 常用于普通分区。

> 修改完 `fstab` 后务必执行 `sudo mount -a`。如果配置错误，重启后可能直接黑屏或无法进入系统。

#### 第三步：验证并重启

```shell
sudo mount -a
```

确认无报错后再重启。

## 2. 基础软件安装

### 2.1 常用软件

#### 浏览器与编辑器

1. Chrome：[下载链接](https://www.google.cn/intl/zh-CN/chrome/)
2. VS Code：[下载链接](https://code.visualstudio.com/)
3. Cursor：[下载链接](https://cursor.com/cn/download)
4. 卸载 Firefox：`sudo snap remove firefox`

#### 截图、图像与视频工具

1. [Flameshot](https://flameshot.org/)
2. GIMP：`sudo apt install gimp`
3. [Krita](https://krita.org/zh/)：`sudo apt install krita`
4. [Kdenlive](https://kdenlive.org/zh/)：`sudo apt install kdenlive`
5. [Okular](https://apps.kde.org/zh-cn/okular/)：`sudo apt install okular`

补充说明：

- Flameshot 现在用 `apt` 安装可能不可用，直接下载 `AppImage` 更稳。
- 我自己的启动脚本如下：

```shell
#! /bin/bash

/home/aw/works/scripts/bin/Flameshot-12.1.0.x86_64.AppImage gui
```

- 截图快捷键可设置为 `Alt + S`。

#### 系统与效率工具

1. U 盘启动盘工具 [Startup Disk Creator](https://en.wikipedia.org/wiki/Startup_Disk_Creator)
  `sudo apt install usb-creator-gtk`
2. 剪贴板命令行工具 `xsel`
  `sudo apt install xsel`
   示例：`pwd | xsel -b`
3. 键盘改键工具 [The via](https://github.com/the-via/releases/releases)
4. 代理客户端 [clash-verge-rev](https://github.com/clash-verge-rev/clash-verge-rev?tab=readme-ov-file)

#### 办公与通信

1. 飞书：[下载链接](https://www.feishu.cn/download)
2. 微信：[下载链接](https://weixin.qq.com/)
3. WPS：[下载链接](https://platform.wps.cn/)

### 2.2 Node / Codex 环境

安装 [NVM](https://github.com/nvm-sh/nvm)：

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash

nvm install --lts

npm install -g @openai/codex
npm install -g @openai/codex oh-my-codex
```

## 3. 输入法与开发环境

### 3.1 输入法

#### 当前方案

- 从 `Ubuntu 23.10` 开始通常会自动安装 `[fcitx 5](https://github.com/fcitx/fcitx5)`。
- 可以在系统设置中把默认输入法框架切换成 `fcitx`。
- 新版本中文输入体验明显比以前的 `Rime` / `中州韵` 更顺手，联想也更完整。

#### 旧方案记录（已废弃）

1. [中州韵](https://rime.im/)
2. 安装 `fcitx-rime`：
  `sudo apt install fcitx-rime`
3. 打开 `fcitx` 配置，之后退出登录再重新进入

### 3.2 Android Studio

1. 下载官方程序包
2. 安装目录放在 `/opt/android-studio`

目录示例：

```shell
aw@m:/opt$ ls -lhia
总用量 16K
7995393 drwxr-xr-x  4 root root 4.0K  6月 21 15:22 .
      2 drwxr-xr-x 20 root root 4.0K  6月 21 16:43 ..
7995495 drwxrwxr-x  7 aw   aw   4.0K  1月  1  2010 android-studio
7995394 drwxr-xr-x  3 root root 4.0K  6月 21 14:46 google
aw@m:/opt$
```

### 3.3 VirtualBox

1. 安装 [VirtualBox](https://www.virtualbox.org/)
2. 安装 [Oracle VM VirtualBox Extension Pack](https://www.virtualbox.org/wiki/Downloads)
3. 如果虚拟机显示不全，可以适当调高 `显存大小`

## 4. GNOME / 桌面优化

### 4.1 主题与图标

1. 安装 `gnome-tweaks`
  `sudo apt install gnome-tweaks`
2. 安装扩展管理工具 `gnome-shell-extensions`
  `sudo apt install gnome-shell-extensions`
3. 主题目录：
  - 用户目录 `~/.themes`
  - 系统目录 `/usr/share/themes`
4. 图标目录：
  - 用户目录 `~/.icons`
  - 系统目录 `/usr/share/icons`
5. 使用 `Tweaks` 进行切换
6. 使用 [Tela](https://github.com/vinceliuice/Tela-icon-theme)

### 4.2 顶栏优化

1. 安装 GNOME 扩展支持：
  `sudo apt install gnome-shell-extensions`
2. 下载 [unite-shell](https://github.com/liujinlong123/unite-shell)
3. 安装扩展：
  `gnome-extensions install unite-shell.zip`
4. 安装成功后，一般会出现在 `~/.local/share/gnome-shell/extensions`

```shell
mk@m:~/.local/share/gnome-shell/extensions$ ls
gestureImprovements@gestures  gsconnect@andyholmes.github.io  hidebook@aiden.com  unite@hardpixel.eu
```

1. 启用扩展：
  `gnome-extensions enable unite@hardpixel.eu`

### 4.3 GSConnect

1. 项目说明：[GSConnect Wiki](https://github.com/GSConnect/gnome-shell-extension-gsconnect/wiki)
2. 扩展下载：[地址](https://extensions.gnome.org/extension/1319/gsconnect/)
3. 安装命令：
  `gnome-extensions install --force gsconnect@andyholmes.github.io.zip`
4. 手机端使用 [KDE Connect](https://github.com/KDE/kdeconnect-android)

### 4.4 触控板手势

1. 项目：[Ubuntu 手势改进](https://github.com/harshadgavali/gnome-gesture-improvements)
2. 扩展下载：[地址](https://extensions.gnome.org/extension/4245/gesture-improvements/)
3. 安装命令：
  `gnome-extensions install gestureImprovements@gestures.zip`

## 5. 代理与常用配置

### 5.1 ProxyChains

安装：

```bash
sudo apt install proxychains4
```

配置 `/etc/proxychains.conf`：

```bash
[ProxyList]
# add proxy here ...
# meanwile
# defaults set to "tor"
socks4  127.0.0.1 1081
socks5  127.0.0.1 1081
http    127.0.0.1 8001
```

示例：

```bash
proxychains4 flutter pub get
```

### 5.2 APT 代理

在 `/etc/apt/apt.conf.d/proxy.conf` 中配置：

```bash
Acquire {
  HTTP::proxy "http://127.0.0.1:8001";
  HTTPS::proxy "http://127.0.0.1:8001";
}
```

### 5.3 Shell 环境变量

```bash
# flutter 国内镜像
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn

export PATH=$JAVA_HOME/bin:/home/aw/Android/Sdk/platform-tools:/home/aw/Android/Sdk/build-tools/33.0.0:/home/aw/works/script/command:/home/aw/Android/flutter_linux_3.0.2-stable/flutter/bin:$PATH
```

### 5.4 Vim 设置为 4 空格缩进

在 `/etc/vim/vimrc` 中补充：

```bash
set ts=4
set softtabstop=4
set shiftwidth=4
set expandtab
set autoindent
```

### 5.5 VS Code 禁用 GPU 加速

适用于 VS Code 闪屏场景。

1. 修改启动文件 `/usr/share/applications/code.desktop`
2. 在 `Exec` 后追加 `--disable-gpu`

参考内容：

```bash
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
```

## 6. 常用工具补充

### 6.1 抓包工具

- [mitmproxy](https://mitmproxy.org/)
- 下载后记得加入环境变量
- 设置快捷键
```yaml
  aw@m:~/.mitmproxy$ cat keys.yaml 
  
  -
  key: c
  cmd: export.clip curl @focus
  help: Copy focused flow as cURL

  aw@m:~/.mitmproxy$
```

### 6.2 图片 OCR

项目：[Tesseract](https://github.com/tesseract-ocr/tesseract)

安装：

```bash
sudo apt install tesseract-ocr
sudo apt install libtesseract-dev
```

使用：

```bash
tesseract 0001.png/jpg output
```

### 6.3 PDF 转图片

工具：[pdftoppm](https://ubunlog.com/zh-CN/pdftoppm-%E5%B0%86-pdf-%E6%96%87%E4%BB%B6%E8%BD%AC%E6%8D%A2%E4%B8%BA%E5%9B%BE%E5%83%8F/)

安装：

```bash
sudo apt install poppler-utils
```

使用：

```bash
pdftoppm -png ../ATMEGA48A.PDF output
```

输出示例：

```bash
$ ls
output-01.png  output-03.png  output-05.png  output-07.png  output-09.png  output-11.png  output-13.png  output-15.png  output-17.png  output-19.png  output-21.png  output-23.png  output-25.png  output-27.png  output-29.png  output-31.png  output-02.png  output-04.png  output-06.png  output-08.png  output-10.png  output-12.png  output-14.png  output-16.png  output-18.png  output-20.png  output-22.png  output-24.png  output-26.png  output-28.png  output-30.png  output-32.png
```

### 6.4 KiCad

下载 3D 模型库：

```bash
git clone https://gitlab.com/kicad/libraries/kicad-packages3D.git
```

参考：[KiCad 3D Models](https://kicad.github.io/packages3d/)

### 6.5 Android 相关工具

1. USB 连接网络：[gnirehtet](https://github.com/Genymobile/gnirehtet)
2. 隐私合规检测：[camille](https://github.com/zhengjim/camille)
3. 手机投屏到电脑: [scrcpy](https://github.com/Genymobile/scrcpy)

## 7. 常见问题

### 7.1 `/boot` 空间不足

参考：[Ubuntu boot 空间不足解决方法](https://blog.csdn.net/BIT_HXZ/article/details/127305912)

#### 查看当前内核

```bash
uname -a
```

示例：

```bash
aw@mk:~/Downloads$ uname -a

Linux mk 6.5.0-10-generic #10-Ubuntu SMP PREEMPT_DYNAMIC Fri Oct 13 13:49:38 UTC 2023 x86_64 x86_64 x86_64 GNU/Linux
```

#### 查看已安装内核

```bash
dpkg --get-selections | grep linux-image
```

示例：

```bash
aw@mk:~/Downloads$ dpkg --get-selections | grep linux-image

linux-image-6.5.0-10-generic            install
linux-image-6.5.0-9-generic             deinstall
```

#### 删除旧内核

```bash
sudo apt-get remove linux-image-(版本号)
```

#### 经验记录

- 下次分区时，`/boot` 最好预留 `1GB` 左右。

