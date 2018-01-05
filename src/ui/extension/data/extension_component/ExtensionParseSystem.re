open DomHelper;

open ExtensionParseType;

/* [@bs.new] external func : string => Js.t({..}) = "Function"; */
[@bs.val] external eval : string => Js.t({..}) = "";

let _buildExtensionRecord = (extensionText) => tFromJs(eval(extensionText));

let createComponentMap = (extensionText) => {
  let extensionRecord = _buildExtensionRecord(extensionText);
  extensionRecord.methodExtension
  |> ExtensionMethodMapSystem.createExtensionMap
  |> ComponentMapSystem.addExtensionMap(
       ComponentMapSystem.createComponentMap(),
       extensionRecord.name
     )
};

let _convertdRecord = (extensionObj) => {
  name: extensionObj##name,
  parent: extensionObj##parent,
  render: extensionObj##render,
  initialState: extensionObj##initialState,
  willRender: extensionObj##willRender,
  didMount: extensionObj##didMount
};

let extensionPanelComponent = (componentName, extensionText, store) => {
  let extensionRecord = _buildExtensionRecord(extensionText);
  extensionRecord.panelExtension
  |> Js.Array.map((panel: panelType) => parsePanelTypeToJsObj(panel))
  |> Js.Array.filter((panel) => panel##parent == componentName)
  |> (
    (panelArray) => {
      let len = panelArray |> Js.Array.length;
      switch len {
      | 0 => [||]
      | _ =>
        panelArray
        |> Js.Array.map((panelObj) => panelObj |> _convertdRecord)
        |> Js.Array.map(
             (record) =>
               <PanelExtension key=(getRandomKey()) record name=extensionRecord.name store />
           )
      }
    }
  )
};