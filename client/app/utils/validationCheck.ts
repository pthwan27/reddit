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
      if (value.length < 3) return '커뮤니티 이름을 3자 이상 입력해주세요.';

      if (value.length > 20) return '커뮤니티 이름은 20자 이하여야 합니다.';

      if (value.includes('-'))
        return "커뮤니티 이름에 '-'를 포함할 수 없습니다.";

      return 'valid';
    }

    case 'subDesc': {
      if (value.length < 5) return '커뮤니티 설명은 5자 이상 입력해주세요.';
      if (value.length > 100) return '커뮤니티 설명은 100자 이하여야 합니다.';
      return 'valid';
    }

    case 'postTitle': {
      return value.trim().length > 2 ? 'valid' : 'invalid';
    }
    case 'postContent': {
      return value.trim().length > 2 ? 'valid' : 'invalid';
    }

    case 'text':
    default:
      return value.length >= 2 ? 'valid' : 'invalid';
  }
}, 100);
