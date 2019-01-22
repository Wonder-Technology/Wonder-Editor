open EditorType;

open HotKeysType;

let unsafeGetHotKeys = ({settingRecord}) =>
  OperateSettingService.unsafeGetHotKeys(settingRecord);

let _preventBrowserHotKeys = event => {
  let e = ReactEventType.convertReactKeyboardEventToJsEvent(event);

  EventHelper.preventDefault(e);
};

let _handleHotKeyFunc = hotKeyDataArray =>
  hotKeyDataArray
  |> Js.Array.forEach(((hotKeys, hotKeyAction)) =>
       hotKeys
       |> Js.Array.joinWith(",")
       |. HotKeysJs.hotkeys((e, handler) => {
            _preventBrowserHotKeys(e);

            let handleFunc =
              OperateHotKeysService.getHandleFuncByHotKeyAction(hotKeyAction);

            handleFunc();
          })
     );

let bindHotKeys = editorState => {
  let hotKeySetting = editorState |> unsafeGetHotKeys;
  [|
    (hotKeySetting.redo, Redo),
    (hotKeySetting.undo, Undo),
    (hotKeySetting.duplicate, Duplicate),
    (hotKeySetting.delete, Delete),
  |]
  |> _handleHotKeyFunc;

  editorState;
};