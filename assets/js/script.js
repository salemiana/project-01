var userFormEl = document.querySelector('#user-form');
var artistInputEl = document.querySelector('#artist');
var albumInputEl = document.querySelector('#album');
var resultsContainerEl = document.querySelector('#results-container');
var resultSearchTerm = document.querySelector('#result-search-term');
var hideInfoBoxesEl = document.querySelectorAll('.info-boxes');
var youtubeContainerEl = document.querySelector('#youtube-container');
var resultTitleEl = document.querySelector('.youtube-title');
var artist_BTN = "button is-rounded is-fullwidth mt-1";
var HISTORY_DATA = "artist-data";
var HISTORY_ARTIST = 'artistSearchHistory';
//var btn = document.querySelector('#button')

var historyArr = JSON.parse(localStorage.getItem(HISTORY_ARTIST));
if (!historyArr) {
  historyArr = [];
}

var searchHistory = $("#artist-history").empty();

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();

 

    
   //hide info boxes
   hideInfoBoxesEl.forEach(el => el.setAttribute("style", "display:none"));
       

    // get value from input element
    var artist = artistInputEl.value.trim();
    //add artist to History
    addArtistHistory(artist);
  
    if (artist) {
      getArtist(artist);
      searchByKeyword(artist);
  
      // clear old content
      resultsContainerEl.textContent = '';
      artistInputEl.value = '';

      youtubeContainerEl.textContent = '';
    } else {
      alert('Please enter an artist');
    }
    
    
  };


var getArtist = function(artist) {
    //format the github api url
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'genius.p.rapidapi.com',
            'X-RapidAPI-Key': '284cc868e3mshb53d5d29c0255a9p11cbc8jsn4a2488211b96'
        }
    };
    
    fetch('https://genius.p.rapidapi.com/search?q=' + artist, options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            displayHighlights(data.response.hits, artist)
        })
        //.then(response => console.log(response))
        .catch(err => console.error(err));
        //displayHighlights(data, artist)
}

var displayHighlights = function(hits,searchTerm) {
    // check if api returned any highlights
    if (hits.length === 0) {
      resultsContainerEl.textContent = 'No songs found.';
      return;
    }
  
    resultSearchTerm.textContent = 'Showing Top 10 Songs for: ' + searchTerm;
    //var artist_id = hits[0].result.primary_artist
    // loop over highlights
    resultsContainerEl.innerHTML =" ";
    for (var i = 0; i < hits.length; i++) {

      // format highlights name
      var highlightsName = hits[i].result.full_title;
      console.log(highlightsName);
  
      // create a container for each highlight
      var highlightsEl = document.createElement("div");
      highlightsEl.classList = 'list-item column is-3 is-justify-content-space-between is-align-content-center';
    
  
      // create a span element to hold highlight name
      var titleEl = document.createElement('p');
      titleEl.classList = 'album-title'
      titleEl.textContent = highlightsName;
  
      // append to container
      highlightsEl.appendChild(titleEl);
  
      // create a status element
      var statusEl = document.createElement('span');
      statusEl.classList = 'is-flex-direction-row is-align-content-center';

      var imageEl = document.createElement('img');
      imageEl.setAttribute("src", hits[i].result.song_art_image_url)
      imageEl.classList.add("song-art")
      highlightsEl.appendChild(imageEl);

    var linkEl = document.createElement('a')
    var ButtonEl = document.createElement('button')
    ButtonEl.classList = 'button is-block'
    linkEl.setAttribute("href", hits[i].result.url)
    linkEl.setAttribute("target","_blank")
    ButtonEl.textContent = "Get lyrics";

    linkEl.appendChild(ButtonEl);

    highlightsEl.appendChild(linkEl);
      // append container to the dom
    resultsContainerEl.appendChild(highlightsEl);

    

    // $("#artist-history").on("click", handleHistoryItemClick);

    
        
    }
};

// var showHide = function() {
//     var div = document.getElementById('#info-boxes');
//     if (div.style.display == 'none') {
//       div.style.display = '';
//     }
//     else {
//       div.style.display = 'none';
//     }
//   }



    // var apiURL = "https://genius.p.rapidapi.com/" + artist + "/:id/songs"
    // make a get request to url
    
    
    // fetch('https://genius.p.rapidapi.com/search?q=' + artist, options)
      
    //   .then(function(response) {
    //     // request was successful
    //     if (response.ok) {
    //       console.log(response);
    //       response.json().then(function(data) {
    //         console.log(data);
    //         // displayAlbums(data, artist);
    //       });
    //     } else {
    //       alert('Error: ' + response.statusText);
    //     }
    //   })
    //   .catch(function(error) {
    //     alert('Unable to connect to Musitory');
    //   });
  

  // add event listeners to forms
userFormEl.addEventListener('submit', formSubmitHandler);


//get youtube api
    
  function searchByKeyword(artist) { 
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
        'X-RapidAPI-Key': 'f9fa5ec95cmsha156214863c7e4dp16eefejsn65733400f7ba'
      }
    }
    
    fetch('https://youtube-v31.p.rapidapi.com/search?q='+ artist +'songs&part=id%2Cid&regionCode=US&maxResults=5', options) //&order=date
      .then(response => response.json())
      .then(data => {
          console.log(data)
          displayArtistVideo(data.items, artist)
      })
      .then(response => console.log(response))
      .catch(err => console.error(err));
  };
  
var displayArtistVideo = function(items) {
    // check if api returned any highlights
    youtubeContainerEl.innerHTML = "";
    if (items.length === 0) {
        youtubeContainerEl.textContent = 'No videos found.';
        return;
      }

      resultTitleEl.textContent = 'Artist Youtube Videos:';

      for (var i = 0; i < items.length; i++) {

        // format highlights name
        var videoId = items[i].id.videoId;
        console.log(videoId);

        var youtubeEl = document.createElement("iframe");
        youtubeEl.setAttribute("src", "https://www.youtube.com/embed/" + videoId);
        youtubeEl.style.width = "300px";
        youtubeEl.style.height = "200px";
        youtubeContainerEl.appendChild(youtubeEl);

}

}

function artistHistory() {
    // clear artist history
    var searchHistory = $("#artist-history").empty();
    console.log("adding artist history");
  
    // for each item in history array
    historyArr.forEach(artist => {
      // create a button and add classes/attributes
      var btn = $("<button>").addClass(artist_BTN);
      btn.attr(HISTORY_DATA, artist);
      btn.text(artist);
      btn.on("click", function(event){
        getArtist(event.target.textContent);
        searchByKeyword(event.target.textContent);
      })
      // append button to search history
      searchHistory.append(btn);
    });
  }
  
  function addArtistHistory(artist) {
    // not to add artist in history twice
    console.log(historyArr);
    if (!historyArr.includes(artist)&& artist.trim()) {
    
      historyArr.push(artist);
      localStorage.setItem(HISTORY_ARTIST, JSON.stringify(historyArr));
      artistHistory();
    } 
  }

  function handleHistoryItemClick(event) {
    if (event.target.matches("button")) {
      displayHighlights($(event.target).attr(HISTORY_DATA));
    }
  }

  artistHistory();