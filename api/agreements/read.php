<?php
// api/agreements/read.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendResponse(405, false, "Method Not Allowed. Use GET.");
}

$data = getRequestData();
$id = isset($data['id']) ? (int)$data['id'] : null;
$user_id = isset($data['user_id']) ? (int)$data['user_id'] : null;

$db = (new Database())->getConnection();

if ($id) {
    $stmt = $db->prepare("SELECT a.*, u1.full_name as client_name, u2.full_name as candidate_name FROM agreements a JOIN users u1 ON a.client_id = u1.id JOIN users u2 ON a.candidate_id = u2.id WHERE a.id = :id");
    $stmt->execute([':id' => $id]);
    $agreement = $stmt->fetch();
    if (!$agreement) sendResponse(404, false, "Agreement not found.");
    sendResponse(200, true, "Agreement fetched successfully.", $agreement);
} elseif ($user_id) {
    $stmt = $db->prepare("SELECT a.*, u1.full_name as client_name, u2.full_name as candidate_name FROM agreements a JOIN users u1 ON a.client_id = u1.id JOIN users u2 ON a.candidate_id = u2.id WHERE a.client_id = :user_id OR a.candidate_id = :user_id ORDER BY a.id DESC");
    $stmt->execute([':user_id' => $user_id]);
    sendResponse(200, true, "Agreements fetched successfully.", $stmt->fetchAll());
} else {
    $stmt = $db->query("SELECT a.*, u1.full_name as client_name, u2.full_name as candidate_name FROM agreements a JOIN users u1 ON a.client_id = u1.id JOIN users u2 ON a.candidate_id = u2.id ORDER BY a.id DESC LIMIT 50");
    sendResponse(200, true, "Agreements list retrieved successfully.", $stmt->fetchAll());
}
