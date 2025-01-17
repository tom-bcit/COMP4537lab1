import { appTitle, read, write } from "../lang/messages/en/user.js"

const title = document.getElementById("topTitle");

title.textContent = appTitle;

const readButton = document.getElementById("readBtn");
readButton.textContent = read;

const writeButton = document.getElementById("writeBtn");
writeButton.textContent = write;