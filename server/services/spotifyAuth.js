// Get access token to call Spotify API
export async function getAccessToken(id, secret) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${id}&client_secret=${secret}`,
  });

  const data = await response.json();
  return data.access_token;
}
