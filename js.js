let task_input = document.querySelector(".add-task-box input");
const add_btn = document.querySelector(".add-task-box button");
let gems_input = document.querySelector(".add-task-box .task-price")
const tasks_box = document.querySelector(".task-box .tasks");
let tasks = JSON.parse(localStorage.getItem("tasks")) ? JSON.parse(localStorage.getItem("tasks")) : [];
let task_text ,gems;
let Done_btns,Close_btns ;
const earned_span = document.querySelector("#earned");
let created_tasks;
const hearts_span = document.querySelector("#lives-span");
let hearts = localStorage.getItem("hearts")? JSON.parse(localStorage.getItem("hearts")) : [true,true,true];
let noti = document.querySelector(".notification")
let noti_icon = document.querySelector(".notification i");
let noti_h3 = document.querySelector(".notification h3");
let noti_h4 = document.querySelector(".notification h4");
let noti_btn = document.querySelector(".notification button");

let num_of_tasks = document.querySelector(".num-of-tasks span");
num_of_tasks.innerHTML = tasks.length ;

const username_h6 = document.querySelector(".username");
let username = localStorage.getItem("tasketos_user") ? JSON.parse(localStorage.getItem("tasketos_user")).name: "Anonymous";



// preloading

let preloading = document.querySelector(".preloader");
let preloading_span = document.querySelector(".preloader .loading-bar");

preloading_span.style = `animation:preload 2s ease infinite alternate ;
-webkit-animation:preload 2s ease infinite alternate ;`;

window.addEventListener('load',function(){
    this.setTimeout(function(){
        preloading.style=`opacity:0;pointer-events:none;`
    },2000);
})


// if user didn't login load the login.html
if(username !== "Anonymous"){
    username_h6.innerHTML = username;
}

else{
    window.location.href = 'login.html'
}



username_h6.addEventListener('click',function(){
    window.location.href = 'login.html'
})


// reseting 

if(tasks)
CreateTasksElement(tasks);

if(hearts.length == 0){
hearts_span.innerHTML = '<i class="heart fa-solid fa-heart-crack"></i>';
}
else {
    hearts_span.innerHTML = hearts.map(function(){
        return `<i class="heart fa-solid fa-heart"></i>`
    }).join('')
}


// to reset everything for every day passes
let today = new Date().getDate();
let stored_day;



if(localStorage.getItem("stored_day")){
    stored_day = JSON.parse(localStorage.getItem("stored_day"));

    if(stored_day !== today){
        console.log("restarting");
        localStorage.removeItem("tasks");
        localStorage.removeItem("earned");
        localStorage.removeItem("hearts");
        tasks_box.innerHTML = ''
        localStorage.stored_day = JSON.stringify(today);
    }
    
}
else{
    localStorage.stored_day = JSON.stringify(today);
}


earned_span.innerHTML = JSON.parse(localStorage.getItem("earned")) ? JSON.parse(localStorage.getItem("earned")) : 0;


// For pressing enter instead of add btn
    [task_input , gems_input].forEach(element =>{
        element.addEventListener('keydown',function(e){
            task_text = task_input.value;
            gems = gems_input.value;

            if(gems > 2500 ){
                tasks_box.innerHTML =`<div class="task" style = "color:red; font-weight:bold;">Enter value less than 2500</div>`;
                }

            if( task_text !== '' && gems !== '' && gems < 2500){
                if(e.keyCode == 13){
                    tasks.push({ task :task_text, priority:parseInt(gems) })
                    if(tasks.length > 1)
                    Sorting(tasks);
                    CreateTasksElement(tasks)
                }
            }
        })
    })
    


// For add btn
add_btn.addEventListener('click',function(){
    task_text = task_input.value;
    gems = gems_input.value;

    if(gems > 2500 ){
    tasks_box.innerHTML =`<div class="task" style = "color:red; font-weight:bold;">Enter value less than 2500</div>`;
    }

    if( task_text !== '' && gems !== '' && gems < 2500){
    tasks.push({ task :task_text, priority:parseInt(gems) })
    if(tasks.length > 1)
    Sorting(tasks);
    CreateTasksElement(tasks);
    }

    
})


function CreateTasksElement(tasks){
    
    task_input.value = '';
    gems_input.value = '';
    num_of_tasks.innerHTML = tasks.length ;
    let mappedTasks = tasks.map(task =>{
        return `<div class="task"><span class="task-name">${task.task} <span class="price">Price : ${task.priority}</span></span> <div class="btns"><button class="remove-task">Cancel</button> <button class="task-achieved">Done</button></div></div>`
    })
    tasks_box.innerHTML = mappedTasks.join('');
    localStorage.tasks = JSON.stringify(tasks);
    Done_btns = document.querySelectorAll(".task-achieved");
    Close_btns = document.querySelectorAll(".remove-task")
    created_tasks = document.querySelectorAll(".task");
    Done_btns.forEach((btn,indx)=>{
        DoneBtn(btn,indx);
    })
    Close_btns.forEach((btn,indx)=>{
        CancelBtn(btn,indx);
    })
}

// bubble sorting 

function Sorting(arr){
    for(let i =0; i < arr.length  ; i++){
        for(let j = 0 ; j < arr.length - 1  ; j++){
            if(arr[j].priority < arr[j+1].priority){
                swap(arr , j , j+1);
            }
        }
    }

    //checks if more sorting needed
    for(let j = 0 ; j < arr.length - 1 ; j++){
            if(arr[j] < arr[j+1]){
                Sorting(arr)
            }
        }

}

function swap(arr , index1 , index2){
    
    let temp = arr[index1];
    arr[index1]= arr[index2];
    arr[index2] = temp;


}


function DoneBtn(btn,indx){
    noti_btn.style=`background-color:var(--dark);`
    noti_btn.onclick = function(){
        return;
    }

    btn.addEventListener('click',function(){
        let earned = tasks[indx].priority;
        earned_span.innerHTML = parseInt(earned_span.innerHTML) + earned; // adding cash
        localStorage.earned = JSON.stringify(earned_span.innerHTML)
        tasks = tasks.filter((task,index) =>{
            return index !== indx ;
            
        })
        
            count = 0;
            let interval1 = setInterval( function(){
                let fixer = earned ; // to fix counting glitches by speeding it
                [count,fixer,earned] = speedingCounter(count,fixer,earned);  // destructing to change values outside speedingCounter
               
                
                if(count >= earned || fixer  == 0){
                    clearInterval(interval1);
                    
                    noti_btn.style= `background-color:var(--main);`
                    noti_btn.onclick = function(){
                        noti.style = `opacity: 0;
                pointer-events: none;`;
                    
                    }
                }
                
                noti_h4.innerText = `+ ${count}`;
                
    
            },10);

            
            
        

        
        
    

        noti.style = `opacity: 1;
        pointer-events: all;`;

        noti_icon.setAttribute("id","done");
            noti_icon.setAttribute("class","fa-regular fa-circle-check");

            noti_h3.innerText = "Achieved"
            

            

        CreateTasksElement(tasks)
        
    })
}


/*************************/

function CancelBtn(btn,indx){
    let count = 0;
    noti_btn.style=`background-color:var(--dark);`
    noti_btn.onclick = function(){
        
        return;
    }

    btn.addEventListener('click',function(){
        
        localStorage.hearts = JSON.stringify(hearts);

        let earned = tasks[indx].priority;
       
        tasks = tasks.filter((task,index) =>{
            return index !== indx ;

            
        })

        
            let count = 0;
            let interval2 = setInterval(function(){
                let fixer = earned ; // to fix counting glitches by speeding it
                [count,fixer,earned] = speedingCounter(count,fixer,earned);

                
                if(count >= earned || fixer  == 0){
                    clearInterval(interval2);
                    
                    noti_btn.style= `background-color:var(--main);`
                    noti_btn.onclick = function(){
                        noti.style = `opacity: 0;
                        pointer-events: none;`;
                        
                    }
                }
                
                noti_h4.innerText = `- ${count}`;

                if(hearts.length <= 0)
                noti_h4.innerText = `- ${count} * 2`;
    
            },10);

            
        
        
        CreateTasksElement(tasks)
        if(hearts.length !== 0){

            earned_span.innerHTML = parseInt(earned_span.innerHTML) - earned; // losing cash
            localStorage.earned = JSON.stringify(earned_span.innerHTML);



            hearts_span.innerHTML = hearts.map(function(){
                return `<i class="heart fa-solid fa-heart"></i>`
            }).join('')

            noti.style = `opacity: 1;
        pointer-events: all;`;

            noti_icon.setAttribute("id","cancel");
            noti_icon.setAttribute("class","fa-regular fa-circle-xmark");

            noti_h3.innerText = "Canceled"
            
        }
        else{

            //double minus when no more hearts

            earned_span.innerHTML = parseInt(earned_span.innerHTML) - earned * 2; // 2x losing cash
            localStorage.earned = JSON.stringify(earned_span.innerHTML);
            


            hearts_span.innerHTML = '<i class="heart fa-solid fa-heart-crack"></i>'

            noti.style = `opacity: 1;
        pointer-events: all;`;

            noti_icon.setAttribute("id","cancel");
            noti_icon.setAttribute("class","fa-regular fa-circle-xmark");
            noti_h3.style = `font-size:0.8rem;`
            noti_h3.innerHTML = `You Lost all hearts &#128531;`
            noti_h4.innerHTML = `--Note : because of cancelled task will be minus 2x--`
            
        }
        

            


            hearts.pop(); // deleting a heart
        
    })
}








function speedingCounter(count,fixer,earned){
    if((earned % 100 == 0)){
        count+=100 
        fixer-=100
        }

    else if((earned % 10 == 0)){
    count+=10 
    fixer-=10
    }
    else if((earned % 5 == 0)){
        count+=5 
        fixer-=5
        }
    else if((earned % 2 == 0)){
    count+=2 
    fixer-=2
    }
    else {count++  ; fixer--} 

    return [count,fixer,earned]
}






let img = document.querySelector(".user-img");
let hour = new Date().getHours();

setInterval(function(){
    hour = new Date().getHours();
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
}, 1000);





