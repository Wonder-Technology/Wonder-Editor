open MessageType;

let removeMessage = (message, editorState) => {
  let editorState =
    editorState |> MessageArrayUIEditorService.removeMessage(message);

  MessageService.getMessageId(message.id)
  |> DomHelper.getElementById
  |> DomHelper.removeChild(DomHelper.getElementById("appMessage"));

  editorState;
};

let endShowMessage = editorState => {
  let editorState =
    editorState |> IsHasMessageUIEditorService.setIsHasMessage(false);

  editorState
  |> IntervalIdUIEditorService.getIntervalId
  |> Timeout.clearInterval;

  editorState;
};

let startShowMessage = editorState => {
  let intervalId =
    Timeout.setInterval(
      () => {
        let editorState = StateEditorService.getState();
        let messageArray =
          editorState |> MessageArrayUIEditorService.getMessageArray;

        let editorState =
          messageArray |> ArrayService.hasItem ?
            messageArray
            |> WonderCommonlib.ArrayService.reduceOneParam(
                 (. editorState, {isActive} as message) =>
                   isActive ?
                     editorState : removeMessage(message, editorState),
                 editorState,
               ) :
            endShowMessage(editorState);

        editorState |> StateEditorService.setState;
      },
      1000,
    );

  editorState |> IntervalIdUIEditorService.setIntervalId(intervalId);
};

let addMessage = (message, editorState) => {
  let editorState =
    MessageArrayUIEditorService.addMessage(message, editorState);

  message
  |> MessageService.addMessageIntoSpecificDom
  |> MessageService.showMessageWithinTime;

  editorState |> IsHasMessageUIEditorService.getIsHasMessage ?
    editorState :
    editorState
    |> IsHasMessageUIEditorService.setIsHasMessage(true)
    |> startShowMessage;
};

let _buildMessageWithMessageType = (info, time, type_, editorState) => {
  let (editorState, newId) = IdUIEditorService.generateNodeId(editorState);

  editorState
  |> addMessage(MessageService.buildMessage(newId, type_, info, time));
};

let log = (info, time, editorState) =>
  editorState |> _buildMessageWithMessageType(info, time, Log);

let warn = (info, time, editorState) =>
  editorState |> _buildMessageWithMessageType(info, time, Warn);

let error = (info, time, editorState) =>
  editorState |> _buildMessageWithMessageType(info, time, Error);

let info = (info, time, editorState) =>
  editorState |> _buildMessageWithMessageType(info, time, Info);