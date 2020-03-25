const yargs=require('yargs')
//create add command

yargs.command({
    command:'add',
    describe:'Add a new note',
    handler:function(){
        console.log('Adding a new note!')
    }
})
//Remove command
yargs.command({
    command:'remove',
    describe:'Remove a note',
    handler:function(){
        console.log('Removing the note')
    }
})
//list command
yargs.command({
    command:'list',
    describe:'Listing the notes',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'Note body',
            demandOption:true,
            type:'string'
        }
    },
    handler:function(argv){
        notes.addNote(argv.title,argv.body)
    }
})
//read command
yargs.command({
    command:'read',
    describe:'Reading a note',
    handler:function(){
        console.log('in read command')
    }
})
console.log(yargs.argv)