import * as React from "react";
import Tree from 'antd/lib/tree';
import Split from "../../ui/components/Split";
import {ISceneTreeGameObject} from "../logic/interface/ISceneTree";
import {setSceneTreeData} from "../logic/view/SceneTreeView";
const TreeNode = Tree.TreeNode;

interface IProps{
    getSceneData:Function;
    sceneTree:Array<ISceneTreeGameObject>;
}

export default class SceneTree extends React.Component<IProps,any>{
    constructor(props:IProps){
        super(props);
    }

    private _sceneGraphData:Array<ISceneTreeGameObject> = [];
    private _style:any = {
        width:"200px"
    };

    componentDidMount(){
        this.props.getSceneData();
    }

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

        setSceneTreeData(data)
        this.props.getSceneData();
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
        var {sceneTree} = this.props;

        if(sceneTree){
            this._sceneGraphData = sceneTree;
        }

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
