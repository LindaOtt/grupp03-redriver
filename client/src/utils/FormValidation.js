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

  let errorMessage = ''
}

const checkIfEmpty = (data) => {
  if (data === '') {
    return true;
  }
}