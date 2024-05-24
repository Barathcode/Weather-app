const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsDirectoryPath=path.join(__dirname,'../templates/views')
const partialsDirectoryPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

//setup static directory to server
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather app",
        name:"Barath"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:"This is some helpful text",
        title:"Help",
        name:"Barath"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About me",
        name:"Barath"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please provide the valid address"
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"you must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:"Barath",
        errorMessage:"Help article not found"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:"Barath",
        errorMessage:"Page not found"
    })
})

app.listen(3000,()=>{
    console.log("server is up on 3000 port")
})

