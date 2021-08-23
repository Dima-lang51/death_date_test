//Получаем элементы со страницы
 
const buttonsQ1 = document.querySelectorAll('.q1');
const buttonsQ2 = document.querySelectorAll('.q2');
const buttonQ3 = document.querySelector('.q3');
const buttonsQ4 = document.querySelectorAll('.q4');
const select_day = document.getElementById('day');
const select_month = document.getElementById('month');
const select_year = document.getElementById('year');
const buttonsQ5 = document.querySelectorAll('.q5');
const buttonCall = document.querySelector('.button__back--bell');



let answers = [];

buttonsQ1.forEach(element => {
  element.addEventListener("click", () => nextQuestion(element, 'q1', 'q2'));
});

buttonsQ2.forEach(element => {
  element.addEventListener("click", () => nextQuestion(element, 'q2', 'q3'));
});

buttonQ3.addEventListener("click", () => question3(buttonQ3, 'q3', 'q4'));

buttonsQ4.forEach(element => {
  element.addEventListener("click", () => question4(element, 'q4', 'q5'));
});

buttonsQ5.forEach(element => {
  element.addEventListener("click", () => loading(element, 'q5', 'loading'));
});

buttonCall.addEventListener("click", () => {
  let api__response = document.querySelector('.api__response');
  getData('https://swapi.dev/api/people/1/',  (data) => {
   let responseData = JSON.parse(data);
   let responseStr = '';
    for (var key in responseData) {
      responseStr += key + ': ' + responseData[key] + '<br>';
    }            
    api__response.innerHTML  = responseStr;
}, error => {
  api__response.textContent = 'Ошибка получения данных';
});
  
});


function nextQuestion(button, block_close_id, block_open_id) {
  const button_text = button.value;

  if (button_text != undefined) {
    answers.push(button_text);
  }

  
  console.log(answers);
  const block_close = document.getElementById(block_close_id);
  const block_open = document.getElementById(block_open_id);

  block_close.style.display = 'none';
  block_open.style.display = 'block';
}

function getAge(d1){
    let now = new Date();
    let d2 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    let diff = d2.getTime() - d1.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

function question3(button, block_close_id, block_open_id) {
 let value_day = select_day.value;
 let value_month = select_month.value;
 let value_year = select_year.value;
   
  if (value_day === 'День') {
    select_day.style.border = '1px solid red';
  } else if (value_month === 'Месяц') {
    select_month.style.border = '1px solid red';
  } else if (value_year === 'Год') {
    select_year.style.border = '1px solid red'; 
  } else {
      let birthdate = new Date(value_year, months.indexOf(value_month) + 1, value_day, 00, 00, 01);
     let age = getAge(birthdate);
     answers.push(age);
      nextQuestion(NaN, block_close_id, block_open_id);
  }

};

function question4(button, block_close_id, block_open_id) {
  let age = answers[2];
  let textQ5 = document.querySelector('.q5');

  if (age >= 36 && age <= 45) {
    textQ5.textContent = `По вам скучает очень близкий человек, которого больше нет в мире живых. Возможно это дедушка или бабушка.`;
  } else if (age > 46) {
    textQ5.textContent = `По вам скучает очень близкий человек, которого больше нет в мире живых. Возможно это кто-то из Ваших родителей.`;
  }

  nextQuestion(button, block_close_id, block_open_id);
};

function loading(button, block_close_id, block_open_id) {
   nextQuestion(button, block_close_id, block_open_id);
  let elem = document.querySelector(".percent");
  let percent = 0;
  let id = setInterval(frame, 30);

  function frame() {
   if (percent >= 100) {
     clearInterval(id);
      nextQuestion(NaN, 'loading', 'result');
   } else {
     percent++;
     elem.innerHTML = percent * 1  + '%';
   }
 };
};

const getData = (url, callback, reject = console.error) => {
   const request = new XMLHttpRequest();
   request.open('GET', url);

   request.addEventListener('readystatechange', () => {
      if (request.readyState !== 4) return;

      if (request.status === 200) {
         callback(request.response)
      } else {
         reject(request.status);
         console.error('Ошибка', request.response)
      }
   });

       request.send();

};







for (let day = 1; day <= 31; day++) {
  let option = document.createElement("OPTION");
  document.getElementById("day").appendChild(option).innerHTML = day;
}

for (let year = 1920; year <= 2021; year++) {
  let options = document.createElement("OPTION");
  document.getElementById("year").appendChild(options).innerHTML = year;
}

let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

months.forEach(month => {
  let options = document.createElement("OPTION");
  document.getElementById("month").appendChild(options).innerHTML = month;

});


