
// select all list items
const listItems = document.querySelectorAll('li');

// count the number of student items
const studentList = listItems.length;

// define how many list items per page
const x = 10;

// determine num of pages
const pages = studentList / x;

createSearch();
showPage(pages,studentList);
appendPageLinks();

function showPage(pages, studentList) {
    
    // hide all list items
    hideStudents(studentList);

    // show x items per page
    for( let i = 0; i < x; i+=1)
    {
        document.querySelectorAll('li')[i].style.display = 'block';
    }
}

function hideStudents(studentList) {
    for( let i = 0; i < studentList; i+=1)
    {
        document.querySelectorAll('li')[i].style.display = 'none';
    }
}

function appendPageLinks() {
    // add pagination after ul element
    var pagination = document.createElement('DIV');
    pagination.className = "pagination";
    document.getElementsByClassName('page')[0].appendChild(pagination);     

    // create ul in pagination class
    var paginationUL = document.createElement('UL');
    document.getElementsByClassName('pagination')[0].appendChild(paginationUL);
    document.querySelector('.pagination').addEventListener('click', selectPage);

    // loop to create lis in the ul
    for (let i = 0; i < pages; i += 1)
    {
        var paginationLI = document.createElement('LI');
        document.querySelector('.pagination ul').appendChild(paginationLI);     
    }

    // loop to create a's in lis
    for (let i = 0; i < pages; i += 1)
    {
        var liLink = document.createElement('a');
        liLink.innerHTML = i+1;
        liLink.setAttribute('href', '#');
        document.querySelectorAll('.pagination ul li')[i].appendChild(liLink);   
    }
}


// make first button active
document.querySelectorAll('.pagination ul li a')[0].className = "active";   

// check which button was clicked
function selectPage(event) {
    let a = parseInt(event.target.text);
    // console.log(a);

    noStudents.style.display = 'none';
    // need to make current button active
    toggleActive(a);

    showPeople(a);
}

function toggleActive(a) {

    // loop through all page buttons and make not active
    for (let i = 0; i < pages; i += 1)
    {
        document.querySelectorAll('.pagination ul li a')[i].className = "";
    }

    // make selected one active
    document.querySelectorAll('.pagination ul li a')[a-1].className = "active";
}

// show the page specific people
function showPeople(a) {
    let newPageMax = a * x;
    let newPageMin = newPageMax - x;

    if(newPageMax>studentList){
        newPageMax = studentList;
    }
    
    // hide old 
    for( let i = 0; i < studentList; i+=1)
    {
        document.querySelectorAll('li')[i].style.display = 'none';
    }
    // show new
    for( let i = newPageMin; i < newPageMax; i+=1)
    {
        document.querySelectorAll('li')[i].style.display = 'block';
    }
}

function createSearch() {
    var studentSearch = document.createElement('DIV');
    studentSearch.className = "student-search";

    var studentInput = document.createElement('INPUT');
    studentInput.setAttribute('placeholder', 'Search for students...');

    var studentButton = document.createElement('BUTTON');
    studentButton.innerHTML = 'Search';

    document.querySelector('.page-header').appendChild(studentSearch);     
    document.querySelector('.student-search').appendChild(studentInput);     
    document.querySelector('.student-search').appendChild(studentButton);   
    
    studentButton.addEventListener('click', searchStudents);
}

function searchStudents(){

    // get the value from the input field
    var studentName = document.getElementsByTagName("input")[0].value;

    // hide all students
    hideStudents(studentList);

    // check students name or email
    displayMatch(studentName);
}

// add div that says 'no matching students'
var noStudents = document.createElement('DIV');
noStudents.innerHTML = "No students found.";
document.querySelector('.student-list').appendChild(noStudents);
// turn it off
noStudents.style.display = 'none';

function displayMatch(studentName) {

    if(studentName.length < 1){
        noStudents.style.display = 'block';
        return;
    }

    noStudents.style.display = 'display';
    
    // count matching students
    for (let i = 0; i < studentList; i += 1)
    {
        var matchedStudents = 0;
        // check if student name or email matches input value
        if(document.querySelectorAll('h3')[i].innerHTML.includes(studentName) || document.querySelectorAll('.email')[i].innerHTML.includes(studentName))
        {
            document.querySelectorAll('li')[i].style.display = 'block';
            matchedStudents += 1;
        }
    }   

    // if student does not exist, don't show "no match" text
    for (let i = 0; i < studentList; i += 1) {
        if(document.querySelectorAll('li')[i].style.display == 'block') {
            noStudents.style.display = 'none';
            return;
        } else {
            noStudents.style.display = 'block';
        }
    }
}