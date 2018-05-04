import React, { Component } from 'react';  
import {  
    AppRegistry,  
    StyleSheet,  
    Text,  
    View,  
    TouchableOpacity  
} from 'react-native';  

let BceAuth = require('./bceAuth/auth.js');
let querystring = require('query-string');
let moment = require('moment');
moment.locale('zh-cn');

var ak = '558e0647913e459686f660991bdc5b72';
var sk = 'a2b1117109ac43c6953b06ae2795ba79';

var params = {
    source : "http://www.sitvs.com:15414/vod/movie/heibao.mp4"
};
var formatDate = moment().utc().format('YYYY-MM-DDTHH:mm:ssZ');
var headers = {
    "x-bce-date": formatDate,
    'content-type': 'application/json; charset=utf-8',
    'host': "vca.bj.baidubce.com"
};
var method = "GET";
var url = "http://vca.bj.baidubce.com";
var paths = "/v2/media";

function checkStatus(response){
    console.log('response.status = ' + response.status);
	if(response.status >= 200 && response.status < 300){
		return response.json();
	} else {
		let error = new Error(response.statusText);
		error.response = response;
		throw error;
	}
}

function parseJSON(data){
    console.log('data.source = ' + data.source);
    console.log('data = ' + data );

    return data;
}

class VcaMethod extends Component{  
    getRequest(url){  
        console.log('url = ' + url);
        try{
			var auth = new BceAuth(ak, sk);
			var authorization = auth.generateAuthorization(method, paths, params, headers);
			console.log('authorization = ' + authorization);
			headers.authorization = authorization;
            headers.path = paths + "?" + querystring.stringify(params),

		 	fetch(url + headers.path, {
				headers: headers
			})
			.then(checkStatus)
			.then(parseJSON)
		}catch(e){
			alert(e);
			//throw new Error('get error');
		}
    }  
    postRequest(url){  
        let formData = new FormData();  
        formData.append("username","SuperBigLw");  
        formData.append("password","123456");  
        var opts = {  
            method:"POST",  
            body:formData  
        }  
        fetch(url,opts)  
            .then((response) => {  
                return response.text();  
            })  
            .then((responseText) => {  
                alert(responseText);  
            })  
            .catch((error) => {  
                alert(error)  
            })  
    }  
    render(){  
        return(  
            <View style={styles.container}>  
                <TouchableOpacity onPress={this.getRequest.bind(this,url)}>  
                    <View style={styles.btn}>  
                        <Text>GET</Text>  
                    </View>  
                </TouchableOpacity>  
                <TouchableOpacity onPress={this.postRequest.bind(this,url)}>  
                    <View style={styles.btn}>  
                        <Text>POST</Text>  
                    </View>  
                </TouchableOpacity>  
            </View>  
        );  
    }  
}  

const styles = StyleSheet.create({  
    container:{  
        backgroundColor:"cyan",  
        flexDirection:"row",  
        justifyContent:"space-around",  
        alignItems:"center",  
        flex:1  
    },  
    btn:{  
        width:60,  
        height:30,  
        borderWidth:1,  
        borderRadius:3,  
        borderColor:"black",  
        backgroundColor:"yellow",  
        justifyContent:"center",  
        alignItems:"center"  

    }  
});  

module.exports = VcaMethod;  