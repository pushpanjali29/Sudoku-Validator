import React, { useState } from "react";
import "./App.css";

function App() {

  const emptyBoard = Array(9).fill("").map(() => Array(9).fill(""));

  const [board, setBoard] = useState(emptyBoard);
  const [message, setMessage] = useState("");

  const handleChange = (row, col, value) => {
    if (value === "" || /^[1-9]$/.test(value)) {
      const newBoard = [...board];
      newBoard[row][col] = value;
      setBoard(newBoard);
    }
  };

  const validateSudoku = () => {

    const rows = new Set();
    const cols = new Set();
    const boxes = new Set();

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {

        let val = board[r][c];
        if (val === "") continue;

        let rowKey = `row-${r}-${val}`;
        let colKey = `col-${c}-${val}`;
        let boxKey = `box-${Math.floor(r / 3)}-${Math.floor(c / 3)}-${val}`;

        if (rows.has(rowKey) || cols.has(colKey) || boxes.has(boxKey)) {
          setMessage("❌ Invalid Sudoku! Conflicts found.");
          return;
        }

        rows.add(rowKey);
        cols.add(colKey);
        boxes.add(boxKey);
      }
    }

    setMessage("✅ Sudoku is valid so far!");
  };

  const clearBoard = () => {
    setBoard(emptyBoard);
    setMessage("");
  };

  return (
    <div className="container">

      <h1>Sudoku Validator</h1>

      <p>Enter numbers 1-9 and validate the board.</p>

      <div className="board">
        {board.map((row, r) =>
          row.map((cell, c) => (
            <input
              key={`${r}-${c}`}
              className="cell"
              value={cell}
              maxLength="1"
              onChange={(e) => handleChange(r, c, e.target.value)}
            />
          ))
        )}
      </div>

      <div className="buttons">
        <button onClick={validateSudoku}>Validate</button>
        <button onClick={clearBoard}>Clear</button>
      </div>

      <p>{message}</p>

    </div>
  );
}

export default App;