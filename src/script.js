console.log("hello ");
async function getSongs() {
  let a = await fetch("http://127.0.0.1:5500/songs/");
  let response = await a.text();
  // console.log(response);
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let i = 0; i < as.length; i++) {
    const element = as[i];
    if (element.href.endsWith("mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;
}
async function main() {
  // Get the list of all the songs
  let songs = await getSongs();
  console.log(songs);

  let songUL = document
    .querySelector(".songlist")
    .getElementsByTagName("ul")[0];

  for (const song of songs) {
    songUL.innerHTML =
      songUL.innerHTML +
      `
     <li class="hover  text-grey transiton">
                        
     <img class="invert hover-invert" src="/assets/music.svg" alt="home">
                <div class="info">
                    <Div>${song
                      .replaceAll("%20", " ")
                      .replaceAll(".mp3", "!")}</Div>
                  </div>
                     <!-- play button -->
                <div class="play  flex justify-center items-center">
                    <i class="ri-play-large-fill"></i>
                </div>    </li>`;
  }
  // Play the first song
  var audio = new Audio(songs[0]);
  audio.play();

  audio.addEventListener("loadeddata", () => {
    let duration = audio.duration;
    // The duration variable now holds the duration (in seconsds) of the aduio clip
    // console.log(audio.duration,audio.currentSrc ,audio.current);
  });
}
main();
