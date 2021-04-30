import '../scss/style.scss';

import hello from '../modules/hello';

window.addEventListener('DOMContentLoaded', ()=>{
    hello();
});
var URL = "http://localhost:3000/"
var request = new XMLHttpRequest();

var getBtn = document.getElementById('GETBUTTON')
var postBtn = document.getElementById('POSTBUTTON')
var putBtn = document.getElementById('PUTBUTTON')
var deleteBtn = document.getElementById('DELETEBUTTON')

getBtn.addEventListener('click', function(){
    getRequest(URL)
})
postBtn.addEventListener('click', function(){
    postRequest(URL, {a: 1})
})
putBtn.addEventListener('click', function(){
    putRequest(URL, {a: 1})
})
deleteBtn.addEventListener('click', function(){
    deleteRequest(URL, {a: 1})
})

function getRequest (URL){
    return new Promise(function (resolve, reject) {
        request.open("GET", URL, true);
        request.addEventListener("load", function () {
          if (request.status < 400) {
            resolve(request.response);
          } else reject(new Error("Request failed: " + request.statusText));
        });
        request.addEventListener("error", function () {
          reject(new Error("Network error"));
        });
        request.send();
    })
}

function postRequest(URL, body) {
    return new Promise(function (resolve, reject) {
        request.open("POST", URL, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function () {
          if (request.status < 400) {
            resolve(request.response);
          } else reject(new Error("Request failed: " + request.statusText));
        });
        request.addEventListener("error", function () {
          reject(new Error("Network error"));
        });
        request.send(JSON.stringify(body));
    })
}

function putRequest(URL, body) {
    return new Promise(function (resolve, reject) {
        request.open("PUT", URL, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function () {
          if (request.status < 400) {
            resolve(request.response);
          } else reject(new Error("Request failed: " + request.statusText));
        });
        request.addEventListener("error", function () {
          reject(new Error("Network error"));
        });
        request.send(JSON.stringify(body));
    })
}

function deleteRequest(URL, body) {
    return new Promise(function (resolve, reject) {
        request.open("DELETE", URL, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function () {
          if (request.status < 400) {
            resolve(request.response);
          } else reject(new Error("Request failed: " + request.statusText));
        });
        request.addEventListener("error", function () {
          reject(new Error("Network error"));
        });
        request.send(JSON.stringify(body));
    })
}