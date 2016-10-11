"use strict";

$(document).ready(() => {
  console.log("jquery is ready");
  var contentEl = $("#all-my-songs");
  var songs = [];

function getSongs() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "../songs.json"
    }).done((data) => {
      resolve(data);
    }).fail((xhr, status, error) => {
      reject(error);
    });
  });
}


function getSongs2(resultOfFirstAjax) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "../songs2.json"
    }).done((data2) => {
      songs = resultOfFirstAjax.songs;
      resolve(data2);
    }).fail((xhr2, status2, error2) => {
      reject(error2);
    });
  });
}

getSongs().then((dataPass)  => {
  console.log("dataPass", dataPass);
  console.log("song 1st then", songs);
  return getSongs2(dataPass);
}).then(function(dataPass2) {
  console.log("songs 2nd then", songs);
  console.log("dataPass2", dataPass2);
        var songData = "";
        var currentSong;

        dataPass2.songs.forEach(function(song){
          songs.push(song);
        });

        console.log("songs", songs);

        for (var i = 0; i < songs.length; i++) {
          currentSong = songs[i];

          songData += "<div class='song-block'>";
            songData += "<h1>" + currentSong.title + "</h1>";
            songData += "<div class='artist'>Performed by ";
              songData += currentSong.artist;
            songData += "</div>";
            songData += "<div class='album'>On the album ";
              songData += currentSong.album;
            songData += "</div>";
          songData += "</div>";
        }

        console.log("songData", songData);
        contentEl.html(songData);
  });

});


