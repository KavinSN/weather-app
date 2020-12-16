const request = require ('request')

const weatherReport = (lat,longt , callback) =>{

    const url ='http://api.weatherstack.com/current?access_key=2dec78f90254bbeb3fa1034bb67df0d8&query='+lat+","+longt;
    request({ url ,json : true},(error , {body}) => {
        if(error){
           callback('not able to connect',undefined)
        }else if(body.error){
           callback('unable to find location',undefined)
        }else{
           const weatherData = {
            weather_des : body.current.weather_descriptions[0],
            Temp :body.current.temperature,
            feelslike : body.current.feelslike
           }
           callback(undefined,weatherData)
        }
   })
}


module.exports = {
   weatherReport:weatherReport
}