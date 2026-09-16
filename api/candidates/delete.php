<?php
// api/candidates/delete.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE' && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(405, false, "Method Not Allowed. Use DELETE or POST.");
}

$data = getRequestData();
$id = isset($data['id']) ? (int)$data['id'] : null;

if (!$id) {
    sendResponse(400, false, "id is required for deletion.");
}

$db = (new Database())->getConnection();

try {
    $stmt = $db->prepare("DELETE FROM candidates WHERE id = :id");
    $stmt->execute([':id' => $id]);
    
    if ($stmt->rowCount() > 0) {
        sendResponse(200, true, "Candidate profile deleted successfully.");
    } else {
        sendResponse(404, false, "Candidate profile not found.");
    }
} catch (Exception $e) {
    sendResponse(500, false, "Database error: " . $e->getMessage());
}
