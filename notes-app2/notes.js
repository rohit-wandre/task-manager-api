const fs = require('fs')
const chalk=require('chalk')
const getNotes=()=> {
    return 'Your notes...'
}
const addNote = (title, body)=> {
    const notes = loadNotes()
    console.log(notes);
    const duplicateNote = notes.find((note)=>note.title===title)
    //const duplicateNotes = notes.filter(function (note) {
        //return note.title === title
    if (!duplicateNote)/*matlab duplicate note nahi hai*/ {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note already exist'))
    }
}
const removeNote=function(title){
const notes=loadNotes()//loadNotes call hoa
//agar file nahi mili toh empty array object return hoga nahi toh filled array obj..
const notesToKeep=notes.filter((note)=>note.title!==title)
        //agar cmd ka argu match kar gaya file ke title se toh return hoga true
 if(notes.length>notesToKeep.length)//
 {
     console.log(chalk.green.inverse('note removed!'))
     saveNotes(notesToKeep)
 }
 else{
    console.log(chalk.red.inverse('No note found!')) 
 }
}
const saveNotes =(notes)=>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}
const loadNotes = () =>{
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}
const listnotes=()=>{
    const notes=loadNotes()
    console.log(chalk.inverse('Your notes'))
    notes.forEach((note)=>{
        console.log(note.title)
    })

}
const readNotes=(title)=>{
 const notes=loadNotes()
 const note=notes.find((note)=>note.title===title)
 if(note){
   console.log(chalk.inverse(note.title))
   console.log(note.body)
 }
 else{
     console.log(chalk.red.inverse('Note not found!'))
 }
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote:removeNote,
    listnotes:listnotes,
    readNotes:readNotes
}