import '../scss/style.scss';

import hello from '../modules/hello';

window.addEventListener('DOMContentLoaded', ()=>{
    hello();
});
var URL = "http://localhost:8080/"
var request = new XMLHttpRequest();

var getBtn = document.getElementById('GETBUTTON')
var postBtn = document.getElementById('POSTBUTTON')
var putBtn = document.getElementById('PUTBUTTON')
var deleteBtn = document.getElementById('DELETEBUTTON')

getBtn.addEventListener('click', function(){
    getRequest(URL)
})
postBtn.addEventListener('click', function(){
    postRequest(URL)
})
putBtn.addEventListener('click', function(){
    putRequest(URL)
})
deleteBtn.addEventListener('click', function(){
    deleteRequest(URL)
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

function postRequest(URL) {
    return new Promise(function (resolve, reject) {
        request.open("POST", URL, true);
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

function putRequest(URL) {
    return new Promise(function (resolve, reject) {
        request.open("PUT", URL, true);
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

function deleteRequest(URL) {
    return new Promise(function (resolve, reject) {
        request.open("DELETE", URL, true);
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