
function formatDate(date) {
    // Ensure the date is a valid Date object
    if (!(date instanceof Date) || isNaN(date)) {
        return "Invalid Date";
    }

    // Get the month, day, and year
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();
    const year = date.getFullYear();

    // Pad single digits with leading zeros (optional)
    const paddedMonth = month.toString().padStart(2, '0');
    const paddedDay = day.toString().padStart(2, '0');

    // Construct the formatted date string
    return `${paddedMonth}/${paddedDay}/${year}`;
}
function formatList(list){
  let formattedList = "";
  for (let i = 0; i < list.length; i++) {
    formattedList += `${list[i]} <br>`;
  }
  return formattedList;
}
function isNew(date) {
    // Ensure the input is a valid Date object
    if (!(date instanceof Date) || isNaN(date)) {
        throw new Error("Invalid Date object");
    }

    // Get the current date and time
    const now = new Date();

    // Calculate the difference in milliseconds
    const difference = now - date;

    // Convert the difference to hours
    const differenceInHours = difference / (1000 * 60 * 60);

    // Check if the difference is less than 24 hours
    return differenceInHours <= 48;
}

function annTrim(text){
  if(text.length < 30){
    return text;
  }else return text.substr(0, 200);
}
let competitionResults = [
  {
    date: new Date(2024, 4, 18),
    pic: "2024NationalMathleagueChampionship.jpeg",
    name: "2024 National Mathleague Championship",
    loc: "Washington University, St. Louis",
    overallResults: ["1st Place school overall with a total of 286.5 points"],
    individualResults: ["Aiden Zhang ’27 — 5th place, 9th grade individual","Edward Li ’26 — 2nd place, 10th grade individual and 7th place overall ", "Catherine Xu ’26 — 4th place, 10th grade individual and 10th place overall "],
    teamResults: ["1st place, Team Test: Aiden Zhang, Edward Li, Catherine Xu, Kyros Wu, Kai Merrill, Andrew Chen", "2nd place, Relay Round: Edward Li, Kyros Wu, Aiden Zhang"]
  },
  {
    date: new Date(2024, 10, 6),
    pic: "2024platteville.jpg",
    name: "51st Annual University of Wisconsin-Platteville Mathematics Meet",
    loc: "University of Wisconsin-Platteville",
    overallResults: ["1st place team"],
    individualResults: ["Helena Yang - perfect score", "Raphy Policeni - perfect score"],
    teamResults: ["All-Academic Team members:", "Level 1: Helena Yang, Raphy Policeni, Maximilian Hing, Awen Li, Tommy Gao" , "Level 2: Kai Merrill, Steve Zeng, Aiden Zhang, Jaynou Ma"]
  }
]
let categories = [{
  name: "Special Events",
  color: "#90EE90"
}, {
  name: "Math Competitions",
  color: "#f05d5d"
},{
  name: "Math Exam",
  color: "#f0cb5d"
}]
let events = [
  {
    date: "2024-8-11",
    title: "Club Fair",
    category: 0
  },
  {date:"2024-9-25",
    title: "Regina Math Contest",
    category: 1
  },
  {
    date: "2024-10-6",
    title: "Platteville Math Contest",
    category: 1
  },
  {
    date: "2024-10-6",
    title: "AMC",
    category: 2
  },
  {date:"2024-10-16",
    title: "West Math Contest",
    category: 1
  },
  {
    date: "2025-3-10",
    title: "Mathleague state qualifier",
    category: 1
  },
  {
    date: "2025-3-16",
    title: "Mankato math contest",
    category: 1
  },
  {
    date: "2025-3-17",
    title: "Mankato math contest",
    category: 1
  }
  ,  {
    date: "2025-3-26",
    title: "Mathleague state",
    category: 1
  }
]
let annoucements = [
  {
    date: new Date(2024, 5, 1),
    message: "ARML Contest today"
  },
  {
      date: new Date(2024, 4, 22),
      message: "Math club banquet today"
  }
 ]
annoucements.sort(function(a, b) {
  return b.date - a.date;
})
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add the visible class to start the fade-in effect
      console.log("hello");
      entry.target.classList.add("showed")
      // Unobserve the element after it becomes visible
      observer.unobserve(entry.target);
    }
  });
});

// Observe the target element
document.querySelectorAll("fade-in").forEach(element => {
  observer.observe(element);
})



const annCon = document.getElementById("announcement-container");
annCon.innerHTML = "";

for(let i=0; i < annoucements.length; i++){
  ann = annoucements[i];
  annCon.innerHTML += `<div class="announcement" id="ann-${i}">
       <div class="left"><div class="dot ${isNew(ann.date) ? "red" : "hide" }"><i class="fa-solid fa-circle"></i></div>
        <div class="date">${formatDate(ann.date)}</div></div>
        <div class="ann-text">${ann.message}</div>
  </div>`
}

const resultCon = document.getElementById("result-container");

 resultCon.innerHTML = "";

 for (let i = 0; i < competitionResults.length; i++) {
  let result = competitionResults[i];
  
  // Create a container for the result
  const resultDiv = document.createElement("div");
  resultDiv.classList.add("result");
  resultDiv.id = `result-${i}`;
  
  resultDiv.innerHTML = `
    <div class="left">
      <div class="big-dot"><i class="fa-solid fa-caret-down"></i></div>
      <div class="date">${formatDate(result.date)}</div>
    </div>
    <div class="ann-text">${result.name}</div>
  `;

  const dropdownDiv = document.createElement("div");
  dropdownDiv.classList.add("result-dropdown", "grid-section", "one-picture-layout", "none");
  dropdownDiv.id = `dropdown-${i}`;
  
  dropdownDiv.innerHTML = `
    <img class="section-pic" src="competition/${result.pic}" height="500px" />
    <div class="result-text">
      <h1 class="result-title">${result.name}</h1>
      <p class="result-paragraph">${formatDate(result.date)}</p>
      <p class="result-paragraph">${result.loc}</p>
      <h2 class="result-subheading">Overall Results</h2>
      <p class="result-paragraph">${formatList(result.overallResults)}</p>
      <h2 class="result-subheading">Team Results</h2>
      <p class="result-paragraph">${formatList(result.teamResults)}</p>
      <h2 class="result-subheading">Individual Results</h2>
      <p class="result-paragraph">${formatList(result.individualResults)}</p>
    </div>
  `;

  resultCon.appendChild(resultDiv);
  resultCon.appendChild(dropdownDiv);

  // Attach the event listener
  resultDiv.addEventListener("click", () => {
    if (dropdownDiv.classList.contains("none")) {
      resultDiv.querySelector(".big-dot").innerHTML = `<i class="fa-solid fa-caret-up"></i>`;
      dropdownDiv.classList.remove("none");
    } else {
      resultDiv.querySelector(".big-dot").innerHTML = `<i class="fa-solid fa-caret-down"></i>`;
      dropdownDiv.classList.add("none");
    }
  });
}

// calendar
const calendarTable = document.getElementById("calendar");

const calendarHeader = document.getElementById('calendar-header');
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const dayInAMonth= [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();


let years = [2024, 2025];
let days = [];
weekdays.forEach(weekday => calendarHeader.innerHTML += `<div class="cal-heading">${weekday}</div>`);

let firstDay = new Date(years[0], 0);
for(let i=0; i < firstDay.getDay(); i++){
  days.push("dummy");
}
for(let yearIndex=0; yearIndex < years.length; yearIndex++){
  for(let i=0; i < 12; i++){
    let daysNum = dayInAMonth[i];
    if(years[yearIndex] % 4 == 0 & i == 1){
      daysNum++;
    }
    for(let j=1; j <= daysNum; j++){
      days.push({ year: years[yearIndex], month: i, day: j })
    }
  }
}

days.forEach(day => {
  if(day == "dummy"){
    calendarTable.innerHTML += `<div class="blank-cell"></div>`
  } else {
    calendarTable.innerHTML += `<div class="cal-day" id="${day.year}-${day.month}-${day.day}">${day.day}</div>`
  }
  
})


const yearSelect = document.getElementById("year");

years.forEach(year => {
  yearSelect.innerHTML += `<option value="${year}" id="${year}">${year}</option>`;
  
})
const monthSelect = document.getElementById("month");

for(let i=0; i < 12; i++){
  monthSelect.innerHTML += `<option value="${i}">${months[i]}</option>`;
}

yearSelect.value = currentYear;
monthSelect.value = currentMonth;


function calendarChange(){
    // document.getElementById(`${currentYear}-${currentMonth}-1`).scrollIntoView({ behavior: 'smooth', block: 'start' });
    const targetElement = document.getElementById(`${currentYear}-${currentMonth}-1`);

    // Calculate the offset of the target element relative to the container
    const containerTop = calendarTable.getBoundingClientRect().top;
    const elementTop = targetElement.getBoundingClientRect().top;

    // Calculate the scroll position inside the calendarTable
    const scrollPosition = calendarTable.scrollTop + (elementTop - containerTop);

    // Scroll the container smoothly
    calendarTable.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
}
monthSelect.addEventListener("change", () => {
  currentMonth = monthSelect.value;
  calendarChange();
})

yearSelect.addEventListener("change", () => {
  currentYear = yearSelect.value;
  calendarChange();
})


calendarChange();

events.forEach(event => {
  document.getElementById(event.date).innerHTML += `<div class="event" style="background-color: ${categories[event.category].color};">${event.title}</div>`
})


document.getElementById(`${currentYear}-${currentMonth}-${new Date().getDate()}`).classList.add("cal-today");
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const daysInMonthLeapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function getHighestVisibleElement() {
  for (let i=0; i <  years.length; i++){
    for(let j=0; j < 12; j++){
      const element = document.getElementById(`${years[i]}-${j}-8`);
        // console.log(element);
        const elementTop = element.offsetTop-calendarTable.offsetTop;
        const elementBottom =  element.offsetHeight;
      //   console.log(elementTop);
      // console.log(elementBottom)
      // console.log(containerTop)
        // Check if the element is visible within the container
        // if (elementTop < containerBottom && elementBottom > containerTop) {
          if(elementTop + elementBottom > calendarTable.scrollTop){
             return {year: years[i], month: j}
          }
         
        // }
      }
  }
    
}

calendarTable.addEventListener("scroll", () => {
  const stuff = getHighestVisibleElement();
  if(stuff.month != currentMonth || stuff.year != currentYear){
    currentMonth = stuff.month;
    currentYear = stuff.year;
    monthSelect.value = currentMonth
    yearSelect.value = currentYear
  }
})