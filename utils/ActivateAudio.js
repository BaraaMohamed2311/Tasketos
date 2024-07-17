

    

export default function ActivateAudio(){

    let audio_icon = document.querySelector("#audio");
    let AudioMode ="stopped";

    let audio = new Audio("./imgs/monkey.mp3")
    audio.loop = true;
    
    audio_icon.addEventListener('click',function(){
        
        if( AudioMode ==="stopped"){
            audio.play();
            audio_icon.setAttribute("class","fa-solid fa-volume-high")
            AudioMode ="playing"
        }
        else if(AudioMode ==="playing") {
            audio.pause();
            audio.currentTime = 0;
            audio_icon.setAttribute("class","fa-solid fa-volume-xmark")
            AudioMode ="stopped";
        }
    })
}

    