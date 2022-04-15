module.exports = {
    extends: null,
    productName: "Simple Host Desktop",
    appId: "com.simplehost.desktop",
    copyright: `© ${new Date().getFullYear()} Simple Host - AHQ Softwares`,
    publish: ["github"],
    win: {
        target: ["nsis", "zip"]
    },
    nsis: {
        oneClick: false,
        allowToChangeInstallationDirectory: true
    },
    linux: {
        target: ["AppImage", "zip"]
    },
    mac: {
        target: ["dmg", "zip"],
        category: "public.app-category.utilities"
    },
    generateUpdatesFilesForAllChannels: true
};