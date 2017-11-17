open WonderCommonlib;

let findAtomComponent = (name: string) =>
  AtomComponent.atomRecord
  |> Js.Array.filter((atom: AtomParseType.atomComponent) => atom.name === name);

let log = (value) => Js.log(value);

let matchRecordProp = (component: ComposableParseType.composableComponent, atomName) =>
  ComposableParseType.(
    component.props
    /*todo change name to findItemByName,add ensure func */
    |> Js.Array.filter((props: props) => props.name == atomName)
    /* |> Js.Array.map((props: ComposableParseType.props) => props.value) */
    |> (
      (propsArray: Js.Array.t(ComposableParseType.props)) =>
        switch (propsArray |> Js.Array.length) {
        | 0 => None
        | _ =>
          Some(
            propsArray[0]
            |> (
              ({name, value, type_}) =>
                switch type_ {
                | "string" => Obj.magic(value)
                | "function" =>
/* appMap |> WonderCommonlib.HashMapSystem.get(name) */
                  switch (
                    /* WonderCommonlib.HashMapSystem.createEmpty() */
                    WonderCommonlib.HashMapSystem.createEmpty()
                    |> WonderCommonlib.HashMapSystem.get(name)
                  ) {
                  | None =>
                    /* ExcepetionHandleSystem.throwMessage(
                         {j|function:$name should exist in map|j}
                       ) */
                    Obj.magic(log)
                  | Some(func) => Obj.magic(func)
                  }
                | _ =>
                  ExcepetionHandleSystem.throwMessage(
                    {j|type:$type_ should exist the propsArray|j}
                  )
                }
            )
          )
        }
    )
  );

let makeComponentArgument =
    (
      component: ComposableParseType.composableComponent,
      atomList: Js.Array.t(AtomParseType.atomComponent)
    ) =>
  atomList
  |> Js.Array.map(
       (atom: AtomParseType.atomComponent) =>
         atom.existProps
         |> (
           (propsArray) =>
             propsArray
             |> Array.map((prop: AtomParseType.prop) => prop.name |> matchRecordProp(component))
         )
     )
  |> ArraySystem.flatten
  |> DebugUtils.log
  |> ((atomArray) => atomArray |> BuildComponent.buildComponentByName(component.name));

let parseSystem = (component: ComposableParseType.composableComponent) : ReasonReact.reactElement =>
  component.name |> findAtomComponent |> makeComponentArgument(component);