# ☕ Sống KOFFI - Café Website & CMS

**Sống KOFFI** là một website cà phê đa trang được xây dựng hoàn toàn bằng **HTML, CSS, JavaScript và PHP**, tích hợp hệ thống **CMS quản lý nội dung** dành cho quản trị viên. Dự án tái hiện văn hóa cà phê Việt hiện đại với thông điệp thương hiệu:  
> **“Sống một đời 'Không phí'"**  
> *Cà phê bên lề - Chuyện đời bên tai*

---

## 🔥 Demo Tính Năng

### 🖥️ Giao diện người dùng (Frontend)

- 🏠 **Trang chủ (`index.html`)** – Hero, sản phẩm nổi bật, bài viết mới, Instagram
- 📋 **Trang menu (`menu.html`)** – Danh sách sản phẩm có lọc theo danh mục
- ✍️ **Trang blog (`blog.html`)** – Bài viết hiển thị dạng modal popup
- 📅 **Đặt chỗ (`booking.html`)** – Form nhiều bước có xác thực
- 📞 **Liên hệ (`contact.html`)** – Form gửi góp ý & bản đồ Google Maps
- 🔐 **Trang đăng nhập / đăng ký** – Giao diện đẹp, xác thực form

### 🛠️ Hệ thống quản trị (Backend - PHP CMS)

- 🔑 **Đăng nhập Admin (`admin/login.php`)**
- 📊 **Dashboard thống kê (`admin/dashboard.php`)**
- ☕ **Quản lý menu (`admin/menu.php`)** – CRUD món uống
- 📝 **Lưu dữ liệu booking & liên hệ** – File JSON
- 📂 **Lưu trữ:** `products.json`, `posts.json`, `bookings.json`, `contacts.json`

---

## ⚙️ Công nghệ sử dụng

| Công nghệ | Mô tả |
|----------|------|
| HTML5 / CSS3 / JS | Giao diện responsive, hiệu ứng mượt |
| PHP | Xử lý backend đơn giản |
| JSON | Lưu trữ dữ liệu (products, bookings, blog...) |
| Playfair Display / Inter | Font sang trọng cho cà phê |
| Coffee Theme | 🎨 Màu chủ đạo: `#5D3A00` (nâu cà phê), `#F6E9DA` (kem sữa) |

---

## 🌍 Tính năng nổi bật

- 🌐 **Chuyển đổi ngôn ngữ** (Tiếng Việt / English)
- ✅ **Xác thực biểu mẫu** đầu vào
- 🧩 **Hiệu ứng mượt mà** (cuộn, hover, animate)
- ☕ **Custom Cursor** hình tách cà phê
- 📦 **Quản lý nội dung** mà không cần cơ sở dữ liệu
- 🛡️ **Hệ thống đăng nhập bảo mật**
- 📱 **Tương thích mọi thiết bị**

---
🗂️ Cấu trúc thư mục
/ (root)
├── index.html
├── menu.html
├── blog.html
├── booking.html
├── contact.html
├── login.html
├── register.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   └── lang.js
├── lang/
│   ├── vi.json
│   └── en.json
├── data/
│   ├── products.json
│   ├── posts.json
│   └── bookings.json
└── admin/
    ├── login.php
    ├── dashboard.php
    ├── menu.php
    ├── save_booking.php
    ├── save_contact.php
    ├── logout.php
    ├── includes/
    │   ├── header.php
    │   └── sidebar.php
    └── admin-style.css

---
## 🔐 Tài khoản demo

```text
Email: admin@songkoffi.com
Mật khẩu: 123456
🚀 Cài đặt & triển khai
Upload toàn bộ source lên hosting hỗ trợ PHP

Đảm bảo các thư mục data/ có quyền ghi (chmod 755 hoặc 775)

Truy cập login.html để đăng nhập hoặc admin/login.php cho CMS

Website hoạt động hoàn toàn không cần database (dùng JSON)

🧠 Tác giả
✍️ Quách Thành Long (aka StephenSouth13)

GitHub: https://github.com/StephenSouth13

Dự án được phát triển bởi nhóm The Next Generation – Phòng Công nghệ thông tin, VSM

📝 Bản quyền
@2025 Sống KOFFI | Được phát triển bởi team The Next Generation – Phòng CNNT (VSM.org.vn)
