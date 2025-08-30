const API_URL = "http://localhost:5000/users";

// Fetch and display users
async function fetchUsers() {
  const res = await fetch(API_URL);
  const users = await res.json();
  const tbody = document.querySelector("#userTable tbody");
  tbody.innerHTML = "";
  users.forEach(user => {
    tbody.innerHTML += `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>
          <button onclick="editUser('${user.id}')">Edit</button>
          <button onclick="deleteUser('${user.id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

// Add new user
async function addUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  if (!name || !email) {
    alert("Please fill out all fields");
    return;
  }

  await fetch(API_URL, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({name, email})
  });

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  fetchUsers();
}

// Edit user
async function editUser(id) {
  const newName = prompt("Enter new name:");
  const newEmail = prompt("Enter new email:");
  if (!newName || !newEmail) return;

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({name: newName, email: newEmail})
  });

  fetchUsers();
}

// Delete user
async function deleteUser(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchUsers();
}

// Initial load
fetchUsers();
