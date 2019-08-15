open FileReaderType;

open FileType;

[@bs.new] external createFileReader: unit => fileReader = "FileReader";

[@bs.send] external readAsDataURL: (fileReader, file) => unit = "";

[@bs.send] external readAsArrayBuffer: (fileReader, file) => unit = "";

[@bs.send] external readAsText: (fileReader, file) => unit = "";

type resultType;

let onload: (fileReader, resultType => unit) => unit = [%raw
  {|
      function (reader,handleFunc) {
          reader.onload = function() {
              handleFunc(this.result)
          }
      }
  |}
];

let makeSureCanLoadSameNameFileAgain = targetDom => {
  targetDom##value #= "";

  ();
};

let convertFileJsObjectToFileInfoRecord = fileObject => {
  name: fileObject##name,
  type_: fileObject##_type,
  file: FileType.convertFileJsObjectToFile(fileObject),
};

external convertResultToString: resultType => string = "%identity";

external convertResultToArrayBuffer: resultType => Js.Typed_array.ArrayBuffer.t =
  "%identity";

external convertResultToJsZipBlob: resultType => WonderBsJszip.Blob.t =
  "%identity";

let buildFileChunkFromDataArray =
    ((blockCount, chunkSize), fileHash, fileSize, fileBlob) => {
  let resultArray = [||];

  for (x in 0 to blockCount - 1) {
    let start = x * chunkSize;
    let end_ = Js.Math.min_int(fileSize, start + chunkSize);
    let formData = FormData.createFormData();

    FormData.append(formData, "file", Blob.slice(start, end_, fileBlob));
    FormData.append(formData, "index", x);
    FormData.append(formData, "hash", fileHash);

    resultArray |> Js.Array.push(formData) |> ignore;
  };

  resultArray;
};