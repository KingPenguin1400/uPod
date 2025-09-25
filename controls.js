const progress = document.getElementById("progress");
const myAudio1 = document.getElementById("myAudio");
const playpausebtn = document.getElementById("playpausebtn");
const playPauseDiv = document.getElementById("playPauseDiv");

playPauseDiv.innerHTML = `<i class="fa-solid fa-pause" id="playpausebtn"></i>`;

document.getElementById("inputFile").addEventListener("change", event => {
    myAudio1.onloadedmetadata = function(){
        progress.max = myAudio1.duration;
        progress.value = myAudio1.currentTime;
    }

    
});
playPauseDiv.onclick = function() {
    if(myAudio1.paused){
        myAudio1.play();
        playPauseDiv.innerHTML = `<i class="fa-solid fa-pause" id="playpausebtn"></i>`;
    }
    else{
        myAudio1.pause();
        playPauseDiv.innerHTML = `<i class="fa-solid fa-play" id="playpausebtn"></i>`;
    }
};

if(myAudio1.play()){
    setInterval(()=>{
        progress.value = myAudio1.currentTime;
    },500);
}

progress.onchange = function(){
    myAudio1.play();
    myAudio1.currentTime = progress.value;
    playPauseDiv.innerHTML = `<i class="fa-solid fa-pause" id="playpausebtn"></i>`;

}
