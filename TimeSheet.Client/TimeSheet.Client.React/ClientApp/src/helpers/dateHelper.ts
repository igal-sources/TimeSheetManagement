export const calculateAge = (dateToCalc: string) => {
  // console.log('dateToCalc', dateToCalc);
  var today = new Date();
  var birthDate = new Date(dateToCalc);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  // console.log("calculateAge", age);
  return age;
};

