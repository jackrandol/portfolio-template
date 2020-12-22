export const convertISODate = (dateISO) => {
  let date = new Date(dateISO);
  let year = date.getFullYear();
  let monthIndex = date.getMonth();
  let dt = date.getDate();
  let months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];

  if (dt < 10) {
    dt = '0' + dt;
  }
  return year + '-' + months[monthIndex] + '-' + dt;
};
