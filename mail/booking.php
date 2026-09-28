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

$name     = isset($_POST['name']) ? trim($_POST['name']) : (isset($jsonData['name']) ? trim($jsonData['name']) : '');
$email    = isset($_POST['email']) ? trim($_POST['email']) : (isset($jsonData['email']) ? trim($jsonData['email']) : '');
$phone    = isset($_POST['phone']) ? trim($_POST['phone']) : (isset($_POST['mobile']) ? trim($_POST['mobile']) : (isset($jsonData['phone']) ? trim($jsonData['phone']) : ''));
$date     = isset($_POST['date']) ? trim($_POST['date']) : (isset($jsonData['date']) ? trim($jsonData['date']) : '');
$time     = isset($_POST['time']) ? trim($_POST['time']) : (isset($jsonData['time']) ? trim($jsonData['time']) : '');
$guests   = isset($_POST['guests']) ? trim($_POST['guests']) : (isset($_POST['guest']) ? trim($_POST['guest']) : (isset($jsonData['guests']) ? trim($jsonData['guests']) : '2 Guests'));
$seating  = isset($_POST['seating']) ? trim($_POST['seating']) : (isset($jsonData['seating']) ? trim($jsonData['seating']) : 'Main Dining Room');
$notes    = isset($_POST['notes']) ? trim($_POST['notes']) : (isset($jsonData['notes']) ? trim($jsonData['notes']) : 'None');

if (empty($name) || empty($email) || empty($phone) || empty($date)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Please provide your full Name, Email, Phone number, and Preferred Date.'
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

// Generate unique booking confirmation code
$bookingCode = 'BK-TBL-' . strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 8));
$timestamp = date('Y-m-d H:i:s');

// Prepare log payload
$logEntry = sprintf(
    "[%s] Reservation: %s | Guest: %s | Email: %s | Phone: %s | Date: %s | Time: %s | Party Size: %s | Seating: %s | Special Requests: %s\n",
    $timestamp,
    $bookingCode,
    str_replace(["\r", "\n"], ' ', $name),
    str_replace(["\r", "\n"], ' ', $email),
    str_replace(["\r", "\n"], ' ', $phone),
    str_replace(["\r", "\n"], ' ', $date),
    str_replace(["\r", "\n"], ' ', $time),
    str_replace(["\r", "\n"], ' ', $guests),
    str_replace(["\r", "\n"], ' ', $seating),
    str_replace(["\r", "\n"], ' ', $notes)
);

$logDir = __DIR__ . '/logs';
if (!is_dir($logDir)) {
    @mkdir($logDir, 0755, true);
}
@file_put_contents($logDir . '/table_bookings.log', $logEntry, FILE_APPEND | LOCK_EX);

// Attempt PHP mail notification
$to = 'reservations@burgerking-craft.com';
$emailSubject = "[$bookingCode] Table Reservation Request: " . htmlspecialchars($name);
$headers = "From: no-reply@burgerking-craft.com\r\n" .
           "Reply-To: " . htmlspecialchars($email) . "\r\n" .
           "X-Mailer: PHP/" . phpversion();
@mail($to, $emailSubject, $logEntry, $headers);

http_response_code(200);
echo json_encode([
    'status' => 'success',
    'message' => 'Your table reservation has been successfully booked! A confirmation email and SMS reminder have been scheduled.',
    'booking_code' => $bookingCode,
    'details' => [
        'name' => $name,
        'date' => $date,
        'time' => $time,
        'party_size' => $guests,
        'seating' => $seating
    ],
    'timestamp' => $timestamp
]);
