import { View, StyleSheet, Alert, FlatList, useWindowDimensions } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import GuessLogItem from "../components/game/GuessLogItem";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen(props) {

    const initialGuess = generateRandomBetween(1, 100, props.userNumbers);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessLogRounds, setGuessLogRounds] = useState([initialGuess]);

    useEffect(() => {
        if (currentGuess === props.userNumbers) {
            props.onGameOver(guessLogRounds.length);
        }
    }, [currentGuess, props.userNumbers, props.onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []);

    function nextGuessHandler(direction) {
        if (
            (direction === "lower" && currentGuess < props.userNumbers) ||
            (direction === "greater" && currentGuess > props.userNumbers)
        ) {
            Alert.alert("Don't lie!", "You know this is wrong...", [{ text: "Sorry", style: "cancel" }])
            return;
        }

        if (direction === "lower") {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }

        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRndNumber);
        setGuessLogRounds(previousGuessRounds => [newRndNumber, ...previousGuessRounds]);
    }

    function callNextGuessHandlerLower() {
        nextGuessHandler("lower")
    }

    function callNextGuessHandlerGreater() {
        nextGuessHandler("greater")
    }

    const guessLogRoundsListLength = guessLogRounds.length;

    let content = (
        <>
            <NumberContainer>
                {currentGuess}
            </NumberContainer>
            <Card>
                <InstructionText stylez={styles.instructionText}>Lower or Higher ?</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        {/* <PrimaryButton onPressButton={nextGuessHandler.bind(this, "lower")}>-</PrimaryButton> */}
                        <PrimaryButton onPressButton={callNextGuessHandlerLower}>
                            <Ionicons name="md-remove" size={24} color="black" />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        {/* <PrimaryButton onPressButton={nextGuessHandler.bind(this, "greater")}>+</PrimaryButton> */}
                        <PrimaryButton onPressButton={callNextGuessHandlerGreater}>
                            <Ionicons name="md-add" size={24} color="black" />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
        </>
    );

    const { width, height } = useWindowDimensions();

    if (width > 500) {
        content = (
            <>
                <View style={styles.buttonContainerWide}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPressButton={callNextGuessHandlerLower}>
                            <Ionicons name="md-remove" size={24} color="black" />
                        </PrimaryButton>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPressButton={callNextGuessHandlerGreater}>
                            <Ionicons name="md-add" size={24} color="black" />
                        </PrimaryButton>
                    </View>
                </View>
            </>
        );
    }

    const paddingTopDistance = height < 400 ? 45 : 90

    return (
        <View style={[styles.screen, { paddingTop: paddingTopDistance }]}>
            <Title>Opponent's Guess</Title>
            {content}
            <View style={styles.listContainer}>
                {/* {guessLogRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}

                {/* OR */}

                {/* <FlatList
                    data={guessLogRounds}
                    renderItem={(itemData) => <Text>{itemData.item}</Text>}

                    keyExtractor is used to extract the unique key from API's
                    keyExtractor={(item) => item}
                /> */}
                <FlatList
                    data={guessLogRounds}
                    renderItem={(itemData) => <GuessLogItem roundsNumber={guessLogRoundsListLength - itemData.index} guess={itemData.item} />}

                    // keyExtractor is used to extract the unique key from API's
                    keyExtractor={(item) => item}
                />
            </View>
        </View>

    );
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        // paddingTop: 90,
        alignItems: "center"
    },
    instructionText: {
        marginBottom: 12
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    buttonContainer: {
        flex: 1
    },
    buttonContainerWide: {
        flexDirection: "row",
        alignItems: "center"
    },
    listContainer: {
        flex: 1,
        padding: 16
    }
});