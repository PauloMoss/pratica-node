import fs from 'fs';
import chalk from 'chalk';
import readlineSync from 'readline-sync';

fs.existsSync("./todos.json");
const MyToDoList = fs.readFileSync("./todos.json",'utf8')
const toDoList = JSON.parse(MyToDoList).toDoList
whatToDo()

function whatToDo() {
    const commands = ["add", "list", "check", "remove"];
    const index = readlineSync.keyInSelect(commands, 'What to do?');
    if(index + 1 === 5) return;
    if(index + 1 === 1) {
        add()
    }else if (index + 1 === 2) {
        list()
    }else if (index + 1 === 3) {
        check()
    }else if (index + 1 === 4) {
        remove()
    }
}

function add() {
    const toDo = readlineSync.question('What do you want to do ? ');
    toDoList.push(`🔴 ${toDo}`)
    fs.writeFileSync("./todos.json", JSON.stringify({toDoList: toDoList}));
    whatToDo()
}

function list() {
    for(let i = 0; i<toDoList.length; i++) {
        console.log(`${toDoList[i]}`)
    }
    whatToDo()
}

function check() {
    const indexCheck = (readlineSync.keyInSelect(toDoList, 'What do you want to check/uncheck ?'));
    toDoList[indexCheck] = toDoList[indexCheck].replace("🔴","🟢");

    fs.writeFileSync("./todos.json", JSON.stringify({toDoList: toDoList}));
    whatToDo()
}

function remove() {
    const removeIndex = (readlineSync.keyInSelect(toDoList, 'What do you want to remove?'));
    toDoList.splice(removeIndex, 1);

    fs.writeFileSync("./todos.json", JSON.stringify({toDoList: toDoList}));
    whatToDo()
}