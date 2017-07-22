import * as React from "react";
interface Props{
    onClick:Function;
    text:string;
    completed:boolean;
}

export default class Todo extends React.Component<Props,any>{
    constructor(props:Props){
        super(props);
    }

    render(){
        console.log(this.props)
        const {onClick,text,completed} = this.props;
        return(
            <li onClick = {onClick}
                style = {{
                    textDecoration:completed?"line-through":"none",
                    corsor:completed?"default":"pointer"
                }}>
                {text}
            </li>
        )
    }
}
