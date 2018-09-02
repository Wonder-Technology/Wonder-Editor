open AssetNodeType;

let component = ReasonReact.statelessComponent("MainEditorAsset");

let render = ((store, dispatchFunc), isShowComponent, _self) => {
  let dragImg = DomHelper.createElement("img");

  isShowComponent ?
    <article key="asset" className="wonder-asset-component">
      <div className="asset-tree">
        <MainEditorAssetHeader store dispatchFunc />
        <MainEditorAssetTree store dispatchFunc dragImg />
      </div>
      <MainEditorAssetChildrenNode
        store
        dispatchFunc
        dragImg
        debounceTime=200
      />
    </article> :
    ReasonReact.null;
};

let make = (~store, ~dispatchFunc, ~isShowComponent, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), isShowComponent, self),
};