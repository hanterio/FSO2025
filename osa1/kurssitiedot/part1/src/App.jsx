const Header = (props) => {
  return (
    <div>
      <h1>{props.nimi}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part osannimi={props.osat[0].name} tehtavat={props.osat[0].exercises} />
      <Part osannimi={props.osat[1].name} tehtavat={props.osat[1].exercises}/>
      <Part osannimi={props.osat[2].name} tehtavat={props.osat[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises {props.yhteensa}
      </p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.osannimi} {props.tehtavat}
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 },
  ]

  return (
    <div>
      <Header nimi={course}/>
      <Content osat={parts}/>
      <Total yhteensa={parts[0].exercises + parts[1].exercises + parts[2].exercises}/>
    </div>
  )
}

export default App