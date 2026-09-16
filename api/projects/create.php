<?php
// api/projects/create.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(405, false, "Method Not Allowed. Use POST.");
}

$data = getRequestData();

if (empty($data['candidate_id']) || empty($data['title'])) {
    sendResponse(400, false, "candidate_id and title are required.");
}

$candidate_id = (int)$data['candidate_id'];
$title = trim($data['title']);
$description = $data['description'] ?? null;
$repo_url = $data['repo_url'] ?? null;
$live_demo_url = $data['live_demo_url'] ?? null;
$tech_stack = isset($data['tech_stack']) ? (is_array($data['tech_stack']) ? json_encode($data['tech_stack']) : $data['tech_stack']) : null;

$db = (new Database())->getConnection();

try {
    $stmt = $db->prepare("INSERT INTO projects (candidate_id, title, description, repo_url, live_demo_url, tech_stack) VALUES (:candidate_id, :title, :description, :repo_url, :live_demo_url, :tech_stack)");
    $stmt->execute([
        ':candidate_id' => $candidate_id,
        ':title' => $title,
        ':description' => $description,
        ':repo_url' => $repo_url,
        ':live_demo_url' => $live_demo_url,
        ':tech_stack' => $tech_stack
    ]);

    sendResponse(201, true, "Project showcase created successfully.", ["id" => (int)$db->lastInsertId()]);
} catch (Exception $e) {
    sendResponse(500, false, "Database error: " . $e->getMessage());
}
