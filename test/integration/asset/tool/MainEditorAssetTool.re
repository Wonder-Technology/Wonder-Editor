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

let addJsonIntoNodeMap = (index, editorState) =>
  editorState
  |> AssetNodeMapEditorService.setResult(index, _buildJsonResult());

let addTextureIntoNodeMap = (index, textureName, editorState) => {
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

  editorState
  |> AssetNodeMapEditorService.setResult(
       index,
       TextureUtils.buildTextureNodeResult("textureName", texture),
     );
};

let _increaseIndex = editorState => {
  let editorState = AssetIndexEditorService.increaseIndex(editorState);
  let index = editorState |> AssetIndexEditorService.getIndex;
  (index, editorState);
};

let buildFolderClickSimpleAssetTreeRoot = () => {
  let (rootId, editorState) = StateEditorService.getState() |> _increaseIndex;
  let (id1, editorState) = editorState |> _increaseIndex;
  let (id2, editorState) = editorState |> _increaseIndex;
  let (id3, editorState) = editorState |> _increaseIndex;
  editorState
  |> AssetTreeRootEditorService.setAssetTreeRoot({
       id: rootId,
       children: [|
         {id: id1, children: [||]},
         {id: id2, children: [||]},
         {id: id3, children: [||]},
       |],
     })
  |> AssetTreeNodeUtils.addFolderIntoNodeMap(rootId)
  |> AssetTreeNodeUtils.addFolderIntoNodeMap(id1)
  |> addTextureIntoNodeMap(id2,"texture2")
  |> addJsonIntoNodeMap(id3)
  |> StateEditorService.setState
  |> ignore;
};

let buildTwoLayerAssetTreeRoot = () => {
  let (rootId, editorState) = StateEditorService.getState() |> _increaseIndex;
  let (id1, editorState) = editorState |> _increaseIndex;
  let (id2, editorState) = editorState |> _increaseIndex;
  let (id3, editorState) = editorState |> _increaseIndex;
  let (id4, editorState) = editorState |> _increaseIndex;
  let (id5, editorState) = editorState |> _increaseIndex;
  editorState
  |> AssetTreeRootEditorService.setAssetTreeRoot({
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
  |> addTextureIntoNodeMap(id3,"texture3")
  |> addJsonIntoNodeMap(id4)
  |> addTextureIntoNodeMap(id5,"texture5")
  |> StateEditorService.setState
  |> ignore;
};

let buildThreeLayerAssetTreeRoot = () => {
  let (rootId, editorState) = StateEditorService.getState() |> _increaseIndex;
  let (id1, editorState) = editorState |> _increaseIndex;
  let (id2, editorState) = editorState |> _increaseIndex;
  let (id3, editorState) = editorState |> _increaseIndex;
  let (id4, editorState) = editorState |> _increaseIndex;
  let (id5, editorState) = editorState |> _increaseIndex;
  let (id6, editorState) = editorState |> _increaseIndex;
  editorState
  |> AssetTreeRootEditorService.setAssetTreeRoot({
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
  |> addTextureIntoNodeMap(id5,"texture5")
  |> addJsonIntoNodeMap(id6)
  |> StateEditorService.setState
  |> ignore;
};

let initAssetTree = (buildAssetTreeFunc, ()) => {
  (
    editorState => {
      let (asseTree, editorState) =
        editorState |> AssetTreeNodeUtils.initRootAssetTree;
      editorState |> AssetTreeRootEditorService.setAssetTreeRoot(asseTree);
    }
  )
  |> StateLogicService.getAndSetEditorState;
  buildAssetTreeFunc();
};