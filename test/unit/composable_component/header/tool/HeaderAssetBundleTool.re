let buildSelectTreeForGenerateSingleRAB = HeaderAssetBundle.Method.buildSelectTreeForGenerateSingleRAB;

let buildGenerateSingleRABModal =
    (
      ~selectTree,
      ~send,
      ~languageType=LanguageEditorService.unsafeGetType
                    |> StateLogicService.getEditorState,
      (),
    ) =>
  HeaderAssetBundle.Method.renderGenerateSingleRABModal(
    languageType,
    selectTree,
    send,
  );