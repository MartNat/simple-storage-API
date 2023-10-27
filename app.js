const localStorage = window.localStorage;

function initialize() {
  if (localStorage) {
    const count = localStorage.getItem("visitCount");
    if (count === null) {
      localStorage.setItem("visitCount", 1); // Initialize to 1 for the first visit
    } else {
      const newCount = parseInt(count) + 1;
      localStorage.setItem("visitCount", newCount);
    }
  }
  updateDOM();
}

function updateDOM() {
  const count = localStorage.getItem("visitCount") || 0;
  const storedPreferences = localStorage.getItem("preferences");
  const preferences = storedPreferences ? JSON.parse(storedPreferences) : {};
  document.getElementById("visitCount").innerHTML = `Visit count: ${count}`;
  document.getElementById("name").value = preferences.name || "";
  document.getElementById("email").value = preferences.email || "";
}

function savePreferences() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const preferences = { name: name, email: email };
  const preferencesJSON = JSON.stringify(preferences);
  localStorage.setItem("preferences", preferencesJSON);
  updateDOM();
}

const saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", savePreferences);

const nameInput = document.getElementById("name");
nameInput.addEventListener("change", savePreferences);

initialize(); // Call initialize function to increment visit count and update the DOM when the page loads
