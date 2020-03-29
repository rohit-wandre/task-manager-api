require('../src/db/mongoose')
const Task=require('../src/models/task')

// Task.findByIdAndDelete('5e666059b9282a43e85e840c').then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed:false})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })


const deleteTaskAndCount= async(id)=>{
    const task=await Task.findByIdAndDelete(id)
    const count=await Task.countDocuments({completed:false})
    return count
}

deleteTaskAndCount('5e665f76f6e5590e3c3af11b').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})