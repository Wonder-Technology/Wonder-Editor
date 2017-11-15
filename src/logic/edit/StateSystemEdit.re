open StateDataEditType;

/* todo fix */
let createState = () => {a: 1};

let getState = (data) => Js.Option.getExn(data.state);

let setState = (data, state) => {
  data.state = Some(state);
  state
};