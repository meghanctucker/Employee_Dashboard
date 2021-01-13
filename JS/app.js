//global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlayInfo");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");



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
  }
});

modalClose.addEventListener('click', () => {
  overlay.classList.add("hidden");
});

//fetch data from API

fetch(urlAPI)
  .then(res => res.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch(err => console.log(err))
