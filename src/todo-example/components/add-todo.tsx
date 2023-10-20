import { useState } from "react"
import { add } from "../store"
import { useAppDispatch } from "../../stores"

export function AddToDo() {

    const [todo, setTodo] = useState<string>()
    const dispatch = useAppDispatch()
    
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        dispatch(add(todo))
        setTodo("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="todo" 
                id="todo"
                value={todo} 
                onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit">add todo</button>
        </form>
    )
}