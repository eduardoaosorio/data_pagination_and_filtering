/**
 * Creates and inserts the student elements needed to display a "page" of at least nine students
 *
 * @param {array} list - Array containing student objects
 * @param {number} page - Page to be displayed
 */
function showPage(list, page) {
   const startIndex = (page * 9) - 9;
   const endIndex = page  * 9;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         const student = `
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
               <h3>${list[i].name.first} ${list[i].name.last}</h3>
               <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${list[i].registered.date}</span>
            </div>
         </li>
         `;
         studentList.innerHTML += student;
      }
   }
}

/**
 * Creates and inserts the elements needed for the pagination buttons
 *
 * @param {array} list - Array containing student objects
 */
function addPagination(list) {
   const numOfPages = Math.ceil(list.length / 9)
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   for (let i = 1; i <= numOfPages; i++) {
      const pageButton = `
      <li>
         <button type="button">${i}</button>
      </li>
      `;
      linkList.innerHTML += pageButton;
   }
   linkList.querySelector('button').classList.add('active');
   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         document.querySelector('.active').classList.remove('active');
         e.target.classList.add('active');
         showPage(list, e.target.textContent);
      }
   });
}

/**
 * Searches students, creates and inserts the student elements and pagination buttons according to search results
 *
 * @param {object} searchInput - Search bar input element
 * @param {array} list - Array containing student objects
 */
function searchStudents(searchInput, list) {
   const matchesFound = [];
   /* Note: matchesNotFound is used later on as a way to differentiate between 2 distinct scenarios: 
   
      1) No matches due to an empty search bar (we want to show all students in this case)
      2) No matches because the input text didn't garner any match (we want to display a "no matches found" message)*/
   let matchesNotFound = 0; 
   for (let i = 0; i < list.length; i++) {
      const studentFullName = `${list[i].name.first} ${list[i].name.last}`;
      if (
         searchInput.value.length !== 0 &&
         studentFullName
            .toLowerCase()
            .includes(searchInput.value.toLowerCase())
      ) {
         matchesFound.push(list[i]);
      } else if (searchInput.value.length !== 0) {
         matchesNotFound++;
      }
   }
   const studentList = document.querySelector('.student-list');
   const linkList = document.querySelector('.link-list')
   if (matchesNotFound === list.length) {
      studentList.innerHTML = `
         <li class="student-item cf">
            <h3>No matches found</h3>
         </li>`;
         linkList.classList.add('hidden');
   } else if (matchesFound.length !== 0) {
      if (linkList.classList.contains('hidden')) linkList.classList.remove('hidden');
      showPage(matchesFound, 1);
      addPagination(matchesFound);
   } else {
      if (linkList.classList.contains('hidden')) linkList.classList.remove('hidden');
      showPage(list, 1);
      addPagination(list);
   }
 }

 // Add search bar using JavaScript when the page loads
 document.querySelector('.header').innerHTML += `
   <label for="search" class="student-search">
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
`;

// Select the search bar's input element
const searchInput = document.querySelector('#search');

// Event listener to detect and analyze input to find students
searchInput.addEventListener('input', (e) => {
   searchStudents(searchInput, data);
})

// Functions calls to load page data the first the page loads
showPage(data, 1);
addPagination(data);