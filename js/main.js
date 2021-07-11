let access_token = null;

function getAccessToken() {
  access_token = sessionStorage.getItem("accessToken");

  if (access_token === null) {
    if (window.location.hash) {
      console.log("Getting Access Token");

      var hash = window.location.hash.substring(1);
      var accessString = hash.indexOf("&");

      /* 13 because that bypasses 'access_token' string */
      access_token = hash.substring(13, accessString);
      console.log("Access Token: " + access_token);

      /* If first visit or regaining token, store it in session. */
      if (typeof Storage !== "undefined") {
        /* Store the access token */
        sessionStorage.setItem("accessToken", access_token); // store token.

        /* To see if we need a new token later. */
        sessionStorage.setItem("tokenTimeStamp", secondsSinceEpoch);

        /* Token expire time */
        sessionStorage.setItem("tokenExpireStamp", secondsSinceEpoch + 3600);
        console.log(
          "Access Token Time Stamp: " +
            sessionStorage.getItem("tokenTimeStamp") +
            " seconds\nOR: " +
            dateNowMS +
            "\nToken expires at: " +
            sessionStorage.getItem("tokenExpireStamp")
        );
      } else {
        alert(
          "Your browser does not support web storage...\nPlease try another browser."
        );
      }
    } else {
      console.log("URL has no hash; no access token");
    }
  } else if (upTokenTime >= tokenExpireSec) {
    console.log("Getting a new access token...Redirecting");

    /* Remove session vars so we dont have to check in implicitGrantFlow */
    sessionStorage.clear();

    $(location).attr("href", "index.html"); // Get another access token, redirect back.
  } else {
    var timeLeft = tokenExpireSec - upTokenTime;
    console.log(
      "Token still valid: " + Math.floor(timeLeft / 60) + " minutes left."
    );
  }
}

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

    // Testing Spotify oauth
    //implicitGrantFlow()
    //getAccessToken();
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
