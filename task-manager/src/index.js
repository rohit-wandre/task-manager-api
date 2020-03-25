const express=require('express')
const app=express()
const port= process.env.PORT //heroku mei deploy karne ke liye process.env local testing ke liye 3000

//MiddleWare function----------------------------------------------------------------------------------------------

// app.use((req,res,next)=>{
//     console.log(req.method,req.path)
//     if(req.method==='GET'){
//         res.send('GET requests are disabled!')
//     }
//     next()
// })

// app.use((req,res,next)=>{
//     //ye karne se koi bhi request ki routing nahi hogi 

//     res.status(500).send('Site is under maintainance,please come back later:)')
// })
//------------------------------------------------------------------------------------------------------------

/**It parses incoming JSON into an object so that we can use it in req */
app.use(express.json())
require('./db/mongoose')
const User=require('./models/user2')
const Task=require('./models/task2')


//----------------------------------multer npm library for file uploads---------------------------------
const multer=require('multer')
const upload=multer({
    dest:'images', //images folder mei file save ho jayegi
    limits:{
            fileSize:1000000
    }, //fileFilter() filters the type pf file that is uploaded in DB based on some specified conditions.
    fileFilter(req,file,cb){
        // cb(new Error('file must be a PDF'))
        // cb(undefined,true)
        // cb(undefined,false)
        if(!file.originalname.match(/\.(doc|docx)$/)){ // Regular Expression is used here
            return cb(new Error('Please upload a word document'))
        }
        cb(undefined,true)
    }
})

// const errorMiddleware=(req,res,next)=>{
//     throw new Error('From my middleware')
// }




 //upload.single('upload')  multer 'upload' naam ki file dekhta hai or usse dest images ke folder mei daaldega
 app.post('/upload',upload.single('upload'),(req,res)=>{
    res.send()
},

(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})




//user ka route set kiya
const userRouter=require('./routers/user2')
//usse register kiya
app.use(userRouter)

//task ka route set kiya

const taskRouter=require('./routers/task2')
app.use(taskRouter)




app.listen(port,()=>{
    console.log('Server is up on port '+port)
})




//Creating a custom made route
// const router=new express.Router()

// //uski yahan routing kardi...

// router.get('/test',(req,res)=>{
//     res.send('This is from my router')
// })
// //register your route to use with express...
// app.use(router)


// bcryptjs npm module for converting plain text pass into hashed value-------------------------------------------------
// const bcrypt=require('bcryptjs')
// const myfunction=async ()=>{
//     const pass='rohit123'
//     const hashedPass=await bcrypt.hash(pass,8) //bcrypt returns a promise function that's why we have used async-await..

//     console.log(pass)
//     console.log(hashedPass)
//    const isMatch=await bcrypt.compare('rohit123',hashedPass)
//    console.log(isMatch)

// }

// myfunction()

// const jwt=require('jsonwebtoken')

// const func= async()=>{
          
//     const token=jwt.sign({_id:'abc123'},'hellonigga',{expiresIn:'2 second'})
//     console.log(token)
//     const d=jwt.verify(token,'hellonigga')
//      console.log(d)
// }

// func()

            // const main= async()=>{
            //     const user=await User.findById('5e77443e1d5af722b898f97d')
            //     await user.populate('tasks').execPopulate()
            //     console.log(user.tasks)
            // }

            // main()