// DOM Elements
const booksContainer = document.querySelector(".display");
const documentBody = document.querySelector("body");
const addBookButton = document.querySelector(".new");

const library = [];


// ===== BOOK CONSTRUCTOR & METHODS =====
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
}

Book.prototype.toggleRead = function() {
    this.isRead = !this.isRead;
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

function createAndAddBook(title, author, pages, isRead, library) {
    let book = new Book(title, author, pages, isRead);
    library.push(book);
    return book;
}

// ===== DISPLAY =====

function displayBookCard(book) {
    // create card element
    let cardEl = document.createElement("div");
    cardEl.classList.add("card");

    //title+author line
    let titleAuthorEl = document.createElement("h2");
    titleAuthorEl.textContent = `${book.title} by ${book.author}`;
    cardEl.appendChild(titleAuthorEl);

    //num pages line
    let pagesEl = document.createElement("p");
    pagesEl.textContent = `Pages: ${book.pages}`;
    cardEl.appendChild(pagesEl);

    //read or unread
    let readLineEl = document.createElement("span");
    readLineEl.classList.add("read-line")
    let readStatusEl = document.createElement("p")
    if(book.isRead === false) {
        readStatusEl.textContent = "Not read yet";
    } else {
        readStatusEl.textContent = "Already read";
    }
    readLineEl.appendChild(readStatusEl);
    let toggleReadEl = document.createElement("button");
    toggleReadEl.classList.add("toggle");
    toggleReadEl.textContent = "Toggle";
    toggleReadEl.addEventListener("click", event => handleToggleRead(event, book));
    readLineEl.appendChild(toggleReadEl);
    cardEl.appendChild(readLineEl);

    //delete button
    let deleteButtonEl = document.createElement("button");
    deleteButtonEl.classList.add("delete");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.addEventListener("click", event => handleDeleteBook(event, book));
    cardEl.appendChild(deleteButtonEl);

    //add card to display
    booksContainer.appendChild(cardEl);
}

function displayLibrary(library) {
    for (const book of library) {
        displayBookCard(book);
    }
}

// ===== EVENT HANDLERS

function handleToggleRead(event, book) {
    const readSpan = event.target.parentElement;

    //change object's status
    book.toggleRead();

    //change display
    const read = readSpan.querySelector("p");
    if(book.isRead === true) {
        read.textContent = "Already read";
    } else {
        read.textContent = "Not read yet"
    }
}

function handleDeleteBook(event, book) {
    const bookCard = event.target.parentElement;
    
    const bookIndex = library.findIndex( item => item.id === book.id);
    library.splice(bookIndex, 1);
    booksContainer.removeChild(bookCard);
}

function handleFormSubmit(event, form) {
    event.preventDefault();

    const formData = new FormData(form);
    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const isRead = formData.get("readYet");

    const newBook = createAndAddBook(title, author, pages, isRead, library);
    displayBookCard(newBook);
    documentBody.removeChild(form);
}

function showAddBookForm(event) {
    let formEl = document.createElement("form");
    formEl.classList.add("book-form");

    const titleFieldEl = createInputField("Title: ", "title", "title");
    formEl.appendChild(titleFieldEl);

    const authorFieldEl = createInputField("Author: ", "author", "author");
    formEl.appendChild(authorFieldEl);

    const pagesFieldEl = createInputField("Pages: ", "pages", "pages");
    formEl.appendChild(pagesFieldEl);

    let readOptionsFieldset = document.createElement("fieldset");
    readOptionsFieldset.classList.add("field");

    let legend = document.createElement("legend");
    legend.textContent = "Read yet? ";
    readOptionsFieldset.appendChild(legend);

    let readOptionYesEl = document.createElement("div");

    let readYesInputEl = document.createElement("input");
    readYesInputEl.setAttribute("type", "radio");
    readYesInputEl.setAttribute("id", "read");
    readYesInputEl.setAttribute("name", "readYet");
    readYesInputEl.setAttribute("value", true);
    readOptionYesEl.appendChild(readYesInputEl);

    let readLabel = document.createElement("label");
    readLabel.setAttribute("for", "read");
    readLabel.textContent = " Read";
    readOptionYesEl.appendChild(readLabel);

    readOptionsFieldset.appendChild(readOptionYesEl);

    let readOptionNoEl = document.createElement("div");

    let readNoInputEl = document.createElement("input");
    readNoInputEl.setAttribute("type", "radio");
    readNoInputEl.setAttribute("id", "unread");
    readNoInputEl.setAttribute("name", "readYet");
    readNoInputEl.setAttribute("value", false);
    readOptionNoEl.appendChild(readNoInputEl);

    let unreadLabel = document.createElement("label");
    unreadLabel.setAttribute("for", "unread");
    unreadLabel.textContent = " Unread";
    readOptionNoEl.appendChild(unreadLabel);

    readOptionsFieldset.appendChild(readOptionNoEl);

    formEl.appendChild(readOptionsFieldset);

    let submitButton = document.createElement("button");
    submitButton.textContent = "Add";
    formEl.appendChild(submitButton);

    documentBody.appendChild(formEl);

    formEl.addEventListener("submit", event => handleFormSubmit(event, formEl));
}

// INITIALIZATION

addBookButton.addEventListener("click", event => showAddBookForm(event));

displayLibrary(library);