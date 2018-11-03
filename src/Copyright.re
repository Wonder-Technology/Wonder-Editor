let getVersion = () => "0.13.0";

let getAuthor = () => "Wonder";

let getWPKVersion = versionStr =>
  switch (versionStr) {
  | "0.13.0" => 1
  | _ => 1
  };