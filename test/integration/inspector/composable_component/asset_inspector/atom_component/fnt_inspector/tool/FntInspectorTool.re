let setSettedAssetFntData = nodeId => {
  let (editorState, engineState) = (
    StateEditorService.getState(),
    StateEngineService.unsafeGetState(),
  );

  AssetIMGUIEngineService.setSettedAssetFntData(
    FntNodeAssetEditorService.getNodeName(nodeId, editorState),
    FntNodeAssetEditorService.getFntContent(nodeId, editorState),
    engineState,
  )
  |> StateEngineService.setState
  |> ignore;
};

let setNodeData =
    (
      ~nodeId,
      ~name,
      ~fntContent,
      ~editorState=StateEditorService.getState(),
      (),
    ) =>
  FntNodeAssetEditorService.setNodeData(
    nodeId,
    FntNodeAssetService.buildNodeData(~name, ~fntContent),
    editorState,
  );

let buildFntContent1 = () => {|info face="Lato-Regular" size=64 bold=0 italic=0 charset="" unicode=1 stretchH=100 smooth=1 aa=2 padding=0,0,0,0 spacing=0,0
common lineHeight=77 base=63 scaleW=512 scaleH=512 pages=1 packed=0 alphaChnl=0 redChnl=0 greenChnl=0 blueChnl=0
page id=0 file="lato.png"
chars count=96
char id=10   x=113  y=187  width=32   height=46   xoffset=1    yoffset=17   xadvance=34   page=0    chnl=0
kerning first=123 second=113 amount=-2|};

let submitAll =
    (
      ~nodeId,
      ~fntContent,
      ~originFntName,
      ~send=SinonTool.createOneLengthStub(Sinon.createSandbox()),
      (),
    ) =>
  FntInspector.Method.submit(
    nodeId,
    {fntContent, originFntName}: FntInspector.state,
    send,
  );