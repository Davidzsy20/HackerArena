import React, {Component} from 'react';
// import PropTypes from'prop-types';
// import { List } from 'immutable';
// import mapDispatchToProps from './actions';
import SimpleWebRTC from 'simplewebrtc';
import{ connect} from 'react-redux';
import '../../Styles/Webrtc.css';
// import fire from '../../Firebase/firebase';

// import shouldPureComponentUpdate from 'react-pure-render/function';

class Webrtc extends Component {
  constructor(props){
    super(props);
    this.state = {
      muted: false,
      paused: false
    }
  }
   componentDidMount() {
    //    const{onReady} =this.props
    const {room } = this.props;
        const webrtc = new SimpleWebRTC({
        localVideoEl: this.refs.local,
        remoteVideosEl: "",
        // remoteVideosEl: '',
        
        autoRequestMedia: false,
        detectSpeakingEvents: true,
      });

    webrtc.on('videoAdded', function (video, peer) {
      console.log('video added', peer);
      var remotes = document.getElementById('remoteVideo');
        if (remotes) {
          var container = document.createElement('div');
            container.className = 'videoContainer';
            container.id = 'container_' + webrtc.getDomId(peer);
            container.appendChild(video);

            // suppress contextmenu
            video.oncontextmenu = function () { return false; };

            remotes.appendChild(container);
        }
    });

    webrtc.on('videoRemoved', function(video,peer) {
      console.log('video removed', peer);
      // var removedVideo = document.getElementById('container_' + webrtc.getDomId(peer));
      Element.prototype.getElementById = function(id) {
        return document.getElementById(id);
    }
      document.getElementById('remoteVideo').getElementById('container_' + webrtc.getDomId(peer)).remove();
    })
    //   this.webrtc = webrtc;
      webrtc.on('readyToCall', function () {
        // you can name it anything
      webrtc.joinRoom(`spectator/${room.key}`);
    });
    this.webrtc = webrtc;
    console.log('video object', this.refs.remote);
    }

componentWillReceiveProps(nextProps) {
console.log('video object', this.refs.remote);
}
// shouldComponentUpdate = shouldPureComponentUpdate;
mute(){
  if(this.state.muted){
    this.webrtc.unmute();
    this.setState({muted: false});
  } else {
    this.webrtc.mute();
    this.setState({muted: true});
  }
}
pause(){
  if(this.state.paused){
    this.webrtc.resumeVideo();
    document.getElementById('localVideo').style.display = "flex";    
    this.setState({paused:false});
  } else {
    this.webrtc.pause();
    document.getElementById("localVideo").style.display = "none";
      
    this.setState({paused:true});
  }
  console.log(this.webrtc);
}
startVideo () {
this.webrtc.startLocalVideo();
}
render() {
return (
    <div className ='stream'>  
    <div ref='remotes' id ='remoteVideo'>
      <div className="videoContainer">
        <video  ref='local' id = 'localVideo'/>
      </div>
    </div>
      <button onClick={this.mute.bind(this)}>Mute Audio</button>
      <button onClick={this.pause.bind(this)}>Toggle Camera</button>
      <button onClick = {this.startVideo.bind(this)}>startVideo</button>

    </div>
)

}
}

const mapStateToProps =(state)=> ({
    room : state.gameRooms ? state.gameRooms[state.router.location.pathname.split('/')[2]] : null,   
})
export default connect(mapStateToProps)(Webrtc);