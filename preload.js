const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  system: () => {
    console.log("system test");
  },
  handleShowAlert: (callback) => ipcRenderer.on("Display:showAlert", callback),
  handleOpenFile: (callback) => ipcRenderer.on("year:load", callback),
  handleFontSizeChange: (callback) =>
    ipcRenderer.on("FontSize:Change", callback),
  handleNewYear: (callback) => ipcRenderer.on("year:add", callback),
  saveYear: (year) => {
    ipcRenderer.send("year:save", year);
  },
  // auto load
  handleShowSettingsForm: (callback) =>
    ipcRenderer.on("Display:showSettingsForm", callback),
  showOpenDialog: () => {
    ipcRenderer.send("autoload:getFiles");
  },
  handleAuotLoadPaths: (callback) => {
    ipcRenderer.on("autoLoadPaths:sendTolocalStorage", callback);
  },
  sendFilePathsForAutoload: (myFilePathsForAutoLoad) => {
    ipcRenderer.send("autoloadFiles:open", myFilePathsForAutoLoad);
  },
});
