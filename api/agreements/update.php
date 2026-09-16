<?php
// api/agreements/update.php

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
$terms_content = $data['terms_content'] ?? null;
$amount = isset($data['amount']) ? (float)$data['amount'] : null;
$status = $data['status'] ?? null;
$signed_at = ($status === 'signed') ? date("Y-m-d H:i:s") : null;

$query = "UPDATE agreements SET 
    title = COALESCE(:title, title),
    terms_content = COALESCE(:terms_content, terms_content),
    amount = COALESCE(:amount, amount),
    status = COALESCE(:status, status),
    signed_at = COALESCE(:signed_at, signed_at)
    WHERE id = :id";

try {
    $stmt = $db->prepare($query);
    $stmt->execute([
        ':title' => $title,
        ':terms_content' => $terms_content,
        ':amount' => $amount,
        ':status' => $status,
        ':signed_at' => $signed_at,
        ':id' => $id
    ]);
    sendResponse(200, true, "Agreement contract updated successfully.");
} catch (Exception $e) {
    sendResponse(500, false, "Database error: " . $e->getMessage());
}
