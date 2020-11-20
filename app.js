const validator=require('validator');
const notes=require('./notes.js');;
const chalk=require('chalk');
const yargs = require('yargs');
// const { demandOption, string } = require('yargs');
// console.log(chalk.green(getNotes()));
yargs.command({
    command:'add',
    describe:'Adding a new Note!',
    builder:{
        title:{
            describe:'My Note',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'Body of My Note',
            demandOption:true,
            type:'string'
        }
    },
    handler:(argv)=>notes.addNotes(argv.title,argv.body)    
})
yargs.command({
    command:'remove',
    describe:'Remove a  Note!',
    builder:{
        title:{
            describe:'Remove note',
            demandOption:true,
            type:'string'
        }
    },
    handler:(argv)=>notes.removeNotes(argv.title)    
})
yargs.command({
    command:'list',
    describe:'Listing a Note!',
    handler:()=>notes.listNotes()
})
yargs.command({
    command:'read',
    describe:'Reading a Note!',
    builder:{
        title:{
            describe:'Read a note',
            demandOption:true,
            type:'string'
        }
    },
    handler:(argv)=>notes.readNotes(argv.title)
    
})
yargs.command({
    command:'removeAll',
    describe:'removeAllNotes',
    handler:()=>notes.removeAllNotes()
    
})
// console.log(yargs.argv);
yargs.parse();
