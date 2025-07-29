var dN = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
var pN = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];
var mN = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
var mNN = [
  "Desember",
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
  "Januari"
];

// Inisialisasi awal
chgMth(2, 0);
chgClk();


// Ubah chgMth menjadi fungsi async untuk menangani pengambilan data
async function chgMth(i, y) {
  dT = new Date();
  if (i == 0) { yR -= y; }
  if (i == 1) {
    if (mT > 0) { mT--; } else {
      if (yR == 100) { mT = 0; } else { mT = 11; yR--; }
    }
  }
  if (i == 2) { mT = dT.getMonth(); yR = dT.getFullYear(); }
  if (i == 3) {
    if (mT < 11) { mT++; } else {
      if (yR == 250000) { mT = 11; } else { mT = 0; yR++; }
    }
  }
  if (i == 4) { yR += y; }
  if (yR > 250000) { yR = 250000; }
  if (yR < 100) { yR = 100; }

  // 1. Ambil dan simpan data hari libur
  let holidayDates = [];
  let holidayListText = "";
  try {
    const response = await fetch(`https://api-harilibur.vercel.app/api?year=${yR}&month=${mT + 1}`);
    const data = await response.json();
    const nationalHolidays = data.filter(holiday => holiday.is_national_holiday);

    if (nationalHolidays.length > 0) {
      nationalHolidays.forEach(holiday => {
        // Simpan tanggalnya untuk penandaan kalender
        holidayDates.push(holiday.holiday_date);
        // Buat daftar teks untuk ditampilkan di samping
        let holidayDateObj = new Date(holiday.holiday_date + 'T00:00:00');
        holidayListText += `<font class='h6 font-weight-bold'>${holidayDateObj.getDate()}: ${holiday.holiday_name}</font><br>`;
      });
    } else {
      holidayListText = "<font class='h6 font-weight-bold'>Tidak ada hari libur nasional di bulan ini.</font>";
    }
  } catch (error) {
    console.error('Gagal mengambil data hari libur:', error);
    holidayListText = "<font class='h6 font-weight-bold text-danger'>Gagal memuat data hari libur.</font>";
  }
  Lbr.innerHTML = holidayListText;
  thN.innerHTML = yR;


  // 2. Bangun kalender dan tandai hari libur
  for (CnT = 0; CnT <= 41; CnT++) {
    document.getElementById("iD" + CnT).style.backgroundColor = "#f9f9f9";
    document.getElementById("iD" + CnT).style.color = "black"; // Reset warna font
    document.getElementById("iD" + CnT).style.fontWeight = "normal"; // Reset ketebalan font
  }

  bD = new Date(yR, mT, 1).getDay();
  mD = new Date(yR, mT, 0).getDate() - (bD - 1);
  for (bR = 0; bR < bD; bR++) {
    document.getElementById("iD" + bR).innerHTML = "<font style='font-size:20px;color:gray;'>" + mD + "</font>";
    mD++;
  }

  for (aD = 1; aD <= new Date(yR, mT + 1, 0).getDate(); aD++) {
    pS = ((new Date(yR, mT, aD).getTime() - new Date(100, 0, 1).getTime()) / (24 * 60 * 60 * 1000)) % 5;
    
    // Format tanggal saat ini ke "YYYY-MM-DD" untuk perbandingan
    let currentMonth = (mT + 1).toString().padStart(2, '0');
    let currentDay = aD.toString().padStart(2, '0');
    let currentDateString = `${yR}-${currentMonth}-${currentDay}`;
    
    let cell = document.getElementById("iD" + bD);
    cell.innerHTML = `<font style='font-size:26px;'>${aD}</font><br>${pN[Math.floor(pS)]}`;

    // Cek apakah tanggal ini adalah hari libur
    if (holidayDates.includes(currentDateString)) {
        cell.style.color = "red";
        cell.style.fontWeight = "bold";
    }

    if ((aD == dT.getDate()) & (mT == dT.getMonth()) & (yR == dT.getFullYear())) {
      cell.style.backgroundColor = "yellow";
    }
    bD++;
  }
  
  mTyR.innerHTML = "<font>" + mN[mT] + " " + yR + "</font>";
  next.innerHTML = "<font>" + mNN[mT + 2] + " " + "</font>";
  prev.innerHTML = "<font>" + mNN[mT] + " " + "</font>";

  for (vD = 1; bD <= 41; vD++) {
    document.getElementById("iD" + bD).innerHTML = "<font style='font-size:20px;color:gray;'>" + vD + "</font>";
    bD++;
  }
}

function chgClk() {
  dTcL = new Date();
  hRcL = dTcL.getHours();
  mNcL = dTcL.getMinutes();
  sCcL = dTcL.getSeconds();
  dYcL = dTcL.getDate();
  mTcL = dTcL.getMonth();
  yRcL = dTcL.getFullYear();
  if (mTcL == 7) {
    mMcL = "Ags";
  } else {
    mMcL = mN[mTcL].substr(0, 3);
  }
  if (dYcL < 10) { dYcL = "0" + dYcL; }
  if (hRcL < 10) { hRcL = "0" + hRcL; }
  if (mNcL < 10) { mNcL = "0" + mNcL; }
  if (sCcL < 10) { sCcL = "0" + sCcL; }
  if (showDate.innerHTML != [dYcL, mMcL, yRcL].join(" ")) {
    chgMth(5, 0);
  }
  pScL = ((new Date(yRcL, mTcL, dYcL).getTime() - new Date(100, 0, 1).getTime()) / (24 * 60 * 60 * 1000)) % 5;
  showClock.innerHTML = [hRcL, mNcL, sCcL].join(":");
  showDate.innerHTML = [dYcL, mMcL, yRcL].join(" ");
  showDay.innerHTML = dN[dTcL.getDay()] + " " + pN[Math.floor(pScL)];
  setTimeout("chgClk()", 200);
}
