
module.exports = {
    appId: `com.sekwah.mobalinux`,
    productName: `Mobalytics`,
    remoteBuild: false,
    files: [
        "src/**/*",
    ],
    linux: {
        icon: "./icons",
        category: "Game",
        publish: ["github"],
        target: [
            "AppImage",
            "deb",
            "rpm"
        ]
    }
}
