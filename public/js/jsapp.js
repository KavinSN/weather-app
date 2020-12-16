const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const Msg1 = document.querySelector('#p1')
const Msg2 = document.querySelector('#p2')


weatherForm.addEventListener('submit',(event) => {
    event.preventDefault()
    Msg1.textContent = 'Loading ...'

fetch('/getweather?address='+search.value).then((response) => {
    response.json().then((data) => {
        if(data.error){
          Msg1.textContent = data.error
        }else{
            Msg1.textContent=data.weather_des+' in '+data.place
            Msg2.textContent='Today\'s Temperature is '+data.Temp+' but it feels like '+data.feelslike

        }
    })
})

})
