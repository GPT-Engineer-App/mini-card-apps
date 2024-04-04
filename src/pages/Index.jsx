import React, { useState, useEffect } from "react";
import { Box, VStack, HStack, Text, Heading, Button, Input, Textarea, Grid, GridItem, IconButton, Progress, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { FaPlay, FaPause, FaUndo, FaPlus, FaTrash, FaVolumeUp } from "react-icons/fa";

const TodoApp = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() !== "") {
      setTodos([...todos, { text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <Box>
      <Heading size="md" mb={4}>
        TODO App
      </Heading>
      <HStack mb={4}>
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter a todo" />
        <IconButton icon={<FaPlus />} onClick={addTodo} />
      </HStack>
      <VStack align="stretch">
        {todos.map((todo, index) => (
          <HStack key={index} justify="space-between">
            <Text textDecoration={todo.completed ? "line-through" : "none"} onClick={() => toggleTodo(index)} cursor="pointer">
              {todo.text}
            </Text>
            <IconButton icon={<FaTrash />} onClick={() => removeTodo(index)} size="sm" />
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

const PomodoroTimer = () => {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTime(25 * 60);
    setIsRunning(false);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <Box>
      <Heading size="md" mb={4}>
        Pomodoro Timer
      </Heading>
      <Text fontSize="4xl" mb={4}>
        {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
      </Text>
      <HStack>
        {!isRunning ? <Button onClick={startTimer}>Start</Button> : <Button onClick={pauseTimer}>Pause</Button>}
        <Button onClick={resetTimer}>Reset</Button>
      </HStack>
    </Box>
  );
};

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const pauseStopwatch = () => {
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    setTime(0);
    setIsRunning(false);
  };

  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  return (
    <Box>
      <Heading size="md" mb={4}>
        Stopwatch
      </Heading>
      <Text fontSize="4xl" mb={4}>
        {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}.{milliseconds.toString().padStart(2, "0")}
      </Text>
      <HStack>
        {!isRunning ? <Button onClick={startStopwatch}>Start</Button> : <Button onClick={pauseStopwatch}>Pause</Button>}
        <Button onClick={resetStopwatch}>Reset</Button>
      </HStack>
    </Box>
  );
};

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");

  useEffect(() => {
    const savedBoard = localStorage.getItem("ticTacToeBoard");
    if (savedBoard) {
      setBoard(JSON.parse(savedBoard));
    }
    const savedPlayer = localStorage.getItem("ticTacToePlayer");
    if (savedPlayer) {
      setPlayer(savedPlayer);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ticTacToeBoard", JSON.stringify(board));
    localStorage.setItem("ticTacToePlayer", player);
  }, [board, player]);

  const handleClick = (index) => {
    if (board[index] === null) {
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      setPlayer(player === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer("X");
  };

  const renderSquare = (index) => (
    <Button w="100px" h="100px" fontSize="4xl" onClick={() => handleClick(index)} disabled={board[index] !== null}>
      {board[index]}
    </Button>
  );

  return (
    <Box>
      <Heading size="md" mb={4}>
        Tic-Tac-Toe
      </Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={4} mb={4}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <GridItem key={index}>{renderSquare(index)}</GridItem>
        ))}
      </Grid>
      <Button onClick={resetGame}>Reset</Button>
    </Box>
  );
};

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Box>
      <Heading size="md" mb={4}>
        Music Player
      </Heading>
      <HStack mb={4}>
        <IconButton icon={isPlaying ? <FaPause /> : <FaPlay />} onClick={togglePlay} />
        <IconButton icon={<FaUndo />} />
        <IconButton icon={<FaVolumeUp />} />
        <Slider value={volume} onChange={(value) => setVolume(value)} min={0} max={100} step={1}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </HStack>
      <Progress value={50} />
    </Box>
  );
};

const Scratchpad = () => {
  const [text, setText] = useState(() => {
    const savedText = localStorage.getItem("scratchpadText");
    return savedText || "";
  });

  useEffect(() => {
    localStorage.setItem("scratchpadText", text);
  }, [text]);

  return (
    <Box>
      <Heading size="md" mb={4}>
        Scratchpad
      </Heading>
      <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Write your notes here..." h="200px" />
    </Box>
  );
};

const Index = () => {
  return (
    <Box p={8}>
      <Heading size="xl" mb={8}>
        Mini Apps
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={8}>
        <GridItem>
          <Box borderWidth={1} borderRadius="lg" p={4} boxShadow="md">
            <TodoApp />
          </Box>
        </GridItem>
        <GridItem>
          <Box borderWidth={1} borderRadius="lg" p={4} boxShadow="md">
            <PomodoroTimer />
          </Box>
        </GridItem>
        <GridItem>
          <Box borderWidth={1} borderRadius="lg" p={4} boxShadow="md">
            <Stopwatch />
          </Box>
        </GridItem>
        <GridItem>
          <Box borderWidth={1} borderRadius="lg" p={4} boxShadow="md">
            <TicTacToe />
          </Box>
        </GridItem>
        <GridItem>
          <Box borderWidth={1} borderRadius="lg" p={4} boxShadow="md">
            <MusicPlayer />
          </Box>
        </GridItem>
        <GridItem>
          <Box borderWidth={1} borderRadius="lg" p={4} boxShadow="md">
            <Scratchpad />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Index;
