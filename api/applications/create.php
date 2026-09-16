<?php
// api/applications/create.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(405, false, "Method Not Allowed. Use POST.");
}

$data = getRequestData();

if (empty($data['job_id']) || empty($data['candidate_id'])) {
    sendResponse(400, false, "job_id and candidate_id are required.");
}

$job_id = (int)$data['job_id'];
$candidate_id = (int)$data['candidate_id'];
$cover_letter = $data['cover_letter'] ?? null;

$db = (new Database())->getConnection();

// Check if application already submitted
$checkStmt = $db->prepare("SELECT id FROM applications WHERE job_id = :job_id AND candidate_id = :candidate_id");
$checkStmt->execute([':job_id' => $job_id, ':candidate_id' => $candidate_id]);
if ($checkStmt->fetch()) {
    sendResponse(409, false, "You have already applied for this job.");
}

try {
    $stmt = $db->prepare("INSERT INTO applications (job_id, candidate_id, cover_letter, status) VALUES (:job_id, :candidate_id, :cover_letter, 'pending')");
    $stmt->execute([
        ':job_id' => $job_id,
        ':candidate_id' => $candidate_id,
        ':cover_letter' => $cover_letter
    ]);

    sendResponse(201, true, "Job application submitted successfully.", ["id" => (int)$db->lastInsertId()]);
} catch (Exception $e) {
    sendResponse(500, false, "Database error: " . $e->getMessage());
}
