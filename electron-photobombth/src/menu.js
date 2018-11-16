const electron = require("electron");

const { app } = electron;

const images = require("./images");

function enabledCycleEffect(items) {
    const nonEffectMenuOffset = 2;
    const selectedIndex = items.findIndex(item => item.checked);
    const nextIndex = selectedIndex +1 < items.length ? selectedIndex + 1 : nonEffectMenuOffset;
    items[nextIndex].checked = true;
}

module.exports = mainWindow => {
    const name = app.getName();
    const template = [
        {
            label: "Effects",
            submenu: [
                {
                    label: "Cycle",
                    accelerator: "CmdOrCtrl+Shift+E",
                    click: menuItem => {
                        enabledCycleEffect(menuItem.menu.items);
                        mainWindow.webContents.send("effect-cycle");
                    }
                },
                {
                    label: "Vanilla",
                    type: "radio",
                    click: _ => mainWindow.webContents.send("effect-choose")
                },
                {
                    label: "ASCII",
                    type: "radio",
                    click: _ => mainWindow.webContents.send("effect-choose", "ascii")
                },
                {
                    label: "Daltonize",
                    type: "radio",
                    click: _ => mainWindow.webContents.send("effect-choose", "daltonize")
                },
                {
                    label: "Hex",
                    type: "radio",
                    click: _ => mainWindow.webContents.send("effect-choose", "hex")
                }
            ]
        },
        {
            label: "View",
            submenu: [
                {
                    label: "Photos Directory",
                    click: _ => images.openDir(images.getPicturesDir(app))
                }
            ]
        }
    ];

    if (process.platform === "darwin") {
        template.unshift({
            label: name,
            submenu: [
                {
                    label: "About " + name,
                    role: "about"
                },
                { type: "separator" },
                {
                    label: "Hide " + name,
                    accelerator: "CmdOrCtrl+H",
                    role: "hide"
                },
                {
                    label: "Hide Others",
                    accelerator: "CmdOrCtrl+Shift+H",
                    role: "hideothers"
                },
                {
                    label: "Show All",
                    role: "unhide"
                },
                { type: "separator" },
                {
                    label: "Quit",
                    accelerator: "CmdOrCtrl+Q",
                    click: _ => app.quit()
                }
            ]
        });
    }

    return template;
}