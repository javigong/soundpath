// Start page 01 : Initial page with Soundpath Logo ==========

const startBtn = document.querySelector("#page01");
if (startBtn) {
  startBtn.addEventListener("click", (event) => {
    document
      .querySelectorAll(".page")
      .forEach((page) => page.classList.remove("show"));
    document.querySelector("#page02").classList.add("show");
  });
}

// Start page 02 : Login with Spotify Button ===================

const loginBtn = document.querySelector("#btn02");
if (loginBtn) {
  loginBtn.addEventListener("click", (event) => {
    document
      .querySelectorAll(".page")
      .forEach((page) => page.classList.remove("show"));
    document.querySelector("#page03").classList.add("show");
  });
}

// Start page 03 : Welcome message + Create playlist Button ====

const createPlaylistBtn = document.querySelector("#btn03");
if (createPlaylistBtn) {
  createPlaylistBtn.addEventListener("click", (event) => {
    document
      .querySelectorAll(".page")
      .forEach((page) => page.classList.remove("show"));
    document.querySelector("#page04").classList.add("show");
  });
}

// Start page 04 : Form Input Playlist Name ====================

const getNameBtn = document.querySelector("#btn04");
if (getNameBtn) {
  getNameBtn.addEventListener("click", (event) => {
    document
      .querySelectorAll(".page")
      .forEach((page) => page.classList.remove("show"));
    document.querySelector("#page05").classList.add("show");
  });
}

const goBack04Btn = document.querySelector("#btnBack04");
if (goBack04Btn) {
  goBack04Btn.addEventListener("click", (event) => {
    document
      .querySelectorAll(".page")
      .forEach((page) => page.classList.remove("show"));
    document.querySelector("#page03").classList.add("show");
  });
}

// Start page 05 : Add Genres (Max 4) ==========================

const getGenresBtn = document.querySelector("#btn05");
if (getGenresBtn) {
  getGenresBtn.addEventListener("click", (event) => {
    document
      .querySelectorAll(".page")
      .forEach((page) => page.classList.remove("show"));
    document.querySelector("#page06").classList.add("show");
  });
}

const goBack05Btn = document.querySelector("#btnBack05");
if (goBack05Btn) {
  goBack05Btn.addEventListener("click", (event) => {
    document
      .querySelectorAll(".page")
      .forEach((page) => page.classList.remove("show"));
    document.querySelector("#page04").classList.add("show");
  });
}

// Start page 06 : Add country + Generate Playlist Button ======

const generateBtn = document.querySelector("#btn06");
if (generateBtn) {
  generateBtn.addEventListener("click", (event) => {
    document
      .querySelectorAll(".page")
      .forEach((page) => page.classList.remove("show"));
    document.querySelector("#page07").classList.add("show");
  });
}

const goBack06Btn = document.querySelector("#btnBack06");
if (goBack06Btn) {
  goBack06Btn.addEventListener("click", (event) => {
    document
      .querySelectorAll(".page")
      .forEach((page) => page.classList.remove("show"));
    document.querySelector("#page05").classList.add("show");
  });
}

// Start page 07 : Generating playlist Waiting page ===========

const generateDoneBtn = document.querySelector("#page07");
if (generateDoneBtn) {
  generateDoneBtn.addEventListener("click", (event) => {
    document
      .querySelectorAll(".page")
      .forEach((page) => page.classList.remove("show"));
    document.querySelector("#page08").classList.add("show");
  });
}

// Start page 08 : Display playlist + Transfer to Spotify Button

const transferBtn = document.querySelector("#btn08");
if (transferBtn) {
  transferBtn.addEventListener("click", (event) => {
    document
      .querySelectorAll(".page")
      .forEach((page) => page.classList.remove("show"));
    document.querySelector("#page09").classList.add("show");
  });
}

const goBack08Btn = document.querySelector("#btnBack08");
if (goBack08Btn) {
  goBack08Btn.addEventListener("click", (event) => {
    document
      .querySelectorAll(".page")
      .forEach((page) => page.classList.remove("show"));
    document.querySelector("#page06").classList.add("show");
  });
}

// Start page 09 : Start page 09 : Transferring to Spotify Waiting Page

const transferDoneBtn = document.querySelector("#page09");
if (transferDoneBtn) {
  transferDoneBtn.addEventListener("click", (event) => {
    document
      .querySelectorAll(".page")
      .forEach((page) => page.classList.remove("show"));
    document.querySelector("#page10").classList.add("show");
  });
}

// Start page 10 : Playlist transferred + Button to return to
// create new playlist (#page04) ===============================

const returnCreatePlayBtn = document.querySelector("#btn10");
if (returnCreatePlayBtn) {
  returnCreatePlayBtn.addEventListener("click", (event) => {
    document
      .querySelectorAll(".page")
      .forEach((page) => page.classList.remove("show"));
    document.querySelector("#page04").classList.add("show");
  });
}
