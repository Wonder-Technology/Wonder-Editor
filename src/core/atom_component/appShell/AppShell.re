module Method = {
  let hideLoading = loadingDomId => DomUtils.hideDom(loadingDomId);
};

let component = ReasonReact.statelessComponent("AppShell");

let render = _self =>
  <article key="appShell" className="wonder-app-shell">
    <div className="shell-header" />
    <div className="shell-controller" />
    <div className="shell-mainEditor">
      <div className="left-component">
        <div className="top-widget">
          <div className="shell-scene-tree" />
          <div className="webgl-parent" />
        </div>
        <div className="bottom-widget">
          <div className="wonder-bottom-component">
            <div className="bottom-header" />
            <div className="wonder-bottom-project" />
          </div>
        </div>
      </div>
      <div className="right-component" />
    </div>
  </article>;

let make = _children => {
  ...component,
  render: self => render(self),
  didMount: self => Method.hideLoading("loading"),
};