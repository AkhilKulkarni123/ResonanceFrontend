export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password) {
  return password && password.length >= 8;
}

export function validateUsername(username) {
  return /^[a-zA-Z0-9_]{3,30}$/.test(username);
}
