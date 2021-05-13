
if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").then(
        registration => {
            console.log("SW registered");
            console.log(registration);
        }
    ).catch(error => {
        console.log("SW failed");
    })
}


let chngeicn=0;
const overlay = document.querySelector(".ovelay2");
let isMenuOpened = false;

let saveTitle="";

let num1 = 0;
function popupmenu() {
    let rotater = document.querySelector(".menubtn-bar");
    let cross = document.querySelector(".bar");
    let menu = document.querySelector(".menuitems");
    let overlay = document.querySelector(".nextoverlay");
    let icon = document.getElementById('changeclas');

    cross.classList.toggle("active");
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
    rotater.classList.toggle("active");
    if(num1==0){
        icon.className='fas fa-times';
        num1=1;
    }
    else if(num1==1){
        icon.className='fas fa-ellipsis-v';
        num1=0;
    }
    
}







let celldata = document.getElementById("allcell");

function addval(){

    let names = [];
    let quants = [];
    let prices = [];
	console.log("clicked");
	let str=`
    <tr>
    	<th>Sr</th>
	    <th>Name</th>
	    <th>Quatity</th>
	    <th>Prices </th>
	    <th>Remv</th>
    </tr>`;
	let name = document.getElementById("name").value;
	let quant = document.getElementById("quant").value;
	let price = document.getElementById("price").value;
	
	

    if(localStorage.getItem("ListTableDataSolo") == null){
        const masterdb = {
            items : {
                
            }
        }
        localStorage.setItem("ListTableDataSolo", JSON.stringify(masterdb));
    }
    
    let masterDb = JSON.parse(localStorage.getItem("ListTableDataSolo"));
    let j =1;
    let i=0;
    
    
    while(masterDb.items[j]!=null){
        j++;
    }

    masterDb.items[j] = {
        name:name,
        quant:quant,
        price:price
    }
    j=1;
    while(masterDb.items[j]!=null){
        names[i] = masterDb.items[j].name;
	    quants[i] = masterDb.items[j].quant;
	    prices[i++] = masterDb.items[j].price;
        j++;
    }
    console.log(masterDb);
    console.log(j);
    localStorage.setItem("ListTableDataSolo", JSON.stringify(masterDb));
    

    let newDb = JSON.parse(localStorage.getItem("ListTableDataSolo"));
	
	for(let k=1; k<j; k++){
		str += `<tr><td>${k}</td><td>${newDb.items[k].name}</td>
        <td>${newDb.items[k].quant}</td><td>${newDb.items[k].price}</td>
        <td><button onclick = "handler(this.id)"class="clos" id="${k}">X</button></td></tr>`;
	}
	celldata.innerHTML = totalcalc(str, names, quants, prices);
    resetval();
}

function handler(id){

    let names = [];
    let quants = [];
    let prices = [];
	let str=`
    <tr>
    	<th>Sr</th>
	    <th>Name</th>
	    <th>Quatity</th>
	    <th>Prices </th>
	    <th>Remv</th>
    </tr>`;
	
    let masterDb = JSON.parse(localStorage.getItem("ListTableDataSolo"));
    let j =1;
    let i=0;
    let cp = 1;

    let copyDb = {
        items : {
            
        }
    }

    while(masterDb.items[j]!=null){
        if(j == id){
            j++;
            continue;
        }
        names[i] = masterDb.items[j].name;
	    quants[i] = masterDb.items[j].quant;
	    prices[i++] = masterDb.items[j].price;
        copyDb.items[cp++] = masterDb.items[j];
        j++;
    }
    localStorage.setItem("ListTableDataSolo", JSON.stringify(copyDb));
    

    let newDb = JSON.parse(localStorage.getItem("ListTableDataSolo"));
    console.log(newDb);
	j=j-1;
	for(let k=1; k<j; k++){
		str += `<tr><td>${k}</td><td>${newDb.items[k].name}</td>
        <td>${newDb.items[k].quant}</td><td>${newDb.items[k].price}</td>
        <td><button onclick = "handler(this.id)"class="clos" id="${k}">X</button></td></tr>`;
	}
    celldata.innerHTML = totalcalc(str, names, quants, prices);
    resetval();
}

function deleteList() {
    if(confirm("You are about to delete complete list\n Are you sure?")){
        localStorage.removeItem("ListTableDataSolo");
    }
    else{
        alert("Deletion aborted !");
    }
    listRendrer();
}

function resetval(){
	document.getElementById("name").value="";
	document.getElementById("quant").value="";
	document.getElementById("price").value="";
}

function totalcalc(str, names, quants, prices){
	let total=0;
	let j;
	for(j=0; j<names.length; j++){

        if(prices[j]=="" && quants[j]==""){
            total+=0;
        }
		else if(quants[j]==""){
			total += parseInt(prices[j]) ;
		}	
		else if(prices[j]=="")
			total += parseInt(quants[j]);
		
            
		else
		total += quants[j]*prices[j];
	}
	str += `<tr><td>#</td><td></td><td colspan ="2"><b>Total: ${total}</b></td><td>~</td></tr>`;
	

	return str;

}

function copyElementText(idd) {
    var text = document.getElementById("encryted").innerText;
    var elem = document.createElement("textarea");
    document.getElementById("dbvalue").value = text;
    document.body.appendChild(elem);
    elem.value = text;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
    let tooltip = document.getElementById(idd);
    tooltip.animate([{
        visibility: 'visible',
        opacity: '1'
    }, 
  {
      visibility: 'hidden',
      opacity: '0'
  }],
  {
      duration:1000
  });
    
}

function inputData(){
	
    let titleIs = document.getElementById("title").value;
    let keyIs = document.getElementById("key").value;
    let descriptionIs = document.getElementById("description2").value;
    let encrypted = encrypt(keyIs, descriptionIs);
    let statusIs = "Unique Key";
    
    if(keyIs.match("7121996") !== null || keyIs == ""){
        statusIs = "Default key";
    }
    
    if(localStorage.getItem("ScriptAppData")!=null){
       
        let obj = JSON.parse(localStorage.getItem("ScriptAppData"));
        let i =1;
        while(obj.tasks[i]!=null){
            i++;
        }
        obj.tasks[i]={
            title: titleIs,
            status: statusIs,
            description: encrypted
        }

        let db = JSON.stringify(obj);
        localStorage.setItem("ScriptAppData", db);
        
    }
    else{
        let masterDb = {
            tasks:{
                1:{
                    title: titleIs,
                    status: statusIs,
                    description: encrypted
                }
            }
        }

        let db = JSON.stringify(masterDb);
        localStorage.setItem("ScriptAppData", db);
        
    }
    document.getElementById("title").textContent = "";
    document.getElementById("key").textContent = "";
    document.getElementById("description2").textContent = "";
    togglePopup('popupTask');
    renderer("ScriptAppData", ".AllTasks");

}

function handleClick(){
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");
    console.log("clicked");
    popup.classList.toggle("active");
    overlay.classList.toggle("active");
    putVals();
}

function handleEdit(){
    let inputval = document.getElementById("keyy2").value;
    let targetval = document.getElementById("keyy3");
    let output = document.getElementById("encryted").innerText;
    if(isMenuOpened && output!="")
        targetval.value = output;
    else
        targetval.value = inputval;
    document.getElementById("inpuEdit").style.visibility="visible";

}


function togglePopup(classOfPopup) {

    let popup = document.querySelector(`.${classOfPopup}`);
    let overlay = document.querySelector(".overlay");

    popup.classList.toggle("active");
    overlay.classList.toggle("active");
}


function indexAllocTask(index) {
    localStorage.setItem("indexof", index.toString());
    
    location.href = "./output.html";
}

function listRendrer() {
    let names = [];
    let quants = [];
    let prices = [];
	console.log("clicked");
	let str=`
    <tr>
    	<th>Sr</th>
	    <th>Name</th>
	    <th>Quatity</th>
	    <th>Prices </th>
	    <th>Remv</th>
    </tr>`;
	
    if(localStorage.getItem("ListTableDataSolo") == null){
        celldata.innerHTML = "";
        return;
    }
    
    let masterDb = JSON.parse(localStorage.getItem("ListTableDataSolo"));
    let j =1;
    let i=0;
    while(masterDb.items[j]!=null){
        names[i] = masterDb.items[j].name;
	    quants[i] = masterDb.items[j].quant;
	    prices[i++] = masterDb.items[j].price;
        j++;
    }
    

    let newDb = JSON.parse(localStorage.getItem("ListTableDataSolo"));
	
	for(let k=1; k<j; k++){
		str += `<tr><td>${k}</td><td>${newDb.items[k].name}</td>
        <td>${newDb.items[k].quant}</td><td>${newDb.items[k].price}</td>
        <td><button onclick = "handler(this.id)"class="clos" id="${k}">X</button></td></tr>`;
	}
	celldata.innerHTML = totalcalc(str, names, quants, prices);
    resetval();
}

listRendrer();

