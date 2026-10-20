// Animasi scroll (AOS)
if (typeof AOS !== "undefined") {
  AOS.init({ duration: 800, once: true, offset: 80 });
}

// Efek mengetik
const typedEl = document.getElementById("typed");
if (typedEl) {
  const roles = [
    "Mahasiswa Sistem Komputer",
    "Web Developer Pemula",
    "Tech Enthusiast",
    "Pembelajar Cepat"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const word = roles[roleIndex];
    typedEl.textContent = deleting
      ? word.substring(0, --charIndex)
      : word.substring(0, ++charIndex);

    let delay = deleting ? 50 : 100;

    if (!deleting && charIndex === word.length) {
      delay = 1600;
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }
    setTimeout(type, delay);
  }
  type();
}

// Counter angka
const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.target;
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current;
    }, 25);
    obs.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// Progress bar skill
const fills = document.querySelectorAll(".skill-fill");
const skillObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.style.width = entry.target.dataset.width + "%";
    obs.unobserve(entry.target);
  });
}, { threshold: 0.4 });
fills.forEach(f => skillObserver.observe(f));

// Navbar berubah saat scroll + tombol ke atas
const navbar = document.getElementById("navbar");
const toTop = document.getElementById("toTop");

window.addEventListener("scroll", () => {
  if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 50);
  if (toTop) toTop.classList.toggle("show", window.scrollY > 400);
});

if (toTop) {
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Tutup menu mobile setelah link diklik
document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
  link.addEventListener("click", () => {
    const menu = document.getElementById("menuNav");
    if (menu && menu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

// Tombol download CV (simpan sebagai PDF lewat dialog cetak)
const btnDownload = document.getElementById("btnDownload");
if (btnDownload) {
  btnDownload.addEventListener("click", () => window.print());
}

// Form kontak -> kirim ke WhatsApp
const formKontak = document.getElementById("formKontak");
if (formKontak) {
  formKontak.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!formKontak.checkValidity()) {
      formKontak.classList.add("was-validated");
      return;
    }

    const nama = document.getElementById("nama").value.trim();
    const subjek = document.getElementById("subjek").value;
    const pesan = document.getElementById("pesan").value.trim();

    const teks =
      "Halo Rafi, saya " + nama + ".\n" +
      "Keperluan: " + subjek + "\n\n" +
      pesan;

    window.open("https://wa.me/6287775725467?text=" + encodeURIComponent(teks), "_blank");
    formKontak.reset();
    formKontak.classList.remove("was-validated");
  });
}

// Galeri: filter kategori
const filterBtns = document.querySelectorAll(".btn-filter");
const galeriItems = document.querySelectorAll(".galeri-item");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    galeriItems.forEach(item => {
      const cocok = filter === "semua" || item.dataset.kategori === filter;
      item.classList.toggle("hide", !cocok);
    });
  });
});

// Zoom foto di modal (dipakai galeri dan sertifikat)
const modalEl = document.getElementById("modalFoto");
if (modalEl) {
  const modal = new bootstrap.Modal(modalEl);
  document.querySelectorAll(".galeri-card").forEach(card => {
    card.addEventListener("click", () => {
      document.getElementById("modalImg").src = card.querySelector("img").src;
      document.getElementById("modalJudul").textContent = card.dataset.judul;
      modal.show();
    });
  });
}