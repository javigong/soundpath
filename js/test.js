function implicitGrantFlow() {
  /* If access token has been assigned in the past and is not expired, no request required. */
  if (
    sessionStorage.getItem("accessToken") !== null &&
    sessionStorage.getItem("tokenTimeStamp") !== null &&
    upTokenTime < tokenExpireSec
  ) {
    var timeLeft = tokenExpireSec - upTokenTime;
    console.log(
      "Token still valid: " + Math.floor(timeLeft / 60) + " minutes left."
    );

    /* Navigate to the home page. */
    $(location).attr("href", "http://127.0.0.1:5501");
  } else {
    console.log("Token expired or never found, getting new token.");
    $.ajax({
      url: "https://api.spotify.com/v1/me",
      type: "GET",
      contentType: "application/json",
      data: {
        client_id: "9eddbd6ad5384b629eae7f0656108325",
        redirect_uri: "http://127.0.0.1:5501",
        scope: "playlist-modify-public",
        response_type: "code",
      },
    })
      .done(function callback(response) {
        /* Redirect user to home page */
        console.log("COULD THIS BE A SUCCESS?");
        $(location).attr("href", this.url);
      })
      .fail(function (error) {
        /* Since we cannot modify the server, we will always fail. */
        console.log("ERROR HAPPENED: " + error.status);
        console.log(this.url);
        $(location).attr("href", this.url);
      });
  }
}
