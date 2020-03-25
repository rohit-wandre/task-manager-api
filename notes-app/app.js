//const fs=require('fs')//require() tells node to load which type of module fs->filesystem
//file System ke andar writeFileSync() hai jo 2 args leta hai
//1. name of file
//2.text in it,
//agar file nahi hai toh create karega nahi toh data ko overwrite kardega.
//fs.writeFileSync('notes.txt','My name is Rohit Wandre')
//fs.appendFileSync('notes.txt',' this is the appended text!')


/*const add=require('./utils.js')
const sum=add(4,-2)
console.log(sum)
*/

//var note=require('./notes.js')
var yournotes=note()
console.log(yournotes)