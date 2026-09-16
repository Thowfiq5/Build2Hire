<?php
// api/jobs/create.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(405, false, "Method Not Allowed. Use POST.");
}

$data = getRequestData();

if (empty($data['recruiter_id']) || empty($data['title']) || empty($data['description']) || empty($data['category'])) {
    sendResponse(400, false, "recruiter_id, title, description, and category are required.");
}

$recruiter_id = (int)$data['recruiter_id'];
$title = trim($data['title']);
$description = trim($data['description']);
$category = trim($data['category']);
$job_type = isset($data['job_type']) && in_array($data['job_type'], ['full-time', 'part-time', 'contract', 'remote']) ? $data['job_type'] : 'full-time';
$salary_range = $data['salary_range'] ?? null;
$location = $data['location'] ?? null;
$status = isset($data['status']) && in_array($data['status'], ['open', 'closed', 'draft']) ? $data['status'] : 'open';

$db = (new Database())->getConnection();

try {
    $stmt = $db->prepare("INSERT INTO jobs (recruiter_id, title, description, category, job_type, salary_range, location, status) VALUES (:recruiter_id, :title, :description, :category, :job_type, :salary_range, :location, :status)");
    $stmt->execute([
        ':recruiter_id' => $recruiter_id,
        ':title' => $title,
        ':description' => $description,
        ':category' => $category,
        ':job_type' => $job_type,
        ':salary_range' => $salary_range,
        ':location' => $location,
        ':status' => $status
    ]);

    sendResponse(201, true, "Job posting created successfully.", ["id" => (int)$db->lastInsertId()]);
} catch (Exception $e) {
    sendResponse(500, false, "Database error: " . $e->getMessage());
}
