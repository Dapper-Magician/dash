
import {IStoreState} from '../store';
import {updateProps, notifyObservers} from '../actions/index'

const observer: IStoreObserverDefinition<IStoreState> = {
    observer: ({dispatch, getState}) => {
        const clientSide_setProps = (updates: {}) => {
            const {paths} = getState()
            Object.entries(updates).forEach(([componentId, props]) => {
                const componentPath = paths.strs[componentId];
                dispatch(
                    updateProps({
                        props,
                        itempath: componentPath
                    })
                );
                dispatch(
                    notifyObservers({id: componentId, props})
                );
            });
        }


        window.dash_clientside = window.dash_clientside || {};
        window.dash_clientside['clientSide_setProps'] = clientSide_setProps
    },
    inputs: ['callbacks.executed']
};

export default observer;
