var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn")
var introElement = document.getElementById("start");
var questionContainerElement = document.getElementById("quiz");
var questionElement = document.getElementById("questions");
var answerButtonsElement = document.getElementById("answer-btns")
var timerElement = document.getElementById("count-down")

var timer;
var timerCount;

// list of questions and their answers
var questions = [
    {
        question: "Javascript is an _______ language?",
        answers: [
            {text: "Object-Oriented", correct: true},
            {text: "Object-Based", correct: false},
            {text: "Procedural", correct: false},
            {text: "None of the above", correct: false}
        ]
    },

    {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        answers: [
            {text: "var", correct: false},
            {text: "let", correct: false},
            {text: "Both A and B", correct: true},
            {text: "None of the above", correct: false}
        ]
    },

    {
        question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
        answers: [
            {text: "Throws an error", correct: false},
            {text: "Ignores the statements", correct: true},
            {text: "Gives a warning", correct: false},
            {text: "None of the above", correct: false}
        ]
    },

    {
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        answers: [
            {text: "document.write()", correct: false},
            {text: "console.log()", correct: false},
            {text: "window.alert()", correct: false},
            {text: "All of the above", correct: true}
        ]
    },

    {
        question: "How can a datatype be declared to be a constant type?",
        answers: [
            {text: "const", correct: true},
            {text: "var", correct: false},
            {text: "let", correct: false},
            {text: "constant", correct: false}
        ]
    }
]

startButton.addEventListener("click", startQuiz)

// the startGame is called when the start button is clicked
function startQuiz(){
    console.log("Quiz started")
    introElement.classList.add("hide");
    questionContainerElement.classList.remove('hide')
    timerCount = 10;
    startTimer()
}

function startTimer(){
    console.log("Timer starts")
    timer = setInterval(function(){
        
        timerElement.textContent = "Time remaining " + timerCount;
        timerCount--;
        if (timerCount >= 0) {
            console.log("counting down")
            // clearInterval(timer);
        }
        //Test if time has run out
        else{
            // clears interval
            clearInterval(timer);
        }
    }, 1000);
}

















// // set variable to store shuffled questions
// var shuffledQuestions, currentQuestionIndex;


// startButton.addEventListener("click", startQuiz)
// nextButton.addEventListener('click', () => {
//     currentQuestionIndex++;
//     setNextQuestion();
// })

// // function to start quiz
// function startQuiz(){
//     console.log("Game Started");
//     // once the start button is clicked, hide the intro page
//     introElement.classList.add("hide");
//     shuffledQuestions = questions.sort(() => Math.random - .5);
//     currentQuestionIndex = 0;
//     // allow questions to appear
//     questionContainerElement.classList.remove("hide");
//     // display questions
//     setNextQuestion()
//     startTimer()
// }

// // function that start the timer
// function startTimer(){
//     // Sets Timer
//     timer = setInterval(function(){
//         timerCount--;
//         timerElement.textContent = timerCount;
//         // if (timerCount >=0){

//         // }
//     })
// }

// // function to displays questions
// function setNextQuestion(){
//     console.log("Here is the next question")
//     resetState();
//     showQuestion(shuffledQuestions[currentQuestionIndex]);
// }

// // function that shows question
// function showQuestion(question){
//     console.log("questions start here")
//     questionElement.innerText = questions.question;
//     // loop through answers and populate them and create a button for each
//     question.answers.forEach(answer => {
//         var button = document.createElement("button")
//         button.innerText = answer.text
//         button.classList.add('btn')
//         if (answer.correct) {
//             button.dataset.correct = answer.correct
//         }
//         button.addEventListener('click', selectAnswer)
//         answerButtonsElement.appendChild(button)
//     })

// }

// function resetState(){
//     clearStatusClass(document.body)
//     nextButton.classList.add('hide')
//     while (answerButtonsElement.firstChild){
//         answerButtonsElement.removeChild(answerButtonsElement.firstChild)
//     }
// }

// // function that populates answer
// function selectAnswer(e){
//     var selectedBtn = e.target
//     var correct = selectedBtn.dataset.correct
//     setStatusClass(document.body, correct)
//     Array.from(answerButtonsElement.children).forEach(button => {
//         setStatusClass(button, button.dataset.correct)
//     })
//     if (shuffledQuestions.length > currentQuestionIndex +1){
//         nextButton.classList.remove('hide')
//     }else{
//         startButton.innerText = 'Restart'
//         startButton.classList.remove('hide')
//     }
// }

// function setStatusClass(element, correct){
//     clearStatusClass(element)
//     if (correct) {
//         element.classList.add('correct')
//     }else{
//         element.classList.add('wrong')
//     }
// }

// function clearStatusClass(element){
//     element.classList.remove('correct')
//     element.classList.remove('wrong')
// }