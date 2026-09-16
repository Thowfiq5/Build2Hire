<?php
// api/assessments/submit.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(405, false, "Method Not Allowed. Use POST.");
}

$data = getRequestData();

if (empty($data['assessment_id']) || empty($data['candidate_id'])) {
    sendResponse(400, false, "assessment_id and candidate_id are required.");
}

$assessment_id = (int)$data['assessment_id'];
$candidate_id = (int)$data['candidate_id'];
$score = (int)($data['score'] ?? 0);
$passed = isset($data['passed']) ? (bool)$data['passed'] : ($score >= 60);

$db = (new Database())->getConnection();

try {
    $stmt = $db->prepare("INSERT INTO assessment_submissions (assessment_id, candidate_id, score, passed) VALUES (:assessment_id, :candidate_id, :score, :passed)");
    $stmt->execute([
        ':assessment_id' => $assessment_id,
        ':candidate_id' => $candidate_id,
        ':score' => $score,
        ':passed' => $passed ? 1 : 0
    ]);

    sendResponse(201, true, "Assessment submitted successfully.", [
        "submission_id" => (int)$db->lastInsertId(),
        "score" => $score,
        "passed" => $passed
    ]);
} catch (Exception $e) {
    sendResponse(500, false, "Database error: " . $e->getMessage());
}
