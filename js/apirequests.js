/////////////////////////////////////////////////////////////////////
//                         API REQUESTS                            //
/////////////////////////////////////////////////////////////////////

// access token /////////////////////////////////////////////////////

let access_token =
  "BQA41RuCojGDOgr_qq4qruALMYUd8_cxsA2PjsM9b1E78Xx9x4aFgHagSxsQN1cjxVGBh4pGjcKL9i-rtQ0elabanTQ3-Sx9WO6w6uY4DMaBvO4tPy_c6zI49DZ-pf3WvMtS8jOLLT4G5K1lzYf1WVxTptc";

// Parameters to GET Song Recommendations ///////////////////////////

// default values:

let songLimit = 25;
let market = "US";
let genre1 = "rock";
let genre2 = "pop";
let genre3 = "folk";
let genre4 = "chill";

let getRecomURL = `https://api.spotify.com/v1/recommendations?limit=${songLimit}&market=${market}&seed_genres=${genre1}%2C${genre2}%2C${genre3}%2C${genre4}`;

// Get Request: Recommendations Based on Seeds //////////////////////
// https://developer.spotify.com/console/get-recommendations/

// Store Song Objects in an Array ///////////////////////////////////

let songsArray = [];

// Async Function to GET Playlist Recommendation ////////////////////

async function getRecommendedSongs() {
  const res = await fetch(getRecomURL, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  songsArray = data.tracks;
  console.log(songsArray);

  // For Loop to Populate Playlist //////////////////////////////////
  for (let i = 0; i < songsArray.length; i++) {
    const thisSong = songsArray[i];

    // define new song output element /////////////////////

    let songOutput = document.createElement("ul");
    songOutput.classList.add("songOutput");

    // append song cover //////////////////////////////////

    let coverElement = document.createElement("li");
    let songCover = document.createElement("img");
    songCover.src = thisSong.album.images[1].url;
    coverElement.classList.add("coverElement");
    // console.log(songCover);
    coverElement.append(songCover);
    songOutput.append(coverElement);

    // append song title //////////////////////////////////

    let titleElement = document.createElement("li");
    titleElement.classList.add("titleElement");
    let songTitle = thisSong.name;
    // console.log(songTitle);
    titleElement.append(songTitle);
    songOutput.append(titleElement);

    // append song artist /////////////////////////////////

    let artistElement = document.createElement("li");
    artistElement.classList.add("artistElement");
    let songArtist = thisSong.album.artists[0].name;
    // console.log(songArtist);
    artistElement.append(songArtist);
    songOutput.append(artistElement);

    // append songs duration //////////////////////////////

    let songElement = document.createElement("li");
    songElement.classList.add("songElement");
    let songDurationMs = thisSong.duration_ms;
    // console.log(songDurationMs);
    songElement.append(songDurationMs);
    songOutput.append(songElement);

    // append songOutput to index.html output /////////////

    output.append(songOutput);
  }
}

// Invoke Async Function to GET Playlist Recommendation ///

getRecommendedSongs();

// end ////////////////////////////////////////////////////
