<?php
// index.php - Build2Hire API Root & Health Check Endpoint

require_once __DIR__ . '/config/database.php';

$db = new Database();
$connection = $db->getConnection();

sendResponse(200, true, "Build2Hire REST API Server is running successfully!", [
    "version" => "1.0.0",
    "status" => "Healthy",
    "timestamp" => date("Y-m-d H:i:s"),
    "endpoints" => [
        "auth" => ["/api/auth/register.php", "/api/auth/login.php"],
        "candidates" => ["/api/candidates/create.php", "/api/candidates/read.php", "/api/candidates/update.php", "/api/candidates/delete.php"],
        "recruiters" => ["/api/recruiters/create.php", "/api/recruiters/read.php", "/api/recruiters/update.php", "/api/recruiters/delete.php"],
        "clients" => ["/api/clients/create.php", "/api/clients/read.php", "/api/clients/update.php", "/api/clients/delete.php"],
        "jobs" => ["/api/jobs/create.php", "/api/jobs/read.php", "/api/jobs/update.php", "/api/jobs/delete.php"],
        "projects" => ["/api/projects/create.php", "/api/projects/read.php", "/api/projects/update.php", "/api/projects/delete.php"],
        "portfolios" => ["/api/portfolios/create.php", "/api/portfolios/read.php", "/api/portfolios/update.php", "/api/portfolios/delete.php"],
        "applications" => ["/api/applications/create.php", "/api/applications/read.php", "/api/applications/update.php", "/api/applications/delete.php"],
        "assessments" => ["/api/assessments/create.php", "/api/assessments/read.php", "/api/assessments/submit.php"],
        "meetings" => ["/api/meetings/create.php", "/api/meetings/read.php", "/api/meetings/update.php", "/api/meetings/delete.php"],
        "messages" => ["/api/messages/send.php", "/api/messages/read.php"],
        "agreements" => ["/api/agreements/create.php", "/api/agreements/read.php", "/api/agreements/update.php", "/api/agreements/delete.php"]
    ]
]);
