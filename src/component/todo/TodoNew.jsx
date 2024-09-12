import { useState } from "react";

const TodoNew = (props) => {

    //useState hook (getter/setter)
    // const valueInput = "eric";
    const [valueInput, setValueInput] = useState("trường phưỡng")

    const { addNewTodo } = props;

    // addNewTodo("eric") //fire
    const handleClick = () => {
        addNewTodo(valueInput);
        setValueInput("");
    }

    const handleOnChange = (name1) => {
        setValueInput(name1)
    }
    return (
        <div className='todo-new'>
            <input
                type="text"
                onChange={(event) => handleOnChange(event.target.value)}
                value={valueInput}
            />
            <button
                style={{ cursor: "pointer" }}
                onClick={handleClick}
            >Add</button>
            <div>
                My text input is = {valueInput}
            </div>
        </div>
    )
}

export default TodoNew;
