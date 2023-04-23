import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.component";

export const AccountBackground = styled.View`
  flex: 1;
`;

export const AccountCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const AccountContainer = styled.View`
  padding: 0 ${(props) => props.theme.space[4]};
  align-self: stretch;
  margin: auto 0;
`;
export const RegisterBackground = styled.View`
  flex: 1;
`;

export const RegisterContainer = styled.View`
  padding: 0 ${(props) => props.theme.space[4]};
  /* align-self: stretch; */
  margin: auto 0;
  justify-content: center;
`;
export const AuthButton = styled(Button)`
  padding: ${(props) => {
    return props.theme.space[2];
  }};
  background-color: ${(props) =>
    props.buttonColor === "dark"
      ? props.theme.colors.brand.dark
      : props.theme.colors.brand.primary};
  border-radius: 10px;
`;

export const AuthInput = styled(TextInput)`
  width: 100%;
`;

export const Title = styled(Text)`
  font-weight: bold;
  text-align: center;
  color: #000;
  text-transform: uppercase;
  margin-top: ${(props) => props.theme.space[2]};
`;
export const SubTitle = styled(Text)`
  font-size: 30px;
  text-align: center;
  color: #000;
  margin-top: ${(props) => props.theme.space[2]};
  margin-top: auto;
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;
export const InfoContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const HeadingWrapper = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  /* padding: ${(props) => props.theme.space[3]} */
`;
export const ImageWrapper = styled.View`
  margin: 0 auto;
`;
