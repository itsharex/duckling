import React from "react";
import ReactDOM from "react-dom/client";
import { attachConsole } from "@tauri-apps/plugin-log";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";

import App from "./App";

// with LogTarget::Webview enabled this function will print logs to the browser console
(async () => {
  const detach = await attachConsole();
  detach();
})();

(async () => {
  const update = await check();
  console.log(update?.version, update?.currentVersion);
  if (update?.version != update?.currentVersion) {
    await update?.downloadAndInstall();
    await relaunch();
  }
})();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
