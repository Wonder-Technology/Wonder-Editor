let unsafeGetButtonSkinData = (skinName, engineState) =>
  ExtendIMGUIEngineService.unsafeGetSkinData(skinName, engineState).
    buttonSkinData;

let unsafeGetAllCustomStyleData = (skinName, engineState) =>
  ExtendIMGUIEngineService.unsafeGetSkinData(skinName, engineState).
    allCustomStyleData;