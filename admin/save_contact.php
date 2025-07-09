<?php
header('Content-Type: application/json');

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$contacts_file = '../data/contacts.json';
$contacts = [];

// Load existing contacts
if (file_exists($contacts_file)) {
    $contacts = json_decode(file_get_contents($contacts_file), true);
    if (!$contacts) {
        $contacts = [];
    }
}

// Add new contact
$contacts[] = $input;

// Save to file
if (file_put_contents($contacts_file, json_encode($contacts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save contact']);
}
?>