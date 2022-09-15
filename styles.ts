import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
    inputTitle: {
      fontWeight: "400",
      marginLeft: 15,
      marginBottom: 10,
    },
    loginInputContainer: {
      height: 60,
      margin: 15,
      marginBottom: 50,
      padding: 10,
      borderWidth: 2,
      borderColor: "#AAAAAA",
      borderRadius: 10,
    },
    signinInputContainer: {
      height: 35,
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 10,
      padding: 10,
      borderWidth: 2,
      borderColor: "#AAAAAA",
      borderRadius: 10,
    },
    button: {
      height: 60,
      marginLeft: 15,
      marginRight: 15,
      marginTop: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      borderRadius: 10,
    },
    roleSelector: {
      height: 35,
      marginLeft: 10,
      marginRight: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      borderRadius: 10,
      borderColor: "#AAAAAA",
    },
    errorMessage: {
      marginLeft: 15,
      color: 'red',
    },
    userList: {
      fontWeight: "500",
      margin: 2,
      padding: 7,
      color: "#FFFFFF",
      backgroundColor: "#000000",
      borderRadius: 10,
    },
});
