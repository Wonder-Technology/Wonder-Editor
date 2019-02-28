open Js.Promise;

let buildFakeZipData = [%bs.raw
  arrayBuffer => {|
  return [
    ["Assets/",{}],
    ["Assets/newFolder",{}],
    ["Assets/newFolder 1",{}],
    ["Assets/CubeTexture.wdb",{
      async: function(){
          return new Promise((resolve, _) => resolve(
            new Int8Array(arrayBuffer)
          ))
      },
    }],
    ["assets.json",{
      async: function(){
          return new Promise((resolve, _) => resolve(
            JSON.stringify(
              {
                "textures": [{
                  "path": "Assets/58eed7f99e14f",
                  "textureIndex": 0,
                  "warpS": 0,
                  "warpT": 0,
                  "minFilter": 0,
                  "magFilter": 1
                }, {
                  "path": "Assets/newFolder/newTexture",
                  "textureIndex": 1,
                  "warpS": 1,
                  "warpT": 1,
                  "minFilter": 1,
                  "magFilter": 1
                }],
                "sources": [{
                  "base64": "this is image result",
                  "name": "58eed7f99e14f.png",
                  "textureArray": [0, 1]
                }]
              }
            )
          ))
      },
    }],
  ]
|}
];

let buildPublishFakeJsZipCreateFunc = [%bs.raw
  sandbox => {|
        var obj = {
           file: sandbox.stub(),
           generateAsync: sandbox.stub(),
        };

        obj.file = obj.file.returns(obj);
        obj.generateAsync = (a,b) => {
          return new Promise((resolve, _) => resolve(obj))
        };

        return obj;

|}
];

let buildFileComponent =
    (
      ~state,
      ~send,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  Header.Method.buildFileComponent(state, send, uiState, dispatchFunc);

let buildState =
    (
      ~isSelectNav=false,
      ~currentSelectNav=HeaderType.File,
      ~isShowFileControlsModal=false,
      ~isShowEditExportPackageModal=false,
      ~isShowEditExportSceneModal=false,
      ~isShowPublishLocalModal=false,
      ~isShowHelpAboutWonderModal=false,
      (),
    )
    : Header.state => {
  isSelectNav,
  currentSelectNav,
  isShowFileControlsModal,
  isShowEditExportPackageModal,
  isShowEditExportSceneModal,
  isShowPublishLocalModal,
  isShowHelpAboutWonderModal,
};