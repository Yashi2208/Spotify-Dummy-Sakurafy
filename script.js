console.log("Welcome to Sakurafy");

//Initialize the Variables
let songIndex=0;
let masterPlay = document.getElementById('masterPlay');
let audioElement = new Audio('song/4.mp3');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songsItems = Array.from(document.getElementsByClassName('songItem'));

let songs =[
    {songName: "Without-Me-Halsey", filePath:"song/1.mp3", coverPath: "cover/1.jpg"},
    {songName: "Shawn mandes, camilla cabello - señorita", filePath:"song/2.mp3", coverPath: "cover/2.jpg"},
    {songName: "Nuvole Bianche- Ludovico Einaudi", filePath:"song/3.mp3", coverPath: "cover/3.jpg"},
    {songName: "I AM WOMAN- Emily ", filePath:"song/4.mp3", coverPath: "cover/4.jpg"},
    {songName: "Dil Ko Karaar Aaya- Arijit Singh", filePath:"song/5.mp3", coverPath: "cover/5.jpg"},
    {songName: "Sasha Sloan- Dancing With Your Ghost", filePath:"song/6.mp3", coverPath: "cover/6.jpg"},
    {songName: "Love Me- Justin Bieber", filePath:"song/7.mp3", coverPath: "cover/7.jpg"},
    {songName: "Who Says- Selena Gomez", filePath:"song/8.mp3", coverPath: "cover/8.jpg"},
    {songName: " Gayatri Mantra- Anuradha Paudwal ", filePath:"song/9.mp3", coverPath: "cover/1.jpg"},
]

songsItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})

//audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //Update SeekBar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })

}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.src = `song/${songIndex+1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -=1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})