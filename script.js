  const daysContainer = document.getElementById("days"),
  nextBtn = document.getElementById("next-btn"),
  prevBtn = document.getElementById("prev-btn"),
  month = document.getElementById("month"),
  modal = document.getElementById('exampleModalCentered');
  todayBtn = document.getElementById("today-btn");
  modalDate = document.getElementById("modalDate");


  // Modal input fields 

  evnTitle = document.getElementById("eventTitle");
  desc = document.getElementById("description");
  srtTime = document.getElementById("startTime");
  endTime = document.getElementById("endTime");



const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// get current date
const date = new Date();

// get current month
let currentMonth = date.getMonth();

// get current year
let currentYear = date.getFullYear();

// function to render days
function renderCalendar() {
  // get prev month current month and next month days
  date.setDate(1);
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const lastDayIndex = lastDay.getDay();
  const lastDayDate = lastDay.getDate();
  const prevLastDay = new Date(currentYear, currentMonth, 0);
  const prevLastDayDate = prevLastDay.getDate();
  const nextDays = 7 - lastDayIndex - 1;


  
  month.innerHTML = `${months[currentMonth]} ${currentYear}`;

  let days = "";

 
  for (let x = firstDay.getDay(); x > 0; x--) {
    days += `<div class="day prev">${prevLastDayDate - x + 1}</div>`;
  }

  
  for (let i = 1; i <= lastDayDate; i++) {
    const sid=i+"-"+(currentMonth+1)+"-"+currentYear;
    let btn=""
    const parsedData=JSON.parse(localStorage.getItem(sid));

    if (parsedData !== undefined && parsedData !== null) {
      // Iterate through the parsedData array
      for (const item of parsedData) {
        console.log(item);
        const eventData = JSON.parse(item.dataJson);
        console.log(eventData.event_Title);
        btn+=`<button class="evt-view">${eventData.event_Title}</button>`;
      }
    }

    if (
      i === new Date().getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
    ) {

      days += `<div class="day today" onclick="openModal('${sid}')" id="${sid}">
      <div>${btn}</div> ${i}</div>`;
    } else {
      
      days += `<div class="day" onclick="openModal('${sid}')" id="${sid}">
      <div>${btn}</div> ${i}</div>`;
    }
  }

  
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next">${j}</div>`;
  }

  
  hideTodayBtn();
  daysContainer.innerHTML = days;
}

renderCalendar();

nextBtn.addEventListener("click", () => {
  // increase current month by one
  currentMonth++;
  if (currentMonth > 11) {
    // if month gets greater that 11 make it 0 and increase year by one
    currentMonth = 0;
    currentYear++;
  }
  // rerender calendar
  renderCalendar();
});

// prev monyh btn
prevBtn.addEventListener("click", () => {
  // increase by one
  currentMonth--;
  // check if let than 0 then make it 11 and deacrease year
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

// go to today
todayBtn.addEventListener("click", () => {
  // set month and year to current
  currentMonth = date.getMonth();
  currentYear = date.getFullYear();
  // rerender calendar
  renderCalendar();
});


// lets hide today btn if its already current month and vice versa
function hideTodayBtn() {
  if (
    currentMonth === new Date().getMonth() &&
    currentYear === new Date().getFullYear()
  ) {
    todayBtn.disabled=true;
    todayBtn.classList.add("bg-secondary");
  } else {
    todayBtn.classList.remove("bg-secondary");
    todayBtn.disabled=false;
  }
}




// Modal code:


// Verify the details

function verify(title,details,srt,end){
  if(title!="" && srt!=""){
    return true;
  }
  alert("Wrong Input!");
  return false
}

function openModal(dayId) {
  var modalOverlay = document.getElementById('exampleModalCentered');
  // console.log(dayId);
  modalOverlay.style.display = 'block';
  modalDate.textContent=dayId  ;

  window.onclick = function(event) {
    if (event.target === modalOverlay) {
      closeModal();
    }
  };
}

// Function to close the modal
function closeModal() {
  var modalOverlay = document.getElementById('exampleModalCentered');
  evnTitle.value="";
  desc.value="";
  srtTime.value="";
  endTime.value="";
  modalOverlay.style.display = 'none';
}

function saveData(){
  const title=evnTitle.value.trim();
  const details = desc.value.trim();
  const srt = srtTime.value.trim();
  const end = endTime.value.trim();
  if(verify(title,details,srt,end)){
    const date = modalDate.textContent;
    const data={
      event_Title: title,
      description: details,
      start_Time: srt,
      end_Time: end
    };
    const dataJson= JSON.stringify(data)
    // localStorage.setItem(key,dataJson);
    // console.log(data);
    // console.log(dataJson);
    // alert("Data is saved");



    const existingData = JSON.parse(localStorage.getItem(date)) || [];

    // Add the new data to the array
    existingData.push({dataJson});
    // Save the updated array back to localStorage
    localStorage.setItem(date, JSON.stringify(existingData));

    closeModal();
    renderCalendar();
  }
}

// localStorage.clear()