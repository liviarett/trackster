const API_KEY = '14a704bdfee98fbff469d873c9910a6b';

$('document').ready(function() {
    
   $('.search-bar').keydown(function(event) {
       if (event.which == 13) {
    Trackster.searchTracksByTitle($('.search-bar').val());
       };
    });
    
   $('#searchbutton').click(function() {
    Trackster.searchTracksByTitle($('.search-bar').val());
    });
   });
    


var Trackster = {};

function formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks. 
*/

Trackster.renderTracks = function(tracks) {
    console.log(tracks);
    $('.results').empty();
    for (var i = 0; i < tracks.length; i++) {
    var numberToFormat = tracks[i].listeners;   
    var mediumAlbumArt = tracks[i].image[1]['#text'];
    var trackRow = '<div class="row result"> \
                     <div class="col-xs-1"></div> \
                     <div class="col-xs-1 play"><a href="' + tracks[i].url + '"><i class="fa fa-play-circle-o" aria-hidden="true"></i></a></div> \
                     <div class="col-xs-1 rank">'+ (i + 1) + '</div> \
                     <div class="col-xs-3 song">'+ tracks[i].name + '</div> \
                     <div class="col-xs-2 artist">' + tracks[i].artist   + '</div> \
                     <div class="col-xs-2 album"><img src="' + mediumAlbumArt + '" /></div><div class="col-xs-1 popularity">' + formatNumber(numberToFormat) + '</div> \
                     <div class="col-xs-1 length"></div> \
                    </div>';
        $('.results').append(trackRow);
    };
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
    
    return $.ajax({
        url: 'http://ws.audioscrobbler.com/2.0/?method=track.search&track&track=' + title + '&api_key=' + API_KEY + '&format=json',
        success: function(response) { Trackster.renderTracks(response.results.trackmatches.track);
    } 
});    
};