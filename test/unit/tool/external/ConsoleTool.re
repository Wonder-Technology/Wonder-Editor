open Sinon;

type console = Sinon.obj;

[@bs.val] external console : console = "";

let getMessage = output => output |> getCall(0) |> getArgs |> List.hd;

let notShowMessage = () =>
  SettingTool.initSetting
  |> StateLogicService.getEditorState
  |> DebugSettingEditorService.setIsShowMessage(false)
  |> StateEditorService.setState
  |> ignore;

let showMessage = () =>
  SettingTool.initSetting
  |> StateLogicService.getEditorState
  |> DebugSettingEditorService.setIsShowMessage(true)
  |> StateEditorService.setState
  |> ignore;

let buildFakeError = [%bs.raw
  sandbox => {|
    sandbox.spy(Error, "captureStackTrace");

    return Error;
  |}
];