const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');
const settings = require('electron-settings');
const isDev = require('electron-is-dev');

// ? IMPORT HELPER FILES
const maps = require('./maps/maps');
const emailExtractor = require('./maps/emailExtractor');
const exportData = require('./export/export');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 953, height: 750, darkTheme: true });
  const devUrl = 'http://localhost:3000';
  const prodUrl = `${path.join(__dirname, '../build/index.html')}`;
  mainWindow.loadURL(devUrl);
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

// ? APP EVENT LISTENERS : LISTENS FOR ACTIONS ON THE APPLICATION WINDOW

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
  const { searchArea, placeCategory, moreDetails, getEmails } = arg;
  maps.searchGoogle(searchArea, placeCategory, moreDetails).then(async data => {
    let resultsObj;
    if (getEmails) {
      const mergedResults = await emailExtractor.getEmailsFromGMapRes(
        data.results,
        true
      );
      resultsObj = {
        results: mergedResults,
        next_page_token: data.next_page_token || undefined
      };
    } else {
      resultsObj = {
        results: data.results,
        next_page_token: data.next_page_token || undefined
      };
    }
    console.log('Stuff is getting done!');
    console.log('is stuff working?');
    mainWindow.webContents.send('maps-data-res', resultsObj);
  });
});

// * On Export Request convert data to CSV and select a save location
ipcMain.on('export-data-req', (event, arg) => {
  const { results, moreDetails, getEmails } = arg;
  let csvData;
  if (moreDetails && !getEmails) {
    csvData = exportData.exportDetailedData(results);
  } else if (moreDetails && getEmails) {
    csvData = exportData.exportDetailedDataWithEmail(results);
  } else {
    csvData = exportData.exportBasicData(results);
  }
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

ipcMain.on('api-key-req', (event, arg) => {
  const currApiKeys = {
    gmapsKey: settings.get('apiKeys.gmapsKey'),
    hunterioKey: settings.get('apiKeys.hunterioKey')
  };
  mainWindow.webContents.send('api-key-res', currApiKeys);
});

ipcMain.on('api-key-update-req', (event, arg) => {
  const { gmapsKey, hunterioKey } = arg;
  settings.set('apiKeys', {
    gmapsKey,
    hunterioKey
  });
  mainWindow.webContents.send('api-key-update-res', true);
});
