
// ================================================================== //
//                   OAuth 2.0 Authentication Flow                       //
// ================================================================== //

let redirect_uri = "http://127.0.0.1:5501/index.html";

let client_id = "31db226f23454e7eaca8e03c74077d04"; 
let client_secret = "f871ad0c146147a180c47af75790e048"; 

let access_token = null;

const AUTHORIZE = "https://accounts.spotify.com/authorize"
const TOKEN = "https://accounts.spotify.com/api/token";

// Evaluation to be made on every page once it loads.
// If we have a token, take the user to the next page.
// If we do not have a token, do 
function onPageLoad(){
	client_id = localStorage.getItem("client_id");
	client_secret = localStorage.getItem("client_secret");
	if ( window.location.search.length > 0 ){
		 handleRedirect();
	}
	else{
		 access_token = localStorage.getItem("access_token");
		 if ( access_token == null ){
			 //If we dont have an ACCESS TOKEN,keep user on the First Page.
			  document.getElementById("page01").style.display = 'block';  
		 }
		 else {
			  // If we DO have an ACCESS TOKEN, take the user to the next Page.
			  document.getElementById("page03").style.display = 'block';  
		 }
	}
}

function handleRedirect(){
	let code = getCode();
	fetchAccessToken( code );
	window.history.pushState("", "", redirect_uri); // remove param from url
}

function getCode(){
    let code = null;
    const queryString = window.location.search;
    if ( queryString.length > 0 ){
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code')
    }
    return code;
}

// Builds  Spotify's Authorization ENDPOINT + parameters
//							 &
// Calls the Authorization function

function fetchAccessToken( code ){
	let body = "grant_type=authorization_code";
	body += "&code=" + code; 
	body += "&redirect_uri=" + encodeURI(redirect_uri);
	body += "&client_id=" + client_id;
	body += "&client_secret=" + client_secret;
	callAuthorizationApi(body);
}

// Take user to Spotify's AUthorization Screen

function requestAuthorization(){
	client_id = "31db226f23454e7eaca8e03c74077d04";
	client_secret = "f871ad0c146147a180c47af75790e048";
	localStorage.setItem("client_id", client_id);
	localStorage.setItem("client_secret", client_secret); // In a real app you should not expose your client_secret to the user

	let url = AUTHORIZE;
	url += "?client_id=" + client_id;
	url += "&response_type=code";
	url += "&redirect_uri=" + encodeURI(redirect_uri);
	url += "&show_dialog=true";
	url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
	window.location.href = url; // Show Spotify's authorization screen
}

function refreshAccessToken(){
    refresh_token = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    callAuthorizationApi(body);
}

function callAuthorizationApi(body){
	let xhr = new XMLHttpRequest();
	xhr.open("POST", TOKEN, true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
	xhr.send(body);
	xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse(){
	if ( this.status == 200 ){
		 var data = JSON.parse(this.responseText);
		 console.log(data);
		 var data = JSON.parse(this.responseText);
		 if ( data.access_token != undefined ){
			  access_token = data.access_token;
			  localStorage.setItem("access_token", access_token);
		 }
		 if ( data.refresh_token  != undefined ){
			  refresh_token = data.refresh_token;
			  localStorage.setItem("refresh_token", refresh_token);
		 }
		 onPageLoad();
	}
	else {
		 console.log(this.responseText);
		//  alert(this.responseText);
	}
}

