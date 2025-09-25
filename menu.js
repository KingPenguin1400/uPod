const jsmediatags = window.jsmediatags;
const inputFile = document.getElementById('inputFile');
const myAudio = document.getElementById('myAudio');
const menuDiv = document.getElementById("menuDiv");
const circle0 = document.getElementById("circle0");

inputFile.addEventListener("change", event =>{
    circle0.onclick = function(){
        console.log("it works!");
        document.getElementById("songDetails").innerHTML = `
            <nav>
                <div class="circle0" id="circle0">
                    <i class="fa-solid fa-arrow-left"></i>
                </div>
                <div class="circle1">
                    <div id="menuDiv"><i class="fa-solid fa-bars"></i></div>
                    
                </div>
            </nav><br>
            <div id="cover"></div>
            <p id="title" style="font-size: 2rem; margin: 5px; margin-top: 1rem;"></p>
            <p id="artist"></p>
            <p id="album"></p>
            <div class="audio-controls">
                <audio id="myAudio"></audio>
                <input type="range" id="progress">
                <div class="cbuttons">
                    <div><i class="fa-solid fa-backward"></i></div>
                    <div id="playPauseDiv"><i class="fa-solid fa-pause" id="playpausebtn"></i></div>
                    <div><i class="fa-solid fa-forward"></i></div>
                </div>
            </div>
        `;
    }
});
