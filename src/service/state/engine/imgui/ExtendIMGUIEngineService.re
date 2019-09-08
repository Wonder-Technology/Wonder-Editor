open Wonderjs;

let createAllCustomStyleData = ExtendIMGUIAPI.createAllCustomStyleData;

let createDefaultButtonSkinData = ExtendIMGUIAPI.createDefaultButtonSkinData;

let createEmptyCustomControlFunc = () =>
  (. _, _, _, imguiRecord) => (imguiRecord, Obj.magic(Js.Nullable.null));

let unsafeGetCustomControlFunc = ExtendIMGUIAPI.unsafeGetCustomControl;

let hasCustomControl = ExtendIMGUIAPI.hasCustomControl;

let registerCustomControl = ExtendIMGUIAPI.registerCustomControl;

let removeCustomControl = ExtendIMGUIAPI.removeCustomControl;

let updateCustomControl =
    (
      oldCustomControlName,
      newCustomControlName,
      func: ExtendIMGUIType.customControlFunc,
      engineState,
    ) =>
  engineState
  |> removeCustomControl(oldCustomControlName)
  |> registerCustomControl(newCustomControlName, func);

let createAllCustomStyleData = ExtendIMGUIAPI.createAllCustomStyleData;

let createSingleCustomStyleData = ExtendIMGUIAPI.createSingleCustomStyleData;

let addCustomStyleData = ExtendIMGUIAPI.addCustomStyleData;

let removeCustomStyleData = ExtendIMGUIAPI.removeCustomStyleData;

let addSingleCustomStyleData = ExtendIMGUIAPI.addSingleCustomStyleData;

let removeSingleCustomStyleData = ExtendIMGUIAPI.removeSingleCustomStyleData;

let createSkinData = ExtendIMGUIAPI.createSkinData;

let createDefaultSkinData = ExtendIMGUIAPI.createDefaultSkinData;

let hasSkinData = ExtendIMGUIAPI.hasSkinData;

let addSkinData = ExtendIMGUIAPI.addSkinData;

let removeSkinData = ExtendIMGUIAPI.removeSkinData;

let updateSkinData =
    (
      oldSkinName,
      newSkinName,
      buttonSkinData,
      allCustomStyleData,
      engineState,
    ) =>
  engineState
  |> removeSkinData(oldSkinName)
  |> addSkinData(newSkinName, {buttonSkinData, allCustomStyleData});

let unsafeGetSkinData = ExtendIMGUIAPI.unsafeGetSkinData;

let createButtonSkinData = ExtendIMGUIAPI.createButtonSkinData;