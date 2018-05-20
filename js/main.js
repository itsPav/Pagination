
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
    for( let i = 0; i < studentList; i+=1)
    {
        document.querySelectorAll('li')[i].style.display = 'none';
    }

    // show x items per page
    for( let i = 0; i < x; i+=1)
    {
        document.querySelectorAll('li')[i].style.display = 'block';
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
        document.querySelectorAll('.pagination ul li')[i].appendChild(liLink);   
        liLink.text = i+1;
    }
}


// make first button active
document.querySelectorAll('.pagination ul li a')[0].className = "active";   

// check which button was clicked
function selectPage(event) {
    let a = parseInt(event.target.text);
    // console.log(a);
    toggleActive(a);
    showPeople(a);

    // need to make current button active
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

// function createSearch() {
//     var studentSearch = document.createElement('DIV');
//     var studentInput = document.createElement('INPUT');
//     var studentButton = document.createElement('BUTTON');
//     studentSearch.className = "student-search";
//     document.querySelector('.page-header').appendChild(studentSearch);     
//     document.querySelector('.student-search').appendChild(studentInput);     
//     document.querySelector('.student-search').appendChild(studentButton);     
//     studentButton.text = "Search";
// }