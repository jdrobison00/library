// DOM Elements
const display = document.querySelector(".display");
const body = document.querySelector("body");
const newBook = document.querySelector(".new");

const myLibrary = [];


// ===== BOOK CONSTRUCTOR & METHODS =====
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
} 

// ===== HELPER FUNCTIONS =====

function createInputField(labelText, inputId, inputName, inputType = "text") {
    const field = document.createElement("div");
    field.classList.add("field");

    const label = document.createElement("label");
    label.setAttribute("for", inputId);
    label.textContent = labelText;
    field.appendChild(label);

    const input = document.createElement("input");
    input.setAttribute("type", inputType);
    input.setAttribute("id", inputId);
    input.setAttribute("name", inputName);
    field.appendChild(input);

    return field;
}

// ===== LIBRARY MANAGEMENT =====

function addBookToLibrary(title, author, pages, read, library) {
    let book = new Book(title, author, pages, read);
    library.push(book);
    return book;
}

// ===== DISPLAY =====

function displayBook(book) {
    // create card element
    let card = document.createElement("div");
    card.classList.add("card");

    //title+author line
    let titleAuthor = document.createElement("h2");
    titleAuthor.textContent = `${book.title} by ${book.author}`;
    card.appendChild(titleAuthor);

    //num pages line
    let pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;
    card.appendChild(pages);

    //read or unread
    let readSpan = document.createElement("span");
    readSpan.classList.add("read-line")
    let read = document.createElement("p")
    if(book.read === false) {
        read.textContent = "Not read yet";
    } else {
        read.textContent = "Already read";
    }
    readSpan.appendChild(read);
    let readButton = document.createElement("button");
    readButton.classList.add("toggle");
    readButton.textContent = "Toggle";
    readButton.addEventListener("click", event => pressToggle(event, book));
    readSpan.appendChild(readButton);
    card.appendChild(readSpan);

    //delete button
    let delButton = document.createElement("button");
    delButton.classList.add("delete");
    delButton.textContent = "Delete";
    delButton.addEventListener("click", event => deleteBook(event, book));
    card.appendChild(delButton);

    //add card to display
    display.appendChild(card);
}

function displayLibrary(library) {
    for (const book of library) {
        displayBook(book);
    }
}

// ===== EVENT HANDLERS

function pressToggle(event, book) {
    const readSpan = event.target.parentElement;

    //change object's status
    book.toggleRead();

    //change display
    const read = readSpan.querySelector("p");
    if(book.read === true) {
        read.textContent = "Already read";
    } else {
        read.textContent = "Not read yet"
    }
}

function deleteBook(event, book) {
    const bookCard = event.target.parentElement;
    
    const bookIndex = myLibrary.findIndex( item => item.id === book.id);
    myLibrary.splice(bookIndex, 1);
    display.removeChild(bookCard);
}

function submitForm(event, form) {
    event.preventDefault();

    const formData = new FormData(form);
    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const read = formData.get("read");

    const newBook = addBookToLibrary(title, author, pages, read, myLibrary);
    displayBook(newBook);
    body.removeChild(form);
}

function addBook(event) {
    let bookForm = document.createElement("form");
    bookForm.classList.add("book-form");

    const titleField = createInputField("Title: ", "title", "title");
    bookForm.appendChild(titleField);

    const authorField = createInputField("Author: ", "author", "author");
    bookForm.appendChild(authorField);

    const pagesField = createInputField("Pages: ", "pages", "pages");
    bookForm.appendChild(pagesField);

    let readYet = document.createElement("fieldset");
    readYet.classList.add("field");

    let legend = document.createElement("legend");
    legend.textContent = "Read yet? ";
    readYet.appendChild(legend);

    let yesRead = document.createElement("div");

    let readInput = document.createElement("input");
    readInput.setAttribute("type", "radio");
    readInput.setAttribute("id", "read");
    readInput.setAttribute("name", "readYet");
    readInput.setAttribute("value", true);
    yesRead.appendChild(readInput);

    let readLabel = document.createElement("label");
    readLabel.setAttribute("for", "read");
    readLabel.textContent = " Read";
    yesRead.appendChild(readLabel);

    readYet.appendChild(yesRead);

    let unread = document.createElement("div");

    let unreadInput = document.createElement("input");
    unreadInput.setAttribute("type", "radio");
    unreadInput.setAttribute("id", "unread");
    unreadInput.setAttribute("name", "readYet");
    unreadInput.setAttribute("value", false);
    unread.appendChild(unreadInput);

    let unreadLabel = document.createElement("label");
    unreadLabel.setAttribute("for", "unread");
    unreadLabel.textContent = " Unread";
    unread.appendChild(unreadLabel);

    readYet.appendChild(unread);

    bookForm.appendChild(readYet);

    let submitButton = document.createElement("button");
    submitButton.textContent = "Add";
    bookForm.appendChild(submitButton);

    body.appendChild(bookForm);

    bookForm.addEventListener("submit", event => submitForm(event, bookForm));
}

// INITIALIZATION

newBook.addEventListener("click", event => addBook(event));

displayLibrary(myLibrary);