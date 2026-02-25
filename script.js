 

//  DARK / LIGHT MODE 

function toggleTheme() {
  var body = document.body;
  var btn  = document.getElementById("themeBtn");

  if (body.classList.contains("dark")) {
    // Switch to light
    body.classList.remove("dark");
    btn.textContent = "🌙 Dark";
    localStorage.setItem("theme", "light");
  } else {
    // Switch to dark
    body.classList.add("dark");
    btn.textContent = "☀ Light";
    localStorage.setItem("theme", "dark");
  }
}

// Apply saved theme when page loads
function loadTheme() {
  var saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.body.classList.add("dark");
    document.getElementById("themeBtn").textContent = "☀ Light";
  }
}


//  MOBILE MENU 

function toggleMenu() {
  var menu = document.getElementById("navLinks");
  menu.classList.toggle("open");
}

// Close menu when a nav link is clicked
function setupNavClose() {
  var links = document.querySelectorAll(".nav-links a");
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function() {
      document.getElementById("navLinks").classList.remove("open");
    });
  }
}


//  NAVBAR SHADOW ON SCROLL 

function setupNavbarScroll() {
  window.addEventListener("scroll", function() {
    var navbar = document.getElementById("navbar");
    if (window.scrollY > 40) {
      navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
    } else {
      navbar.style.boxShadow = "";
    }
  });
}


//  SKILL BAR ANIMATION 

// Animate the progress bars when the skills section scrolls into view
function setupSkillBars() {
  var done    = false;
  var section = document.getElementById("skills");

  window.addEventListener("scroll", function() {
    if (done) return;

    var top = section.getBoundingClientRect().top;

    if (top < window.innerHeight - 80) {
      done = true;

      var bars = document.querySelectorAll(".bar-fill");
      for (var i = 0; i < bars.length; i++) {
        var width = bars[i].getAttribute("data-width");
        bars[i].style.width = width + "%";
      }
    }
  });
}


//  SCROLL REVEAL 

// Add .fade-in to elements and reveal them when they enter the viewport
function setupReveal() {
  // Add fade-in class to all cards and major content blocks
  var targets = document.querySelectorAll(
    ".skill-card, .project-card, .cert-card, .timeline-card, .edu-item, .stat"
  );

  for (var i = 0; i < targets.length; i++) {
    targets[i].classList.add("fade-in");
  }

  // Check which are already visible
  checkReveal();

  // Check on scroll
  window.addEventListener("scroll", checkReveal);
}

function checkReveal() {
  var elements = document.querySelectorAll(".fade-in");

  for (var i = 0; i < elements.length; i++) {
    var el  = elements[i];
    var top = el.getBoundingClientRect().top;

    if (top < window.innerHeight - 60) {
      el.classList.add("visible");
    }
  }
}


//  CONTACT FORM VALIDATION 

function submitForm() {
  var name    = document.getElementById("name").value.trim();
  var email   = document.getElementById("email").value.trim();
  var message = document.getElementById("message").value.trim();
  var valid   = true;

  // Clear old errors
  document.getElementById("nameErr").textContent  = "";
  document.getElementById("emailErr").textContent = "";
  document.getElementById("msgErr").textContent   = "";
  document.getElementById("name").classList.remove("error");
  document.getElementById("email").classList.remove("error");
  document.getElementById("message").classList.remove("error");

  // Validate name
  if (name === "") {
    document.getElementById("nameErr").textContent = "Please enter your name.";
    document.getElementById("name").classList.add("error");
    valid = false;
  }

  // Validate email
  if (email === "") {
    document.getElementById("emailErr").textContent = "Please enter your email.";
    document.getElementById("email").classList.add("error");
    valid = false;
  } else if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    document.getElementById("emailErr").textContent = "Please enter a valid email.";
    document.getElementById("email").classList.add("error");
    valid = false;
  }

  // Validate message
  if (message === "") {
    document.getElementById("msgErr").textContent = "Please write a message.";
    document.getElementById("message").classList.add("error");
    valid = false;
  } else if (message.length < 10) {
    document.getElementById("msgErr").textContent = "Message must be at least 10 characters.";
    document.getElementById("message").classList.add("error");
    valid = false;
  }

  // Show success if all valid
  if (valid) {
    document.getElementById("contactForm").reset();
    var success = document.getElementById("successMsg");
    success.classList.add("show");

    setTimeout(function() {
      success.classList.remove("show");
    }, 4000);
  }
}


//  FOOTER YEAR 

function setYear() {
  document.getElementById("year").textContent = new Date().getFullYear();
}


//  RUN ON PAGE LOAD 

loadTheme();
setupNavClose();
setupNavbarScroll();
setupSkillBars();
setupReveal();
setYear();