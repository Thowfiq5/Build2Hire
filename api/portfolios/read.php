<?php
// api/portfolios/read.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendResponse(405, false, "Method Not Allowed. Use GET.");
}

$data = getRequestData();
$id = isset($data['id']) ? (int)$data['id'] : null;
$candidate_id = isset($data['candidate_id']) ? (int)$data['candidate_id'] : null;

$db = (new Database())->getConnection();

if ($id) {
    $stmt = $db->prepare("SELECT p.*, u.full_name, u.email FROM portfolios p JOIN users u ON p.candidate_id = u.id WHERE p.id = :id");
    $stmt->execute([':id' => $id]);
    $portfolio = $stmt->fetch();
    if (!$portfolio) sendResponse(404, false, "Portfolio not found.");
    $portfolio['featured_projects'] = json_decode($portfolio['featured_projects'] ?? '[]');
    sendResponse(200, true, "Portfolio fetched successfully.", $portfolio);
} elseif ($candidate_id) {
    $stmt = $db->prepare("SELECT p.*, u.full_name, u.email FROM portfolios p JOIN users u ON p.candidate_id = u.id WHERE p.candidate_id = :candidate_id");
    $stmt->execute([':candidate_id' => $candidate_id]);
    $portfolio = $stmt->fetch();
    if (!$portfolio) sendResponse(404, false, "Portfolio not found for candidate.");
    $portfolio['featured_projects'] = json_decode($portfolio['featured_projects'] ?? '[]');
    sendResponse(200, true, "Portfolio fetched successfully.", $portfolio);
} else {
    $stmt = $db->query("SELECT p.*, u.full_name, u.email FROM portfolios p JOIN users u ON p.candidate_id = u.id ORDER BY p.id DESC LIMIT 50");
    $portfolios = $stmt->fetchAll();
    foreach ($portfolios as &$port) {
        $port['featured_projects'] = json_decode($port['featured_projects'] ?? '[]');
    }
    sendResponse(200, true, "Portfolios retrieved successfully.", $portfolios);
}
