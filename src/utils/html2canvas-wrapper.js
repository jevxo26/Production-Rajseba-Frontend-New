// Wrapper to resolve default export differences between html2canvas and html2canvas-pro
const html2canvasPro = require("html2canvas-pro");
const html2canvas = html2canvasPro.default || html2canvasPro;
module.exports = html2canvas;
