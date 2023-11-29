// Function to add the book details to the reading list
function addToReadingList() {
  // Get the image URL
  var imageUrl = document.getElementById("image").getAttribute("src");

  // Get the reading list from localStorage or initialize an empty array
  var readingList = JSON.parse(localStorage.getItem("readingList")) || [];

  // Add the current image URL to the reading list
  readingList.push(imageUrl);

  // Store the updated reading list back to localStorage
  localStorage.setItem("readingList", JSON.stringify(readingList));

  // Optionally, you can navigate to another page here
  window.location.href = "/list"; // Change "/reading-list" to the actual URL of your reading list page
}
