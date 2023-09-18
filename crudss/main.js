let title=document.getElementById('title');
let price=document.getElementById('price');
let tax=document.getElementById('tax');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let creat=document.getElementById('build');
let search=document.getElementById('search');
let tbody=document.getElementById('tbody');

let mood='creat';
let ah;


//caltotle

function caltotal(){
    if(price.vale!=''){
       let result= +price.value + +ads.value + +tax.value - +discount.value;
       total.innerHTML=result;
       total.style.background='green';
    }else{
        total.value=' ';
        total.style.background='red';
    }
}


//creat 

let myarr;
if(localStorage.product!=null){
    myarr=JSON.parse(localStorage.product)
}else{
    myarr=[];
}


creat.onclick=function(){
    let myobj={
        title:title.value,
        price:price.value,
        ads:ads.value,
        tax:tax.value,
        discount:discount.value,
        count:count.value,
        category:category.value,
        total:total.innerHTML,
    }

    //count
    
   
    if(mood==='creat'){
        if(myobj.count>1){
            for(let i=0; i<myobj.count;i++){
                myarr.push(myobj);
            }
        }
        else{
            myarr.push(myobj)
        }
    }
    else{
        myarr[ah]=myobj;
        count.style.display='block';
        mood='creat';
        creat.innerHTML='creat';
    }
   
    //save in localstorage
    localStorage.setItem('product',JSON.stringify(myarr));

    display();
    clearinputs();
}

//display data

function display(){
    let table= '';
    for(let i =0 ; i<myarr.length ; i++){
        table+=` <tr>
        <td>${i}</td>
        <td>${myarr[i].title}</td>
        <td>${myarr[i].price}</td>
        <td>${myarr[i].tax}</td>
        <td>${myarr[i].ads}</td>
        <td>${myarr[i].discount}</td>
        <td>${myarr[i].total}</td>
        <td>${myarr[i].category}</td>
        <td><button onclick="update(${i})"> update</button></td>
        <td><button onclick="deleteindex(${i})">delete</button></td>
    </tr>`
    }
    tbody.innerHTML=table;

    if(myarr.length>1){
        let deletall=document.getElementById('deleteall');
        deletall.innerHTML=`<button onclick="deleteall()">delete all (${myarr.length})</button>`
    }
    
}
display();



//clear inputs
function clearinputs(){
    title.value='';
    price.value='';
    ads.value='';
    tax.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}


//delete index

function deleteindex(i){
 myarr.splice(i,1);
 localStorage.product=JSON.stringify(myarr);
 display();
}

//delete all

function deleteall(){
    myarr.splice(0);
    localStorage.clear();
    display();
}


//update 

function update(i){
    title.value=myarr[i].title;
    price.value=myarr[i].price;
    ads.value=myarr[i].ads;
    tax.value=myarr[i].tax;
    discount.value=myarr[i].discount;
    category.value=myarr[i].category;
    caltotal();
    count.style.display='none';
    creat.innerHTML='update';

    scroll({
        top:0,
        behavior:"smooth",
    })
    mood='update';
    ah=i;
}



//search

let searchmood='title';

function searchinp(id){
 if(id=='bytitle'){
  searchmood='title';
  search.placeholder='search by title'
 }
 else{
     searchmood='category'
     search.placeholder='search by category'
 
   }
  search.focus();
}


function searchdata(value){
    let table='';
    if(searchmood=='title'){
        for(let i=0; i<myarr.length;i++){
            if(myarr[i].title.includes(value)){
                table+=` <tr>
                <td>${i}</td>
                <td>${myarr[i].title}</td>
                <td>${myarr[i].price}</td>
                <td>${myarr[i].tax}</td>
                <td>${myarr[i].ads}</td>
                <td>${myarr[i].discount}</td>
                <td>${myarr[i].total}</td>
                <td>${myarr[i].category}</td>
                <td><button onclick="update(${i})"> update</button></td>
                <td><button onclick="deleteindex(${i})">delete</button></td>
            </tr>`
            }
            tbody.innerHTML=table;
            }
        } 
    else{
        for(let i=0; i<myarr.length;i++){
            if(myarr[i].category.includes(value)){
                table+=` <tr>
                <td>${i}</td>
                <td>${myarr[i].title}</td>
                <td>${myarr[i].price}</td>
                <td>${myarr[i].tax}</td>
                <td>${myarr[i].ads}</td>
                <td>${myarr[i].discount}</td>
                <td>${myarr[i].total}</td>
                <td>${myarr[i].category}</td>
                <td><button onclick="update(${i})"> update</button></td>
                <td><button onclick="deleteindex(${i})">delete</button></td>
            </tr>`
            }
            tbody.innerHTML=table;
            }
    }
   
}