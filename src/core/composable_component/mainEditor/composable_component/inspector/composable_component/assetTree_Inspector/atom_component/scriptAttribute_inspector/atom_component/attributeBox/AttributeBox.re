open Wonderjs;

open ScriptAttributeType;

type state = {
  attributeType: scriptAttributeType,
  defaultInt: int,
  defaultFloat: float,
};

type action =
  | ChangeDefaultInt(int)
  | ChangeDefaultFloat(float)
  | ChangeAttributeType(int);

module Method = {
  let submitAttribute = (nodeId, fieldName, state, submitFunc) =>
    switch (state.attributeType) {
    | Int =>
      submitFunc((
        nodeId,
        fieldName,
        {
          "type":
            state.attributeType
            |> ScriptAttributeTypeService.convertFieldTypeToJsObjStr,
          "defaultValue":
            state.defaultInt
            |> ScriptAttributeTypeUtils.convertIntToScriptAttributeValue,
        },
      ))
    | Float =>
      submitFunc((
        nodeId,
        fieldName,
        {
          "type":
            state.attributeType
            |> ScriptAttributeTypeService.convertFieldTypeToJsObjStr,
          "defaultValue":
            state.defaultFloat
            |> ScriptAttributeTypeUtils.convertFloatToScriptAttributeValue,
        },
      ))
    };
};

let component = ReasonReact.reducerComponent("AttributeBox");

let reducer = (nodeId, fieldName, submitFunc, action, state) =>
  switch (action) {
  | ChangeAttributeType(value) =>
    ReasonReact.Update({
      ...state,
      attributeType:
        value |> ScriptAttributeTypeUtils.convertIntToScriptAttributeType,
    })
  | ChangeDefaultInt(value) =>
    ReasonReact.Update({...state, defaultInt: value})
  | ChangeDefaultFloat(value) =>
    ReasonReact.Update({...state, defaultFloat: value})
  };

let render =
    (
      (
        {type_, defaultValue}: Wonderjs.ScriptAttributeType.scriptAttributeField,
        fieldName,
        nodeId,
      ),
      (renameFunc, removeFunc, submitFunc),
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article className="attributeBox-component">
    <div className="component-header">
      <div className="header-title"> {DomHelper.textEl("Attribute")} </div>
      <div className="header-close">
        <img
          src="./public/img/close.png"
          onClick={_e => removeFunc((nodeId, fieldName))}
        />
      </div>
    </div>
    <StringInput
      label="Name"
      defaultValue=fieldName
      onBlur={value => renameFunc((nodeId, fieldName, value))}
      canBeNull=false
    />
    <div className="component-content">
      <Select
        label="Type"
        title={
          LanguageUtils.getInspectorLanguageDataByType(
            "texture-min-filter-describe",
            languageType,
          )
        }
        options={ScriptAttributeInspectorUtils.getScriptAttributeOptions()}
        selectedKey={
          state.attributeType
          |> ScriptAttributeTypeUtils.convertScriptAttributeTypeToInt
        }
        onChange={value => send(ChangeAttributeType(value))}
      />
    </div>
    {
      switch (state.attributeType) {
      | Int =>
        <IntInput
          key={DomHelper.getRandomKey()}
          label="Value"
          defaultValue={state.defaultInt |> string_of_int}
          onBlur=(value => send(ChangeDefaultInt(value)))
          onDragDrop=(value => send(ChangeDefaultInt(value)))
        />
      | Float =>
        <FloatInput
          key={DomHelper.getRandomKey()}
          label="Value"
          defaultValue={state.defaultFloat |> string_of_float}
          canBeZero=true
          onBlur=(value => send(ChangeDefaultFloat(value)))
          onDragDrop=(value => send(ChangeDefaultFloat(value)))
        />
      }
    }
  </article>;
};

let make =
    (
      ~fieldName,
      ~nodeId,
      ~field,
      ~renameFunc,
      ~removeFunc,
      ~submitFunc,
      _children,
    ) => {
  ...component,
  initialState: () => {
    let attributeType = field.type_;
    switch (attributeType) {
    | Int => {
        attributeType,
        defaultInt:
          field.defaultValue
          |> ScriptAttributeTypeUtils.convertScriptAttributeValueToInt,
        defaultFloat: 0.,
      }
    | Float => {
        attributeType,
        defaultInt: 0,
        defaultFloat:
          field.defaultValue
          |> ScriptAttributeTypeUtils.convertScriptAttributeValueToFloat,
      }
    };
  },
  reducer: reducer(nodeId, fieldName, submitFunc),
  render: self =>
    render(
      (field, fieldName, nodeId),
      (renameFunc, removeFunc, submitFunc),
      self,
    ),
  didUpdate: ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, 'b, 'c)) =>
    Method.submitAttribute(nodeId, fieldName, newSelf.state, submitFunc),
};