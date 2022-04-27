const path =require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Anni Priyanka'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Anni Priyanka'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Anni Priyanka'
    })
})

app.get('/help',(req,res)=>{
    res.send({
        name:'Anni',
        age : 26
    })
})

app.get('/about',(req,res)=>{
    res.send('<h1>HTML</h1>')
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : "u must provide a search term"
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
                forecast : forecastData,
                location,
                address :req.query.address
            })
        })

    })

})

app.get('/products',(req,res)=>{
    console.log(req.query )
    if(!req.query.search){
        return res.send({
            error : "u must provide a search term"
         })  
    }
    res.send({
       products : []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Anni Priyanka',
        errorMessage:'Help Article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Anni Priyanka',
        errorMessage:'Page not Found'
    })
})

app.listen(3000,()=>{
    console.log('server is on port 3000')
})