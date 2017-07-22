import * as React from "react";
interface CounterProps{
    onFilterChange:Function;
    filter:string;
}

export default class Footer extends React.Component<CounterProps,any>{
    constructor(props:CounterProps){
        super(props);
    }

    renderFilter(filter,name){
        if(filter == this.props.filter){
            return name;
        }

        return (
            <a href="#" onClick={e=>{
                e.preventDefault();
                this.props.onFilterChange(filter);
            }}>{name}</a>
        )
    }

    render(){
        return (
            <p>
                Show :
                {' '}
                {this.renderFilter("SHOW_ALL","ALL")}
                {" , "}
                {this.renderFilter("SHOW_COMPLETE","Completed")}
                {" , "}
                {this.renderFilter('SHOW_ACTIVE',"Active")}
            </p>
        )
    }
}
