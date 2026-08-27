"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, RotateCcw, ArrowLeft, Play, Keyboard, Zap, Award } from "lucide-react";
import confetti from "canvas-confetti";

type GameType = "none" | "snake" | "tictactoe" | "memory" | "rps" | "typing" | "reaction";

export default function FunZone() {
  const [activeGame, setActiveGame] = useState<GameType>("none");

  return (
    <section id="funzone" className="py-20 px-6 sm:px-12 max-w-6xl mx-auto space-y-16 select-none">
      {/* Title */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans flex items-center justify-center gap-2">
          <Gamepad2 className="w-8 h-8 text-indigo-500" />
          <span>Fun Zone</span>
        </h2>
        <div className="w-12 h-1 bg-indigo-500 mx-auto rounded-full" />
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-zinc-500 font-mono uppercase tracking-wider">
          lightweight interactive developers playground
        </p>
      </div>

      <AnimatePresence mode="wait">
        {activeGame === "none" ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Snake Card */}
            <GameCard
              title="Neon Snake"
              desc="Guide the glowing snake to eat food and grow. Watch out for the walls!"
              icon="🐍"
              onClick={() => setActiveGame("snake")}
            />
            {/* Tic-Tac-Toe Card */}
            <GameCard
              title="Tic-Tac-Toe AI"
              desc="Challenge our heuristic AI. Can you find a path to victory?"
              icon="❌⭕"
              onClick={() => setActiveGame("tictactoe")}
            />
            {/* Memory Card */}
            <GameCard
              title="Tech Memory Match"
              desc="Test your recall. Match pairs of technology logos in record time."
              icon="🃏"
              onClick={() => setActiveGame("memory")}
            />
            {/* RPS Card */}
            <GameCard
              title="Rock Paper Scissors"
              desc="Play against a cheeky AI dealer who responds with witty commentary."
              icon="✊"
              onClick={() => setActiveGame("rps")}
            />
            {/* Typing Card */}
            <GameCard
              title="Typing Speed Test"
              desc="How fast can you compile characters? Type random coding statements."
              icon="⌨️"
              onClick={() => setActiveGame("typing")}
            />
            {/* Reaction Card */}
            <GameCard
              title="Reaction Time Test"
              desc="Wait for the board to turn green and tap instantly. Speed check!"
              icon="⚡"
              onClick={() => setActiveGame("reaction")}
            />
          </motion.div>
        ) : (
          <motion.div
            key="game-container"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="max-w-2xl mx-auto bg-white dark:bg-zinc-950/20 border border-zinc-200 dark:border-zinc-850 p-6 rounded-2xl shadow-xl glassmorphism"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-850 pb-4 mb-6">
              <button
                onClick={() => setActiveGame("none")}
                className="flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-550 dark:text-zinc-400 hover:text-indigo-500 transition-colors clickable focus:outline-none"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
              <span className="font-mono text-xs uppercase tracking-widest text-indigo-500 font-bold">
                {activeGame} Mode
              </span>
            </div>

            {/* Render selected game */}
            {activeGame === "snake" && <SnakeGame />}
            {activeGame === "tictactoe" && <TicTacToeGame />}
            {activeGame === "memory" && <MemoryGame />}
            {activeGame === "rps" && <RPSGame />}
            {activeGame === "typing" && <TypingGame />}
            {activeGame === "reaction" && <ReactionGame />}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Game Card component
function GameCard({ title, desc, icon, onClick }: { title: string; desc: string; icon: string; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer p-6 bg-white dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-850/50 hover:border-indigo-500/30 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 glassmorphism flex flex-col justify-between clickable"
    >
      <div>
        <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 w-fit">{icon}</div>
        <h3 className="text-lg font-bold text-zinc-850 dark:text-zinc-200 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors mb-2">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-zinc-550 dark:text-zinc-400 leading-relaxed">
          {desc}
        </p>
      </div>
      <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-indigo-500 dark:text-indigo-450 mt-4 group-hover:underline">
        Play game <Play className="w-2.5 h-2.5 fill-indigo-500/20" />
      </div>
    </div>
  );
}

/* ==========================================================================
   GAME 1: NEON SNAKE
   ========================================================================== */
function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  // Constants
  const GRID_SIZE = 15;
  const CELL_COUNT = 20; // 300x300 canvas

  const snakeRef = useRef<{ x: number; y: number }[]>([
    { x: 10, y: 10 },
    { x: 10, y: 11 },
  ]);
  const directionRef = useRef<{ x: number; y: number }>({ x: 0, y: -1 });
  const foodRef = useRef<{ x: number; y: number }>({ x: 5, y: 5 });

  useEffect(() => {
    const saved = localStorage.getItem("snake_high_score");
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  const spawnFood = () => {
    let newFood;
    while (!newFood) {
      const rx = Math.floor(Math.random() * CELL_COUNT);
      const ry = Math.floor(Math.random() * CELL_COUNT);
      // Ensure food doesn't land on snake
      if (!snakeRef.current.some((segment) => segment.x === rx && segment.y === ry)) {
        newFood = { x: rx, y: ry };
      }
    }
    foodRef.current = newFood;
  };

  const handleStart = () => {
    snakeRef.current = [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ];
    directionRef.current = { x: 0, y: -1 };
    setScore(0);
    spawnFood();
    setGameOver(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const dir = directionRef.current;
      if ((e.key === "ArrowUp" || e.key === "w") && dir.y === 0) {
        directionRef.current = { x: 0, y: -1 };
      } else if ((e.key === "ArrowDown" || e.key === "s") && dir.y === 0) {
        directionRef.current = { x: 0, y: 1 };
      } else if ((e.key === "ArrowLeft" || e.key === "a") && dir.x === 0) {
        directionRef.current = { x: -1, y: 0 };
      } else if ((e.key === "ArrowRight" || e.key === "d") && dir.x === 0) {
        directionRef.current = { x: 1, y: 0 };
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const gameTick = () => {
      const snake = [...snakeRef.current];
      const dir = directionRef.current;
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

      // Wall collision
      if (head.x < 0 || head.x >= CELL_COUNT || head.y < 0 || head.y >= CELL_COUNT) {
        triggerGameOver();
        return;
      }

      // Self collision
      if (snake.some((seg) => seg.x === head.x && seg.y === head.y)) {
        triggerGameOver();
        return;
      }

      // Grow or shift
      snake.unshift(head);
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        setScore((prev) => {
          const next = prev + 10;
          if (next > highScore) {
            setHighScore(next);
            localStorage.setItem("snake_high_score", next.toString());
          }
          return next;
        });
        spawnFood();
      } else {
        snake.pop();
      }
      snakeRef.current = snake;
      drawCanvas();
    };

    gameLoopRef.current = setInterval(gameTick, 110);
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameOver, score, highScore]);

  const triggerGameOver = () => {
    setGameOver(true);
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snakeRef.current.forEach((seg, idx) => {
      ctx.fillStyle = idx === 0 ? "#6366f1" : "rgba(99, 102, 241, 0.75)";
      ctx.fillRect(seg.x * GRID_SIZE, seg.y * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
    });

    // Draw food
    ctx.fillStyle = "#ec4899"; // pink
    ctx.beginPath();
    ctx.arc(
      foodRef.current.x * GRID_SIZE + GRID_SIZE / 2,
      foodRef.current.y * GRID_SIZE + GRID_SIZE / 2,
      GRID_SIZE / 2 - 1,
      0,
      Math.PI * 2
    );
    ctx.fill();
  };

  // Initial draw
  useEffect(() => {
    drawCanvas();
  }, [gameOver]);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex items-center justify-between w-full font-mono text-xs text-zinc-500">
        <span>Score: <strong className="text-zinc-800 dark:text-zinc-200">{score}</strong></span>
        <span>High Score: <strong className="text-indigo-500">{highScore}</strong></span>
      </div>

      <div className="relative border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-950 shadow-inner flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_COUNT}
          height={GRID_SIZE * CELL_COUNT}
          className="bg-black"
        />
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-3 text-center">
            <span className="text-zinc-400 font-mono text-sm font-bold tracking-wider">
              {score > 0 ? "GAME OVER" : "NEON SNAKE"}
            </span>
            <button
              onClick={handleStart}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-650 text-white font-bold rounded-lg text-xs hover:bg-indigo-600 transition-colors clickable focus:outline-none"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{score > 0 ? "Play Again" : "Start Game"}</span>
            </button>
          </div>
        )}
      </div>
      <p className="text-[10px] text-zinc-400 font-mono">Use Arrow Keys or WASD to navigate</p>
    </div>
  );
}

/* ==========================================================================
   GAME 2: TIC-TAC-TOE
   ========================================================================== */
function TicTacToeGame() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [status, setStatus] = useState<"playing" | "won" | "lost" | "draw">("playing");

  const checkWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
      [0, 4, 8], [2, 4, 6],             // Diag
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.includes(null) ? null : "draw";
  };

  const handleCellClick = (idx: number) => {
    if (board[idx] || !isPlayerTurn || status !== "playing") return;

    const nextBoard = [...board];
    nextBoard[idx] = "X";
    setBoard(nextBoard);

    const winner = checkWinner(nextBoard);
    if (winner === "X") {
      setStatus("won");
      confetti({ particleCount: 80, spread: 60 });
    } else if (winner === "draw") {
      setStatus("draw");
    } else {
      setIsPlayerTurn(false);
      // Trigger AI Move after short delay
      setTimeout(() => aiMove(nextBoard), 500);
    }
  };

  const aiMove = (currentBoard: (string | null)[]) => {
    // Basic heuristic: check if AI can win, or block player win, otherwise pick random open slot
    const getBestMove = (): number => {
      const openCells = currentBoard.map((c, i) => (c === null ? i : -1)).filter((i) => i !== -1);
      
      // 1. Try to win
      for (const cell of openCells) {
        const testBoard = [...currentBoard];
        testBoard[cell] = "O";
        if (checkWinner(testBoard) === "O") return cell;
      }
      // 2. Try to block player win
      for (const cell of openCells) {
        const testBoard = [...currentBoard];
        testBoard[cell] = "X";
        if (checkWinner(testBoard) === "X") return cell;
      }
      // 3. Fallback to center if open
      if (openCells.includes(4)) return 4;
      // 4. Random choice
      return openCells[Math.floor(Math.random() * openCells.length)];
    };

    const bestCell = getBestMove();
    if (bestCell !== undefined) {
      const nextBoard = [...currentBoard];
      nextBoard[bestCell] = "O";
      setBoard(nextBoard);

      const winner = checkWinner(nextBoard);
      if (winner === "O") {
        setStatus("lost");
      } else if (winner === "draw") {
        setStatus("draw");
      } else {
        setIsPlayerTurn(true);
      }
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setStatus("playing");
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
          {status === "playing"
            ? isPlayerTurn
              ? "Your turn (X)"
              : "AI is thinking (O)..."
            : status === "won"
            ? "Victory!"
            : status === "lost"
            ? "AI Won!"
            : "Draw!"}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3.5 w-60 h-60">
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleCellClick(idx)}
            className={`w-full h-full rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-3xl font-bold font-mono transition-all focus:outline-none clickable ${
              cell === "X"
                ? "text-indigo-500 bg-indigo-50/10 dark:bg-indigo-950/20"
                : cell === "O"
                ? "text-pink-500 bg-pink-50/10 dark:bg-pink-950/20"
                : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
            }`}
          >
            {cell}
          </button>
        ))}
      </div>

      <button
        onClick={handleReset}
        className="flex items-center gap-1.5 px-4 py-2 bg-indigo-650 text-white font-bold rounded-lg text-xs hover:bg-indigo-600 transition-colors clickable focus:outline-none"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset Game</span>
      </button>
    </div>
  );
}

/* ==========================================================================
   GAME 3: TECH MEMORY MATCH
   ========================================================================== */
const TECH_CARDS = ["⚛️", "🍃", "☕", "🟢", "⌥", "🚀", "🛡️", "📦"];

interface Card {
  id: number;
  val: string;
  isFlipped: boolean;
  isMatched: boolean;
}

function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const initGame = () => {
    const deck = [...TECH_CARDS, ...TECH_CARDS]
      .sort(() => Math.random() - 0.5)
      .map((val, idx) => ({ id: idx, val, isFlipped: false, isMatched: false }));
    setCards(deck);
    setSelected([]);
    setMoves(0);
    setIsWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (idx: number) => {
    if (cards[idx].isFlipped || cards[idx].isMatched || selected.length >= 2) return;

    const nextCards = [...cards];
    nextCards[idx].isFlipped = true;
    setCards(nextCards);

    const nextSelected = [...selected, idx];
    setSelected(nextSelected);

    if (nextSelected.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = nextSelected;
      if (cards[first].val === cards[second].val) {
        // Match!
        setTimeout(() => {
          const matchCards = [...cards];
          matchCards[first].isMatched = true;
          matchCards[second].isMatched = true;
          setCards(matchCards);
          setSelected([]);

          if (matchCards.every((c) => c.isMatched)) {
            setIsWon(true);
            confetti({ particleCount: 80, spread: 60 });
          }
        }, 300);
      } else {
        // No match flip back
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[first].isFlipped = false;
          resetCards[second].isFlipped = false;
          setCards(resetCards);
          setSelected([]);
        }, 900);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center justify-between w-full font-mono text-xs text-zinc-500">
        <span>Moves: <strong className="text-zinc-800 dark:text-zinc-200">{moves}</strong></span>
        {isWon && <span className="text-emerald-500 font-bold">Matched All Pairs!</span>}
      </div>

      <div className="grid grid-cols-4 gap-3 w-64">
        {cards.map((card, idx) => {
          const show = card.isFlipped || card.isMatched;
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(idx)}
              className={`aspect-square rounded-xl border flex items-center justify-center text-2xl transition-all duration-300 focus:outline-none clickable ${
                show
                  ? "bg-indigo-650/10 border-indigo-500 text-indigo-400 rotate-y-180"
                  : "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:scale-105"
              }`}
            >
              {show ? card.val : "?"}
            </button>
          );
        })}
      </div>

      <button
        onClick={initGame}
        className="flex items-center gap-1.5 px-4 py-2 bg-indigo-650 text-white font-bold rounded-lg text-xs hover:bg-indigo-600 transition-colors clickable focus:outline-none"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset Game</span>
      </button>
    </div>
  );
}

/* ==========================================================================
   GAME 4: ROCK PAPER SCISSORS VS AI
   ========================================================================== */
type Choice = "rock" | "paper" | "scissors";

const RPS_AI_LINES: Record<string, string[]> = {
  win: [
    "Compile error on your end! AI claims the points.",
    "My neural network predicted that move easily.",
    "Try updating your heuristics, Human!"
  ],
  lose: [
    "Fine, you bypass my firewall this time.",
    "Anish, is that you hacking my code parameters?",
    "Stack overflow! You won this query round."
  ],
  tie: [
    "Ping timeout, a parallel lock tie.",
    "Consensus mechanism locked. Let's rerun.",
    "A standard merge conflict, pick again."
  ]
};

function RPSGame() {
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [dialog, setDialog] = useState("Awaiting your transaction query move...");
  const [lastRound, setLastRound] = useState("");

  const playRound = (playerChoice: Choice) => {
    const choices: Choice[] = ["rock", "paper", "scissors"];
    const aiChoice = choices[Math.floor(Math.random() * choices.length)];

    let result = "";
    if (playerChoice === aiChoice) {
      result = "tie";
    } else if (
      (playerChoice === "rock" && aiChoice === "scissors") ||
      (playerChoice === "paper" && aiChoice === "rock") ||
      (playerChoice === "scissors" && aiChoice === "paper")
    ) {
      result = "win";
    } else {
      result = "lose";
    }

    // Set scoreboard
    if (result === "win") {
      setPlayerScore((p) => p + 1);
      confetti({ particleCount: 15, colors: ["#6366f1"] });
    } else if (result === "lose") {
      setAiScore((a) => a + 1);
    }

    // Set interactive dialog
    const quoteList = RPS_AI_LINES[result];
    const phrase = quoteList[Math.floor(Math.random() * quoteList.length)];
    setLastRound(`You chose ${playerChoice.toUpperCase()} | AI chose ${aiChoice.toUpperCase()}`);
    setDialog(phrase);
  };

  const resetRps = () => {
    setPlayerScore(0);
    setAiScore(0);
    setDialog("System reboot. Make your transaction move.");
    setLastRound("");
  };

  return (
    <div className="flex flex-col items-center gap-6 font-mono">
      <div className="flex items-center justify-between w-full text-xs text-zinc-500">
        <span>Human: <strong className="text-zinc-800 dark:text-zinc-200">{playerScore}</strong></span>
        <span>AI Coprocessor: <strong className="text-pink-500">{aiScore}</strong></span>
      </div>

      {/* Terminal Dialogue Box */}
      <div className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl space-y-1.5 shadow-inner">
        <p className="text-[10px] text-zinc-500 font-bold uppercase">&gt; console_logs</p>
        {lastRound && <p className="text-[11px] text-zinc-400">{lastRound}</p>}
        <p className="text-xs text-indigo-400 font-bold leading-relaxed">{dialog}</p>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-4">
        {(["rock", "paper", "scissors"] as const).map((choice) => (
          <button
            key={choice}
            onClick={() => playRound(choice)}
            className="w-14 h-14 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 hover:bg-indigo-50/10 dark:hover:bg-zinc-900 flex items-center justify-center text-xl transition-all clickable focus:outline-none"
          >
            {choice === "rock" ? "✊" : choice === "paper" ? "✋" : "✌️"}
          </button>
        ))}
      </div>

      <button
        onClick={resetRps}
        className="flex items-center gap-1.5 px-4 py-2 bg-indigo-650 text-white font-bold rounded-lg text-xs hover:bg-indigo-600 transition-colors clickable focus:outline-none"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reboot Score</span>
      </button>
    </div>
  );
}

/* ==========================================================================
   GAME 5: TYPING SPEED TEST
   ========================================================================== */
const CODING_TESTS = [
  "const express = require('express'); const app = express(); app.listen(3000);",
  "import { motion } from 'framer-motion'; export default function Animation() {}",
  "contract DecentralizedBank { address public owner; constructor() { owner = msg.sender; } }",
  "public static void main(String[] args) { System.out.println('Hello World'); }",
  "db.collection('users').findOne({ email: 'anish@patra.dev' });"
];

function TypingGame() {
  const [sentence, setSentence] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const initTest = () => {
    setSentence(CODING_TESTS[Math.floor(Math.random() * CODING_TESTS.length)]);
    setInput("");
    setStartTime(null);
    setWpm(0);
    setIsFinished(false);
  };

  useEffect(() => {
    initTest();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!startTime) {
      setStartTime(Date.now());
    }

    setInput(val);

    if (val === sentence) {
      setIsFinished(true);
      const elapsedMinutes = (Date.now() - (startTime || Date.now())) / 60000;
      const wordCount = sentence.split(" ").length;
      setWpm(Math.round(wordCount / (elapsedMinutes || 0.01)));
      confetti({ particleCount: 80, spread: 60 });
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 font-mono">
      <div className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl space-y-3">
        <p className="text-[9px] text-zinc-500 font-bold uppercase">&gt; source_code_stream</p>
        <p className="text-xs text-zinc-300 select-all font-mono leading-relaxed select-text font-bold bg-black/40 p-2.5 rounded border border-zinc-850">
          {sentence}
        </p>
      </div>

      <div className="w-full space-y-2">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          disabled={isFinished}
          placeholder="Start typing the code segment here..."
          className="w-full px-4 py-3 bg-zinc-900/60 border border-zinc-200 dark:border-zinc-850 text-xs rounded-xl focus:border-indigo-500 outline-none text-zinc-200 placeholder-zinc-500 font-mono disabled:opacity-60"
        />
      </div>

      <div className="flex items-center justify-between w-full text-xs text-zinc-500">
        <span>Status: <strong className={isFinished ? "text-emerald-500 font-bold" : "text-zinc-400"}>{isFinished ? "COMPLED!" : "COMPILING..."}</strong></span>
        {isFinished && (
          <span>Speed: <strong className="text-indigo-400 text-sm font-bold">{wpm} WPM</strong></span>
        )}
      </div>

      <button
        onClick={initTest}
        className="flex items-center gap-1.5 px-4 py-2 bg-indigo-650 text-white font-bold rounded-lg text-xs hover:bg-indigo-600 transition-colors clickable focus:outline-none"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Next Segment</span>
      </button>
    </div>
  );
}

/* ==========================================================================
   GAME 6: REACTION TIME TEST
   ========================================================================== */
function ReactionGame() {
  const [gameState, setGameState] = useState<"idle" | "waiting" | "tap" | "success" | "early">("idle");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimestampRef = useRef<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem("reaction_best_time");
    if (saved) setBestTime(parseInt(saved, 10));
  }, []);

  const handleBoxClick = () => {
    if (gameState === "idle" || gameState === "success" || gameState === "early") {
      setGameState("waiting");
      setReactionTime(null);
      // Wait between 1.5 and 4.5 seconds
      const delay = Math.random() * 3000 + 1500;
      timerRef.current = setTimeout(() => {
        setGameState("tap");
        startTimestampRef.current = Date.now();
      }, delay);
    } else if (gameState === "waiting") {
      // Early tap error
      if (timerRef.current) clearTimeout(timerRef.current);
      setGameState("early");
    } else if (gameState === "tap") {
      // Success tap
      const diff = Date.now() - startTimestampRef.current;
      setReactionTime(diff);
      setGameState("success");
      confetti({ particleCount: 30, colors: ["#10b981"] });

      if (!bestTime || diff < bestTime) {
        setBestTime(diff);
        localStorage.setItem("reaction_best_time", diff.toString());
      }
    }
  };

  const getBoxStyle = () => {
    switch (gameState) {
      case "idle":
        return "bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer";
      case "waiting":
        return "bg-red-500/80 text-white cursor-pointer animate-pulse";
      case "tap":
        return "bg-emerald-500 text-white cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.3)]";
      case "success":
        return "bg-zinc-900 border border-zinc-800 text-zinc-300 cursor-pointer";
      case "early":
        return "bg-amber-600 hover:bg-amber-500 text-white cursor-pointer";
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 font-mono">
      <div className="flex items-center justify-between w-full text-xs text-zinc-500">
        <span>Result: <strong className="text-zinc-850 dark:text-zinc-200">{reactionTime ? `${reactionTime}ms` : "N/A"}</strong></span>
        <span>Record: <strong className="text-emerald-500">{bestTime ? `${bestTime}ms` : "N/A"}</strong></span>
      </div>

      <div
        onClick={handleBoxClick}
        className={`w-full aspect-[2/1] rounded-xl flex flex-col items-center justify-center text-center p-6 select-none transition-colors duration-200 ${getBoxStyle()}`}
      >
        <Zap className="w-8 h-8 mb-2 animate-bounce" />
        {gameState === "idle" && (
          <>
            <span className="text-sm font-bold">Start Reaction Test</span>
            <span className="text-[10px] opacity-75 mt-1">Tap this box to initiate compiler timing</span>
          </>
        )}
        {gameState === "waiting" && (
          <>
            <span className="text-sm font-bold">WAIT FOR GREEN SCREEN</span>
            <span className="text-[10px] opacity-75 mt-1">Readying threads...</span>
          </>
        )}
        {gameState === "tap" && (
          <span className="text-lg font-extrabold tracking-widest animate-ping">TAP NOW!</span>
        )}
        {gameState === "early" && (
          <>
            <span className="text-sm font-bold">TRIGGERED TOO EARLY</span>
            <span className="text-[10px] opacity-75 mt-1">Tap box to reboot thread cache</span>
          </>
        )}
        {gameState === "success" && (
          <>
            <span className="text-lg font-bold text-indigo-400">{reactionTime} ms</span>
            <span className="text-[10px] text-zinc-400 mt-1">Tap box to run timing pipeline again</span>
          </>
        )}
      </div>
    </div>
  );
}
