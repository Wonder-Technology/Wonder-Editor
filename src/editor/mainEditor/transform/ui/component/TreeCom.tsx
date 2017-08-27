import * as React from "react";
import Tree from 'antd/lib/tree';
const TreeNode = Tree.TreeNode;

const x = 3;
const y = 2;
const z = 1;
const gData = [];

const generateData = (_level?:any, _preKey?:any, _tns?:any) => {
    const preKey = _preKey || '0';
    const tns = _tns || gData;

    const children = [];
    for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`;
        tns.push({ title: key, key });
        if (i < y) {
            children.push(key);
        }
    }
    if (_level < 0) {
        return tns;
    }
    const level = _level - 1;
    children.forEach((key, index) => {
        tns[index].children = [];
        return generateData(level, key, tns[index].children);
    });
};
generateData(z);

interface IProps{
}

export default class TreeCom extends React.Component<IProps,any>{
    constructor(props:IProps){
        super(props);
    }
    private _state = {
            gData:gData,
            expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],
        };

    onDragEnter(info) {

        // console.log(info);
        // expandedKeys 需要受控时设置
        // this.setState({
        //   expandedKeys: info.expandedKeys,
        // });
    }
    onDrop(info,state) {
        console.log(info)
        const dropKey = info.node.props.eventKey;
        const dragKey = info.dragNode.props.eventKey;
        // const dragNodesKeys = info.dragNodesKeys;
        const loop = (data, key, callback) => {
            data.forEach((item, index, arr) => {
                if (item.key === key) {
                    return callback(item, index, arr);
                }
                if (item.children) {
                    return loop(item.children, key, callback);
                }
            });
        };
        const data = [...this._state.gData];
        let dragObj;
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });
        if (info.dropToGap) {
            let ar;
            let i;
            loop(data, dropKey, (item, index, arr) => {
                ar = arr;
                i = index;
            });
            ar.splice(i, 0, dragObj);
        } else {
            loop(data, dropKey, (item) => {
                item.children = item.children || [];
                // where to insert 示例添加到尾部，可以是随意位置
                item.children.push(dragObj);
            });
        }
        this.setState({
            gData: data,
        });
        this._state.gData = data;
    }

    render() {
        console.log(this._state)
        const loop = data => data.map((item) => {
            if (item.children && item.children.length) {
                return <TreeNode key={item.key} title={item.key}>{loop(item.children)}</TreeNode>;
            }
            return <TreeNode key={item.key} title={item.key} />;
        });
        return (

            // defaultExpandedKeys={this._state.expandedKeys}
            <Tree
                draggable
                onDragEnter={this.onDragEnter}
                onDrop={(e)=>this.onDrop(e,this._state)}
            >
                {loop(this._state.gData)}
            </Tree>
        );
    }
}
