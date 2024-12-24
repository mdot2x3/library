const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");
addBookToLibrary("The Fellowship of the Ring", "J.R.R. Tolkien", 423, "read");
addBookToLibrary("The Two Towers", "J.R.R. Tolkien", 352, "read");
addBookToLibrary("The Return of the King", "J.R.R. Tolkien", 416, "not read yet");
addBookToLibrary("The Silmarillion", "J.R.R. Tolkien", 365, "not read yet");
addBookToLibrary("Dune", "Frank Herbert", 412, "read");
addBookToLibrary("Dune Messiah", "Frank Herbert", 256, "read");
addBookToLibrary("Children of Dune", "Frank Herbert", 444, "read");
addBookToLibrary("God Emperor of Dune", "Frank Herbert", 496, "not read yet");
addBookToLibrary("Heretics of Dune", "Frank Herbert", 480, "not read yet");

function buildTable() {
    const tbody = document.querySelector(".tbody");

    for(const i of myLibrary) {
        const row = document.createElement("tr");

        for(const j in i) {
            if(i.hasOwnProperty(j)) {
                const cell = document.createElement("td");
                const cellText = document.createTextNode(i[j]);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
        }
        tbody.appendChild(row);
    }
}

buildTable();


document.addEventListener("DOMContentLoaded", () => {
    const dialog = document.querySelector("dialog");
    const showButton = document.querySelector("#addBookButton");
    const closeButton = dialog.querySelector("#closeButton");
    const submitButton = dialog.querySelector("#submitButton");

    showButton.addEventListener("click", () => {
        dialog.showModal();
    });

    closeButton.addEventListener("click", () => {
        dialog.close();
    })

    submitButton.addEventListener("click", () => {
        
    })
})

    

/*
console.log(myLibrary[0]);
console.log(myLibrary[2]);
console.log(myLibrary[5]);
console.log(myLibrary[9]);
*/

/*
const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read}`
    };
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");

function addBookToLibrary() {
    return
}

console.log(theHobbit.info());
*/