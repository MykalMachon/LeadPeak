// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const maps = require('./maps/maps');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 953, height: 750, darkTheme: true });
  mainWindow.loadURL('http://localhost:3000');

  //* Open the DevTools.
  // mainWindow.webContents.openDevTools()

  //* Emitted when the window is closed.
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// ? Listeners from the renderer

ipcMain.on('map-data-req', (event, arg) => {
  const { searchArea, placeCategory } = arg;
  console.log(arg);
  searchGoogle(searchArea, placeCategory);
});

function searchGoogle(searchArea, placeCategory) {
  maps.searchGoogle(searchArea, placeCategory).then(data => {
    console.log(data);
    mainWindow.webContents.send('maps-data-res', data);
  });
}
