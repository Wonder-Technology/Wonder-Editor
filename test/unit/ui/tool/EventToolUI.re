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
    "dataTransfer": {
      "effectAllowed": "move",
      "setData": (key, value) => {
        Js.log(value);
        dragedId := value;
        Js.log(dragedId)
      },
      "getData": (key) => dragedId^
    }
  }
  |> Obj.magic;

let _getProps = (dom) => dom##props;

let triggerClickEvent = (dom) => _getProps(dom)##onClick();

let triggerChangeEvent = (dom, event) => _getProps(dom)##onChange(event);

let triggerDragStartEvent = (dom, event) => _getProps(dom)##onDragStart(event);

let triggerDragEnterEvent = (dom, event) => _getProps(dom)##onDragEnter(event);

let triggerDropEvent = (dom, event) => _getProps(dom)##onDrop(event);