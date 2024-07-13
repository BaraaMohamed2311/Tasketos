import ActivateAudio from "./utils/ActivateAudio.js";
import ImageOnTime from "./utils/ImageOnTime.js";

let button_form = document.querySelector(".login-sec .wrapper button");
let inp_form = document.querySelector(".login-sec .wrapper input");
let intro = document.querySelector(".trip");
let next =document.querySelector(".next");






if(localStorage.getItem("user")){
    intro.style = 'opacity:0;pointer-events:none;';

}


next.addEventListener('click',function(){
    intro.style = 'opacity:0;pointer-events:none;';
})

button_form.addEventListener('click',function(e){

    e.preventDefault();

    
    if(localStorage.getItem("user") && inp_form.value !== ''){
        intro.style = 'opacity:0;pointer-events:none;';
        let user = JSON.parse(localStorage.getItem("user"));
        user.name = inp_form.value;
        localStorage.setItem("user", JSON.stringify(user));
    }
    else if(inp_form.value !== ''){
        let user = {
            "name" : inp_form.value,
            "hearts":["heart","heart","heart"],
            "balance":0,
            "level":"--Noob--"

        }
        localStorage.setItem("user", JSON.stringify(user));
        
    }
    window.location.href = 'index.html';
    
})

let img = document.querySelector(".user-img");
const timeOut = 5400000 // hour and half

setInterval(ImageOnTime,timeOut);

/*********************Audio*****************************/
ActivateAudio();
/******************************************************/