# EZPost

## Requirements

- PHP v8 or higher
- PDO extension
- Apache rewrite and env module

## Installation

To install EZPost, simply upload the packaged file to your server and extract it. Once uploaded, visit the URL where you
uploaded the files and the app should automatically direct you to the installation page. Follow the instructions on the
page and once the installation is complete, you will be redirected to the login page.

## Maintenance

All core files are located in the `app` directory. This includes the core classes, functions, pages, and templates.
Everything else is not a part of the core app and can be modified freely. When updating EZPost, only the `app` directory
needs to be replaced.

EZPost also utilizes a sqlite database to store data. This database is located in the `data` directory and is not a part
of the core app. However, with some updates to the core app, a "database migration" may be required. To check if a
database migration is needed, update the app and then visit `/admin/settings`. If a migration is needed, a button will
be displayed to perform the migration.

!!! WARNING !!!

Always backup the database before performing a migration. Migrations can not be undone.

The default location for the database will be `data/database.sqlite`.

## Configuration

Most, if not all, of the configuration is done through the admin's settings page. However, if configuration is needed to
be done manually, the configuration file is located at `data/config.json`.

### Manually Resetting the Admin Password

Passwords in EZPost are hashed, so they can not be retrieved. However, the password can be reset by modifying the admin
email in the `data/config.json` file. Once the email is modified, visit the login page and click "Forgot Password". An
email will be sent to the new email address with a link to reset the password.

## Directory Structure

```
├── app (the core app)
│   ├── assets (built src files)
│   ├── classes (core classes)
│   ├── functions (core functions)
│   ├── pages (core pages)
│   ├── templates (core templates)
│   └── src (source files)
├── assets (publically available assets/files that are not apart of the core app)
├── data (files that are not publically available and are not apart of the core app but are used to store data)
├── pages (pages that are not apart of the core app)
├── templates (templates that are not apart of the core app)
├── vendor (composer packages)
├── .htaccess (apache configuration)
├── composer.json (composer configuration)
├── composer.lock (composer lock file)
```

## Customization

EZPost can be customized by modifying the files outside the `app` directory. The `app` directory is the core of the
app and should not be modified.

The main files that can be modified are the `pages`, `templates`, and `assets` directories.

### Assets

The assets folder contains files that are served directly to the user. This includes images, stylesheets, and scripts.

The main two files that are used within the application are `assets/blog.css` and `assets/content.css`

- `assets/blog.css` is used to style the blog pages
- `assets/content.css` is used to style the content pages and is also included in the admin editor to style the content

### Pages

Pages in EZPost are set up using a file based routing system. This means that the file name is the route. For example,
the file `about.php` would be accessible at `/about`.

Routes prefixed with a `$` are dynamic routes. For example, the file `post.$slug.php` would be accessible
at `/post/{slug}` (or for a real example: `/post/post-slug-here`). The `slug` variable is passed to the page as
a `$_GET` variable.

The three default pages are:

- index.php (home page)
- post.$slug.php (blog post)
- embed.php (embed page for iframes)

#### Embeds

The embed page is used to display a list of posts on different parts of websites and
includes a couple query parameters to customize the embed.

Query parameters:

- page (the page to display)
- per_page (the amount of items to display per page)

The embed page is located at `/embed`. An example of an embed page would be `/embed?page=1&per_page=10`.

By default, links on the embed page will be set to `target="_blank"`. This can be changed by modifying the `embed.php`
page

### Templates

Templates in EZPost are used to display the content of the pages. These templates can be used via the `template`
function which also accepts variables.

The default templates are:

- `header.php` (the header of the website)
- `footer.php` (the footer of the website, includes the scripts and analytics)
- `head.php` (the head of the website, includes stylesheets and other meta tags)
- `pagination.php` (displays pagination)
- `post-card.php` (displays a post card of a article and used in the post-list template)
- `post-list.php` (displays a list of posts)
- `sidebar.php` (sidebar template)

## For Developers

EZPost is built using PHP, SQLite, and Vite for bunlding assets. EZPost also uses Composer and Yarn for package
management. Yarn is also used to build the application.

To build the application, run `yarn build` in the root directory of the application.

This will:

- use composer to dump the autoloader and install any new packages in an optimized mode.
- build the assets in `app/src` and place them in the `app/assets` directory.
- copy `app`, `assets`, `pages`, `vendor`, `.htaccess`, `composer.json`, `composer.lock` and `templates` to
  the `dist/source` directory.
- zip up the `dist/source` directory and place it in the `dist` directory.