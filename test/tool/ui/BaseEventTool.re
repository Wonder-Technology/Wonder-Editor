external toObject: Js.Dict.t('a) => Js.t({..}) = "%identity";

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

let buildPackageFileEvent = (fileName, wpk) =>
  {
    "target": {
      "files": {
        "0": {
          name: fileName ++ ".wpk",
          file: wpk,
        },
      },
    },
    "preventDefault": () => (),
  }
  |> Obj.magic;

let buildGLBFileEvent = (fileName, arrayBuffer) =>
  {
    "target": {
      "files": {
        "0": {
          name: fileName ++ ".glb",
          file: arrayBuffer,
        },
      },
    },
    "preventDefault": () => (),
  }
  |> Obj.magic;

let buildAssetBundleZipFileEvent = fileName =>
  {
    "target": {
      "files": {
        "0": {
          name: fileName ++ ".zip",
          file: Obj.magic(-1),
        },
      },
    },
    "preventDefault": () => (),
  }
  |> Obj.magic;

let buildGLTFZipFileEvent = fileName =>
  {
    "target": {
      "files": {
        "0": {
          name: fileName ++ ".zip",
          file: Obj.magic(-1),
        },
      },
    },
    "preventDefault": () => (),
  }
  |> Obj.magic;

/* let buildTwoJsonFileEvent =
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
   |> Obj.magic; */

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

let buildAssetBundleFileEvent = (fullFileName, arrayBuffer) =>
  {
    "target": {
      "files": {
        "0": {
          name: fullFileName,
          file: arrayBuffer,
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

let buildDragEventWithDataMap = [%bs.raw
  dataMap => {|
  return {
    stopPropagation: () => undefined,
    preventDefault: () => undefined,
    dataTransfer: {
      effectAllowed: "move",
      dropEffect: "move",
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

let buildDragEventWithMouse = (~offsetTop=11, ~offsetHeight=12, ~pageY=12, ()) =>
  {
    "target": {
      "getClientRects": () => {"length": 4},
      "getBoundingClientRect": () => {
        "top": offsetTop,
        "left": offsetHeight,
        "width": 13,
        "height": 14,
      },
      "ownerDocument": {
        "documentElement": {
          "clientTop": 0,
          "clientLeft": 0,
        },
        "defaultView": {
          "pageYOffset": 0,
          "pageXOffset": 0,
        },
      },
    },
    "pageY": pageY,
    "stopPropagation": () => (),
    "preventDefault": () => (),
  }
  |> Obj.magic;

let buildDragEvent =
  (.) =>
    buildDragEventWithDataMap(
      WonderCommonlib.MutableHashMapService.createEmpty(),
    );