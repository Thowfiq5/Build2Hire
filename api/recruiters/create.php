<?php
// api/recruiters/create.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(405, false, "Method Not Allowed. Use POST.");
}

$data = getRequestData();

if (empty($data['user_id']) || empty($data['company_name'])) {
    sendResponse(400, false, "user_id and company_name are required.");
}

$user_id = (int)$data['user_id'];
$company_name = trim($data['company_name']);
$designation = $data['designation'] ?? null;
$company_website = $data['company_website'] ?? null;
$company_logo = $data['company_logo'] ?? null;

$db = (new Database())->getConnection();

try {
    $stmt = $db->prepare("INSERT INTO recruiters (user_id, company_name, designation, company_website, company_logo) VALUES (:user_id, :company_name, :designation, :company_website, :company_logo)");
    $stmt->execute([
        ':user_id' => $user_id,
        ':company_name' => $company_name,
        ':designation' => $designation,
        ':company_website' => $company_website,
        ':company_logo' => $company_logo
    ]);

    sendResponse(201, true, "Recruiter profile created successfully.", ["id" => (int)$db->lastInsertId()]);
} catch (Exception $e) {
    sendResponse(500, false, "Database error: " . $e->getMessage());
}
