let timer = document.getElementById('time');
let best_score_element = document.querySelector('#best');

let reset_btn = document.querySelector('.reset');
let play_btn = document.querySelector('.play-btn');

let score_num = 0;
let start_time = 10;
let best_score = localStorage.getItem('best') || 0; // get a local storage value 

let CanClick = true;
let isStart = false;
let CanReset = false;

timer.innerText = start_time;

UpdateBestScore();

function UpdateBestScore(){
    if (score_num > best_score){
        best_score = score_num;
        localStorage.setItem('best', best_score);
        best_score_element.id = "best_in_anim" // set new class
    }
    best_score_element.innerText = best_score;
}

function OnBtnClicked() {
    if (CanClick){
        score_num++;
        
        play_btn.innerText = score_num;    
        if (!isStart) {
            StartTimer();
            isStart = true;
        }
    }
}

function StartTimer() {
    let set_timer_interval = setInterval(UpdateTimer, 1000);

    function UpdateTimer() {
        start_time--;
        timer.innerText = start_time;
        
        if (start_time === 0) {
            clearInterval(set_timer_interval);
            timer.innerText = 'Time is up!';
            
            UpdateBestScore();

            CanClick = false;
            isStart = false;
            CanReset = true;

            reset_btn.style.display = 'block';
        }
    }
}

function OnResetBtnClicked() {
    if(CanReset && !isStart){
        reset_btn.style.display = 'none';
        best_score_element.id = "best";

        score_num = 0;
        start_time = 10;
        
        play_btn.innerText = 'Start';
        timer.innerText = start_time;

        CanClick = true;
        isStart = false;
        console.log("The game has been restarted!");
    }
}