type numberInputAtom = {
  label: option(string),
  defaultValue: option(string),
  onChange: option(string)
};

let numberInputAtom = (json) =>
  Json.Decode.{
    label: json |> optional(field("label", string)),
    defaultValue: json |> optional(field("defaultValue", string)),
    onChange: json |> optional(field("onChange", string))
  };