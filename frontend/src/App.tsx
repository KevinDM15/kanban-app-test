import { Board } from "./views/board/Board"
import { BoardProvider } from "./views/board/context/Board/Board.provider"

function App() {
  return (
    <div className="min-h-screen bg-white flex overflow-auto">
      <BoardProvider>
        <Board />
      </BoardProvider>
    </div>
  )
}

export default App
