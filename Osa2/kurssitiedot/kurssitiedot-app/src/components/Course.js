import React from 'react'

const Course = ({ courses }) => {

    const arr = courses.map(course => {
      return (
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )
    })
  
    return (
      <div>
        {arr}
      </div>
    )
  }
  
  const Header = (props) => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    )
  }
  
  const Content = ({ parts }) => {
  
    const courseParts = parts.map(part => {
      return (
          <Part key={part.id} course={part.name} exercises={part.exercises} />
      )
    })
  
    return (
      <div>
        {courseParts}
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>{props.course} {props.exercises}</p>
      </div>
    )
  }

  const Total = ({ parts }) => {

    const total = parts.map(part => part.exercises)
      .reduce((total, num) => { return total + num })
  
    return (
      <div>
        <p>Number of excersises {total}</p>
      </div>
    )
  }

  export default Course