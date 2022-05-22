let myLibrary = [];

function Book(title, author, pages, year, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.read = read;
    let readStatus;
    if (read == true) {
        readStatus = 'read already';
    } else if (read == false) {
        readStatus = 'not read yet';
    }
    this.info = function () {
        return `${title} by ${author}, ${pages}, ${readStatus}`;
    }
}

function addBookToLibrary(e) {
    const newBookForm = document.querySelector('.new-book-form form');
    const blind = document.querySelector('.blind');
    
    const title = newBookForm.querySelector('#title').value;
    const author = newBookForm.querySelector('#author').value;
    const pages = newBookForm.querySelector('#pages').value; 
    const year = newBookForm.querySelector('#year').value;
    const read = newBookForm.querySelector('#read').value;
    const currentBook = {title, author, pages, year, read};

    if (isBookValid(currentBook)) {
        const newBook = new Book(title, author, pages, year, read);
        myLibrary.push(newBook);
        displayBooks(myLibrary);
        newBookForm.closest('.new-book-form').classList.add('hidden');
        blind.classList.remove('active');
        newBookForm.reset();
    }
    e.preventDefault();
}

function displayBooks(library) {
    const books = document.querySelectorAll('.book-card');
    books.forEach(book => book.remove());

    if (library.length > 0) {
        for (let i = 0; i < library.length; i++) {
            const libraryContainer = document.querySelector('.library-container');
            const currentBook = library[i];
            const bookCard = document.createElement('div');
            const bookTitle = document.createElement('p');
            const bookAuthor = document.createElement('p');
            const bookPages = document.createElement('p');
            const bookYear = document.createElement('p');
            const bookRead = document.createElement('p');
            bookCard.dataset.index = i + 1;
    
            const buttons = document.createElement('div');
            buttons.classList.add('buttons');
            const switchButton = document.createElement('button');
            switchButton.setAttribute('type', 'button');
            switchButton.textContent = 'Change "Read" status';
            const removeButton = document.createElement('button');
            removeButton.setAttribute('type', 'button');
            removeButton.textContent = 'Remove the book';
    
            switchButton.addEventListener('click', currentBook.switchReadStatus);
            removeButton.addEventListener('click', currentBook.removeTheBook);
    
            buttons.appendChild(switchButton);
            buttons.appendChild(removeButton);
    
            bookTitle.textContent = currentBook.title;
            bookAuthor.textContent = 'By: ' + currentBook.author;
            bookPages.textContent = 'Number of pages: ' + currentBook.pages;
            bookYear.textContent = 'Published: ' + currentBook.year;
            bookRead.textContent = 'Read: ' + currentBook.read;
            bookRead.dataset.readStatus = true;
    
            bookCard.appendChild(bookTitle);
            bookCard.appendChild(bookAuthor);
            bookCard.appendChild(bookPages);
            bookCard.appendChild(bookYear);
            bookCard.appendChild(bookRead);
            bookCard.appendChild(buttons);
            bookCard.classList.add('book-card');
    
            libraryContainer.appendChild(bookCard);
            // currentBook.switchReadStatus();
        }
    }
}

function showNewBookForm(e) {
    const blind = document.querySelector('.blind');
    const newBookForm = document.querySelector('.new-book-form');
    if (newBookForm.classList.contains('hidden') && !blind.classList.contains('active')) {
        newBookForm.classList.remove('hidden');
        blind.classList.add('active');
    }
}

function closeNewBookForm(e) {
    const blind = document.querySelector('.blind');
    const newBookForm = document.querySelector('.new-book-form');
    const errorMessages = document.querySelectorAll('.error-message');
    const errorInputs = newBookForm.querySelectorAll('form input');

    if (e.target != addBookButton && !e.target.closest('.new-book-form') && !newBookForm.classList.contains('hidden')) {
        newBookForm.classList.add('hidden');
        blind.classList.remove('active');
        newBookForm.querySelector('form').reset();
        if (errorMessages) {
            errorMessages.forEach(error => error.remove());
        }
        if (errorInputs) {
            errorInputs.forEach(input => input.classList.remove('incorrect'));
        }
    }
}

function resetInput(currentInput) {
    if (currentInput.classList.contains('incorrect')) {
        currentInput.classList.remove('incorrect');
    }
    
    if (currentInput.nextElementSibling && currentInput.nextElementSibling.classList.contains('error-message')) {
        currentInput.nextElementSibling.remove();
    }
}

function isBookValid(currentBook) {
    const newBookForm = document.querySelector('.new-book-form form');
    let valid = true;
    for (key in currentBook) {
        const currentProp = currentBook[key];
        const currentInput = newBookForm.querySelector(`#${key}`);
        const currentInputBlock = newBookForm.querySelector(`.${key}`);
        resetInput(currentInput);

        const errorEmptyInput = document.createElement('p');

        if (currentProp.trim() == '') {
            currentInput.classList.add('incorrect');
            errorEmptyInput.textContent = 'You should fill the field!';
            errorEmptyInput.classList.add('error-message');
            currentInputBlock.appendChild(errorEmptyInput);
            valid = false;
        } else {
            if ((key == 'year' || key == 'pages') && isNaN(+currentProp) ) {
                currentInput.classList.add('incorrect');
                errorEmptyInput.textContent = 'You should write a number!';
                errorEmptyInput.classList.add('error-message');
                currentInputBlock.appendChild(errorEmptyInput);
                valid = false;
            } else if (key == 'read' && currentProp != 'true' && currentProp != 'false') {
                currentInput.classList.add('incorrect');
                errorEmptyInput.textContent = 'You should write "true" or "false"!';
                errorEmptyInput.classList.add('error-message');
                currentInputBlock.appendChild(errorEmptyInput);
                valid = false;
            }
        }
    }

    return valid;
}

//Add methods "remove" and "switch 'read' status" to the Book.prototype
Book.prototype.removeTheBook = function(e) {
    const currentBookCard = e.target.closest('.book-card');
    const index = currentBookCard.dataset.index;
    
    myLibrary.splice(index - 1, 1);
    currentBookCard.remove();
    displayBooks(myLibrary);
}

Book.prototype.switchReadStatus = function(e) {
    const currentBookCardIndex = this.closest('.book-card').dataset.index;
    const currentBookCard = this.closest('.book-card');
    const currentBookObject = myLibrary[currentBookCardIndex - 1];

    if (currentBookObject.read == 'false') {
        currentBookObject.read = 'true';
    } else {
        currentBookObject.read = 'false';
    }
    displayBooks(myLibrary);
    // const currentReadStatus = ;
    // console.log(currentReadStatus);
    // const currentBookCard = this.closest('.book-card');
    // const readStatus = currentBookCard.querySelector(`[data-read-status = true]`);
    // console.log(readStatus);
}



// 'Add a book' event listener
const addBookButton = document.querySelector('.add-book button');
addBookButton.addEventListener('click', showNewBookForm);

// event listener to close the newBookForm and the blind
window.addEventListener('click', closeNewBookForm);

// event listener for 'submit' button - accepting the book in the form
const submitTheNewBook = document.querySelector('.submit-adding');
submitTheNewBook.addEventListener('click', addBookToLibrary);