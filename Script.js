document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("input").addEventListener("change", (event) => {
    const song = event.target.files[0];
    let play = " ";

    jsmediatags.read(song, {
      onSuccess: function (tag) {
        audioPlayer.pause();
        document.getElementById("play-btn").src = "/img/play.svg";

        // Array buffer to base64
        const data = tag.tags.picture.data;

        const format = tag.tags.picture.format;
        let base64String = "";
        for (let i = 0; i < data.length; i++) {
          base64String += String.fromCharCode(data[i]);
        }
        // Output the metadata
        document.querySelector(
          ".artcover"
        ).src = `data:${format};base64,${window.btoa(base64String)}`;
        document.querySelector(".Song-name").textContent = tag.tags.title;
        document.querySelector(".singer-name").textContent = tag.tags.artist;
      },
      onError: function (error) {
        console.log(error);
      },
    });
    const audioPlayer = document.getElementById("player");
    audioPlayer.src = URL.createObjectURL(song);
    // ----------------------------------------------------------

    // ------------------------------------------------------------------
    document.querySelector("#play-btn").addEventListener("click", function () {
      if (play == " " || play == false) {
        audioPlayer.play();
        play = true;
        document.getElementById("play-btn").src = "/img/pause.svg";
        var totalDuration = audioPlayer.duration;

        var minutes = Math.floor(totalDuration / 60);
        var seconds = Math.floor(totalDuration % 60);
        document.getElementById("end-time").innerText =
          minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
      } else if (play == true) {
        audioPlayer.pause();
        play = false;
        document.getElementById("play-btn").src = "/img/play.svg";
      }
    });

    audioPlayer.addEventListener("timeupdate", function () {
      // Get the current time of the audio in seconds
      var currentTime = audioPlayer.currentTime;

      // Convert the current time from seconds to a human-readable format (HH:MM:SS)
      var minutes = Math.floor(currentTime / 60);
      var seconds = Math.floor(currentTime % 60);
      document.getElementById("start-time").innerText =
        minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    });

    document
      .querySelector("#seekForward")
      .addEventListener("click", function () {
        if (audioPlayer && typeof audioPlayer.currentTime !== "undefined") {
          audioPlayer.currentTime += 5;
        }
      });
    document
      .querySelector("#seekprevious")
      .addEventListener("click", function () {
        if (audioPlayer && typeof audioPlayer.currentTime !== "undefined") {
          audioPlayer.currentTime -= 5;
        }
      });
  });
});
