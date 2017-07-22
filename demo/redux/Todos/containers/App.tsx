import * as React from "react";
import {connect} from "react-redux";
import * as CountAction from "../action/Action";
import {bindActionCreators} from "redux";
import {todoType} from "../reducers/reducer";
import AddTodo from "../components/AddTodo";
import Footer from "../components/Footer";
import TodoList from "../components/TodoList";


class App extends React.Component<any,any>{
    render(){
        const {dispatch,visibleTodos,visibleFilter} = this.props;
        const boundAction = bindActionCreators(CountAction,dispatch);

        console.log(visibleFilter)
        console.log(visibleTodos)
        return (
            <div>
                <AddTodo onAddClick = {boundAction.add}></AddTodo>
                <Footer filter = {visibleFilter} onFilterChange = {boundAction.filter}></Footer>
                <TodoList todos = {visibleTodos} onTodoClick = {boundAction.complete}></TodoList>
            </div>
        )
    }
}

function selectTodos(todos:todoType[],filter){
    switch (filter){
        case CountAction.visibilyFilter.SHOW_ALL:return todos;
        case CountAction.visibilyFilter.SHOW_COMPLETE:return todos.filter(todo=>todo.completed);
        case CountAction.visibilyFilter.SHOW_ACTIVE:return todos.filter(todo=>!todo.completed);
    }
}

const mapStateToProps = (state:any)=>{
    return {
        visibleTodos:selectTodos(state.todos,state.visFilter),
        visibleFilter:state.visFilter
    }
}

export default connect(mapStateToProps)(App);
