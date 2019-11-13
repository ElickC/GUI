var last = document.getElementById("four");
var ul = last.parentNode;
var li = document.createElement("li");
var elements = document.getElementsByTagName("li");
var h2 = document.getElementById("header").nextElementSibling;

// ADD NEW ITEM TO END OF LIST
li.appendChild(document.createTextNode("cream"));
ul.appendChild(li);

// ADD NEW ITEM START OF LIST
var li = document.createElement("li");
li.appendChild(document.createTextNode("kale"));
ul.prepend(li);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
for( i = 0; i < elements.length; i++){
    elements[i].setAttribute("class", "cool");
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var span = document.createElement("span");
span = "<span>"+ elements.length + "</span>";
h2.innerHTML += span;
console.log(h2);
