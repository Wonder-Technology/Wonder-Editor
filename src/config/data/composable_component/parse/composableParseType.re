type composableComponent = {
  name: string,
  className: string,
  props: array(props)
}
and props = {
  name: string,
  value: string,
  type_: string
};

type composableMeta = {
  name: string,
  stateName: string
};