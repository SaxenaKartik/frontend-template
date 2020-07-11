import React, {Component, useState } from 'react';
import {View, Text, TextInput, Button, Image, ToastAndroid, Animated, Keyboard, KeyboardAvoidingView} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {validateMobile, validatePassword} from '@config/validators.js';
import {usernameErrorMsg, passwordErrorMsg} from '@config/messages.js';
import TouchableCustom from '@config/touchable_custom.js';
import styles from './login.style.js';
import {primaryColor, deviceHeight} from '@config/environments.js';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.imageHeight = new Animated.Value(deviceHeight-450);
        this.state={
            isLoading: true,
            username : "",
            password : "",
            usernameError : "",
            passwordError : "",
            isVerifiedData : false,
        }
    }

    UNSAFE_componentWillMount(){
      this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
      this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }
    componentWillUnmount(){
      this.keyboardDidShowSub.remove();
      this.keyboardDidHideSub.remove();
    }

    keyboardDidShow = (event) => {
        Animated.timing(this.imageHeight, {
          useNativeDriver : false,
          duration: event.duration,
          toValue: deviceHeight-600,
        }).start();
    };

    keyboardDidHide = (event) => {
        Animated.timing(this.imageHeight, {
          useNativeDriver : false,
          duration: event.duration,
          toValue: deviceHeight-450,
        }).start();
    };

    showToast(){
      ToastAndroid.show("Username or Password may be incorrect", ToastAndroid.SHORT);
    };
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
        }, function(){

          // make get request to user API searching for a user based on phone number and store the auth token & id
            this.state.dataSource ? this.props.navigation.navigate('Homepage') : this.showToast()
         }
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
      const {navigation} = this.props
        return(
            <KeyboardAvoidingView style = {styles.loginPageContainer} behaviour = "padding">
                <View style = {styles.imageContainer}>
                <Animated.Image style = {[styles.logo, {height : this.imageHeight}]} source = {require("@assets/logo.png")} resizeMode = "contain" />
                </View>
                <TextField
                    style = {styles.textField}
                    label = "Phone Number"
                    tintColor = {primaryColor}
                    labelHeight = {15}
                    value = {username}
                    onChangeText = { (username) => this.validate('username', username)}
                    error = {usernameError}
                    returnKeyType = "next"
                    fontSize = {16}
                    onSubmitEditing = {() => { this.secondTextInput.focus(); }}
                    blurOnSubmit = {false}
                    prefix = "+91"
                />
                <TextField
                    style = {styles.textField}
                    label = "Password"
                    tintColor = {primaryColor}
                    labelHeight = {15}
                    value = {password}
                    ref = {(input) => { this.secondTextInput = input; }}
                    onChangeText = { (password) => this.validate('password', password)}
                    error = {passwordError}
                    fontSize = {16}
                    secureTextEntry = {true}
                    autoComplete = {false}
                    autoCapitalize = "none"
                    returnKeyType = "done"
                    blurOnSubmit = {true}
                />
                <View style = {styles.buttonContainer}>
                  <TouchableCustom underlayColor = {'ffffff10'} onPress={()=> isVerifiedData ? this.generateToken() : this.showToast()}>
                    <View style = {isVerifiedData? styles.signInButton : styles.signInButtonDisabled}>
                      <Text style = {styles.signInButtonText}>Login</Text>
                    </View>
                  </TouchableCustom>
                  <View style = {styles.linkContainer}>
                    <Text> Don't have an account?</Text>
                    <TouchableCustom underlayColor = {'ffffff10'} onPress={() => navigation.navigate('Register')}>
                      <Text style={styles.link} >  Sign Up</Text>
                    </TouchableCustom>
                  </View>
                </View>
                <View style={{ flex : 1 }} />
            </KeyboardAvoidingView>
        )
    }
}
