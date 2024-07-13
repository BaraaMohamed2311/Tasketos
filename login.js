let button_form = document.querySelector(".login-sec .wrapper button");
let inp_form = document.querySelector(".login-sec .wrapper input");
let intro = document.querySelector(".trip");
let next =document.querySelector(".next");
let audio_icon = document.querySelector("#audio");
let click =1;

let audio = new Audio("./imgs/monkey.mp3")
audio.loop = true;

    if(localStorage.getItem("tasketos_user")){
        intro.style = 'opacity:0;pointer-events:none;';
    }



    audio_icon.addEventListener('click',function(){
        ++click;
        if( click % 2 == 0){
            audio.play();
            audio_icon.setAttribute("class","fa-solid fa-volume-high")
        }
        else {
            audio.pause();
        audio.currentTime = 0;
            audio_icon.setAttribute("class","fa-solid fa-volume-xmark")
        }
    })





next.addEventListener('click',function(){
    intro.style = 'opacity:0;pointer-events:none;';
})

button_form.addEventListener('click',function(e){

    e.preventDefault();
    if(inp_form.value !== ''){
        let user = {
            "name" : inp_form.value,
            "hearts":["heart","heart","heart"],
            "balance":0,
            "level":"--Noob--"

        }
        localStorage.user = JSON.stringify(user);
        window.location.href = 'index.html';
    }
    
})

let img = document.querySelector(".user-img");
const timeOut = 5400000 // hour and half

setInterval(ImageOnTime,timeOut);

/*********************Audio*****************************/
ActivateAudio();
/******************************************************/