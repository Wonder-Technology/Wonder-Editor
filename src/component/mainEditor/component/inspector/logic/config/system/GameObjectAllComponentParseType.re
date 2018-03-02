type gameObjectInfo = {
    type_:string
}
and gameObjectComponent = {
    type_:string,
    include_component:array(string),
    exclude_component:array(string),
    all_component:array(gameObjectInfo)
};