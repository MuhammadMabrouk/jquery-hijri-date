$.fn.hijriDate = function (options = {gregorian: false}) {
  const $hostEl = this;
  const today = new Date();
  const weekDays = new Array(
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت"
  );
  const monthName = new Array(
    "يناير",
    "فبراير",
    "مارس",
    "إبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر"
  );
  let fixed;

  function isGregLeapYear(year) {
    return year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
  }

  function gregToFixed(year, month, day) {
    const a = Math.floor((year - 1) / 4);
    const b = Math.floor((year - 1) / 100);
    const c = Math.floor((year - 1) / 400);
    const d = Math.floor((367 * month - 362) / 12);

    if (month <= 2) {
      e = 0;
    } else if (month > 2 && isGregLeapYear(year)) {
      e = -1;
    } else { e = -2; }

    return 1 - 1 + 365 * (year - 1) + a - b + c + d + e + day;
  }

  function Hijri(year, month, day) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.toFixed = hijriToFixed;
    this.toString = hijriToString;
  }

  function hijriToFixed() {
    return this.day + Math.ceil(29.5 * (this.month - 1)) + (this.year - 1) * 354 + Math.floor((3 + 11 * this.year) / 30) + 227015 - 1;
  }

  function hijriToString() {
    const months = new Array(
      "المحرم",
      "صفر",
      "ربيع الأول",
      "ربيع الآخر",
      "جمادى الأولى",
      "جمادى الآخرة",
      "رجب",
      "شعبان",
      "رمضان",
      "شوال",
      "ذو القعدة",
      "ذو الحجة"
    );
    return `${this.day} ${months[this.month - 1]} ${this.year}`;
  }

  function fixedToHijri(f) {
    const i = new Hijri(1100, 1, 1);
    i.year = Math.floor((30 * (f - 227015) + 10646) / 10631);
    const i2 = new Hijri(i.year, 1, 1);
    const m = Math.ceil((f - 29 - i2.toFixed()) / 29.5) + 1;
    i.month = Math.min(m, 12);
    i2.year = i.year;
    i2.month = i.month;
    i2.day = 1;
    i.day = f - i2.toFixed() + 1;
    return i;
  }

  const y = today.getFullYear();
  let m = today.getMonth();
  const d = today.getDate();
  const dow = today.getDay();
  const gregDate = `${d} ${monthName[m]} ${y} م`;

  m++;
  fixed = gregToFixed(y, m, d);
  let h = new Hijri(1421, 11, 28);
  h = fixedToHijri(fixed);

  const hijriDate = `${h.toString()} هـ`;
  const printedDate = options.gregorian ? `${weekDays[dow]} ${hijriDate} - ${gregDate}` : `${weekDays[dow]} ${hijriDate}`;

  $hostEl.html(printedDate);
}
