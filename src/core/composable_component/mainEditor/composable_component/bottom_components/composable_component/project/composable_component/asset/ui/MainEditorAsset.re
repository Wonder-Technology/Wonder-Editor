open NodeAssetType;

let component = ReasonReact.statelessComponent("MainEditorAsset");

let render = ((uiState, dispatchFunc), _self) => {
  let dragImg = DomHelper.createElement("img");

  <article key="asset" className="wonder-asset-component">
    <div className="asset-tree">
      <MainEditorAssetHeader uiState dispatchFunc />
      <MainEditorAssetTree uiState dispatchFunc dragImg />
    </div>
    <MainEditorAssetChildrenNode uiState dispatchFunc dragImg debounceTime=200 />
  </article>;
};

let make = (~uiState, ~dispatchFunc, _children) => {
  ...component,
  render: self => render((uiState, dispatchFunc), self),
};