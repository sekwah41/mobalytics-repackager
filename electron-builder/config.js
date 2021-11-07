
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
