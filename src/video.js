import React, { Component } from 'react';  
import {  
    AppRegistry,  
    StyleSheet,  
    Text,  
    View,  
    TouchableOpacity  
} from 'react-native';  

import Video from 'react-native-video';

class VcaVideo extends Component{ 
	  state = {
	    rate: 1,
	    volume: 1,
	    muted: false,
	    resizeMode: 'contain',
	    duration: 0.0,
	    currentTime: 0.0,
	    paused: true,
	  };

	  video: Video;

	  onLoadStart = () =>{
	    console.log('onLoadStart');
	  };

	  onLoad = (data) => {
	    console.log('onLoad');
	    this.setState({ duration: data.duration });
	    this.setState({ paused: false });
	  };

	  onProgress = (data) => {
	    console.log('onProcess! data.currentTime = ' + data.currentTime);
	    this.setState({ currentTime: data.currentTime });
	  };

	  onEnd = () => {
	    console.log('onEnd');
	    // this.setState({ paused: true })
	    // this.video.seek(0)
	  };

	  onBuffer = () =>{
	    console.log('onBuffer');
	  };

	  onTimedMetadata = () =>{
	    console.log('onTimedMetadata');
	  };

	
    render(){  
        return(  
            <View style={styles.container}>  
	          <Video
	            ref={(ref: Video) => { this.video = ref }}
	            /* For ExoPlayer */
	            //source={require('./broadchurch.mp4')}
	            source={{uri:'http://www.sitvs.com:15414/vod/movie/heibao.mp4'}}
	            style={styles.fullScreen}
	            rate={this.state.rate}
	            paused={this.state.paused}
	            volume={this.state.volume}
	            muted={this.state.muted}
	            // resizeMode={this.state.resizeMode}
	            onLoadStart={this.onLoadStart}            // Callback when video starts to load
	            onLoad={this.onLoad}                    // Callback when video loads
	            onProgress={this.onProgress}            // Callback every ~250ms with currentTime
	            onEnd={this.onEnd}                      // Callback when playback finishes
	            onBuffer={this.onBuffer}                // Callback when remote video is buffering
	            onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
	            repeat={true}
	          />
            </View>  
        );  
    }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: 'white',
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
});


module.exports = VcaVideo;  