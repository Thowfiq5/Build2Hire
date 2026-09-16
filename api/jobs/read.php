<?php
// api/jobs/read.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendResponse(405, false, "Method Not Allowed. Use GET.");
}

$data = getRequestData();
$id = isset($data['id']) ? (int)$data['id'] : null;
$category = isset($data['category']) ? trim($data['category']) : null;
$search = isset($data['search']) ? trim($data['search']) : null;

$db = (new Database())->getConnection();

if ($id) {
    $stmt = $db->prepare("SELECT j.*, u.full_name as recruiter_name, r.company_name, r.company_logo FROM jobs j JOIN users u ON j.recruiter_id = u.id LEFT JOIN recruiters r ON r.user_id = u.id WHERE j.id = :id");
    $stmt->execute([':id' => $id]);
    $job = $stmt->fetch();
    if (!$job) sendResponse(404, false, "Job posting not found.");
    sendResponse(200, true, "Job fetched successfully.", $job);
} else {
    $sql = "SELECT j.*, u.full_name as recruiter_name, r.company_name, r.company_logo FROM jobs j JOIN users u ON j.recruiter_id = u.id LEFT JOIN recruiters r ON r.user_id = u.id WHERE j.status = 'open'";
    $params = [];

    if ($category) {
        $sql .= " AND j.category = :category";
        $params[':category'] = $category;
    }
    if ($search) {
        $sql .= " AND (j.title LIKE :search OR j.description LIKE :search)";
        $params[':search'] = '%' . $search . '%';
    }

    $sql .= " ORDER BY j.id DESC LIMIT 100";
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    sendResponse(200, true, "Jobs retrieved successfully.", $stmt->fetchAll());
}
