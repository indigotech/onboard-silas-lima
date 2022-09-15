import styled from 'styled-components/native';

export const Title = styled.Text`
    color: #000000;
    font-size: 24px;
    font-weight: bold;

    margin: 20px;
`;

export const ButtonContainer = styled.TouchableOpacity`
    height: 44px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-evenly;
    
    margin-top: 12px;
    margin-horizontal: 20px;
    
    border-radius: 8px;
    background-color: #841584;
`;

export const ButtonLabel = styled.Text`
    color: #FFFFFF;
    font-size: 16px;
    font-weight: normal;
`;

export const FormLabel = styled.Text`
    color: #777777;
    font-size: 12px;
    font-weight: normal;

    margin-vertical: 12px;
    margin-horizontal: 20px;
`;

export const FormField = styled.TextInput`
    border: 1px;
    border-radius: 8px;
    border-color: #777777;
    
    height: 30px;
    padding-left: 10px;
    margin-horizontal: 20px;
`;

export const FormError = styled.Text`
    color: #C11A26;
    font-size: 12px;
    font-weight: normal;

    margin-top: 8px;
    margin-horizontal: 20px;
`;