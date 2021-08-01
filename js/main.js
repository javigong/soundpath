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
    document;
    //   .querySelectorAll(".page")
    //   .forEach((page) => page.classList.remove("show"));
    // document.querySelector("#page03").classList.add("show");

    //Testing Spotify oauth
    //implicitGrantFlow()
    //getAccessToken();
    //Spotify Oauth Standard
    requestAuthorization();
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


// Camera function =============================================

const camWrapper = document.querySelector(".camera-wrapper");
const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");
const copyImg = document.createElement("img");


// Start Camera =================================

startCamera.addEventListener("click", function () {
  document
    .querySelectorAll(".page")
    .forEach((page) => page.classList.remove("show"));

  camWrapper.classList.add("show");

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
      video.srcObject = stream;
    });
  } else {
    console.log("media devices not available in this browser")
  }
});

// Back to page 01 from camera ==================

backFromCam.addEventListener("click", function () {
  // Stops the camera
  const tracks = video.srcObject.getTracks();
  tracks.forEach(track => track.stop());

  // Goes back to page
  camWrapper.classList.remove("show");
  document
    .querySelectorAll(".page")
    .forEach((page) => page.classList.remove("show"));
  document.querySelector("#page04").classList.add("show");

});

// Capture the picture ==========================

function handleBlob(blob) {
  const objectURL = window.URL.createObjectURL(blob);
  copyImg.src = objectURL;
  playlistCover.appendChild(copyImg);
  console.log(objectURL);
}

capture.addEventListener("click", function () {
  context.drawImage(video, 0, 0);
  const imageBlob = canvas.toBlob(handleBlob, 'image/png');
  canvas.classList.remove("hide-canvas");
});

// Cancel or taking another picture

newPhoto.addEventListener("click", function () {
  // Takes another picture
  canvas.classList.add("hide-canvas");

  // adds logo image as cover
  const logoImg = "../img/logo.svg";
  copyImg.src = logoImg;
  playlistCover.appendChild(copyImg);
});

// Upload Image =================================
window.addEventListener('load', function () {
  document.querySelector('input[type="file"]').addEventListener('change', function () {
    if (this.files && this.files[0]) {

      copyImg.onload = () => {
        URL.revokeObjectURL(img.src);
      }

      copyImg.src = URL.createObjectURL(this.files[0]);
      playlistCover.appendChild(copyImg);
    }
  });
});


// Start page 05 : Add Genres (Max 5) ==========================

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

// Start page 06 : Add country + Song Attributes + Generate Playlist Button ======

// Sliders: .chrome styling

document.querySelectorAll(".slider").oninput = function () {
  let value = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.background =
    "linear-gradient(to right, #82CFD0 0%, #82CFD0 " +
    value +
    "%, #fff " +
    value +
    "%, white 100%)";
};

const generateBtn = document.querySelector("#btn06");
if (generateBtn) {
  generateBtn.addEventListener("click", (event) => {
    document
      .querySelectorAll(".page")
      .forEach((page) => page.classList.remove("show"));
    document.querySelector("#page07").classList.add("show");

    getRecommendedSongs();
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

    saveSongs();
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

// Offline Message //

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    function updateOnlineStatus(event) {
      const condition = navigator.onLine ? "online" : "offline";

      status.className = condition;
      status.innerHTML = condition.toUpperCase();
      console.log(condition);

      const getOffline = document.getElementById("offlineMsg");

      getOffline.classList.remove("showOffline");
      if (condition === "offline") {
        getOffline.classList.add("showOffline");
      }
    }

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
  });
}
