MobaLinux
=========
The whole point of this project is to try to get Mobalytics running directly on linux.
This should help both with performance as well as logging in (Looking into adding a protocol handler).

The main goal is to just wrap and re-package the app, however as the code isn't minified, it may be possible to patch
certain files.


The setup is a little fiddly, though make sure to only modify the modified-src folder while creating the patches.

To try snapcraft building locally try `snapcraft build` rather than using electron-builder.

![Mobalytics](.github/images/img.png)


Due to some weirdness with the snapcraft that I dont really want to figure out(kept using wrong node version and yarn version)

