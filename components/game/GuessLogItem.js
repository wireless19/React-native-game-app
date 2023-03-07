import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";


function GuessLogItem(props) {
    return (
        <View style={styles.listItem}>
            <Text style={styles.itemText}>#{props.roundsNumber}</Text>
            <Text style={styles.itemText}>Opponent's Guess: {props.guess}</Text>
        </View>
    );
}

export default GuessLogItem;

const styles = StyleSheet.create({
    listItem: {
        borderWidth: 1,
        borderColor: Colors.blue,
        padding: 12,
        marginVertical: 8,
        borderRadius: 40,
        backgroundColor: Colors.white,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        elevation: 4,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 3
    },
    itemText: {
        fontFamily: "open-sans-regular"
    }
})