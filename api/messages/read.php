<?php
// api/messages/read.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendResponse(405, false, "Method Not Allowed. Use GET.");
}

$data = getRequestData();
$user_id = isset($data['user_id']) ? (int)$data['user_id'] : null;
$partner_id = isset($data['partner_id']) ? (int)$data['partner_id'] : null;

if (!$user_id) {
    sendResponse(400, false, "user_id is required.");
}

$db = (new Database())->getConnection();

if ($partner_id) {
    // Fetch direct chat history between two users
    $stmt = $db->prepare("SELECT m.*, u1.full_name as sender_name, u2.full_name as receiver_name 
                          FROM messages m 
                          JOIN users u1 ON m.sender_id = u1.id 
                          JOIN users u2 ON m.receiver_id = u2.id 
                          WHERE (m.sender_id = :user_id AND m.receiver_id = :partner_id) 
                             OR (m.sender_id = :partner_id AND m.receiver_id = :user_id) 
                          ORDER BY m.sent_at ASC");
    $stmt->execute([':user_id' => $user_id, ':partner_id' => $partner_id]);
    
    // Mark as read
    $markRead = $db->prepare("UPDATE messages SET is_read = 1 WHERE sender_id = :partner_id AND receiver_id = :user_id");
    $markRead->execute([':partner_id' => $partner_id, ':user_id' => $user_id]);

    sendResponse(200, true, "Chat messages fetched successfully.", $stmt->fetchAll());
} else {
    // Fetch recent conversations list for user
    $stmt = $db->prepare("SELECT DISTINCT 
                            CASE WHEN sender_id = :user_id THEN receiver_id ELSE sender_id END as contact_id,
                            u.full_name, u.avatar_url, u.role
                          FROM messages m 
                          JOIN users u ON u.id = (CASE WHEN sender_id = :user_id THEN receiver_id ELSE sender_id END)
                          WHERE sender_id = :user_id OR receiver_id = :user_id");
    $stmt->execute([':user_id' => $user_id]);
    sendResponse(200, true, "Recent contacts retrieved successfully.", $stmt->fetchAll());
}
