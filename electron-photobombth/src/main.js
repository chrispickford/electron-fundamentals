const electron = require("electron");

const images = require("./images");
const menuTemplate = require("./menu");

const { app, BrowserWindow, ipcMain: ipc, Menu } = electron;

let mainWindow;

app.on("ready", _ => {
    mainWindow = new BrowserWindow({
        width: 893,
        height: 725,
        resizable: false
    });

    mainWindow.loadURL(`file://${__dirname}/capture.html`);

    //mainWindow.webContents.openDevTools();

    images.mkdir(images.getPicturesDir(app));

    mainWindow.on("closed", _ => {
        mainWindow = null;
    });

    const menuContext = Menu.buildFromTemplate(menuTemplate(mainWindow));
    Menu.setApplicationMenu(menuContext);
});

ipc.on("image-captured", (evt, contents) => {
    images.save(images.getPicturesDir(app), contents, (err, imgPath) => {
        images.cache(imgPath);
    });
});

ipc.on("image-remove", (evt, index) => {
    images.remove(index, _ => {
        evt.sender.send("image-removed", index);
    });
});