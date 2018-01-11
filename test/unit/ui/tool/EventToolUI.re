external toObject : Js.Dict.t('a) => Js.t({..}) = "%identity";

let triggerComponentEvent = (component, triggerEventFunc) => {
  let json = ReactTestRenderer.toJSON(component);
  switch (Js.Json.decodeObject(json)) {
  | None => ()
  | Some(dict) => triggerEventFunc(toObject(dict)##children)
  }
};

let buildFormEvent = (value) => {"target": {"value": value}} |> Obj.magic;

let dragedId = ref((-1));

let buildDragEvent = () =>
  {
    "stopPropagation": () => (),
    "preventDefault": () => (),
    "dataTransfer": {
      "effectAllowed": "move",
      "setData": (key, value) => dragedId := value,
      "getData": (key) => dragedId^
    }
  }
  |> Obj.magic;

let _getProps = (dom) => dom##props;

let triggerClickEvent = (dom) => _getProps(dom)##onClick();

let triggerChangeEvent = (dom, event) => _getProps(dom)##onChange(event);

let triggerDragStartEvent = (dom, event) => _getProps(dom)##onDragStart(event);
let triggerDragEndEvent = (dom, event) => _getProps(dom)##onDragEnd(event);

let triggerDragEnterEvent = (dom, event) => _getProps(dom)##onDragEnter(event);

let triggerDragLeaveEvent = (dom, event) => _getProps(dom)##onDragLeave(event);

let triggerDragOverEvent = (dom, event) => _getProps(dom)##onDragOver(event);

let triggerDropEvent = (dom, event) => _getProps(dom)##onDrop(event);