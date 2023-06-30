
// Update the HTML with the countdown button
const countdownDiv = document.getElementById("countdown");
countdownDiv.innerHTML = `
  <button class="btn btn-dark" >
    Restarts Are
  </button>
`;
const countdownDiv2 = document.getElementById("countdown2");
countdownDiv2.innerHTML = `
  <button class="btn btn-dark">
    5PM NZST (3PM AEST)
  </button>
`;

// Make a request to the API...
fetch("https://arma3-servers.net/api/?object=servers&element=detail&key=Kct2q4OHYjKQcK0So9fxItddzI8kvnafrg")
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to fetch data. Status: " + response.status);
    }
    return response.json(); // Parse the response as JSON
  })
  .then(data => {
    // Extract the desired values
    const { maxplayers: maxPlayers, players: currentPlayers, is_online: isOnline } = data;

    // Update the HTML based on the "is_online" value
    const dataDiv = document.getElementById("data");
    if (isOnline === "0") {
      dataDiv.innerHTML = `
        <button class="btn btn-secondary btn-lg">Server Offline</button>
      `;
    } else {
      const ipAddress = "121.99.242.246:2302";
      const steamLink = `steam://rungameid/107410// +connect ${ipAddress}`;
      dataDiv.innerHTML = `
        <button class="btn btn-danger btn-lg" onclick="openSteamLink('${steamLink}')" data-bs-toggle="tooltip" data-bs-placement="top" title="Click To Join">
         Join ${currentPlayers}/${maxPlayers} Players
        </button>
      `;
      // Initialize Bootstrap tooltip
      const tooltipTriggerEl = document.querySelector("#data [data-bs-toggle='tooltip']");
      const tooltip = new bootstrap.Tooltip(tooltipTriggerEl);
    }
  })
  .catch(error => {
    console.error("Error:", error);
    const dataDiv = document.getElementById("data");
    dataDiv.innerHTML = ``;
  });

// Function to open Steam link
function openSteamLink(link) {
  window.location.href = link;
}
