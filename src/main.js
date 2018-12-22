// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, dialog } = require('electron');
const fs = require('fs');

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

// Open File
function openFile() {
  // Opens dialog looking for markdown files
  const files = dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      {
        name: 'Markdown File',
        extensions: ['md', 'markdown', 'txt']
      }
    ]
  });
  // * checks if nothing is selected, if so return
  if (!files) return;

  // * Works with selected files
  const file = files[0];
  const fileContent = fs.readFileSync(file).toString();
  mainWindow.webContents.send('new-file', fileContent);
}

//Open Directory
function openDirectory() {
  // Opens dialog looking for markdown files
  const directory = dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });
  // * checks if nothing is selected, if so return
  if (!directory) return;
  const dir = directory[0];
  mainWindow.webContents.send('new-dir', dir);
}

// Send Request to save file
function saveFile() {
  mainWindow.webContents.send('save-file', true);
}
