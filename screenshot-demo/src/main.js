const electron = require("electron");

const { app, BrowserWindow, globalShortcut } = electron;

let mainWindow;

app.on("ready", _ => {
    mainWindow = new BrowserWindow({
        width: 0,
        height: 0,
        resizable: false,
        frame: false
    });

    mainWindow.loadURL(`file://${__dirname}/capture.html`);

    globalShortcut.register("CmdOrCtrl+Alt+D", _ => {
        mainWindow.webContents.send("capture", app.getPath("pictures"));
    });
});