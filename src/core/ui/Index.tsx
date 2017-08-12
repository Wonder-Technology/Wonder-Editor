import * as React from "react";
import {main} from "../logic/Main";
interface Props{
}

export default class Index extends React.Component<Props,any>{
    constructor(props:Props){
        super(props);
    }
    componentDidMount(){
        main()
    }
    render(){
        return(
            <div id="parent">
            </div>
        )
    }
}
