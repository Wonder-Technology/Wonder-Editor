open FileReaderType;

open FileType;

[@bs.new] external createFileReader : unit => fileReader = "FileReader";

[@bs.send] external readAsDataURL : (fileReader, file) => unit = "";

[@bs.send] external readAsDataURL : (fileReader, file) => unit = "";

[@bs.send] external readAsArrayBuffer : (fileReader, file) => unit = "";

[@bs.send] external readAsText : (fileReader, file) => unit = "";

type resultType;

let onload: (fileReader, resultType => unit) => unit = [%bs.raw
  {|
      function (reader,handleFunc) {
          reader.onload = function() {
              handleFunc(this.result)
          }
      }
  |}
];

let makeSureCanLoadSameNameFileAgain = targetDom => {
  targetDom##value#="";

  ();
};

external convertResultToString : resultType => string = "%identity";

external convertResultToArrayBuffer :
  resultType => Js.Typed_array.ArrayBuffer.t =
  "%identity";