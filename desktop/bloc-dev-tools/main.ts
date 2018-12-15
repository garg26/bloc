import { app, BrowserWindow, screen, ipcMain, Event } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as WebSocket from 'ws';

let win: BrowserWindow;
let serve: boolean;
let ws: WebSocket;
const args = process.argv.slice(1);
const port = 34263;
serve = args.some(val => val === '--serve');

function startServer() {
  const wss = new WebSocket.Server({ port });
  console.log('Server running on port', port);

  wss.on('connection', function connection(socket: WebSocket) {
    ws = socket;
    ws.on('message', function incoming(data: string) {
      win.webContents.send('transition', data);
    });
  });
}

ipcMain.on('dispatch', (event: Event, arg: any) => {
  ws.send(JSON.stringify({ uuid: arg.uuid }));
});

function createWindow() {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  startServer();

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
  }

  win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}
