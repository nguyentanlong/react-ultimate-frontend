const TodoData = (props) => {
    const { todoList, deleteTodo1 } = props;
    const clickHandler = (thamsoId) => {
        deleteTodo1(thamsoId);
    }
    return (
        <div className='todo-data'>
            {todoList.map((item, index) => {
                return (
                    <div className={`todo-item`} key={item.id}>
                        <div> {item.name1}</div>
                        <button
                            onClick={() => clickHandler(item.id)}
                            style={{ cursor: "pointer" }}
                        >Delete</button>
                    </div>
                )
            })}
        </div>
    )
}

export default TodoData;
