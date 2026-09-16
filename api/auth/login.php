<?php
// api/auth/login.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(405, false, "Method Not Allowed. Use POST.");
}

$data = getRequestData();

if (empty($data['email']) || empty($data['password'])) {
    sendResponse(400, false, "Please provide email and password.");
}

$email = trim($data['email']);
$password = $data['password'];

$db = (new Database())->getConnection();

$stmt = $db->prepare("SELECT id, full_name, email, password, role, avatar_url, created_at FROM users WHERE email = :email");
$stmt->execute([':email' => $email]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password'])) {
    sendResponse(401, false, "Invalid email or password.");
}

// Generate simple session token or payload response
$token = base64_encode(json_encode([
    "user_id" => $user['id'],
    "email" => $user['email'],
    "role" => $user['role'],
    "exp" => time() + (86400 * 7) // 7 days token
]));

unset($user['password']);

sendResponse(200, true, "Login successful.", [
    "user" => $user,
    "token" => $token
]);
