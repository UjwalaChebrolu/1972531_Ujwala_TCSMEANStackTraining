let r1 = require("readline-sync");
let fs = require("fs");
let obj = require("./logfunc");
debugger;

let emp = new obj.Employee(r1.question("Enter First Name: "), r1.question("Enter Last Name: "), r1.question("Enter Email ID: "), Date());
debugger;
console.log("\nFirst name is: " + emp.fname + "\nLast name is: " + emp.lname 
+ "\nEmail is " + emp.email, "\nDate is " + emp.date)

var empString = JSON.stringify(emp);
fs.writeFile("record.json", empString, {flag:"a"}, (err)=>{
    if(!err){
        debugger;
        console.log("data stored successfully")
    }
})