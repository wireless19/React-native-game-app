import { View, Text, StyleSheet, Dimensions, useWindowDimensions } from "react-native";
import Colors from "../../constants/colors";


function NumberContainer(props) {


    const { width, height } = useWindowDimensions();
    const marginDistance = height < 380 ? 12 : 24

    return (
        <View style={[styles.container, { margin: marginDistance }]}>
            <Text style={styles.numberText}>{props.children}</Text>
        </View>
    );
}

export default NumberContainer;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Colors.blue,
        padding: deviceWidth < 380 ? 12 : 24,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center"
    },
    numberText: {
        color: Colors.white,
        fontSize: deviceWidth < 380 ? 28 : 36,
        fontFamily: "open-sans-bold"
        // fontWeight: "bold"
    }
})