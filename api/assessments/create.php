<?php
// api/assessments/create.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(405, false, "Method Not Allowed. Use POST.");
}

$data = getRequestData();

if (empty($data['title']) || empty($data['category']) || empty($data['questions'])) {
    sendResponse(400, false, "title, category, and questions are required.");
}

$title = trim($data['title']);
$category = trim($data['category']);
$total_marks = (int)($data['total_marks'] ?? 100);
$questions = is_array($data['questions']) ? json_encode($data['questions']) : $data['questions'];

$db = (new Database())->getConnection();

try {
    $stmt = $db->prepare("INSERT INTO assessments (title, category, total_marks, questions) VALUES (:title, :category, :total_marks, :questions)");
    $stmt->execute([
        ':title' => $title,
        ':category' => $category,
        ':total_marks' => $total_marks,
        ':questions' => $questions
    ]);

    sendResponse(201, true, "Assessment created successfully.", ["id" => (int)$db->lastInsertId()]);
} catch (Exception $e) {
    sendResponse(500, false, "Database error: " . $e->getMessage());
}
