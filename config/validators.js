export const validateMobile = (number) => {
  return /^\d{10}$/.test(number)? true:false;
}

export const validatePassword = (password) => {
  return /(?=.*[0-9])(?=.*[!@#\$%\^&\*\-\(\)\+\=\~\`\\\/\?\[\]\{\}\.\<\>\"\'\;\:\|])(?=.{8,})/.test(password)? true:false;
}

export const validateName = (name) =>{
  return /^[a-zA-Z]+\s*[a-zA-Z]*/.test(name) ? true : false;
}

export const validateEmail = (email) => {
  return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email) ? true : false;
}

export const validateItems = (items) => {
  var list = items.split('\n')
  let re_single = /^([a-zA-Z])+(\s|:| : |: | :)[0-9]+[a-zA-Z]*$/
  match = list.every((value)=>{return re_single.test(value);})
  // console.log(match)
  let re = /[a-zA-Z]+(\s|:| : |: | :)[0-9]+[a-zA-Z]*/gm
  var count = ((items || '').match(re) || []).length
  let re_count_lines = /\n/gm
  var count_lines = ((items || '').match(re_count_lines) || []).length
  return count_lines+1==count && match ? true : false
}

export const validateAddr = (addr) => {
  return /^null|$/.test(addr) ? true : false;
}
