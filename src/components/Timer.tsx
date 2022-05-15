import React, { FC } from 'react'
import { Colors } from '../models/Colors';
import { Player } from '../models/Player'

interface TimerProps {
    currentPlayer: Player | null
    restart: () => void;
    setCurrentPlayer: (player: Player) => void;
    whitePlayer: Player
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart, setCurrentPlayer, whitePlayer }) => {
    const [whiteTime, setWhiteTime] = React.useState(300)
    const [blackTime, setBlackTime] = React.useState(300)
    const timer = React.useRef<null | ReturnType<typeof setInterval>>(null)

    React.useEffect(() => {
        startTimer()
    }, [currentPlayer])

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => prev - 1)
    }

    function decrementBlackTimer() {
        setBlackTime(prev => prev - 1)
    }

    function handleRestart() {
        setWhiteTime(300)
        setBlackTime(300)
        setCurrentPlayer(whitePlayer)
        restart()
    }

    return (
        <div>
            <div><button onClick={handleRestart}>Restart game</button></div>
            <h2>Черные - {blackTime}</h2>
            <h2>Белые - {whiteTime}</h2>
        </div>
    )
}

export default Timer