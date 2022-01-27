const highScoreWrapper = document.querySelector(".highScoreWrapper");
const leaderBoard = document.getElementById("leaderboard");
const startQuizWrapper = document.querySelector(".startQuizWrapper");
const goBackBtn = document.getElementsByClassName("goBack");
const clearHighScore = document.getElementsByClassName("clearHighScore");
const  leaders = document.querySelector(".leaders");
const questionsBlock = document.querySelector(".questionsBlock")
const allOptions = document.querySelectorAll(".option");
const startQuizBtn = document.querySelector(".btn-start");
const nextBtn  = document.querySelector(".btn-next");
const questionName = document.querySelector(".question");
const counter = document.querySelector(".count");
const Result = document.querySelector(".display-answer");
const allDonePage = document.querySelector(".allDonePage");
const form = document.getElementById("submitForm");
const userName = document.getElementById("userName");
const scoreBoard = document.querySelector(".score")
const scoreList = document.getElementById("scoreList");
let time=50;
const questions = [
    {
        questionText:"Commonly used data types DO NOT include:",
        options:["1. strings","2. booleans","3. alerts","4. numbers"],
        answer:"3. alerts"
    },
   
    {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];

startQuizBtn.addEventListener('click',startGame);
leaderBoard.addEventListener('click',()=>{
     highScoreWrapper.style.display = "flex";
   startQuizWrapper.style.display = "none";
   questionsBlock.style.display = "none";
   allDonePage.style.display = "none";

   if(Array.from(scoreList.children).length===0){
 Object.keys(localStorage).map(Key => {
      const li =  document.createElement('li');
      li.textContent = `${Key}-${JSON.parse(localStorage[Key])}`
      scoreList.appendChild(li);
   });
   }  
});
goBackBtn[0].addEventListener('click',goBackToStartPage);
clearHighScore[0].addEventListener('click',()=>{
     localStorage.clear();  
     Array.from(scoreList.children).map((li)=>{
         scoreList.remove(li);
     });
});
nextBtn.addEventListener('click',moveToNextQuestion);
/*timer implementation*/
 let Timer;
 let score;
function startTimer(){
    score=0;
   Timer = setInterval(()=>{
  counter.innerText = time;
  if(time<=0){ 
      stopTimer(Timer,50);
      showallDonePage();      
  }
  time--;  
},1000);
}
function stopTimer(Timer,time){
    clearInterval(Timer);
    counter.innerText = time;      
}

/*timer implementation close*/

/* starting quiz */
let Index;
const array = Array.from(allOptions);
function startGame(){
Index=0;
startQuizWrapper.style.display="none";
questionsBlock.style.display="block";
highScoreWrapper.style.display="none";
startTimer();
let selected;
array.map((ele)=>{
    ele.addEventListener('click',()=>{
        selected = ele.innerText;
       if(selected==questions[Index].answer){
           Result.innerText= "correct answer!";
           score++;
           setTimeout(()=>{
               moveToNextQuestion(),
               Result.innerText= "";
           },1000);                      
       }
       else{
            Result.innerText = "wrong answer!";
            time-=10;
            setTimeout(()=>{
               moveToNextQuestion(),
               Result.innerText= "";
           },1000);                
       }
    });
});
}
/*start quiz ends*/

/*handling nextBtn */
function moveToNextQuestion(){ 
    Index++; 
    if(Index>=questions.length){
     stopTimer(Timer,time);
     showallDonePage();
     Index=0;
     Result.innerText="";
   } 
questionName.innerText =questions[Index].questionText;
   let count =0;
array.map((ele)=>{
       ele.innerText = questions[Index].options[count];
       count++; 
   });   
      
}
/* handling next question ended*/

/*display leaderBoard*/
function displayLeaderBoard(){
   highScoreWrapper.style.display = "flex";
   startQuizWrapper.style.display = "none";
   questionsBlock.style.display = "none";
   allDonePage.style.display = "none";
 Object.keys(localStorage).map(Key => {
      const li =  document.createElement('li');
      li.textContent = `${Key}-${JSON.parse(localStorage[Key])}`
      scoreList.appendChild(li);
   })  
   }

/*display leaderBoard ends*/

function showallDonePage(){
    allDonePage.style.display= "flex";
    startQuizWrapper.style.display = "none";
    questionsBlock.style.display = "none";
    scoreBoard.innerHTML = score;
}

/*show allDonePage done*/

function goBackToStartPage(){
    highScoreWrapper.style.display = "none"; 
    startQuizWrapper.style.display = "flex"; 
    questionsBlock.style.display = "none"; 
    allDonePage.style.display = "none"; 
    time=50;
    counter.innerText=time;
}

/*form submit when gameover*/

form.addEventListener('submit',(event)=>{
    event.preventDefault(); 
    localStorage.setItem(`${userName.value}`,JSON.stringify(score));
    userName.value = "";
     displayLeaderBoard();  
});














