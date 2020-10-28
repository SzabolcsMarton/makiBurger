function creatAnyElementAndAddClass(tagName, className) {
  let element = document.createElement("tagName");
  element.classList.add("className");
  return element;
}

function createLi(burgerName) {
  const ul = document.querySelector("ul");
  this.burgerName = burgerName;
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  const price = 1200;

  let li = creatAnyElementAndAddClass("li");
  let div = creatAnyElementAndAddClass("div", "menuDescription");
  let h2 = document.createElement("h2");
  h2.innerHTML = burgerName;
  let p = document.createElement("p");
  p.innerHTML = description;
  let span = document.createElement("span");
  span.innerHTML = price;
  div.appendChild(h2);
  div.appendChild(p);
  div.appendChild(span);
  li.appendChild(div);
  ul.appendChild(li);
}

const hamburgerek = [
  "Sajtburger",
  "Rofiburger",
  "Duplasajtos",
  "Csirkeburger",
  "Tojasosburger",
  "ilyenburgert",
  "olyanburgert",
  "loburgert",
  "makiburger",
];
function fillUl() {
  for (i = 0; i < hamburgerek.length; i++) {
    createLi(hamburgerek[i]);
  }
}

const button = document.querySelector("button");
button.addEventListener("click", fillUl);
