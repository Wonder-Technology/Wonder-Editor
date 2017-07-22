import * as React from "react";
interface HeadProps{
    head:string;
}
export default class Head extends React.Component<HeadProps,any>{
    constructor(props:HeadProps){
        super(props);
    }
    render(){
        return(
            <header className = "head">{this.props.head}</header>
        )
    }
}