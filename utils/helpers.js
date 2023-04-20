const dayjs = require("dayjs");
const localizedFormat = require("dayjs/plugin/localizedFormat");
const locale = require("dayjs/locale/en-au");
const utc = require("dayjs/plugin/utc");
dayjs.extend(localizedFormat);
dayjs.extend(utc);

function formatDate(date) {
  const formattedDate = dayjs(date, "h,ma").locale(locale);
  return formattedDate.local().format("LLL");
}

module.exports = formatDate;
