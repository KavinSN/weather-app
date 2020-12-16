const request = require('request')

const getGeoCode = (place,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+place+'.json?access_token=pk.eyJ1Ijoia2F2aW5wcmFiaHUiLCJhIjoiY2todnAxcnVjNTZiNTJ6bDZhaGY5cjBtYyJ9.HvQvCT8EFHOLGcVfDWu_Dw';
    request ({url,json:true},(error,{body}) => {
         if(error){
            callback('not able to connect',undefined)
         }else if(body.features.length === 0){
            callback('unable to find location',undefined)
         }else{ 
             const data={
                lat: body.features[0].center[1],
                longt : body.features[0].center[0],
                place : body.features[0].place_name
             }
             callback(undefined,data)
         }
    })
 }

module.exports = {
   getGeoCode :getGeoCode 
}