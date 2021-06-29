Link: 
Part1 - https://www.youtube.com/watch?v=dwxVGK7TG-0
Part2 - https://www.youtube.com/watch?v=yAXoOolPvjU&t=0s

## Purpose: Print the number of playlists of a user and print the tracks of the first playlist

*Assuming that you  have already created a Spotify Dev account and a project*

## Authentication - Overview

### 1.	Step : We will make a GET REQUEST to the 'Authorization endpoint' of Spotify in order to obtain an exchangeable code.

### 2.	Step: Once we have this code, we will make a POST REQUEST to the 'api/token endpoint' of Spotify in order to exchange the code for an Access Token.

### 3.	Step: With the Access Token, we are now able to call the different APIs available on Spotify

---

## Step 1

At the end of this step, our GET request to the endpoint:

![image-20210627171048128](/home/gustavo/.config/Typora/typora-user-images/image-20210627171048128.png)



Will look like this:

<span style="color:orange">`https://accounts.spotify.com/authorize`</span>?<span style="color:red">client_id=a08....d8b</span>&<span style="color:hotpink">scope=playlist-read-private</span>&<span style="color:lightyellow">**response_type=code**</span>&<span style="color:turquoise">redirect_uri=https%3A%2F%2F`www.google.com.br%2F`</span>

We will make this request through the **BROWSER**

---

The parameters used for this request are:

- **client_id**

  Available on your Spotify Dashboard project

  To be used:

  *client_id=yourIdOnTheDashboard*

  <img src="/home/gustavo/.config/Typora/typora-user-images/image-20210628154935234.png" alt="image-20210628154935234" style="zoom:55%;" />

  

- **scope**

  For this we will need the correct value for the 'scope' query;you can find the correct scope in the docs. 

  It's written on the API itself, explaining what are the required scopes (basically this will be shown to the user 'Terms agreement', that the user is aware of the rights XYZ that he is delegating to you, the app.)

  In this example it will be:

  

  To be used (for this project):

  *scope=playlist-read-private*

  

  Source:https://developer.spotify.com/documentation/general/guides/scopes/#playlist-read-private

- **response-type**

  The 'code' value is a mandatory one that Spotify demands you to put. It's in the docs.
  

  To be used:

  *response-type=code*

  

  Source:https://developer.spotify.com/documentation/general/guides/authorization-guide/

- **redirect_uri**

  The link to the page you want redirect your enduser to, once they have successfully Agree with the Auhtentication form.

  However, the address must be registered on the whitelist on the Spotify DashBoard AND it must be URL encoded.

  E.g. If I wanted to redirect my users to: https://www.google.com.br/

  I would need to encode Google's address first on 	https://www.urlencoder.org/

  ***ps** try with another website or with your own localhost since it appears that you are not allowed to redirect to google :face_with_head_bandage: but we will follow on with google just for the sake of illustration...

  

  To be used:

  *redirect_uri=https%3A%2F%2Fwww.google.com.br%2F*

**Once we put the endpoint + all the parameters we will have:**

<span style="color:orange">`https://accounts.spotify.com/authorize`</span>?<span style="color:red">client_id=a08....d8b</span>&<span style="color:hotpink">scope=playlist-read-private</span>&<span style="color:lightyellow">**response_type=code**</span>&<span style="color:turquoise">redirect_uri=https%3A%2F%2F`www.google.com.br%2F`</span>

We can now place this on our URL and be directed to Spotify Terms and conditions screen.

---

## Step 2

At the end of this step, our POST request to the endpoint:

<img src="/home/gustavo/.config/Typora/typora-user-images/image-20210628160608191.png" alt="image-20210628160608191" style="zoom:60%;" /><img src="/home/gustavo/.config/Typora/typora-user-images/image-20210628160627351.png" alt="image-20210628160627351" style="zoom:67%;" />

Will look like this:

​	curl -H <span style="color:green">"Authorization: Basic YTA4...OGI=:ZjNi...TI="</span> -d <span style="color:blue">grant_type=authorization_code</span> -d <span style="color:yellow">code=AQDU9k6...</span> -d <span style="color:turquoise">redirect_uri=https%3A%2F%2F`www.google.com.br%2F`</span> <span style="color:orange">`https://accounts.spotify.com/api/token`</span>

We will make this request through **The Command Line Interface**

---



Brief explanation of **curl** options (the -H and -d showing up)

​		-H  -> Extra header to include in the request when sending HTTP to a server. 

​		-d  -> Sends the specified data in a POST request to the HTTP server, .This will cause curl to pass the data to the server using the content-type application/x-www-form-urlencoded. 

With that out of the way ::::::::::::::::

The parameters used for the  request are:

- grant_type

  By default(in docs) it has to be **"authorization_code"**

  

  To be used:

  *grant_type="authorization_code"*

  

- code

  The authorization code returned from the initial request made on Step 1, will give us the value for this **code**.

  

  The value of this code will show up on the URL address bar as soon as you are redirected.

   So we need to copy it and pass to our 'code' parameter before it expires. 

  ![image-20210628161854688](/home/gustavo/.config/Typora/typora-user-images/image-20210628161854688.png)

  **This is the code that we will exchange for an Access Token.**

​		To be used:

​		*code=AQDU9k6.....*



- redirect_uri

  The same one you provided in the previous step

  

  To be used:

  *redirect_uri=https%3A%2F%2Fwww.google.com.br%2F*

  

- Authorization

  Acording to the docs:

   "Base 64 encoded string that contains the client ID and client secret key. The field must have the format: Authorization: Basic *<base64 encoded **client_id:client_secret**>*""

  

  That means we need to go to the SPotify Dashboard and get the value of our:
  

  -client_id  (suppose it's ABC)

  -client_secret  (suppose it's DEF)

  

  Then, we need to write it down like below (dont forget to add the colon between them):

  

  Enter in https://www.base64decode.org/ and add them as such:

  ABC:DEF

  And click on 'ENCODE'

  You will end up with long encrypted string.

  <img src="/home/gustavo/.config/Typora/typora-user-images/image-20210628173703016.png" alt="image-20210628173703016" style="zoom:50%;" />

  

**Once we put the endpoint + all the parameters we will have:**

​		curl -H <span style="color:green">"Authorization: Basic QUJDOkRFRg=="</span> -d <span style="color:blue">grant_type=authorization_code</span> -d <span style="color:yellow">code=AQDU9k6...</span> -d <span style="color:turquoise">redirect_uri=https%3A%2F%2F`www.google.com.br%2F`</span> <span style="color:orange">`https://accounts.spotify.com/api/token`</span>



With that done, we should receive back a response containing the **token_type** and the **access_token** among other things like **token_refresh**

![image-20210628203923787](/home/gustavo/.config/Typora/typora-user-images/image-20210628203923787.png)







---

## 3. Step 

PS* I didn't manage to get it work. Keep throwing error about undefined of 0.

But the authentication part works.

Feel free to see the 'intentions' behind the code with the comments.



![image-20210628174320212](/home/gustavo/.config/Typora/typora-user-images/image-20210628174320212.png)



