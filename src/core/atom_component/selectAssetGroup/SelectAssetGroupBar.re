let component = ReasonReact.statelessComponent("SelectAssetGroupBar");

let render =
    (
      (headerText, headerTitle, assetText),
      (removeAssetFuncOpt, selectAssetFunc, sendFunc),
    ) =>
  <div className="inspector-item">
    <div className="item-header" title=headerTitle>
      {DomHelper.textEl(headerText)}
    </div>
    <div className="item-content">
      <div className="inspector-select">
        <div
          className="select-name" onClick={_e => selectAssetFunc(sendFunc)}>
          {DomHelper.textEl(assetText)}
        </div>
        <div className="select-img" onClick={_e => selectAssetFunc(sendFunc)}>
          <img src="./public/img/select.png" />
        </div>
        {
          switch (removeAssetFuncOpt) {
          | None => ReasonReact.null
          | Some(removeFunc) =>
            <img
              src="./public/img/close.png"
              onClick=(_e => removeFunc(sendFunc))
            />
          }
        }
      </div>
    </div>
  </div>;

let make =
    (
      ~headerText,
      ~headerTitle,
      ~assetText,
      ~selectAssetFunc,
      ~sendFunc,
      ~removeAssetFuncOpt: option('a => unit)=None,
      _children,
    ) => {
  ...component,
  render: _self =>
    render(
      (headerText, headerTitle, assetText),
      (removeAssetFuncOpt, selectAssetFunc, sendFunc),
    ),
};