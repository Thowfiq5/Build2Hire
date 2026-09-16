<?php
// api/clients/create.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(405, false, "Method Not Allowed. Use POST.");
}

$data = getRequestData();

if (empty($data['user_id'])) {
    sendResponse(400, false, "user_id is required.");
}

$user_id = (int)$data['user_id'];
$company_name = $data['company_name'] ?? null;
$industry = $data['industry'] ?? null;

$db = (new Database())->getConnection();

try {
    $stmt = $db->prepare("INSERT INTO clients (user_id, company_name, industry) VALUES (:user_id, :company_name, :industry)");
    $stmt->execute([
        ':user_id' => $user_id,
        ':company_name' => $company_name,
        ':industry' => $industry
    ]);

    sendResponse(201, true, "Client profile created successfully.", ["id" => (int)$db->lastInsertId()]);
} catch (Exception $e) {
    sendResponse(500, false, "Database error: " . $e->getMessage());
}
