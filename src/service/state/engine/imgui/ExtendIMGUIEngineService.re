open Wonderjs;

let createAllCustomStyleData = ExtendIMGUIAPI.createAllCustomStyleData;

let createDefaultButtonSkinData = ExtendIMGUIAPI.createDefaultButtonSkinData;

let createEmptyCustomControlFunc = () =>
  (. _, _, _, imguiRecord) => (imguiRecord, Obj.magic(Js.Nullable.null));

let hasCustomControl = ExtendIMGUIAPI.hasCustomControl;

let updateCustomControl =
    (
      oldCustomControlName,
      newCustomControlName,
      func: ExtendIMGUIType.customControlFunc,
      state,
    ) =>
  state
  |> ExtendIMGUIAPI.removeCustomControl(oldCustomControlName)
  |> ExtendIMGUIAPI.registerCustomControl(newCustomControlName, func);

let hasSkinData = ExtendIMGUIAPI.hasSkinData;

let addSkinData = ExtendIMGUIAPI.addSkinData;

let removeSkinData = ExtendIMGUIAPI.removeSkinData;

let updateSkinData =
    (oldSkinName, newSkinName, buttonSkinData, allCustomStyleData, state) =>
  state
  |> removeSkinData(oldSkinName)
  |> addSkinData(newSkinName, {buttonSkinData, allCustomStyleData});

let unsafeGetSkinData = ExtendIMGUIAPI.unsafeGetSkinData;