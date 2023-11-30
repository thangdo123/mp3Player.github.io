const myAudio = document.getElementById("audio");
const coverImg = document.getElementById("cover-img");
const songName = document.getElementById("song-name");
const songsList = document.getElementById("songs-list");
const playBtn = document.getElementById("play-btn");
const songSlider = document.getElementById("slider");
const pauseIcon = document.getElementById("play-pause-icon");
const audioContainer = document.getElementById("audio-container");

const upBtn = document.getElementById("up");
const downBtn = document.getElementById("down");
const rightBtn = document.getElementById("right");
const leftBtn = document.getElementById("left");

let songs = [
  {
    name: "D (Half Moon)",
    cover: "./img/half moon.jpg",
    url: "./audio/Dean - D (Half Moon).mp3",
  },
  {
    name: "DIE 4 YOU",
    cover: "./img/die4you.jpg",
    url: "./audio/Dean - DIE 4 YOU.mp3",
  },
  {
    name: "What 2 Do",
    cover: "./img/what2do.jpg",
    url: "./audio/Dean - What 2 Do.mp3",
  },
];

myAudio.style.display = "none";

myAudio.onloadedmetadata = function () {
  const endTime = document.getElementById("end-time");
  endTime.innerHTML = convertTime(myAudio.duration);
  songSlider.max = myAudio.duration;
};

let currentSong = 0;

songName.innerHTML = songs[currentSong].name;
myAudio.src = songs[currentSong].url;
coverImg.src = songs[currentSong].cover;

function playPause() {
  if (myAudio.paused) {
    myAudio.play();
    pauseIcon.innerHTML = `<i class="bi bi-pause"></i>`;
  } else {
    myAudio.pause();
    pauseIcon.innerHTML = `<i class="bi bi-play"></i>`;
  }
}

function upVolume() {
  if (myAudio.volume == 1) {
    myAudio.volume = 1;
  } else {
    myAudio.volume += 0.1;
  }
}

function downVolume() {
  if (myAudio.volume == 0) {
    myAudio.volume = 0;
  } else {
    myAudio.volume = (myAudio.volume - 0.1).toFixed(1);
    console.log(myAudio.volume);
  }
}

function nextTrack() {
  currentSong += 1;

  if (currentSong === songs.length) {
    currentSong = 0;
  }
  songName.innerHTML = songs[currentSong].name;
  coverImg.src = songs[currentSong].cover;
  myAudio.src = songs[currentSong].url;
  myAudio.autoplay = true;
  pauseIcon.innerHTML = `<i class="bi bi-pause"></i>`;
}

function prevTrack() {
  currentSong -= 1;
  if (currentSong < 0) {
    currentSong = songs.length - 1;
  }
  songName.innerHTML = songs[currentSong].name;
  coverImg.src = songs[currentSong].cover;
  myAudio.src = songs[currentSong].url;
  myAudio.autoplay = true;
  pauseIcon.innerHTML = `<i class="bi bi-pause"></i>`;
}

function homeBtn() {
  songName.style.display = "none";
  coverImg.style.display = "none";
  audioContainer.style.display = "none";
  myAudio.pause();
  songsList.style.display = "flex";
  songList();
  playBtn.removeEventListener("click", playPause);
}

function backBtn() {
  audioContainer.style.display = "flex";
  songName.style.display = "block";
  coverImg.style.display = "block";
  songsList.style.display = "none";
  playBtn.addEventListener("click", playPause);
}

upBtn.addEventListener("click", upVolume);
downBtn.addEventListener("click", downVolume);
rightBtn.addEventListener("click", nextTrack);
leftBtn.addEventListener("click", prevTrack);
playBtn.addEventListener("click", playPause);

function songList() {
  songsList.innerHTML = "";
  songs.forEach((song) => {
    const newSong = document.createElement("div");
    newSong.id = "song-items";

    newSong.innerHTML = `
    <img id="song-pre-pic" src="${song.cover}" alt="" />
    <div id="song-pre-name">${song.name}</div>`;
    songsList.appendChild(newSong);
  });
}

function convertTime(rawTime) {
  let minute = Math.floor(rawTime / 60);
  let second = Math.floor(rawTime % 60);
  if (second < 10) {
    second = "0" + second;
  }

  return minute + ":" + second;
}

myAudio.addEventListener("timeupdate", () => {
  const playTime = document.getElementById("start-time");
  songSlider.value = myAudio.currentTime;
  playTime.innerHTML = convertTime(myAudio.currentTime);
  if (myAudio.currentTime == myAudio.duration) {
    nextTrack();
  }
});

songSlider.addEventListener("input", (e) => {
  console.log(e.target.value);
  myAudio.currentTime = e.target.value;
});
