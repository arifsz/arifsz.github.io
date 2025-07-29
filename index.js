var dN = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
var pN = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];
var mN = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
var mNN = [
  "Desember", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember", "Januari"
];

// Variabel global untuk menyimpan tanggal libur pada bulan yang ditampilkan
let holidaysOfMonth = [];

// Panggilan awal untuk memuat kalender dan jam
chgMth(2, 0);
chgClk();

/**
 * Mengambil data hari libur dari API.
 * @param {number} year - Tahun.
 * @param {number} month - Bulan (0-11).
 * @param {function} callback - Fungsi yang akan dipanggil setelah data diterima.
 */
function fetchHolidays(year, month, callback) {
  fetch(`https://api-harilibur.vercel.app/api?year=${year}&month=${month + 1}`)
    .then(response => response.json())
    .then(data => {
      let holidayText = "";
      holidaysOfMonth = []; // Reset daftar libur untuk bulan baru

      let nationalHolidays = data.filter(holiday => holiday.is_national_holiday);

      if (nationalHolidays.length > 0) {
        nationalHolidays.forEach(holiday => {
          let holidayDate = new Date(holiday.holiday_date + 'T00:00:00');
          holidaysOfMonth.push(holidayDate.getDate()); // Simpan tanggalnya saja
          holidayText += `<font class='h6 font-weight-bold'>${holidayDate.getDate()}: ${holiday.holiday_name}</font><br>`;
        });
      } else {
        holidayText = "<font class='h6 font-weight-bold'>Tidak ada hari libur nasional di bulan ini.</font>";
      }
      Lbr.innerHTML = holidayText;
      thN.innerHTML = year;
      callback(); // Jalankan fungsi callback untuk menggambar ulang kalender
    })
    .catch(error => {
      console.error('Error fetching holidays:', error);
      Lbr.innerHTML = "<font class='h6 font-weight-bold text-danger'>Gagal memuat data hari libur.</font>";
      holidaysOfMonth = [];
      callback(); // Tetap gambar kalender meskipun pengambilan data gagal
    });
}

/**
 * Mengubah bulan atau tahun pada kalender.
 */
function chgMth(i, y) {
  dT = new Date();
  if (i == 0) { yR -= y; }
  if (i == 1) {
    if (mT > 0) { mT--; } else { if (yR == 100) { mT = 0; } else { mT = 11; yR--; } }
  }
  if (i == 2) { mT = dT.getMonth(); yR = dT.getFullYear(); }
  if (i == 3) {
    if (mT < 11) { mT++; } else { if (yR == 250000) { mT = 11; } else { mT = 0; yR++; } }
  }
  if (i == 4) { yR += y; }
  if (yR > 250000) { yR = 250000; }
  if (yR < 100) { yR = 100; }

  // Ambil data libur, kemudian gambar kalender setelahnya
  fetchHolidays(yR, mT, drawCalendar);
}

/**
 * Menggambar sel-sel tanggal pada kalender dan menandai hari libur.
 */
function drawCalendar() {
  // Reset tampilan kalender
  for (let CnT = 0; CnT <= 41; CnT++) {
    let cell = document.getElementById("iD" + CnT);
    cell.innerHTML = "";
    cell.style.backgroundColor = "#f9f9f9";
    cell.style.color = "black";
    cell.style.fontWeight = "normal";
  }

  let bD = new Date(yR, mT, 1).getDay();
  let mD = new Date(yR, mT, 0).getDate() - (bD - 1);

  // Mengisi tanggal dari bulan sebelumnya
  for (let bR = 0; bR < bD; bR++) {
    document.getElementById("iD" + bR).innerHTML = "<font style='font-size:20px;color:gray;'>" + mD + "</font>";
    mD++;
  }

  // Mengisi tanggal pada bulan ini dan menandainya
  for (let aD = 1; aD <= new Date(yR, mT + 1, 0).getDate(); aD++) {
    let currentCell = document.getElementById("iD" + bD);
    let pS = ((new Date(yR, mT, aD).getTime() - new Date(100, 0, 1).getTime()) / (24 * 60 * 60 * 1000)) % 5;
    
    currentCell.innerHTML = "<font style='font-size:26px;'>" + aD + "</font><br>" + pN[Math.floor(pS)];

    let dayOfWeek = new Date(yR, mT, aD).getDay();
    let isHoliday = holidaysOfMonth.includes(aD);

    // Tandai hari Minggu (teks merah)
    if (dayOfWeek === 0) {
      currentCell.style.color = "red";
    }
    
    // Tandai hari libur (teks merah dan tebal)
    if (isHoliday) {
      currentCell.style.color = "red";
      currentCell.style.fontWeight = "bold";
    }

    // Tandai hari ini (latar kuning)
    if (aD == dT.getDate() && mT == dT.getMonth() && yR == dT.getFullYear()) {
      currentCell.style.backgroundColor = "yellow";
    }

    bD++;
  }

  mTyR.innerHTML = "<font>" + mN[mT] + " " + yR + "</font>";
  next.innerHTML = "<font>" + mNN[mT + 2] + " " + "</font>";
  prev.innerHTML = "<font>" + mNN[mT] + " " + "</font>";

  // Mengisi tanggal dari bulan berikutnya
  for (let vD = 1; bD <= 41; vD++) {
    document.getElementById("iD" + bD).innerHTML = "<font style='font-size:20px;color:gray;'>" + vD + "</font>";
    bD++;
  }
}

/**
 * Mengubah tampilan jam digital.
 */
function chgClk() {
    dTcL = new Date();
    hRcL = dTcL.getHours();
    mNcL = dTcL.getMinutes();
    sCcL = dTcL.getSeconds();
    dYcL = dTcL.getDate();
    mTcL = dTcL.getMonth();
    yRcL = dTcL.getFullYear();
    if (mTcL == 7) { mMcL = "Ags"; } else { mMcL = mN[mTcL].substr(0, 3); }
    if (dYcL < 10) { dYcL = "0" + dYcL; }
    if (hRcL < 10) { hRcL = "0" + hRcL; }
    if (mNcL < 10) { mNcL = "0" + mNcL; }
    if (sCcL < 10) { sCcL = "0" + sCcL; }
    if (showDate.innerHTML != [dYcL, mMcL, yRcL].join(" ")) { chgMth(5, 0); }
    pScL = ((new Date(yRcL, mTcL, dYcL).getTime() - new Date(100, 0, 1).getTime()) / (24 * 60 * 60 * 1000)) % 5;
    showClock.innerHTML = [hRcL, mNcL, sCcL].join(":");
    showDate.innerHTML = [dYcL, mMcL, yRcL].join(" ");
    showDay.innerHTML = dN[dTcL.getDay()] + " " + pN[Math.floor(pScL)];
    setTimeout("chgClk()", 200);
}
