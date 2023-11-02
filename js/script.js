window.addEventListener('DOMContentLoaded', () => {

    //Timer

    const deadline = '2023-12-08';

    function getTimeRemaining(endtime){
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0){
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else{
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor(t / (1000 * 60) % 60),
            seconds = Math.floor(t / 1000 % 60);
        }
        
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10){
            return `0${num}`;
        }
        else{
            return num;
        }
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock(){
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    //Form

    // const form_person = document.querySelector('.form__body__person');
    // const add_person = document.querySelector('#form__body__add');


    // const render_input = `
    //     <div>
    //         <input type="text" name="name" class="form__body__person__inf" id="name" placeholder="Имя">
    //         <input type="text" name="surname" class="form__body__person__inf" id="surname" placeholder="Фамилия">
    //     </div>
    //     <div id="check-child">
    //         <input type="checkbox" id="children" name="childr" />
    //         <label for="children" class="lb-children">Это ребенок</label>
    //     </div>
    // `;

    // add_person.addEventListener('click', (e) => {
    //     let newdiv = document.createElement("div");
    //     newdiv.className = 'form__body__person__item';
    //     newdiv.innerHTML = render_input;
    //     form_person.appendChild(newdiv);
    // });

    // Отправка формы

    const URL_APP ="https://script.google.com/macros/s/AKfycbxpkqu4MlIO6-vFHzasdWyn5dGAoERfFnRiVXyY79ihLy94dJ-wt5u3JAkDE1ZPsXo6/exec";

    // находим форму в документе
    const form = document.querySelector("#form");

    // указываем адрес отправки формы (нужно только в начале примера)
    form.action = URL_APP;

    // вспомогательная функция проверки заполненности формы
    function isFilled(details) {
        const {name, surname} = details;
        if (!name) return false;
        if (!surname) return false;
        return true;
    }

    // навешиваем обработчик на отправку формы
    form.addEventListener("submit", async (ev) => {
        // отменяем действие по умолчанию
        ev.preventDefault();

        const person_item = document.querySelectorAll('.form__body__person__item');

        person_item.forEach(function(item){

        }) 

        // получаем ссылки на элементы формы
        const name = document.querySelector("[name=name]");
        const surname = document.querySelector("[name=surname]");
        const child = document.querySelector("[name=child]");

        // собираем данные из элементов формы
        let details = {
            name: name.value.trim(),
            surname: surname.value.trim(),
            child: child.checked,
        };

        // если поля не заполнены - прекращаем обработку
        if (!isFilled(details)) return;

        // подготавливаем данные для отправки
        let formBody = [];
        for (let property in details) {
            // кодируем названия и значения параметров
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        // склеиваем параметры в одну строку
        formBody = formBody.join("&");

        // выполняем отправку данных в Google Apps
        const result = await fetch(URL_APP, {
            method: "POST",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            //cors: "no-cors", <- это неправильно
            mode: "cors", //<- оставим по умолчанию
            body: formBody,
        })
            .then((res) => res.json())
            .catch((err) => alert("Ошибка!"))
            // .then((res) => console.log(res));
            
        if( result.type === 'success' ) {
            name.value = '';
            surname.value = '';
            child.checked = false;
            alert('Спасибо за заявку!')
        }
        if( result.type === 'error' ) {            
            alert(`Ошибка( ${result.errors}`)
        }


    });
});