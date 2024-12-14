// Handle the register form submission
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
  
    // Send the registration data to the backend
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await response.json();
  
    if (data.message) {
      alert(data.message);
    } else {
      alert('Error: ' + data.message);
    }
  });
  
  // Fetch all diary entries from the backend and display them
  async function fetchEntries() {
    const response = await fetch('http://localhost:5000/api/diary');
    const entries = await response.json();
  
    const entriesContainer = document.getElementById('entries');
    entriesContainer.innerHTML = ''; // Clear previous entries
  
    entries.forEach(entry => {
      const entryDiv = document.createElement('div');
      entryDiv.classList.add('diary-entry');
      entryDiv.innerHTML = `
        <h3>${entry.title}</h3>
        <p>${entry.content}</p>
        <small>${new Date(entry.date).toLocaleString()}</small>
      `;
      entriesContainer.appendChild(entryDiv);
    });
  }
  
  // Handle form submission to add a new diary entry
  document.getElementById('diary-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
  
    // Send the new entry to the backend
    const response = await fetch('http://localhost:5000/api/diary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });
  
    // Clear the form and fetch the updated entries
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    fetchEntries();
  });
  
  // Load the entries when the page loads
  window.onload = fetchEntries;
  