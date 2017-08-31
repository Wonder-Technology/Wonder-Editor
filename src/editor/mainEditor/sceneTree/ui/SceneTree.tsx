import * as React from "react";
import Tree from 'antd/lib/tree';
import Split from "../../ui/components/Split";
import {getSceneTreeData, getTempSceneData} from "../logic/view/SceneTreeView";
import {ISceneTreeGameObject} from "../logic/interface/ISceneTree";
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

    componentDidMount(){
        //todo need update to action
        setTimeout(()=>{
            this._sceneGraphData = getTempSceneData();
            this.setState({});
        },1000);
    }

    // init(){
    //     this._sceneGraphData = getSceneTreeData();
    //     this.setState({});
    //     console.log(this._sceneGraphData);
    // }

    onDrop(info) {
        var targetId = Number(info.node.props.eventKey),
            movedId = Number(info.dragNode.props.eventKey),
            data = [...this._sceneGraphData],
            dragObj = null;

        const iterateSceneGraph = (data:Array<ISceneTreeGameObject>, uid:number, callback:Function) => {
            data.forEach((item, index, arr) => {
                if (item.uid === uid) {
                    return callback(item, index, arr);
                }
                if (item.children) {
                    return iterateSceneGraph(item.children, uid, callback);
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

        //todo only change editorState, then get new show scene graph data from it, then update ui->_sceneGrphData by it

        iterateSceneGraph(data, movedId, removeFromParent);
        iterateSceneGraph(data, targetId,insertToTarget);

        this._sceneGraphData = data;

        this.setState({});
    }

    onDragFinish(){
        //todo need calculate canvas-parent's width and height
        // setViewport(0,0,);
    }

    changeWidth(width){
        this._style.width = width + "px";

        this.setState({});
    }

    render() {
        const renderSceneGraph = data => data.map((item) => {
            if (item.children && item.children.length) {
                return <TreeNode key={item.uid} uid={item.uid} title={item.name}>{renderSceneGraph(item.children)}</TreeNode>;
            }
            return <TreeNode key={item.uid} uid={item.uid} title={item.name} />;
        });


        return (
            <div className="treeNode" style={this._style}>
                <Tree
                    draggable
                    onDrop={(e)=>this.onDrop(e)}
                    onSelect={(e)=>console.log(e)}
                >
                    {renderSceneGraph(this._sceneGraphData)}
                </Tree>
                <Split position="right" onDrag={width => this.changeWidth(width)} onDragFinish={this.onDragFinish}/>
            </div>
        );
    }
}
