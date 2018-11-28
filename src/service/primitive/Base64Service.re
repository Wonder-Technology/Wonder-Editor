let isBase64Equal = (base64_1, base64_2) => {
  switch (base64_1, base64_2) {
  | (None, None) => true
  | (Some(base64_1), Some(base64_2)) =>
    base64_1 |> Js.String.length === (base64_2 |> Js.String.length) ?
      base64_1 == base64_2 : false
  | _ => false
  };
};