let slideIndex = 1;
showSlides(slideIndex);

// Next/Previous Controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail/Dot Controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

// Main Slideshow Function
function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");

  // Reset to first slide if at the end
  if (n > slides.length) {
    slideIndex = 1;
  }

  // Go to last slide if at the beginning
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Remove "active" class from all dots
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Show the current slide and activate the corresponding dot
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Auto-Play Slideshow (Optional)
function autoPlay() {
  plusSlides(1);
  setTimeout(autoPlay, 3000); // Change slide every 3 seconds
}

// Start auto-play (optional)
autoPlay();

document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    var openForm = document.getElementById("openForm"); // Open button (nav link)
    var popupForm = document.getElementById("popupForm"); // Popup container
    var closeBtn = document.getElementById("closeForm"); // Close button
    var consultationForm = document.getElementById("consultationForm"); // Form
    var messageContainer = document.getElementById("messageContainer"); // Success message container
  
    // Function to open the popup
    function openPopup() {
      popupForm.style.display = "flex"; // Show popup
      consultationForm.style.display = "block"; // Show form
      messageContainer.style.display = "none"; // Hide success message
      consultationForm.reset(); // Reset form fields
    }
  
    // Open popup when clicking "Free Consultation"
    openForm.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default action
      openPopup();
    });
  
    // Close popup when clicking "X"
    closeBtn.addEventListener("click", function () {
      popupForm.style.display = "none"; // Hide popup
    });
  
  })

  // Handle form submission
document.getElementById("consultationForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission

  // Get form data
  const formData = new FormData(this);

  // Convert FormData to a plain object
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  // Send form data to the server using fetch
  fetch("/request-consultation", {
    method: "POST",
    body: JSON.stringify(formObject), // Convert to JSON
    headers: {
      "Content-Type": "application/json", // Set the correct content type
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        // Hide the form and display the success message
        document.getElementById("consultationForm").style.display = "none";
        document.getElementById("messageContainer").textContent = data.message;
        document.getElementById("messageContainer").style.display = "block";
      } else {
        alert("Error: " + data.message); // Handle error
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while sending the message.");
    });
});








