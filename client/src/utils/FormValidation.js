/**
 *  Validate login-form
 *
 *  @author Jimmy
 */

export const validateLogin = (data) => {

  if (checkIfEmpty(data.userName)) {
    return 'Användarnamnet måste vara ifyllt!'
  }
  if (checkIfEmpty(data.email)) {
    return 'Mailadressen måste vara ifylld!'
  }
  if (checkIfEmpty(data.password)) {
    return 'Lösenordet måste vara ifyllt!'
  }

  return false
}

/**
 *  Validate register-form-form
 *
 *  @author Jimmy
 */

export const validateRegister = (data) => {

  console.log(data)

  if (checkIfEmpty(data.userName)) {
    return 'Användarnamnet måste vara ifyllt!'
  }
  if (checkIfEmpty(data.email)) {
    return 'Mailadressen måste vara ifylld!'
  }
  if (checkIfEmpty(data.password)) {
    return 'Lösenordet måste vara ifyllt!'
  }
  if (checkIfEmpty(data.passwordConfirm)) {
    return 'Lösenordet måste vara ifyllt!'
  }
  if (checkIfEmpty(data.firstName)) {
    return 'Förnamnet måste vara ifyllt!'
  }
  if (checkIfEmpty(data.surname)) {
    return 'Efternamnet måste vara ifyllt!'
  }
  if (data.password !== data.passwordConfirm) {
    return 'Lösenorden är inte lika!'
  }

  return false
}

const checkIfEmpty = (data) => {
  if (data === '') {
    return true;
  }
}