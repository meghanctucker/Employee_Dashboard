//global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlayInfo");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const search = document.getElementById('searchBox');
const back = document.getElementById('leftArrow');
const forward = document.getElementById('rightArrow');
let count = [];

function displayEmployees(employeeData) {
  employees = employeeData;

  //store the employee HTML as we create it
  let employeeHTML = '';

  //loop through each employee and create HTML markup
  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    // template literals makethis so much cleaner!
    employeeHTML += `
      <div class="card" data-index="${index}">
        <img class="avatarImage" src="${picture.large}" />
        <div class="avatarInfo">
          <p class="avatarName">${name.first} ${name.last}</p>
          <p class="avatarEmail">${email}</p>
          <p class="avatarLocation">${city}</p>
        </div>
      </div>
    `
  });

  gridContainer.innerHTML = employeeHTML;
}


function displayModal(index) {

  // use object destructuring make our template literal cleaner
  let { name, dob, phone, email, location: { city, street, state, postcode}, picture } = employees[index];

  let date = new Date(dob.date);

  const modalHTML = `
  <img class="avatarImage" src="${picture.large}" />
  <div class="text-container">
    <p class="avatarName">${name.first} ${name.last}</p>
    <p class="avatarEmail">${email}</p>
    <p class="avatarLocation">${city}</p>
    <hr />
    <p>${phone}</p>
    <p class="avatarAddress"> ${street.number} ${street.name}, ${state} ${postcode}</p>
    <p>Birthday:
    ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
  `;

  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
}

gridContainer.addEventListener('click', e => {

  //make sure the click is not on the gridContainer itself
  if (e.target !== gridContainer) {

    // select the card element based on its proximity to actual element clicked
    const card = e.target.closest(".card");
    const index = card.getAttribute('data-index');

    displayModal(index);
   count.push(index);
  //return index;
  }
});

modalClose.addEventListener('click', () => {
  overlay.classList.add("hidden");
  count = [];
});

//Add a way to filter the driectory by name.
  //create search box
  //const seach
    //don't have to rely on the API to return search results.
    //refer to array of employees already created.
    //write functionality that filters result once they are already on the page
    search.addEventListener('keyup', e => {
      //a variable for the letter that was pressed
      let letter = e.key;
      //a variable to make the letter uppercase
      let newLetter = letter.toUpperCase();
        //a new array to place the letters in
      //    let letterArray = [];
      //    letterArray.push(newLetter);
      //    console.log(letterArray);
      //create a new array which stores the first and last names of each employee
      let names = employees.map((employee) => employee.name.first + " " + employee.name.last);
      console.log(names);
      let filterNames = names.filter(name => name.charAt(0) === newLetter)
      console.log(filterNames);

      //filter: search.value if matches employee
      //convert all to uppercase
      //if it matches keep the card shown
      //else hide the card
  });

  //Add a way to move back and forth between employee detail windows when the modal window is open
  //Add a "left Arrow" button to the modal
  //add a "right arrow" button to the modal
  //left arrow.addEventListener('click')... show the employee modal -1 in the array.
  back.addEventListener('click', e => {
   count -=1;
   if (count >= 0){
   displayModal(count);
  // console.log(count);
 }  else if (count < 0 ) {
   count = 11;
  // console.log(count);
   displayModal(count);
   }
  });
  //right arrow.addEventListener('click')... show the employee modal +1 in the array.
  forward.addEventListener('click', e => {
    count +=1;
    if (count <= 11){
      displayModal(count);
  //    console.log(count);
    } else if (count > 11) {
      count = 0;
  //    console.log(count);
      displayModal(count);
    }
  });
//fetch data from API

fetch(urlAPI)
  .then(res => res.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch(err => console.log(err))
