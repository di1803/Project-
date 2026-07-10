let numbers=[];

async function loadData(){

try{

document.getElementById("message").innerHTML="Loading...";

const response=await fetch("https://dummyjson.com/products?limit=10");

const data=await response.json();

// Take first 10 product stock values
numbers=data.products.map(item=>item.stock);

drawBars();

document.getElementById("message").innerHTML="Data Loaded";

}catch(error){

document.getElementById("message").innerHTML="API Error";

console.log(error);

}

}

function drawBars(){

const container=document.getElementById("bars");

container.innerHTML="";

numbers.forEach(value=>{

const bar=document.createElement("div");

bar.className="bar";

bar.style.height=value*2+"px";

bar.innerHTML=value;

container.appendChild(bar);

});

}

function sleep(ms){
return new Promise(resolve=>setTimeout(resolve,300));
}

async function bubbleSort(){

try{

for(let i=0;i<numbers.length;i++){

for(let j=0;j<numbers.length-i-1;j++){

if(numbers[j]>numbers[j+1]){

let temp=numbers[j];

numbers[j]=numbers[j+1];

numbers[j+1]=temp;

drawBars();

await sleep(400);

}

}

}

document.getElementById("message").innerHTML="Sorting Completed";

await sendResult();

}catch(error){

document.getElementById("message").innerHTML="Sorting Failed";

console.log(error);

}

}

async function sendResult(){

try{

const response=await fetch("https://jsonplaceholder.typicode.com/posts",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

status:"Success",

sortedArray:numbers

})

});

const result=await response.json();

console.log(result);

}catch(error){

console.log("POST Failed",error);

}

}