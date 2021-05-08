const getToken = async() =>{
    const clientId = "d7342d5312764b4494f109ad83697ec4";
    const clientSecret = "19038b0ca6b54e14868e7cde088b9a07";
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
                }, 
                body: 'grant_type=client_credentials'
            });

    const data = await result.json();
    return data.access_token;
}

async function spotify() {
    let $spotify = $('.spotify');
    let userAccessToken = await getToken();
    let result = await fetch("https://api.spotify.com/v1/browse/featured-playlists?country=US", {
        method: "GET",
        headers: { 'Authorization' : `Bearer ${userAccessToken}`}

      })

    let json =  await result.json();
    let x = json.playlists.items.length;
    let randomPlaylists = [];
    for(let i = 0; i < x; i++) {
        let rand = Math.floor(Math.random() * x);
        if(!randomPlaylists.includes(rand)) {
            randomPlaylists.push(rand);
        }
    }

    let x1 = json.playlists.items[randomPlaylists[0]];
    let x2 = json.playlists.items[randomPlaylists[1]];
    let x3 = json.playlists.items[randomPlaylists[2]];
    let x4 = json.playlists.items[randomPlaylists[3]];

    let playlistHtml = document.createElement('div');
    playlistHtml.className = "spotifyImg"
    playlistHtml.innerHTML = `
      <div id="row">
        <div id="columnSpot">
            <a href= ${x1.external_urls.spotify} target="_blank" id = "pl1">
                <img src= ${x1.images[0].url} alt="playlist1" style="width:100%" class="img-thumbnail">
            </a>
        </div>
        <div id="columnSpot">
            <a href= ${x2.external_urls.spotify} target="_blank" class = "pl2">
                <img src=${x2.images[0].url} alt="playlist2" style="width:100%" class="img-thumbnail">
            </a>
        </div>
        <div id="columnSpot">
            <a href= ${x3.external_urls.spotify} target="_blank" class = "pl3">
                <img src=${x3.images[0].url} alt="playlist3" style="width:100%" class="img-thumbnail">
            </a>
        </div>
        <div id="columnSpot">
            <a href= ${x4.external_urls.spotify} target="_blank" class = "pl4">
                <img src=${x4.images[0].url} alt="playlist4" style="width:100%" class="img-thumbnail">
            </a>
        </div>
    </div>
    
    `
      $spotify.append(playlistHtml);

}

spotify();


