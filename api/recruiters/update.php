<?php
// api/recruiters/update.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'PUT' && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(405, false, "Method Not Allowed. Use PUT or POST.");
}

$data = getRequestData();
$id = isset($data['id']) ? (int)$data['id'] : null;
$user_id = isset($data['user_id']) ? (int)$data['user_id'] : null;

if (!$id && !$user_id) {
    sendResponse(400, false, "Either id or user_id is required.");
}

$db = (new Database())->getConnection();

$company_name = $data['company_name'] ?? null;
$designation = $data['designation'] ?? null;
$company_website = $data['company_website'] ?? null;
$company_logo = $data['company_logo'] ?? null;

$query = "UPDATE recruiters SET 
    company_name = COALESCE(:company_name, company_name),
    designation = COALESCE(:designation, designation),
    company_website = COALESCE(:company_website, company_website),
    company_logo = COALESCE(:company_logo, company_logo)
    WHERE " . ($id ? "id = :id" : "user_id = :user_id");

try {
    $stmt = $db->prepare($query);
    $params = [
        ':company_name' => $company_name,
        ':designation' => $designation,
        ':company_website' => $company_website,
        ':company_logo' => $company_logo
    ];
    if ($id) $params[':id'] = $id;
    else $params[':user_id'] = $user_id;

    $stmt->execute($params);
    sendResponse(200, true, "Recruiter profile updated successfully.");
} catch (Exception $e) {
    sendResponse(500, false, "Database error: " . $e->getMessage());
}
