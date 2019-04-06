let component = ReasonReact.statelessComponent("SelectAssetGroupBar");

let render =
    ((headerText, headerTitle, assetText), (selectAssetFunc, sendFunc)) =>
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
      _children,
    ) => {
  ...component,
  render: _self =>
    render(
      (headerText, headerTitle, assetText),
      (selectAssetFunc, sendFunc),
    ),
};