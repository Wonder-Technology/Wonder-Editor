let unsafeGetIMGUIFuncStr = state =>
  ManageIMGUIEngineService.getIMGUIFunc(state)
  |> OptionService.unsafeGet
  |> Obj.magic
                  |> Wonderjs.SerializeService.serializeFunction
                  |> StringTool.removeNewLinesAndSpaces;

  /* let  */