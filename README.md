MobaLinux
=========
The whole point of this project is to try to get Mobalytics running directly on linux.
This should help both with performance as well as logging in (Looking into adding a protocol handler).

The main goal is to just wrap and re-package the app, however as the code isn't minified, it may be possible to patch
certain files.


The setup is a little fiddly, though make sure to only modify the modified-src folder while creating the patches.

To try snapcraft building locally try `snapcraft build` rather than using electron-builder.

![Mobalytics](.github/images/img.png)

## Future support

I am not sure how long Mobalytics is going to keep supporting the non overwolf version of their software and I have been relatively busy lately.
Though I plan to try to support this until they stop supporting this version.

## AppImage
As of electron-builder 21 the appimage no longer builds with desktop integration natively.

Please install https://github.com/TheAssassin/AppImageLauncher to properly install the desktop integration.

I've personally been having some issues with this so have been focusing on the snap version.

# Adding a desktop entry & mimetype manually
Please see this issue https://github.com/sekwah41/mobalytics-repackager/issues/23 for more information.

If you want a icon you will need to extract the icon from the asar-resources.

[@spstarr](https://github.com/spstarr) has given an example of how they have done it.