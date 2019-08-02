module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (Wonderjs.ComponentType.component, int);
  type return = unit;

  let handleSelfLogic =
      ((uiState, dispatchFunc), (), (textureComponent, value)) => {
    TextureFilterUtils.changeMagFilter(textureComponent, value);

    SourceTextureCacheInspectorCanvasLogicService.removeCache(
      textureComponent,
      StateEngineService.unsafeGetState(),
    )
    |> StateLogicService.getAndSetEditorState;

    ();
  };

  let setUndoValueToCopiedEngineState =
      ((uiState, dispatchFunc), (), (textureComponent, value)) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> BasicSourceTextureEngineService.setIsNeedUpdate(true, textureComponent);
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);