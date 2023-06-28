// Function to update the countdown
function updateCountdown() {
  // Get the current date and time
  const currentDate = new Date();

  // Set the target time to 4 PM NZST
  const targetTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 16, 0, 0);


  // Convert the target time to the user's timezone
  const userTargetTime = targetTime.toLocaleTimeString(undefined, { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });

  // Calculate the time difference in milliseconds
  const timeDifference = targetTime.getTime() - currentDate.getTime();

  // Calculate the hours, minutes, and seconds remaining
  const hoursRemaining = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutesRemaining = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const secondsRemaining = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Update the HTML with the countdown button
  const countdownDiv = document.getElementById("countdown");
  countdownDiv.innerHTML = `
    <button class="btn btn-dark" disabled>
      Countdown Till Restart: ${hoursRemaining}h ${minutesRemaining}m ${secondsRemaining}s
    </button>
  `;
}

// Update the countdown immediately
updateCountdown();

// Update the countdown every second
setInterval(updateCountdown, 1000);

// Make a request to the API
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
