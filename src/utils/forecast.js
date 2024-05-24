const request = require("request")

const forecast = (latitude,longitude,callback)=>{

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=706e697c0f43e62493c3a4597b90aa4f&units=metric`;

    request({url,json:true},(error,{body})=>{
        if (error){
            callback("unable to connect to weather app services",undefined)
        }else if (body.message){
            callback("unable to find the location",undefined)
        }else{
            callback(undefined,body.main.temp)
        }
    })
}


module.exports=forecast


