/*
* Name: jquery-hijri-date
* Author: Muhammad Mabrouk
* NPM: https://www.npmjs.com/package/jquery-hijri-date
* GitHub: https://github.com/MuhammadMabrouk/jquery-hijri-date
*/
$.fn.hijriDate = function (options = {}) {
  const defaultOptions = {
    showWeekDay: typeof options.showWeekDay === 'undefined' ? true : options.showWeekDay,
    showGregDate: typeof options.showGregDate === 'undefined' ? false : options.showGregDate,
    separator: (options.separator && typeof options.separator === 'string') ? options.separator : '-',
    weekDayLang: (options.weekDayLang && typeof options.weekDayLang === 'string') ? options.weekDayLang : 'ar',
    hijriLang: (options.hijriLang && typeof options.hijriLang === 'string') ? options.hijriLang : 'ar',
    gregLang: (options.gregLang && typeof options.gregLang === 'string') ? options.gregLang : 'ar',
    correction: (options.correction && typeof options.correction === 'number') ? options.correction : 0,
  };
  const $hostEl = this;
  const today = new Date();
  const weekDays = {
    ar: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
    en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  };
  const hijriMonths = {
    ar: ["المحرم", "صفر", "ربيع الأول", "ربيع الآخر", "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"],
    en: ["Muharram", "Safar", "Rabi Al-Awwal", "Rabi Al-Akhar", "Jumada Al-Awwal", "Jumada Al-Akhirah", "Rajab", "Shaban", "Ramadan", "Shawwal", "Dhu Al-Qidah", "Dhul Al-Hijjah"]
  };
  const gregMonths = {
    ar: ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  };
  const hijriSymbol = (defaultOptions.hijriLang === 'ar') ? 'هـ' : '';
  const gregSymbol = (defaultOptions.gregLang === 'ar') ? 'م' : '';
  let fixed;

  // check if it is an Gregorian leap year
  function isGregLeapYear(year) {
    return year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
  }

  // convert Gregorian date to years, months and days
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

    return 1 - 1 + 365 * (year - 1) + a - b + c + d + e + (day + defaultOptions.correction);
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

  // convert Hijri date to string
  function hijriToString() {
    return `${this.day} ${hijriMonths[defaultOptions.hijriLang][this.month - 1]} ${this.year}`;
  }

  // convert fixed days to Hijri date
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
  const gregDate = defaultOptions.showGregDate ?
    `${defaultOptions.separator} <span class="greg-date">${d} ${gregMonths[defaultOptions.gregLang][m]} ${y} ${gregSymbol}</span>` : '';

  m++;
  fixed = gregToFixed(y, m, d);
  let h = new Hijri(1421, 11, 28);
  h = fixedToHijri(fixed);

  const weekDay = defaultOptions.showWeekDay ? weekDays[defaultOptions.weekDayLang][dow] : '';
  const hijriDate = `${h.toString()} ${hijriSymbol}`;
  const printedDate = `<span class="week-day">${weekDay}</span> <span class="hijri-date">${hijriDate}</span> ${gregDate}`;

  $hostEl.html(printedDate);
}
