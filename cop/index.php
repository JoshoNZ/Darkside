<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="https://thedarksidegames.com/img/DarksideLogo.png" type="image/x-icon">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta property="og:title" content="Darkside Cop Data Viewer Home">
    <meta property="og:image" content="https://cp.thedarksidegames.com/TanoaLifeCP/design/img/logo_login.png">
    <meta name="twitter:card" content="https://cp.thedarksidegames.com/TanoaLifeCP/design/img/logo_login.png">
    <meta name="twitter:title" content="Darkside Cop Data Viewer Home">
    <meta name="twitter:image" content="https://cp.thedarksidegames.com/TanoaLifeCP/design/img/logo_login.png">

    <link id="style-link" rel="stylesheet" href="darkmode.css">  
</head>
<body>
<div class="header">
    <h1>Darkside Cop Data Viewer</h1>
    <h2>Note Stats Are Old, They Were Last Pulled At 09/12/2023.</h2>
</div>
<div class="search-container">
    <form method="post">
        <input type="text" id="searchTerm" name="searchTerm" placeholder="Search Name or PlayerID">
        <button type="submit" onclick="logSearchTerm()">Search</button>
        <button type="submit" name="clear">Reset</button>
    </form>
</div>

<?php
    require_once 'script.php';
?>


<div class="footer">
    <p>&copy; 2023 Darkside Games. All rights reserved.</p>
    <p class="designed-by">Designed by <a href="https://dbhostings.com/" target="_blank"><span>DB</span>hostings</a></p>
    <p class="arma">"Arma" content and materials are trademarks and copyrights of Bohemia Interactive and its licensors. This site is not affiliated with Bohemia Interactive.</p>
</div>



</body>
</html>
