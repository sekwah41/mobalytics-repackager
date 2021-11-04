
module.exports = {
    appId: `com.sekwah.mobalinux`,
    productName: `Mobalytics`,
    remoteBuild: false,
    linux: {
        category: "Game",
        publish: ["github"],
        /*"desktop": {
            "MimeType": "x-scheme-handler/mobalytics;"
        },*/
        //mimeTypes: ["x-scheme-handler/mobalytics"],
        target: [
            "AppImage",
            "snap"
        ]
    },
    "protocols": [{
        "name": "mobalytics",
        "schemes": [
            "mobalytics"
        ]
    }],
}
