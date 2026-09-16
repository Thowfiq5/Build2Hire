<?php
// api/clients/update.php

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
$industry = $data['industry'] ?? null;

$query = "UPDATE clients SET 
    company_name = COALESCE(:company_name, company_name),
    industry = COALESCE(:industry, industry)
    WHERE " . ($id ? "id = :id" : "user_id = :user_id");

try {
    $stmt = $db->prepare($query);
    $params = [
        ':company_name' => $company_name,
        ':industry' => $industry
    ];
    if ($id) $params[':id'] = $id;
    else $params[':user_id'] = $user_id;

    $stmt->execute($params);
    sendResponse(200, true, "Client profile updated successfully.");
} catch (Exception $e) {
    sendResponse(500, false, "Database error: " . $e->getMessage());
}
