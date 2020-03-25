const express=require('express')
const router=new express.Router()
const User=require('../models/user')
const auth=require('../middleware/authentication')
//router.get('/test',(req,res)=>{
    //post method se naya resource ban raha hai users naam ka...
//we have setup up REST API route...or creating endpoint

//creating user---------------------------------------------------------------------------------------------

router.post('/users',async (req,res)=>{
    const user=new User(req.body)
          try{
            await user.save()
           const token=await user.generateAuthToken()
            res.status(201).send({user,token})
          }
          catch(e){
             res.status(400).send(e)
          }

    // // User model ka ek instance bana user usme apan ne Http request ka data bhar diya jo postman se bheja hai...
    // // user instance mei data ko mongodb mei using mongoose save karwa raha hu...
    // user.save().then(()=>{
    //     res.send(user)
    // }).catch((e)=>{
    //     //status code change kiya kyuki error aanke ke bawajood bhi status code change nahi hota toh usse manually karna padta hai...
    //     res.status(400).send(e)
    // })

})

//Reading users------------------------------------------------------------------------------------------
router.get('/users/me',auth,async (req,res)=>{
// try{
//          const users= await User.find({})
//          res.send(users)
// }
// catch(e){
//          res.status(500).send()
// }
res.send(req.user)
//     //User is the instance of model User find({}) returns array of all the users in DB
//       User.find({}).then((users)=>{
//     res.send(users)
//   }).catch((e)=>{
//      res.status(500).send()
//   })
})
// :id ':' is the placeholder and is known as route parameter
// this allows us to provide dynamic value in the route....

//Reading Users by ID---------------------------------------------------------------------------------------

router.get('/users/:id', async (req,res)=>{

    try{
            const user=await User.findById(req.params.id)
            if(!user)
            {
                return res.status(404).send()
            }
            res.send(user)
    }
    catch(e){
               res.status(500).send()
    }
    // const _id=req.params.id //request ke params objects se id uthali
    // User.findById(_id).then((user)=>{ //mongdoDB mei us ID se data search kiya
    //     if(!user){
    //         return res.status(404).send() //agar uss id ka user nahi mila toh return karwaya user not found!
    //     }
    //     res.send(user)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })
})

//updating the user record on the basis of userid with the help of patch method of http request------------------------------

router.patch('/users/:id',async(req,res)=>{
    //yahan par mei ye set karunga ki mujhe kya-kya allowed hai update karna...

    const updates=Object.keys(req.body) //req.body object ko Object.keys array of string mei convert karega
    const allowedUpdates=['name','email','password','age']
    
    const isValidOperation=updates.every((update)=> allowedUpdates.includes(update))
    //now we are checking whether the given operation(in http request) is valid or not using every()
    //every() saare objects par iterate karega or usse allowedupdates par check karega ki allowed updates
    //mei jo hai uske alwa toh updates mei kuch nahi hai. agar hai toh false return karega include()
    //update()=> iss callback mei ek-ek karke objects ja rahe hai jo check ho rahe hai allowedupdates mei using include()

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates!'})
    }
     
    try{
           const user=await User.findById(req.params.id)
            //const user=await User.findByIdAndUpdate(req.params.id,req.body,{new: true, runValidators: true})
            updates.forEach((update)=>user[update]=req.body[update])
            await user.save()
            if(!user){
                return res.status(404).send()
            }
            res.send(user)
    }
    catch(e){
             res.status(400).send(e)
    }
})
//deleting users--------------------------------------------------------------------------------------------

router.delete('/users/:id',async(req,res)=>{
    try{
        const user=await User.findByIdAndDelete(req.params.id)
        if(!user){
            res.status(404).send()
        }
        res.send(user)
    }
    catch(e){
        res.status(500).send()
    }
})

//login karne ka route set kiya-----------------------------------------------------------------------------

router.post('/users/login',async(req,res)=>{
         try{
               const user=await User.findByCredentials(req.body.email,req.body.password)
               const token=await user.generateAuthToken()
               res.send({user,token})
         }
         catch(e){
                       res.status(400).send()
         }
})




module.exports=router