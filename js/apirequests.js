// ================================================================== //
//                   GET Playlist Recommendation                      //
// ================================================================== //

// Parameters to GET Song Recommendations =========================== //

// Parameters from UI
let market = "CA";
let songLimit = 20;

// Get Request: Recommendations Based on Seeds ====================== //
// https://developer.spotify.com/console/get-recommendations/

// New Array to store Playlist:

let songsArray = [];
const genresArray = [];

// Async Function to GET Playlist Recommendation ==================== //

async function getRecommendedSongs() {
  // default genre values
  let genre1 = null;
  let genre2 = null;
  let genre3 = null;
  let genre4 = null;
  let genre5 = null;
  // get genre values and store them in array
  const genresForm = document.querySelector("#form05").elements;
  // loop checked genres from UI
  for (let i = 0; i < genresForm.length; i++) {
    const element = genresForm[i];
    if (element.checked == true) {
      genresArray.push(element.value);
    }
  }
  console.log(genresArray);
  // assign value to genre variables
  genre1 = genresArray[0];
  genre2 = genresArray[1];
  genre3 = genresArray[2];
  genre4 = genresArray[3];
  genre5 = genresArray[4];
  console.log(genre1);

  // API Endpoint URL:

  let getRecommendationsURL = `https://api.spotify.com/v1/recommendations?limit=${songLimit}&market=${market}&seed_genres=${genre1}%2C${genre2}%2C${genre3}%2C${genre4}%2C${genre5}`;

  // getAccessToken();
  // Fetch from the api endpoint to get playlist
  const res = await fetch(getRecommendationsURL, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
  // Parse the JSON playlist to an array of objects
  const data = await res.json();
  // Store the playlist data, just the tracks
  songsArray = data.tracks;
  console.log(songsArray);

  // For Loop to Populate Playlist ================ //
  for (let i = 0; i < songsArray.length; i++) {
    const thisSong = songsArray[i];

    // Define new song output element:

    let songOutput = document.createElement("ul");
    songOutput.classList.add("songOutput");

    // Append song cover:

    let coverElement = document.createElement("li");
    let songCover = document.createElement("img");
    songCover.src = thisSong.album.images[1].url;
    coverElement.classList.add("coverElement");
    // console.log(songCover);
    coverElement.append(songCover);
    songOutput.append(coverElement);

    // Append song title:

    let titleElement = document.createElement("li");
    titleElement.classList.add("titleElement");
    let songTitle = thisSong.name;
    // console.log(songTitle);
    titleElement.append(songTitle);
    songOutput.append(titleElement);

    // Append song artist:

    let artistElement = document.createElement("li");
    artistElement.classList.add("artistElement");
    let songArtist = thisSong.album.artists[0].name;
    // console.log(songArtist);
    artistElement.append(songArtist);
    songOutput.append(artistElement);

    // Append songs duration:

    let songElement = document.createElement("li");
    songElement.classList.add("songElement");
    let songDurationMs = thisSong.duration_ms;
    // convert ms to min:sec
    function millisToMinSec(millis) {
      let minutes = Math.floor(millis / 60000);
      let seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }
    let songDurationMinSec = millisToMinSec(songDurationMs);
    songElement.append(songDurationMinSec);
    songOutput.append(songElement);

    // Append songOutput to UI output:

    output.append(songOutput);
  }
  // end For Loop to Populate Playlist ============= //
}
// end Async Function to GET Playlist Recommendation ================ //

// Invoke Async Function to GET Playlist Recommendation:

// getRecommendedSongs();

// end GET Playlist Recommendation  ================================ //

// Async Function to GET User ID, Playlist Name and Save Playlist == //

// Parameters
const namePlaylist = document.querySelector("#namePlaylist").value;

function savePlaylist(playlistName, uriArr) {
  if (!playlistName || !uriArr.length) {
    return;
  }
  const access_token = getAccessToken();
  const headers = { Authorization: `Bearer ${access_token}` };
  let userId;

  return fetch(`https://api.spotify.com/v1/me`, {
    headers: headers,
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: "POST",
        body: JSON.stringify({ name: playlistName }),
      })
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          const playlistId = jsonResponse.id;
          return fetch(
            `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
            {
              headers: headers,
              method: "POST",
              body: JSON.stringify({ uris: uriArr }),
            }
          );
        });
    });
}
