'use scrict';
//console.log(document.querySelector('.message').textContent);
//document.querySelector('.message').textContent =  "Correct Number";
//document.querySelector('.number').textContent = 15;
//document.querySelector('.score').textContent = 50;
//document.querySelector('.guess').value = 20;
//console.log(document.querySelector('.guess').value);


/*const x = function(){
    console.log(10);
}*/

let secratNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
//document.querySelector('.number').textContent = secratNumber;


document.querySelector('.check').addEventListener(
    'click', function(){
        const guess = Number(document.querySelector('.guess').value);  
        console.log(guess, typeof guess); 

        // When there is no input
        if(!guess){
            document.querySelector('.message').textContent = "⛔️ No number!";


        // When player wins
        }else if(guess===secratNumber){
            document.querySelector('.message').textContent = "🎉 Correct Number!";
            document.querySelector('body').style.backgroundColor = '#60b347';
            document.querySelector('.number').style.width = '30 rem';

        if(score>highscore){
            highscore=score;
            document.querySelector('.highscore').textContent = highscore;
        }

        // When guess is too high
        }else if(guess>secratNumber){
            if(score>1){
                document.querySelector('.message').textContent = " 📈 Too high! ";
                score--;
                document.querySelector('.score').textContent = score;

            } else {
                document.querySelector('.message').textContent = " 💥 You lost the game!";
                document.querySelector('.score').textContent = 0;
            }
            

        // When guess is too low
        }else if(guess<secratNumber){
            if(score>1){
                document.querySelector('.message').textContent = " 📉 Too low! ";
                score--;
                document.querySelector('.score').textContent = score;

            } else {
                document.querySelector('.message').textContent = "💥 You lost the game!";
                document.querySelector('.score').textContent = 0;
            }
        }

    });


document.querySelector('.again').addEventListener(
    'click', function(){
            let secratNumber = Math.trunc(Math.random() * 20) + 1;
            let score = 20;
            let highscore = 0;
            document.querySelector('.message').textContent = "Guessing the number! ";
            document.querySelector('.guess').value = "";
            document.querySelector('.score').textContent = score;
            document.querySelector('.number').textContent = '?';

            document.querySelector('body').style.backgroundColor = '#222';
            document.querySelector('.number').style.width = '15rem';
    });

