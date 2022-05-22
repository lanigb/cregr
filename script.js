document.getElementById("start").addEventListener("click", startDrill);
document.getElementById("decl").addEventListener("click", chooseDecl);
document.getElementById("conj").addEventListener("click", chooseConj);
document.getElementById("pos_button").addEventListener("click", togglePos);
document.getElementById("case_button").addEventListener("click", toggleCase);
document.getElementById("num_button").addEventListener("click", toggleNum);
document.getElementById("freq_button").addEventListener("click", toggleFreq);

 /******************************************   
  * 
  * GUI update functions
  * 
  * ****************************************/
function toggleFreq(){
    let myDiv = document.getElementById("freq");
    if (myDiv.style.display == "block"){
        myDiv.style.display = "none";
    } else {
        myDiv.style.display = "block"
    }
}
function toggleNum(){
    //show the div
    let myDiv = document.getElementById("num");
    if (myDiv.style.display == "block"){
        myDiv.style.display = "none";
    } else {
        myDiv.style.display = "block"
    }
}
function toggleCase(){
    // show the div 
    let myDiv = document.getElementById("case");
    if (myDiv.style.display == "block"){
        myDiv.style.display = "none";
    } else {
        myDiv.style.display = "block"
    }
}

function togglePos(){
        // show the div 
    let myDiv = document.getElementById("pos");
    if (myDiv.style.display == "block"){
        myDiv.style.display = "none";
    } else {
        myDiv.style.display = "block"
    }
}

function chooseDecl(){
    // init the param chekboxes with correct values
//set the checked state at correct values 
    document.getElementById("sub_check").checked = pos_target['sub'];
    document.getElementById("adj_check").checked = pos_target['adj'];
    document.getElementById("pron_check").checked = pos_target['pron'];
    // set the checked state at correct values
    for([key, val] of Object.entries(decl_target)) {
        button = document.getElementById(key+"_check");
        console.log(key+"_check");
        button.checked = val;
        //console.log(key, val);
      }
    //set the checked stat at correct values
    for([key, val] of Object.entries(number_target)) {
        button = document.getElementById(key+"_check");
        button.checked = val;
        //console.log(key, val);
      }
    // set the correct button checked
    button = document.getElementById(freq_target+"_rad");
    button.checked = true ;


    document.getElementById("decl_param").style.display="block";
    //console.log("declDiv in chooseDecl",declDiv);
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

 /******************************************   
  * 
  *  drill  controlling functions
  * 
  * ****************************************/
function paramOK() {
    // check pos
    result= true;
    posOK = false;
    for ([key, val] of Object.entries(pos_target)) {
        chain = key + "_check";
        //console.log("chain = ", chain);
        posOK = posOK || document.getElementById(key + "_check").checked;
        console.log("posOK", posOK);
    }
    // check cases
    caseOK = false;
    for ([key, val] of Object.entries(decl_target)) {
        caseOK = caseOK || document.getElementById(key + "_check").checked;
        console.log("caseOK", caseOK);
    }
    //check num
    numOK = false;
    
    for ([key, val] of Object.entries(number_target)) {
        numOK = numOK || document.getElementById(key + "_check").checked;
        console.log("numOK", numOK);
    }
    if (!(posOK && caseOK && numOK)) {
        allready = false;
        begin = '';
        alertStr = "Attention : il faut cocher au moins une case pour "
        if (!posOK) {
            alertStr = alertStr + "le type de mot ";
            begin = ', '
        }
        if(! caseOK){
            alertStr = alertStr + begin + "le cas";
        }

        if (!numOK) {
            if (begin == ', ') {
                begin = ' et ';
            }
            alertStr = alertStr + begin + "le nombre";
        }
    alertStr = alertStr + '.';
    alert(alertStr);
    }
    return result;
}

/**
 * 
 * @returns les types grammaticaux choisis dans une liste
 */
function retrievePos(){ 
    choosen = [] ;
    count = 0;
    for ([key, val] of Object.entries(pos_target)) {
        //console.log("chain = ", chain);
        if (document.getElementById(key + "_check").checked){
            choosen[count] = key;
            count++ ;
        }
    }
    console.log("choosen ps", choosen);
    return choosen
}
/**
 * 
 * @returns les nombres choisis dans une liste
 */
function retrieveNum(){
    choosen = [] ;
    count = 0;
    for ([key, val] of Object.entries(number_target)) {
        if (document.getElementById(key + "_check").checked){
            choosen[count] = key;
            count++ ;
        }
    }    
    console.log("choosen num", choosen);
    return choosen;
}

/**
 * 
 * @returns les cas choisis dans une liste
 */
function retrieveCases(){
    choosen = [] ;
    count = 0;
    for ([key, val] of Object.entries(decl_target)) {
        if (document.getElementById(key + "_check").checked){
            choosen[count] = key;
            count++ ;
        }
    }    
    console.log("choosen cases", choosen);
    return choosen;
}
/**
 * 
 *  @returns l'abbreviation du genre choisi pour la question
 *  si c'est un adjectif seul
 */
function getGenderForAdjOnly(){
    caseIdx= Math.floor(Math.random()*adj_gender_list.length);
    abrev = adj_gender_list[caseIdx];
    console.log("adj gender =",abrev);
    return abrev;
}
/**
 * 
 *  @returns l'abbreviation du nombre choisi pour la question
 */
function getNumQuestion(){
    caseIdx= Math.floor(Math.random()*choosenNum.length);
    abrev = choosenNum[caseIdx];
    console.log("num abrev =",abrev);
    return abrev;
}/**
 * 
 *  @returns l'abbreviation du cas choisi pour la question
 */
function getCaseQuestion(){
    caseIdx= Math.floor(Math.random()*choosenCases.length);
    console.log("choosen case", choosenCases)
    abrev = choosenCases[caseIdx];
    console.log("case abrev =",abrev);
    return abrev;
}
async function startDrill(){
    // first check whether all params  have at least one check
    if (paramOK()) {
        choosenCases = retrieveCases();
        choosenPos = retrievePos();
        choosenNum = retrieveNum();
        caseAbrev = getCaseQuestion();
        numAbrev = getNumQuestion();
        genderAbrev = getGenderForAdjOnly();
        const fs = require("fs")
        const sqlite = require("aa-sqlite")
        await sqlite.open('cregr_db.db');
        let caseText = document.getElementById("case");
        //caseText.innerHTML = await getCase(sqlite)
    }
}
var pos_target ={
    sub : true,
    adj :false,
    pron : false
};


var decl_target = {
    nom : true,
    gen : true,
    acc : true,
    dat : true,
    inst : true,
    prep : true
};
var number_target = {
    sing : true,
    plur : true
}
var adj_gender_list = ["masc", "fem", "neut","plu"]
var freq_target = "most";
var choosenCases = [];
var choosenPos = [];
var choosenNum = [];
