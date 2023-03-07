import { useState } from "react";
import { View, Image, Text, StyleSheet, Dimensions, useWindowDimensions, ScrollView } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";

function GameOverScreen(props) {
    const { width, height } = useWindowDimensions();
    let imageSize = 300;
    let imageHorizontalMargin = 25
    if (width < 380) {
        imageSize = 150;
        imageHorizontalMargin = 140
    }

    if (height < 400) {
        imageSize = 200;
        imageHorizontalMargin = 280
    }

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2,
        marginHorizontal: imageHorizontalMargin
    }

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.rootContainer}>
                <Title>GAME OVER!</Title>
                <View style={[styles.imageContainer, imageStyle]}>
                    <Image style={styles.image} source={require("../assets/images/success.png")} />
                </View>
                <Text style={styles.summaryText}>
                    Your Phone needed <Text style={styles.highLight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highLight}>{props.userChosenNumber}</Text>.
                </Text>
                <PrimaryButton onPressButton={props.onStartNewGame}>Start New Game</PrimaryButton>
            </View>
        </ScrollView>
    );
}

export default GameOverScreen;

// const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignContent: "center"
    },
    imageContainer: {
        // width: deviceWidth < 380 ? 150 : 300,
        // height: deviceWidth < 380 ? 150 : 300,
        // borderRadius: deviceWidth < 380 ? 75 : 150,
        borderWidth: 3,
        borderColor: Colors.blue,
        overflow: "hidden",
        // marginHorizontal: 25,
        marginVertical: 50
    },
    image: {
        width: "100%",
        height: "100%",
        // alignSelf: 'center'
    },
    summaryText: {
        fontFamily: "open-sans-regular",
        fontSize: 24,
        textAlign: "center",
        marginBottom: 24
    },
    highLight: {
        fontFamily: "open-sans-bold",
        color: Colors.blue
    }
});