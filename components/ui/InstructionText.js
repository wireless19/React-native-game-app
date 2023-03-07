import { Text, StyleSheet } from "react-native";

import Colors from "../../constants/colors";

function InstructionText(props) {
    return <Text style={[styles.instructionText, props.stylez]}>{props.children}</Text>;
}

export default InstructionText;

const styles = StyleSheet.create({
    instructionText: {
        fontFamily: "open-sans-regular",
        color: Colors.white,
        fontSize: 24
    }
});