document.addEventListener("DOMContentLoaded", () => {
  const userCardsContainer = document.getElementById("userCards");
  const genderFilter = document.getElementById("gender");
  const ageFilter = document.getElementById("age");
  const filterBtn = document.getElementById("filterBtn");
  const generateBtn = document.getElementById("generateBtn");

  if (
    !userCardsContainer ||
    !genderFilter ||
    !ageFilter ||
    !filterBtn ||
    !generateBtn
  ) {
    console.error("One or more elements are missing in the HTML.");
    return;
  }

  async function fetchUsers() {
    try {
      const response = await fetch("https://randomuser.me/api/?results=20");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Failed to fetch users:", error);
      return [];
    }
  }

  function displayUsers(users) {
    userCardsContainer.innerHTML = "";
    users.forEach((user) => {
      const userCard = document.createElement("div");
      userCard.className = "bg-white p-4 rounded-lg shadow-md";
      userCard.innerHTML = `
                <img src="${user.picture.large}" alt="${user.name.first}" class="w-24 h-24 rounded-full mx-auto">
                <h2 class="text-xl font-bold text-center mt-2">${user.name.first} ${user.name.last}</h2>
                <p class="text-center text-gray-600">${user.gender}, ${user.dob.age} years old</p>
                <p class="text-center text-gray-600">${user.email}</p>
            `;
      userCardsContainer.appendChild(userCard);
    });
  }

  function filterUsers(users) {
    const gender = genderFilter.value;
    const age = ageFilter.value;
    return users.filter((user) => {
      return (
        (gender === "" || user.gender === gender) &&
        (age === "" || user.dob.age == age)
      );
    });
  }

  filterBtn.addEventListener("click", async () => {
    const users = await fetchUsers();
    const filteredUsers = filterUsers(users);
    displayUsers(filteredUsers);
  });

  generateBtn.addEventListener("click", async () => {
    const users = await fetchUsers();
    console.log(users);

    displayUsers(users);
  });

  // Initial fetch and display
  fetchUsers().then(displayUsers);
});
