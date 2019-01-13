import SpotifyAPI from "../api/spotify.js";
import {getHashParams} from "../helpers/url.js";
import {STATE_KEY} from "../helpers/constants.js";

const USER_PROFILE = document.getElementById('user-profile');
const BATTLE_CONTAINER = document.getElementById('battle-container');
const RESULT = document.getElementById('result');
const ALERT_MESSAGE = document.getElementById('alert-message');
const {access_token, state} = getHashParams();
const storedState = localStorage.getItem(STATE_KEY);
const ENTER_KEYCODE = 13;

const getArtistsTemplate = (data) => {
    return '<div>${data.name}</div>';
}

// const onKeyPress = (event) => {
//     if(event.keyCode === ENTER_KEYCODE){
//         const currentInput = event.target;
//         SpotifyAPI get
//     }
// }
const outputTemplate = ({display_name, id, email, uri, external_urls, images, country}) => `<h1>Logged in as </h1>
  <div class="media">
    <div class="pull-left">
      <img class="media-object" width="150" src="">
    </div>
    <div class="media-body">
      <dl class="dl-horizontal">
        <dt>Display name</dt><dd class="clearfix">${display_name}</dd>
        <dt>Id</dt><dd>${id}</dd>
        <dt>Email</dt><dd>${email}</dd>
        <dt>Spotify URI</dt><dd><a href="${uri}">${uri}</a></dd>
        <dt>Link</dt><dd><a href="${external_urls.spotify}">${external_urls.spotify}</a></dd>
        <dt>Profile Image</dt><dd class="clearfix"><a href=""></a></dd>
        <dt>Countryyy</dt><dd>${country}</dd>
      </dl>
    </div>.
  </div>`;

const outputTemplateWinner = ({name, popularity, uri, images, followers}) => `<h1>${name} </h1>
  <div class="media">
    <div class="pull-left">
      <img class="media-object" width="150" src="">
    </div>
    <div class="media-body">
      <dl class="dl-horizontal">
        <dt>Display name</dt><dd class="clearfix">${name}</dd>
        <dt>Followers</dt><dd>${followers.total}</dd>
        <dt>Popularity</dt><dd>${popularity}</dd>
        <dt>URI</dt><dd>${uri}</dd> 
        
        
        <dt>Image</dt><dd><img src="${images[0].url}" width="200"></dd>
      </dl>
    </div>
  </div>
    <div>
   <input type="button" id="btn-reset" class="btn btn-primary" value="Reset" />
</div>`;


const outputTemplateDraw = (artist1,artist2) => `
  <div class="row">
    <div class="col-md-6 col-xs-12">
    <h1>${artist1.name} </h1>
  <div class="media">
    <div class="pull-left">
      <img class="media-object" width="150" src="">
    </div>
    <div class="media-body">
      <dl class="dl-horizontal">
        <dt>Display name</dt><dd class="clearfix">${artist1.name}</dd>
        <dt>Followers</dt><dd>${artist1.followers.total}</dd>
        <dt>Popularity</dt><dd>${artist1.popularity}</dd>
        <dt>URI</dt><dd>${artist1.uri}</dd> 
        
        
        <dt>Image</dt><dd><img src="${artist1.images[0].url}" width="200"></dd>
      </dl>
    </div>
  </div>
   
</div>
    <div class="col-md-6 col-xs-12">
    <h1>${artist2.name} </h1>
  <div class="media">
    <div class="pull-left">
      <img class="media-object" width="150" src="">
    </div>
    <div class="media-body">
      <dl class="dl-horizontal">
        <dt>Display name</dt><dd class="clearfix">${artist2.name}</dd>
        <dt>Followers</dt><dd>${artist2.followers.total}</dd>
        <dt>Popularity</dt><dd>${artist2.popularity}</dd>
        <dt>URI</dt><dd>${artist2.uri}</dd> 
        
        
        <dt>Image</dt><dd><img src="${artist2.images[0].url}" width="200"></dd>
      </dl>
    </div>
  </div>
    <div>
</div>
</div>
  </div>
<div class="reset-container">
   <input type="button" id="btn-reset" class="btn btn-primary" value="Reset" />
</div>`;


(function () {


    const battleButton = document.getElementById('btn-battle');



    battleButton.addEventListener('click', function(){

        const artist1 = document.getElementById('artist1');
        const artist2 = document.getElementById('artist2');
        const battleType = document.getElementById('battle-type');

        SpotifyAPI.getArtistsData(access_token, artist1.value, artist2.value).then(data => {

            const artist1 = data.artists[0];
            const artist2 = data.artists[1];
            let winner;
            console.log(battleType.value);

            switch (battleType.value) {
                case 'popularity' : winner = SpotifyAPI.comparePopularity(artist1, artist2);
                    break;
                case 'followers' : winner = SpotifyAPI.compareFollowers(artist1, artist2);
                    break;
                default : winner = null;
                    break;
            }

            if (winner !== null) {

                if (winner.length === 2) {
                    RESULT.innerHTML = outputTemplateDraw(winner[0], winner[1]);

                    BATTLE_CONTAINER.style.display = "none";

                    const resetButton = document.getElementById("btn-reset");
                    resetButton.addEventListener("click", function(){

                        RESULT.innerHTML = "";
                        BATTLE_CONTAINER.style = null;

                    })
                } else {

                    BATTLE_CONTAINER.style.display = "none";
                    RESULT.innerHTML = outputTemplateWinner(winner);

                    const resetButton = document.getElementById("btn-reset");
                    resetButton.addEventListener("click", function(){

                        RESULT.innerHTML = "";
                        BATTLE_CONTAINER.style = null;

                    })

                }

                console.log('winner: ' + winner.name);
                console.log(winner);
            } else {
                ALERT_MESSAGE.innerText = 'Please choose a battle type.';
                ALERT_MESSAGE.style.display = 'block';
            }

        });

    });

})();

if (!access_token || (state == null || state !== storedState)) {
  window.location = "/";
} else {

  SpotifyAPI.getUserData(access_token).then(data => {
    console.log(data);
      // BATTLE_CONTAINER.innerHTML = outputTemplateInitial();
     // USER_PROFILE.innerHTML = outputTemplate(data);
  });

}