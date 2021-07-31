let fs = require("fs");
let inputArr = process.argv.slice(2);
//console.log(inputArr);


let optionsArr = [];
let filesArr = [];
for (let i = 0; i < inputArr.length; i++) {
    let firstChar = inputArr[i].charAt(0);
    if (firstChar == "-") {
        optionsArr.push(inputArr[i]);
    } else {
        filesArr.push(inputArr[i]);
    }
}

for (let i = 0; i < filesArr.length; i++) {
    let ans = fs.existsSync(filesArr[i]);
    if (ans == false) {
        console.log(`file doesn't exist`);
        return;
    }
}
let content = "";
for (let i = 0; i < filesArr.length; i++) {
    content = content + fs.readFileSync(filesArr[i]) + "\r\n";
}
//console.log(content)
let contentArr = content.split("\r\n");
//console.log(contentArr);

// -s 
let isSPreset = optionsArr.includes("-s");
if (isSPreset == true) {
    for (let i = 1; i < contentArr.length; i++) {
        if (contentArr[i] == "" && contentArr[i - 1] == "") {
            contentArr[i] = null;
        } else if (contentArr[i] == "" && contentArr[i - 1] == null) {
            contentArr[i] = null;
        }
    } 

    let tempArr = [];
    for (let i = 0; i < contentArr.length; i++) {
        if (contentArr[i] != null) {
            tempArr.push(contentArr[i])
        }
    }
    contentArr = tempArr; 
}

// console.log(contentArr.join("\n"));

//-n
let isNPresent = optionsArr.includes("-n");
if (isNPresent == true) {
    for (let i = 0; i < contentArr.length; i++) {
        contentArr[i] = (i + 1) + " " + (contentArr[i]) ;
    }
}
// console.log(contentArr.join("\n"));
//-b
let isBPresent = optionsArr.includes("-b");
if (isBPresent == true) {

    let count = 1
    for (let i = 0; i < contentArr.length; i++) {
        if (contentArr[i] != "") {
            contentArr[i] = (count) + " "  + (contentArr[i]);
            count++;
        }
    }
}
console.log(contentArr.join("\n"));  

