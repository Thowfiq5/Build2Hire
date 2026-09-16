<?php
// api/meetings/read.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendResponse(405, false, "Method Not Allowed. Use GET.");
}

$data = getRequestData();
$id = isset($data['id']) ? (int)$data['id'] : null;
$user_id = isset($data['user_id']) ? (int)$data['user_id'] : null;

$db = (new Database())->getConnection();

if ($id) {
    $stmt = $db->prepare("SELECT m.*, u1.full_name as organizer_name, u2.full_name as participant_name FROM meetings m JOIN users u1 ON m.organizer_id = u1.id JOIN users u2 ON m.participant_id = u2.id WHERE m.id = :id");
    $stmt->execute([':id' => $id]);
    $meeting = $stmt->fetch();
    if (!$meeting) sendResponse(404, false, "Meeting not found.");
    sendResponse(200, true, "Meeting fetched successfully.", $meeting);
} elseif ($user_id) {
    $stmt = $db->prepare("SELECT m.*, u1.full_name as organizer_name, u2.full_name as participant_name FROM meetings m JOIN users u1 ON m.organizer_id = u1.id JOIN users u2 ON m.participant_id = u2.id WHERE m.organizer_id = :user_id OR m.participant_id = :user_id ORDER BY m.scheduled_at ASC");
    $stmt->execute([':user_id' => $user_id]);
    sendResponse(200, true, "Meetings fetched successfully.", $stmt->fetchAll());
} else {
    $stmt = $db->query("SELECT m.*, u1.full_name as organizer_name, u2.full_name as participant_name FROM meetings m JOIN users u1 ON m.organizer_id = u1.id JOIN users u2 ON m.participant_id = u2.id ORDER BY m.id DESC LIMIT 50");
    sendResponse(200, true, "Meetings list retrieved successfully.", $stmt->fetchAll());
}
