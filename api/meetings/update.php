<?php
// api/meetings/update.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'PUT' && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(405, false, "Method Not Allowed. Use PUT or POST.");
}

$data = getRequestData();
$id = isset($data['id']) ? (int)$data['id'] : null;

if (!$id) {
    sendResponse(400, false, "id is required.");
}

$db = (new Database())->getConnection();

$title = $data['title'] ?? null;
$scheduled_at = $data['scheduled_at'] ?? null;
$meeting_link = $data['meeting_link'] ?? null;
$status = $data['status'] ?? null;

$query = "UPDATE meetings SET 
    title = COALESCE(:title, title),
    scheduled_at = COALESCE(:scheduled_at, scheduled_at),
    meeting_link = COALESCE(:meeting_link, meeting_link),
    status = COALESCE(:status, status)
    WHERE id = :id";

try {
    $stmt = $db->prepare($query);
    $stmt->execute([
        ':title' => $title,
        ':scheduled_at' => $scheduled_at,
        ':meeting_link' => $meeting_link,
        ':status' => $status,
        ':id' => $id
    ]);
    sendResponse(200, true, "Meeting updated successfully.");
} catch (Exception $e) {
    sendResponse(500, false, "Database error: " . $e->getMessage());
}
