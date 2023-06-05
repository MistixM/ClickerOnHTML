var timer = document.getElementById('time');
var best_score_element = document.getElementById('best');

var reset_btn = document.querySelector('.reset');
var play_btn = document.querySelector('.play-btn');

var score_num = 0;
var start_time = 10;
var best_score = localStorage.getItem('best') || 0; // get a local storage value 

var CanClick = true;
var isStart = false;
var CanReset = false;

timer.innerText = start_time;

UpdateBestScore();

function UpdateBestScore(){
    if (score_num > best_score){
        best_score = score_num;
        localStorage.setItem('best', best_score);
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
    var set_timer_interval = setInterval(UpdateTimer, 1000);

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
        score_num = 0;
        start_time = 10;
        
        play_btn.innerText = 'Start';
        timer.innerText = start_time;

        CanClick = true;
        isStart = false;
        console.log("The game has been restarted!");
    }
}