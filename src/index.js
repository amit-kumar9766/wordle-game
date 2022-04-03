import { wordList, globalSetOfWords, top, middle, last } from './constants';

const imaginedWord = wordList[Math.floor(Math.random() * wordList.length)];
let currentRow = 0;
let currentColumn = 0;
let currentWord = '';
const container = document.getElementById('container');
const middleButtons = document.getElementById('middle-buttons');
const lastButtons = document.getElementById('last-buttons');
const topButtons = document.getElementById('buttons');

for (let i = 0; i < 6; i += 1) {
  const row = document.createElement('div');
  row.classList.add('flex');
  for (let j = 0; j < 5; j += 1) {
    const input = document.createElement('input');
    input.classList.add('input-class');
    // giving dynamic ids to the inputs
    input.id = `${i}${j}`;
    row.appendChild(input);
  }
  container.appendChild(row);
}

function buttonClick(e) {
  if (currentColumn < 5) {
    const selectedInput = document.getElementById(`${currentRow}${currentColumn}`); // querySelector failing here
    selectedInput.value = e.target?.id?.toUpperCase();
    currentWord += e.target?.id?.toUpperCase();
    currentColumn += 1;
  }
}
// function for showing message
function showMessage(msg) {
  const messageContainer = document.querySelector('.toast');
  messageContainer.innerText = msg;
  messageContainer.classList.remove('toast');
  messageContainer.classList.add('shown');
  setTimeout(() => {
    messageContainer.classList.remove('shown');
    messageContainer.classList.add('toast');
  }, 2000);
}

// function for valid word
const validWord = (word) => {
  if (wordList.includes(word) || globalSetOfWords.includes(word)) {
    return true;
  }
  return false;
};

function onClickEnter() {
  if (currentWord.length < 5) {
    showMessage('The no of digits should be five!Please try again');
    return;
  }
  if (!validWord(currentWord.toLowerCase())) {
    showMessage('Please try again !The word doesnot exist');
  } else if (currentWord.length >= 5) {
    if (currentWord.toLowerCase() === imaginedWord) {
      for (let i = 0; i < currentWord.length; i += 1) {
        if (currentWord[i]?.toLowerCase() === imaginedWord[i]) {
          const selectedInput = document.getElementById(`${currentRow}${i}`);
          selectedInput.style.backgroundColor = 'green';
          selectedInput.style.color = 'white';
          selectedInput.style.border = '1px solid white';
          selectedInput.style.animation = 'rotate 500ms ease-out';
        }
      }
      showMessage('You won');
    }
    for (let i = 0; i < currentWord.length; i += 1) {
      if (currentWord[i]?.toLowerCase() === imaginedWord[i]) {
        const selectedInput = document.getElementById(`${currentRow}${i}`);
        selectedInput.style.backgroundColor = 'gold';
        selectedInput.style.color = 'white';
        selectedInput.style.border = '1px solid white';
      } else {
        const selectedInput = document.getElementById(`${currentRow}${i}`);
        selectedInput.style.backgroundColor = 'slategrey';
        selectedInput.style.color = 'white';
        selectedInput.style.border = '1px solid white';
      }
    }
    currentColumn = 0;
    currentRow += 1;
    currentWord = '';
  } else {
    currentRow += 1;
  }
}

function deleteClick() {
  if (!currentColumn) {
    return;
  }
  // Why -1 ->need to understand
  const selectedInput = document.getElementById(`${currentRow}${currentColumn - 1}`);
  selectedInput.value = null;
  currentColumn -= 1;
  currentWord = currentWord.slice(0, -1);
}

// keyboard logic
const buttonsKeyboard = (position, buttons) => {
  for (let i = 0; i < position.length; i += 1) {
    const button = document.createElement('button');
    button.innerHTML = position[i]?.toUpperCase();
    button.classList.add('button-class');
    button.id = position?.[i];
    button.onclick = (e) => {
      buttonClick(e);
    };
    buttons.appendChild(button);
  }
};

// topbuttons
buttonsKeyboard(top, topButtons);
// middlebuttons
buttonsKeyboard(middle, middleButtons);
// enter button
const enterButton = document.createElement('button');
enterButton.innerHTML = 'enter'.toUpperCase();
enterButton.classList.add('button-class');
enterButton.onclick = onClickEnter;
lastButtons.appendChild(enterButton);
// lastRow
buttonsKeyboard(last, lastButtons);
// delete button
const deleteButton = document.createElement('button');
deleteButton.innerHTML = 'del'.toUpperCase();
deleteButton.classList.add('button-class');
lastButtons.appendChild(deleteButton);
deleteButton.onclick = deleteClick;
