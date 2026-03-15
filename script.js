const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check-btn");

const richestPeople = [
"Elon Musk",
"Bernard Arnault",
"Jeff Bezos",
"Larry Ellison",
"Warren Buffett",
"Bill Gates",
"Mark Zuckerberg",
"Larry Page",
"Sergey Brin",
"Jensen Huang"
];

const listItems = [];
let dragStartIndex;

createList();

function createList(){

[...richestPeople]

.map(a => ({value:a, sort:Math.random()}))

.sort((a,b)=>a.sort-b.sort)

.map(a=>a.value)

.forEach((person,index)=>{

const listItem = document.createElement("li");

listItem.setAttribute("data-index",index);

listItem.innerHTML =

`
<div class="draggable" draggable="true">

<span class="number">${index+1}</span>

<p class="person-name">${person}</p>

<i class="fa-solid fa-grip-lines"></i>

</div>
`;

listItems.push(listItem);

draggable_list.appendChild(listItem);

});

addEventListeners();
}

function dragStart(){

dragStartIndex = +this.closest("li").getAttribute("data-index");

}

function dragOver(e){

e.preventDefault();

}

function dragDrop(){

const dragEndIndex = +this.getAttribute("data-index");

swapItems(dragStartIndex,dragEndIndex);

}

function swapItems(fromIndex,toIndex){

const itemOne = listItems[fromIndex].querySelector(".draggable");

const itemTwo = listItems[toIndex].querySelector(".draggable");

listItems[fromIndex].appendChild(itemTwo);

listItems[toIndex].appendChild(itemOne);

}

function checkOrder(){

listItems.forEach((listItem,index)=>{

const personName = listItem.querySelector(".person-name").innerText.trim();

if(personName !== richestPeople[index]){

listItem.classList.add("wrong");

listItem.classList.remove("right");

}else{

listItem.classList.add("right");

listItem.classList.remove("wrong");

}

});

}

function dragEnter(){

this.classList.add("over");

}

function dragLeave(){

this.classList.remove("over");

}

function addEventListeners(){

const draggables = document.querySelectorAll(".draggable");

const dragListItems = document.querySelectorAll(".draggable-list li");

draggables.forEach(draggable=>{

draggable.addEventListener("dragstart",dragStart);

});

dragListItems.forEach(item=>{

item.addEventListener("dragover",dragOver);

item.addEventListener("drop",dragDrop);

item.addEventListener("dragenter",dragEnter);

item.addEventListener("dragleave",dragLeave);

});

}

check.addEventListener("click",checkOrder);