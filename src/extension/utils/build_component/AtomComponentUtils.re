open DomHelper;

let buildFloatInput = (label, defaultValue, onChange) =>
  <FloatInput ?label ?defaultValue ?onChange />;

let buildButton = (text, onClick) =>
  switch text {
  | None =>
    WonderLog.Log.error(
      WonderLog.Log.buildErrorMessage(
        ~title="buildButton",
        ~description={j|the button component: text is empty|j},
        ~reason="",
        ~solution={j|check extension->panelExtension->render->name->button should add text|j},
        ~params={j|button text: null|j}
      )
    );
    ReasonReact.null
  | Some(value) => <button> (textEl(value)) </button>
  };

let buildDiv = (text) =>
  switch text {
  | None =>
    WonderLog.Log.error(
      WonderLog.Log.buildErrorMessage(
        ~title="buildDiv",
        ~description={j|the div component: text is empty|j},
        ~reason="",
        ~solution={j|check extension->panelExtension->render->name->div should add text|j},
        ~params={j|div text: null|j}
      )
    );
    ReasonReact.null
  | Some(value) => <div key=(getRandomKey())> (textEl(value)) </div>
  };