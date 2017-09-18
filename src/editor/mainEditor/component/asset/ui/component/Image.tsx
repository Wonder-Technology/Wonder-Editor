import * as React from "react";

interface IProps {
    src:string;
    name:string;
    selectImgToTexture:Function;
}

export default class Image extends React.Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
    }

    handleClick(e){
        this.props.selectImgToTexture(e.target);
    }

    render() {
        var {src,name} = this.props;
        return (
            <div className="asset-image" >
                <img src={src} onClick={e=>this.handleClick(e)}/>
                <span>{name}</span>
            </div>
        );
    }
}