<?php
$bulletinFolder = '../Bulletins/';
$file = isset($_GET['file']) ? $_GET['file'] : '';

// Sanitize file name
$file = basename($file);

// Check if the file exists
if (file_exists($bulletinFolder . $file)) {
    $content = file_get_contents($bulletinFolder . $file);
} else {
    $content = '<p>Bulletin not found.</p>';
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow"> <!-- Block search engine indexing -->
    <title>Employee Portal</title>
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }
        .title-container {
            max-width: 850px;
            margin: 20px auto 0px auto;
        }
        h1 {
            color: #666;
            text-align: left;
            margin: 0;
            padding-left: 22px; /* Nudge to the left to align with the text below */
        }
         img {
            max-width: 100%;
            height: auto;
        }
    </style>
</head>
<body>
    <div class="title-container">
        <h1>Employee Portal</h1> <!-- Display "Employee Portal" with better alignment and spacing -->
    </div>
    <div class="container">
        <?php echo $content; ?>
    </div>
</body>
</html>
