import { Fragment } from 'react';
import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import { ActionButtonProps, FormFieldProps, OptionSelectorProps } from './interfaces/styled-components';

export const View = styled.View<{ isDarkMode: boolean }>`
  background-color: ${(props) => (props.isDarkMode ? '#000000' : '#FFFFFF')};
`;

export const Title = styled.Text`
  color: #000000;
  font-size: 24px;
  font-weight: bold;
  margin: 20px;
`;

export const FormLabel = styled.Text<{ isValidInput: boolean }>`
  color: ${(props) => (props.isValidInput ? '#777777' : '#C11A26')};
  font-size: 12px;
  font-weight: normal;
  margin-vertical: 12px;
  margin-horizontal: 20px;
`;

const FormInput = styled.TextInput<{ isValidInput: boolean }>`
  border: 1px;
  border-radius: 8px;
  border-color: ${(props) => (props.isValidInput ? '#777777' : '#C11A26')};
  height: 40px;
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

export const FormField = (props: FormFieldProps) => {
  return (
    <Fragment>
      <FormLabel isValidInput={props.validation.isValid}> {props.label} </FormLabel>
      <FormInput
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        isValidInput={props.validation.isValid}
        secureTextEntry={props.label == 'Senha'}
      />
      {!props.validation.isValid && <ErrorMessage> {props.validation.errorMessage} </ErrorMessage>}
    </Fragment>
  );
};

export const ActionButton = (props: ActionButtonProps) => {
  return (
    <ButtonContainer onPress={props.handlePress} disabled={props.loading}>
      {props.loading && <ActivityIndicator color='#00002D' />}
      <ButtonText> {props.label} </ButtonText>
    </ButtonContainer>
  );
};

export const OptionSelector = (props: OptionSelectorProps) => {
  return (
    <OptionContainer onPress={props.onPress} selectedOption={props.selectedOption}>
      <OptionText selectedOption={props.selectedOption}>{props.option}</OptionText>
    </OptionContainer>
  );
};
