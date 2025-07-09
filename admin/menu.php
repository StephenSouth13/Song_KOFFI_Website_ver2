<?php
session_start();

// Check if admin is logged in
if (!isset($_SESSION['admin_logged_in']) || !$_SESSION['admin_logged_in']) {
    header('Location: login.php');
    exit;
}

$products_file = '../data/products.json';
$products = [];

// Load existing products
if (file_exists($products_file)) {
    $products = json_decode(file_get_contents($products_file), true);
}

// Handle form submissions
if ($_POST) {
    $action = $_POST['action'] ?? '';
    
    if ($action === 'add') {
        $new_product = [
            'id' => time(),
            'name' => $_POST['name'],
            'description' => $_POST['description'],
            'price' => (int)$_POST['price'],
            'category' => $_POST['category'],
            'image' => $_POST['image'] ?: '/placeholder.svg?height=200&width=300',
            'featured' => isset($_POST['featured'])
        ];
        
        $products[] = $new_product;
        file_put_contents($products_file, json_encode($products, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        $success = 'Sản phẩm đã được thêm thành công!';
    }
    
    if ($action === 'edit') {
        $id = (int)$_POST['id'];
        foreach ($products as &$product) {
            if ($product['id'] === $id) {
                $product['name'] = $_POST['name'];
                $product['description'] = $_POST['description'];
                $product['price'] = (int)$_POST['price'];
                $product['category'] = $_POST['category'];
                $product['image'] = $_POST['image'] ?: $product['image'];
                $product['featured'] = isset($_POST['featured']);
                break;
            }
        }
        
        file_put_contents($products_file, json_encode($products, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        $success = 'Sản phẩm đã được cập nhật thành công!';
    }
    
    if ($action === 'delete') {
        $id = (int)$_POST['id'];
        $products = array_filter($products, function($product) use ($id) {
            return $product['id'] !== $id;
        });
        
        file_put_contents($products_file, json_encode(array_values($products), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        $success = 'Sản phẩm đã được xóa thành công!';
    }
}

// Get product for editing
$edit_product = null;
if (isset($_GET['edit'])) {
    $edit_id = (int)$_GET['edit'];
    foreach ($products as $product) {
        if ($product['id'] === $edit_id) {
            $edit_product = $product;
            break;
        }
    }
}
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quản Lý Menu - Sống KOFFI Admin</title>
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
                <h1>Quản Lý Menu</h1>
                <button class="btn-primary" onclick="showAddForm()">Thêm Sản Phẩm Mới</button>
            </div>
            
            <?php if (isset($success)): ?>
                <div class="alert alert-success"><?php echo $success; ?></div>
            <?php endif; ?>
            
            <!-- Add/Edit Form -->
            <div class="form-container" id="productForm" style="display: <?php echo $edit_product ? 'block' : 'none'; ?>">
                <h2><?php echo $edit_product ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'; ?></h2>
                <form method="POST">
                    <input type="hidden" name="action" value="<?php echo $edit_product ? 'edit' : 'add'; ?>">
                    <?php if ($edit_product): ?>
                        <input type="hidden" name="id" value="<?php echo $edit_product['id']; ?>">
                    <?php endif; ?>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="name">Tên Sản Phẩm</label>
                            <input type="text" id="name" name="name" value="<?php echo $edit_product['name'] ?? ''; ?>" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="price">Giá (VNĐ)</label>
                            <input type="number" id="price" name="price" value="<?php echo $edit_product['price'] ?? ''; ?>" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="category">Danh Mục</label>
                            <select id="category" name="category" required>
                                <option value="espresso" <?php echo ($edit_product['category'] ?? '') === 'espresso' ? 'selected' : ''; ?>>Espresso</option>
                                <option value="cold-brew" <?php echo ($edit_product['category'] ?? '') === 'cold-brew' ? 'selected' : ''; ?>>Cold Brew</option>
                                <option value="signature" <?php echo ($edit_product['category'] ?? '') === 'signature' ? 'selected' : ''; ?>>Signature</option>
                                <option value="dessert" <?php echo ($edit_product['category'] ?? '') === 'dessert' ? 'selected' : ''; ?>>Tráng Miệng</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="image">URL Hình Ảnh</label>
                            <input type="url" id="image" name="image" value="<?php echo $edit_product['image'] ?? ''; ?>" placeholder="/placeholder.svg?height=200&width=300">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="description">Mô Tả</label>
                        <textarea id="description" name="description" rows="3" required><?php echo $edit_product['description'] ?? ''; ?></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" name="featured" <?php echo ($edit_product['featured'] ?? false) ? 'checked' : ''; ?>>
                            Sản phẩm nổi bật
                        </label>
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="btn-primary">
                            <?php echo $edit_product ? 'Cập Nhật' : 'Thêm Sản Phẩm'; ?>
                        </button>
                        <button type="button" class="btn-secondary" onclick="hideForm()">Hủy</button>
                    </div>
                </form>
            </div>
            
            <!-- Products List -->
            <div class="table-container">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Hình Ảnh</th>
                            <th>Tên Sản Phẩm</th>
                            <th>Giá</th>
                            <th>Danh Mục</th>
                            <th>Nổi Bật</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($products as $product): ?>
                            <tr>
                                <td>
                                    <img src="<?php echo $product['image']; ?>" alt="<?php echo $product['name']; ?>" class="product-thumb">
                                </td>
                                <td>
                                    <strong><?php echo $product['name']; ?></strong>
                                    <br>
                                    <small><?php echo substr($product['description'], 0, 50) . '...'; ?></small>
                                </td>
                                <td><?php echo number_format($product['price']); ?>đ</td>
                                <td>
                                    <span class="category-badge category-<?php echo $product['category']; ?>">
                                        <?php echo ucfirst($product['category']); ?>
                                    </span>
                                </td>
                                <td>
                                    <?php if ($product['featured']): ?>
                                        <span class="badge badge-success">Có</span>
                                    <?php else: ?>
                                        <span class="badge badge-secondary">Không</span>
                                    <?php endif; ?>
                                </td>
                                <td>
                                    <div class="action-buttons">
                                        <a href="?edit=<?php echo $product['id']; ?>" class="btn-edit">Sửa</a>
                                        <form method="POST" style="display: inline;" onsubmit="return confirm('Bạn có chắc muốn xóa sản phẩm này?')">
                                            <input type="hidden" name="action" value="delete">
                                            <input type="hidden" name="id" value="<?php echo $product['id']; ?>">
                                            <button type="submit" class="btn-delete">Xóa</button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </main>
    </div>
    
    <script>
        function showAddForm() {
            document.getElementById('productForm').style.display = 'block';
            document.querySelector('#productForm h2').textContent = 'Thêm Sản Phẩm Mới';
            document.querySelector('input[name="action"]').value = 'add';
            document.querySelector('form').reset();
        }
        
        function hideForm() {
            document.getElementById('productForm').style.display = 'none';
        }
    </script>
</body>
</html>