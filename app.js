//Single State Object
var state = {
  items: []
};

//Modification Functions
function getDataFromApi(searchTerm, callback) {
  var youtubeURL = 'https://www.googleapis.com/youtube/v3/search';
  var query = {
    part: 'snippet',
    key:'AIzaSyBKraYE20XvQW71WAVGhFnmOqEOYFfvQDc',
    q: searchTerm,
    per_page: 5
  }
  $.getJSON(youtubeURL, query, callback);
}

function displaySearchResults(data){
  var results = data.items.map(function(item, index) {
    return renderResult(item);
  });
  $('.js-search-results').html(results);
}

//Render Functions
function renderResult(result) {
  var resultHTML = 
  '<h2> Results </h2>' +
  '<div>' +  
    '<a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><img src="${result.snippet.thumbnails.medium.url}"></a>' +
  '</div>';
  return resultHTML; 
}

//Event Listeners
function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    var queryTarget = $(event.currentTarget).find('.js-query');
    var query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displaySearchResults);
  });
}

$(function(){
  watchSubmit();
}); 
