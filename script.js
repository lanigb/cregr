document.getElementById("start").addEventListener("click", startDrill);
document.getElementById("decl").addEventListener("click", chooseDecl);
document.getElementById("conj").addEventListener("click", chooseConj);
document.getElementById("pos_button").addEventListener("click", togglePos);
document.getElementById("case_button").addEventListener("click", toggleCase);
document.getElementById("num_button").addEventListener("click", toggleNum);
document.getElementById("freq_button").addEventListener("click", toggleFreq);


function toggleFreq(){
    let myDiv = document.getElementById("freq");
    if (myDiv.style.display == "block"){
        myDiv.style.display = "none";
    } else {
        myDiv.style.display = "block"
    }
}
function toggleNum(){
    let myDiv = document.getElementById("num");
    if (myDiv.style.display == "block"){
        myDiv.style.display = "none";
    } else {
        myDiv.style.display = "block"
    }
}
function toggleCase(){
    let myDiv = document.getElementById("case");
    if (myDiv.style.display == "block"){
        myDiv.style.display = "none";
    } else {
        myDiv.style.display = "block"
    }
}

function togglePos(){
    let myDiv = document.getElementById("pos");
    if (myDiv.style.display == "block"){
        myDiv.style.display = "none";
    } else {
        myDiv.style.display = "block"
    }
}

function chooseDecl(){
    document.getElementById("decl_param").style.display="block";
    console.log("declDiv in chooseDecl",declDivb);
    }
function chooseConj(){
    let declDiv = document.getElementById("decl_param");
    console.log(declDiv);
    declDiv.style.display="none";
    console.log("declDiv in chooseConj",declDiv); 
       //getElementById("conj").declDiv.style.display="none";
}
async function getCase(db){
    let case_id = Math.floor(Math.random()*6)+1;
    let lang = 'french';
    let req = " SELECT " + lang+ " FROM cas_usuels where id = "+ case_id;
    console.log(req);
    r = await db.get(req);
    cas = r.french;   
    num = " singulier";
    if (Math.random() >0.5){
        num =  " pluriel";
    }
    result = cas + num;
    return result;
}

async function startDrill(){
    const fs = require("fs")
    const sqlite = require("aa-sqlite")
    await sqlite.open('cregr_db.db');
    let caseText = document.getElementById("case");
    caseText.innerHTML = await getCase(sqlite)
    }
