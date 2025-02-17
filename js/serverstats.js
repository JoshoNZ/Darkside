//  ____             _        _     _         ____                _           _     _     _  __        ____  ____  
// |  _ \  __ _ _ __| | _____(_) __| | ___   / ___|___  _ __ ___ | |__   __ _| |_  | |   (_)/ _| ___  |  _ \|  _ \ 
// | | | |/ _` | '__| |/ / __| |/ _` |/ _ \ | |   / _ \| '_ ` _ \| '_ \ / _` | __| | |   | | |_ / _ \ | |_) | |_) |
// | |_| | (_| | |  |   <\__ \ | (_| |  __/ | |__| (_) | | | | | | |_) | (_| | |_  | |___| |  _|  __/ |  _ <|  __/ 
// |____/ \__,_|_|  |_|\_\___/_|\__,_|\___|  \____\___/|_| |_| |_|_.__/ \__,_|\__| |_____|_|_|  \___| |_| \_\_|    
//                                                                                                                 
// Update the HTML with the buttons
const restartDiv = document.getElementById("restart");
restartDiv.innerHTML = `
  <button class="btn btn-dark" >
    Restarts Are 1PM NZST (11AM AEST, 6PM PST)
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
  fetch("https://arma3-servers.net/api/?object=servers&element=detail&key=BsxSq49CKBgjjGBGmZTvLekvJKoxJEIDBd")
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
      const ipAddress = "203.10.96.195";
      const port = "2393";
      const steamLink = `steam://rungameid/107410// +connect ${ipAddress}:${port}`;
      if (isOnline === "0") {
        dataDiv.innerHTML = `
          <button class="btn btn-secondary btn-lg" data-bs-toggle="tooltip" data-bs-placement="top" title="Check Back Soon">Server Offline</button>
        `;
      } else if (currentPlayers === "0") {
        dataDiv.innerHTML = `
          <button class="btn btn-success btn-lg" onclick="openSteamLink('${steamLink}')" data-bs-toggle="tooltip" data-bs-placement="top" title="Click To Join">Be The First</button>
        `;
      } else if (currentPlayers === maxPlayers) {
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
