const { app, BrowserWindow, ipcMain } = require('electron');
const maps = require('./maps/maps');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 953, height: 750, darkTheme: true });
  mainWindow.loadURL('http://localhost:3000');
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

// ? APP EVENT LISTENERS : LISTENS FOR ACTIONS ON THE APPLICATION WINDO

// * On initial Load, create the initial window
app.on('ready', createWindow);

// * When all windows of the app are closed, quit the process
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// * On app activation, if no window exists, create one
app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});

// ? IPC LISTENERS : LISTENS FOR DATA FROM THE RENDER THREAD

// * On Map Data Request from the renderer call the Google API for maps data
ipcMain.on('map-data-req', (event, arg) => {
  const { searchArea, placeCategory } = arg;
  maps.searchGoogle(searchArea, placeCategory).then(data => {
    mainWindow.webContents.send('maps-data-res', data);
  });
});
