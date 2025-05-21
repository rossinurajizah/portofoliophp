const menuToggle = document.querySelector('.menu-toggle input');
const nav = document.querySelector('nav ul');
const body = document.body;
const menuLinks = document.querySelectorAll("nav ul li a");

// Fungsi untuk membuka menu
function openMenu() {
    nav.classList.add("slide");
    body.style.overflow = "hidden"; // Mencegah scroll saat menu terbuka
    body.style.height = "100vh"; // Memastikan tidak ada scroll vertikal
}

// Fungsi untuk menutup menu
function closeMenu() {
    nav.classList.remove("slide");
    body.style.overflow = ""; // Mengembalikan scroll normal
    body.style.height = ""; 
    menuToggle.checked = false; // Hilangkan centang pada toggle
}

// Toggle menu saat tombol hamburger diklik
menuToggle.addEventListener("click", function () {
    if (menuToggle.checked) {
        openMenu();
    } else {
        closeMenu();
    }
});

// Tutup menu saat klik salah satu link
menuLinks.forEach(link => {
    link.addEventListener("click", function () {
        closeMenu(); // Tutup menu saat link diklik
    });
});

// Tutup menu jika klik di luar menu
document.addEventListener("click", function (event) {
    if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
        closeMenu();
    }
});

// JQUERY
$(document).ready(function () {
    let errorActive = false; // Menandai kalau popup sedang aktif
    let currentErrorField = null; // Field yang sedang error
  
    function validateField(field, value, type) {
      let isValid = true;
      let errorMessage = '';
  
      if (type === 'name') {
        if (value === '') {
          errorMessage = 'Nama lengkap wajib diisi.';
          isValid = false;
        } else if (value.length > 50) {
          errorMessage = 'Nama lengkap tidak boleh lebih dari 50 karakter.';
          isValid = false;
        }
      } else if (type === 'email') {
        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
        if (value === '') {
          errorMessage = 'Email wajib diisi.';
          isValid = false;
        } else if (!pattern.test(value)) {
          errorMessage = 'Format email tidak valid.';
          isValid = false;
        } else if (value.length > 50) {
          errorMessage = 'Email tidak boleh lebih dari 50 karakter.';
          isValid = false;
        }
      } else if (type === 'phone') {
        let pattern = /^[0-9]{8,15}$/;
        if (value === '') {
          errorMessage = 'Nomor handphone wajib diisi.';
          isValid = false;
        } else if (!pattern.test(value)) {
          errorMessage = 'Nomor handphone harus terdiri dari 8 hingga 15 angka.';
          isValid = false;
        }
      } else if (type === 'message') {
        if (value === '') {
          errorMessage = 'Pesan wajib diisi.';
          isValid = false;
        } else if (value.length > 300) {
          errorMessage = 'Pesan tidak boleh lebih dari 300 karakter.';
          isValid = false;
        }
      }
  
      return { isValid, errorMessage };
    }
  
    function showError(message, field) {
      $('#popupText').text(message);
      $('#popupMessage').show();
      errorActive = true;
      currentErrorField = field;
    }
  
    $('#popupMessage button').on('click', function () {
      $('#popupMessage').hide();
      errorActive = false;
    });
  
    // Validasi saat submit form
    $('#contactForm').on('submit', function (e) {
      e.preventDefault();
      errorActive = false;
      $('#popupMessage').hide();
      $('input, textarea').css('border', '');
  
      let fields = [
        { id: 'name', type: 'name' },
        { id: 'email', type: 'email' },
        { id: 'phone', type: 'phone' },
        { id: 'message', type: 'message' }
      ];
  
      for (let i = 0; i < fields.length; i++) {
        let fieldEl = $('#' + fields[i].id);
        let value = fieldEl.val().trim();
        let result = validateField(fieldEl, value, fields[i].type);
  
        if (!result.isValid) {
          fieldEl.css('border', '2px solid red');
          showError(result.errorMessage, fieldEl);
          return; // stop validasi
        }
      }
  
      // jika semua valid
      $('#popupText').text('Form berhasil dikirim!');
      $('#popupMessage').show();
      this.reset();
    });
  
    // Saat mengetik, popup langsung hilang & reset error
    $('#name, #email, #phone, #message').on('input', function () {
      if (errorActive && $(this).is(currentErrorField)) {
        $('#popupMessage').hide();
        errorActive = false;
        currentErrorField.css('border', '');
      }
    });
  
    // Validasi saat blur, dan mencegah loncat field
    $('#name, #email, #phone, #message').on('blur', function () {
      if (errorActive) return; // jika masih ada popup, skip validasi lainnya
  
      let field = $(this);
      let value = field.val().trim();
      let type = field.attr('id');
  
      let result = validateField(field, value, type);
  
      if (!result.isValid) {
        field.css('border', '2px solid red');
        showError(result.errorMessage, field);
      }
    });
  });
  