const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode.js')
const weather = require('./utils/weatherReport.js')
const app = express()

const publicDir = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')

const port = process.env.PORT || 8000

app.use(express.static(publicDir))

app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)

app.use(express.static(publicDir))

app.get('',(req,res) => {
    res.render('weather',{
        title : 'Get weather'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title : 'help',
        name:'kavin'
    }) 
})

app.get('/weather',(req,res) => {
    res.render('weather',{
        title : 'Get weather'
    })
})

app.get('/about',(req,res) => {  
    res.render('about',{
        title : 'about' 
    }) 
})

app.get('/getweather' , ( req , res ) =>{
    const address = req.query.address ;
    if(!address){
        return res.render('error',{error : "you must provide address"})
    }
        geoCode.getGeoCode (address,(error,{lat , longt,place} = {})=>{
          if(error){
            return res.send({error})
            //return res.render('error',{error})
          }
          weather.weatherReport(lat,longt,(error, { weather_des, Temp, feelslike } ={}) => {
             if(error){
                 return res.send({error})
                // return res.render('error',{error})
             }
             res.send({
                weather_des,place,Temp,feelslike
             })
            // res.render('weather',{weather_des,place,Temp,feelslike})
          }) 
       })


  //  res.send( {address : req.query.address } ) 
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        errorMsg : 'help article not found'
    }) 
})

app.get('*',(req,res) => {
    res.render('404',{
        title : 'Page not found'
    }) 
})
app.listen(8088,( ) => {
    console.log("server is up and running in port "+port+" :) ")
})