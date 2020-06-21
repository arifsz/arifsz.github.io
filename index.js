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
var Lb1 = [
  "1 Januari Tahun Baru Masehi",
  "5 Februari Tahun Baru Imlek",
  "7 Maret Hari Raya Nyepi",
  "03 April Isra Miraj",
  "01 Mei Hari Buruh",
  "01 Juni Hari Lahir Pancasila",
  "",
  "11 Agustus Idul Adha",
  "01 September Tahun Baru Hijriyah",
  "",
  "09 November Maulid Nabi",
  "24 Desember Cuti Bersama"
];
var Lb2 = [
  "",
  "",
  "",
  "19 April Jumat Agung",
  "19 Mei Hari Raya Waisak",
  "03 - 04 Juni Cuti Bersama",
  "",
  "17 Agustus Hari Kemerdekaan",
  "",
  "",
  "",
  "25 Desember Hari Natal"
];
var Lb3 = ["", "", "", "", "30 Mei Kenaikan Isa Almasih", "05 - 06 Juni Idul Fitri", "", "", "", "", "", ""];
var Lb4 = ["", "", "", "", "", "07 Juni Cuti Bersama", "", "", "", "", "", ""];
chgMth(2, 0);
chgClk();

function chgMth(i, y) {
  dT = new Date();
  if (i == 0) {
    yR -= y;
  }
  if (i == 1) {
    if (mT > 0) {
      mT--;
    } else {
      if (yR == 100) {
        mT = 0;
      } else {
        mT = 11;
        yR--;
      }
    }
  }
  if (i == 2) {
    mT = dT.getMonth();
    yR = dT.getFullYear();
  }
  if (i == 3) {
    if (mT < 11) {
      mT++;
    } else {
      if (yR == 250000) {
        mT = 11;
      } else {
        mT = 0;
        yR++;
      }
    }
  }
  if (i == 4) {
    yR += y;
  }
  if (yR > 250000) {
    yR = 250000;
  }
  if (yR < 100) {
    yR = 100;
  }
  for (CnT = 0; CnT <= 41; CnT++) {
    document.getElementById("iD" + CnT).style.backgroundColor = "#f9f9f9";
  }
  bD = new Date(yR, mT, 1).getDay();
  mD = new Date(yR, mT, 0).getDate() - (bD - 1);
  for (bR = 0; bR < bD; bR++) {
    document.getElementById("iD" + bR).innerHTML = "<font style='font-size:20px;color:gray;'>" + mD + "</font>";
    mD++;
  }
  for (aD = 1; aD <= new Date(yR, mT + 1, 0).getDate(); aD++) {
    pS = ((new Date(yR, mT, aD).getTime() - new Date(100, 0, 1).getTime()) / (24 * 60 * 60 * 1000)) % 5;
    document.getElementById("iD" + bD).innerHTML = "<font style='font-size:26px;'>" + aD + "</font><br>" + pN[Math.floor(pS)];
    if ((aD == dT.getDate()) & (mT == dT.getMonth()) & (yR == dT.getFullYear())) {
      document.getElementById("iD" + bD).style.backgroundColor = "yellow";
    }
    bD++;
  }
  mTyR.innerHTML = "<font>" + mN[mT] + " " + yR + "</font>";
  next.innerHTML = "<font>" + mNN[mT + 2] + " " + "</font>";
  prev.innerHTML = "<font>" + mNN[mT] + " " + "</font>";

  thN.innerHTML = dT.getFullYear();
  Lbr.innerHTML = "<font class='h6 font-weight-bold'>" + Lb1[mT] + "<br>" + Lb2[mT] + "<br>" + Lb3[mT] + "<br>" + Lb4[mT] + "</font>";
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
  if (dYcL < 10) {
    dYcL = "0" + dYcL;
  }
  if (hRcL < 10) {
    hRcL = "0" + hRcL;
  }
  if (mNcL < 10) {
    mNcL = "0" + mNcL;
  }
  if (sCcL < 10) {
    sCcL = "0" + sCcL;
  }
  if (showDate.innerHTML != [dYcL, mMcL, yRcL].join(" ")) {
    chgMth(5, 0);
  }
  pScL = ((new Date(yRcL, mTcL, dYcL).getTime() - new Date(100, 0, 1).getTime()) / (24 * 60 * 60 * 1000)) % 5;
  showClock.innerHTML = [hRcL, mNcL, sCcL].join(":");
  showDate.innerHTML = [dYcL, mMcL, yRcL].join(" ");
  showDay.innerHTML = dN[dTcL.getDay()] + " " + pN[Math.floor(pScL)];
  setTimeout("chgClk()", 200);
}
