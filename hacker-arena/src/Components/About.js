import React from 'react';
import video from "video.js"
import '../Styles/About.css';
import * as THREE from 'three';

const About = (props) => {  
  var material = new THREE.MeshBasicMaterial({ wireframe: true });
  var geometry = new THREE.PlaneGeometry();
  var planeMesh= new THREE.Mesh( geometry, material );
console.log(geometry,planeMesh);
    
  return (
  <div>
    
    <h2>This is a game for coders to compete against each other!</h2>
    {/* <video className ="video" autoPlay muted loop>
    <source src="https://www.dropbox.com/s/nzk09kfbcxv9cqq/We-Work-We-Wait.mp4?raw=1" type="video/mp4"/>
    </video> */}

  </div>
)};

export default About;