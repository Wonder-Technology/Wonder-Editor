module Method = {};

let component = ReasonReact.statelessComponent("AssetBundleInspector");

let render = (name, type_, (onChangeFunc, onBlurFunc), _self) =>
  <article className="inspector-asset-wdb">
    <h1> {DomHelper.textEl("AssetBundle")} </h1>
    <hr />
    <div className="inspector-item">
      <div className="item-header">
        <span className=""> {DomHelper.textEl("Name:")} </span>
      </div>
      <div className="item-content">
        <input
          className="input-component float-input"
          type_="text"
          value=name
          onChange=onChangeFunc
          onBlur=onBlurFunc
        />
      </div>
    </div>
    <div className="inspector-item">
      <div className="item-header">
        <span className=""> {DomHelper.textEl("Type:")} </span>
      </div>
      <div className="item-content">
        <span className=""> {DomHelper.textEl(type_)} </span>
      </div>
    </div>
  </article>;

let make = (~name, ~type_, ~onChangeFunc, ~onBlurFunc, _children) => {
  ...component,
  render: _self => render(name, type_, (onChangeFunc, onBlurFunc), _self),
};