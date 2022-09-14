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
    inputTitle: {
      fontWeight: "400",
      marginLeft: 15,
    },
    loginInputContainer: {
      height: 60,
      margin: 15,
      padding: 10,
      borderWidth: 2,
      borderColor: "#AAAAAA",
      borderRadius: 10,
    },
    signinInputContainer: {
      height: 35,
      marginHorizontal: 15,
      marginVertical: 10,
      padding: 10,
      borderWidth: 2,
      borderColor: "#AAAAAA",
      borderRadius: 10,
    },
    button: {
      height: 60,
      marginHorizontal: 15,
      marginVertical: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      borderRadius: 10,
    },
    roleSelector: {
      height: 35,
      marginHorizontal: 15,
      marginTop: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      borderRadius: 10,
    },
    errorMessage: {
      marginLeft: 15,
      color: 'red',
    },
    userListSource: {
      fontWeight: "500",
      paddingHorizontal: 10,
      paddingVertical: 5,
      color: "white",
    },
    userList: {
      marginHorizontal: 15,
      marginVertical: 2,
      borderRadius: 10,
      backgroundColor: "black",
    }
});
