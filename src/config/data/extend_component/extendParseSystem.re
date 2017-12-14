open DomHelper;

open ExtendParseType;

let _convertdRecord = (extendObj) => {
  let result: panelType = {
    name: extendObj##name,
    parent: extendObj##parent,
    render: extendObj##render,
    willRender: extendObj##willRender,
    didMount: extendObj##didMount
  };
  result
};

let extendRecord = tFromJs(TempTest.extendObject);

let extendComponent = (componentName, store) =>
  extendRecord.panelExtend
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
             (record) => <TempCom key=(getRandomKey()) record name=extendRecord.name store />
           )
      }
    }
  );