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
         this.getAttribute = function(props) {
            return this.src
         }
       }
     }
|}
];

let _buildJsonResult = () => {
  name: {j|json.json|j},
  type_: Json,
  result: Some("json result"),
};
let _buildImageObj = src =>
  {"src": src, "getAttribute": props => src} |> Obj.magic;

let addJsonIntoNodeMap = (index, assetState) =>
  assetState |> NodeMapAssetService.setResult(index, _buildJsonResult());

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
  |> NodeMapAssetService.setResult(
       index,
       TextureUtils.buildTextureNodeResult("textureName", texture),
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
       children: [|
         {id: id1, children: [||]},
         {id: id2, children: [||]},
         {id: id3, children: [||]},
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
       children: [|
         {id: id1, children: [||]},
         {id: id2, children: [||]},
         {id: id3, children: [||]},
         {id: id4, children: [||]},
         {id: id5, children: [||]},
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
       children: [|
         {id: id1, children: [||]},
         {
           id: id2,
           children: [|
             {id: id3, children: [||]},
             {id: id4, children: [||]},
             {id: id5, children: [||]},
             {id: id6, children: [||]},
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