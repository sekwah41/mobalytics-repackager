Mobalytics Repackager
=========

The whole point of this project is to try to get Mobalytics running directly on linux.
This should help both with performance as well as logging in (Looking into adding a protocol handler).

The main goal is to just wrap and re-package the app, however as the code isn't minified, it may be possible to patch
certain files.

![Mobalytics](.github/images/img.png)

[![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-black.svg)](https://snapcraft.io/mobalytics-desktop)


# Dev Setup
To test it locally you will need to run a series of commands, I will try to better update it once I have the overlay feature working.

Due to some weirdness with the snapcraft that I dont really want to figure out(kept using wrong node version and yarn version)

When using nexe to package the application in a version not prebuild use --verbose to make sure you know its actually progressing. (it can take a while)

