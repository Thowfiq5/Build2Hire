<?php
// api/candidates/read.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendResponse(405, false, "Method Not Allowed. Use GET.");
}

$data = getRequestData();
$id = isset($data['id']) ? (int)$data['id'] : null;
$user_id = isset($data['user_id']) ? (int)$data['user_id'] : null;

$db = (new Database())->getConnection();

if ($id) {
    $stmt = $db->prepare("SELECT c.*, u.full_name, u.email, u.avatar_url FROM candidates c JOIN users u ON c.user_id = u.id WHERE c.id = :id");
    $stmt->execute([':id' => $id]);
    $candidate = $stmt->fetch();
    if (!$candidate) sendResponse(404, false, "Candidate not found.");
    $candidate['skills'] = json_decode($candidate['skills'] ?? '[]');
    sendResponse(200, true, "Candidate fetched successfully.", $candidate);
} elseif ($user_id) {
    $stmt = $db->prepare("SELECT c.*, u.full_name, u.email, u.avatar_url FROM candidates c JOIN users u ON c.user_id = u.id WHERE c.user_id = :user_id");
    $stmt->execute([':user_id' => $user_id]);
    $candidate = $stmt->fetch();
    if (!$candidate) sendResponse(404, false, "Candidate profile not found for this user.");
    $candidate['skills'] = json_decode($candidate['skills'] ?? '[]');
    sendResponse(200, true, "Candidate fetched successfully.", $candidate);
} else {
    $stmt = $db->query("SELECT c.*, u.full_name, u.email, u.avatar_url FROM candidates c JOIN users u ON c.user_id = u.id ORDER BY c.id DESC LIMIT 50");
    $candidates = $stmt->fetchAll();
    foreach ($candidates as &$cand) {
        $cand['skills'] = json_decode($cand['skills'] ?? '[]');
    }
    sendResponse(200, true, "Candidates list retrieved successfully.", $candidates);
}
