export default function ImageOnTime(){
    let hour = new Date().getHours();
    if(hour < 3){
    img.setAttribute('src',"imgs/user1.JPG")
    }
    
    else if(hour >= 3 && hour < 6){
        img.setAttribute('src',"imgs/user2.JPG")
    }
    
    
    else if(hour >= 6 && hour < 9){
        img.setAttribute('src',"imgs/user3.JPG")
    }
    
    else if(hour >= 9 && hour < 12){
        img.setAttribute('src',"imgs/user4.JPG")
    }
    
    else if(hour >= 12 && hour < 15){
        img.setAttribute('src',"imgs/user5.JPG")
    }
    
    else if(hour >= 15 && hour < 18){
        img.setAttribute('src',"imgs/user6.JPG")
    }
    
    else if(hour >= 18 && hour < 21){
        img.setAttribute('src',"imgs/user7.JPG")
    }
    
    else if(hour >= 21 && hour < 24){
        img.setAttribute('src',"imgs/user8.JPG")
    }
}