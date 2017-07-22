import * as React from "react";
interface CounterProps{
    onAddClick:Function;
}

export default class AddTodo extends React.Component<CounterProps,any>{
    constructor(props:CounterProps){
        super(props);
    }

    render(){
        return(
            <div>
                <input type="text" ref="input"/>
                <button onClick={(e)=>this.handleClick(e)}>Add</button>
            </div>
        )
    }

    handleClick(e){
        const {onAddClick} = this.props;
        //noinspection TypeScriptUnresolvedVariable
        const node = this.refs.input;
        const text = node.value.trim();

        onAddClick(text);
        node.value = '';
    }
}
