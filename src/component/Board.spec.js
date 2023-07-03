import React from "react";
import Square from "./Board";
import { fireEvent, render, screen } from "@testing-library/react";
import Board from "./Board";

describe("Display Board",()=>{
    it("should be enable",()=>{
        render(<Square/>);
        const buttons = screen.getAllByRole("button");

        buttons.forEach((button)=>{
            expect(button).not.toBeDisabled();
        })
        
    });
    it("square should be 9",()=>{
        render(<Board/>)
        const squares = screen.getAllByRole("button");
        expect(squares.length).toBe(9);
    });
});

describe("Value in the square should change when clicked", () => {
    test("when clicked first should change to X", () => {
      render(<Square />);
      const buttons = screen.getAllByRole("button")
        fireEvent.click(buttons[0]);
        fireEvent.click(buttons[1]);
    
      expect(buttons[0].textContent).toBe("X");
    });
    test("when clicked second should change to O", () => {
        render(<Square />);
        const buttons = screen.getAllByRole("button")
        fireEvent.click(buttons[0]);
        fireEvent.click(buttons[1]);
        expect(buttons[1].textContent).toBe("O");
      });
  });

  describe("Checking for Winner",()=>{
    test("Player X wins in horizontal top row",()=>{
        render(<Board/>);
        const buttons = screen.getAllByRole("button")
        fireEvent.click(buttons[0]);// Player X
        fireEvent.click(buttons[6]);// Player O
        fireEvent.click(buttons[1]);// Player X
        fireEvent.click(buttons[7]);// Player O
        fireEvent.click(buttons[2]);// Player X

        const winner = screen.getByTestId("winner")
        expect(winner.innerHTML).toEqual("Winner: X");
    });
    test("Player Y wins in vertical right most colomn",()=>{
        render(<Board/>);
        const buttons = screen.getAllByRole("button")
        fireEvent.click(buttons[1]);// Player X
        fireEvent.click(buttons[0]);// Player O
        fireEvent.click(buttons[7]);// Player X
        fireEvent.click(buttons[3]);// Player O
        fireEvent.click(buttons[5]);// Player X
        fireEvent.click(buttons[6]);// Player O

        const winner = screen.getByTestId("winner")
        expect(winner.innerHTML).toEqual("Winner: O");
    });
    test("Player X wins in Diagonal",()=>{
        render(<Board/>);
        const buttons = screen.getAllByRole("button")
        fireEvent.click(buttons[0]);// Player X
        fireEvent.click(buttons[1]);// Player O
        fireEvent.click(buttons[4]);// Player X
        fireEvent.click(buttons[2]);// Player O
        fireEvent.click(buttons[8]);// Player X

        const winner = screen.getByTestId("winner")
        expect(winner.innerHTML).toEqual("Winner: X");
    });
  });