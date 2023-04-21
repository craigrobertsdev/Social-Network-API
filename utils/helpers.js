const dayjs = require("dayjs");
const localizedFormat = require("dayjs/plugin/localizedFormat");
const utc = require("dayjs/plugin/utc");
// set locale to Australia
const locale = require("dayjs/locale/en-au");
// allows use of .format("LLL")
dayjs.extend(localizedFormat);
// enables call to .locale on dayjs()
dayjs.extend(utc);

function formatDate(date) {
  const formattedDate = dayjs(date, "h,ma").locale(locale);
  // example: 22 April 2023 4:53AM
  return formattedDate.local().format("LLL");
}

module.exports = { formatDate };
