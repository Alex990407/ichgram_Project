// utils/urlHelpers.js

/**
 * Возвращает полный URL для аватара.
 * Если путь начинается с /uploads/, добавляет базовый адрес сервера.
 *
 * @param {string} url - Относительный или полный URL.
 * @returns {string} - Полный URL аватара.
 */
export const getFullAvatarUrl = (url) => {
  if (!url) return ""; // Если url отсутствует, возвращаем пустую строку
  return url.startsWith("/uploads/") ? `http://localhost:3003${url}` : url;
};
