import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";

export const HomeBackground = styled.ImageBackground.attrs({
  // source: require("../../../../assets/home_bg3.jpg"),
  // resizeMode: "cover",
})`
  flex: 1;
  /* background-color: #fff; */
`;

export const HomeCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const HomeContainer = styled.View`
  padding: ${(props) => props.theme.space[4]};
  align-self: stretch;
`;

export const Title = styled(Text)`
  font-size: 50px;
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
export const HeaderContainer = styled.View`
  max-width: 100%;
  padding: ${(props) => props.theme.space[3]};
  align-items: center;
  flex-direction: row;
  position: relative;
  height: 220px;
  z-index: 100;
`;
// export const MainContainer = styled.View`
//   margin: ${(props) => props.theme.space[3]};
//   max-width: 100%;
//   flex: 3;
//   justify-content: space-evenly;
// `;

export const HealthButton = styled(Button)`
  padding: ${(props) => {
    return props.theme.space[2];
  }};
  border-radius: ${(props) => props.theme.borderRadius[3]};
  background-color: ${(props) =>
    props.buttonColor === "dark"
      ? props.theme.colors.brand.dark
      : props.theme.colors.brand.primary};
`;
export const CategorieContainer = styled.View`
  margin: 0 ${(props) => props.theme.space[3]};
  background-color: #222831;
  border-radius: ${(props) => props.theme.borderRadius[3]};
  padding: 10px;
`;
export const CategoryItem = styled.View`
  align-items: center;
  margin: 10px;
  justify-content: center;
`;

export const MainContainer = styled.View`
  width: 100%;
  justify-content: space-between;
  /* gap: 10px; */
  row-gap: 10px;
  padding: 12px;
  margin-top: 10px;
`;

export const ContainerBox = styled.View`
  width: 100%;
  height: 130px;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  border-radius: 10px;
`;
export const TitleBox = styled.View`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DataBox = styled.View`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const CircularView = styled.View`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(0.75);
`;
