
const request=require('request')

const forecast=(lati,longi,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=18466c60a346e4df87936badcbd59e53&query='+longi+','+lati+'&units=f'
    request({url,json : true},(error,{body})=>{
        if(error){
            callback('unable to connect to loc services',undefined)
        } else if(body.error){
            callback('unable to find details',undefined)
        } else{
            callback(undefined,body.current.weather_descriptions[0]+'. There is '+body.current.temperature+'and chances of rain: '+body.current.feelslike)
        }
    })
}

module.exports=forecast