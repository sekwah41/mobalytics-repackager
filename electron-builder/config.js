
module.exports = {
    appId: `com.sekwah.mobalinux`,
    productName: `Mobalytics`,
    remoteBuild: false,
    linux: {
        icon: "./resources/icons",
        category: "Game",
        publish: ["github"],
        target: [
            "AppImage"
        ]
    }
}
