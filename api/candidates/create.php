<?php
// api/candidates/create.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(405, false, "Method Not Allowed. Use POST.");
}

$data = getRequestData();

if (empty($data['user_id'])) {
    sendResponse(400, false, "user_id is required.");
}

$user_id = (int)$data['user_id'];
$title = $data['title'] ?? null;
$bio = $data['bio'] ?? null;
$skills = isset($data['skills']) ? (is_array($data['skills']) ? json_encode($data['skills']) : $data['skills']) : null;
$experience_years = (int)($data['experience_years'] ?? 0);
$location = $data['location'] ?? null;
$github_url = $data['github_url'] ?? null;
$linkedin_url = $data['linkedin_url'] ?? null;

$db = (new Database())->getConnection();

// Check if candidate profile already exists
$checkStmt = $db->prepare("SELECT id FROM candidates WHERE user_id = :user_id");
$checkStmt->execute([':user_id' => $user_id]);
$existing = $checkStmt->fetch();

if ($existing) {
    sendResponse(409, false, "Candidate profile already exists for this user_id. Use update instead.");
}

try {
    $stmt = $db->prepare("INSERT INTO candidates (user_id, title, bio, skills, experience_years, location, github_url, linkedin_url) VALUES (:user_id, :title, :bio, :skills, :experience_years, :location, :github_url, :linkedin_url)");
    $stmt->execute([
        ':user_id' => $user_id,
        ':title' => $title,
        ':bio' => $bio,
        ':skills' => $skills,
        ':experience_years' => $experience_years,
        ':location' => $location,
        ':github_url' => $github_url,
        ':linkedin_url' => $linkedin_url
    ]);

    sendResponse(201, true, "Candidate profile created successfully.", ["id" => (int)$db->lastInsertId()]);
} catch (Exception $e) {
    sendResponse(500, false, "Database error: " . $e->getMessage());
}
