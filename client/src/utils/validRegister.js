export const validRegister = (userRegister) => {
  const { userName, email, password } = userRegister;
  const errors = [];

  if (!userName) {
    errors.push("Please add your username.")
  } else if (userName.length > 20) {
    errors.push("Your userName is up to 20 chars long.")
  }

  if (!email) {
    errors.push("Please add your email")
  } else if (!validateEmail(email)) {
    errors.push("Email format is incorrect.")
  }

  if (!password) {
    errors.push("Please enter a password!")
  } else if (password.length < 8) {
    errors.push("Password must be at least 8 chars.")
  }

}



export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}