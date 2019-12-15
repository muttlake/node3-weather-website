// Fetch API is only for client side javascript
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

const getWeather = (searchTerm) => {
    const url = '/weather?address=' +encodeURIComponent(searchTerm);
    fetch(url)
    .then(
        (response) => {
            response.json().then(
                (data) => {
                    if(data.error) {
                        messageOne.textContent = data.error
                    } else {
                        messageOne.textContent = data.location.location
                        messageTwo.textContent = data.forecast.forecast
                    }
                }
            )
        }
    )
}

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    getWeather(search.value)
})
