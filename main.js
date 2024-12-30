// set array to 'let' to allow filter to remove an object by id
// and then reassign the filtered array back to the array
let myLibrary = [];

// object constructor
function Book(id, title, author, pages, read) {
    // unique id for editing and deleting objects
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// add new object to array
function addBookToLibrary(title, author, pages, read) {
    // give object a unique id
    const id = crypto.randomUUID();
    const book = new Book(id, title, author, pages, read);
    myLibrary.push(book);
    // add new object as a row
    addRowToTable(book);
}

// add a single row to the table
function addRowToTable(book) {
    const tbody = document.querySelector(".tbody");
    const row = document.createElement("tr");
    // set unique id as a data attribute to the row
    row.setAttribute("data-id", book.id);

    // create delete button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Delete";
    removeButton.addEventListener("click", () => {
        // delete book
        deleteBook(book.id);
    });

    // add delete button to row
    const deleteCell = document.createElement("td");
    deleteCell.appendChild(removeButton);
    row.appendChild(deleteCell);

    // add object values to row
    const properties = ["title", "author", "pages", "read"];
    properties.forEach(property => {
        const cell = document.createElement("td");
        cell.textContent = book[property];
        // add class to the read cell for easy access later
        if(property === "read") {
            cell.classList.add("read-cell");
        }
        row.appendChild(cell);
    });

    // create toggle button
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Change Status"
    toggleButton.addEventListener("click", () => {
        // toggle read status
        toggleRead(book);
    });

    // add toggle button to row
    const toggleCell = document.createElement("td");
    toggleCell.appendChild(toggleButton);
    row.appendChild(toggleCell);
    
    tbody.appendChild(row);
}

// delete book from the array and remove its row
function deleteBook(id) {
    // filter the book from the array, keep all objects without matching id
    myLibrary = myLibrary.filter(book => book.id !== id);

    // remove the row with the matching id from the table
    // search for a table row who's data-id matches the id given
    const row = document.querySelector(`tr[data-id="${id}"]`);
    if (row) {
        row.remove();
    }
}

function toggleRead(book) {
    // toggle the read property (if b.r is read then make it not read yet, else read)
    book.read = book.read === "read" ? "not read yet" : "read";

    // find the row associated with the book
    const row = document.querySelector(`tr[data-id="${book.id}"]`);
    if(row) {
        // update the read cell in row
        const readCell = row.querySelector("td.read-cell");
        if(readCell) {
            readCell.textContent = book.read;
        }
    }
}



// sample table data for testing
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



// create a dialog modal pop-up that collects information for new objects to be added to table
document.addEventListener("DOMContentLoaded", () => {
    const dialog = document.querySelector("dialog");
    const showButton = document.querySelector("#addBookButton");
    // use dialog. to search specifically within the dialog field for these tags
    const closeButton = dialog.querySelector("#closeButton");
    const submitButton = dialog.querySelector("#submitButton");
    const inputs = dialog.querySelectorAll("input");

    showButton.addEventListener("click", () => {
        dialog.showModal();
    });

    closeButton.addEventListener("click", () => {
        dialog.close();
    })

    // whenever the .close() method is run, clear the input fields
    dialog.addEventListener("close", () => {
        inputs.forEach(input => {
            // clear the checkbox 
            if(input.type === "checkbox") {
                input.checked = false;
            } else {
                input.value = ""
            };
        });    
    });

    // add new book on submit, adding book will also add row to table
    submitButton.addEventListener("click", (event) => {
        // prevent default submit to server action
        event.preventDefault();
        // collect values from each input (id associates with input field id value)
        const title = document.querySelector("#title").value;
        const author = document.querySelector("#author").value;
        const pages = document.querySelector("#pages").value;
        const read = document.querySelector("#read").checked ? "read" : "not read yet";

        // add validation to ensure input fields are not left blank
        if(!title || !author || !pages) {
            // select entire form with all input fields
            const form = document.querySelector("#modalForm");
            // if any input is empty, form.checkValidity() will return false, !false = true and thus the block will execute
            if (!form.checkValidity()) {
                // trigger browser's validation messages
                form.reportValidity();
                // stop execution if any field is empty
                return;
            }
        }

        addBookToLibrary(title, author, pages, read);

        dialog.close();
    })
})