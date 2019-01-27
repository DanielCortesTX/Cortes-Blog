const Validator = require('validator')
const isEmpty = require('./is-empty')
const Filter = require('bad-words')

module.exports = function validateRegisterInput(data) {
  let errors = {}

  let filter = new Filter()
  let profaneCheck = filter.clean(data.username)

  data.profaneCheck = !isEmpty(data.username) ? profaneCheck : ''
  data.username = !isEmpty(data.username) ? data.username : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.password2 = !isEmpty(data.password2) ? data.password2 : ''

  if(!Validator.isLength(data.username, { min: 2, max: 14 })){
    errors.username = 'Username must be between 2 and fourteen characters'
  }

  if(Validator.isEmpty(data.username)){
    errors.username = 'Username field is required'
  }

  if(!Validator.isAlphanumeric(data.username)){
    errors.username = 'Username can only have letters and numbers'
  }

  if(!Validator.isAlphanumeric(data.profaneCheck)){
    errors.username = 'Username failed profanity check. Try another.'
  }

  if(Validator.isEmpty(data.password)){
    errors.password = 'Password field is required'
  }

  if(!Validator.isLength(data.password, { min: 2, max: 10})){
    errors.password = 'Password must be between 2 and ten characters'
  }

  if(Validator.isEmpty(data.password2)){
    errors.password2 = 'Password field is required'
  }

  if(!Validator.equals(data.password, data.password2)){
    errors.password2 = 'Passwords must match'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}