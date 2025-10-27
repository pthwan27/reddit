import { throttle } from 'lodash';

export const validaionCheck = throttle((value: string, type: string) => {
  if (!value) return 'none';

  switch (type) {
    case 'name': {
      const nameRegex = /^[a-zA-Z가-힣\s]{2,}$/;
      return nameRegex.test(value) ? 'valid' : 'invalid';
    }

    case 'nickname': {
      const nicknameRegex = /^[a-zA-Z가-힣0-9_]{2,12}$/;
      return nicknameRegex.test(value) ? 'valid' : 'invalid';
    }

    case 'email': {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? 'valid' : 'invalid';
    }

    case 'password': {
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      return passwordRegex.test(value) ? 'valid' : 'invalid';
    }

    case 'tel': {
      const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;
      return phoneRegex.test(value.replace(/[^0-9]/g, ''))
        ? 'valid'
        : 'invalid';
    }

    case 'url': {
      try {
        new URL(value);
        return 'valid';
      } catch {
        return 'invalid';
      }
    }

    case 'number': {
      const num = Number(value);
      return !isNaN(num) && isFinite(num) ? 'valid' : 'invalid';
    }

    case 'subTitle': {
      return (!value || value.trim() !== '') &&
        (value.length > 2 || value.length <= 20)
        ? 'valid'
        : 'invalid';
    }

    case 'subDesc': {
      return (!value || value.trim() !== '') &&
        (value.length > 2 || value.length <= 100)
        ? 'valid'
        : 'invalid';
    }

    case 'text':
    default:
      return value.length >= 2 ? 'valid' : 'invalid';
  }
}, 100);
