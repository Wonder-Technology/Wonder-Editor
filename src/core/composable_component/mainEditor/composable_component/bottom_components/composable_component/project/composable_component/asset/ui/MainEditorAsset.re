open AssetNodeType;

let component = ReasonReact.statelessComponent("MainEditorAsset");

let render = ((store, dispatchFunc), _self) => {
  let dragImg = DomHelper.createElement("img");

  let style =
    store
    |> StoreUtils.getBottomCurrentComponentType
    |> MainEditorBottomComponentUtils.isTypeEqualProject ?
      ReactDOMRe.Style.make(~opacity="1", ()) :
      ReactDOMRe.Style.make(~display="none", ());

  <article key="asset" className="wonder-asset-component" style>
    <div className="asset-tree">
      <MainEditorAssetHeader store dispatchFunc />
      <MainEditorAssetTree store dispatchFunc dragImg />
    </div>
    <MainEditorAssetChildrenNode store dispatchFunc dragImg debounceTime=200 />
  </article>;
};

let make = (~store, ~dispatchFunc, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), self),
};