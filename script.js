//initialize the variable
let songIndex = 0;
let audioElement = new Audio('./songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById('progressBar')
let gif= document.getElementById('gif')
let masterSong = document.getElementById("masterSong")
// let  previous = document.getElementById("previous")
// let next = document.getElementById("next")
let songItems = Array.from(document.getElementsByClassName("songItem"))
let song=[
    {songName:"bla bla1" , filePath:"./songs/2.mp3" , coverPath:"./images/covers/1.jpg"},
    {songName:"bla bla2" , filePath:"./songs/2.mp3" , coverPath:"./images/covers/2.jpg"},
    {songName:"bla bla3" , filePath:"./songs/3.mp3" , coverPath:"./images/covers/3.jpg"},
    {songName:"bla bla4" , filePath:"./songs/4.mp3" , coverPath:"./images/covers/4.jpg"},
    {songName:"bla bla5" , filePath:"./songs/2.mp3" , coverPath:"./images/covers/5.jpg"},
    {songName:"bla bla6" , filePath:"./songs/2.mp3" , coverPath:"./images/covers/6.jpg"},
    {songName:"bla bla7" , filePath:"./songs/1.mp3" , coverPath:"./images/covers/7.jpg"}
    
]
songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = song[i].coverPath
    element.getElementsByClassName("songName")[0].innerText = song[i].songName;
})

//audioElement.play();
//handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterSong.innerText = song[songIndex].songName;
        masterPlay.classList.remove("fa-circle-play")
        masterPlay.classList.add("fa-circle-pause")
        gif.style.opacity=1;

    }else{
        audioElement.pause();
        masterPlay.classList.add("fa-circle-play")
        masterPlay.classList.remove("fa-circle-pause")
        gif.style.opacity=0;
    }
})
//listen to event
audioElement.addEventListener('timeupdate',()=>{
    //upade seekbar
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressBar.value = progress;
    
})
progressBar.addEventListener('change',()=>{
    audioElement.currentTime =( progressBar.value*audioElement.duration)/100;
})

const makeAllPlay = ()=>{
   
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        makeAllPlay();
        
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-circle-play")
        e.target.classList.add("fa-circle-pause")
        audioElement.src = `./songs/${songIndex+1}.mp3`
        masterSong.innerText = song[songIndex].songName;
        gif.style.opacity=1;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play")
        masterPlay.classList.add("fa-circle-pause")
    })
})
document.getElementById("next").addEventListener("click",()=>{
    if(songIndex>=6){
        songIndex=0
    }else{
        songIndex+=1;
    }
    audioElement.src = `./songs/${songIndex+1}.mp3`
    masterSong.innerText = song[songIndex].songName;
    gif.style.opacity=1;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play")
    masterPlay.classList.add("fa-circle-pause")
})

document.getElementById("previous").addEventListener("click",()=>{
    if(songIndex<=0){
        songIndex=6
    }else{
        songIndex-=1;
    }
    audioElement.src = `./songs/${songIndex+1}.mp3`
    masterSong.innerText = song[songIndex].songName;
    gif.style.opacity=1;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play")
    masterPlay.classList.add("fa-circle-pause")
})
