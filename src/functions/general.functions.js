import { format, formatDistance, subDays } from "date-fns";

export function timeConverter(UNIX_timestamp) {
  let a = new Date(UNIX_timestamp * 1000);
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  let sec = a.getSeconds();
  let time = date + " " + month.toUpperCase();
  return time;
}

// function that adds a comma to a number
export function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// function that turns a date into a mm/dd/yyyy format
export function beatifyDate(d, f) {
  return format(d, f);
}

export function daysAgo(date) {
  return formatDistance(date, new Date(), {
    addSuffix: true,
  });
}
