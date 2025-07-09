<?php
session_start();

// Check if admin is logged in
if (!isset($_SESSION['admin_logged_in']) || !$_SESSION['admin_logged_in']) {
    header('Location: login.php');
    exit;
}

// Get statistics
$products_file = '../data/products.json';
$posts_file = '../data/posts.json';
$bookings_file = '../data/bookings.json';

$products_count = 0;
$posts_count = 0;
$bookings_count = 0;

if (file_exists($products_file)) {
    $products = json_decode(file_get_contents($products_file), true);
    $products_count = count($products);
}

if (file_exists($posts_file)) {
    $posts = json_decode(file_get_contents($posts_file), true);
    $posts_count = count($posts);
}

if (file_exists($bookings_file)) {
    $bookings = json_decode(file_get_contents($bookings_file), true);
    $bookings_count = count($bookings);
}
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Sống KOFFI Admin</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="admin-style.css">
</head>
<body>
    <?php include 'includes/header.php'; ?>
    
    <div class="admin-container">
        <?php include 'includes/sidebar.php'; ?>
        
        <main class="admin-main">
            <div class="admin-header">
                <h1>Dashboard</h1>
                <p>Chào mừng đến với trang quản trị Sống KOFFI</p>
            </div>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">📋</div>
                    <div class="stat-info">
                        <h3><?php echo $products_count; ?></h3>
                        <p>Sản Phẩm</p>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">📝</div>
                    <div class="stat-info">
                        <h3><?php echo $posts_count; ?></h3>
                        <p>Bài Viết</p>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">📅</div>
                    <div class="stat-info">
                        <h3><?php echo $bookings_count; ?></h3>
                        <p>Đặt Bàn</p>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">👥</div>
                    <div class="stat-info">
                        <h3>1</h3>
                        <p>Admin</p>
                    </div>
                </div>
            </div>
            
            <div class="dashboard-content">
                <div class="dashboard-section">
                    <h2>Hoạt Động Gần Đây</h2>
                    <div class="activity-list">
                        <div class="activity-item">
                            <div class="activity-icon">📋</div>
                            <div class="activity-info">
                                <p><strong>Sản phẩm mới</strong> đã được thêm vào menu</p>
                                <span class="activity-time">2 giờ trước</span>
                            </div>
                        </div>
                        
                        <div class="activity-item">
                            <div class="activity-icon">📅</div>
                            <div class="activity-info">
                                <p><strong>Đặt bàn mới</strong> từ khách hàng</p>
                                <span class="activity-time">4 giờ trước</span>
                            </div>
                        </div>
                        
                        <div class="activity-item">
                            <div class="activity-icon">📝</div>
                            <div class="activity-info">
                                <p><strong>Bài viết blog</strong> đã được xuất bản</p>
                                <span class="activity-time">1 ngày trước</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="dashboard-section">
                    <h2>Thống Kê Nhanh</h2>
                    <div class="quick-stats">
                        <div class="quick-stat">
                            <span class="stat-label">Đặt bàn hôm nay:</span>
                            <span class="stat-value">3</span>
                        </div>
                        <div class="quick-stat">
                            <span class="stat-label">Sản phẩm bán chạy:</span>
                            <span class="stat-value">Cà Phê Sữa Đá</span>
                        </div>
                        <div class="quick-stat">
                            <span class="stat-label">Lượt xem blog:</span>
                            <span class="stat-value">1,234</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</body>
</html>