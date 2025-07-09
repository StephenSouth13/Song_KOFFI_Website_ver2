<?php
header('Content-Type: application/json');

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$bookings_file = '../data/bookings.json';
$bookings = [];

// Load existing bookings
if (file_exists($bookings_file)) {
    $bookings = json_decode(file_get_contents($bookings_file), true);
    if (!$bookings) {
        $bookings = [];
    }
}

// Add new booking
$bookings[] = $input;

// Save to file
if (file_put_contents($bookings_file, json_encode($bookings, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save booking']);
}
?>