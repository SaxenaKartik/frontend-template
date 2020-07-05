import React, {Component, useState } from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {validateMobile, validatePassword} from '@config/validators.js';
import {usernameErrorMsg, passwordErrorMsg} from '@config/messages.js';
import TouchableCustom from '@config/touchable_custom.js';
import styles from './login.style.js';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading: true,
            username : "",
            password : "",
            usernameError : "",
            passwordError : "",
            isVerifiedData : true,

        }
    }
    generateToken(){
        return fetch("http://ec2-13-235-23-66.ap-south-1.compute.amazonaws.com/api/login/"
        ,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
              // removing trailing and leading whitespaces
                username : "+91" + this.state.username.replace(/^\s+|\s+$/g, ''),
                password : this.state.password
            })
        }
    )
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          isLoading: false,
          dataSource : responseJson.token
        }, function(){}
        );
      })
      .catch((error) =>{
        console.error(error);
      });
    }

    async validate(type, data){
      if(type=='username'){
        await this.setState({username : data});
        !validateMobile(data)? this.setState({[`${type}Error`]: usernameErrorMsg}) : this.setState({[`${type}Error`]: ""})
      }
      else if(type=='password'){
        await this.setState({password : data});
        !validatePassword(data)? this.setState({[`${type}Error`]: passwordErrorMsg}) : this.setState({[`${type}Error`]: ""})
      }
      if(this.state.username && this.state.password && !this.state.usernameError && !this.state.passwordError){
        this.setState({isVerifiedData : true})
      }
      else{
        this.setState({isVerifiedData : false})
      }
    }

    _next() {
      this._passwordInput && this._passwordInput.focus();
    }

    render(){
      const {username, password, usernameError, passwordError, isVerifiedData} = this.state
        return(
            <View style = {styles.loginPageContainer}>
                <TextField
                  label = "Phone Number"
                  labelHeight = {15}
                  value = {username}
                  onChangeText = { (username) => this.validate('username', username)}
                  error = {usernameError}
                  returnKeyType = "next"
                  fontSize = {12}
                  onSubmitEditing = {()=>this._next()}
                  blurOnSubmit = {false}
                  prefix = "+91"
                />
                <TextField
                  label = "Password"
                  labelHeight = {15}
                  value = {password}
                  onChangeText = { (password) => this.validate('password', password)}
                  error = {passwordError}
                  returnKeyType = "next"
                  fontSize = {12}
                  secureTextEntry = {true}
                  autoComplete = {false}
                  autoCapitalize = "none"
                  returnKeyType = "done"
                  blurOnSubmit = {true}
                />
                <TouchableCustom underlayColor = {'ffffff10'} onPress={()=> isVerifiedData ? this.generateToken() : null}>
                  <View pointerEvents = {isVerifiedData ? "auto": "none"} style = {isVerifiedData? styles.signInButton : styles.signInButtonDisabled}>
                    <Text style = {styles.signInButtonText}>Login</Text>
                  </View>
                </TouchableCustom>
            </View>
        )
    }
}
