import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Feedback = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}

const Button = (props) => {
  return (
    <div>
      <button onClick={props.handleClick}>{props.text}</button>
    </div>
  )
}

const Statistics = (props) => {
  const { good_count, neutral_count, bad_count, title } = props
  const all = good_count + neutral_count + bad_count
  const average = (good_count * 1 + bad_count * -1) / all
  const positive = (good_count / all) * 100

  if (all === 0) {
    return (
      <div>
        <h1>{title}</h1>
        <p>No feedback given.</p>
      </div>
    )
  }

  return (
    <div>
      <h1>{title}</h1>
      <table>
        <StatisticLine text="good" value={good_count} />
        <StatisticLine text="neutral" value={neutral_count} />
        <StatisticLine text="bad" value={bad_count} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <tbody>
      <tr>
        <td style={{margin:"5px"}}>{props.text}</td>
        <td style={{margin:"5px"}}>{props.value}</td>
      </tr>
    </tbody>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback title="give feedback" />
      <Button handleClick={() => { setGood(good + 1) }} text="good" />
      <Button handleClick={() => { setNeutral(neutral + 1) }} text="neutral" />
      <Button handleClick={() => { setBad(bad + 1) }} text="bad" />
      <Statistics title="Statistics" good_count={good} neutral_count={neutral} bad_count={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)