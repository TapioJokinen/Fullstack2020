import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>Anectode of the day</h1>
      <p>{props.anecdote}</p>
      <p>has {props.voteCount} votes</p>
    </div>
  )
}

const MostVotes = (props) => {
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdote}</p>
      <p>has {props.voteCount} votes</p>
    </div>
  )
}

const Button = (props) => {
  return (
    <div>
      <button onClick={props.handleClick}>
        {props.text}
      </button>
    </div>
  )
}

const App = (props) => {


  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])
  const [bestAnecdote, setBestAnecdote] = useState(0)

  const handleClickNext = () => {
    let rand = 0
    while (true) {
      rand = Math.floor(Math.random() * 6);
      if (rand !== selected) {
        break
      }
    }
    setSelected(rand)
  }

  const handleClickVote = () => {
    const temp = [...votes]
    temp[selected] += 1
    setVotes(temp)

    let maxVal = Math.max(...temp)
    for (let i = 0; i < temp.length; i++) {
      if (temp[i] === maxVal) {
        setBestAnecdote(i)
      }
    }
  }

  return (
    <div>
      <Header anecdote={anecdotes[selected]} voteCount={votes[selected]} />
      <Button text="vote" handleClick={handleClickVote} />
      <Button text="next anecdote" handleClick={handleClickNext} />
      <MostVotes anecdote={anecdotes[bestAnecdote]} voteCount={votes[bestAnecdote]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)