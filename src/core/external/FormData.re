open Fetch;

[@bs.new] external createFormData : unit => formData = "FormData";

[@bs.send] external append : (formData, string, 'a) => unit = "append";