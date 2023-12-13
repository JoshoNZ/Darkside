
<?php
// Replace 'YOUR_GOOGLE_SHEETS_CSV_LINK' with the link to your Google Sheets CSV file
$csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTfwMb3S4gxQ7KzIDT1MxZLTeB9W9NToOuHnh-zV8_VTHKcrX7iA4hTs8HF3cpYb33v5PpzIoP4zM9b/pub?gid=2055898683&single=true&output=csv';

// Function to read and display CSV data from a URL
function displayCSVTableFromUrl($url, $searchTerm = null) {
    $csvData = @file_get_contents($url);

    if ($csvData === false) {
        // Handle error
        echo '<p>Error fetching CSV data.</p>';
        return [];
    }

    $rows = array_map('str_getcsv', explode("\n", $csvData));

    $matchesFound = false;

    echo '<table id="csvTable">';
    foreach ($rows as $index => $row) {
        if ($index === 0) {
            echo '<tr>';
            $displayedColumns = array_slice($row, 0, 17); // Display columns A to Q
            foreach ($displayedColumns as $column) {
                echo '<th>' . $column . '</th>';
            }
            echo '</tr>';
        } else {
            // Check if the row matches the search term or cop level (case-insensitive, partial search)
            if ($searchTerm === null || hasPartialMatch($row, $searchTerm)) {
                $matchesFound = true;
                echo '<tr>';
                $displayedColumns = array_slice($row, 0, 17); // Display columns A to Q
                foreach ($displayedColumns as $cellIndex => $cell) {
                    // Replace cop level with rank in the displayed table
                    if ($cellIndex == 4) {
                        echo '<td>' . getCopRank($cell) . '</td>';
                    } else {
                        // Format numbers in the second and third columns
                        if ($cellIndex == 2 || $cellIndex == 3) {
                            echo '<td>$' . number_format($cell) . '</td>';
                        } else {
                            echo '<td>' . $cell . '</td>';
                        }
                    }
                }
                echo '</tr>';
            }
        }
    }
    echo '</table>';

    // Display message if no matches found
    if (!$matchesFound && $searchTerm !== '') {
        echo '<p class="no-matches">No matches found for "' . htmlspecialchars($searchTerm) . '"</p>';
    }

    return $rows; // Return rows for further use
}

// Function to check if any cell in the row has a partial match with the search term
function hasPartialMatch($row, $searchTerm) {
    foreach ($row as $cell) {
        if (stripos($cell, $searchTerm) !== false) {
            return true;
        }
    }
    return false;
}


// Function to display the top 10 richest cops
function displayTopRichestCops($rows) {
    $richestCops = [];

    foreach ($rows as $index => $row) {
        if ($index > 0) {
            $copName = $row[0];
            $copbankacc = (int)$row[3]; // Use the correct column index for CopBankAcc
            $richestCops[$copName] = $copbankacc;
        }
    }

    arsort($richestCops);

    echo '<div class="sticky-table">';
    echo '<h2>Top 10 Richest Cops</h2>';
    echo '<table>';
    echo '<tr><th>Name</th><th>Cop Bank</th></tr>';
    
    $count = 0;
    foreach ($richestCops as $copName => $copbankacc) {
        echo '<tr><td>' . $copName . '</td><td>$' . number_format($copbankacc) . '</td></tr>';
        $count++;
        if ($count >= 10) {
            break;
        }
    }

    // Log Top 10 Richest Cops to the console
    echo '<script>';
    echo 'console.log("Top 10 Richest Cops:", ' . json_encode($richestCops) . ');';
    echo '</script>';

    echo '</table>';
    echo '</div>';
}


// Function to display the highest played cops
function displayHighestPlayedCops($rows) {
    $playedCops = [];

    foreach ($rows as $index => $row) {
        if ($index > 0) {
            $copName = $row[0];
            $copTime = (int)$row[10]; // Cop time (minutes)
            $playedCops[$copName] = round($copTime / 60); // Convert minutes to hours and round to the nearest whole number
        }
    }

    arsort($playedCops);

    echo '<div class="sticky-table">';
    echo '<h2>Top 10 Most Hours Cops</h2>';
    echo '<table>';
    echo '<tr><th>Name</th><th>Cop Time (hours)</th></tr>';
    
    $count = 0;
    foreach ($playedCops as $copName => $copTime) {
        echo '<tr><td>' . $copName . '</td><td>' . $copTime . '</td></tr>';
        $count++;
        if ($count >= 10) {
            break;
        }
    }

    // Log Top 10 Highest Played Cops to the console
    echo '<script>';
    echo 'console.log("Top 10 Highest Played Cops:", ' . json_encode($playedCops) . ');';
    echo '</script>';

    echo '</table>';
    echo '</div>';
}

// Function to display the top 10 most kills
function displayTopMostKills($rows) {
    $mostKills = [];

    foreach ($rows as $index => $row) {
        if ($index > 0) {
            $copName = $row[0];
            $kills = (int)$row[16]; // Most kills column
            $mostKills[$copName] = $kills;
        }
    }

    arsort($mostKills);

    echo '<div class="sticky-table">';
    echo '<h2>Top 10 Most Kills</h2>';
    echo '<table>';
    echo '<tr><th>Name</th><th>Most Kills</th></tr>';
    
    $count = 0;
    foreach ($mostKills as $copName => $kills) {
        echo '<tr><td>' . $copName . '</td><td>' . $kills . '</td></tr>';
        $count++;
        if ($count >= 10) {
            break;
        }
    }

    // Log Top 10 Most Kills to the console
    echo '<script>';
    echo 'console.log("Top 10 Most Kills:", ' . json_encode($mostKills) . ');';
    echo '</script>';

    echo '</table>';
    echo '</div>';
}

// Function to display the top 10 most arrests
function displayTopMostArrests($rows) {
    $mostArrests = [];

    foreach ($rows as $index => $row) {
        if ($index > 0) {
            $copName = $row[0];
            $arrests = (int)$row[15]; // Most arrests column
            $mostArrests[$copName] = $arrests;
        }
    }

    arsort($mostArrests);

    echo '<div class="sticky-table">';
    echo '<h2>Top 10 Most Arrests</h2>';
    echo '<table>';
    echo '<tr><th>Name</th><th>Most Arrests</th></tr>';
    
    $count = 0;
    foreach ($mostArrests as $copName => $arrests) {
        echo '<tr><td>' . $copName . '</td><td>' . $arrests . '</td></tr>';
        $count++;
        if ($count >= 10) {
            break;
        }
    }

    // Log Top 10 Most Arrests to the console
    echo '<script>';
    echo 'console.log("Top 10 Most Arrests:", ' . json_encode($mostArrests) . ');';
    echo '</script>';

    echo '</table>';
    echo '</div>';
}
// Function to display the top 10 impounds
function displayTopImpounds($rows) {
    $topImpounds = [];

    foreach ($rows as $index => $row) {
        if ($index > 0) {
            $copName = $row[0];
            $impounds = (int)$row[13]; // Police impounds column
            $topImpounds[$copName] = $impounds;
        }
    }

    arsort($topImpounds);

    echo '<div class="sticky-table">';
    echo '<h2>Top 10 Impounds</h2>';
    echo '<table>';
    echo '<tr><th>Name</th><th>Impounds</th></tr>';

    $count = 0;
    foreach ($topImpounds as $copName => $impounds) {
        echo '<tr><td>' . $copName . '</td><td>' . $impounds . '</td></tr>';
        $count++;
        if ($count >= 10) {
            break;
        }
    }

    // Log Top 10 Impounds to the console
    echo '<script>';
    echo 'console.log("Top 10 Impounds:", ' . json_encode($topImpounds) . ');';
    echo '</script>';

    echo '</table>';
    echo '</div>';
}

// Function to display the top 10 tickets
function displayTopTickets($rows) {
    $topTickets = [];

    foreach ($rows as $index => $row) {
        if ($index > 0) {
            $copName = $row[0];
            $tickets = (int)$row[14]; // Police tickets column
            $topTickets[$copName] = $tickets;
        }
    }

    arsort($topTickets);

    echo '<div class="sticky-table">';
    echo '<h2>Top 10 Tickets</h2>';
    echo '<table>';
    echo '<tr><th>Name</th><th>Tickets</th></tr>';

    $count = 0;
    foreach ($topTickets as $copName => $tickets) {
        echo '<tr><td>' . $copName . '</td><td>' . $tickets . '</td></tr>';
        $count++;
        if ($count >= 10) {
            break;
        }
    }

    // Log Top 10 Tickets to the console
    echo '<script>';
    echo 'console.log("Top 10 Tickets:", ' . json_encode($topTickets) . ');';
    echo '</script>';

    echo '</table>';
    echo '</div>';
}

// Function to map cop level to rank
function getCopRank($copLevel) {
    switch ($copLevel) {
        case 11:
            return "Chief Of Police";
        case 10:
            return "Commissioner";
        case 9:
            return "Deputy Commissioner";
        case 8:
            return "Assistant Commissioner";
        case 7:
            return "Superintendent";
        case 6:
            return "Lieutenant";
        case 5:
            return "Senior Sergeant";
        case 4:
            return "Sergeant";
        case 3:
            return "Senior Constable";
        case 2:
            return "Constable";
        case 1:
            return "Cadet";
        default:
            return "No Player found";
    }
}

// Function to display the Cop Rank and the number of players in each rank
function displayCopRankDistribution($rows) {
    $copRanks = [
        "Commissioner" => 0,
        "Deputy Commissioner" => 0,
        "Assistant Commissioner" => 0,
        "Superintendent" => 0,
        "Lieutenant" => 0,
        "Senior Sergeant" => 0,
        "Sergeant" => 0,
        "Senior Constable" => 0,
        "Constable" => 0,
        "Cadet" => 0,
    ];

    foreach ($rows as $index => $row) {
        if ($index > 0) {
            $copLevel = (int)$row[4]; // Cop level column
            $copRank = getCopRank($copLevel);
            if (array_key_exists($copRank, $copRanks)) {
                $copRanks[$copRank]++;
            }
        }
    }

    echo '<div class="sticky-table">';
    echo '<h2>Cop Rank Distribution</h2>';
    echo '<table>';
    echo '<tr><th>Cop Rank</th><th>Number of Players</th></tr>';

    foreach ($copRanks as $rank => $count) {
        echo '<tr><td>' . $rank . '</td><td>' . $count . '</td></tr>';
    }

    echo '</table>';
    echo '</div>';
}

// Function to display the top 10 most inactive cops
function displayTopMostInactiveCops($rows) {
    $mostInactiveCops = [];

    foreach ($rows as $index => $row) {
        if ($index > 0) {
            $copName = $row[0];
            $lastActive = $row[5]; // Last active column
            $lastActiveTimestamp = strtotime(str_replace('/', '-', $lastActive)); // Convert date to timestamp
            $daysSinceLastActive = floor((time() - $lastActiveTimestamp) / (60 * 60 * 24)); // Calculate days since last active
            $mostInactiveCops[$copName] = $daysSinceLastActive;
        }
    }

    arsort($mostInactiveCops); // Sort in descending order

    echo '<div class="sticky-table">';
    echo '<h2>Top 10 Most Inactive Cops</h2>';
    echo '<table>';
    echo '<tr><th>Name</th><th>Days Since Last Active</th></tr>';

    $count = 0;
    foreach ($mostInactiveCops as $copName => $daysSinceLastActive) {
        echo '<tr><td>' . $copName . '</td><td>' . $daysSinceLastActive . '</td></tr>';
        $count++;
        if ($count >= 10) {
            break;
        }
    }

    // Log Top 10 Most Inactive Cops to the console
    //echo '<script>';
    //echo 'console.log("Top 10 Most Inactive Cops:", ' . json_encode($mostInactiveCops) . ');';
    //echo '</script>';

    echo '</table>';
    echo '</div>';
}

// Variable to store the search term
$searchTerm = '';


// Log the search term to the console
echo '<script>';
echo 'function logSearchTerm() {';
echo '    var searchTerm = document.getElementById("searchTerm").value;';
echo '    console.log("Search Term:", searchTerm);';
echo '}';
echo '</script>';

// Handle the form submission

// Handle the form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $searchTerm = isset($_POST['searchTerm']) ? trim($_POST['searchTerm']) : '';

    if (isset($_POST['clear'])) {
        // Clear the search term and cop level search
        $searchTerm = '';
    }

    // Display the first table only if a search term is entered
    $rows = displayCSVTableFromUrl($csvUrl, $searchTerm);

    echo '<br>';
    echo '</br>';
    // Display the top 10 richest cops, highest played cops, most kills, most arrests, impounds, and tickets side by side
    echo '<div class="charts-container">';
    displayTopRichestCops($rows);
    displayHighestPlayedCops($rows);
    displayTopMostKills($rows);
    displayTopMostArrests($rows);
    displayTopImpounds($rows);
    displayTopTickets($rows);
    displayCopRankDistribution($rows);
    //displayTopMostInactiveCops($rows);

    echo '</div>';
} else {
    // Display the top 10 richest cops, highest played cops, most kills, most arrests, impounds, and tickets by default
    echo '<div class="charts-container">';
    displayTopRichestCops($rows);
    displayHighestPlayedCops($rows);
    displayTopMostKills($rows);
    displayTopMostArrests($rows);
    displayTopImpounds($rows);
    displayTopTickets($rows);
    displayCopRankDistribution($rows);
    //displayTopMostInactiveCops($rows);
    echo '</div>';
}

// Dynamically set the title based on the search term
$title = 'DS Cop Stats';
if (!empty($searchTerm)) {
    $title .= ' - ' . htmlspecialchars($searchTerm);
}
echo '<title>' . $title . '</title>';
?>