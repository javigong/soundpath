let request = require("request"); // <-- a library made to make HTTP calls simple but which was deprecated in February of 2020. AXIOS was suggested as a good alternative tho. Source:https://github.com/request/request. 
let user_id = ""; // <-- the user_id to be used later as a parameter on the playlist endpoint  (the human readable name that appears on your Spotify Account)
let token = "Bearer ABCDEFG"; //<-- the access token you managed to get during the OAuth process. It would be used to replace the placeholder value f ABCDEFG
let playlists_url = "https://api.spotify.com/v1/users/"+user_id+"/playlists"; // <--the 'playlist_url' endpoint

request({url:playlists_url, headers:{"Authorization":token}}, // <-- making the HTTP GET method and passing header with the authorization to the URL of the playlist endpoint.
	function (err, res) {
		// <-- the 'result' (res) of the call made on the live above will be used as the parameter of this function
		if (res) {
			let playlists = JSON.parse(res.body); //<-- we are storing inside the variable 'playlists' the array full of playlist objects that are wrapped inside a 'pagingObject'; which is on the BODY of the 'result', and we are turning all of these playlist objects into a JSON structure.
			let playlist_url = playlists.items[0].href; //<-- We will access the first playlist of the array. The 'href' is just a property of this object which stands for "A link to the Web API endpoint providing full details of the playlist.""
request({url:playlist_url, headers:{ "Authorization":token}}), //<-- we make another API call here
				function (err, res) {
					if (res) {
						let playlist = JSON.parse(res.body);
						console.log("playlist: " + playlist.name); // <-- here we are printing the playlist name.
						playlist.tracks.items.forEach(function (track) {
							// <-- here we are iterating through every track that is inside the playlist and printing their name.
							console.log(track.track.name);
						});
					}
				};
		}
	}
);