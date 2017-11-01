import React from 'react';

import TopSecret from '../Containers/TopSecret';
import * as THREE from 'three'
import AR from '../Containers/Ar.js';

class Random extends React.Component {
  constructor(props) {
    super(props)
  this.state = {
    showAr : false
  }
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
  }

  componentDidMount() {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: '#433F81' })
    const cube = new THREE.Mesh(geometry, material)

    camera.position.z = 4
    scene.add(cube)
    renderer.setClearColor('#000000')
    renderer.setSize(width, height)

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.material = material
    this.cube = cube

    this.mount.appendChild(this.renderer.domElement)
    this.start()
    this.click = this.click.bind(this)
  }

  componentWillUnmount() {
    this.stop()
    if(this.state.showAr ===true) {
    this.mount.removeChild(this.renderer.domElement)

    }
    }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId)
  }

  animate() {
    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }
click() {
  if(this.state.showAr ===true) {this.setState({showAr: false})}
 else{this.setState({showAr:true})}

}

  render() {
    if(this.state.showAr === true) {
      
      return(  <div><button onClick={()=>this.click()}>Show cubeNana</button>
       <AR/></div>)
    }
    else{
    return (
      <div style={{display: "flex"}}>
      <div
        style={{ width: '400px', height: '400px' }}
        ref={(mount) => { this.mount = mount }}
      />
        <TopSecret style={{width: '400px', height: '400px'}}/>
       
       <button onClick={()=>this.click()}>Show Ar</button>       
        </div>
    )
  }
}
}

export default Random