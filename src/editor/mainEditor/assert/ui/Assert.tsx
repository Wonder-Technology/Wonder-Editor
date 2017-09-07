import * as React from "react";
import { Promise } from "rsvp/dist/rsvp.js";
import {fromArray, fromPromise} from "wonder-frp/dist/es2015/global/Operator";

interface IProps {
}

export default class Assert extends React.Component<IProps, any>{
    constructor(props: IProps) {
        super(props);
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
            console.log(streamArr);

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
            }).subscribe(res => {
                console.log(res)
                //todo execute add action add in store
            },err=>{
                console.log(err)
            })
        }

    }

    render() {
        return (
            <div className="assert-component" >
                <input type="file" className="assert-fileLoad" onChange={(e)=>this.fileLoad(e)} multiple/>
            </div>
        );
    }
}