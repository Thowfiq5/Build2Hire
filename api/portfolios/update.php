<?php
// api/portfolios/update.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'PUT' && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(405, false, "Method Not Allowed. Use PUT or POST.");
}

$data = getRequestData();
$id = isset($data['id']) ? (int)$data['id'] : null;
$candidate_id = isset($data['candidate_id']) ? (int)$data['candidate_id'] : null;

if (!$id && !$candidate_id) {
    sendResponse(400, false, "id or candidate_id is required.");
}

$db = (new Database())->getConnection();

$summary = $data['summary'] ?? null;
$featured_projects = isset($data['featured_projects']) ? (is_array($data['featured_projects']) ? json_encode($data['featured_projects']) : $data['featured_projects']) : null;
$custom_domain = $data['custom_domain'] ?? null;
$theme = $data['theme'] ?? null;

$query = "UPDATE portfolios SET 
    summary = COALESCE(:summary, summary),
    featured_projects = COALESCE(:featured_projects, featured_projects),
    custom_domain = COALESCE(:custom_domain, custom_domain),
    theme = COALESCE(:theme, theme)
    WHERE " . ($id ? "id = :id" : "candidate_id = :candidate_id");

try {
    $stmt = $db->prepare($query);
    $params = [
        ':summary' => $summary,
        ':featured_projects' => $featured_projects,
        ':custom_domain' => $custom_domain,
        ':theme' => $theme
    ];
    if ($id) $params[':id'] = $id;
    else $params[':candidate_id'] = $candidate_id;

    $stmt->execute($params);
    sendResponse(200, true, "Portfolio updated successfully.");
} catch (Exception $e) {
    sendResponse(500, false, "Database error: " . $e->getMessage());
}
