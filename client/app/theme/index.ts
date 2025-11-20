'use client';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof newTheme.colors;
    gradients: typeof newTheme.gradients;
    components: typeof newTheme.components;
  }
}

export const newTheme = {
  colors: {
    action: {
      downvote: '#6A5CFF',
      upvote: '#D93900',
    },
    brand: {
      background: '#D93900',
      backgroundHover: '#AE2C00',
      onBackground: '#FFFFFF',
    },
    caution: {
      background: '#FFBF0B',
      backgroundHover: '#D8A100',
      onBackground: '#000000',
      plain: '#785800',
      plainHover: '#5B4200',
    },
    danger: {
      background: '#EB001F',
      backgroundHover: '#BC0117',
      backgroundWeaker: '#FBDBD4',
      content: '#BC0117',
      contentHover: '#90000F',
      onBackground: '#FFFFFF',
      plain: '#BC0117',
      plainHover: '#90000F',
    },
    downvote: {
      background: '#6A5CFF',
      backgroundHover: '#523DFF',
      content: '#523DFF',
      onBackground: '#FFFFFF',
      plain: '#523DFF',
    },
    upvote: {
      background: '#D93900',
      backgroundHover: '#AE2C00',
      content: '#AE2C00',
      onBackground: '#FFFFFF',
      plain: '#AE2C00',
    },
    global: {
      black: '#000000',
      white: '#FFFFFF',
      orangered: '#FF4500',
      gold: '#B78800',
      moderator: '#008A10',
      admin: '#D93900',
      online: '#00C61C',
      offline: '#667780',
      pizzaRed: '#ef5350',
      error: '#FF585B',
    },
    interactive: {
      backgroundDisabled: '#0000000C',
      contentDisabled: '#0000003F',
      focused: '#0078D4',
      pressed: '#00000026',
    },
    media: {
      background: 'rgba(0, 0, 0, 0.6)',
      backgroundHover: 'rgba(0, 0, 0, 0.8)',
      backgroundSelected: 'rgba(0, 0, 0, 0.8)',
      borderSelected: '#FFFFFF',
      borderWeak: '#FFFFFF19',
      onBackground: '#FFFFFF',
      onBackgroundDisabled: '#FFFFFF3F',
      onBackgroundWeak: '#E5EBEE',
    },
    neutral: {
      background: '#FFFFFF',
      backgroundHover: '#F6F8F9',
      backgroundContainer: '#F6F8F9',
      backgroundSelected: '#E5EBEE',
      border: '#00000033',
      borderMedium: '#0000007F',
      borderWeak: '#00000019',
      borderStrong: '#181C1F',
      content: '#333D42',
      contentStrong: '#181C1F',
      contentWeak: '#5C6C74',
      contentDisabled: '#D6D6D6',
    },
    primary: {
      background: '#0A449B',
      backgroundHover: '#0A2F6C',
      border: '#0A449B',
      plain: '#0A449B',
      plainHover: '#0A2F6C',
      onBackground: '#FFFFFF',
    },
    secondary: {
      weak: '#576F76',
      background: '#E5EBEE',
      backgroundHover: '#DBE4E9',
      backgroundSelected: '#C9D7DE',
      onBackground: '#000000',
      plain: '#181C1F',
      plainHover: '#000000',
      plainWeak: '#5C6C74',
    },
    success: {
      background: '#008A10',
      backgroundHover: '#016E0B',
      content: '#016E0B',
      onBackground: '#FFFFFF',
      plain: '#016E0B',
      plainHover: '#005306',
    },
    warning: {
      background: '#B78800',
      backgroundHover: '#977000',
      content: '#785800',
      onBackground: '#000000',
    },
    default: {
      primary: '#115BCA',
      secondary: '#21272A',
      scrim: '#00000099',
    },
    tone: {
      1: '#131313',
      2: '#434343',
      3: '#ACACAC',
      4: '#E4E4E4',
      5: '#F2F2F2',
      6: '#F8F8F8',
      7: '#ffffff',
    },
    ui: {
      canvas: '#F6F8F9',
    },
    a: {
      default: '#3F4953',
      hover: '#2f372f',
      visited: '#9b00d4',
    },
  },
  gradients: {
    avatar: 'linear-gradient(0deg, #97AFBCff, #ffffffff 75%)',
    brandActive:
      'linear-gradient(180deg, #cd3700ff, #db3b00ff 68%, #D93900ff 100%)',
    brandDefault:
      'linear-gradient(180deg, #D93900ff, #db3b00ff 30%, #AE2C00ff 100%)',
    media: 'linear-gradient(180deg, #00000000, #0000008a 60%, #00000099 100%)',
    pressed:
      'linear-gradient(#00000026, #00000026), linear-gradient(#dbe4e9, #dbe4e9)',
  },
  components: {
    button: {
      background: {
        default: 'transparent',
        focus: 'transparent',
        hover: 'transparent',
        active: 'linear-gradient(transparent, transparent)',
        disabled: 'transparent',
        activated: '#C9D7DE',
      },
      text: {
        default: '#181C1F',
        disabled: '#0000003F',
        activated: '#181C1F',
        hover: '#000000',
      },
      border: {
        default: '#0000007F',
        hover: '#181C1F',
        active: '#181C1F',
        activated: '#181C1F',
        disabled: '#D6D6D6',
      },
      overlay: {
        focus: 'transparent',
        active: 'transparent',
      },
      borderWidth: {
        default: '0.0625rem',
        activated: '0.0625rem',
      },
      primary: {
        background: {
          hover: '#0A2F6C',
          activated: '#0A1A3F',
          disabled: '#0000000C',
        },
        border: {
          hover: '#0A449B',
          active: '#0A2F6C',
          activated: '#0A449B',
        },
        text: {
          disabled: '#0000003F',
          activated: '#FFFFFF',
        },
      },
      secondary: {
        background: {
          default: '#E5EBEE',
          focus: '#E5EBEE',
          hover: '#DBE4E9',
          disabled: '#0000000C',
          activated: '#C9D7DE',
        },
        border: {
          default: 'transparent',
          hover: '#E5EBEE',
          active: '#DBE4E9',
          activated: 'transparent',
          disabled: 'transparent',
        },
        text: {
          default: '#000000',
          disabled: '#0000003F',
          activated: '#000000',
        },
      },
      tertiary: {
        background: {
          default: 'transparent',
          focus: 'transparent',
          hover: '#DBE4E9',
          disabled: 'transparent',
          activated: '#333D42',
        },
        border: {
          hover: '#E5EBEE',
          active: '#DBE4E9',
        },
        text: {
          default: '#181C1F',
          disabled: '#D6D6D6',
          activated: '#FFFFFF',
        },
      },
      plain: {
        background: {
          hover: '#DBE4E9',
          disabled: 'transparent',
          activated: '#C9D7DE',
        },
        border: {
          hover: '#E5EBEE',
          active: '#DBE4E9',
        },
        text: {
          default: '#181C1F',
          hover: '#000000',
          disabled: '#0000003F',
          activated: '#000000',
          weak: '#5C6C74',
        },
      },
      caution: {
        background: {
          default: '#FFBF0B',
          hover: '#D8A100',
          disabled: '#0000000C',
        },
        text: '#000000',
      },
    },
    input: {
      border: 'transparent',
      pressed: '#00000026',
      helperText: '#5C6C74',
      secondary: {
        default: '#E5EBEE',
        hover: '#DBE4E9',
        text: '#000000',
      },
      bordered: {
        default: 'transparent',
        hover: '#F6F8F9',
        text: '#181C1F',
      },
      radio: {
        default: '#5C6C74',
        hover: '#181C1F',
      },
    },
    switch: {
      handle: '#FFFFFF',
      handleDisabled: '#E5EBEE',
      default: '#E5EBEE',
      defaultHover: '#DBE4E9',
      defaultDisabled: '#0000000C',
      checked: '#0A449B',
      checkedHover: '#0A2F6C',
      checkedDisabled: '#0000003F',
    },
    tooltip: {
      neutral: {
        background: '#FFFFFF',
        text: '#333D42',
      },
      inverted: {
        background: '#333D42',
        text: '#FFFFFF',
      },
      primary: {
        background: '#0A449B',
        text: '#FFFFFF',
      },
    },
    divider: '#00000033',
    label: '#5C6C74',
    shimmer: {
      background: '#00000008',
      gradientOverlay:
        'linear-gradient(to right, #00000000, #00000005 20%, #0000000f 50%, #00000008 70%, #00000000 100%)',
    },
  },
};

export type Theme = typeof newTheme;
