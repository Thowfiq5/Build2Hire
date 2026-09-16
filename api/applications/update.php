<?php
// api/applications/update.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'PUT' && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(405, false, "Method Not Allowed. Use PUT or POST.");
}

$data = getRequestData();
$id = isset($data['id']) ? (int)$data['id'] : null;

if (!$id || empty($data['status'])) {
    sendResponse(400, false, "id and status are required.");
}

$status = $data['status'];
$valid_statuses = ['pending', 'shortlisted', 'interviewed', 'accepted', 'rejected'];

if (!in_array($status, $valid_statuses)) {
    sendResponse(400, false, "Invalid application status value.");
}

$db = (new Database())->getConnection();

try {
    $stmt = $db->prepare("UPDATE applications SET status = :status WHERE id = :id");
    $stmt->execute([':status' => $status, ':id' => $id]);
    sendResponse(200, true, "Application status updated successfully.");
} catch (Exception $e) {
    sendResponse(500, false, "Database error: " . $e->getMessage());
}
