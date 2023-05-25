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

    var saveBtn = document.createElement("button");
    saveBtn.classList.add("saveBtn");
    saveBtn.innerHTML = '<i class="fas fa-save"></i>';
    saveBtn.addEventListener("click", saveEventToLocalStorage.bind(null, hour));

    if (hour < currentTime) {
      timeBlock.classList.add("past");
    } else if (hour === currentTime) {
      timeBlock.classList.add("present");
    } else {
      timeBlock.classList.add("future");
    }

    timeBlock.appendChild(hourText);
    timeBlock.appendChild(description);
    timeBlock.appendChild(saveBtn);

    document.getElementById("timeBlocks").appendChild(timeBlock);
  }
}

// Helper function to format the hour
function formatHour(hour) {
  var suffix = hour >= 12 ? "PM" : "AM";
  var formattedHour = hour % 12 || 12;
  return formattedHour + suffix;
}

// Function to get event from local storage
function getEventFromLocalStorage(hour) {
  return localStorage.getItem("event_" + hour) || "";
}

// Function to save event to local storage
function saveEventToLocalStorage(hour) {
  var description = document.querySelector("#timeBlocks #hour-" + hour + " .description").value;
  localStorage.setItem("event_" + hour, description);
}

// Call the necessary functions when the page loads
displayCurrentDay();
generateTimeBlocks();
