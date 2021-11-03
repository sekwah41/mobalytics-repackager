
module.exports = {
    appId: `com.sekwah.mobalinux`,
    productName: `Mobalytics`,
    remoteBuild: false,
    linux: {
        icon: "./resources/icons",
        category: "Game",
        publish: ["github"],
        /*"desktop": {
            "MimeType": "x-scheme-handler/mobalytics;"
        },*/
        mimeTypes: ["x-scheme-handler/mobalytics"],
        target: [
            "dir",
            //"AppImage",
            //"pacman"
        ]
    },
    "protocols": [{
        "name": "electron-deep-linking",
        "schemes": [
            "mobalytics"
        ]
    }],
}
