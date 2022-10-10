"use strict";

function start(){
    var d = new Date();
    var ds = d.toDateString();
    var ts = d.toTimeString();

    document.querySelector("#output1").innerHTML = ts;
    document.querySelector("#output2").innerHTML = ds;

    setTimeout(start,500);
}