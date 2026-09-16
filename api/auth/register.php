<?php
// api/auth/register.php

require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(405, false, "Method Not Allowed. Use POST.");
}

$data = getRequestData();

if (empty($data['full_name']) || empty($data['email']) || empty($data['password'])) {
    sendResponse(400, false, "Please provide full_name, email, and password.");
}

$full_name = trim($data['full_name']);
$email = filter_var(trim($data['email']), FILTER_VALIDATE_EMAIL);
$password = $data['password'];
$role = isset($data['role']) && in_array($data['role'], ['candidate', 'recruiter', 'client', 'admin']) ? $data['role'] : 'candidate';
$avatar_url = $data['avatar_url'] ?? null;

if (!$email) {
    sendResponse(400, false, "Invalid email address format.");
}

if (strlen($password) < 6) {
    sendResponse(400, false, "Password must be at least 6 characters long.");
}

$db = (new Database())->getConnection();

$checkStmt = $db->prepare("SELECT id FROM users WHERE email = :email");
$checkStmt->execute([':email' => $email]);
if ($checkStmt->fetch()) {
    sendResponse(409, false, "User with this email already exists.");
}

$hashed_password = password_hash($password, PASSWORD_BCRYPT);

try {
    $db->beginTransaction();

    $stmt = $db->prepare("INSERT INTO users (full_name, email, password, role, avatar_url) VALUES (:full_name, :email, :password, :role, :avatar_url)");
    $stmt->execute([
        ':full_name' => $full_name,
        ':email' => $email,
        ':password' => $hashed_password,
        ':role' => $role,
        ':avatar_url' => $avatar_url
    ]);

    $user_id = $db->lastInsertId();

    if ($role === 'candidate') {
        $candStmt = $db->prepare("INSERT INTO candidates (user_id) VALUES (:user_id)");
        $candStmt->execute([':user_id' => $user_id]);
    } elseif ($role === 'recruiter') {
        $recStmt = $db->prepare("INSERT INTO recruiters (user_id, company_name) VALUES (:user_id, :company_name)");
        $recStmt->execute([':user_id' => $user_id, ':company_name' => $data['company_name'] ?? 'Unspecified Company']);
    } elseif ($role === 'client') {
        $cliStmt = $db->prepare("INSERT INTO clients (user_id) VALUES (:user_id)");
        $cliStmt->execute([':user_id' => $user_id]);
    }

    $db->commit();

    sendResponse(201, true, "User registered successfully.", [
        "id" => (int)$user_id,
        "full_name" => $full_name,
        "email" => $email,
        "role" => $role
    ]);
} catch (Exception $e) {
    $db->rollBack();
    sendResponse(500, false, "Failed to register user: " . $e->getMessage());
}
