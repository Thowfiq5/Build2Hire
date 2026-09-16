<?php
// api/projects/update.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'PUT' && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(405, false, "Method Not Allowed. Use PUT or POST.");
}

$data = getRequestData();
$id = isset($data['id']) ? (int)$data['id'] : null;

if (!$id) {
    sendResponse(400, false, "id is required.");
}

$db = (new Database())->getConnection();

$title = $data['title'] ?? null;
$description = $data['description'] ?? null;
$repo_url = $data['repo_url'] ?? null;
$live_demo_url = $data['live_demo_url'] ?? null;
$tech_stack = isset($data['tech_stack']) ? (is_array($data['tech_stack']) ? json_encode($data['tech_stack']) : $data['tech_stack']) : null;

$query = "UPDATE projects SET 
    title = COALESCE(:title, title),
    description = COALESCE(:description, description),
    repo_url = COALESCE(:repo_url, repo_url),
    live_demo_url = COALESCE(:live_demo_url, live_demo_url),
    tech_stack = COALESCE(:tech_stack, tech_stack)
    WHERE id = :id";

try {
    $stmt = $db->prepare($query);
    $stmt->execute([
        ':title' => $title,
        ':description' => $description,
        ':repo_url' => $repo_url,
        ':live_demo_url' => $live_demo_url,
        ':tech_stack' => $tech_stack,
        ':id' => $id
    ]);
    sendResponse(200, true, "Project updated successfully.");
} catch (Exception $e) {
    sendResponse(500, false, "Database error: " . $e->getMessage());
}
