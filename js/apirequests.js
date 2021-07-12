// access token ////////////////////////////////////

let access_token = null;

// Parameters to GET Song Recommendations //////////

// default values:

let songLimit = 12;
let market = US;
let genre1 = "rock";
let genre2 = "pop";
let genre3 = "folk";
let genre4 = "chill";

const genreFix2 = "%2C" + genre2;
const genreFix3 = "%2C" + genre3;
const genreFix4 = "%2C" + genre4;

// Get Request: Recommendations Based on Seeds //////

// info: https://developer.spotify.com/console/get-recommendations/

// Store song objects on an Array
let songsArray = [];

const recomURL = "https://api.spotify.com/v1/recommendations";

async function getRecommendedSongs() {
  const res = await fetch(
    `https://api.spotify.com/v1/recommendations?limit=${songLimit}&market=${market}&seed_genres=${genre1}${genreFix2}{genreFix3}{genreFix4}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  songsArray = data;
  console.log(songsArray);
}
