import * as React from "react";
import Tree from "antd/lib/tree";
import Split from "../../split/ui/Split";
import { ISceneTreeGameObject } from "../logic/interface/ISceneTree";
import { resizeCanvas } from "../../../utils/canvasUtils";
import { isDirty, markNotDirty } from "../../../utils/dirtyUtils";
import { IDirtyState } from "../../../interface/IDirtyState";
import {changeWidthBySplit} from "../../split/logic/view/SplitView";
const TreeNode = Tree.TreeNode;

interface IProps {
    changeEditorState:Function;

    getSceneTreeData: Function;
    setCurrentGameObject: Function;
    removeCurrentGameObject: Function;
    insertDragedTreeNodeToTargetTreeNode: Function;
    updateTreeNodeParent: Function;
    setSceneTreeData: Function;

    sceneTreeData: Array<ISceneTreeGameObject>;
}

export default class SceneTree extends React.Component<IProps, any>{
    constructor(props: IProps) {
        super(props);
    }

    private _style: any = {
        width: "15%"
    };

    componentWillMount() {
        markNotDirty(this);
    }

    shouldComponentUpdate(nextProps: IProps, nextState: IDirtyState) {
        if (isDirty(nextState) || this._isSceneTreeDataChange(this.props, nextProps)) {
            return true;
        }

        return false;
    }

    private _isSceneTreeDataChange(currentProps: IProps, nextProps: IProps) {
        return nextProps.sceneTreeData !== currentProps.sceneTreeData;
    }

    componentDidUpdate() {
        markNotDirty(this);
    }

    setCurrentGameObject(e: Array<string>) {
        if (e.length === 0) {
            this.props.removeCurrentGameObject();
        }
        else {
            let uid = Number(e[0]);

            this.props.setCurrentGameObject(uid);
        }

        this.props.changeEditorState();
    }

    onDrop(info: any) {
        var targetId = Number(info.node.props.eventKey),
            draggedId = Number(info.dragNode.props.eventKey),
            resultShowData: Array<ISceneTreeGameObject> = null,
            {
                insertDragedTreeNodeToTargetTreeNode,
                updateTreeNodeParent,
                setSceneTreeData,

                sceneTreeData
            } = this.props;

        resultShowData = insertDragedTreeNodeToTargetTreeNode(targetId, draggedId, sceneTreeData);

        updateTreeNodeParent(targetId, draggedId);
        setSceneTreeData(resultShowData);

        this._localRefresh();
    }

    private _localRefresh() {
        this.props.getSceneTreeData();
    }

    onDragFinish() {
        resizeCanvas();
    }

    render() {
        var { sceneTreeData } = this.props;

        const renderSceneGraph = data => data.map((item: ISceneTreeGameObject) => {
            if (this._isChildrenExist(item.children)) {
                return <TreeNode key={item.uid} uid={item.uid} title={item.name}>{renderSceneGraph(item.children)}</TreeNode>;
            }

            return <TreeNode key={item.uid} uid={item.uid} title={item.name} />;
        });

        return (
            <article className="tree-component" style={this._style}>
                <Tree
                    draggable
                    defaultExpandedKeys={["2"]}
                    defaultSelectedKeys={[]}
                    onDrop={(e) => this.onDrop(e)}
                    onSelect={(e) => this.setCurrentGameObject(e)}
                >
                    {renderSceneGraph(sceneTreeData)}
                </Tree>

                <Split position="right" minPercent={15} maxPercent={25} onDrag={width => changeWidthBySplit(this,this._style,width)} onDragFinish={this.onDragFinish} />
            </article>
        );
    }

    private _isChildrenExist = (children: Array<ISceneTreeGameObject>) => {
        return children !== void 0 && children.length !== 0;
    }
}
