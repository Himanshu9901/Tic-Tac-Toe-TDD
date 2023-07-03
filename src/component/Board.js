import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";

function calculateWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for(let i =0 ; i<lines.length; i++){
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
            return squares[a];
        }
    }
}

export default function Board(){
    const [isXNext,setisXNext] = useState(true);
    const [squares,setSquares] = useState(Array(9).fill(null));

    const winner = calculateWinner(squares);
    let status;
    if(winner){
        status ="Winner: "+winner;
    }
    else{
        status ="Next Player: "+(isXNext?"X":"O");
    }
    function handleClick(i){
        const copyOfSquares = squares.slice();
        if(squares[i] || calculateWinner(squares)){
            return;
        }
        if(isXNext){
            copyOfSquares[i]="X";
        }
        else{
            copyOfSquares[i]="O";
        }
        setSquares(copyOfSquares);
        setisXNext(!isXNext);
    }
    return(
        <>
        <div data-testid ="winner">{status}</div>
        <div className="board-row">
            <Square value = {squares[0]} onSquareClick={()=>handleClick(0)} testid="square0"/>
            <Square value = {squares[1]} onSquareClick={()=>handleClick(1)} testid="square1"/>
            <Square value = {squares[2]} onSquareClick={()=>handleClick(2)} testid="square2"/>
        </div>
        <div className="board-row">
            <Square value = {squares[3]} onSquareClick={()=>handleClick(3)} testid="square3"/>
            <Square value = {squares[4]} onSquareClick={()=>handleClick(4)} testid="square4"/>
            <Square value = {squares[5]} onSquareClick={()=>handleClick(5)} testid="square5"/>
        </div>
        <div className="board-row">
            <Square value = {squares[6]} onSquareClick={()=>handleClick(6)} testid="square6"/>
            <Square value = {squares[7]} onSquareClick={()=>handleClick(7)} testid="square7"/>
            <Square value = {squares[8]} onSquareClick={()=>handleClick(8)} testid="square8"/>
        </div>
        </>
    )
}

function Square({value,onSquareClick,testid}){
    return(
        <button data-testid={testid} className="square" onClick={onSquareClick}>{value}</button>
    );
}