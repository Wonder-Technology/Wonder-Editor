open AssetNodeType;

type retainedProps = {updateTypeArr: UpdateStore.updateComponentTypeArr};

let component =
  ReasonReact.statelessComponentWithRetainedProps("MainEditorAsset");

let render = ((store, dispatchFunc), _self) => {
  let dragImg = DomHelper.createElement("img");

  <article key="asset" className="wonder-asset-component">
    <div className="asset-tree">
      <MainEditorAssetHeader store dispatchFunc />
      <MainEditorAssetTree store dispatchFunc dragImg />
    </div>
    <MainEditorAssetChildrenNode store dispatchFunc dragImg debounceTime=200 />
  </article>;
};
let shouldUpdate =
    ({newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  newSelf.retainedProps.updateTypeArr
  |> StoreUtils.shouldComponentUpdate(UpdateStore.Asset);

let make = (~store, ~dispatchFunc, _children) => {
  ...component,
  retainedProps: {
    updateTypeArr: StoreUtils.getUpdateComponentTypeArr(store),
  },
  shouldUpdate,
  render: self => render((store, dispatchFunc), self),
};