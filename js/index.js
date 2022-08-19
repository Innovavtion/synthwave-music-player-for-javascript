//Html objects
const player = document.querySelector('.player'),
    playButton = document.querySelector('.play_button'),
    playImgButton = document.querySelector('.img_play_button'),
    previoseButton = document.querySelector('.skip_previose_button'),
    nextButton = document.querySelector('.skip_next_buttton'),
    audio = document.querySelector('.audio'),
    lineTrack = document.querySelector('.line_track'),
    lineProgressTrack = document.querySelector('.line_progress_track'),
    progressTrackButton = document.querySelector('.button_progress_track'),
    nameSong = document.querySelector('.name_music'),
    coverImg = document.querySelector('.cover_img');

//Name and Img Songs
const songs = [
    {
        'name' : 'Lazerhawk - Overdrive',
        'img' : '1'
    },
    {
        'name' : 'Lazerpunk - Speedracer (feat. Quixotic)',
        'img' : '2'
    },
    {
        'name' : 'Northern Lights - Night Drive',
        'img' : '3'
    }
];

//Basic start song
let songId = 0;

//Load Song
function loadSong(song) {
    nameSong.innerHTML = songs[song].name;
    audio.src = `audio/${songs[song].name}.mp3`;
    coverImg.src = `img/cover/${songs[song].img}.jpg`;
}

loadSong(songId);

//Play Song
function playSong() {
    //Add class html tag
    player.classList.add('play');
    //Update img playImgButton
    playImgButton.src = `img/icons/PauseCircle.svg`;
    //start play music
    audio.play();
}

function puaseSong() {
    //Delete class html tag
    player.classList.remove('play');
    //Update img playImgButton
    playImgButton.src = `img/icons/PlayCircle.svg`;
    //pause play music
    audio.pause();
}

//Обработчик событий для кнопки проигрывания песни
playButton.addEventListener('click', () => {
    //Check html tag for the presence class 'play'
    const isPlay = player.classList.contains('play');

    if (!isPlay) {
        playSong();
    } else {
        puaseSong();
    }
})

//Next song
function nextSong() {
    songId++;

    if (songId  > songs.length - 1) {
        songId = 0;
    }

    loadSong(songId);
    playSong();
}

//Обработчик событий для кнопки nextBytton
nextButton.addEventListener('click', () => {
    nextSong();
})

//Previose song
function previoseSong() {
    songId--;

    if (songId  < 0) {
        songId = songs.length - 1;
    }

    loadSong(songId);
    playSong();
}

//Обработчик событий для кнопки previoseButton
previoseButton.addEventListener('click', () => {
    previoseSong();
})

//Progress Song
function progressSong(event) {
    //Достаем из event.srcElement переменные duration, currentTime
    const {duration, currentTime} = event.srcElement;
    //Просчитываем процент прогресса песни
    const progressPercent = (currentTime / duration) * 100;
    //Обновляем длину линии тега lineProgressTrack
    lineProgressTrack.style.width = `${progressPercent}%`;

    if (duration == currentTime) {
        nextSong();
    }
}

//Прослушивание события с помощью агрумента timeupdate и вызов функции progressSong
audio.addEventListener('timeupdate', progressSong);

//Set Progress Song
function setProgressSong(event) {
    //Получаем ширену блока lineTrack
    const widthLineTrack = this.clientWidth;
    //Получаем координаты X при клике мышкой на lineTrack
    const clickLineTrack = event.offsetX;
    //Получаем время песни
    const durationTrack = audio.duration;
    
    audio.currentTime = (clickLineTrack / widthLineTrack) * durationTrack;
}

//Прослушивание события с помощью аргумента click и вызываем функцию setProgressSong
lineTrack.addEventListener('click', setProgressSong);