
// Update the HTML with the buttons
const restartDiv = document.getElementById("restart");
restartDiv.innerHTML = `
  <button class="btn btn-dark" >
    Restarts Are 5PM NZST (3PM AEST)
  </button>
`;
const discordtDiv = document.getElementById("discord");
discordtDiv.innerHTML = `
  <button class="btn btn-primary" >
    Join our discord for more info
  </button>
`;

// Function to fetch and update the server data
function fetchAndUpdateServerData() {
  fetch("https://arma3-servers.net/api/?object=servers&element=detail&key=mQTIae48FOQT1WIT8eD96C9aykyzCp8zQX")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch data. Status: " + response.status);
      }
      return response.json(); // Parse the response as JSON
    })
    .then(data => {
      // Extract the desired values
      const { maxplayers: maxPlayers, players: currentPlayers, is_online: isOnline } = data;

      // Update the HTML based on the "is_online" value and player count
      const dataDiv = document.getElementById("data");
      const ipAddress = "103.212.227.29:2302";
      const steamLink = `steam://rungameid/107410// +connect ${ipAddress}`;
      if (isOnline === "0") {
        dataDiv.innerHTML = `
          <button class="btn btn-secondary btn-lg" data-bs-toggle="tooltip" data-bs-placement="top" title="Check Back Soon">Server Offline</button>
        `;
      } else if (currentPlayers === "0") {
        dataDiv.innerHTML = `
          <button class="btn btn-success btn-lg" onclick="openSteamLink('${steamLink}')" data-bs-toggle="tooltip" data-bs-placement="top" title="Click To Join">Be The First</button>
        `;
      } else if (currentPlayers === "120") {
        dataDiv.innerHTML = `
          <button class="btn btn-success btn-lg" onclick="openSteamLink('${steamLink}')" data-bs-toggle="tooltip" data-bs-placement="top" title="Server At Max">Were Overflowing, ${currentPlayers}/${maxPlayers} </button>
        `;
      } else {
        dataDiv.innerHTML = `
          <button class="btn btn-danger btn-lg" onclick="openSteamLink('${steamLink}')" data-bs-toggle="tooltip" data-bs-placement="top" title="Click To Join">
           Join ${currentPlayers}/${maxPlayers} Players
          </button>
        `;
      }
      // Initialize Bootstrap tooltip
      const tooltipTriggerEl = document.querySelector("#data [data-bs-toggle='tooltip']");
      const tooltip = new bootstrap.Tooltip(tooltipTriggerEl);
    })
    .catch(error => {
      console.error("Error:", error);
      const dataDiv = document.getElementById("data");
      dataDiv.innerHTML = `
        <button class="btn btn-secondary btn-lg">Server Offline</button>
      `;
    });
}

// Function to open Steam link
function openSteamLink(link) {
  window.location.href = link;
}

// Fetch and update the server data immediately
fetchAndUpdateServerData();

// Schedule periodic updates every 30 seconds
setInterval(fetchAndUpdateServerData, 30000);
