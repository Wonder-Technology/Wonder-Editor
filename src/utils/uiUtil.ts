export const setReactComponentName = (reactComponent: any, componentName: string) => {
    reactComponent.name_for_component = componentName;
};

export const getReactComponentName = (reactComponent: any) => {
    return reactComponent.prototype.constructor.name_for_component;
};

