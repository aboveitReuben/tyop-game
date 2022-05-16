//words and char vars
let words;
let chosenWord;
let chosenWordLength;
let currentChosenWordId = 0;
//timer vars
let timerInterval;
let min = 0;
let sec = 0;
let ms = 000;
let stoptime = true;

//dom elements
const timerElement = document.getElementById('timer');
const results = document.getElementById('results');
let currentChar;

//events
document.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        if(stoptime === true){
            start();
        }
        return;
    }
    currentChar = document.getElementById(`char${currentChosenWordId}`);

    if(e.key.toLocaleLowerCase() === currentChar.innerText.toLocaleLowerCase()){
        currentChosenWordId++;
        currentChar.classList.add('correct');
    }
});

//timer functions
const startTimer = () => {
    if (stoptime === true) {
        stoptime = false;
        timerCycle();
    }
}
const stopTimer = () => {
    if (stoptime === false) {
        stoptime = true;
        if(timerInterval){
            clearTimeout(timerInterval)
        }
    }
}

const resetTime = () => {
    min = 0;
    sec = 0;
    ms = 000;

}
const timerCycle = () => {
    if(chosenWordLength === currentChosenWordId){
        completedWord();
    }
    if(stoptime){
        return;
    }
    sec = parseInt(sec);
    min = parseInt(min);
    ms = parseInt(ms);

    ms = ms + 100;

    if (ms === 1000) {
        sec = sec + 1;
        ms = 0000;
    }

    if (sec === 60) {
      min = min + 1;
      sec = 0;
    }

    if (ms < 1000 || ms === 0000) {
        ms = '0' + ms;
      }
    if (sec < 10 || sec === 0) {
      sec = '0' + sec;
    }
    if (min < 10 || min === 0) {
      min = '0' + min;
    }


    timerElement.innerHTML = `${min} - ${sec} - ${ms}`;

    timerInterval = setTimeout("timerCycle()", 100);
}

const appendResult = () => {
    
    results.innerHTML = `${results.innerHTML}<p><span>ord: ${chosenWord.word}<span> Din tid: <span> ${parseInt(min)} Minutter : ${parseInt(sec)} sekunder: ${parseInt(ms)} millisekunder</span></p>`
}

const completeGame = () => {
    stopTimer();
} 

const completedWord = () => {
    const newWordsList = words.filter(x => x.word !== chosenWord.word)
    if(!newWordsList.length){
        completeGame();
    }else {
        setWords(newWordsList);
        resetWord();
    }
}

const resetWord = () => {
    stopTimer();
    appendResult();
    chosenWord = undefined;
    chosenWordLength = undefined;
    currentChosenWordId = 0;
    resetTime();
    start();

}



const getRandomNumber = () => (Math.random() > .5) ? 1 : -1

const pickWord = () => {
    return words.sort(getRandomNumber).at(0);
}

const setNewWord = () => {
    chosenWord = pickWord();
    chosenWordLength = chosenWord.word.length;
    const output = [...chosenWord.word].map((char, index) => (`<span id="char${index}">${char}</span>`)).join('');
    document.getElementById('word').innerHTML = output;
}

const start = () => {
    setNewWord();
    startTimer();
}
//setup
const setWords = (wordsArray) => {
    words = [...wordsArray]
}
const init = () => {
    setWords([
    {
        word: 'referanseinstallasjonsmetode',
        difficulty: 5
    },{
        word: 'vanskelig',
        difficulty: 1
    },{
        word: 'venninnen',
        difficulty: 2
    }, {
        word: 'proposjonalitetskonstanten',
        difficulty: 4
    },
    {
        word: 'byråkrat',
        difficulty: 2
    },
    {
        word: 'middag',
        difficulty: 2
    },
    {
        word: 'gris',
        difficulty: 1
    },
    {
        word: 'fiskesuppe',
        difficulty: 2
    }]);
}

//init game

init();