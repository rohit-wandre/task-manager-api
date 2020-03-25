const request=require('request')
const geocode=require('./utils/geo-code')
const forecast=require('./utils/forecast')
/*
const url='https://api.darksky.net/forecast/eb003c153ec9e3d477be57ccc58d63c9/23.25,77.41667?units=si'
request({
    url:url,
       json:true},
    (error,response) => {
        //console.log(response)
        //const data=JSON.parse(response.body)
        //console.log(response.body.currently)
        if(error){
         console.log("Unable to connect to the weather services")
      }
      else if(response.body.error){
           console.log('unable to find the loacation')
      }
      else{
        console.log(response.body.daily.data[0].summary+'It is currently '+response.body.currently.temperature+' degrees out.There is a '+response.body.currently.precipProbability+'% chance of rain')
      }
})
*/
//const geocodeurl='https://api.mapbox.com/geocoding/v5/mapbox.places/bhopal.json?access_token=pk.eyJ1IjoiY29kZXJodWJoYWlrbyIsImEiOiJjazV2Nm04ZWMxaDV0M21sYmswNTR2b2x6In0.5jP-4aPHG8xVzoCHUfGkKg'
/*request({
    url:geocodeurl,
    json:true},
    (error,response)=>{
       if(error){
          console.log("Unable to connect to the weather services")
       }
       else if(response.body.features.length===0){
            console.log('unable to find the loacation')
       }
       else{
         const latitude=response.body.features[0].center[1]
         const longitude=response.body.features[0].center[0]
         console.log("latitude is "+latitude)
         console.log("longitude is "+longitude)
       }
    })
*/
   const address=process.argv[2]
   if(!address)
   {
      return console.log('Please provide an address')
   }
   else{
      geocode(address,(error,{latitude,longitude,location})=>{
         if(error){
            return console.log(error)
         }
       forecast(latitude,longitude,(error,forecastData)=>{
          if(error){
             return console.log(error)
          }
      console.log(location)
      console.log(forecastData)
   })
   })
   }

console.log(process.argv)