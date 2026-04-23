CREATE TABLE IF NOT EXISTS posts
(
    id                 VARCHAR(255) PRIMARY KEY,
    title              VARCHAR(255) NOT NULL,
    slug               VARCHAR(255) NOT NULL UNIQUE,
    status             VARCHAR(255) NOT NULL,
    publish_date       DATETIME     NOT NULL,
    seo_title          VARCHAR(255) NOT NULL,
    description        TEXT         NOT NULL,
    keywords           TEXT         NOT NULL,
    custom_header_code TEXT         NOT NULL,
    custom_footer_code TEXT         NOT NULL
);