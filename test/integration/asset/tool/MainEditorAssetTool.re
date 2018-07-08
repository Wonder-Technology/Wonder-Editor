open AssetTreeNodeType;

open AssetNodeType;

let buildFakeFileReader = [%bs.raw
  {|
     function (){
       window.FileReader = function(){
         this.result = null;
         this.onload = null;
         this.readAsDataURL = function(file) {
            this.result = file.file;
            this.onload();
         };
         this.readAsText = function(file) {
            this.result = file.file;
            this.onload();
         };
       }
     }
|}
];

let buildFakeImage = [%bs.raw
  {|
     function (){
       window.Image = function(){
         this.src = null;
         this.onload = null;
         this.complete = true;
       }
     }
|}
];

let _buildJsonResult = () => {name: "json.json", jsonResult: "json result"};
let _buildImageObj = src => {"src": src} |> Obj.magic;

let addJsonIntoNodeMap = (index, assetState) =>
  assetState |> JsonNodeMapAssetService.setResult(index, _buildJsonResult());

let addTextureIntoNodeMap = (index, textureName, assetState) => {
  let (texture, editEngineState, runEngineState) =
    TextureUtils.createAndInitTexture(
      textureName,
      StateLogicService.getEditEngineState(),
      StateLogicService.getRunEngineState(),
    );

  editEngineState
  |> BasicSourceTextureEngineService.setSource(
       _buildImageObj(textureName) |> Image.convertImgToHtmlImage |> Obj.magic,
       texture,
     )
  |> StateLogicService.setEditEngineState;

  runEngineState
  |> BasicSourceTextureEngineService.setSource(
       _buildImageObj(textureName) |> Image.convertImgToHtmlImage |> Obj.magic,
       texture,
     )
  |> StateLogicService.setRunEngineState;

  assetState
  |> ImageBase64MapAssetService.setResult(texture, textureName ++ "img")
  |> TextureNodeMapAssetService.setResult(
       index,
       AssetNodeAssetService.buildTextureNodeResult(texture),
     );
};

let _increaseIndex = assetState => {
  let assetState = IndexAssetService.increaseIndex(assetState);
  let index = assetState |> IndexAssetService.getIndex;
  (index, assetState);
};

let buildFolderClickSimpleAssetTreeRoot = () => {
  let (rootId, assetState) = StateAssetService.getState() |> _increaseIndex;
  let (id1, assetState) = assetState |> _increaseIndex;
  let (id2, assetState) = assetState |> _increaseIndex;
  let (id3, assetState) = assetState |> _increaseIndex;
  assetState
  |> AssetTreeRootAssetService.setAssetTreeRoot({
       id: rootId,
       type_: Folder,
       children: [|
         {id: id1, type_: Folder, children: [||]},
         {id: id2, type_: Texture, children: [||]},
         {id: id3, type_: Json, children: [||]},
       |],
     })
  |> AssetTreeNodeUtils.addFolderIntoNodeMap(rootId)
  |> AssetTreeNodeUtils.addFolderIntoNodeMap(id1)
  |> addTextureIntoNodeMap(id2, "texture2")
  |> addJsonIntoNodeMap(id3)
  |> StateAssetService.setState
  |> ignore;
};

let buildTwoLayerAssetTreeRoot = () => {
  let (rootId, assetState) = StateAssetService.getState() |> _increaseIndex;
  let (id1, assetState) = assetState |> _increaseIndex;
  let (id2, assetState) = assetState |> _increaseIndex;
  let (id3, assetState) = assetState |> _increaseIndex;
  let (id4, assetState) = assetState |> _increaseIndex;
  let (id5, assetState) = assetState |> _increaseIndex;
  assetState
  |> AssetTreeRootAssetService.setAssetTreeRoot({
       id: rootId,
       type_: Folder,
       children: [|
         {id: id1, type_: Folder, children: [||]},
         {id: id2, type_: Folder, children: [||]},
         {id: id3, type_: Texture, children: [||]},
         {id: id4, type_: Json, children: [||]},
         {id: id5, type_: Texture, children: [||]},
       |],
     })
  |> AssetTreeNodeUtils.addFolderIntoNodeMap(rootId)
  |> AssetTreeNodeUtils.addFolderIntoNodeMap(id1)
  |> AssetTreeNodeUtils.addFolderIntoNodeMap(id2)
  |> addTextureIntoNodeMap(id3, "texture3")
  |> addJsonIntoNodeMap(id4)
  |> addTextureIntoNodeMap(id5, "texture5")
  |> StateAssetService.setState
  |> ignore;
};

let buildThreeLayerAssetTreeRoot = () => {
  let (rootId, assetState) = StateAssetService.getState() |> _increaseIndex;
  let (id1, assetState) = assetState |> _increaseIndex;
  let (id2, assetState) = assetState |> _increaseIndex;
  let (id3, assetState) = assetState |> _increaseIndex;
  let (id4, assetState) = assetState |> _increaseIndex;
  let (id5, assetState) = assetState |> _increaseIndex;
  let (id6, assetState) = assetState |> _increaseIndex;
  assetState
  |> AssetTreeRootAssetService.setAssetTreeRoot({
       id: rootId,
       type_: Folder,
       children: [|
         {id: id1, type_: Folder, children: [||]},
         {
           id: id2,
           type_: Folder,
           children: [|
             {id: id3, type_: Folder, children: [||]},
             {id: id4, type_: Folder, children: [||]},
             {id: id5, type_: Texture, children: [||]},
             {id: id6, type_: Json, children: [||]},
           |],
         },
       |],
     })
  |> AssetTreeNodeUtils.addFolderIntoNodeMap(rootId)
  |> AssetTreeNodeUtils.addFolderIntoNodeMap(id1)
  |> AssetTreeNodeUtils.addFolderIntoNodeMap(id2)
  |> AssetTreeNodeUtils.addFolderIntoNodeMap(id3)
  |> AssetTreeNodeUtils.addFolderIntoNodeMap(id4)
  |> addTextureIntoNodeMap(id5, "texture5")
  |> addJsonIntoNodeMap(id6)
  |> StateAssetService.setState
  |> ignore;
};

let initAssetTree = (buildAssetTreeFunc, ()) => {
  (
    assetState => {
      let (asseTree, assetState) =
        assetState |> AssetTreeNodeUtils.initRootAssetTree;
      assetState |> AssetTreeRootAssetService.setAssetTreeRoot(asseTree);
    }
  )
  |> StateLogicService.getAndSetAssetState;
  buildAssetTreeFunc();
};

let clearNodeMap = assetState =>
  assetState
  |> FolderNodeMapAssetService.clearFolderNodeMap
  |> JsonNodeMapAssetService.clearJsonNodeMap
  |> TextureNodeMapAssetService.clearTextureNodeMap;

let getAssetNodeTypeNodeMaps = assetState => (
  assetState |> FolderNodeMapAssetService.unsafeGetFolderNodeMap,
  assetState |> JsonNodeMapAssetService.unsafeGetJsonNodeMap,
  assetState |> TextureNodeMapAssetService.unsafeGetTextureNodeMap,
);