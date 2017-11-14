type mainEditorAtom = {
  state: string,
  dispatch: string
};

let mainEditorAtom = (json) =>
  Json.Decode.{state: json |> field("state", string), dispatch: json |> field("dispatch", string)};