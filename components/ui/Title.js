import { Text, StyleSheet, useWindowDimensions, Platform } from "react-native";
import Colors from "../../constants/colors";


function Title(props) {

    const { width, height } = useWindowDimensions();

    let marginSize = 60;
    if (width < 380) {
        marginSize = 12;
    }

    if (height < 400) {
        marginSize = 40;
    }

    const containerStyle = {
        margin: marginSize,
    }

    return <Text style={[styles.title, containerStyle]}>{props.children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 24,
        // fontWeight: "bold",
        color: Colors.white,
        textAlign: "center",
        // borderWidth: Platform.OS === "android" ? 2 : 0,
        borderWidth: Platform.select({ ios: 0, android: 2 }),
        borderColor: Colors.blue,
        padding: 12,
        marginBottom: 12,
        maxWidth: "100%",
        // maxWidth: "80%",
        // width: 300

    }
})