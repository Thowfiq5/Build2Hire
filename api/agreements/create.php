<?php
// api/agreements/create.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(405, false, "Method Not Allowed. Use POST.");
}

$data = getRequestData();

if (empty($data['client_id']) || empty($data['candidate_id']) || empty($data['title']) || empty($data['terms_content'])) {
    sendResponse(400, false, "client_id, candidate_id, title, and terms_content are required.");
}

$client_id = (int)$data['client_id'];
$candidate_id = (int)$data['candidate_id'];
$title = trim($data['title']);
$terms_content = trim($data['terms_content']);
$amount = (float)($data['amount'] ?? 0.00);
$status = isset($data['status']) && in_array($data['status'], ['draft', 'sent', 'signed', 'completed', 'cancelled']) ? $data['status'] : 'draft';

$db = (new Database())->getConnection();

try {
    $stmt = $db->prepare("INSERT INTO agreements (client_id, candidate_id, title, terms_content, amount, status) VALUES (:client_id, :candidate_id, :title, :terms_content, :amount, :status)");
    $stmt->execute([
        ':client_id' => $client_id,
        ':candidate_id' => $candidate_id,
        ':title' => $title,
        ':terms_content' => $terms_content,
        ':amount' => $amount,
        ':status' => $status
    ]);

    sendResponse(201, true, "Agreement contract created successfully.", ["id" => (int)$db->lastInsertId()]);
} catch (Exception $e) {
    sendResponse(500, false, "Database error: " . $e->getMessage());
}
