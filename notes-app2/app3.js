const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')
// Customize yargs version
yargs.version('1.1.0')
// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})
// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv) {
        //terminal par remove command type karne par ye chalega...
        //notes ke removeNote() mei title pass hoga as argument
        notes.removeNote(argv.title)
    }
})
// Create list command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler() {
        notes.listnotes()
    }
})
// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder:{
        title:{
              describe:'Note a title',
              demandOption:true,
              type:'string'
        }
    },
    handler(argv) {
        notes.readNotes(argv.title)
    }
})
yargs.parse()