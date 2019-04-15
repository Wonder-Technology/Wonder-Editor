open MessageType;

let getMessageId = id => "message-" ++ string_of_int(id);

let getMessageClassName = () => "message-item";

let getMessageIcon = type_ =>
  switch (type_) {
  | Log => "./public/img/log.png"
  | Info => "./public/img/info.png"
  | Error => "./public/img/error.png"
  | Warn => "./public/img/warn.png"
  };

let buildMessage = (id, type_, info, time) => {
  id,
  type_,
  info,
  time,
  isActive: true,
};

let addMessageIntoSpecificDom = message => {
  let div = DomHelper.createElement("div");
  let info = message.info;
  let imgSrc = getMessageIcon(message.type_);

  DomHelper.innerHtml(div, {j| <img src=$imgSrc />
    <span>$info</span>|j});
  DomHelper.setAttribute(div, "id", getMessageId(message.id));
  DomHelper.setAttribute(div, "class", getMessageClassName());
  DomHelper.appendChild(DomHelper.getElementById("appMessage"), div);

  message;
};

let showMessageWithinTime = message =>
<<<<<<< HEAD
  Timeout.setTimeout(
    () => {
      let editorState = StateEditorService.getState();

      (
        editorState
        |> MessageArrayUIEditorService.getMessageArray
        |> Js.Array.map(item =>
             item == message ? {...message, isActive: false} : item
           )
      )
      ->MessageArrayUIEditorService.setMessageArray(editorState)
      |> StateEditorService.setState;
    },
    message.time,
  );
=======
  Timeout.setTimeout(() => message.isActive = false, message.time);
>>>>>>> origin/mickey
