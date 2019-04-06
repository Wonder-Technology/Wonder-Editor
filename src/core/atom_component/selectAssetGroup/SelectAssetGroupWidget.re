module Method = {
  let showAssets =
      ((getAllAssetsFunc, isAssetFunc, changeAssetFunc, getTextFunc), sendFunc) =>
    getAllAssetsFunc()
    |> Js.Array.map(item => {
         let className =
           isAssetFunc(item) ?
             "select-item-content select-item-active" : "select-item-content";

         <div
           className
           key={DomHelper.getRandomKey()}
           onClick={_e => changeAssetFunc(item, sendFunc)}>
           {DomHelper.textEl(getTextFunc(item))}
         </div>;
       });
};

let component = ReasonReact.statelessComponent("SelectAssetGroupWidget");

let render =
    (
      headerText,
      (clickHideGroupButtonFunc, sendFunc),
      (getAllAssetsFunc, isAssetFunc, changeAssetFunc, getTextFunc),
    ) =>
  <div className="select-component-content">
    <div className="select-component-item">
      <div className="select-item-header">
        {DomHelper.textEl(headerText)}
      </div>
      <div className="select-item-body">
        {
          ReasonReact.array(
            Method.showAssets(
              (getAllAssetsFunc, isAssetFunc, changeAssetFunc, getTextFunc),
              sendFunc,
            ),
          )
        }
      </div>
    </div>
    <div
      className="select-component-bg"
      onClick={_e => clickHideGroupButtonFunc(sendFunc)}
    />
  </div>;

let make =
    (
      ~headerText,
      ~clickHideGroupButtonFunc,
      ~sendFunc,
      ~getAllAssetsFunc,
      ~isAssetFunc,
      ~changeAssetFunc,
      ~getTextFunc,
      _children,
    ) => {
  ...component,
  render: _self =>
    render(
      headerText,
      (clickHideGroupButtonFunc, sendFunc),
      (getAllAssetsFunc, isAssetFunc, changeAssetFunc, getTextFunc),
    ),
};