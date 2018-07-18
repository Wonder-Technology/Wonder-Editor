open FileReaderType;

let onload: (fileReader, string => unit) => unit = [%bs.raw
  {|
      function (reader,handleFunc) {
          reader.onload = function() {
              handleFunc(this.result)
          }
      }
  |}
];