<?php
class Config
{
    const ENV = 'dev';

    const SITE_TITLE = 'Help Learning';
    const SITE_SUB_TITLE = 'Help Learning Portal';
    const SITE_ADMIN = 'Narasimha Nanduri';
    const SERVER_MAIL = 'info@help.org';

    const BASE_URL = 'http://localhost/learning-portal-admin-panel/api/';
    const CORS_DOMAINS = array('localhost:3000');

    const DB_NAME = "help";
    const DB_PASS = "";
    const DB_HOST = "localhost";
    const DB_USER = "root";

    const SMTP_MAIL = "no-reply@learn.help.org";
    const SMTP_HOST = "learn.help.org";
    const SMTP_USERNAME = "no-reply@learn.help.org";
    const SMTP_PASSWORD = "zxcvbnmLP.";
    const SMTP_PORT = "465";
}
