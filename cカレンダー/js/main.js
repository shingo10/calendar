"use strict";
console.clear();
{
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  //先月後半のカレンダー
  function getCalendarHead() {
    const dates = [];

    const d = new Date(year, month, 0).getDate();
    const n = new Date(year, month, 1).getDay();

    for (let i = 0; i < n; i++) {
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true,
      });
    }
    return dates;
  }
  //今月のカレンダー
  function getCalendarBody() {
    const dates = []; // date:日付, day:曜日
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }
    if (year === today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() - 1].isToday = true;
    }
    return dates;
  }
  //来月頭のカレンダー
  function getCalendarTail() {
    const dates = [];
    const lastDate = new Date(year, month + 1, 0).getDay();

    for (let i = 1; i < 7 - lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }

    return dates;
  }
  /////////////////////////////////////////////////////////////////////////////////////

  /////月移動時に前の月表示を消す
  function clearCalendar() {
    const tbody = document.querySelector("tbody");
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }

  //月移動時のタイトル表示の変更
  function renderTitle() {
    const title = `${year}/${String(month + 1).padStart(2, "0")}`;
    document.getElementById("title").textContent = title;
  }

  function renderWeeks() {
    const dates = [
      ...getCalendarHead(),
      ...getCalendarBody(),
      ...getCalendarTail(),
      ,
    ];
    const weeks = [];
    const weekCount = dates.length / 7;

    //////四週分にわける
    for (let i = 1; i < weekCount; i++) {
      weeks.push(dates.splice(0, 7));
    }

    //////tobody四週分(weeks)をHTML風に描写する
    weeks.forEach((week) => {
      const tr = document.createElement("tr"); //tr

      week.forEach((date) => {
        const td = document.createElement("td"); //td

        td.textContent = date.date; //td textContent
        if (date.isToday) {
          td.classList.add("today");
        }
        if (date.isDisabled) {
          td.classList.add("disabled");
        }
        tr.appendChild(td); //tr内にtd  appendChild
      });
      document.querySelector("tbody").appendChild(tr); //tobody内にtr  appendChild
    });
  }

  function createCalendar() {
    clearCalendar();
    renderTitle();
    renderWeeks();
  }
  document.getElementById("prev").addEventListener("click", () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    }
    createCalendar();
  });
  document.getElementById("next").addEventListener("click", () => {
    month++;
    if (month > 11) {
      year++;
      month = 0;
    }
    createCalendar();
  });
  document.getElementById("today").addEventListener("click", () => {
    year = today.getFullYear();
    month = today.getMonth();
    createCalendar();
  });
  createCalendar();
}
