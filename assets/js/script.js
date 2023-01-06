var startButton = document.getElementById("start-btn");
var introElement = document.getElementById("start");
var questionContainerElement = document.getElementById("quiz");
var questionElement = document.getElementById("questions");
var answerButtonsElement = document.getElementById("answer-btns")
var timerElement = document.getElementById("count-down")
var initialsEl = document.getElementById("card")
var initialsInput = document.getElementById("initials-text")
var submitForm = document.getElementById("initials")

var score;
var timer;
var timerCount;

// set variable to store shuffled questions
var shuffledQuestions, currentQuestionIndex;

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

// I want to create a list of all answers.text
var answersValues = []
for (var i = 0; i < questions.length; i++){
    var answers = questions[i]['answers'];
    for (var j = 0; j < answers.length; j++){
        answersValues.push(answers[j]['text']);
    }
}
console.log(answersValues)

// I want to create a list of all questions
var questionsList = [];
for (var i = 0; i < questions.length; i++){
    questionsList.push(questions[i].question)
}
console.log(questionsList)

// I want the Start button to listen to click and call startQuiz function
startButton.addEventListener("click", startQuiz)

// the startGame is called when the start button is clicked
function startQuiz(){
    console.log("Quiz started")
    // I want to hide the Start Quiz page after clicking on start button
    introElement.classList.add("hide");
    // I want to show/display the questions page and start timer after clicking the start button.
    questionContainerElement.classList.remove('hide')
    timerCount = 15;
    startTimer()
    //I want the questions to not be in the same order
    shuffledQuestions = questionsList.sort(() => Math.random - .5);
    currentQuestionIndex = 0;
    setNextQuestion();
}

// I want to create a function that start the timer
function startTimer(){
    console.log("Timer starts")
    timer = setInterval(function(){
        
        timerElement.textContent = timerCount;
        timerCount--;
        if (timerCount >= 0) {
            console.log("counting down")
        }
        //Test if time has run out
        else{
            // clears interval
            clearInterval(timer);
            storeInitials();
        }
    }, 1000);
}

// function that prompts user's initials
function storeInitials(){
    // When all questions are answered or the time reaches 0, I want to hide the questions page and display the page that prompt user's initials
    questionContainerElement.classList.add('hide')
    initialsEl.classList.remove('hide')
    // I want to create a variable that stores player's initials and score
    var playerScores = {
        initials: initialsInput.value.trim(),
        "score": 10 
    }
    localStorage.setItem("initials", JSON.stringify(playerScores))
}

// A function that show last score
function renderScore(){
    var highscore = document.getElementById("highscore");
    initialsEl.classList.add('hide');
    highscore.classList.remove('hide');
    var lastScore = JSON.parse(localStorage.getItem("initials"));

    // check if data is returned, if not exit out of the function
    // If data is returned from storage, render the data to the page using innerHTML
    if (lastScore !== null){
        document.getElementById("saved-initials").innerHTML= lastScore.initials;
        document.getElementById("saved-scores").innerHTML= lastScore.score;
    } else {
        return;
    }
}

// Add submit event to form

submitForm.addEventListener('submit', function(event){
    event.preventDefault();

    // var initialsText = initialsInput.value.trim()

    // // Return from function if submitted initialsText is blank
    // if (initialsText === ""){
    //     return;
    // }

    // store initials in localStorage
    storeInitials();
    renderScore();
})


// I want to add an event listener to 'Go back' button so that player restart the game
var goBack = document.getElementById("go-back");
goBack.addEventListener("click", function(){
    initialsEl.classList.add('hide');
    highscore.classList.add('hide');
    introElement.classList.remove("hide");
})



// I want to create a function that reset score if player clicks the clear highscore button
var resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function(){

})







// var nextButton = document.getElementById("next-btn")
// nextButton.addEventListener('click', function() {
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

// function to displays questions
function setNextQuestion(){
    console.log("Here is the next question")
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// function that shows question
function showQuestion(question){
    console.log("questions start here")
    questionElement.innerText = shuffledQuestions[currentQuestionIndex];
    // loop through answers and populate them and create a button for each
    // question.answers.forEach(answer => {
    answersValues.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })

}

function resetState(){
    clearStatusClass(document.body)
    // nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

// function that populates answer
function selectAnswer(e){
    var selectedBtn = e.target
    var correct = selectedBtn.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex +1){
        // nextButton.classList.remove('hide')
    }else{
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    }else{
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}