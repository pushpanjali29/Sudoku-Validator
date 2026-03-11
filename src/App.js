import React, { useState } from "react";
import "./App.css";

const initialBoard = [
[5,3,4,6,7,8,9,1,2],
[6,7,2,1,9,5,3,4,8],
[1,9,8,3,4,2,5,6,7],
[8,5,9,7,6,1,4,2,3],
[4,2,6,8,5,3,7,9,1],
[7,1,3,9,2,4,8,5,6],
[9,6,1,5,3,7,2,8,4],
[2,8,7,4,1,9,6,3,5],
[3,4,5,2,8,6,1,7,9]
];

export default function App(){

const [board,setBoard] = useState(initialBoard);
const [message,setMessage] = useState("");

const handleChange = (row,col,value)=>{

const newBoard=[...board];
newBoard[row][col]= value === "" ? "" : Number(value);

setBoard(newBoard);
};

const isValid = ()=>{

const rows = new Set();
const cols = new Set();
const boxes = new Set();

for(let r=0;r<9;r++){
for(let c=0;c<9;c++){

let val = board[r][c];
if(val==="") continue;

let rowKey=`row${r}-${val}`;
let colKey=`col${c}-${val}`;
let boxKey=`box${Math.floor(r/3)}${Math.floor(c/3)}-${val}`;

if(rows.has(rowKey) || cols.has(colKey) || boxes.has(boxKey)){
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

const clearBoard=()=>{
setBoard(Array(9).fill().map(()=>Array(9).fill("")));
setMessage("");
};

return(

<div className="container">

<h1>Sudoku Validator</h1>

<p>Enter numbers 1–9 and validate the board.</p>

<div className="board">

{board.map((row,r)=>

row.map((cell,c)=>(

<input
key={`${r}-${c}`}
className="cell"
type="text"
value={cell}
maxLength="1"
onChange={(e)=>handleChange(r,c,e.target.value)}
/>

))
)}

</div>

<div className="buttons">

<button className="validate" onClick={isValid}>
Validate
</button>

<button className="clear" onClick={clearBoard}>
Clear
</button>

</div>

<p className="message">{message}</p>

</div>

);
}