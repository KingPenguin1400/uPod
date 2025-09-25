const jsmediatags = window.jsmediatags;
const inputFile = document.getElementById('inputFile');
const myAudio = document.getElementById('myAudio');
const menuDiv = document.getElementById("menuDiv");
const circle0 = document.getElementById("circle0");
const forwardDiv = document.getElementById("forwardDiv");
const backwardDiv = document.getElementById("backwardDiv");
let inmenu = false;
let songsArray = [];

/*inputFile.addEventListener('change', (event) => {
    const files = event.target.files;
    const file = event.target.files[Math.random() * files.length - 1];
    jsmediatags.read(file, {
        onSuccess: function(tag){
            let data = tag.tags.picture.data;
            let format = tag.tags.picture.format;
            let base64String = "";

            for(let i = 0;i < data.length;i++){
                base64String += String.fromCharCode(data[i]);
            }

            coverElement.style.backgroundImage = `url(data:${format};base64,${window.btoa(base64String)})`;
            //console.log(tag);
            titleElement.innerHTML = tag.tags.title;
            artistElement.innerHTML = tag.tags.artist;
            albumElement.innerHTML = tag.tags.album;
        },
        onError: function(error){
            //console.error(error);
        }
    });
});*/

inputFile.addEventListener("change", event =>{
    const files = event.target.files;
    if(files.length > 0){
        let file = event.target.files[Math.ceil(Math.random() * files.length - 1)];
        rollNewSong(file);
        forwardDiv.onclick = function(){
            file = event.target.files[Math.ceil(Math.random() * files.length - 1)];
            rollNewSong(file);
        }
        backwardDiv.onclick = function(){
            alert("oops, thats too convient to be free please buy uPod+");
        }
    }
});

function rollNewSong(file){
    let titleElement = document.getElementById("title");
    let artistElement = document.getElementById("artist");
    let albumElement = document.getElementById("album");
    let coverElement = document.getElementById("cover");

    jsmediatags.read(file, {
        onSuccess: function(tag){
            if (file) {
                const url = URL.createObjectURL(file);
                myAudio.src = url;
                myAudio.load(); // Preload the audio
                myAudio.play(); // Optionally play the audio automatically
            }

            let data = tag.tags.picture.data;
            let format = tag.tags.picture.format;
            let base64String = "";

            for(let i = 0;i < data.length;i++){
                base64String += String.fromCharCode(data[i]);
            }

            coverElement.style.backgroundImage = `url(data:${format};base64,${window.btoa(base64String)})`;
            //console.log(tag);
            titleElement.innerHTML = tag.tags.title;
            artistElement.innerHTML = tag.tags.artist;
            albumElement.innerHTML = tag.tags.album;
        },
        onError: function(error){
            console.error(error);
            console.error(file.webkitRelativePath);
        }
    });
}

inputFile.addEventListener("change", event =>{
    menuDiv.onclick = function(){
        alert("oops, thats also too convient to be free please buy uPod+");
        inmenu = true;
        const files = event.target.files;
        if(files.length > 0){
            document.getElementById("songDetails").innerHTML = `
                <nav>
                    <div class="circle0" id="circle0">
                        <i class="fa-solid fa-arrow-left"></i>
                    </div>
                </nav><br>
                <div class="input-container">
                    <input list="songsDatalist" style="visibility: visible; height: 20px" class="input" id="searchSongs" name="text" type="text" placeholder="Search your songs..."/><br>
                    <button onclick="searchSongsClicked()" id="searchSongsBtn">search</button>
                    <datalist id="songsDatalist"></datalist>
                </div><br>
                <br><div id="titleDiv" style="overflow: auto; max-height:350px; font-size: larger; text-align: left;">
                    <p id="title"></p>
                </div>
            `;
            const searchSongs = document.getElementById("searchSongs");
            const titleDiv = document.getElementById("titleDiv");
            const songsDatalist = document.getElementById("songsDatalist");
            for (let i = 0; i < files.length; i++){
                let file = event.target.files[i];
                let titleElement = document.getElementById("title");
                let artistElement = document.getElementById("artist");
                let albumElement = document.getElementById("album");
                let coverElement = document.getElementById("cover");

                jsmediatags.read(file, {
                    onSuccess: function(tag){
                        //console.log(tag);
                        let newP = document.createElement('p');
                        let newOption = document.createElement('option');
                        newP.innerHTML = tag.tags.title;
                        newOption.innerHTML = tag.tags.title;

                        titleDiv.appendChild(newP);
                        songsDatalist.appendChild(newOption);
                        songsArray.push(file);
                        //console.log(titleElement.innerHTML);
                    },
                    onError: function(error){
                        console.error(error);
                        console.error(`Error with ${file.webkitRelativePath}`);
                    }
                });
            };
        }
        function searchSongsClicked(){
            console.log("it works!")
            let songFromSongsArray = songsArray.indexOf(searchSongs.value);
            jsmediatags.read(songFromSongsArray, {
                onSuccess: function(tag){
                    if(songsArray.includes(searchSongs.value)){
                        let songFromSongsArray = songsArray.indexOf(searchSongs.value);
                        console.log(songFromSongsArray.webkitRelativePath);
                    }else{
                        console.error("entered song not found!");
                    }
                },
                onError: function(error){
                    console.error(error);
                    console.error(`Error with ${songFromSongsArray.webkitRelativePath}`);
                }
            });
        }
    }

    const searchSongs = document.getElementById("searchSongs");
    const titleDiv = document.getElementById("titleDiv");
    const songsDatalist = document.getElementById("songsDatalist");
    
    circle0.onclick = function(){
        console.log("it works!");
        alert("oops, thats also too convient to be free please buy uPod+");
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

    if(searchSongs !== undefined){
        console.log(searchSongs);
        searchSongs.addEventListener("keyup", (e) => {
            console.log(e);
        });
    }
});
