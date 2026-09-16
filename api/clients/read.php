<?php
// api/clients/read.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendResponse(405, false, "Method Not Allowed. Use GET.");
}

$data = getRequestData();
$id = isset($data['id']) ? (int)$data['id'] : null;
$user_id = isset($data['user_id']) ? (int)$data['user_id'] : null;

$db = (new Database())->getConnection();

if ($id) {
    $stmt = $db->prepare("SELECT c.*, u.full_name, u.email, u.avatar_url FROM clients c JOIN users u ON c.user_id = u.id WHERE c.id = :id");
    $stmt->execute([':id' => $id]);
    $client = $stmt->fetch();
    if (!$client) sendResponse(404, false, "Client profile not found.");
    sendResponse(200, true, "Client profile fetched successfully.", $client);
} elseif ($user_id) {
    $stmt = $db->prepare("SELECT c.*, u.full_name, u.email, u.avatar_url FROM clients c JOIN users u ON c.user_id = u.id WHERE c.user_id = :user_id");
    $stmt->execute([':user_id' => $user_id]);
    $client = $stmt->fetch();
    if (!$client) sendResponse(404, false, "Client profile not found for this user.");
    sendResponse(200, true, "Client profile fetched successfully.", $client);
} else {
    $stmt = $db->query("SELECT c.*, u.full_name, u.email, u.avatar_url FROM clients c JOIN users u ON c.user_id = u.id ORDER BY c.id DESC LIMIT 50");
    sendResponse(200, true, "Clients list retrieved successfully.", $stmt->fetchAll());
}
