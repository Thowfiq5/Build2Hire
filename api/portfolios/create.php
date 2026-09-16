<?php
// api/portfolios/create.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(405, false, "Method Not Allowed. Use POST.");
}

$data = getRequestData();

if (empty($data['candidate_id'])) {
    sendResponse(400, false, "candidate_id is required.");
}

$candidate_id = (int)$data['candidate_id'];
$summary = $data['summary'] ?? null;
$featured_projects = isset($data['featured_projects']) ? (is_array($data['featured_projects']) ? json_encode($data['featured_projects']) : $data['featured_projects']) : null;
$custom_domain = $data['custom_domain'] ?? null;
$theme = $data['theme'] ?? 'default';

$db = (new Database())->getConnection();

try {
    $stmt = $db->prepare("INSERT INTO portfolios (candidate_id, summary, featured_projects, custom_domain, theme) VALUES (:candidate_id, :summary, :featured_projects, :custom_domain, :theme)");
    $stmt->execute([
        ':candidate_id' => $candidate_id,
        ':summary' => $summary,
        ':featured_projects' => $featured_projects,
        ':custom_domain' => $custom_domain,
        ':theme' => $theme
    ]);

    sendResponse(201, true, "Portfolio details created successfully.", ["id" => (int)$db->lastInsertId()]);
} catch (Exception $e) {
    sendResponse(500, false, "Database error: " . $e->getMessage());
}
