import * as React from "react";
import Tree from 'antd/lib/tree';
import Split from "../../ui/tool/Split";
import {getTempSceneData} from "../logic/view/SceneTreeView";
const TreeNode = Tree.TreeNode;

interface IProps{
}

export default class SceneTree extends React.Component<IProps,any>{
    constructor(props:IProps){
        super(props);
    }

    private _sceneGraphData:any = [];

    private _style:any = {
        width:"200px"
    };

    componentWillMount(){
        this._sceneGraphData = getTempSceneData();
    }

    onDrop(info,state) {
        console.log(info)

        var targetId = Number(info.node.props.eventKey),
            movedId = Number(info.dragNode.props.eventKey),
            data = [...this._sceneGraphData],
            dragObj = null;

        const ergodicSceneGraph = (data, id, callback) => {
            data.forEach((item, index, arr) => {
                if (item.id === id) {
                    return callback(item, index, arr);
                }
                if (item.children) {
                    return ergodicSceneGraph(item.children, id, callback);
                }
            });
        };
        const removeFromParent = (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        };
        const insertToTarget = (item, index, arr) => {
            item.children = item.children || [];
            item.children.push(dragObj);
        };

        ergodicSceneGraph(data, movedId, removeFromParent);
        ergodicSceneGraph(data, targetId,insertToTarget);

        this._sceneGraphData = data;
        this.setState({});
    }

    changeWidth(width){
        this._style.width = width + "px";

        //todo need calculate canvas-parent's width and height
        // setViewport(0,0,);
        this.setState({});
    }

    render() {
        console.log(2)

        const renderSceneGraph = data => data.map((item) => {
            if (item.children && item.children.length) {
                return <TreeNode key={item.id} id={item.id} title={item.name}>{renderSceneGraph(item.children)}</TreeNode>;
            }
            return <TreeNode key={item.id} id={item.id} title={item.name} />;
        });


        return (
            <div className="treeNode" style={this._style}>
                <Tree
                    draggable
                    onDrop={(e)=>this.onDrop(e,this._sceneGraphData)}
                    onSelect={(e)=>console.log(e)}
                >
                    {renderSceneGraph(this._sceneGraphData)}
                </Tree>
                <Split position="right" dragSplit={width => this.changeWidth(width)}/>
            </div>
        );
    }
}

