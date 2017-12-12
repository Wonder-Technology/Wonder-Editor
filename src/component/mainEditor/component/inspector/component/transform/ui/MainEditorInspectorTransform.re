type state = {
  isDirty: bool,
  defaultX: string,
  defaultY: string,
  defaultZ: string
};

type action =
  | MarkDirty;

let _getLocalPosition = () =>
  MainEditorStateView.prepareState()
  |> MainEditorComponentView.InspectorView.TransformView.getLocalPosition;

let _setLocalPosition = (x, y, z) =>
  MainEditorStateView.prepareState()
  |> MainEditorComponentView.InspectorView.TransformView.setLocalPosition((x, y, z))
  |> MainEditorStateView.finishState;

let component = ReasonReact.reducerComponent("MainEditorInspectorTransform");

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  let changeX = (value) => {
    let (x, y, z) = _getLocalPosition();
    _setLocalPosition(value, y, z);
    MarkDirty
  };
  let changeY = (value) => {
    let (x, y, z) = _getLocalPosition();
    _setLocalPosition(x, value, z);
    MarkDirty
  };
  let changeZ = (value) => {
    let (x, y, z) = _getLocalPosition();
    _setLocalPosition(x, y, value);
    MarkDirty
  };
  {
    ...component,
    initialState: () => {
      let (defaultX, defaultY, defaultZ) = _getLocalPosition();
      {
        isDirty: false,
        defaultX: string_of_float(defaultX),
        defaultY: string_of_float(defaultY),
        defaultZ: string_of_float(defaultZ)
      }
    },
    reducer: (action, state) =>
      switch action {
      | MarkDirty => ReasonReact.Update({...state, isDirty: true})
      },
    render: ({state, reduce}) =>
      <div key="transform" className="transform-component">
        <FloatInput label="X" defaultValue=state.defaultX onChange=(reduce(changeX)) />
        <FloatInput label="Y" defaultValue=state.defaultY onChange=(reduce(changeY)) />
        <FloatInput label="Z" defaultValue=state.defaultZ onChange=(reduce(changeZ)) />
      </div>
  }
};


/* var MarkDirty = createType("MarkDirty");


    function initialState() {
      return {
        isDirty: false,
        defaultX: 1.1,
        defaultY: 2.2,
        defaultZ: 3.3
      }
    }



    function reducer(action, update, buildStateFunc, state) {
switch(getActionType(action)){
case MarkDirty:

}

/* {...state, isDirty: true} */


    }




    funcObj.reducer(action, ReasonReact.Update, state);


let loadUserUIPanel =(json, funcObj) => {
  /* loadUIJson 
  loadUIScript
 |>  */


(~state: AppStore.appState, _children) => {
  ...component,
  didMount: (_self) => {
    funcObj.didMout(_self);
  },
    initialState: () => {

  let stateJsObj =  funcObj.initialState();
 fromJsObj 
  {
        isDirty: stateJsObj##isDirty,
        defaultX: 1.1,
        defaultY: 2.2,
        defaultZ: 3.3

  }
    },


    reducer: (action, state) =>


    funcObj.reducer(action, ReasonReact.Update, (newStateValue) =>{
{
  ...state,
isDirty: newStateValue##isDirty
}
    }, state);



      switch action {
      | MarkDirty => ReasonReact.Update({...state, isDirty: true})
      },










  render: (_self) =>

    user.render(_self);

    /* <div key="mainEditor" className="mainEditor-component">
      <div className="vertical-component">
        <canvas key="webGL" id="webgl" />
      </div>
    </div> */

(
          ReasonReact.arrayToElement(
            ParseSystem.buildSpecificComponents(
              "main_editor",
              state,
              BuildMainEditorComponent.buildComponentByName
            )
          )
        )



} */