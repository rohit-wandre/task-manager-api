require('../src/db/mongoose') //mongoose ka DB se connection le liya..
const User=require('../src/models/user') // user model ka User naam se instance bana liya

// User.findByIdAndUpdate('5e665ab834163009d06a9d44',{age:21}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age:21})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })


const updateAgeAndCount =async(id,age)=>{
  const user=await User.findByIdAndUpdate(id,{age:age})
  const count=await User.countDocuments({age})
  return count
}
updateAgeAndCount('5e665ab834163009d06a9d44',2).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})