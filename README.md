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
