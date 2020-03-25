/*
setTimeout(()=>{
    console.log('2 secs are up!')
},2000)

const names=['ravi','samee','ritul']
const shortNames=names.filter((name)=>{
    return name.length===4
})

const geocode=(address,callback)=>{
    setTimeout(()=>{
        const data={
            latitude:0,
            longitude:0
        }
         callback(data)
    },2000)
    
}
   geocode('bhopal',(data)=>{
       console.log(data)
   })
   */
  const add=(a,b,callback)=>{
       setTimeout(()=>{
              return callback(a+b)
       },2000)
  }
  
      add(1,4,(sum)=>{
          console.log(sum)
      })
     