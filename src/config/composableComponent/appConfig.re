type appConfig = {
  number_input: NumberInputAtom.numberInputAtom,
  main_editor: MainEditorAtom.mainEditorAtom,
  button: DomAtom.buttonAtom
};

let app_component_config = {|
    {
        "number_input":{"label":"X","onChange":"fck2"},
        "main_editor":{"state":"stringState","dispatch":"dispatch"},
        "button":{"onClick":"undo","text":"undoBtn"}
    }
|};

let convertAppJsonToRecord = (json) =>
  Json.Decode.{
    number_input: json |> field("number_input", NumberInputAtom.numberInputAtom),
    main_editor: json |> field("main_editor", MainEditorAtom.mainEditorAtom),
    button: json |> field("button", DomAtom.buttonAtom)
  };

let appRecord = app_component_config |> Js.Json.parseExn |> convertAppJsonToRecord;