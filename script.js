// Set the API key for NASA APOD (Astronomy Picture of the Day)
const API_KEY = "CgkOGhdMYLvflkBfd3kZoY1ghPvh8WY2NdpzhOxR";

// Add a click event listener to the inputButton element
const inputButton = document.querySelector("#inputButton");
inputButton.addEventListener("click", fetchData);

// Add a click event listener to the resetButton element
const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", resetDOM);

// Function to fetch data from the NASA API based on the user's input date
function fetchData() {
  const dateInput = document.querySelector("#inputDate");
  const selectedDate = dateInput.value;

  if (!isValidDate(selectedDate)) {
    alert("Please enter a date between June 16, 1995 and today.");
    return;
  }

  // Build the NASA API URL with the input date and API key
  const nasaUrl = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${selectedDate}`;

  // Fetch data from the NASA API
  fetch(nasaUrl)
    .then((response) => response.json())
    .then((data) => {
      displayInfo(data); // Display fetched data on the page
    })
    .catch((error) => console.error(error)); // Log errors to the console
  hideInputContainer(); // Hide the input container
}

// Function to display the fetched data on the page
function displayInfo(data) {
  const infoContainer = document.querySelector(".infoContainer");
  infoContainer.style.display = "flex";
  //run animation
  infoContainer.style.animationPlayState = "running";

  //background stars
  document.querySelector(".backgroundStars").style.animationPlayState =
    "running";

  //h1
  typeWriter(infoContainer.querySelector("h1"), data.title, 100);
  //h2
  typeWriter(infoContainer.querySelector("h2"), formateDate(data.date), 400);

  //image
  infoContainer.querySelector("img").src = data.url;

  //explanation
  typeWriter(infoContainer.querySelector("p"), data.explanation, 5);

  const imageLowRes = document.querySelector(".imageLowRes");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");

  imageLowRes.addEventListener("click", function () {
    lightboxImage.src = data.hdurl;

    lightbox.style.display = "flex";
  });
}
// Function to hide the lightbox
function hideLightbox() {
  lightbox.style.display = "none";
}
// Function to hide the input container
function hideInputContainer() {
  const inputContainer = document.querySelector(".inputContainer");
  inputContainer.style.display = "none";
}
// Function to format the date in the desired format
function formateDate(date) {
  const dateArray = date.split("-");
  const year = dateArray[0];
  const month = dateArray[1];
  const day = dateArray[2];

  return `${day}/${month}/${year}`;
}
// Function to create a typewriter effect for an element
function typeWriter(element, text, delay) {
  let index = 0;

  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, delay);
    }
  }

  type();
}
// Function to reset the DOM by reloading the page
function resetDOM() {
  location.reload();
}
// Function to check if the input date is within the specified range
function isValidDate(dateString) {
  const date = new Date(dateString);
  const minDate = new Date("1995-06-16");
  const today = new Date();

  if (dateString === "") {
    return true;
  } else {
    return date >= minDate && date <= today;
  }
}
