<?php
/**
 * !!!! IMPORTANT !!!!
 * This sendmail has been updated to include the ability to ignore fields
 * via IGNORE_FIELDS global. Site functionality has been updated to allow
 * for the passing of the THANKYOU_PAGE and MAIL_SUBJECT and will cause
 * issues if not maintained.
 * 
 * Error page as also been implmented to allow for a more user friendly
 * error page. This page is located in templates/sendmail-error.php
 */

define('MY_EMAIL','info@centrycareplusllc.com'); // the to email address (you can define more then one, use commas to separate them like: email1,email2,email3)
define ('email', 'info@centrycareplusllc.com'); // sending email
define ('name', 'NO-REPLY'); // name associated with the sending email 

$thankyou = 'thankyou.htm'; // thank you page
if(array_key_exists('THANKYOU_PAGE', $_POST)){
	$thankyou = $_POST['THANKYOU_PAGE'];
}

define('THANKYOU_PAGE', $thankyou); // the URL of the thank you page.

$subject = 'Form Submitted on Your Website';
if(array_key_exists('MAIL_SUBJECT', $_POST)){
	$subject = $_POST['MAIL_SUBJECT'] . ' | ' . $subject;
}

define('MAIL_SUBJECT', $subject); // the subject of the email

//required fields, ex. 'name,email,message'
define('REQUIRED_FIELDS','');//list all required fields, separated by comma (doesn't work with FILE fields)
define('IGNORE_FIELDS', [
	'MAIL_SUBJECT',
	'THANKYOU_PAGE',
]);

define('ERROR_TEMPLATE', dirname(__FILE__) . '/templates/sendmail-error.html'); // the error page

//include a header and footer when showing error messages, ex. 'header.html'
define('HEADER',''); // if you want error messages to display in a template, add the path to your header here
define('FOOTER',''); // if you want error messages to display in a template, add the path to your footer here

// allow attachments ==================================
//allow uploading of attachments ex: pdf,doc,jpg,gif
define('ALLOW_ATTACHMENTS','doc,docx,pdf,odt,wpd,xls,xlsx,ods,jpg,gif,tif,png,raw');//allow attachments !!only checks for EXTENSION! Scan all received files before opening with an antivirus! if you don't want attachments, leave this empty
define('FILE_SIZE', 10);//10 MB (number is in MB) / attachment
//save them where
// define('ATTACHEMENTS_SAVE2DIR','uploads/');//NOT IMPLEMENTED!! uploads directory Needs to be writable by the script, if you want to also save the attachemnts to disk
// define('ATTACHEMENTS_EMAIL',true);//NOT IMPLEMENTED!! attach the attachments to the email directly


// Captcha settings ====================================
define('CAPTCHA',true);  //use a captcha
define('SALT','Ypghjkkl2fh87'); //salt for the captcha
define('DIGITS',5);//caracters to show for captcha
define('NRONLY',true); //numbers only, or also show alfanumeric characters (0,1,o,l are ignored) if set to true, user MUST enter correct CaPs!!
define('PATH','captcha/');// path to captcha resources
define('COOKIE_VALID_MIN',60); //the captcha is valid for this many minutes

// BETTER TO USE recaptcha from GOOGLE !!
define('GOOGLE_RECAPTHCA_SECRET',''); //IF YOU WANT TO USE GOOGLE CAPTCHA, visit https://www.google.com/recaptcha/ to get a secret key


//change language
define('MSG_REQUIRED','%s is required'); //text for the required fields
define('MSG_FILE_SIZE','File exceeds maximum allowed file size.');
define('MSG_FILE_TYPE_NOT_ALLOWED','File Type is not allowed.');

define('SSL_CHECK',true); //sometimes, CURL has problems getting httpS sites, on a decent host it can be fixed easily, but if you want a 'quick&ditry fix', just set this to false; (check out our blog for an in-depth read about why you souldn't do this, though)
