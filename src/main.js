const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');

// ? IMPORT HELPER FILES
const maps = require('./maps/maps');
const exportData = require('./export/export');

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
  const { searchArea, placeCategory, moreDetails } = arg;
  maps.searchGoogle(searchArea, placeCategory, moreDetails).then(data => {
    const resultsObj = {
      results: data.results,
      next_page_token: data.next_page_token || undefined
    };
    mainWindow.webContents.send('maps-data-res', resultsObj);
  });
});

// * On Export Request convert data to CSV and select a save location
ipcMain.on('export-data-req', (event, arg) => {
  const { results } = arg;
  const csvData = exportData.exportBasicData(results);
  // Allows the user to select where to save
  const saveDirectory = dialog.showSaveDialog(mainWindow, {
    title: 'Export Search Data',
    defaultPath: path.join(app.getPath('documents'), '/*/Findr Export.csv')
  });
  if (!saveDirectory) {
    mainWindow.webContents.send('export-data-res', false);
    return;
  }
  // Writes file to the selected file location
  fs.writeFile(saveDirectory, csvData, function(err) {
    if (err) {
      mainWindow.webContents.send('export-data-res', false);
      return console.log(err);
    }
  });
  mainWindow.webContents.send('export-data-res', true);
});
