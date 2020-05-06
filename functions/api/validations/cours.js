//Validator
const isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

exports.validateCoursData = (data) => {
  let errors = {};
  if (isEmpty(data.name)) errors.name = "Must not be empty";
  if (isEmpty(data.fullProf)) errors.fullProf = "Must not be empty";
  
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.reduceCoursDetails = (data) => {
  let coursDetails = {};
  if (!isEmpty(data.name)) coursDetails.name = data.name;
  if (!isEmpty(data.fullProf)) coursDetails.fullProf = data.fullProf;
  if (!isEmpty(data.typeExam)) coursDetails.typeExam = data.typeExam;
  if (!isEmpty(data.nbrCredit)) coursDetails.nbrCredit = data.nbrCredit;
  if (!isEmpty(data.nbrHeure)) coursDetails.nbrHeure = data.nbrHeure;
  
  return coursDetails;
};
