const questions=[ 
    {
    question:"What is the largest canyon in the world?",
    answers:[
        {text:"Verdon Gorge, France",correct:false},
        {text:"King’s Canyon, Australia",correct:false},
        {text:"Grand Canyon, USA",correct:true},
        {text:"Fjaðrárgljúfur Canyon, Iceland",correct:false}
    ]
},
{
    question:"What is the largest active volcano in the world?",
    answers:[
        {text:"Mount Etna",correct:false},
        {text:"Mount Vesuvius",correct:false},
        {text:"Mouna Loa",correct:true},
        {text:"Mount Batur",correct:false}
    ]
},
{
    question:"In which museum can you find Leonardo Da Vinci’s Mona Lisa?",
    answers:[
        {text:"Le Louvre",correct:true},
        {text:"Uffizi Museum",correct:false},
        {text:"British Museum",correct:false},
        {text:"Metropolitan Museum of Art",correct:false}
    ]
},
{
    question:"Which famous inventor invented the telephone?",
    answers:[
        {text:"Thomas Edison",correct:false},
        {text:"Benjamin Franklin",correct:false},
        {text:"Alexander Graham Bell",correct:true},
        {text:"Nikola Tesla",correct:false}
    ]
},
{
    question:"What does the Richter scale measure?",
    answers:[
        {text:"Wind Speed",correct:false},
        {text:"Temperature",correct:false},
        {text:"Tornado Strength",correct:false},
        {text:"Earthquake intensity",correct:true}
    ]
}

]

const questionElem=document.getElementById('question')
const answerbtns=document.getElementById('answer-btn')
const Nextbtn=document.getElementById('next-btn')

let currentQuestionIndex=0
let score=0


function startQuestion(){
    currentQuestionIndex=0
    score=0
    Nextbtn.innerHTML='Next'
    showQuestions()

}

function showQuestions(){
    resetState()
    let currentQuestion=questions[currentQuestionIndex]
    let questionNumber=currentQuestionIndex + 1 
    questionElem .innerHTML=questionNumber + ". " + currentQuestion.question

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement('button')
        button.innerHTML=answer.text
        button.classList.add('btn')
        answerbtns.appendChild(button)
        if(answer.correct){
            button.dataset.correct=answer.correct
        }
        button.addEventListener('click',selectAnswer)
    })

}

function resetState(){
    Nextbtn.style.display='none'
    while(answerbtns.firstChild){
        answerbtns.removeChild(answerbtns.firstChild)
    }
}

function selectAnswer(e){
    const selectedbtn=e.target
    const iscorrect=selectedbtn.dataset.correct === "true"
    if(iscorrect){
        selectedbtn.classList.add('correct')
        score++
    }
    else{
        selectedbtn.classList.add("incorrect")
    }

    Array.from(answerbtns.children).forEach(button =>{
        if(button.dataset.correct==='true'){
            button.classList.add('correct')
        }
        button.disabled=true
    })
    Nextbtn.style.display='block'

}
function showScore(){
    resetState()
    questionElem.innerHTML=`you score ${score} out of ${questions.length}!`
    Nextbtn.innerHTML="Play Again"
    Nextbtn.style.display='block'
}


function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex<questions.length){
        showQuestions()
    }else{
        showScore()
    }
}

Nextbtn.addEventListener('click',()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton()
    }else{
        startQuestion()
    }
})


startQuestion()