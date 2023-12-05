const { https } = require("firebase-functions");
const { default: next } = require("next");

// const isDev = process.env.NODE_ENV !== "production";
const nextjsDistDir = require("../next.config").distDir;

const nextjsServer = next({
  dev: false,
  conf: {
    distDir: nextjsDistDir,
  },
});
const nextjsHandle = nextjsServer.getRequestHandler();

exports.nextjsFunc = https.onRequest((req:any, res:any) => {
  return nextjsServer.prepare().then(() => nextjsHandle(req, res));
});
