document.getElementById("start").addEventListener("click", initDrill);
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

 /**
  * 
  * shows the question div
  * 
  */
function showQuestion(){
     elem =document.getElementById("decl_quizz");
     elem.style.display ="block";
     elem.innerHTML = decl_question['clearQuestion'];
 }
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

/**
 * 
 * @returns a substantive choosen in the correct frequency range
 */
async function chooseSubstantive() {
    
    const fs = require("fs")
    const sqlite = require("aa-sqlite")
    await sqlite.open('cregr_db.db');
    // select all the word id whose whose sub_id is < to limit
    req ="SELECT id FROM substantives WHERE sub_id < "+ sub_freq_indices[freq_target];
    console.log(req);
    r = await sqlite.all(req, [])
    let vocaId = []
    r.forEach(function(row) {
        vocaId.push(row.id);
        //console.log("Read:", row.id, row.sub_id, row.nominative_singular)    
    });
    console.log("nombre de noms ;",vocaId.length )
    return "";

}

 /**
  * 
  * 
  * @returns rien mais met à jour la variable globale freq_target
  */
function readFrequency(value){
    if (document.getElementById(value+"_rad").checked){
        freq_target= value ;
        console.log ("freq target", freq_target);
    }
}
 /**
  * 
  *  @returns rien mais appelle la fonction readFrequency
  * 

  */
 function updateFrequency(){
     but = ['most','med','all'];
     but.forEach(readFrequency);
 }




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
 * @returns rien mais modifie les valeur de la variable globale pos_target
 */
function retrievePos(){ 
    //choosen = {sub : false, adj: false, pron : false};
    for ([key, val] of Object.entries(pos_target)) {
        chain = key + "_check";
        console.log("chain = ", chain);
        if (document.getElementById(key + "_check").checked){
            pos_target[key] = true;
            //console.log(pos_target[key]);
        } else{
            pos_target[key] = false;
        }
    }
    console.log("choosen pos", pos_target);
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
            count++;
        } 
    }    
    console.log("choosen cases", choosen);
    return choosen;
}
/**
 * 
 * @returns random choice of animate or inanimate 
 */
function getAnimQuestion(){
    animS = 'inam';
    if (Math.random() >0.5){
        animS ='anim';
    }
    return animS;
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
    choosenNum = retrieveNum();
    caseIdx= Math.floor(Math.random()*choosenNum.length);
    abrev = choosenNum[caseIdx];
    console.log("num abrev =",abrev);
    return abrev;
}/**
 * 
 *  @returns l'abbreviation du cas choisi pour la question
 */
function getCaseQuestion(){
    choosenCases = retrieveCases();
    caseIdx= Math.floor(Math.random()*choosenCases.length);
    console.log("choosen case lenght ", choosenCases.length);
    console.log("choosen case", choosenCases)
    console.log("caseIdx  ", caseIdx)
    abrev = choosenCases[caseIdx];
    console.log("case abrev =",abrev);
    return abrev;
}
 function initDrill(){
    // first check whether all params  have at least one check
    if (paramOK()) {
        //choosenCases = retrieveCases();
        choosenPos = retrievePos();
        //choosenNum = retrieveNum();
        caseAbrev = getCaseQuestion();
        numAbrev = getNumQuestion();
        genderAbrev = getGenderForAdjOnly();
        //decl_question[cas]= caseAbrev;
        decl_question[num] = numAbrev;
        runDrill();
    }
}
async function runDrill(){
    // start to query db
    const fs = require("fs")
    const sqlite = require("aa-sqlite")
    await sqlite.open('cregr_db.db');
    // find  the appelation of the case
    let req = "SELECT french FROM cas_usuels WHERE abrev ='" + caseAbrev + "'"
    console.log('req : ', req)

    r = await sqlite.get(req)
    gramQuestion = r.french;
    req = "SELECT french FROM vocabulaire_grammatical WHERE abrev = '" + numAbrev + "'";
    r = await sqlite.get(req);
    gramQuestion = gramQuestion + " " + r.french;
    gendQuestion = "";
    console.log("choosen pos", pos_target);
    console.log("valeur de sub", pos_target["sub"]);
    if (!pos_target["sub"] && caseAbrev == 'acc') {
        // choix de animé
        animQ = getAnimQuestion();
        decl_question['anim'] = animQ;
        console.log("anim ", animQ);
        req = " SELECT french FROM vocabulaire_grammatical WHERE abrev = '" + animQ + "'";
        r = await sqlite.get(req);
        gramQuestion = gramQuestion + " " + r.french;
    }
    
    decl_question["clearQuestion"] = gramQuestion;
    updateFrequency();
    //chose the words
    if (pos_target['sub']){
        decl_question['sub'] = chooseSubstantive();
    }
    showQuestion();
    //caseText.innerHTML = await getCase(sqlite)
}

var pos_target ={
    sub : true,
    adj :false,
    pron : false
};

var decl_cases =['nom','gen','acc','dat','inst','prep'];

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
var choosenPos = {sub : false, adj: false, pron : false};
var choosenNum = [];

var decl_question = {
 case : "",
 num : "",
 isAnim :"",
 clearQuestion : "",
 sub : "",
 adj_: "",
 pron :"",
 answer :""
};

const sub_freq_indices ={
    most : "434",
    med : "1481",
    all : "10000"
};
const adj_freq_indices = {
    most: 883,
    med: 3753
}