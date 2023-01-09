/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL = '/api/irl';
var jpdbIML = '/api/iml';
var stuDBName = 'STU-DB';
var stuRelationName = 'StuData';
var connToken = "90932463|-31949270127611310|90955763";

$('#Rollno').focus();



function saveRecNo2LS(jsonobj){
    var lvData = JSON.parse(jsonobj.data);
    localStorage.setItem('recno',lvData.rec_no);
    
}
function getRollNOAsJsonObj(){
    var rollno = $('#Rollno').val();
    var jsonStr = {
        id: Rollno
    };
    return JSON.Stringify(jsonStr);
}

function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;   
    $('#Fullname').val(record.name);
    $('#Class').val(record.class);
    $('#Birthdate').val(record.birthdate);
    $('#Address').val(record.address);
    $('#EnrollmentDate').val(record.enrolldate);
    
}

function resetForm(){
    $('#RollNo').val("");
    $('#FullName').val("");
    $('#Class').val("");
    $('#Birthdate').val("");
    $('#Address').val("");
    $('#EnrollmentDate').val("");
    $('#RollNo').prop("disabled",false);
    $('#save').prop("disabled",true);
    $('#change').prop("disabled",true);
    $('#reset').prop("disabled",true);
    $('#RollNo').focus();
    
    
}
function validateData(){
    var Rollno, Fullname, Class, Birthdate, Address, EnrollmentDate;
    Rollno = $('#Rollno').val();
    Fullname = $('#Fullname').val();
    Class = $('#Class').val();
    Birthdate = $('#Birthdate').val;
    Address = $('#Address').val;
    EnrollmentDate = $('#EnrollmentDate').val();
    
    if (Rollno === ''){
        alert ('Roll no is missing');
        $('#Rollno').focus();
        return "";
        
    if (Fullname === ''){
        alert ('Name is missing');
        $('#Fullname').focus();
        return "";
    
    if (Class === ''){
        alert ('Class is missing');
        $('#Class').focus();
        return "";
        
    if (Birthdate === ''){
        alert ('Brithdate no is missing');
        $('#Brithdate').focus();
        return "";
        
    if (Address === ''){
        alert ('Address no is missing');
        $('#Address').focus();
        return "";
        
    if (EnrollmentDate === ''){
        alert (' EnrollmentDate no is missing');
        $('#EnrollmentDate').focus();
        return "";    
    }
        
}



function getRollno(){
    var RollnoJsonObj = getRollnoAsJosnObj();
    var getRequest = createGET_BY_KEYRequest(connToken, stuDBName, stuRelationName, RollnoJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.ststus === 400) {
        $('#save').prop("disabled",false);
        $('#reset').prop("disabled",false);
        $('#Rollno').focus();
    } else if (resJsonObj.ststus === 200){
        $('#RollNo').prop("disabled",true);
        fillData(resJsonObj);
        
        
        $('#change').prop("disabled",false);
        $('#reset').prop("disabled",false);
        $('#Rollno').focus();
        
    }
}



function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return "";
    }
    var putReqStr = createPUTRequest(connToken, jsonStrObj, stuDBName, stuRelationName);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr,jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $('#Rollno').focus();
}




function changeData(){
    $('#chagne').prop("disabled" , true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, stuDBName, stuRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $('#Rollno').focus();
}






