open DomHelper;

open ExtensionParseType;

[@bs.val] external eval : string => Js.t({..}) = "";

let makeExtensionRecord = (extensionText) => {
  tFromJs(eval(extensionText));
};

let _convertdRecord = (extensionObj) => {
  let result: panelType = {
    name: extensionObj##name,
    parent: extensionObj##parent,
    render: extensionObj##render,
    willRender: extensionObj##willRender,
    didMount: extensionObj##didMount
  };
  result
};

let createExtensionMapAddToComponentMap = (extensionText) => {
  let extensionRecord = makeExtensionRecord(extensionText);
  extensionRecord.funcExtension
  |> ExtensionFunctionMap.createExtensionMap
  |> ComponentMapConfig.createComponentMap(extensionRecord.name)
};

let extensionPanelComponent = (componentName, extensionText, store) => {
  let extensionRecord = makeExtensionRecord(extensionText);
  extensionRecord.panelExtension
  |> Js.Array.map((panel: panelType) => parsePanelTypeToJsObj(panel))
  |> Js.Array.filter((panel) => panel##parent == componentName)
  |> (
    (panelArray) => {
      let len = panelArray |> Js.Array.length;
      switch len {
      | 0 => [|ReasonReact.nullElement|]
      | _ =>
        panelArray
        |> Js.Array.map((panelObj) => panelObj |> _convertdRecord)
        |> Js.Array.map(
             (record) =>
               <PanelExtensionComponent
                 key=(getRandomKey())
                 record
                 name=extensionRecord.name
                 store
               />
           )
      }
    }
  )
};