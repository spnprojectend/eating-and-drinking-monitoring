import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";

export const MainContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  padding: 10px;
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
  width: 36%;
  row-gap: 5px;
`;

export const DataBox = styled.View`
  width: 64%;

  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
