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
const cardList = document.getElementsByClassName('card');

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

    // template literal of the html
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
  <div id="finder" data-index="${index}"></div>
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



//create a search filter for employees
  //add an event listener in the searchbox, triggered by the keyup event
search.addEventListener('keyup', e => {
    //create variables for the value in the search box (filter), the cards (cardlist)
    //and an open array to store the names of employees in
    const filter = search.value.toUpperCase();

    const nameIndex = [];
  // create a loop which will place the names inside the cards into the new array
    for (let i = 0; i < cardList.length; i ++) {
        let cardName = cardList[i].children[1].children[0].innerHTML;
        nameIndex.push(cardName);
    }

      //create a loop which will compare the input on the searchbox to the list of names in the new array
        for (let i=0; i<nameIndex.length; i++){
          let txtValue = nameIndex[i];
          //if the value of the search box is the same as a name
          if(txtValue.toUpperCase().indexOf(filter)>-1){
            //do nothing to the card
           cardList[i].style.display = "";
          } else {
            //hide the card
            cardList[i].style.display = "none";
          }
        }
    });

//let finder = document.getElementById('finder').getAttribute('data-index');
    //Add a way to move back and forth between employee detail windows when the modal window is open
    //Add a "left Arrow" button to the modal
    //add a "right arrow" button to the modal
    //left arrow.addEventListener('click')... show the employee modal -1 in the array.
    back.addEventListener('click', e => {
      let finder = document.getElementById('finder').getAttribute('data-index');
      //filter through dataIndex and if the value of dataIndex == modal's data index, then do stuff
     finder -=1;
     if (finder >= 0){
     displayModal(finder);
   }  else if (finder < 0 ) {
     finder = 11;
     displayModal(finder);
     }
    });


    //right arrow.addEventListener('click')... show the employee modal +1 in the array.
   forward.addEventListener('click', e => {
     let finder = document.getElementById('finder').getAttribute('data-index');
     //filter through dataIndex and if the value of dataIndex == modal's data index, then do stuff
    finder ++;
    if (finder >= 0 && finder < 12){
      displayModal(finder);
  }  else {
    finder = 0;
    displayModal(finder);
    }
   });
