const Total = (props) => {
    const totalExercises = props.parts.reduce((summa, x) => summa + x.exercises, 0) 
    return (
        <div>
            <b>Total of {totalExercises} exercises</b>
        </div>
    )
  }

export default Total