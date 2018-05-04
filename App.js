/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';
import Video from 'react-native-video';

// var vcaData = require("./src/vca_method");  
// var vcaVideo = require('./src/video');

let BceAuth = require('./src/bceAuth/auth.js');
let querystring = require('query-string');
let moment = require('moment');
moment.locale('zh-cn');
var ak = '558e0647913e459686f660991bdc5b72';
var sk = 'a2b1117109ac43c6953b06ae2795ba79';
var mediaUrl = 'http://www.sitvs.com:15414/vod/movie/heibao.mp4';
var params = {
    source : mediaUrl
};
var formatDate = moment().utc().format('YYYY-MM-DDTHH:mm:ssZ');
var headers = {
    "x-bce-date": formatDate,
    'content-type': 'application/json; charset=utf-8',
    'host': "vca.bj.baidubce.com"
};
var method = "GET";
var host = "http://vca.bj.baidubce.com";
var paths = "/v2/media";
var vcaIsFinish = false;

function checkStatus(response){
    console.log('response.status = ' + response.status);
  if(response.status >= 200 && response.status < 300){
    return response.json();
  } else {
    alert(response.status);
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(data){
    console.log('data.source = ' + data.source);
    console.log('data.status = ' + data.status );
    if(data.status === 'FINISHED' ){
      vcaIsFinish = true;
    }
    var results = data.results;
    console.log('results.length = ' + results.length );
    
    results.forEach(function(object){
      console.log('object.type = ' + object.type);
      // console.log('typeof v = ' + typeof v);
    })
    return data;
}

function getRequest(url){  
  console.log('url = ' + url);
  try{
    var auth = new BceAuth(ak, sk);
    var authorization = auth.generateAuthorization(method, paths, params, headers);
    console.log('authorization = ' + authorization);
    headers.authorization = authorization;
    headers.path = paths + "?" + querystring.stringify(params),

    fetch(host + headers.path, {
      headers: headers
    })
    .then(checkStatus)
    .then(parseJSON)
  }catch(e){
    alert(e);
      //throw new Error('get error');
  }
} 

var mediaData = getRequest(params['source']);

export default class App extends Component<Props> {
  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    paused: false,
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
    //console.log('onProcess! data.currentTime = ' + data.currentTime);
    this.setState({ currentTime: data.currentTime });
  };

  onEnd = () => {
    console.log('onEnd');
    //this.player.seek(0);
  };

  onBuffer = () =>{
    console.log('onBuffer');
  };

  onTimedMetadata = () =>{
    console.log('onTimedMetadata');
  };

  render() {
    return (
      // <View style={styles.container}>
      //   <Text style={styles.welcome}>
      //     Welcome to React Native!
      //   </Text>
      //   <Text style={styles.instructions}>
      //     To get started, edit App.js
      //   </Text>
      //   <Text style={styles.instructions}>
      //     {instructions}
      //   </Text>
      // </View>
      
      // <VcaData/>
      
      <View style={{flex:1}}>
        <View style={{flex:1, backgroundColor: '#F50000'}}>  
          <Video
              ref={(ref: Video) => { this.video = ref }}
              /* For ExoPlayer */
              source={{uri:mediaUrl}}
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
       
        <View style={{flex:1, backgroundColor: '#F5FCFF'}}>
          <WebView
            automaticallyAdjustContentInsets={false}
            style={styles.webView}
            source={{uri: "http://www.baidu.com"}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            decelerationRate="normal"
            onNavigationStateChange={this.onNavigationStateChange}
            onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
            startInLoadingState={true}
            scalesPageToFit={this.state.scalesPageToFit}
          />
        </View>
       
      </View>  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },  
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
