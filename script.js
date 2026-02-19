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

function getBookData() {
    
}

function addBook() {

}

addBookToLibrary("Braiding Sweetgrass", "Robin Wall Kimmerer", 350, true, myLibrary);
addBookToLibrary("The Odyssey", "Homer", 500, false, myLibrary);

displayLibrary(myLibrary);