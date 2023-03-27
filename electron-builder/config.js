
module.exports = {
    appId: `com.sekwah.mobalytics-repackager`,
    productName: `Mobalytics`,
    remoteBuild: false,
    directories: {
        buildResources: "app"
    },
    files: [
        "electron-src/**/*",
        "resources/**",
    ],
    linux: {
        icon: "resources/icons/",
        category: "Game",
        publish: ["github"],
        desktop: {
            "Name": "Mobalytics",
            "MimeType": "x-scheme-handler/mobalytics",
        },
        mimeTypes: ["x-scheme-handler/mobalytics"],
        target: [
            "AppImage",
            "deb",
            "rpm",
            "snap"
        ]
    },
    protocols: [{
        name: "mobalytics",
        schemes: [
            "mobalytics"
        ]
    }],
}
