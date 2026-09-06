const ADMIN_WA = '6285782023998';

const form = document.getElementById('formRohis');
const alasan = document.getElementById('alasan');
const count = document.getElementById('count');

function setError(el, message) {
  const field = el.closest('.field');
  if (!field) return;
  field.classList.toggle('invalid', Boolean(message));
  const error = field.querySelector('.error');
  if (error) error.textContent = message || '';
}

function validate() {
  const nama = document.getElementById('nama');
  const kelas = document.getElementById('kelas');
  const jurusan = document.getElementById('jurusan');
  const nohp = document.getElementById('nohp');
  const gender = document.querySelector('input[name="gender"]:checked');

  let valid = true;

  if (!nama.value.trim()) {
    setError(nama, 'Nama wajib diisi.');
    valid = false;
  } else setError(nama, '');

  if (!kelas.value) {
    setError(kelas, 'Pilih kelas.');
    valid = false;
  } else setError(kelas, '');

  if (!jurusan.value) {
    setError(jurusan, 'Pilih jurusan.');
    valid = false;
  } else setError(jurusan, '');

  const phone = nohp.value.replace(/[^\d+]/g, '');
  if (!nohp.value.trim()) {
    setError(nohp, 'Nomor HP wajib diisi.');
    valid = false;
  } else if (!/^(\+62|62|0)8[1-9][0-9]{6,11}$/.test(phone)) {
    setError(nohp, 'Masukkan nomor HP yang valid.');
    valid = false;
  } else {
    setError(nohp, '');
  }

  if (!gender) {
    document.getElementById('genderError').textContent = 'Pilih gender.';
    valid = false;
  } else {
    document.getElementById('genderError').textContent = '';
  }

  if (!alasan.value.trim()) {
    setError(alasan, 'Alasan, minat, dan tujuan wajib diisi.');
    valid = false;
  } else if (alasan.value.trim().length < 10) {
    setError(alasan, 'Tulis sedikit lebih lengkap.');
    valid = false;
  } else {
    setError(alasan, '');
  }

  return valid;
}

alasan.addEventListener('input', () => {
  count.textContent = alasan.value.length;
  if (alasan.value.trim().length >= 10) setError(alasan, '');
});

document.querySelectorAll('input, select, textarea').forEach(el => {
  el.addEventListener('input', () => {
    if (el.value && el.closest('.field')) setError(el, '');
  });
  el.addEventListener('change', () => {
    if (el.value && el.closest('.field')) setError(el, '');
  });
});

document.querySelectorAll('input[name="gender"]').forEach(el => {
  el.addEventListener('change', () => {
    document.getElementById('genderError').textContent = '';
  });
});

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!validate()) return;

  const nama = document.getElementById('nama').value.trim();
  const kelas = document.getElementById('kelas').value;
  const jurusan = document.getElementById('jurusan').value;
  const nohp = document.getElementById('nohp').value.trim();
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const alasanText = alasan.value.trim();

  const message =
`*PENDAFTARAN EKSTRAKURIKULER ROHIS*
SMK Pustek Serpong

*Nama:* ${nama}
*Kelas:* ${kelas}
*Jurusan:* ${jurusan}
*No. HP / WhatsApp:* ${nohp}
*Gender:* ${gender}

*Alasan, Minat & Tujuan:*
${alasanText}

_Pendaftaran dikirim melalui Web Rohis SMK Pustek Serpong._`;

  const url = `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(message)}`;

  // Tidak ada penyimpanan database / LocalStorage.
  // Setelah submit, pengguna diarahkan ke WhatsApp pengurus dengan data sudah terisi.
  window.location.href = url;
});
