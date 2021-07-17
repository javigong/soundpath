// ================================================================== //
//                   GET Playlist Recommendation                      //
// ================================================================== //

// access token (temporary solution until oAuth implementation):

let access_token =
  "BQDpEBRYM2wIE_XKLBF1huW7Xm-ostsaWMUl1aoz1ZPKuPlbhzEF3r-4tg1LsHUP8BjlI7YO8lR4GNlP_baMKHAhFxWcraCfLkFL3-VDc6XIIYduYOdUfxgGBi0iI4deljOQsGv298MP-9IZkYV-G3LvHOGCJYOGkHHf";

// Parameters to GET Song Recommendations =========================== //

// Testing Parameters (Values need to come from UI form inputs):

let songLimit = 25;
let market = "US";
let genre1 = "rock";
let genre2 = "pop";
let genre3 = "folk";
let genre4 = "chill";

// Get Request: Recommendations Based on Seeds ====================== //
// https://developer.spotify.com/console/get-recommendations/

// API Endpoint URL:

let getRecommendationsURL = `https://api.spotify.com/v1/recommendations?limit=${songLimit}&market=${market}&seed_genres=${genre1}%2C${genre2}%2C${genre3}%2C${genre4}`;

// New Array to store Playlist:

let songsArray = [];

// Async Function to GET Playlist Recommendation ==================== //

async function getRecommendedSongs() {
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
    // (Need to convert from milliseconds to minutes:seconds)

    let songElement = document.createElement("li");
    songElement.classList.add("songElement");
    let songDurationMs = thisSong.duration_ms;
    // console.log(songDurationMs);
    songElement.append(songDurationMs);
    songOutput.append(songElement);

    // Append songOutput to UI output:

    output.append(songOutput);
  }
  // end For Loop to Populate Playlist ============= //
}
// end Async Function to GET Playlist Recommendation ================ //

// Invoke Async Function to GET Playlist Recommendation:

getRecommendedSongs();

// end GET Playlist Recommendation  ================================ //
