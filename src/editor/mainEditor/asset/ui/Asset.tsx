import * as React from "react";
import { Promise } from "rsvp/dist/rsvp.js";
import {fromArray, fromPromise} from "wonder-frp/dist/es2015/global/Operator";
import Image from "./component/Image";
import Modal from 'antd/lib/modal';

interface IProps {
    getImageFile:Function;
    assetFiles:any;
}

export default class Asset extends React.Component<IProps, any>{
    constructor(props: IProps) {
        super(props);
    }

    private _isShowImg:boolean = false;

    componentWillMount(){
        this.setState({change:false});
    }

    shouldComponentUpdate(nextProps,nextState){
        if(nextState.change && nextState.change === true){
            return true;
        }
        return nextProps.assetFiles !== this.props.assetFiles;
    }

    componentDidUpdate(){
        this.setState({change:false});
    }

    fileLoad(e){
        e.preventDefault();

        var files = e.target.files,
            result = [],
            streamArr = [];

        if(files.length > 0){
            for (var i = 0, file; file = files[i]; i++) {
                streamArr.push(file);
            }

            fromArray(streamArr).flatMap(file => {
                return fromPromise(new Promise((resolve,reject) =>{
                    var reader = new FileReader();

                    reader.onload = function () {
                        result.push({
                            name:file.name,
                            content:this.result
                        });

                        resolve(result);
                    };
                    reader.readAsDataURL(file);
                }));
            }).takeLast().subscribe(res => {
                this.props.getImageFile(res);
            })
        }
    }

    selectImg(img){
        console.log(img)
    }

    showImage(){
        this._isShowImg = !this._isShowImg;
        this.setState({change:true});
    }

    handleOk(e){
        this._isShowImg = false;
        this.setState({change:true});
    }

    handleCancel(e){
        this._isShowImg = false;
        this.setState({change:true});
    }
    render() {
        var imgFiles = this.props.assetFiles.images || [];
        
        const renderImages = data => data.map((item,index) => {
            return <Image src={item.content} name={item.name} selectImgToTexture={this.selectImg} key={index}/>
        });
        
        return (
            <div className="asset-component" >
                <input type="file" className="asset-fileLoad" onChange={(e)=>this.fileLoad(e)} multiple/>
                <button onClick={() => this.showImage()}>getImage</button>
                {renderImages(imgFiles)}

                <Modal
                    title="Basic Modal"
                    visible={this._isShowImg}
                    onOk={(e)=>this.handleOk(e)}
                    onCancel={(e) =>this.handleCancel(e)}
                >
                    {renderImages(imgFiles).length == 0?"暂无图片":renderImages(imgFiles)}
                </Modal>
            </div>
        );
    }
}