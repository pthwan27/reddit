export const slugify = (str: string) => {
  return str
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove invalid chars
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/-+/g, '-') // Collapse dashes
    .replace(/^-+|-+$/g, '');
};

export const makeId = (length: number) => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const result = [];
  const charsLength = chars.length;

  for (let i = 0; i < length; i++) {
    result.push(chars[Math.floor(Math.random() * charsLength)]);
  }

  return result.join('');
};
