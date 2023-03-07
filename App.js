import { useState, useCallback } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar'

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

import Colors from "./constants/colors";

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans-regular": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen onPickedNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = <GameScreen userNumbers={userNumber} onGameOver={gameOverHandler} />;
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen userChosenNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler} />;
  }


  return (
    <>
      <StatusBar style="dark" />
      <LinearGradient colors={[Colors.orange, Colors.white]} style={styles.rootScreen}>
        <ImageBackground source={require('./assets/images/background.png')} resizeMode="cover" style={styles.rootScreen} imageStyle={styles.backgroundImage}>

          <SafeAreaView style={styles.rootScreen} onLayout={onLayoutRootView}>
            {screen}
          </SafeAreaView>

        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  },
  backgroundImage: {
    opacity: 0.15
  }
});
