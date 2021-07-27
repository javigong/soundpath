const redirect_uri = "https://soundpath.netlify.app/index.html"; //Replace with you localhost

//gustavo
// let client_id = "a0875c5745d349afa70d58abc2368d8b";
// let client_secret = "f3be40b89030473bac2a1cf2cc7cdda2";
//javierg
let client_id = "ea6dbfb6ca0e451e8fa3da6cfc97b5c7";
let client_secret = "82e9c8e180cd447aa61bcab97df41a2b";

let access_token = null;
let refresh_token = null;

const AUTHORIZE = "https://accounts.spotify.com/authorize";
const TOKEN = "https://accounts.spotify.com/api/token";

function onPageLoad() {
    client_id = localStorage.getItem("client_id");
    client_secret = localStorage.getItem("client_secret");
    if (window.location.search.length > 0) {
        handleRedirect();
    } else {
        access_token = localStorage.getItem("access_token");
    }
}

// If user grants access to his account  - take him straight to page 3

if (window.location.search.length > 0) {
    handleRedirect();
    document.getElementById("page01").classList.remove("show");
    document.getElementById("page02").classList.remove("show");
    document.getElementById("page03").classList.add("show");
}

function handleRedirect() {
    let code = getCode();
    fetchAccessToken(code);
    window.history.pushState("", "", redirect_uri); // remove param from url
}

function getCode() {
    let code = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get("code");
    }
    return code;
}

// Builds  Spotify's Authorization ENDPOINT + parameters

function fetchAccessToken(code) {
    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
}

// Takes the user to Spotify's AUthorization Screen

localStorage.setItem("client_id", client_id);
localStorage.setItem("client_secret", client_secret);

function requestAuthorization() {
    // client_id = "a0875c5745d349afa70d58abc2368d8b";
    // client_secret = "f3be40b89030473bac2a1cf2cc7cdda2";

    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email playlist-modify-private playlist-modify-public user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url;
}

// Creates the ENDPOINT + Parameters to obtain the Refresh Token

function refreshAccessToken() {
    refresh_token = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    // body += "&client_id=" + client_id;
    callAuthorizationApi(body);
}

// XMLHTTP Request to POST the recently created ENDPOINTand calls the other function handleAUthorizaitonResopnse

function callAuthorizationApi(body) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader(
        "Authorization",
        "Basic " + btoa(client_id + ":" + client_secret)
    );
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

//  Stores access / refresh tokens.

function handleAuthorizationResponse() {
    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        console.log(data);
        if (data.access_token != undefined) {
            access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
        }
        if (data.refresh_token != undefined) {
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
        }
    } else {
        console.log(this.responseText);
    }
}
