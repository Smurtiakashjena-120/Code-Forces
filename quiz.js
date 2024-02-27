//answer array and correct ans array
let choosen=[];
let correctAns=[];
let result;
let container=document.querySelector(".container");
let thirdPage=document.querySelector(".thirdPage");
var parentDiv = document.querySelectorAll(".question");
let time=document.querySelector(".time");
let submit=document.querySelector("#submit");

let timeUsed=0;

// Access all child div elements 
parentDiv.forEach((opt)=>{
    let childDivs=opt.querySelectorAll("div");
    childDivs.forEach(function(child) {
        child.addEventListener("click", function() {
           child.style.backgroundColor="violet";
           childDivs.forEach(otherChild => {
            if (otherChild !== child) {
                otherChild.style.backgroundColor="grey";
            }
          });
        });
    
    });
})
//function for collecting data from option choosen
function check(){
    parentDiv.forEach((opt)=>{
        let childDivs=opt.querySelectorAll("div");
        let count=0;
        childDivs.forEach(function(child){
            if( child.style.backgroundColor =="violet"){
                choosen.push(child.innerText);
            }else if(child.style.backgroundColor !="violet"){
           count++;
            }
        })
        if(count==4){
            choosen.push("NONE");
        }
    })
}
//function for calculating marks
function calculate(){
    marks=0;
    for (let i=0;i<5;i++){
        if(correctAns[i]==choosen[i]){
      marks++;
        }
    }

    console.log(`you got ${marks} out of 5 marks in this quiz!!`);
    return `you got ${marks} out of 5 marks in this quiz!!`;
}


//adding question
//fetch('https://the-trivia-api.com/v2/questions')
async function getQue(){
    //fetching data from api
    let val=await fetch('https://the-trivia-api.com/v2/questions');
    let data=await val.json();
    //adding correct answer inside correct ans array
    data.forEach(que=>{
        if(correctAns.length<5){
            correctAns.push(que.correctAnswer);
        }
    })  
    //calling function for adding question and answer
 addquestion({data});
}
//count variable for question number
let count=0;
//function for adding question and answer from fetched data
function addquestion({data}){
    parentDiv.forEach((opt)=>{
        let optdivs=opt.querySelectorAll("div");
        let queP=opt.querySelector("p");
        let num=Math.floor(Math.random()*4);
        let divNo=0;
        let incrt=0
        //adding options of questions
        optdivs.forEach(function(child){ 
            if(divNo!==num){
                child.innerText=data[count].incorrectAnswers[incrt++];
               
            }else{
                child.innerText=data[count].correctAnswer;            
            }
            divNo++;
            
        }
        )
        //adding question inside p tag
        queP.innerText=data[count].question.text;
       count++;
      
       
    }) 
    
    

}
//initiator function
getQue();

//timer idea
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var intervalId =setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        timeUsed= duration-timer;

        if (--timer < 0) {
            timeUsed=300;
            timeOver();
            clearInterval(intervalId); // Clear the interval
    console.log("Function exiting...");
    return;
            
        }
    }, 1000);
}
//
window.onload = function () {
    var fiveMinutes = 5* 60,
        display = document.querySelector('.time');
    startTimer(fiveMinutes, display);
};


//function for exiting quiz when time over
let que=document.querySelector(".que");


async function timeOver(){
que.style.visibility="hidden";
//fetching answerd question
await check();

//calculating marks
await calculate();
//loading third page
container.style.visibility="hidden";
thirdPage.style.visibility="visible";
}

//on submit

submit.addEventListener("click",async()=>{
    await check();
   result= await calculate();
    container.style.visibility="hidden";
    await loadThirdPage();
    thirdPage.style.visibility="visible";
    
}
)
////third page
let secureMark=document.querySelector("#secureMark");
let timeTaken=document.querySelector("#timeTaken");
let answerGiven=document.querySelector(".answerGiven");

function loadThirdPage(){
  secureMark.innerText=result;
  timeTaken.innerText="you have taken "+timeUsed+"  seconds to complete the quiz";

  console.log(choosen);

  choosen.forEach((ans)=>{
    answerGiven.innerHTML=answerGiven.innerHTML+ans+"</br>";
    console.log(ans);
  })


}
