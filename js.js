let task_input = document.querySelector(".add-task-box input");
const add_btn = document.querySelector(".add-task-box button");
let gems_input = document.querySelector(".add-task-box .task-price")
const tasks_box = document.querySelector(".main-box .tasks");

let task_text ,gems;
let Done_btns,Close_btns ;
const earned_span = document.querySelector("#earned");
const hearts_span_wrapper = document.querySelector("#lives-span");
let noti_box = document.querySelector(".notification")
let noti_counter =   document.querySelector("#counter");
let noti_icon = document.querySelector(".notification i");
let noti_h4 = document.querySelector(".notification h4");
let noti_btn = document.querySelector(".notification button");

let num_of_tasks = document.querySelector(".num-of-tasks span");
const username_h6 = document.querySelector(".username");


// get from local storage
let user = JSON.parse(localStorage.getItem("tasketos_user"));
let username = user? user["name"] :"Anonymous";
let earned = user? user["earned"] :0;
let hearts = user? user["hearts"]:["heart","heart","heart"];
let tasks = JSON.parse(localStorage.getItem("tasks")) ? JSON.parse(localStorage.getItem("tasks")) : [];
num_of_tasks.innerHTML = tasks.length ;


earned_span.innerHTML = earned;

const gemsAlert = document.querySelector(".alert");
// day checking variables
let today = new Date().getDate();
let stored_day;







/**************************************************************Preloader & directing to login***********************************************************/

let preloading = document.querySelector(".preloader");
let preloading_span = document.querySelector(".preloader .loading-bar");

preloading_span.style = `animation:preload 2s ease infinite alternate ;
-webkit-animation:preload 2s ease infinite alternate ;`;

window.addEventListener('load',function(){
    this.setTimeout(function(){
        preloading.style=`opacity:0;pointer-events:none;`
    },1200);
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


/**************************************************************initializing vars & Ui elements***********************************************************/
// Check if a day passed if yes remove yesterday's tasks
if(localStorage.getItem("stored_day")){
    stored_day = JSON.parse(localStorage.getItem("stored_day"));
    // if we aren't on the same day we remove all tasks
    if(stored_day !== today){
        localStorage.removeItem("tasks");
        tasks_box.innerHTML = ''
        localStorage.stored_day = JSON.stringify(today);
    }
    
}
else{
    localStorage.stored_day = JSON.stringify(today);
}
// create tasks if it was existed before and a day didn't pass
if(tasks)
CreateTasksElement(tasks);

// check if earned money exists

// Generate Hearts function
function GenerateHearts(heartsArray){
    
    if( heartsArray.length === 0){
  
        hearts_span_wrapper.innerHTML = '<i class="heart fa-solid fa-heart-crack"></i>';
        }
        else {
            hearts_span_wrapper.innerHTML = heartsArray.map(function(){
                return `<i class="heart fa-solid fa-heart"></i>`
            }).join('')
        }
}

GenerateHearts(hearts); // first call on login


// update user properties
function UpdateUser(user , keyParam , valueParam){
    
    for (let key of Object.keys(user)){
        if(key === keyParam){
            user[keyParam] = valueParam;
        }
        break;
    }
    // update localstorage
    localStorage.setItem("user",JSON.stringify(user));
}

function displayCounter(count ,sign){
    console.log(sign)
    // display notific box
    noti_box.style = `opacity: 1;
            pointer-events: all;`;
    let displayingCount = 0 ;
    function updateCounter() {
        if (displayingCount < count) {
            ++displayingCount 
            noti_counter.innerText = sign + `${displayingCount}$`;
            
        } else {
            noti_btn.style.backgroundColor = 'var(--main)';
        }
    }

    let updateCounter_timeout= setInterval(updateCounter, 100);
    
    noti_btn.onclick = function(){
        clearInterval(updateCounter_timeout)
        noti_box.style = `opacity: 0;
        pointer-events: none;`;
    }
}








// For pressing enter instead of add btn
    [task_input , gems_input].forEach(element =>{
        element.addEventListener('keyup',function(e){
            console.log(e.target.value)
            if(e.target == task_input)
            task_text = e.target.value;
            else if(e.target == gems_input)
            gems = e.target.value;

            if(gems > 2500 ){
                
                gemsAlert.classList.add("show");
                e.target.style= `color:red`;
                }
                
            else if(gems < 2500 || e.keyCode == 8){   // when pressing backspace
                e.target.style= `color:red`;
                gemsAlert.classList.remove("show");
                e.target.style= `color:black`;
            }

            if( task_text !== '' && gems !== '' && gems <= 2500){
                if(e.keyCode == 13){ // Enter
                    tasks.push({ task :task_text, priority:parseInt(gems) })
                    if(tasks.length > 1)
                    Sorting(tasks);
                    CreateTasksElement(tasks)
                }
            }
        })
    })
    


// When Clicking add btn
add_btn.addEventListener('click',function(){
    task_text = task_input.value;
    gems = gems_input.value;

    if( task_text !== '' && gems !== '' && gems < 2500){
        gemsAlert.style = `opacity:0; pointer-events:none;`;
        tasks.push({ task :task_text, priority:parseInt(gems) })

    if(tasks.length > 1)
    Sorting(tasks);
    CreateTasksElement(tasks);
    }

    
})


function CreateTasksElement(tasks){
    // removing what user did input
    task_input.value = '';
    gems_input.value = '';

    num_of_tasks.innerHTML = tasks.length ;
    /// 
    tasks_box.innerHTML = tasks.map(task =>{
        return `<div class="task">
                    <span class="task-name">${task.task}</span> 
                    <span class="price">Price : ${task.priority}</span>
                    <div class="btns">
                            <button class="remove-task">Cancel</button> 
                            <button class="task-achieved">Done</button>
                        </div>
                </div>`
    }).join('')

    // store tasks for refreshes
    localStorage.tasks = JSON.stringify(tasks);
    // accessing btns after insurring all tasks are rendered first
        Done_btns = document.querySelectorAll(" .task-achieved");
        Close_btns = document.querySelectorAll(" .remove-task")
        console.log("helppp,",Done_btns,Close_btns)

    console.log(Done_btns,Close_btns)
    Done_btns.forEach((btn,indx)=>{
        DoneBtn(btn,indx); // adds eventlistener
    })
    Close_btns.forEach((btn,indx)=>{
        CancelBtn(btn,indx);
    })
}
// notification close button


/********************************/
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

/********************************/
function swap(arr , index1 , index2){
    
    let temp = arr[index1];
    arr[index1]= arr[index2];
    arr[index2] = temp;


}

/********************************/
function DoneBtn(btn,indx){
    
    btn.addEventListener('click',function(){
        noti_btn.style=`background-color:var(--dark);` // start with dark color till counter reaches max

        let earned = tasks[indx].priority;
        earned_span.innerHTML = parseInt(earned_span.innerHTML) + earned; // adding cash
        UpdateUser(user,"earned",earned_span.innerHTML)
        
            displayCounter(earned ,"+") // displays counter and notification box for it
            
            noti_icon.setAttribute("id","done");
            noti_icon.setAttribute("class","fa-regular fa-circle-check");
            noti_h4.innerText = "Achieved"

            tasks = tasks.filter((task,index) =>{
                return index !== indx ;
            })
            CreateTasksElement(tasks);
        
    })
}


/*************************/

function CancelBtn(btn,indx){
    
    btn.addEventListener('click',function(){
        if(hearts.length !== 0 ) 
            hearts.pop(); // deleting a heart
            
        GenerateHearts(hearts)
        UpdateUser(user , "hearts", hearts)
        
        noti_btn.style=`background-color:var(--dark);` // start with dark color till counter reaches max

        let earned = tasks[indx].priority;
        tasks = tasks.filter((task,index) =>{
            return index !== indx ;
        }) 
        CreateTasksElement(tasks); // regenerate tasks
        //activate counter
        displayCounter(earned  ,"-")
                

        // if there is hearts so no double minus
        if(hearts.length !== 0){
            earned_span.innerHTML = parseInt(earned_span.innerHTML) - earned; // losing cash
            UpdateUser(user,"earned",earned_span.innerHTML)
            
            console.log("entered if inside cancel")
            noti_icon.setAttribute("id","cancel");
            noti_icon.setAttribute("class","fa-regular fa-circle-xmark");
            noti_h4.innerText = "Canceled"
            
        }
        else{ // else if no hearts 
            //double minus when no more hearts
            earned_span.innerHTML = parseInt(earned_span.innerHTML) - earned * 2; // 2x losing cash
            UpdateUser(user,"earned",earned_span.innerHTML)
            noti_icon.setAttribute("id","cancel");
            noti_icon.setAttribute("class","fa-regular fa-circle-xmark");
            noti_h4.style = `font-size:0.8rem;`
            noti_h4.innerHTML = `You Lost all hearts &#128531;`
            
        }
    })
}








function speedingCounter(count){

    /**Used to fix issue of taking much time to reach the expected value */
    
    
}


/***********************************User Img********************************************/
let img = document.querySelector(".user-img");
let hour = new Date().getHours();
const timeOut = 5400000 // hour and half

setInterval(function(){
    hour = new Date().getHours();
    if(hour >= 6 && hour < 9){
    img.setAttribute('src',"imgs/inc1.JPG")
    }
    
    else if(hour >= 9 && hour < 12){
        img.setAttribute('src',"imgs/inc2.JPG")
    }
    
    
    else if(hour >= 12 && hour < 15){
        img.setAttribute('src',"imgs/inc3.JPG")
    }
    
    else if(hour >= 15 && hour < 18){
        img.setAttribute('src',"imgs/inc4.JPG")
    }
    
    else if(hour >= 18 && hour < 21){
        img.setAttribute('src',"imgs/inc5.JPG")
    }
    
    else if(hour >= 21 && hour < 24){
        img.setAttribute('src',"imgs/inc6.JPG")
    }
    
    else if(hour >= 24 && hour < 2){
        img.setAttribute('src',"imgs/inc7.JPG")
    }
    
    else if(hour >= 2 && hour < 6){
        
        img.setAttribute('src',"imgs/inc8.JPG")
    }
}, timeOut);





