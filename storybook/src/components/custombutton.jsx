import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const CustomButton = ({ variant, size, shape, children, ...rest }) => {
  console.log(variant, size, shape, children);
  return (
    <Button variant={variant} size={size} shape={shape} {...rest}>
      {children}
    </Button>
  );
};

export default CustomButton;

// CustomButton의 기본 Props값
CustomButton.defaultProps = {
  variant: "primary",
  size: "large",
  shape: "round",
  children: "추가",
};

CustomButton.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  shape: PropTypes.oneOf(["shape", "round"]),
  children: PropTypes.string,
};

const variantCSS = {
  primary: css`
    background-color: ${({ theme }) => theme.COLORS.primary["mint"]};
    color: ${({ theme }) => theme.COLORS.white};
    &:hover {
      background-color: ${({ theme }) => theme.COLORS.primary["deep_mint"]};
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.COLORS.secondary["purple"]};
    color: ${({ theme }) => theme.COLORS.white};
    &:hover {
      background-color: ${({ theme }) => theme.COLORS.secondary["deep_purple"]};
    }
  `,
};

const sizeCSS = {
  small: css`
    font-size: ${({ theme }) => theme.FONT_SIZE.small};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    height: 40px;
    width: 100px;
  `,
  medium: css`
    font-size: ${({ theme }) => theme.FONT_SIZE.medium};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    height: 40px;
    width: 150px;
  `,
  large: css`
    font-size: ${({ theme }) => theme.FONT_SIZE.large};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    height: 40px;
    width: 200px;
  `,
};

const shapeCSS = {
  shape: css`
    border-radius: 8px;
  `,
  round: css`
    border-radius: 24px;
  `,
};

const Button = styled.button`
  ${({ variant }) => variantCSS[variant]}
  ${({ size }) => sizeCSS[size]}
  ${({ shape }) => shapeCSS[shape]}
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  /* &:hover {
    opacity: 0.7;
  } */
`;
