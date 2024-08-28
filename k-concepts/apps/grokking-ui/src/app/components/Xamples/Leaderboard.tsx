import React, { ReactEventHandler } from "react";

const Leaderboard = () => {
    const [score, setScore] = React.useState(0);
    const [playerName, setPlayerName] = React.useState('')
    // write a function to increment score by 1
    const incrementScore = () => {
        setScore(score + 1)
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerName(event.target.value)
    }
    return (
        // align div to center of page
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', border: '1px solid black' }}>
            <div style={{ border: '1px solid black', padding: '20px' }}>
                <h1 style={{ border: '1px solid black', padding: '10px' }}>Leaderboard</h1>
                <form style={{ border: '1px solid black', padding: '10px' }}>
                    <label style={{ border: '1px solid black', padding: '5px' }}>
                        Player Name:
                    </label>
                    <input type="text" name="playerName" value={playerName} onChange={handleInputChange} style={{ border: '1px solid black', padding: '5px' }} /><br />
                    <input type="submit" value="Submit" style={{ border: '1px solid black', padding: '5px', marginTop: '10px' }} />
                </form>
                <h2 style={{ border: '1px solid black', padding: '10px' }}>Score: {score}</h2><br/> <br />
                <button onClick={incrementScore} style={{ border: '1px solid black', padding: '5px' }}>Increment Score</button>
            </div>
        </div>
    )
}

export default Leaderboard;