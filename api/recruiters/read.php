<?php
// api/recruiters/read.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendResponse(405, false, "Method Not Allowed. Use GET.");
}

$data = getRequestData();
$id = isset($data['id']) ? (int)$data['id'] : null;
$user_id = isset($data['user_id']) ? (int)$data['user_id'] : null;

$db = (new Database())->getConnection();

if ($id) {
    $stmt = $db->prepare("SELECT r.*, u.full_name, u.email, u.avatar_url FROM recruiters r JOIN users u ON r.user_id = u.id WHERE r.id = :id");
    $stmt->execute([':id' => $id]);
    $recruiter = $stmt->fetch();
    if (!$recruiter) sendResponse(404, false, "Recruiter not found.");
    sendResponse(200, true, "Recruiter fetched successfully.", $recruiter);
} elseif ($user_id) {
    $stmt = $db->prepare("SELECT r.*, u.full_name, u.email, u.avatar_url FROM recruiters r JOIN users u ON r.user_id = u.id WHERE r.user_id = :user_id");
    $stmt->execute([':user_id' => $user_id]);
    $recruiter = $stmt->fetch();
    if (!$recruiter) sendResponse(404, false, "Recruiter not found for this user.");
    sendResponse(200, true, "Recruiter fetched successfully.", $recruiter);
} else {
    $stmt = $db->query("SELECT r.*, u.full_name, u.email, u.avatar_url FROM recruiters r JOIN users u ON r.user_id = u.id ORDER BY r.id DESC LIMIT 50");
    sendResponse(200, true, "Recruiters list retrieved successfully.", $stmt->fetchAll());
}
