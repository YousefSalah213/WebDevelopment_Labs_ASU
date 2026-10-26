
const nameInput = document.getElementById("name");
const greetButton = document.getElementById("greet");
const title = document.getElementById("title");

const greetingTitle = document.getElementById("greeting-title");
const greetingName = document.getElementById("greeting-name");
const greetingButton = document.getElementById("greeting-button");
const list = document.getElementById("list");

const goodbyeTitle = document.getElementById("goodbye-title");
const goodbyeName = document.getElementById("goodbye-name");
const goodbyeButton = document.getElementById("goodbye-button");
const goodbyeList = document.getElementById("goodbye-list");

function addName(name) {
    name = name.trim();

    if (name === "") {
        return;
    }

    const li = document.createElement("li");
    li.textContent = name;

    li.addEventListener("click", function () {
        const goodbyeItem = document.createElement("li");
        goodbyeItem.textContent = name;

        goodbyeItem.addEventListener("click", function () {
            goodbyeItem.remove();
        });

        goodbyeList.appendChild(goodbyeItem);
        goodbyeTitle.textContent = `Goodbye, ${name}!`;

        li.remove();
        greetingTitle.textContent = "Hello!";
    });

    list.appendChild(li);
    greetingTitle.textContent = `Hello, ${name}!`;
}

greetButton.addEventListener("click", function () {
    const name = nameInput.value.trim();

    if (name === "") {
        return;
    }

    title.textContent = `Hello, ${name}!`;
    addName(name);
    nameInput.value = "";
});

greetingButton.addEventListener("click", function () {
    addName(greetingName.value);
    greetingName.value = "";
});

goodbyeButton.addEventListener("click", function () {
    const name = goodbyeName.value.trim();

    if (name === "") {
        return;
    }

    const li = document.createElement("li");
    li.textContent = name;

    li.addEventListener("click", function () {
        li.remove();
    });

    goodbyeList.appendChild(li);
    goodbyeTitle.textContent = `Goodbye, ${name}!`;
    goodbyeName.value = "";
});
