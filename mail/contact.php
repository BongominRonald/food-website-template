<?php
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Method Not Allowed. Please submit via POST.'
    ]);
    exit();
}

$rawInput = file_get_contents('php://input');
$jsonData = json_decode($rawInput, true);

$name    = isset($_POST['name']) ? trim($_POST['name']) : (isset($jsonData['name']) ? trim($jsonData['name']) : '');
$email   = isset($_POST['email']) ? trim($_POST['email']) : (isset($jsonData['email']) ? trim($jsonData['email']) : '');
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : (isset($jsonData['subject']) ? trim($jsonData['subject']) : 'General Customer Inquiry');
$message = isset($_POST['message']) ? trim($_POST['message']) : (isset($jsonData['message']) ? trim($jsonData['message']) : '');

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Please fill in all required fields (Name, Email, and Message).'
    ]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Please provide a valid email address.'
    ]);
    exit();
}

// Generate unique tracking reference
$referenceId = 'BK-MSG-' . strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 8));
$timestamp = date('Y-m-d H:i:s');

// Prepare log payload
$logEntry = sprintf(
    "[%s] Reference: %s | Name: %s | Email: %s | Subject: %s | Message: %s\n",
    $timestamp,
    $referenceId,
    str_replace(["\r", "\n"], ' ', $name),
    str_replace(["\r", "\n"], ' ', $email),
    str_replace(["\r", "\n"], ' ', $subject),
    str_replace(["\r", "\n"], ' ', $message)
);

$logDir = __DIR__ . '/logs';
if (!is_dir($logDir)) {
    @mkdir($logDir, 0755, true);
}
@file_put_contents($logDir . '/contact_inquiries.log', $logEntry, FILE_APPEND | LOCK_EX);

// Attempt PHP mail if available (fails silently to local log if SMTP unconfigured)
$to = 'order@burgerking-craft.com';
$emailSubject = "[$referenceId] New Inquiry: " . htmlspecialchars($subject);
$headers = "From: no-reply@burgerking-craft.com\r\n" .
           "Reply-To: " . htmlspecialchars($email) . "\r\n" .
           "X-Mailer: PHP/" . phpversion();
@mail($to, $emailSubject, $logEntry, $headers);

http_response_code(200);
echo json_encode([
    'status' => 'success',
    'message' => 'Thank you for reaching out! Your message has been received and our hospitality team will respond shortly.',
    'reference' => $referenceId,
    'timestamp' => $timestamp
]);
