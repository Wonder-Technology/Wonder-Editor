import * as React from "react";
import Tree from 'antd/lib/tree';
import Split from "../../ui/component/Split";
import { ISceneTreeGameObject } from "../logic/interface/ISceneTree";
import {
    dragTreeNode, resetTreeNodeParent,
    setSceneTreeData
} from "../logic/view/SceneTreeView";
import { setCurrentGameObject as setCurrentGameObjectView } from "../../logic/view/SceneView";
import { resizeCanvas } from "../../ui/utils/canvasUtils";
const TreeNode = Tree.TreeNode;

interface IProps {
    getSceneData: Function;
    sceneTree: Array<ISceneTreeGameObject>;
}

export default class SceneTree extends React.Component<IProps, any>{
    constructor(props: IProps) {
        super(props);
    }

    private _sceneGraphData: Array<ISceneTreeGameObject> = [];
    private _style: any = {
        width: "15%"
    };

    componentWillMount(){
        this.setState({change:false});
    }

    shouldComponentUpdate(nextProps,nextState){
        if(nextState.change && nextState.change === true){
            return true;
        }
        return nextProps.sceneTree !== this.props.sceneTree;
    }

    componentDidUpdate(){
        this.setState({change:false});
    }

    setCurrentGameObject(e) {
        var uid = Number(e[0]);
        setCurrentGameObjectView(uid);
    }

    onDrop(info) {
        var targetId = Number(info.node.props.eventKey),
            draggedId = Number(info.dragNode.props.eventKey),
            data = null;

        data = dragTreeNode(targetId,draggedId,this._sceneGraphData);

        resetTreeNodeParent(targetId,draggedId);
        setSceneTreeData(data);
        this.props.getSceneData();
    }

    onDragFinish() {
        resizeCanvas();
    }

    changeWidth(width) {
        this._style.width = width.toFixed(2) + "%";

        this.setState({change:true});
    }

    render() {
        var { sceneTree } = this.props;

        if (sceneTree) {
            this._sceneGraphData = sceneTree;
        }

        const renderSceneGraph = data => data.map((item) => {
            if (item.children && item.children.length) {
                return <TreeNode key={item.uid} uid={item.uid} title={item.name}>{renderSceneGraph(item.children)}</TreeNode>;
            }
            return <TreeNode key={item.uid} uid={item.uid} title={item.name} />;
        });

        return (
            <div className="tree-component" style={this._style}>
                <Tree
                    draggable
                    defaultExpandedKeys={["2"]}
                    onDrop={(e) => this.onDrop(e)}
                    onSelect={(e) => this.setCurrentGameObject(e)}
                >
                    {renderSceneGraph(this._sceneGraphData)}
                </Tree>
                <Split position="right" min={15} max={25} onDrag={width => this.changeWidth(width)} onDragFinish={this.onDragFinish} />
            </div>
        );
    }
}