<?php
// Load settings from Settings.txt
$settingsFile = 'Settings.txt';
$settings = file($settingsFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

// Initialize variables for settings
$disableWithRedirect = 'No';
$redirectURL = '';
$disableWithMessage = 'No';
$disableMessage = '';
$users = [];
$storedToken = ''; // Token stored for validation
$hasUserAccounts = false; // Flag to check if user accounts exist

// Parse settings
$username = '';
$password = '';
foreach ($settings as $line) {
    if (strpos($line, '//') === 0 || strpos($line, '##End##') !== false) {
        continue;
    }

    // Disable with redirect or message
    if (strpos($line, 'Disable_with_Redirect:') !== false) {
        $disableWithRedirect = trim(str_replace('Disable_with_Redirect:', '', $line), ' "');
    }
    if (strpos($line, 'Redirect:') !== false) {
        $redirectURL = trim(str_replace('Redirect:', '', $line), ' "');
    }
    if (strpos($line, 'Disable_with_Message:') !== false) {
        $disableWithMessage = trim(str_replace('Disable_with_Message:', '', $line), ' "');
    }
    if (strpos($line, 'Message:') !== false) {
        $disableMessage = trim(str_replace('Message:', '', $line), ' "');
    }

    // Collect valid usernames and passwords
    if (strpos($line, 'Username:') !== false) {
        $username = trim(str_replace('Username:', '', $line), ' "');
    }
    if (strpos($line, 'Password:') !== false) {
        $password = trim(str_replace('Password:', '', $line), ' "');
        
        if ($username !== 'Example_Login_Username' && $password !== 'Example_Password') {
            $users[$username] = $password; // Store valid usernames and passwords
            $hasUserAccounts = true; // Mark that we have at least one valid user account
        }
    }
}

// Handle disabling the portal
if ($disableWithRedirect === 'Yes' && !empty($redirectURL)) {
    header('Location: ' . $redirectURL);
    exit();
} elseif ($disableWithMessage === 'Yes' && !empty($disableMessage)) {
    echo '<p>' . htmlspecialchars($disableMessage) . '</p>';
    exit();
}

// If there are no user accounts, bypass login
if (!$hasUserAccounts) {
    $isLoggedIn = true;
} else {
    // Stateless login handling
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['username'], $_POST['password'])) {
        $enteredUsername = trim($_POST['username']);
        $enteredPassword = trim($_POST['password']);

        // Validate credentials (trim whitespace for good measure)
        if (isset($users[$enteredUsername]) && $users[$enteredUsername] === $enteredPassword) {
            // Generate a token and store it in the App folder
            $storedToken = bin2hex(random_bytes(16));
            file_put_contents('App/token.txt', $storedToken); // Store token in App folder
            
            // Redirect with the token in the URL
            header('Location: index.php?token=' . urlencode($storedToken));
            exit();
        } else {
            $loginError = "Invalid credentials. Please try again.";
        }
    }

    // Check the token if user is already logged in
    if (isset($_GET['token'])) {
        if (file_exists('App/token.txt')) {
            $storedToken = trim(file_get_contents('App/token.txt')); // Read stored token from App folder
            if ($_GET['token'] === $storedToken) {
                $isLoggedIn = true;
            } else {
                $isLoggedIn = false;
            }
        } else {
            $isLoggedIn = false;
        }
    } else {
        $isLoggedIn = false;
    }
}

// Show login form if not logged in and user accounts exist
if ($hasUserAccounts && !$isLoggedIn) {
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login - Employee Portal</title>
        <!-- Add custom styles -->
        <style>
            body {
                font-family: 'Roboto', sans-serif;
                background-color: #f5f5f5; /* Light gray background */
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 400px;
                margin: 60px auto;
                padding: 20px;
                background-color: #fff;
                box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Subtle drop shadow */
                border-radius: 8px;
                text-align: center;
            }
            h1 {
                font-size: 1.8em;
                margin-bottom: 20px;
            }
            label {
                display: block;
                text-align: left;
                font-size: 1.1em;
                margin-bottom: 8px;
            }
            input[type="text"], input[type="password"] {
                width: 100%;
                padding: 10px;
                margin-bottom: 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
                box-sizing: border-box;
                font-size: 1em;
            }
            button {
                width: 100%;
                padding: 10px;
                font-size: 1.1em;
                background-color: #007BFF;
                color: #fff;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s;
            }
            button:hover {
                background-color: #0056b3;
            }
            .error {
                color: red;
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Login to Employee Portal</h1>
            <?php if (isset($loginError)): ?>
                <p class="error"><?php echo htmlspecialchars($loginError); ?></p>
            <?php endif; ?>
            <form method="POST" action="index.php">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>
                <label for="password">Password:</label>
                <input type="text" id="password" name="password" required>
                <button type="submit">Login</button>
            </form>
        </div>
    </body>
    </html>
    <?php
    exit(); // Stop further processing if not logged in
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>Employee Portal</title>
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    
    <!-- Styles -->
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            background-color: #f5f5f5; /* Light gray background */
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            text-align: center;
        }
        .message {
            margin-bottom: 30px;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Subtle drop shadow */
            border-radius: 8px;
        }
        .content-box {
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            text-align: left;
            margin-bottom: 20px;
        }
        .link-box {
            margin-bottom: 20px;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #fafafa;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
        }
        .link-box h3 {
            margin-top: 0;
            font-size: 1.2em;
        }
        .link-box p {
            font-size: 0.95em;
            color: #666;
        }
        a {
            color: #007BFF;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    .downloads-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Force 3 columns on larger screens */
    gap: 20px;
    padding: 20px 0;
}

    .download-item {
        text-align: center;
        border: 2px solid #ddd;
        border-radius: 8px;
        padding: 20px;
        background-color: #f9f9f9;
        transition: background-color 0.3s, border-color 0.3s;
    }
    .download-item:hover {
        background-color: #f1f1f1;
        border-color: #007BFF;
    }
    .thumbnail {
        width: 50px;
        height: 50px;
        margin-bottom: 10px;
    }
    .download-item p {
        font-size: 1.1em;
        color: #333;
        margin: 0;
    }
        .bulletins-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr); /* 2 columns */
        gap: 20px;
    }
    .bulletin-link {
        position: relative;
        text-align: center;
        border: 2px solid #ddd;
        border-radius: 8px;
        padding: 20px;
        background-color: #f9f9f9;
        transition: background-color 0.3s, border-color 0.3s;
    }
    .bulletin-link:hover {
        background-color: #f1f1f1;
        border-color: #007BFF;
    }
    .bulletin-link h3 {
        margin-top: 0;
        font-size: 1.1em;
    }
    .preview-text {
        font-size: 0.85em;
        color: #666;
        margin-top: 10px;
    }
    .thumbtack {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 20px;
        height: 20px;
    }
    /* Responsive adjustments */
    @media (max-width: 992px) {
    .downloads-grid {
        grid-template-columns: repeat(2, 1fr); /* 2 columns on medium screens */
    }
}

   @media (max-width: 768px) {
        .bulletins-grid {
            grid-template-columns: 1fr; /* 1 column on smaller screens */
        }
        
    .bulletin-link {
        padding: 15px;
        padding-right: 40px; /* Ensure right padding still accounts for thumbtack */
    }

        .preview-text {
            font-size: 0.8em;
        }
    }

@media (max-width: 600px) {
    .downloads-grid {
        grid-template-columns: 1fr; /* 1 column on small screens */
    }
    @media (max-width: 768px) {
        .container {
            padding: 10px;
        }
        .link-box h3 {
            font-size: 1.1em;
        }
        .link-box p {
            font-size: 0.9em;
        }
        .download-item {
            padding: 15px;
        }
    }
    @media (max-width: 480px) {
        .link-box h3 {
            font-size: 1em;
        }
        .link-box p {
            font-size: 0.85em;
        }
    }
    </style>
</head>
<body>
    <div class="container">
    <!-- Top Message Section -->
        <div class="message">
            <?php
                // Read the content from Top-Message.html
                $messageFile = 'Top-Message.html';
                if (file_exists($messageFile)) {
                    include($messageFile); // Directly include HTML content
                } else {
                    echo '<p>No message available at the moment.</p>';
                }
            ?>
        </div>


<!-- Bulletins Section -->
<?php
$bulletinsFolder = 'Bulletins/';

// Check if the Bulletins folder exists
if (is_dir($bulletinsFolder)) {
    $bulletins = array_filter(scandir($bulletinsFolder), function($file) use ($bulletinsFolder) {
        return pathinfo($file, PATHINFO_EXTENSION) === 'html' && is_file($bulletinsFolder . $file);
    }); // Get all .html files

    if (!empty($bulletins)) {
        echo '<div class="content-box">';
        echo '<h2>Bulletins</h2>';
        echo '<div class="bulletins-grid">';

        foreach ($bulletins as $bulletin) {
            $bulletinPath = $bulletinsFolder . $bulletin;
            $bulletinTitle = str_replace('_', ' ', pathinfo($bulletin, PATHINFO_FILENAME)); // Clean up underscores

            // Initialize file preview variable
            $filePreview = '';

            // Ensure the file is readable and non-empty
            if (is_readable($bulletinPath)) {
                // Use DOMDocument to parse HTML content
                $dom = new DOMDocument();
                libxml_use_internal_errors(true); // Suppress parsing errors
                $dom->loadHTMLFile($bulletinPath, LIBXML_NOERROR);

                // Get all <h#> and <p> tags and concatenate their text content
                $previewParts = [];
                $tagsToExtract = ['h1', 'h2', 'h3', 'p'];
                foreach ($tagsToExtract as $tag) {
                    $elements = $dom->getElementsByTagName($tag);
                    foreach ($elements as $element) {
                        $previewParts[] = $element->textContent;
                        if (strlen(implode(' ', $previewParts)) >= 200) {
                            break 2; // Stop once we have enough text
                        }
                    }
                }

                // Join and limit to first 200 characters
                $filePreview = implode(' ', $previewParts);
                $filePreview = substr($filePreview, 0, 200);
                libxml_clear_errors(); // Clear any libxml errors
            }

            // Output a link to the bulletin with target="_blank"
            echo '<div class="bulletin-link">';
            echo '<img src="App/thumbtack.svg" alt="Thumbtack" class="thumbtack">';
            echo '<h3><a href="App/render_bulletin.php?file=' . urlencode($bulletin) . '" target="_blank">' . htmlspecialchars($bulletinTitle) . '</a></h3>';
            echo '<p class="preview-text">' . htmlspecialchars($filePreview) . '</p>';
            echo '</div>';
        }

        echo '</div>';
        echo '</div>';
    }
} else {
    // Gracefully handle the case where the Bulletins folder does not exist
    echo '<!-- Bulletins folder is missing, skipping this section -->';
}
?>


        <!-- Links Section -->
<?php
$linksFile = 'Links.txt';

// Check if the file exists and has content
if (file_exists($linksFile)) {
    $fileContents = file($linksFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $link = $title = $description = '';
    
    // Check if there are any links in the file
    $hasLinks = false;
    foreach ($fileContents as $line) {
        if (strpos($line, 'Link:') === 0) {
            $hasLinks = true; // A valid link found
            break;
        }
    }

    // If the file has links, display the section
    if ($hasLinks) {
        echo '<div class="content-box">';
        echo '<h2>Links</h2>';

        foreach ($fileContents as $line) {
            $line = trim($line); // Clean up any surrounding whitespace

            // Stop processing when reaching ##End##
            if (strpos($line, '##End##') !== false) {
                break;
            }

            // Process the Link, Title, and Description
            if (strpos($line, 'Link:') === 0) {
                $link = trim(str_replace('Link:', '', $line), ' "');
            } elseif (strpos($line, 'Title:') === 0) {
                $title = trim(str_replace('Title:', '', $line), ' "');
            } elseif (strpos($line, 'Description:') === 0) {
                $description = trim(str_replace('Description:', '', $line), ' "');
            }

            // Once all fields (Link, Title, Description) are set, display them
            if ($link && $title && $description) {
                // Escape special characters in title and description
                $safeTitle = htmlspecialchars($title, ENT_QUOTES);
                $safeDescription = htmlspecialchars($description, ENT_QUOTES);
                $safeLink = htmlspecialchars($link, ENT_QUOTES);
                
                // Output the link box
                echo '<div class="link-box">';
                echo '<h3><a href="' . $safeLink . '" target="_blank">' . $safeTitle . '</a></h3>';
                echo '<p>' . $safeDescription . '</p>';
                echo '</div>';
                
                // Reset variables for the next link
                $link = $title = $description = '';
            }
        }

        echo '</div>'; // Close content-box
    }
}
?>

        <!-- Downloads Section -->
        <?php
        $downloadsFolder = 'Downloads/';
        $files = array_diff(scandir($downloadsFolder), array('.', '..')); // Get all files, excluding . and .. directories

        // Only display the section if there are files in the Downloads folder
        if (!empty($files)) {
            echo '<div class="content-box">';
            echo '<h2>Downloads</h2>';
            echo '<div class="downloads-grid">';

            foreach ($files as $file) {
                // Get the file path and extension
                $filePath = $downloadsFolder . $file;
                $fileExtension = pathinfo($file, PATHINFO_EXTENSION);
                $fileName = pathinfo($file, PATHINFO_FILENAME);
                
                // Clean up the file name (remove underscores, keep dashes)
                $cleanedFileName = str_replace('_', ' ', $fileName);

                // Determine the correct icon based on the file type
                $icon = '';
                switch (strtolower($fileExtension)) {
                    case 'pdf':
                        $icon = 'App/pdf.svg';
                        break;
                    case 'doc':
                    case 'docx':
                        $icon = 'App/word.svg';
                        break;
                    case 'xls':
                    case 'xlsx':
                        $icon = 'App/excel.svg';
                        break;
                    default:
                        $icon = 'App/other.svg';
                        break;
                }

                // Output the thumbnail and link
                echo '<div class="download-item">';
                echo '<a href="' . htmlspecialchars($filePath) . '" target="_blank">';
                echo '<img src="' . htmlspecialchars($icon) . '" alt="' . $fileExtension . ' file" class="thumbnail">';
                echo '<p>' . htmlspecialchars($cleanedFileName) . '</p>';
                echo '</a>';
                echo '</div>';
            }

            echo '</div>';
            echo '</div>';
        }
        ?>
        </div>
    </div>
    <div style="position: fixed; bottom: 10px; left: 10px; font-size: 0.8em; color: #ccc;">
    <a href="App/Instructions.html" target="blank" style="color: #ccc; text-decoration: none;" title="Manager Instructions">Manager Instructions</a>
</div>
</body>
</html>
