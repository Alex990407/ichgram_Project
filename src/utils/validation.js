/**
 * Проверка валидности email
 * @param {string} email
 * @returns {string | null} Возвращает ошибку или null, если всё ок
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "Email is required.";
  }
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }
  return null;
};

/**
 * Проверка валидности пароля
 * @param {string} password
 * @returns {string | null} Возвращает ошибку или null, если всё ок
 */
export const validatePassword = (password) => {
  if (!password) {
    return "Password is required.";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  return null;
};
