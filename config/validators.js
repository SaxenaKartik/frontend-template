export const validateMobile = (number) => {
  return /^\d{10}$/.test(number)? true:false;
}

export const validatePassword = (password) => {
  return /(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password)? true:false;
}

export const validateName = (name) =>{
  return /^[a-zA-Z]+\s*[a-zA-Z]*/.test(name) ? true : false;
}

export const validateEmail = (email) => {
  return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email) ? true : false;
}
