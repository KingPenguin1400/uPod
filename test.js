const fileInput = document.getElementById('inputFile');
const jsmediatags = window.jsmediatags;
const myAudio = document.getElementById('myAudio');

inputFile.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        myAudio.src = url;
        myAudio.load(); // Preload the audio
        myAudio.play(); // Optionally play the audio automatically
    }
});

fileInput.addEventListener('change', (event) => {
  const files = event.target.files;
  // Handle the selected files (directories and their contents)
  for (let i = 0; i < files.length; i++) {
    let file = event.target.files[i];
    let titleElement = document.getElementById("title");
    let artistElement = document.getElementById("artist");
    let albumElement = document.getElementById("album");
    let coverElement = document.getElementById("cover");

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
    //console.log(`File name: ${file.name}, path: ${file.webkitRelativePath}`);
  }
});