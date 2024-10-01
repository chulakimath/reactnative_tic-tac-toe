import { Alert, Pressable, SafeAreaView, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { trigger } from 'react-native-haptic-feedback';

const App = () => {
  const [blocks, setBlocks] = useState(['', '', '', '', '', '', '', '', '']);
  const [chance, setChance] = useState("X");
  const [winner, setWinner] = useState(false);
  const [draw, setDraw] = useState(false);
  const [userScore, setUserScore] = useState({ userX: 0, userY: 0 })
  const skipRef = useRef(true);
  const skipwinner = useRef(true);
  const skipdraw = useRef(true);

  const hyptic_options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false
  };

  const handleClick = (idx:number) => {
    if (blocks[idx] != "X" && blocks[idx] != "O") {
      trigger('impactMedium', hyptic_options)
      setBlocks(blocks.map((item, index) => index == idx ? chance : item));
    }
  }
  useEffect(() => {
    if (skipRef.current) {
      skipRef.current = false;
      return;
    }

    if (blocks[0] == "X" && blocks[1] == "X" && blocks[2] == "X" || blocks[0] == "O" && blocks[1] == "O" && blocks[2] == "O") {
      setWinner(true);
      resetBlocks();
    }
    else if (blocks[3] == "X" && blocks[4] == "X" && blocks[5] == "X" || blocks[3] == "O" && blocks[4] == "O" && blocks[5] == "O") {
      setWinner(true)
      resetBlocks();
    }
    else if (blocks[6] == "X" && blocks[7] == "X" && blocks[8] == "X" || blocks[6] == "O" && blocks[7] == "O" && blocks[8] == "O") {
      setWinner(true)
      resetBlocks();
    }
    else if (blocks[0] == "X" && blocks[4] == "X" && blocks[8] == "X" || blocks[0] == "O" && blocks[4] == "O" && blocks[8] == "O") {
      setWinner(true)
      resetBlocks();
    }
    else if (blocks[2] == "X" && blocks[4] == "X" && blocks[6] == "X" || blocks[2] == "O" && blocks[4] == "O" && blocks[6] == "O") {
      setWinner(true)
      resetBlocks();
    }
    else if (blocks[0] == "X" && blocks[3] == "X" && blocks[6] == "X" || blocks[0] == "O" && blocks[3] == "O" && blocks[6] == "O") {
      setWinner(true)
      resetBlocks();
    }
    else if (blocks[1] == "X" && blocks[4] == "X" && blocks[7] == "X" || blocks[1] == "O" && blocks[4] == "O" && blocks[7] == "O") {
      setWinner(true)
      resetBlocks();
    }
    else if (blocks[2] == "X" && blocks[5] == "X" && blocks[8] == "X" || blocks[2] == "O" && blocks[5] == "O" && blocks[8] == "O") {
      setWinner(true)
      resetBlocks();
    }
    else {
      setDraw(blocks.every(element => element !== ""));
    }
    setChance(prev => prev === "X" ? "O" : "X");

    // console.log(blocks);
    // console.log("winner" + winner);
    // console.log("draw" + draw);
    // console.log("draw Skip" + skipdraw.current);
    // console.log("winner Skip" + skipwinner.current);
  }, [blocks]);


  useEffect(() => {
    if (skipwinner.current) {
      skipwinner.current = false;
      return;
    }
    if (chance == "X") {
      setUserScore(prev => ({ ...prev, userY: prev.userY + 1 }))
    } else {
      setUserScore(prev => ({ ...prev, userX: prev.userX + 1 }))
    }
    showAlertFunction(`winner is Player ${chance == "X" ? "O" : "X"}`);
    resetWins();
  }, [winner]);

  useEffect(() => {
    if (skipdraw.current) {
      skipdraw.current = false;
      return;
    }
    showAlertFunction("The Game Ended in Tie");
    resetBlocks();
    restTies();
  }, [draw]);

  const restTies = () => {
    skipdraw.current = true;
    setDraw(false);
  }
  const resetWins = () => {
    setWinner(false);
    skipwinner.current = true;
  }
  const resetScores = () => {
    setUserScore({ userX: 0, userY: 0 })
  }
  const resetBlocks = () => {
    setBlocks(["", "", "", "", "", "", "", "", ""]);
  }

  const showAlertFunction = (message: string) => {
    Alert.alert(message,
      "Press Ok To continue \nCancle To Reset Scores",
      [{
        text: "Cancle",
        onPress: () => {
          resetScores();
          resetBlocks();

        },
        style: 'cancel'
      },
      {
        text: 'Continue',
        onPress: () => {
          resetBlocks();
        }
      }],
      { cancelable: false }
    )
  }

  const theme = useColorScheme() == 'dark';
  const background = theme ? styles.blackBg : styles.whiteBg;
  const text_color = theme ? styles.whiteText : styles.blackText;
  return (
    <SafeAreaView style={[background, { flex: 1 }]}>

      <View>
        <Text style={[text_color, { fontSize: 45, textAlign: 'center', marginTop: 10 }]}>Tic-Tac-Toe</Text>
        <View style={[{ flexDirection: 'row', justifyContent: 'space-around', marginTop: "10%" }]}>
          <View>
            <Text style={[text_color, { fontSize: 25 }]}>Player X : {userScore.userX}</Text>
          </View>
          <View>
            <Text style={[text_color, { fontSize: 25 }]}>Player O : {userScore.userY}</Text>
          </View>
        </View>
        <View>
          <Text style={[text_color, { textAlign: 'center', fontSize: 20, marginVertical: "5%" }]}>Chance of Player {chance}</Text>
        </View>
        <View style={[styles.gridContainer]}>
          <Pressable style={[styles.box]} onPress={() => handleClick(0)}>
            <View >
              <Text style={[styles.boxtext]}>{blocks[0]}</Text>
            </View>
          </Pressable>
          <Pressable style={[styles.box]} onPress={() => handleClick(1)}>
            <View >
              <Text style={[styles.boxtext]}>{blocks[1]}</Text>
            </View>
          </Pressable>
          <Pressable style={[styles.box]} onPress={() => handleClick(2)}>
            <View >
              <Text style={[styles.boxtext]}>{blocks[2]}</Text>
            </View>
          </Pressable>
          <Pressable style={[styles.box]} onPress={() => handleClick(3)}>
            <View >
              <Text style={[styles.boxtext]}>{blocks[3]}</Text>
            </View>
          </Pressable>
          <Pressable style={[styles.box]} onPress={() => handleClick(4)}>
            <View >
              <Text style={[styles.boxtext]}>{blocks[4]}</Text>
            </View>
          </Pressable>
          <Pressable style={[styles.box]} onPress={() => handleClick(5)}>
            <View >
              <Text style={[styles.boxtext]}>{blocks[5]}</Text>
            </View>
          </Pressable>
          <Pressable style={[styles.box]} onPress={() => handleClick(6)}>
            <View >
              <Text style={[styles.boxtext]}>{blocks[6]}</Text>
            </View>
          </Pressable>
          <Pressable style={[styles.box]} onPress={() => handleClick(7)}>
            <View >
              <Text style={[styles.boxtext]}>{blocks[7]}</Text>
            </View>
          </Pressable>
          <Pressable style={[styles.box]} onPress={() => handleClick(8)}>
            <View >
              <Text style={[styles.boxtext]}>{blocks[8]}</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  blackBg: {
    backgroundColor: 'black'
  },
  whiteBg: {
    backgroundColor: "white"
  },
  blackText: {
    color: 'black'
  },
  whiteText: {
    color: 'white'
  },
  gridContainer: {
    marginTop: "20%",
    // flex: 1,
    marginVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10
  },
  box: {
    width: '30%',
    height: 100,
    aspectRatio: 1,
    marginBottom: 10,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  boxtext: {
    fontSize: 28,
    fontWeight: 'bold'
  }
})