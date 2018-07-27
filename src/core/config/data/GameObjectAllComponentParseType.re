type componentType = {
    type_:string
}

type gameObjectComponent = {
    type_:string,
    include_component:array(string),
    exclude_component:array(string),
    all_component:array(componentType)
};


type componentCategory = {
    type_:string,
    components:array(componentType)
};