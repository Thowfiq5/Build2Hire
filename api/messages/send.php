<?php
// api/messages/send.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(405, false, "Method Not Allowed. Use POST.");
}

$data = getRequestData();

if (empty($data['sender_id']) || empty($data['receiver_id']) || empty($data['message_text'])) {
    sendResponse(400, false, "sender_id, receiver_id, and message_text are required.");
}

$sender_id = (int)$data['sender_id'];
$receiver_id = (int)$data['receiver_id'];
$message_text = trim($data['message_text']);

$db = (new Database())->getConnection();

try {
    $stmt = $db->prepare("INSERT INTO messages (sender_id, receiver_id, message_text) VALUES (:sender_id, :receiver_id, :message_text)");
    $stmt->execute([
        ':sender_id' => $sender_id,
        ':receiver_id' => $receiver_id,
        ':message_text' => $message_text
    ]);

    sendResponse(201, true, "Message sent successfully.", [
        "id" => (int)$db->lastInsertId(),
        "sent_at" => date("Y-m-d H:i:s")
    ]);
} catch (Exception $e) {
    sendResponse(500, false, "Database error: " . $e->getMessage());
}
