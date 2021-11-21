
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
    extraResources: [
        "app/injection-connector.exe",
        "app/overlay-provider.exe",
        "app/client-connector.exe"
    ],
    linux: {
        icon: "resources/icons/",
        category: "Game",
        publish: ["github"],
        target: process.env.DIR_ONLY ? [
            "dir",
        ] : ["AppImage",
            "snap"],
    },
    protocols: [{
        name: "mobalytics",
        schemes: [
            "mobalytics"
        ]
    }],
}
