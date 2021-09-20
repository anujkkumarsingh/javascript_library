// book constructor
function Book(name, author, type, tm) {
    this.name = name;
    this.author = author;
    this.type = type;
    this.tm = tm;
}



showNotes();

function validate(book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false
    }
    else {
        return true;
    }
}

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('YOu have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    let other = document.getElementById('other');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }
    else {
        type = other.value;
    }
    let ck = new Date();
    date = ck.toLocaleDateString(undefined, options);
    // time = ck.getHours() + ':' + ck.getMinutes() + ':' + ck.getSeconds();
    let hr=ck.getHours();
    hr=hr.toString();
    let mn=ck.getMinutes();
    mn=mn.toString();
    let sec= ck.getSeconds();
    sec=sec.toString();
    if(hr.length==1)
    {
        hr='0'+hr;
    }
    if(mn.length==1)
    {
        mn='0'+mn;
    }
    if(sec.length==1)
    {
        sec='0'+sec;
    }
    time = hr+ ':' + mn+ ':' + sec;
    console.log(typeof(sec));
    tm=time + "<br>" + date;
    



    let book = new Book(name, author, type, tm);
    console.log(book);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let msg = document.getElementById("message");
    if (validate(book)) {
        notesObj.push(book);
        msg.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Messge:</strong> Your book has been successfully added
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">×</span>
        </button>
        </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 1000);

    }
    else {

        msg.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Messge:</strong> Sorry you cannot add this book
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">×</span>
        </button>
        </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 1000);
    }
    // notesObj.push(book);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
    e.preventDefault();
    showNotes();
}


function showNotes() {
    notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    console.log("Adding to UI");
    tableBody = document.getElementById('tableBody');
    tableNT = document.getElementById('tableNT');
    html = "";
    notesObj.forEach(function (element, index) {
        let uiString = `<tr>
                            <td>${index + 1}</td>
                            <td>${element.name}</td>
                            <td>${element.author}</td>
                            <td>${element.type}</td>
                            <td>${element.tm}</td>
                            <td><button id="${index}"onclick="modifyNote(this.id)" class="btn btn-primary">Modify Notes</button></td>
                            <td><button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button></td>
                            
                        </tr>`;
        html += uiString;

    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        tableBody.innerHTML = html;
        tableNT.innerHTML = "";
    } else {
        tableBody.innerHTML = html;
        tableNT.innerHTML = `Nothing to show! Use "Add Book" section above to add a book.`;

    }
}



function deleteNote(index) {
    //   console.log("I am deleting", index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


function modifyNote(index) {
    // console.log("modifying notes");s
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    document.getElementById('bookName').value = notesObj[index].name;
    document.getElementById('author').value = notesObj[index].author;
    let type = notesObj[index].type;
    // console.log(type);
    if (type == "fiction") {
        $("#fiction").prop("checked", true);
    }
    else if (type == "programming") {
        $("#programming").prop("checked", true);
    }
    else if (type == "cooking") {
        $("#cooking").prop("checked", true);
    }
    else {
        $("#other").prop("checked", true);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

