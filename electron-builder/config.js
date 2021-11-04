
module.exports = {
    appId: `com.sekwah.mobalytics-repackager`,
    productName: `Mobalytics`,
    remoteBuild: false,
    directories: {
      buildResources: "app"
    },
    linux: {
        icon: "resources/icons/",
        category: "Game",
        publish: ["github"],
        target: [
            "AppImage"
        ]
    },
    protocols: [{
        name: "mobalytics",
        schemes: [
            "mobalytics"
        ]
    }],
}
