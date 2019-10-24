const weather_form = document.querySelector('form');
const search_input = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weather_form.addEventListener('submit', (e) => {
    e.preventDefault();

    message1.textContent = 'Loading forecast...';
    message2.textContent = '';

    const search = search_input.value;

    fetch(`/weather?search=${search}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return message1.textContent = data.error;
            }

            message1.textContent = data.location;
            message2.textContent = data.forecast;
        });
    })
})