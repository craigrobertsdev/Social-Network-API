const dayjs = require("dayjs");

function formatDate(date) {
  const dayJsDate = dayjs(this.createdAt);
  `${dayJsDate.month()} ${dayJsDate.date()}, ${dayJsDate.year()} at ${dayjs(date, "h,ma")}`;
}

module.exports = formatDate;
