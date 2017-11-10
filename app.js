let state = {
  nextPageToken:"",
  query:""
}

//Modification Functions
function getDataFromApi(searchTerm, callback) {
  var youtubeURL = 'https://www.googleapis.com/youtube/v3/search';
  var query = {
    part: 'snippet',
    key:'AIzaSyBKraYE20XvQW71WAVGhFnmOqEOYFfvQDc',
    q: searchTerm,
    maxResults: 6,
  }
  if(state.nextPageToken){
    query.pageToken = state.nextPageToken
  }
  $.getJSON(youtubeURL, query, callback);
}

function displaySearchResults(data){
  state.nextPageToken=data.nextPageToken;
  var results = data.items.map(function(item, index) {
    return renderResult(item);
  });
  $('.js-search-results').html(results);
}

//Render Functions
function renderResult(result) {
  
  var resultHTML =  
    `<div class="result-section" data-video-id="${result.id.videoId}">
       <h2>${result.snippet.title}</h2>
       <h3>by <a href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">${result.snippet.channelTitle}</a></h3>
       <img src="${result.snippet.thumbnails.medium.url}">
    </div>`;
  return resultHTML; 
}
//<a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">

//Event Listeners
function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    let queryTarget = $('#js-query');
    queryTarget.val();
    queryTarget.val("");// clear out the input
    $('#next-page-button').removeClass("hidden")
    getDataFromApi(state.query, displaySearchResults);
  });
  
  $('#next-page-button').click(function(event) {
    getDataFromApi(state.query, displaySearchResults);
    $(window).scrollTop(0);
  });
  
  $(".js-search-results").on("click", '.result-section',function(event) {
    $('#black-screen').removeClass("hidden")
    
    var videoId = $(this).attr("data-video-id")
    console.log(videoId)
    $("#white-screen").html(`
      <iframe 
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/${videoId}" 
        frameborder="0" 
        allowfullscreen>
      </iframe>`)
  });
  $("#black-screen").click(function(event) {
    $('#black-screen').addClass("hidden")
  });
}

$(function(){
  watchSubmit();
}); 
