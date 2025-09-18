import { useTheme } from "styled-components";

interface SearchIconProps {
  width?: number;
  height?: number;
}

const SearchIcon = ({ width = 20, height = 20 }: SearchIconProps) => {
  const theme = useTheme();

  return (
    <svg width={width} height={height} fill="none" viewBox="0 0 20 20">
      <circle cx="9" cy="9" r="7" stroke={theme.colors.text} strokeWidth="2" />
      <line
        x1="14"
        y1="14"
        x2="19"
        y2="19"
        stroke={theme.colors.text}
        strokeWidth="2"
      />
    </svg>
  );
};

export default SearchIcon;
