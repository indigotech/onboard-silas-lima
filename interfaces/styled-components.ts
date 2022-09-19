import { SingleValidation } from './validations';

export interface FormFieldProps {
  label: string;
  placeholder?: string;
  validation: SingleValidation;
  onChangeText: (value: string) => void;
}

export interface ActionButtonProps {
  label: string;
  loading: boolean;
  handlePress: () => void;
}

export interface OptionSelectorProps {
  option: string;
  selectedOption: boolean;
  onPress: () => void;
}
