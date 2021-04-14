const fs = require("fs");
const { JSDOM } = require("jsdom");
const lottie = require("@lottiefiles/lottie-player");
const { default: Lottie } = require("lottie-web");
const html = fs.readFileSync("tests/index.html");
//todo: maybe we isolate the scripts and run independently
const window = new JSDOM(html, { runScripts: "dangerously", resources: "usable" }).window;

//todo: manually instantiate the player and pass the ref back rather than lottie?
var lottieDiv = window.document.getElementById('lottie-div');

module.exports = { window, lottie };
