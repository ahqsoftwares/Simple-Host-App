module.exports = {
    extends: null,
    productName: "Simple Host Desktop",
    appId: "com.simplehost.desktop",
    copyright: `© ${new Date().getFullYear()} AHQ Softwares @ Simple Host`,
    publish: ["github"],
    directories: {
        output: "builds/app",
        buildResources: "rsc/app"
    },
    win: {
        target: ["nsis", "zip"]
    },
    nsis: {
        oneClick: false,
        allowToChangeInstallationDirectory: true,
        installerIcon: "src/modules/images/logo.ico",
        uninstallerIcon: "src/modules/images/logo.ico"
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