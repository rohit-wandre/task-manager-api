const mongoose=require('mongoose')

mongoose.connect(process.env.MONGODB_URL,{
    //yeh saare options object hai...
    useNewUrlParser:true,
    useCreateIndex:true, //It ensures indexes are created alongside mongodb to qucikly access the data from DB
    useFindAndModify:false
})

// yahan ab apan ek model prepare kar rahe hai..
//model():->
/*
1st arg: name of model as a string
2nd arg: fields of the model as objects
*/



//  ab iss model ke instances banayenge jo ki actual documents honge collection mei..

 //me naam ka ek document bana apne collection mei jiski feild values mene set kardi yahan par
/*const me=new User({
    name:'   Ravi rajput            ',
    email:'RAVI@GMAIL.COM',
    password:'gwalior'
})
me.save().then(()=>{
console.log(me)
}).catch((error)=>{
     console.log(error)
})


/*const checkTask=new Tasks({
    description:'Buy an Audi',
    completed:false
})

checkTask.save().then(()=>{
    console.log(checkTask)
}).catch((error)=>{
    console.log(error)
})
*/

