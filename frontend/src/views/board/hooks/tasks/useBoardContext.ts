import React from "react";
import { BoardContext } from "../../context/Board/Board.context";

export const useBoardContext = () => {
  const context = React.useContext(BoardContext);
  if (!context) {
    throw new Error("useBoardContext must be used within a BoardProvider");
  }
  return context;
}
