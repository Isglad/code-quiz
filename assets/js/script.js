var startButton = document.getElementById("start-btn");
var introElement = document.getElementById("start");
var questionContainerElement = document.getElementById("quiz");
var questionElement = document.getElementById("questions");
var answerButtonsElement = document.getElementById("answer-btns")
var timerElement = document.getElementById("count-down")
var initialsEl = document.getElementById("card")
var initialsInput = document.getElementById("initials-text")
var submitForm = document.getElementById("initials")
var finalScore = document.getElementById("final-score")



var score = 20;
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
    timerCount = 60;
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
        if (timerCount <= 0 || currentQuestionIndex == 4) {
            console.log("counting down")
            clearInterval(timer);
            storeInitials();
        }
        //Test if time has run out
        // else{
        //     // clears interval
        //     clearInterval(timer);
        //     storeInitials();
        // }
    }, 1000);
}

// function that prompts user's initials
function storeInitials(){
    // When all questions are answered or the time reaches 0, I want to hide the questions page and display the page that prompt user's initials
    questionContainerElement.classList.add('hide')
    initialsEl.classList.remove('hide')
    // I want the score to be equal to the current timerCount
    score = timerCount;
    console.log("Your current score is " + score)
    // I want to concatenate the finalScore variable with current score
    finalScore.innerHTML = "Your final score is " + score;
    // I want to create a variable that stores player's initials and score
    var playerScores = {
        initials: initialsInput.value.trim(),
        score: score 
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
        document.getElementById("saved-initials").innerHTML= lastScore.initials + " " + lastScore.score;
        // document.getElementById("saved-scores").innerHTML= lastScore.score;
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
    questionElement.innerText = shuffledQuestions[currentQuestionIndex];
    // loop through answers and populate them and create a button for each
    questions[currentQuestionIndex].answers.forEach(answer => {
    // answersValues.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
    // if (shuffledQuestions.length < currentQuestionIndex){
    //     storeInitials()
    // }

}

// var h2 = document.createElement("h2");

function resetState(){
    // clearStatusClass(questionContainerElement)
    // selectAnswer.classList.add('hide')
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

// I want to show if user is correct when an answer is selected
function selectAnswer(e){
    console.log("Check wrong or correct answer starts here!")
    var selectedBtn = e.target
    var correct = selectedBtn.dataset.correct
    // setStatusClass(document.body, correct)
    // console.log("check setStatus " + document.body)
    // Array.from(answerButtonsElement.children).forEach(button => {
    //     setStatusClass(button, button.dataset.correct)
    //     console.log("button check " + button.dataset.correct)
    // })
    // if (shuffledQuestions.length > currentQuestionIndex +1){
    //     // nextButton.classList.remove('hide')
    // }else{
    //     startButton.innerText = 'Restart'
    //     startButton.classList.remove('hide')
    // }
    // check if the selected answer is correct and display 'correct' to screen and go to next question
    if (correct){
        var h2 = document.createElement("h2");
        h2.textContent = "Correct!"
        questionContainerElement.appendChild(h2)
        // h2.textContent=""
        // selectedBtn.addEventListener('click', function() {
        // h2.textContent=""
        currentQuestionIndex++;
        // if(currentQuestionIndex == 4)
        //     storeInitials();
        // h2.textContent=""
        setNextQuestion();
        // h2.textContent=""
        // })
         
    } // if the selected answer is wrong,
    else{
        // I want to deduct timerCount everytime the wrong answer is selected
        timerCount -= 10;
        // I want to display 'wrong' to screen and go to next question
        var h2 = document.createElement("h2");
        h2.textContent = "Wrong!";
        questionContainerElement.appendChild(h2)
        // h2.textContent=""
        // selectedBtn.addEventListener('click', function() {
            
        currentQuestionIndex++;
        // if(currentQuestionIndex == 4)
        //     storeInitials();
        // h2.textContent=""
        setNextQuestion();
        // h2.textContent=""
        // })
    }

    // // selectedBtn.addEventListener('click', function() {
    //     if (correct){
    //         var h2 = document.createElement("h2");
    //         h2.textContent = "Correct!"
    //         questionContainerElement.appendChild(h2)

    //         currentQuestionIndex++;
    //         setNextQuestion();
    //         // h2.textContent=""
    //     }
    //     else{
    //         var h2 = document.createElement("h2");
    //         h2.textContent = "Wrong!";
    //         questionContainerElement.appendChild(h2)

    //         currentQuestionIndex++;
    //         setNextQuestion();
    //         // h2.textContent=""
    //     }
    //     // h2.textContent=""
    // // })    


    // if (shuffledQuestions.length < currentQuestionIndex +1){
    //     storeInitials();
    // }
    
}

// I want to go to the next question once an answer is selected
// function nextQuestion(e){
//     h2.classList.add('hide')
//     var selectedAnswer = e.target
//     // if there are still questions available, go to next question
//     if (shuffledQuestions.length > currentQuestionIndex +1){
//         selectedAnswer.addEventListener('click', function() {
//             currentQuestionIndex++;
//             setNextQuestion();
//         })
//     }
// }

// I want to append 'correct' or 'wrong' on screen
// function setStatusClass(element, correct){
//     // clearStatusClass(element)
//     if (correct) {
//         element.classList.add('correct')
//         console.log("check element classlist correct")
//     }else{
//         element.classList.add('wrong')
//         console.log("check element classlist wrong")
//     }
// }

// function clearStatusClass(element){
//     element.classList.remove('correct')
//     element.classList.remove('wrong')
// }