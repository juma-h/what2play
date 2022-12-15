require("dotenv").config();
const express = require("express");
const querystring = require("query-string");
const axios = require("axios");
const app = express(); //instanstiation of the app
const port = 8888; //port to listen to
const stateKey = "spotify_auth_state"; //stores the generated string when auth to prevent cross-site request forgery

//storing  env variables
CLIENT_ID=xxxxxx
CILENT_SECRET=xxxxxx
const REDIRECT_URI = "http://localhost:8888/callback";


//tells app to have a GET request and respond with the below
app.get("/", (req, res) => {
  const data = {
    name: "Juma",
    isAwesome: true,
  };
  res.json(data);
});

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

//login route to redirect us to the auth page, with query params
app.get("/login", (req, res) => {
  const state = generateRandomString(16); //generated random string of length 16
  res.cookie(stateKey, state); //stores the value

  const scope = [
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'playlist-modify-public',
    'playlist-read-collaborative'

  ].join(' '); //scope of authorizations

  const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: scope,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

//callback to get Access token
app.get("/callback", (req, res) => {
  const code = req.query.code || null;
  console.log(code);

  const data = querystring.stringify({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: REDIRECT_URI,
  });

  axios
    .post("https://accounts.spotify.com/api/token", data, {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
      },
    })
    .then((response) => {
      
      if (response.status === 200) {
        const { access_token, refresh_token, expires_in } = response.data;

        //redirect to react app and pass to query params
        const queryParams = querystring.stringify({
          access_token,
          refresh_token,
          expires_in,
        });

        res.redirect(`http://localhost:3000/?${queryParams}`);
      } else {
        //redirect with error query
        res.redirect(`/?${querystring.stringify({ error: "invalid_token" })}`);
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

//api to refresh token after timeout
app.get("/refresh_token", (req, res) => {

  const { refresh_token } = req.query;

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

//tells app to listen to connection at said [port]
app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
