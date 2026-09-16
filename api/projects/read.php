<?php
// api/projects/read.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendResponse(405, false, "Method Not Allowed. Use GET.");
}

$data = getRequestData();
$id = isset($data['id']) ? (int)$data['id'] : null;
$candidate_id = isset($data['candidate_id']) ? (int)$data['candidate_id'] : null;

$db = (new Database())->getConnection();

if ($id) {
    $stmt = $db->prepare("SELECT p.*, u.full_name as developer_name FROM projects p JOIN users u ON p.candidate_id = u.id WHERE p.id = :id");
    $stmt->execute([':id' => $id]);
    $project = $stmt->fetch();
    if (!$project) sendResponse(404, false, "Project not found.");
    $project['tech_stack'] = json_decode($project['tech_stack'] ?? '[]');
    sendResponse(200, true, "Project fetched successfully.", $project);
} elseif ($candidate_id) {
    $stmt = $db->prepare("SELECT * FROM projects WHERE candidate_id = :candidate_id ORDER BY id DESC");
    $stmt->execute([':candidate_id' => $candidate_id]);
    $projects = $stmt->fetchAll();
    foreach ($projects as &$proj) {
        $proj['tech_stack'] = json_decode($proj['tech_stack'] ?? '[]');
    }
    sendResponse(200, true, "Projects retrieved successfully.", $projects);
} else {
    $stmt = $db->query("SELECT p.*, u.full_name as developer_name FROM projects p JOIN users u ON p.candidate_id = u.id ORDER BY p.id DESC LIMIT 50");
    $projects = $stmt->fetchAll();
    foreach ($projects as &$proj) {
        $proj['tech_stack'] = json_decode($proj['tech_stack'] ?? '[]');
    }
    sendResponse(200, true, "Projects retrieved successfully.", $projects);
}
