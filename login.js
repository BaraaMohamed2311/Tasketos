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
        let tasketos_user = {
            name : inp_form.value,
            hearts:["heart","heart","heart"],
            earned:0,

        }
        localStorage.tasketos_user = JSON.stringify(tasketos_user);
        window.location.href = 'index.html';
    }
    
})

let img = document.querySelector(".user-img");

setInterval(function(){
    let hour = new Date().getHours();
    if(hour < 3){
    img.setAttribute('src',"imgs/inc1.JPG")
    }
    
    else if(hour >= 3 && hour < 6){
        img.setAttribute('src',"imgs/inc2.JPG")
    }
    
    
    else if(hour >= 6 && hour < 9){
        img.setAttribute('src',"imgs/inc3.JPG")
    }
    
    else if(hour >= 9 && hour < 12){
        img.setAttribute('src',"imgs/inc4.JPG")
    }
    
    else if(hour >= 12 && hour < 15){
        img.setAttribute('src',"imgs/inc5.JPG")
    }
    
    else if(hour >= 15 && hour < 18){
        img.setAttribute('src',"imgs/inc6.JPG")
    }
    
    else if(hour >= 18 && hour < 21){
        img.setAttribute('src',"imgs/inc7.JPG")
    }
    
    else if(hour >= 21 && hour < 24){
        img.setAttribute('src',"imgs/inc8.JPG")
    }
},1000);