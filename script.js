// Function to display the current day
function displayCurrentDay() {
  var currentDate = new Date();
  var options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  var formattedDate = currentDate.toLocaleDateString('en-US', options);
  document.getElementById("currentDay").textContent = formattedDate;
}

// Function to generate time blocks
function generateTimeBlocks() {
  var currentTime = new Date().getHours();

  for (var hour = 9; hour <= 17; hour++) {
    var timeBlock = document.createElement("div");
    timeBlock.classList.add("time-block");

    var hourText = document.createElement("div");
    hourText.classList.add("hour");
    hourText.textContent = formatHour(hour);

    var description = document.createElement("textarea");
    description.classList.add("description");
    description.value = getEventFromLocalStorage(hour);

    var removeBtn = document.createElement("button");
    removeBtn.classList.add("confirmBtn");
    removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
    removeBtn.addEventListener("click", removeEvent.bind(null, hour, description));

    var completeBtn = document.createElement("button");
    completeBtn.classList.add("deleteBtn");
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    completeBtn.addEventListener("click", markAsComplete.bind(null, hour, description));

    if (hour < currentTime) {
      timeBlock.classList.add("past");
    } else if (hour === currentTime) {
      timeBlock.classList.add("present");
    } else {
      timeBlock.classList.add("future");
    }

    timeBlock.appendChild(hourText);
    timeBlock.appendChild(description);
    timeBlock.appendChild(removeBtn);
    timeBlock.appendChild(completeBtn);

    document.getElementById("timeBlocks").appendChild(timeBlock);
  }
}

// Function to format hour in AM/PM format
function formatHour(hour) {
  if (hour === 12) {
    return "12PM";
  } else if (hour > 12) {
    return (hour - 12) + "PM";
  } else {
    return hour + "AM";
  }
}

// Function to get event from local storage
function getEventFromLocalStorage(hour) {
  return localStorage.getItem("event_" + hour) || "";
}

// Function to remove event and update UI
function removeEvent(hour, description) {
  localStorage.removeItem("event_" + hour);
  description.value = "";
  var timeBlock = description.parentNode;
  timeBlock.classList.remove("completed");
  timeBlock.style.backgroundColor = "";
}

// Function to mark as complete and update UI
function markAsComplete(hour, description) {
  var timeBlock = description.parentNode;

  if (timeBlock.classList.contains("completed")) {
    timeBlock.classList.remove("completed");
    description.style.backgroundColor = "";
  } else {
    timeBlock.classList.add("completed");
    description.style.backgroundColor = "green";
  }
}

// Function to save events to local storage
function saveEvents() {
  var timeBlocks = document.getElementsByClassName("time-block");

  for (var i = 0; i < timeBlocks.length; i++) {
    var timeBlock = timeBlocks[i];
    var hour = parseInt(timeBlock.querySelector(".hour").textContent);
    var description = timeBlock.querySelector(".description").value;

    localStorage.setItem("event_" + hour, description);
  }
}

// Call the necessary functions when the page loads
displayCurrentDay();
generateTimeBlocks();

// Add event listener to the save button
document.getElementById("saveBtn").addEventListener("click", saveEvents);
