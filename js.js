import ImageOnTime from "./utils/ImageOnTime.js";
import ActivateAudio from "./utils/ActivateAudio.js";

/**************************User Info****************************************/
const username_h6 = document.querySelector(".username");
const userLevel_h6 = document.querySelector("#level");

/************************Tasks input***************************************/
const tasks_box = document.querySelector(".main-box .tasks");
const task_input = document.querySelector(".add-task-box input");
const gems_input = document.querySelector(".add-task-box .task-price");
const add_btn = document.querySelector(".add-task-box button");

/************************Tasks info***************************************/
const earned_span = document.querySelector("#earned");
const hearts_span_wrapper = document.querySelector("#lives-span");
const num_of_tasks = document.querySelector(".num-of-tasks span");

/************************Notification PopUp***************************************/
const noti_box = document.querySelector(".notification")
const noti_counter =   document.querySelector("#counter");
const noti_icon = document.querySelector(".notification i");
const noti_h4 = document.querySelector(".notification h4");
const noti_btn = document.querySelector(".notification button");
const gemsAlert = document.querySelector(".alert");



let task_text ,gems;
let Done_btns,Close_btns ;




// day checking variables
let today = new Date().getDate();
let stored_day;

/**************************************************************initializing vars & Ui elements***********************************************************/

// Extract User data on Refresh
let user;
let username ,hearts , balance , level;

function ExtractUserFromLocal(){
    user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : undefined;

    if(user){
        username = user["name"];
        hearts =user["hearts"];
        balance = parseInt(user["balance"]);
        level = user["level"];
    }
    else{
        username= "Anonymous";
        hearts =["heart","heart","heart"];
        balance = 0;
    }
}ExtractUserFromLocal();

// Generate Hearts on Refresh
function GenerateHearts(heartsArray){
    
        if( heartsArray.length === 0){
            hearts_span_wrapper.innerHTML = '<i class="heart fa-solid fa-heart-crack"></i>';
            }
        else {
            hearts_span_wrapper.innerHTML = heartsArray.map(function(){
                return `<i class="heart fa-solid fa-heart"></i>`
            }).join('')
        }
}GenerateHearts(hearts); // first call on login

// Get user balance on Refresh
(function GetUserBalance(){
    earned_span.textContent = balance;
})()

function UserLevel(){
    let currLevel = level;
    if(balance < 1000){
        level= `--Noob--`;
        userLevel_h6.textContent = `--Noob--`;
        userLevel_h6.style = `color:#55c10a;`
    }
    else if(balance > 1000 && balance <= 10000){
        console.log("enthusiastic triggerred")
        level= `--Enthusiastic--`;
        userLevel_h6.textContent = `--Enthusiastic--`;
        userLevel_h6.style = `color:#e3bc0c;`
    }

    else if(balance > 10000 && balance <= 50000){
        console.log("Commitment triggerred")
        level= `--Commitment--`;
        userLevel_h6.textContent = `--Commitment--`;
        userLevel_h6.style = `color:#ee4200;`
    }
    else if(balance > 50000 ){
        level= `--Legend--`;
        userLevel_h6.textContent = `--Legend--`;
        userLevel_h6.style = `color:#5015ff;`
    }
    if(currLevel !== level)
        UpdateUser("level" , level);
    
    
}UserLevel();



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

    // Extract tasks 
    let tasks = JSON.parse(localStorage.getItem("tasks")) ? JSON.parse(localStorage.getItem("tasks")) : [];
    num_of_tasks.innerHTML = tasks.length ;
    // Display tasks
    if(tasks)
        CreateTasksElement(tasks);




    /***Directing too page depending on user extracted from local***/
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
    

/******************************************************************************************************/

// Counter Popup

function displayCounter(count ,sign){
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


/******************************************************************************************************/

// update user properties
function UpdateUser(keyParam , valueParam){

    for (let key of Object.keys(user)){
        if(key === keyParam){
            user[keyParam] = valueParam;
            break;
        }
        
    }
    // update user in localstorage
    localStorage.setItem("user",JSON.stringify(user));
    // get updated user
    ExtractUserFromLocal();
}



/******************************************************************************************************/

// For pressing enter instead of add btn
    [task_input , gems_input].forEach(element =>{
        element.addEventListener('keyup',function(e){
            if(e.target == task_input)
            task_text = e.target.value;
            else if(e.target == gems_input)
            gems = e.target.value;

            if(gems >= 2500 ){
                
                gemsAlert.classList.remove("hide");
                e.target.style= `color:red`;
                }
                
            else if(gems < 2500 || e.keyCode == 8){   // when pressing backspace
                e.target.style= `color:red`;
                gemsAlert.classList.add("hide");
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
        gemsAlert.classList.add("hide");
        tasks.push({ task :task_text, priority:parseInt(gems) })

    if(tasks.length > 1)
    Sorting(tasks);
    CreateTasksElement(tasks);
    }

    else{
        gemsAlert.classList.remove("hide");
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

//  sorting  Task on it's priority
function Sorting(arr){
    // descending order
    arr.sort((b , a) => a.priority - b.priority);
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

        
        /*******update hearts*******/
        if(hearts.length > 0)
            hearts.pop();// remove a heart
        UpdateUser("hearts", hearts); // update localstorage
        GenerateHearts(hearts) // redisplay hearts
        /**********************************************************/
        noti_btn.style=`background-color:var(--dark);` // start with dark color till counter reaches max
        /**************remove canceled task***************/
        let loss = tasks[indx].priority; // store task price before removing it
        tasks = tasks.filter((task,index) =>{
            return index !== indx ;
        }) ;
        CreateTasksElement(tasks); // regenerate tasks
        /**********************************************************/

        // if there is hearts so no double minus
        if(hearts.length !== 0){
            // update balance
            UpdateUser("balance", user["balance"] - loss);
            //activate counter
            displayCounter(loss  ,"-")
            
            noti_icon.setAttribute("id","cancel");
            noti_icon.setAttribute("class","fa-regular fa-circle-xmark");
            noti_h4.innerText = "Canceled"
            
        }
        else{ 
                /* if no hearts left we double minus */
                UpdateUser("balance", user["balance"] - loss * 2);
                //activate counter
                displayCounter(loss * 2  ,"-")
                
                noti_icon.setAttribute("id","cancel");
                noti_icon.setAttribute("class","fa-regular fa-circle-xmark");
                noti_h4.style = `font-size:0.8rem;`
                noti_h4.innerHTML = `You Lost all hearts &#128531;`
            
        }

        // display balance
        earned_span.innerHTML = user["balance"]; 
        // checking level
        UserLevel();
    })
}



/***********************************User Img********************************************/
let img = document.querySelector(".user-img");
let hour = new Date().getHours();
const timeOut = 5400000 // hour and half

setInterval(ImageOnTime, timeOut);


/*******************************************************************************************/
ActivateAudio()


