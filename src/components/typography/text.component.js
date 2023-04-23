import styled from "styled-components/native";

const defaultTextStyles = (theme, color) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const body = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const hint = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const error = (theme) => `
    color: ${theme.colors.text.error};
`;

const caption = (theme) => `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.bold};
`;

const label = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.medium};
`;

const h1 = (theme) => `
    font-size: ${theme.fontSizes.h1};
`;
const h2 = (theme) => `
    font-size: ${theme.fontSizes.h2};
`;
const h3 = (theme) => `
    font-size: ${theme.fontSizes.h3};
`;
const h4 = (theme) => `
    font-size: ${theme.fontSizes.h4};
`;
const h5 = (theme) => `
    font-size: ${theme.fontSizes.h5};
`;
const title = (theme) => `
    font-size: ${theme.fontSizes.title};
    font-weight: ${theme.fontWeights.bold};
`;

const titleLg = (theme) => `
    font-size: ${theme.fontSizes.h4};
    font-weight: ${theme.fontWeights.bold};
`;

const variants = {
  body,
  label,
  caption,
  error,
  hint,
  h1,
  h2,
  h3,
  h4,
  h5,
  title,
  titleLg,
};

const fetchColors = (color, theme) => theme.colors.text[color];

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
   color: ${({ color, theme }) => fetchColors(color, theme)};
  text-align: justify;
`;

Text.defaultProps = {
  variant: "body",
  color: "primary",
};
