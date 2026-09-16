<?php
// api/assessments/read.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendResponse(405, false, "Method Not Allowed. Use GET.");
}

$data = getRequestData();
$id = isset($data['id']) ? (int)$data['id'] : null;

$db = (new Database())->getConnection();

if ($id) {
    $stmt = $db->prepare("SELECT * FROM assessments WHERE id = :id");
    $stmt->execute([':id' => $id]);
    $assessment = $stmt->fetch();
    if (!$assessment) sendResponse(404, false, "Assessment not found.");
    $assessment['questions'] = json_decode($assessment['questions'] ?? '[]');
    sendResponse(200, true, "Assessment fetched successfully.", $assessment);
} else {
    $stmt = $db->query("SELECT id, title, category, total_marks, created_at FROM assessments ORDER BY id DESC");
    sendResponse(200, true, "Assessments list retrieved successfully.", $stmt->fetchAll());
}
