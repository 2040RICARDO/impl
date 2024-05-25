import {PrimeReactContext} from 'primereact/api';

import React, {useContext, useEffect, useState} from 'react';
import {LayoutContext} from './layoutcontext';


const AppConfig = (props) => {
    const [scales] = useState([12, 13, 14, 15, 16]);
    const {layoutConfig, setLayoutConfig, layoutState, setLayoutState} = useContext(LayoutContext);
    const {setRipple, changeTheme} = useContext(PrimeReactContext);

    const applyScale = () => {
        document.documentElement.style.fontSize = layoutConfig.scale + 'px';
    };

    useEffect(() => {
        applyScale();
    }, [layoutConfig.scale]);

    return (
        <>


        </>
    );
};

export default AppConfig;
