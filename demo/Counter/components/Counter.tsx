import * as React from "react";
interface CounterProps{
    countNumber:number;
    name:string;
    age:number;
}

export default class Counter extends React.Component<CounterProps,any>{
    constructor(props:CounterProps){
        super(props);
    }

    render(){
        const {countNumber,name,age,changeCount,undo,redo} = this.props;
        console.log(this.props)
        return(
            <div>
                <p>
                    <label>fck Counter: </label>
                    <b>#{countNumber}</b>
                    <b>#{name}</b>
                    <b>#{age}</b>
                </p>
                <button onClick={()=>changeCount(1)}>INCREMENT</button>
                <span style={{ padding: "0 5px" }} />
                <button onClick={()=>changeCount(-1)}>DECREMENT</button>

                <button onClick={undo}>Undo</button>
                <span> </span>
                <button onClick={redo}>Redo</button>
            </div>
        )
    }
}
