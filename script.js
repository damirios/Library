let myLibrary = [];
const bookForm = document.querySelector('.new-book-form');
const bookFormWindow = bookForm.querySelector('form');
const createBookCard = document.querySelector('.add-a-book');
const library = document.querySelector('.library-container');
const addButton = document.querySelector('.add-btn');

function addBookToLibrary(book) {
    myLibrary.push(book);
    const currentBook = myLibrary[myLibrary.length - 1];
    const bookCard = document.createElement('div');
    const bookTitle = document.createElement('p');
    const bookAuthor = document.createElement('p');
    const publishDate = document.createElement('p');
    const numberOfPages = document.createElement('p');
    const readStatus = document.createElement('p');
    readStatus.classList.add('read-status');
    const buttons = document.createElement('div');
    const switchReadButton = document.createElement('button');
    const removeABookButton = document.createElement('button');

    switchReadButton.classList.add('read-switch');
    removeABookButton.classList.add('remove-a-book');
    buttons.classList.add('book-buttons');

    switchReadButton.textContent = 'Switch read status';
    removeABookButton.textContent = 'Remove this book'; 

    buttons.appendChild(switchReadButton);
    buttons.appendChild(removeABookButton);

    bookTitle.textContent = currentBook.title;
    bookAuthor.textContent = 'By: ' + currentBook.author;
    publishDate.textContent = 'Published: ' + currentBook.year;
    numberOfPages.textContent = 'Number of pages: ' + currentBook.pages;
    readStatus.textContent = 'read: ' + currentBook.read;

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(publishDate);
    bookCard.appendChild(numberOfPages);
    bookCard.appendChild(readStatus);
    bookCard.appendChild(buttons);
    bookCard.dataset.index = myLibrary.length;

    bookCard.classList.add('book');
    library.appendChild(bookCard);
}

window.addEventListener('click', createABook);
function createABook(e) {
    if (!bookForm.classList.contains('hidden') && !e.target.closest('form')) {
        bookForm.classList.add('hidden');
        bookFormWindow.reset();
    } else if (e.target == addButton && bookForm.classList.contains('hidden')) {
        e.preventDefault();
        bookForm.classList.remove('hidden');
        const currentProps = bookFormWindow.querySelectorAll('input');
        currentProps.forEach(prop => {prop.setAttribute('style', ''); prop.nextElementSibling.setAttribute('style', '');})
    } else if (e.target == createBookCard && !bookForm.classList.contains('hidden')) {
        e.preventDefault();
        let newBook = {};
        const currentProps = bookFormWindow.querySelectorAll('input');
        currentProps.forEach(prop => {
            if (prop.value.trim() == '') {
                prop.nextElementSibling.setAttribute('style', 'display: block;');
                prop.setAttribute('style', 'border: 1px dashed red;');
            } else {
                if ((prop.name == 'year' || prop.name == 'pages') && isNaN(+prop.value)) {
                    prop.nextElementSibling.textContent = 'You should write a number!';
                    prop.nextElementSibling.setAttribute('style', 'display: block;');
                    prop.setAttribute('style', 'border: 1px dashed red;');
                } else if (prop.name == 'read' && (prop.value.trim().toLowerCase() != 'true' &&
                prop.value.trim().toLowerCase() != 'false')) {
                    prop.nextElementSibling.textContent = 'You should write "true" or "false"!';
                    prop.nextElementSibling.setAttribute('style', 'display: block;');
                    prop.setAttribute('style', 'border: 1px dashed red;');
                } else {
                    prop.nextElementSibling.setAttribute('style', '');
                    prop.setAttribute('style', '');
                    newBook[prop.name] = prop.value;
                }
            }
        });
        if (Object.keys(newBook).length == 5) {
            bookForm.classList.add('hidden');
            bookFormWindow.reset();
            addBookToLibrary(newBook);
        }
    }
// removing a book from the library 
    if (e.target.classList.contains('remove-a-book')) {
        const bookToRemove = e.target.closest('.book');
        bookToRemove.remove();
    }
// changing 'read' status
    if (e.target.classList.contains('read-switch')) {
        const currentBook = e.target.closest('.book');
        const readParagraph = currentBook.querySelector('.read-status');
        const currentBookJs = myLibrary[currentBook.dataset.index - 1];
        if (currentBookJs.read == 'true') {
            currentBookJs.read = 'false';
            readParagraph.textContent = 'read: false';
        } else if (currentBookJs.read == 'false') {
            currentBookJs.read = 'true';
            readParagraph.textContent = 'read: true';
        } else {
            console.log('ERROR!');
        }
    }
}