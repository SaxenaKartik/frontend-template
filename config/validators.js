export const validateMobile = (number) => {
  return /^\d{10}$/.test(number)? true:false;
}

export const validatePassword = (password) => {
  return /(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password)? true:false;
}

export const validateName = (name) =>{
  return /^[a-zA-Z]+ [a-zA-Z]*/.test(name) ? true : false;
}

export const validateEmail = (email) => {
  return /^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/.text(email) ? true : false;
}
