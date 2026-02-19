const display = document.querySelector(".display");
const body = document.querySelector("body");
const newBook = document.querySelector(".new");

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function deleteBook(event, book) {
    const bookCard = event.target.parentElement;
    
    const bookIndex = myLibrary.findIndex( item => item.id === book.id);
    myLibrary.splice(bookIndex, 1);
    display.removeChild(bookCard);
}

function addBookToLibrary(title, author, pages, read, library) {
    let book = new Book(title, author, pages, read);
    library.push(book);
}

function displayBook(book) {
    let card = document.createElement("div");
    card.classList.add("card");
    let titleAuthor = document.createElement("h2");
    titleAuthor.textContent = `${book.title} by ${book.author}`;
    card.appendChild(titleAuthor);
    let pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;
    card.appendChild(pages);
    let read = document.createElement("p")
    if(book.read === false) {
        read.textContent = "Not read yet";
    } else {
        read.textContent = "Already read";
    }
    card.appendChild(read);
    let delButton = document.createElement("button");
    delButton.classList.add("delete");
    delButton.textContent = "Delete";
    delButton.addEventListener("click", event => deleteBook(event, book));
    card.appendChild(delButton);

    display.appendChild(card);
}

function displayLibrary(library) {
    for (const book of library) {
        displayBook(book);
    }
}

function addBook(event) {
    let bookForm = document.createElement("form");
    bookForm.classList.add("book-form");

    let titleField = document.createElement("div");
    titleField.classList.add("field");

    let titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title");
    titleLabel.textContent = "Title: ";
    titleField.appendChild(titleLabel);

    let titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "title");
    titleInput.setAttribute("name", "title");
    titleField.appendChild(titleInput);

    bookForm.appendChild(titleField);

    let authorField = document.createElement("div");
    authorField.classList.add("field");

    let authorLabel = document.createElement("label");
    authorLabel.setAttribute("for", "author");
    authorLabel.textContent = "Author: "
    authorField.appendChild(authorLabel);

    let authorInput = document.createElement("input");
    authorInput.setAttribute("type", "text");
    authorInput.setAttribute("id", "author");
    authorInput.setAttribute("name", "author");
    authorField.appendChild(authorInput);

    bookForm.appendChild(authorField)

    let pagesField = document.createElement("div");
    pagesField.classList.add("field");

    let pagesLabel = document.createElement("label");
    pagesLabel.setAttribute("for", "pages");
    pagesLabel.textContent = "Pages: ";
    pagesField.appendChild(pagesLabel);

    let pagesInput = document.createElement("input");
    pagesInput.setAttribute("type", "text");
    pagesInput.setAttribute("id", "title");
    pagesInput.setAttribute("name", "title");
    pagesField.appendChild(pagesInput);

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
}

newBook.addEventListener("click", event => addBook(event));

addBookToLibrary("Braiding Sweetgrass", "Robin Wall Kimmerer", 350, true, myLibrary);
addBookToLibrary("The Odyssey", "Homer", 500, false, myLibrary);

displayLibrary(myLibrary);