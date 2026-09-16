<?php
// api/meetings/create.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(405, false, "Method Not Allowed. Use POST.");
}

$data = getRequestData();

if (empty($data['organizer_id']) || empty($data['participant_id']) || empty($data['title']) || empty($data['scheduled_at'])) {
    sendResponse(400, false, "organizer_id, participant_id, title, and scheduled_at are required.");
}

$organizer_id = (int)$data['organizer_id'];
$participant_id = (int)$data['participant_id'];
$title = trim($data['title']);
$scheduled_at = trim($data['scheduled_at']);
$meeting_link = $data['meeting_link'] ?? "https://meet.google.com/new";
$status = isset($data['status']) && in_array($data['status'], ['scheduled', 'completed', 'cancelled']) ? $data['status'] : 'scheduled';

$db = (new Database())->getConnection();

try {
    $stmt = $db->prepare("INSERT INTO meetings (organizer_id, participant_id, title, scheduled_at, meeting_link, status) VALUES (:organizer_id, :participant_id, :title, :scheduled_at, :meeting_link, :status)");
    $stmt->execute([
        ':organizer_id' => $organizer_id,
        ':participant_id' => $participant_id,
        ':title' => $title,
        ':scheduled_at' => $scheduled_at,
        ':meeting_link' => $meeting_link,
        ':status' => $status
    ]);

    sendResponse(201, true, "Meeting scheduled successfully.", ["id" => (int)$db->lastInsertId()]);
} catch (Exception $e) {
    sendResponse(500, false, "Database error: " . $e->getMessage());
}
