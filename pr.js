let beginButton = document.querySelector('.begin-button');
let game = document.querySelector('.game')
let p = document.querySelector('p');
let zak = 0;
let ut = false;
beginButton.addEventListener('click', beginGame)
game.addEventListener('click', (e) => {
  if (e.target.innerHTML == pot) {
    e.target.style.backgroundColor = 'red';
    pot++;
    if (pot == 26) {
      clearInterval(timerId);
      ut = false;
      alert('Поздравляю.Вы примат.БУ-БУ');

    }
  }

})

function randomNumber() {
  let randomNumberLet = [];
  for (let i = 0; i < 25; i++) {
    randomNumberLet[i] = i + 1;
  }
  shuffle(randomNumberLet);
  return randomNumberLet;
}
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

    // поменять элементы местами
    // мы используем для этого синтаксис "деструктурирующее присваивание"
    // подробнее о нём - в следующих главах
    // то же самое можно записать как:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function sizeRandom() {
  return Math.round(Math.random() * 35 + 13);
}

function randomInterval() {
  return Math.round(Math.random() * 255);
}
function beginGame() {
  zak++;

  timeGame = 75;
  beginButton.style.display = 'none';
  p.innerHTML = `Осталось: ${timeGame} секунд`;
  window.pot = 1;

  window.timerId = setInterval(() => {
    ut = true;
    timeGame -= 1;
    p.innerHTML = `Осталось: ${timeGame} секунд`;
    if (timeGame <= 0) {
      clearInterval(timerId);
      alert('Вы проиграли');
    }
  }, 1000);

  let html = '';
  let k = 0;
  let arr = randomNumber();
  for (let i = 0; i < 5; i++) {
    html += '<tr>';
    for (let j = 0; j < 5; j++) {
      html += `<td class="td-element" style="color:rgb(${randomInterval()},${randomInterval()},${randomInterval()});font-size:${sizeRandom()}px;">${arr[k]}</td>`;
      k++;
    }
    html += '</tr>'
  }
  game.innerHTML = html;
  let buttonPot = document.createElement('button');
  buttonPot.innerText = 'Начать сначала';

  buttonPot.style.marginTop = '20px';
  buttonPot.addEventListener('click', beginGame);
  if (ut) {
    clearInterval(timerId);
  }

  if (zak <= 1) {
    document.body.appendChild(buttonPot);
  }
}
