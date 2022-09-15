import { Fragment } from 'react';
import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import { StyledOption } from './interfaces/styled-components';

export const Title = styled.Text`
  color: #000000;
  font-size: 24px;
  font-weight: bold;

  margin: 20px;
`;

export const FormLabel = styled.Text`
  color: #777777;
  font-size: 12px;
  font-weight: normal;

  margin-vertical: 12px;
  margin-horizontal: 20px;
`;

const FormInput = styled.TextInput`
  border: 1px;
  border-radius: 8px;
  border-color: #777777;

  height: 30px;
  padding-left: 10px;
  margin-horizontal: 20px;
`;

const ButtonContainer = styled.TouchableOpacity`
  height: 44px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;

  margin-top: 12px;
  margin-horizontal: 20px;

  border-radius: 8px;
  background-color: ${(props) => (props.disabled ? '#FEB800' : '#841584')};
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: normal;
`;

const OptionContainer = styled.TouchableOpacity<{ selectedOption: boolean }>`
  height: 35px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;

  margin-top: 10px;
  margin-horizontal: 20px;

  border-radius: 8px;
  background-color: ${(props) => (props.selectedOption ? '#000000' : '#FFFFFF')};
`;

const OptionText = styled.Text<{ selectedOption: boolean }>`
  color: ${(props) => (props.selectedOption ? '#FFFFFF' : '#000000')};
  font-size: 16px;
  font-weight: normal;
`;

export const ErrorMessage = styled.Text`
  color: #c11a26;
  font-size: 12px;
  font-weight: normal;

  margin-top: 8px;
  margin-horizontal: 20px;
`;

export const FormField = (props: {
  label: string;
  placeholder?: string;
  validationError: boolean;
  validationMessage: string;
  onChangeText: (value: string) => void;
}) => {
  return (
    <Fragment>
      <FormLabel> {props.label} </FormLabel>
      <FormInput
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        secureTextEntry={props.label == 'Senha'}
      />
      {props.validationError && <ErrorMessage> {props.validationMessage} </ErrorMessage>}
    </Fragment>
  );
};

export const ActionButton = (props: { label: string; loading: boolean; handlePress: () => void }) => {
  return (
    <ButtonContainer onPress={props.handlePress} disabled={props.loading}>
      {props.loading && <ActivityIndicator color='#00002D' />}
      <ButtonText> {props.label} </ButtonText>
    </ButtonContainer>
  );
};

export const OptionSelector = (props: { option: string; selectedOption: boolean; onPress: () => void }) => {
  return (
    <OptionContainer onPress={props.onPress} selectedOption={props.selectedOption}>
      <OptionText selectedOption={props.selectedOption}>{props.option}</OptionText>
    </OptionContainer>
  );
};
