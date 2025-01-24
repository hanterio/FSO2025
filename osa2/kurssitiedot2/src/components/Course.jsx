import Content from './Content'
import Header from './Header'
  
const Total = (props) => {
    return <p>Number of exercises {props.sumOfExercises}</p>
  }
  
const Course = (props) => {
    return (
        <div>
            <Header course={props.course.name} />
            <Content parts={props.course.parts} />
        </div>
    )
}

export default Course