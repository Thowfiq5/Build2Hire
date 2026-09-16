<?php
// api/jobs/update.php

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
$category = $data['category'] ?? null;
$job_type = $data['job_type'] ?? null;
$salary_range = $data['salary_range'] ?? null;
$location = $data['location'] ?? null;
$status = $data['status'] ?? null;

$query = "UPDATE jobs SET 
    title = COALESCE(:title, title),
    description = COALESCE(:description, description),
    category = COALESCE(:category, category),
    job_type = COALESCE(:job_type, job_type),
    salary_range = COALESCE(:salary_range, salary_range),
    location = COALESCE(:location, location),
    status = COALESCE(:status, status)
    WHERE id = :id";

try {
    $stmt = $db->prepare($query);
    $stmt->execute([
        ':title' => $title,
        ':description' => $description,
        ':category' => $category,
        ':job_type' => $job_type,
        ':salary_range' => $salary_range,
        ':location' => $location,
        ':status' => $status,
        ':id' => $id
    ]);
    sendResponse(200, true, "Job posting updated successfully.");
} catch (Exception $e) {
    sendResponse(500, false, "Database error: " . $e->getMessage());
}
