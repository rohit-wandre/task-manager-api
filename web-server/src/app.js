const express=require('express')
const path=require('path')
const app=express()
const hbs=require('hbs')
const geocode=require('./utils/geo-code')
const forecast=require('./utils/forecast')
app.get('',(req,res)=>{
    res.render('index',{//render function renders the view(in this case html file to provide dynamic behaviour in html by which we can avoid using hard coded strings)
        title:'Weather App',
        name:'Rohit Wandre'
    })
})

//define paths for express config
const viewsPath=path.join(__dirname,'../templates/views')
const publicDirectoryPath=path.join(__dirname,'../public')//a variable used to store the absolute path of the directory
const partialsPath=path.join('__dirname','../templates/partials')
//setup handlebars location and views engine

app.set('view engine','hbs')//handlebar templates...from npm lib
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static assests to use

app.use(express.static(publicDirectoryPath))//isse apan public folder ke andar ki html file tak pahoch paye

app.get('',(req,res)=>{//get() 1st arg domain name lega or the home page
                            //2nd arg is a callback() having 2 args
                            //request,response 
    res.render('index',{
        title:'Weather',
        name:'Rohit Wandre'
    })//se browser  par message display ho jayega
})


app.get('/help',(req,res)=>{
    //res.send('In help page!')
    res.render('help',{//ye response help hbs ke pass jayega
        helpText:'This is some helpful text.',
        title:'Help',
        name:'Rohit Wandre'
    })
   
})

app.get('/about',(req,res)=>{
    res.render('about',{//ye response about hbs ke pass jayega
        title:'About me',
        name:'Rohit Wandre'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'You must provide an address'
        })
    }
   // res.send('weather',{
    //    forecast:'its cold out here',
      //  location:'Bhopal',
        //address:req.query.address
    //})

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        //upar object destructuring ho rahi hai..
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
    console.log(req.query.search)//request ke pass query object hai jo query string ko
                           //store karke rakhta hai
    if(!req.query.search)
    {                    
       return res.send({
           error:'You must provide a search term'
       })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 help',
        name:'Rohit Wandre',
        errorMessage:'Help article not found'
    })
   })
//match anything which doesn't match in the URL yet..
app.get('*',(req,res)=>{
 res.render('404',{
     title:'404',
     name:'Rohit Wandre',
     errorMessage:'Page not found'
 })
})
app.listen(3000,()=>{
    //listen() se server up hoga 3000 port no. hai..
    console.log('Server is up on port 3000')
})