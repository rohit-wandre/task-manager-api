const request=require('request')
const geocode=(address,callback)=>{
    console.log('in geocode')
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiY29kZXJodWJoYWlrbyIsImEiOiJjazV2Nm04ZWMxaDV0M21sYmswNTR2b2x6In0.5jP-4aPHG8xVzoCHUfGkKg'
     request({url:url,json:true},(error,{body})=>{
        if(error){
           callback('Unable to connect to location services!',undefined)
        }
        else if(body.features.length===0){
          callback('Unable to find location.Try another search',undefined)
        }
        else{
           callback(undefined,{
              latitude:body.features[0].center[0],
              longitude:body.features[0].center[1],
              location:body.features[0].place_name
           })
        }
     })
 }
 module.exports=geocode