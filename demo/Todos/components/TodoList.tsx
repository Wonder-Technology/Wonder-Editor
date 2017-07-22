import * as React from "react";
import {todoType} from "../reducers/reducer";
import Todo from "./Todo";
interface Props{
    onTodoClick:Function;
    todos:todoType[]
}

export default class TodoList extends React.Component<Props,any>{
    constructor(props:Props){
        super(props);
    }

    render(){
        const {todos,onTodoClick} = this.props;

        const todoList = todos == void 0?[]:todos;

        return(
            <ul>
                {
                    todoList.map((todo,index)=> {
                        return <Todo {...todo} key={index} onClick={()=>onTodoClick(index)}></Todo>
                    })
                }
            </ul>
        )
    }
}
