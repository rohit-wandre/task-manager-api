const fs=require('fs')
const book={
    title:'ego is the enemy',
    author:'Ryan Holiday'
}
const bookjson=JSON.stringify(book)//object banake JSON ke strigify() se usko string mei convert kar diya
//console.log(bookjson)
const parsedata=JSON.parse(bookjson)//string ko wapas object mei convert kardiya
//console.log(parsedata.author)
/*  fs.writeFileSync('1-json.json',bookjson)//object pass karke usko nayi file mei write kardiya
const dataBuffer=fs.readFileSync('1-json.json')//nayi file ka data read kiya or usse databuffer mei stroe karaya joki binary form mei rahega
const dataJSON=dataBuffer.toString()//binary data ko string mei convert kiya
const data=JSON.parse(dataJSON)//string ko object mei convert kiya
console.log(data.title)
*/
const databuffer=fs.readFileSync('1-json.json')
const DataJSON=databuffer.toString()
const user=JSON.parse(DataJSON)
user.name='rohit'
user.age=21
const userJSON=JSON.stringify(user)
fs.writeFileSync('1-json.json',user)
console.log(userJSON)