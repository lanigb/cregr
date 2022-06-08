document.getElementById("decl_quit").addEventListener("click", declQuit);
document.getElementById("decl_ok").addEventListener("click", checkDeclAnswer)
document.getElementById("decl").addEventListener("click", chooseDecl);;
document.getElementById("decl_start").addEventListener("click", initDrill);
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
  * shows the question div from the values in
  * global variable decl_question
  * 
  */

function showQuestion(){
    elem =document.getElementById("decl_quizz");
     elem.style.display ="flex";
    //show the translated meaning
     elem =document.getElementById("decl_meaningQuestion");
     elem.style.display ="block";
     elem.innerHTML = decl_question['meaningQuestion'];
     elem =document.getElementById("decl_russianQuestion");
     elem.innerHTML = decl_question['russianQuestion']
     elem =document.getElementById("decl_clearQuestion");
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
    document.getElementById("sub_check").checked = decl_comb_target['sub'];
    document.getElementById("adj_check").checked = decl_comb_target['adj'];
    //document.getElementById("pron_check").checked = decl_comb_target['pron'];
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
    // set the correct  frequency button checked
    button = document.getElementById(freq_target+"_rad");
    button.checked = true ;
    //set the default questions to sub and 
    button = document.getElementById("decl_sub_choice");
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

 /******************************************   
  * 
  *  drill  controlling functions
  * 
  * ****************************************/


 function declQuit(){
    //let msg =" Taux de succès : " + (decl_successNum / decl_trialNum * 100).toString() + "%.";
    //alert(msg);
    let declDiv = document.getElementById("decl_quizz");
    //console.log(declDiv);
    declDiv.style.display="none";
     elem = document.getElementById("decl_success");
    elem.style.backgroundColor = "white";
    elem.innerHTML = "";
    elem = document.getElementById("decl_full_answer");
     elem.innerHTML = ""
    elem = document.getElementById("decl_stat");
    elem.innerHTML ="";

    decl_trialNum = 0.0;

}
/**
 * 
 * @returns a string where all double or more spaces are replaced by simple
 * spaces
 */
function cleanDoubleSpaces(theString){
    result ="";
    if (theString.includes("  ")){
        cleanDoubleSpaces(theString.replace("  "," "));
    } else {
        result = theString;
    }
    return result;
}
/**
 * 
 * @param {} str the string from which a character should be removed
 * @param {*} index the 0 based index of the character
 * @returns  the string without the character
 */
function removeByIndex(str,index) {
    return str.slice(0,index) + str.slice(index+1);
}
function checkDeclAnswer() {
    decl_ans = document.getElementById("decl_answer").value;
    //decl_ans = "бывшей мамой"//debog
    cleanString = cleanDoubleSpaces(decl_ans);
    // remove beginning or trailing space in the answer
    if (cleanString[0]==" "){
        cleanString = removeByIndex(cleanString,0);
    } if (cleanString[cleanString.length -1 ]==" "){
        cleanString = removeByIndex(cleanString,cleanString.length -1);
    }
    //console.log("aa", cleanString);
    const answerList = cleanString.split(" ");
    const questionList = decl_question['answer'].split(" ");
    //const questionList = ("бы́вшей/бы́вшею ма́мой/ма́мою").split(" ");
    console.log("question list", questionList);
    let ansOk = true;
    for (i = 0; i < answerList.length; i++) {
        wordOk = false;
        let word = answerList[i];
        console.log('word', word);
        questionWordList = [];
        console.log("i =", i);
        if (questionList[i].includes("/")){
            questionWordList = questionList[i].split("/");
            console.log("question word list après split",questionWordList);
        } else {
            questionWordList[0] = questionList[i];
            console.log("question word list sans split",questionWordList);
        }

        for (j = 0; j < questionWordList.length; j++) {
            wordOk = wordOk || word == questionWordList[j].replace('\u0301', '');
            console.log("questionword", questionWordList[j].replace('\u0301', ''));
            console.log("wordOk)", wordOk)
        }
        ansOk = ansOk && wordOk;
        console.log("ansOk)", ansOk);
    }
    console.log("answer value", decl_ans);
    if (decl_trialNum == 0.0){
        console.log("decltrial num rest null");
    }
    let msg = "";
    let color = "";
    if (ansOk) {
        decl_successNum++;
        msg = "Bravo !\n";
        color = "yellow";
    } else {
        msg = "C'est une erreur. \n";
        color = "red";
    }
    elem = document.getElementById("decl_success");
    elem.style.backgroundColor = color;
    elem.innerHTML = msg;
    elem = document.getElementById("decl_full_answer");
    msg = "Vous avez répondu " + decl_ans +" pour le "+decl_question['clearQuestion']+".\n";
    elem.innerHTML = msg + " La bonne réponse était " + decl_question['answer'];
    elem = document.getElementById("decl_stat");
    elem.innerHTML = decl_successNum.toString() +"/" + decl_trialNum.toString() + "\n" + ((decl_successNum / decl_trialNum) * 100).toFixed() + "%.";
    /* msg = msg + "La bonne réponse était " + decl_question['answer'];
    console.log("succesNum" , decl_successNum);
    console.log("trialNum" , decl_trialNum);
    console.log("ratio ",(decl_successNum / decl_trialNum)); 
    msg = msg + ".\n Taux de succès : " + ((decl_successNum / decl_trialNum) * 100).toFixed() + "%.";
    alert(msg); */
    decl_trialNum +=1 ;
    runDrill();

}


 
/**
 * 
 *  @returns nothing but update global variable decl_question 
  * with correct answer
 */
async function makeAnswer() {
    const fs = require("fs");
    const sqlite = require("aa-sqlite");
    // directory path
    const dir = __dirname;
    myPath = dir + "/cregr_db.db";
    console.log("myPath", myPath);
    await sqlite.open(myPath);
    sql = "";
    if (decl_unique_target.length == 0 ){
        if (decl_question['sub']) {
        // find answer for substantive
        //build case identification
        console.log("decl_question avant remonse", decl_question);
        sql = "SELECT english FROM cas_usuels WHERE abrev ='" + decl_question['case'] + "'";
        console.log(' sql english', sql);
        r = await sqlite.get(sql);
        caseDen = r.english;
        console.log("caseDen", caseDen)
        sql = "SELECT english FROM vocabulaire_grammatical WHERE abrev ='" + decl_question['num'] + "'";
        r = await sqlite.get(sql);
        caseDen = caseDen + "_" + r.english;
        console.log("caseDen", caseDen);
        // get the form
        sql = "SELECT " + caseDen + " FROM substantives WHERE sub_id='" + decl_question['sub'] + "'";
        console.log("sub answer ", sql);
        r = await sqlite.get(sql);
        decl_question['answer'] = r[caseDen];
        console.log('anwer :', decl_question['answer']);
    }
    if (decl_question['adj']) {
        // find answer for adjec
        //build case identification
        console.log("decl_question avant remonse", decl_question);
        gender = decl_question['gender']
        if (!decl_question['sub'] && decl_question['num']=='plur'){
            gender = 'plur'
        }
        console.log(' gender', gender);
        sql = "SELECT english FROM vocabulaire_grammatical WHERE abrev ='" + gender + "'";
        console.log(' sql english', sql);
        r = await sqlite.get(sql);
        caseDen = r.english;
        console.log("caseDen", caseDen)
        sql = "SELECT english FROM cas_usuels WHERE abrev ='" + decl_question['case'] + "'";
        r = await sqlite.get(sql);
        caseDen = caseDen + "_" + r.english;
        if (decl_question['case']=='acc'){
            caseDen = caseDen + "_"+decl_question['anim'];
        }
        console.log("caseDen", caseDen);
        // get the form
        sql = "SELECT " + caseDen + " FROM adjectives WHERE adj_id='" + decl_question['adj'] + "'";
        console.log("adj answer ", sql);
        r = await sqlite.get(sql);
        decl_question['answer'] = r[caseDen] + " " + decl_question['answer'];
        console.log('anwer :', decl_question['answer']);
    }
} else {
    //on supose à ce stade que les cas sont organisés comme ceux des pronoms personnels
    sql = "SELECT english FROM cas_usuels WHERE abrev ='" + decl_question['case'] + "'";
    console.log(' sql english', sql);
    r = await sqlite.get(sql);
    caseDen = r.english;
    switch (decl_question['uniqueType']){
        case 0 :
            // pronom personnel 
            sql = "SELECT " + caseDen + " FROM personal_pronouns WHERE id='" + decl_question['uniqueId']+ "'";
            console.log("choix reponse pronom", sql);
            r = await sqlite.get(sql);
            decl_question['answer'] = r[caseDen] + " " + decl_question['answer'];
            console.log('anwer :', decl_question['answer']);
            break;
        default:
            console.log( "ne devrait pas venir  reponse pronom");
    }

}

 }
 /**
  * 
  *  @returns nothing but update global variable decl_question 
  * with russian words
  * 
  */
async function makeQuestions(){
    const fs = require("fs")
    const sqlite = require("aa-sqlite")
     // directory path
     const dir = __dirname; 
     myPath= dir+"/cregr_db.db";
     console.log ("myPath",myPath);
     await sqlite.open(myPath);
    russianQes = "";
    sql ="";
    if (decl_question['adj']){
        sql= "SELECT form, french FROM main_table WHERE id ='"+decl_question['adj']+"'";
        console.log('sql adj question',sql)
        r = await sqlite.get(sql);
        console.log('sql adj question',sql)
        console.log(" adj choisi", r)
        decl_question['russianQuestion']  = r.form + " ";
        decl_question['meaningQuestion']  = r.french + " ";
    }
    if (decl_question['sub']){
        console.log('sql adj question',sql)
        sql= "SELECT form, french FROM main_table WHERE id ='"+decl_question['sub']+"'";
        r = await sqlite.get(sql);
        console.log('sql sub question',sql)
        //console.log(" adj choisi", r)
        decl_question['russianQuestion']  = decl_question['russianQuestion'] + " " + r.form ;
        decl_question['meaningQuestion']  = decl_question['meaningQuestion']+ " " + r.french ;
    }
    if (decl_question['uniqueType']){
        //pronom personnel
        sql =" SELECT nominative,french FROM personal_pronouns WHERE id='"+decl_question["uniqueId"]+"'";
        r = await sqlite.get(sql);
        console.log('sql sub question',sql)
        decl_question['meaningQuestion'] = r.french ;
    }
    // make grammar question 
        // find  the appelation of the case
        console.log("make grammar question");
        sql = "SELECT french, english FROM cas_usuels WHERE abrev ='" + decl_question['case'] + "'"
        console.log('req : ', sql)
        r = await sqlite.get(sql)
        decl_question['clearQuestion'] = r.french;
        //decl_question['case'] = r.english;

    if (decl_question['sub']) {
        sql = "SELECT french FROM vocabulaire_grammatical WHERE abrev = '" + decl_question['num'] + "'";
        r = await sqlite.get(sql);
        if (decl_question['num']== 'plur'){
            decl_question['gender']='plur';
        }
        decl_question['clearQuestion'] = decl_question['clearQuestion'] + " " + r.french;
        gendQuestion = "";
        console.log("choosen pos", decl_comb_target);
        console.log("valeur de sub", decl_comb_target["sub"]);
    } else if ( decl_question['uniqueType'] != ""){
        console.log(" valeur de decl_question", decl_question);
        console.log("adjec gramma question", decl_question);
        //sql= ""SELECT french, english FROM cas_usuels WHERE abrev ='" + decl_question['case'] + "'"
        sql = "SELECT french FROM vocabulaire_grammatical WHERE abrev = '" + decl_question['gender'] + "'";
        r = await sqlite.get(sql);
        decl_question['clearQuestion'] = decl_question['clearQuestion'] +" "+ r.french;
        if (decl_question["case"]== 'acc'){
            sql = "SELECT french FROM vocabulaire_grammatical where abrev ='"+decl_question["anim"]+"'";
            r = await sqlite.get(sql);
            decl_question["clearQuestion"] = decl_question["clearQuestion"] +" "+ r.french;
        } 
        console.log("choosen pos", decl_comb_target);
        console.log("valeur de sub", decl_comb_target["sub"]);
    }
    console.log("valeur de decl_question", decl_question);
    if (decl_unique_target.length >0) {
        console.log("avant choose unique question");
        chooseUniqueQuestion();
    }
    
}     


async function choosePersonalPronoun() {
    const fs = require("fs")
    const sqlite = require("aa-sqlite")
    // directory path
    const dir = __dirname;
    myPath = dir + "/cregr_db.db";
    console.log("myPath", myPath);
    await sqlite.open(myPath);
    sql = "SELECT french FROM personal_pronouns where id='" + decl_question['uniqueId'] + "'";
    r = await sqlite.get(sql);
    console.log("pronom", r.french);
    decl_question['clearQuestion'] = r.french + " " + decl_question['clearQuestion'];
}
/**
 * 
 * @returns rien mais met apple des fonction qui mettent à jour la 
 * variable globale decl_question
 */
function chooseUniqueQuestion(){
    switch (decl_question['uniqueType']){
        case 0:
            choosePersonalPronoun();
            break ;
        default:
            console.log("ne devrait pas arriver dans le default de chooseUniqueQuestion");
    }
}


/** 
 * 
 * @returns nothing but update global variable decl_question 
 *  with  parameters not yet fixed
 * 
 */


/**
 * 
 * @returns nothing but update global variable decl_question 
 *  with adjective choosen in the correct frequency range
 * 
 */
async function chooseAdjective(){
    const fs = require("fs")
    const sqlite = require("aa-sqlite")
    // directory path
    const dir = __dirname; 
    myPath= dir+"/cregr_db.db";
    console.log ("myPath",myPath);
    await sqlite.open(myPath);
    // select all the word id whose whose sub_id is < to limit
    req ="SELECT id FROM adjectives WHERE adj_id < "+ adj_freq_indices[freq_target];
    console.log(req);
    r = await sqlite.all(req, [])
    let vocaId = []
    r.forEach(function(row) {
        vocaId.push(row.id);
        //console.log("Read:", row.id, row.sub_id, row.nominative_singular)    
    });
    //take a id in  the list 
    id = vocaId[Math.floor(Math.random()* vocaId.length)];
    req = "select *FROM adjectives WHERE id = '"+ id +"'";
    r = await sqlite.get(req);
    console.log(" adj choisi", r)
    decl_question['adj']  = r.adj_id;
    console.log(" dec_question",decl_question);
}

/**
 * 
 * 
 * * @returns nothing but update global variable decl_question 
 *  with unique word
 * 
 */
async function chooseUniquePos(){
    console.log("decl_question avant chooseUnique pos", decl_question);
    index = Math.floor(Math.random()* decl_unique_target.length);
    decl_question["uniqueType"] = index;
    switch (index){
        case 0 :
            //pronon personnel 
            choice = Math.floor(Math.random()*7)+1;
            decl_question["uniqueId"] = choice;
            break;
        default :
        console.log("Ne devrait pas arriver ici dans chooseUniquePost")

    console.log("decl_question après chooseUnique pos", decl_question);
    }
}
/**
 * 
 * @returns nothing but update global variable decl_question 
 *  with substantive choosen in the correct frequency range
 */
async function chooseSubstantive() {
    
    const fs = require("fs");
    const sqlite = require("aa-sqlite");
    // directory path
    const dir = __dirname; 
    myPath= dir+"/cregr_db.db";
    console.log ("myPath",myPath);
    await sqlite.open(myPath);
    // select all the word id whose whose sub_id is < to limit
    req ="SELECT id FROM substantives WHERE sub_id < "+ sub_freq_indices[freq_target];
    console.log(req);
    r = await sqlite.all(req, [])
    let vocaId = []
    r.forEach(function(row) {
        vocaId.push(row.id);
        //console.log("Read:", row.id, row.sub_id, row.nominative_singular)    
    });
    //take a id in  the list 
    id = vocaId[Math.floor(Math.random()* vocaId.length)];
    req = "select *FROM substantives WHERE id = '"+ id +"'";
    console.log("nom choisi ;",vocaId.length );
    r = await sqlite.get(req);
    console.log(" sub chosis", r)
    if (r.type == 'inanimate') {
        decl_question['anim'] = 'inan';
    } else {
        decl_question['anim'] = 'anim';
    }
    console.log('switch', r.gender)
    switch(r.gender){
        case 'feminine':
            decl_question['gender']='fem';
            console.log('fem)');
            break;
        case 'masculine': 
            decl_question['gender']='masc';
            console.log('masc');
            break;
        default:
            decl_question['gender']='neut';
            console.log('neut');
    }
    decl_question['sub']  = r.sub_id;
    console.log(" dec_question",decl_question);


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
     if (document.getElementById("decl_sub_choice").checked) {
         for ([key, val] of Object.entries(decl_comb_target)) {
             chain = key + "_check";
             //console.log("chain = ", chain);
             posOK = posOK || document.getElementById(key + "_check").checked;
             console.log("posOK", posOK);
         }
     } else {
        posOK =document.getElementById("decl_pronounperso_check").checked

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
    result = posOK && caseOK && numOK;
    if (!(result)) {
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
 * @returns rien mais modifie les valeur de la variable globale decl_comb_target
 */
function retrieveCombinedPos(){ 
    //choosen = {sub : false, adj: false, pron : false};
    for ([key, val] of Object.entries(decl_comb_target)) {
        chain = key + "_check";
        console.log("chain = ", chain);
        if (document.getElementById(key + "_check").checked){
            decl_comb_target[key] = true;
            //console.log(decl_comb_target[key]);
        } else{
            decl_comb_target[key] = false;
        }
    }
    decl_unique_target = [];
    console.log("choosen pos", decl_comb_target);
}
/**
 * 
 *  @returns rien mais modifie les valeur de la variable globale pos_targ
 */

function retrieveUniquePos(){
    for(i=0 ;i<decl_uniquePosType.length; i++ ){
        console.log (" unique ","decl_"+decl_uniquePosType[i]+"_check" );
        elem = document.getElementById("decl_"+decl_uniquePosType[i]+"_check");
        if (elem.checked){
            decl_unique_target.push(decl_uniquePosType[i]);
        }
    }
    decl_comb_target["sub"] = false;
    decl_comb_target["adj"] = false;
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
    abrev = "";
     //decl_question['uniqueType'] == 1 is for pronouns, no choice plu/sing
     if (!decl_question['uniqueType'] == 1) {
        caseIdx= Math.floor(Math.random()*adj_gender_list.length);
        abrev = adj_gender_list[caseIdx];
        console.log("adj gender =",abrev);
     }
    return abrev;
}
/**
 * 
 *  @returns l'abbreviation du nombre choisi pour la question
 */
function getNumQuestion() {
    abrev == "";
    //decl_question['uniqueType'] == 1 is for pronouns, no choice plu/sing
    if (!decl_question['uniqueType'] == 1) {
        choosenNum = retrieveNum();
        caseIdx = Math.floor(Math.random() * choosenNum.length);
        abrev = choosenNum[caseIdx];
        console.log("num abrev =", abrev);
    }
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
        choosenCases = retrieveCases();
        if (document.getElementById("decl_sub_choice").checked){
            choosenPos = retrieveCombinedPos();
        } else {
            retrieveUniquePos();
        }
        choosenNum = retrieveNum();
        runDrill();
        var decl_run = true ;
        decl_trialNum = 1.0;
        decl_successNum = 0;
    }
}
async function runDrill() {
    for ([key, val] of Object.entries(decl_question)) {
        decl_question[key] = "";
    }
    document.getElementById("decl_answer").value="";
    //console.log('decl_question cleaned',decl_question )
    decl_question['case'] = getCaseQuestion();
    //console.log('decl_question avec case',decl_question )
    decl_question['num'] = getNumQuestion();
    //console.log('decl_question avec num',decl_question )
    //genderAbrev = getGenderForAdjOnly();
    //decl_question[cas]= caseAbrev;
    //decl_question[num] = numAbrev;

    // start to query db
    updateFrequency();
    //chose the words
    if (decl_comb_target['sub']) {
        console.log("call choose substantive");
        await chooseSubstantive();
    }
    if (!decl_comb_target["sub"]) {
        decl_question['gender'] = getGenderForAdjOnly();
        if (decl_question['case'] == 'acc') {
            // choix de animé
            decl_question['anim'] = getAnimQuestion();
            console.log(" choix animimé ");
        } else {
            console.log("pas de choix de animé ", decl_comb_target['sub'], decl_question['cas']);
        }
    }
    if (decl_comb_target['adj']) {
        console.log("call choose adjective");
        await chooseAdjective();

    }
    if (decl_unique_target.length >0){
        chooseUniquePos();
    }

    await makeQuestions();
    await makeAnswer();
    document.getElementById('decl_quizz').style.display = "block";
    showQuestion();
    //caseText.innerHTML = await getCase(sqlite)
}

var decl_comb_target = {
    sub : true,
    adj :false
}
var decl_unique_target =[];



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
var adj_gender_list = ["masc", "fem", "neut","plur"]




var freq_target = "most";
var choosenCases = [];
var choosenPos = {sub : false, adj: false, pron : false};
var choosenUniquePos =[];
var choosenNum = [];
var decl_trialNum = 0.0;
var decl_successNum = 0.0;
var decl_question = {
 case : "",
 num : "",
 gender : "",
 anim : "",
 clearQuestion : "",
 russianQuestion : "",
 meaningQuestion: "",
 sub : "",
 adj : "",
 uniqueType :"",
 uniqueId : "",
 answer :""
};

const sub_freq_indices ={
    most : "434",
    med : "1481",
    all : "10000"
};
const adj_freq_indices = {
    most: "883",
    med: "3753",
    all : "10000"
}

const decl_uniquePosType = ["pronounperso"];
