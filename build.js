module.exports = {
    extends: null,
    productName: "Simple Host Desktop",
    appId: "com.simplehost.desktop",
    copyright: `© ${new Date().getFullYear()} Simple Host - AHQ Softwares`,
    publish: ["github"],
    directories: {
        output: "builds/app"
    },
    win: {
        target: ["nsis", "zip"],
        icon: "src/modules/images/icon.ico"
    },
    nsis: {
        oneClick: false,
        allowToChangeInstallationDirectory: true,
        installerIcon: "src/modules/images/icon.ico",
        uninstallerIcon: "src/modules/images/icon.ico"
    },
    linux: {
        target: ["AppImage", "zip"],
        icon: "src/modules/images/icon.png"
    },
    mac: {
        target: ["dmg", "zip"],
        category: "public.app-category.utilities",
        icon: "src/modules/images/icon.png"
    },
    generateUpdatesFilesForAllChannels: true
};