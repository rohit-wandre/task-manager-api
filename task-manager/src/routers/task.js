const express=require('express')
const router=new express.Router()
const Task=require('../models/task')


//Creating tasks--------------------------------------------------------------------------------------------

router.post('/tasks',async (req,res)=>{
    const task=new Task(req.body)
    try{
        await task.save()
        res.status(201).send(task)
    }
  catch(e){
       res.status(400).send()
  }
      // task.save().then(()=>{
      //     res.status(201).send(task)
      // }).catch((e)=>{
      //     res.status(400).send(e)
      // })
  })
  
  //Reading tasks---------------------------------------------------------------------------------------------- 
  
  router.get('/tasks',async (req,res)=>{
      const tasks=await Task.find({})
      try{
          res.send(tasks)
      }
      catch(e){
          res.status(500).send()
      }
      // Task.find({}).then((tasks)=>{
      //     res.send(tasks)
      // }).catch((e)=>{
      //     res.status(500).send()
      // })
  })
  
  //Reading tasks by ID-----------------------------------------------------------------------------------------
  
  router.get('/tasks/:id',async (req,res)=>{
  
      const task=await Task.findById(req.params.id)
      try{
          if(!task)
          {
              return res.status(404).send()
          }
          res.send(task)
      }
      catch(e){
          res.status(500).send()
      }
      // const _id=req.params.id
      // Task.findById(_id).then((task)=>{
      //     if(!task){
      //         return res.status(404).send()
      //     }
      //     res.send(task)
      // }).catch((e)=>{
      //     res.status(500).send()
      // })
  })
  
  //updating tasks-------------------------------------------------------------------------------------------
  router.patch('/tasks/:id',async(req,res)=>{
      const updates=Object.keys(req.body)
      const allowedUpdates=['description','completed']
      const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
  
      if(!isValidOperation){
          return res.status(400).send({error:'Invalid updates!'})
          
      }
      try{
                const task=await Task.findByIdAndUpdate(req.params.id)
                // const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
                 
                updates.forEach((update)=>task[update]=req.body[update])
                await task.save()
                
                if(!task){
                     return res.status(404).send()
                 }
                 res.send(task)
      }
      catch(e){
               res.status(300).send(e)
      }
  })
  
  //Deleting task----------------------------------------------------------------------------------------------
  
  router.delete('/tasks/:id',async(req,res)=>{
      try{
          const task=await Task.findByIdAndDelete(req.params.id)
          if(!task){
              res.status(404).send()
          }
          res.send(task)
      }
      catch(e){
          res.status(500).send()
      }
  })

  module.exports=router