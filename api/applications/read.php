<?php
// api/applications/read.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendResponse(405, false, "Method Not Allowed. Use GET.");
}

$data = getRequestData();
$id = isset($data['id']) ? (int)$data['id'] : null;
$job_id = isset($data['job_id']) ? (int)$data['job_id'] : null;
$candidate_id = isset($data['candidate_id']) ? (int)$data['candidate_id'] : null;

$db = (new Database())->getConnection();

if ($id) {
    $stmt = $db->prepare("SELECT a.*, j.title as job_title, u.full_name as candidate_name, u.email as candidate_email FROM applications a JOIN jobs j ON a.job_id = j.id JOIN users u ON a.candidate_id = u.id WHERE a.id = :id");
    $stmt->execute([':id' => $id]);
    $app = $stmt->fetch();
    if (!$app) sendResponse(404, false, "Application not found.");
    sendResponse(200, true, "Application fetched successfully.", $app);
} elseif ($job_id) {
    $stmt = $db->prepare("SELECT a.*, u.full_name as candidate_name, u.email as candidate_email, c.skills, c.experience_years FROM applications a JOIN users u ON a.candidate_id = u.id LEFT JOIN candidates c ON c.user_id = u.id WHERE a.job_id = :job_id ORDER BY a.id DESC");
    $stmt->execute([':job_id' => $job_id]);
    $apps = $stmt->fetchAll();
    foreach ($apps as &$app) {
        $app['skills'] = json_decode($app['skills'] ?? '[]');
    }
    sendResponse(200, true, "Applications fetched successfully.", $apps);
} elseif ($candidate_id) {
    $stmt = $db->prepare("SELECT a.*, j.title as job_title, j.category, j.job_type, r.company_name FROM applications a JOIN jobs j ON a.job_id = j.id LEFT JOIN users u ON j.recruiter_id = u.id LEFT JOIN recruiters r ON r.user_id = u.id WHERE a.candidate_id = :candidate_id ORDER BY a.id DESC");
    $stmt->execute([':candidate_id' => $candidate_id]);
    sendResponse(200, true, "Applications fetched successfully.", $stmt->fetchAll());
} else {
    $stmt = $db->query("SELECT a.*, j.title as job_title, u.full_name as candidate_name FROM applications a JOIN jobs j ON a.job_id = j.id JOIN users u ON a.candidate_id = u.id ORDER BY a.id DESC LIMIT 50");
    sendResponse(200, true, "Applications list retrieved successfully.", $stmt->fetchAll());
}
