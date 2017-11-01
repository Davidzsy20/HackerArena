import { Scene } from 'aframe-react';
import React from 'react';

class AR extends React.Component {

render() {
    return (

         <Scene  artoolkit={{sourceType: 'webcam', trackingMethod: 'best'}}>
    <a-anchor hit-testing-enabled="true">
        <a-entity minecraft minecraft-head-anim="yes" minecraft-body-anim="hiwave" material='opacity: 0.5' />
        <a-box position='0 0 0.5' material='opacity: 0.5;'></a-box>
    </a-anchor>
    <a-camera-static preset="hiro" />
</Scene>)
}
}
export default  AR;


