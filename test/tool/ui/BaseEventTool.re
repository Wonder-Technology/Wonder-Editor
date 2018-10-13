external toObject : Js.Dict.t('a) => Js.t({..}) = "%identity";

let buildFormEvent = value =>
  {
    "target": {
      "value": value,
      "checked": value,
    },
  } |> Obj.magic;

let buildWDBFileEvent = (fileName, arrayBuffer) =>
  {
    "target": {
      "files": {
        "0": {
          name: fileName ++ ".wdb",
          file: arrayBuffer,
        },
      },
    },
    "preventDefault": () => (),
  }
  |> Obj.magic;

let buildTwoJsonFileEvent =
    (~jsonName="loadJson", ~jsonResult="loadJson string result", ()) =>
  {
    "target": {
      "files": {
        "0": {
          name: jsonName ++ ".json",
          file: jsonResult,
        },
        "1": {
          name: jsonName ++ ".json",
          file: jsonResult,
        },
      },
    },
    "preventDefault": () => (),
  }
  |> Obj.magic;

let buildOneTextureFileEvent =
    (~imgName="loadImg.png", ~imgSrc="newImgBase64", ()) =>
  {
    "target": {
      "files": {
        "0": {
          name: imgName,
          file: imgSrc,
        },
      },
    },
    "preventDefault": () => (),
  }
  |> Obj.magic;

let buildFileEvent =
    (
      ~imgName="loadImg.png",
      ~imgSrc="newImgBase64",
      ~jsonName="loadJson",
      ~jsonResult="loadJson string result",
      (),
    ) =>
  {
    "target": {
      "files": {
        "0": {
          name: imgName,
          file: imgSrc,
        },
        "1": {
          name: jsonName ++ ".json",
          file: jsonResult,
        },
      },
    },
    "preventDefault": () => (),
  }
  |> Obj.magic;

let buildDragEvent = [%bs.raw
  () => {|
  var dataMap = {};

  return {
stopPropagation: () => undefined,
preventDefault: () => undefined,
dataTransfer: {
  effectAllowed: "move",
  setDragImage: (image, value1, value2) => undefined,
  setData: (key, value) => {
    dataMap[key] = value;
  },
  getData: (key) => {
    return dataMap[key]
  }
}
  }
  |}
];