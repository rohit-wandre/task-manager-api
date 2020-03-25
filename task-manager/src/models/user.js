const mongoose=require('mongoose')
const validator=require('validator')// validator npm module ko import kiya which has methods for performing validatiions
//like using isEmail() of validator, we can check whether the given email is valid or not
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const userSchema=new mongoose.Schema({
    name:{
            type:String, //user model banaya uski 2 fields hai name & age
                         //name ka type string rakha or age ka number

            required:true, //name likhna manadatory ho jayega ab
            trim:true             
    },
    password:{
            type:String,
            required:true,
            trim:true,
            minlength:7,
            validate(value){
                if(value.toLowerCase().includes('password'))
                {
                    throw new Error("Password cannot contain `password`")
                }
            }

    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
             if(!validator.isEmail(value))
             {
                 throw new Error('Invalid Email!')
             }
        }
    },
    age:{
             type:Number,
             default:0,
             validate(value){
                 if(value<0)
                 {
                     throw new Error('Age must be positive')
                 }
             }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

userSchema.virtual('tasks',{ //this is for mongoose to understand the relationship b/w user & tasks
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.generateAuthToken=async function(){
        const user=this
        const token=jwt.sign({_id:user._id.toString()},'hello')
        user.tokens=user.tokens.concat({token})
        await user.save()
        return token

}

userSchema.statics.findByCredentials=async(email,password)=>{
    const user=await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}
//yahan se middleware work karna start karega for hashing the plain text password----------------------------------

userSchema.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){ //agar pass 1st time bana hai ya modified hai matlab update hoa hai toh true milega
        user.password=await bcrypt.hash(user.password,8)
    }
    //save karne se pehle mene password ko hash mei convert kar diya ab ye hash value as it is DB mei store hogi..
    

    next()//next agar call nahi karenge toh middleware ko lagega ki abhi bhi code chal raha hai..
})
                                               
//const User = mongoose.model('User',userSchema) // mongoose internally second argument schema leta hai or background mei usko frame karta hai apan ne yahan
                                               //woh structure frame karke pehle hi pass kardiya taaki middleware ka fayda utha sake




                                               module.exports = mongoose.models.Users || mongoose.model('Users', userSchema);



// const User = mongoose.model('User',{
//     name:{
//             type:String, //user model banaya uski 2 fields hai name & age
//                          //name ka type string rakha or age ka number

//             required:true, //name likhna manadatory ho jayega ab
//             trim:true             
//     },
//     password:{
//             type:String,
//             required:true,
//             trim:true,
//             minlength:7,
//             validate(value){
//                 if(value.toLowerCase().includes('password'))
//                 {
//                     throw new Error("Password cannot contain `password`")
//                 }
//             }

//     },
//     email:{
//         type:String,
//         required:true,
//         trim:true,
//         lowercase:true,
//         validate(value){
//              if(!validator.isEmail(value))
//              {
//                  throw new Error('Invalid Email!')
//              }
//         }
//     },
//     age:{
//              type:Number,
//              default:0,
//              validate(value){
//                  if(value<0)
//                  {
//                      throw new Error('Age must be positive')
//                  }
//              }
//     }
// })


module.exports = mongoose.models.Users || mongoose.model('Users', UsersSchema);