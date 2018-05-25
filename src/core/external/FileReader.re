open FileType;

type fileReader;

[@bs.new] external createFileReader : unit => fileReader = "FileReader";

[@bs.send] external readAsDataURL : (fileReader, file) => unit = "";

[@bs.send] external readAsText : (fileReader, file) => unit = "";

let onload: (fileReader, string => unit) => unit = [%bs.raw
  {|
      function (reader,handleFunc) {
          reader.onload = function() {
              handleFunc(this.result)
          }
      }
  |}
];