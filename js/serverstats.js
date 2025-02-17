//  ____             _        _     _         ____                _           _     _     _  __        ____  ____  
// |  _ \  __ _ _ __| | _____(_) __| | ___   / ___|___  _ __ ___ | |__   __ _| |_  | |   (_)/ _| ___  |  _ \|  _ \ 
// | | | |/ _` | '__| |/ / __| |/ _` |/ _ \ | |   / _ \| '_ ` _ \| '_ \ / _` | __| | |   | | |_ / _ \ | |_) | |_) |
// | |_| | (_| | |  |   <\__ \ | (_| |  __/ | |__| (_) | | | | | | |_) | (_| | |_  | |___| |  _|  __/ |  _ <|  __/ 
// |____/ \__,_|_|  |_|\_\___/_|\__,_|\___|  \____\___/|_| |_| |_|_.__/ \__,_|\__| |_____|_|_|  \___| |_| \_\_|    
//                                                                                                                 

function fetchAndUpdateServerData() {
    fetch("https://arma3-servers.net/api/?object=servers&element=detail&key=BsxSq49CKBgjjGBGmZTvLekvJKoxJEIDBd")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch data. Status: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            const { maxplayers: maxPlayers, players: currentPlayers, is_online: isOnline } = data;
            const statusDiv = document.getElementById("server-status");
            const ipAddress = "203.10.96.195";
            const port = "2393";
            const steamLink = `steam://rungameid/107410// +connect ${ipAddress}:${port}`;

            if (isOnline === "0") {
                statusDiv.innerHTML = `
                    <button class="btn btn-secondary btn-lg" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Check Back Soon">
                        <i class="fas fa-power-off me-2"></i>Server Offline
                    </button>
                `;
            } else if (currentPlayers === "0") {
                statusDiv.innerHTML = `
                    <button class="btn btn-success btn-lg" onclick="openSteamLink('${steamLink}')" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Click To Join">
                        <i class="fas fa-play me-2"></i>Be The First
                    </button>
                `;
            } else {
                statusDiv.innerHTML = `
                    <button class="btn btn-danger btn-lg" onclick="openSteamLink('${steamLink}')" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Click To Join">
                        <i class="fas fa-gamepad me-2"></i>Join ${currentPlayers}/${maxPlayers} Players
                    </button>
                `;
            }

            const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
            tooltips.forEach(el => new bootstrap.Tooltip(el));
        })
        .catch(error => {
            console.error("Error:", error);
            const statusDiv = document.getElementById("server-status");
            statusDiv.innerHTML = `
                <button class="btn btn-secondary btn-lg">Server Offline</button>
            `;
        });
}

function openSteamLink(link) {
  window.location.href = link;
}

fetchAndUpdateServerData();

setInterval(fetchAndUpdateServerData, 30000);

function fetchAndDisplayAnnouncements() {
    fetch("http://142.54.166.178:3000/api/recent-messages", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const announcementsDiv = document.getElementById("announcements");
            const messages = data.recentMessages.filter(msg => msg.channel === "announcements");

            let announcementsHtml = `
                <div class="announcements-title">
                    <i class="fas fa-bullhorn me-2"></i>Announcements
                </div>
            `;

            messages.forEach(message => {
                const date = new Date(message.timestamp);
                const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

                let content = message.content
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/\n/g, ' <br>')
                    .replace(/https?:\/\/\S+/g, url => `<a href="${url}" target="_blank" class="text-info">${url}</a>`);

                announcementsHtml += `
                    <div class="announcement">
                        <div class="announcement-header">
                            <span class="announcement-author">${message.author}</span>
                            <span>${formattedDate}</span>
                        </div>
                        <div class="announcement-content">${content}
                        </div>
                    </div>
                `;
            });

            // Show message if no announcements
            if (messages.length === 0) {
                announcementsHtml += `
                    <div class="announcement">
                        <div class="announcement-content text-center">
                            No announcements at this time.
                        </div>
                    </div>
                `;
            }

            announcementsDiv.innerHTML = announcementsHtml;
        })
        .catch(error => {
            console.error("Error fetching announcements:", error);
            const announcementsDiv = document.getElementById("announcements");
            announcementsDiv.innerHTML = `
                <div class="alert alert-danger">
                    Unable to load announcements at this time.
                </div>
            `;
        });
}

fetchAndDisplayAnnouncements();

setInterval(fetchAndDisplayAnnouncements, 300000);

const faqList = [
    {
        question: "What are the server rules?",
        answer: "Community Rules can be found in our discord.<br>Ingame Rules can be found by pressing F2 while in game.<br> But it all comes down to common sense."
    },
    {
        question: "When are the server restarts?",
        answer: "Server restarts daily at around 1PM NZST (11AM AEST, 6PM PST)"
    },
    {
        question: "How do I contact staff or report a player?",
        answer: "The best way to is through our Discord server in the #support-request channel.<br>Reporting players, compenstation will require screenshots and/or video evidence."
    }
];

function displayFAQ() {
    const faqDiv = document.getElementById("faq");
    let faqHtml = `
        <div class="faq-title">
            <i class="fas fa-question-circle me-2"></i>Frequently Asked Questions
        </div>
    `;

    faqList.forEach((item, index) => {
        faqHtml += `
            <div class="faq-item" onclick="toggleFAQ(${index})">
                <div class="faq-question">
                    ${item.question}
                    <span class="faq-toggle">
                        <i class="fas fa-chevron-down"></i>
                    </span>
                </div>
                <div class="faq-answer">
                    ${item.answer}
                </div>
            </div>
        `;
    });

    faqDiv.innerHTML = faqHtml;
}

function toggleFAQ(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item, i) => {
        if (i === index) {
            item.classList.toggle('active');
        } else {
            item.classList.remove('active');
        }
    });
}

displayFAQ();
