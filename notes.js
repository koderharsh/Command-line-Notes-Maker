const chalk = require('chalk');
const fs = require('fs');
const addNotes = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.find((note) =>note.title == title);
    if (!duplicateNotes) {
        const d=new Date();
        const time=d.getHours()+":"+d.getMinutes()+"  "+d.getDay()+"-"+d.getMonth()+"-"+d.getYear();
        notes.push({
            title: title,
            body: body,
            time:time

        });
        saveNotes(notes);
        console.log(chalk.bold.bgBlue('New note added at',time));
    }
    else {
        console.log(chalk.bold.bgMagenta('Title already Taken!'));
    }
};
const saveNotes = (notes) => {
    const jsonData = JSON.stringify(notes);
    fs.writeFileSync('notes.json', jsonData);
}
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const stringData = dataBuffer.toString();
        const jsonData = JSON.parse(stringData);
        return jsonData;
    }
    catch (e) {
        return [];
    }
}
const removeNotes = (title) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note)=>note.title !== title);
    if (notes.length === duplicateNotes.length) {
        console.log(chalk.bold.bgRed('In appropriate title!'));
    }
    else {
        saveNotes(duplicateNotes);
        const d=new Date();
        const time=d.getHours()+":"+d.getMinutes()+"  "+d.getDay()+"-"+d.getMonth()+"-"+d.getYear();
        console.log(chalk.bold.bgGreen('Notes Removed at',time));
    }
}
const listNotes=()=>{
    const notes = loadNotes();    
    notes.map((note)=>console.log(chalk.bold.blue(note.title)));
}
const readNotes=(title)=>{
    const notes=loadNotes();
    const note=notes.find((singleNote)=>singleNote);
    if(note)
    {
    console.log(chalk.bold.blueBright(note.title));
    console.log((note.body));
    console.log((chalk.blue(note.time)));
    }
    else{
        console.log(chalk.greenBright('Note not found'));
    }
}
const removeAllNotes=()=>{
    const notes=[];
    saveNotes(notes);
    const d=new Date();
    const time=d.getHours()+":"+d.getMinutes()+"  "+d.getDay()+"-"+d.getMonth()+"-"+d.getYear();
    console.log(chalk.bold.italic.yellowBright('All notes removed at',time));
}
module.exports = {    
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes:listNotes,
    readNotes:readNotes,
    removeAllNotes:removeAllNotes
};
