import styled from "styled-components";

const LeftNaveContainer = () => {
  return <StyledLeftNavContainer></StyledLeftNavContainer>;
};

const StyledLeftNavContainer = styled.nav`
  border-right: var(--line-sm) solid
    ${({ theme }) => theme.colors.naturalBorder};
`;
export default LeftNaveContainer;
