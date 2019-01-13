const getUserData = (accessToken) => {
  return fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
  }).then(response => response.json())
};

const getArtistData = (accessToken, artistId) => {
    return fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(response => response.json())
};

const getArtistsData = (accessToken, artist1Id, artist2Id) => {
    return fetch(`https://api.spotify.com/v1/artists?ids=${artist1Id},${artist2Id}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(response => response.json())
};

const comparePopularity = (artist1, artist2) => {
  if (artist1.popularity === artist2.popularity) {
      return [artist1, artist2];
  } else if (artist1.popularity > artist2.popularity) {
      return artist1;
  } else if (artist1.popularity < artist2.popularity) {
      return artist2;
  }
};

const compareFollowers = (artist1, artist2) => {
    if (artist1.followers.total === artist2.followers.total) {
        return [artist1, artist2];
    } else if (artist1.followers.total > artist2.followers.total) {
        return artist1;
    } else if (artist1.followers.total < artist2.followers.total) {
        return artist2;
    }
};

export default {
  getUserData,
  getArtistsData,
  comparePopularity,
  compareFollowers
}