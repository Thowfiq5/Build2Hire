<?php
// api/candidates/update.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'PUT' && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(405, false, "Method Not Allowed. Use PUT or POST.");
}

$data = getRequestData();
$user_id = isset($data['user_id']) ? (int)$data['user_id'] : null;
$id = isset($data['id']) ? (int)$data['id'] : null;

if (!$user_id && !$id) {
    sendResponse(400, false, "Either id or user_id is required for update.");
}

$db = (new Database())->getConnection();

$title = $data['title'] ?? null;
$bio = $data['bio'] ?? null;
$skills = isset($data['skills']) ? (is_array($data['skills']) ? json_encode($data['skills']) : $data['skills']) : null;
$experience_years = isset($data['experience_years']) ? (int)$data['experience_years'] : null;
$location = $data['location'] ?? null;
$github_url = $data['github_url'] ?? null;
$linkedin_url = $data['linkedin_url'] ?? null;

$query = "UPDATE candidates SET 
    title = COALESCE(:title, title),
    bio = COALESCE(:bio, bio),
    skills = COALESCE(:skills, skills),
    experience_years = COALESCE(:experience_years, experience_years),
    location = COALESCE(:location, location),
    github_url = COALESCE(:github_url, github_url),
    linkedin_url = COALESCE(:linkedin_url, linkedin_url)
    WHERE " . ($id ? "id = :id" : "user_id = :user_id");

try {
    $stmt = $db->prepare($query);
    $params = [
        ':title' => $title,
        ':bio' => $bio,
        ':skills' => $skills,
        ':experience_years' => $experience_years,
        ':location' => $location,
        ':github_url' => $github_url,
        ':linkedin_url' => $linkedin_url
    ];
    if ($id) $params[':id'] = $id;
    else $params[':user_id'] = $user_id;

    $stmt->execute($params);

    sendResponse(200, true, "Candidate profile updated successfully.");
} catch (Exception $e) {
    sendResponse(500, false, "Database error: " . $e->getMessage());
}
