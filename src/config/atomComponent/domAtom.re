type buttonAtom = {
  onClick: string,
  text: string
};

let buttonAtom = (json) =>
  Json.Decode.{onClick: json |> field("onClick", string), text: json |> field("text", string)};