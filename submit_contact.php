<?php
$host = "localhost";
$user = "root";  // ganti sesuai db user kamu
$password = "";  // ganti sesuai password db kamu
$dbname = "kontak_db";

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(['status'=>'error','message'=>"Koneksi gagal: " . $conn->connect_error]));
}

$nama = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$message = $_POST['message'] ?? '';

if (!$nama || !$email || !$phone || !$message) {
    echo json_encode(['status'=>'error','message'=>"Semua field harus diisi!"]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO kontak (nama, email, phone, message) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $nama, $email, $phone, $message);

if ($stmt->execute()) {
    echo json_encode(['status'=>'success','message'=>"Pesan berhasil dikirim!"]);
} else {
    echo json_encode(['status'=>'error','message'=>"Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
