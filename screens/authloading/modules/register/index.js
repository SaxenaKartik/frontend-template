import React, {Component, useState } from 'react';
import {View, Text, TextInput, Button, Image, ToastAndroid, KeyboardAvoidingView, Keyboard, Animated} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {validateMobile, validatePassword, validateEmail, validateName} from '@config/validators.js';
import {nameErrorMsg, passwordErrorMsg, emailErrorMsg, phoneNumberErrorMsg} from '@config/messages.js';
import TouchableCustom from '@config/touchable_custom.js';
import styles from './register.style.js';
import {primaryColor, deviceHeight} from '@config/environments.js';

export default class Register extends Component{
    constructor(props){
        super(props);
        this.imageHeight = new Animated.Value(deviceHeight-500);
        this.state={
            isLoading: true,
            name : "",
            password : "",
            email : "",
            phoneNumber : "",
            nameError : "",
            passwordError : "",
            emailError : "",
            phoneNumberError : "",
            isVerifiedData : false,

        }
    }

    static navigationOptions = {
      title : "Register"
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
          toValue: deviceHeight-650,
        }).start();
    };

    keyboardDidHide = (event) => {
        Animated.timing(this.imageHeight, {
          useNativeDriver : false,
          duration: event.duration,
          toValue: deviceHeight-500,
        }).start();
    };

    showToast(){
      ToastAndroid.show("Please enter valid details", ToastAndroid.SHORT);
    };
    showToastFailure(){
      ToastAndroid.show("User could not be registered", ToastAndroid.SHORT);
    };
    sendRequest(){
        return fetch("http://ec2-13-235-23-66.ap-south-1.compute.amazonaws.com/api/user/"
        ,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
              // removing trailing and leading white spaces
                name : this.state.name.replace(/^\s+|\s+$/g, ''),
                email : this.state.email.replace(/^\s+|\s+$/g, ''),
                phone_no : "+91" + this.state.phoneNumber.replace(/^\s+|\s+$/g, ''),
                password : this.state.password,
            })
        }
    )
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          isLoading: false,
          dataSource : responseJson.id
        }, function(){
          // make post request to login API and store the auth token & id
            this.state.dataSource ? this.props.navigation.navigate('Homepage') : this.showToastFailure()
        }
        );
      })
      .catch((error) =>{
        console.error(error);
      });
    }

    async validate(type, data){
      if(type=='phoneNumber'){
        await this.setState({phoneNumber : data});
        !validateMobile(data)? this.setState({[`${type}Error`]: phoneNumberErrorMsg}) : this.setState({[`${type}Error`]: ""})
      }
      else if(type=='password'){
        await this.setState({password : data});
        !validatePassword(data)? this.setState({[`${type}Error`]: passwordErrorMsg}) : this.setState({[`${type}Error`]: ""})
      }
      else if(type=="name"){
        await this.setState({name : data});
        !validateName(data)? this.setState({[`${type}Error`] : nameErrorMsg}) : this.setState({[`${type}Error`]: ""})
      }

      else if(type=="email"){
        await this.setState({email : data});
        !validateEmail(data)? this.setState({[`${type}Error`] : emailErrorMsg}) : this.setState({[`${type}Error`]: ""})
      }

      if(this.state.name && this.state.password && this.state.email && this.state.phoneNumber && !this.state.nameError && !this.state.passwordError && !this.state.emailError && !this.state.phoneNumberError){
        this.setState({isVerifiedData : true})
      }
      else{
        this.setState({isVerifiedData : false})
      }
    }

    // _next() {
    //   this._inputs[field] && this._inputs[field].focus();
    // }

    render(){
      const {name, password, email, phoneNumber, nameError, passwordError, emailError, phoneNumberError, isVerifiedData} = this.state
      const {navigation} = this.props
        return(
            <KeyboardAvoidingView style = {styles.registerPageContainer} behaviour = "padding">
              <View style = {styles.imageContainer}>
                <Animated.Image style = {[styles.logo, {height : this.imageHeight}]} source = {require("@assets/logo.png")} resizeMode = "contain"/>
              </View>
              <TextField
                label = "Name"
                tintColor = {primaryColor}
                labelHeight = {15}
                value = {name}
                onChangeText = { (name) => this.validate('name', name)}
                error = {nameError}
                returnKeyType = "next"
                fontSize = {16}
                onSubmitEditing = {()=>{this.secondTextInput.focus();}}
                // onSubmitEditing = {()=>this._next('one')}
                blurOnSubmit = {false}
              />
              <TextField
                label = "Email"
                tintColor = {primaryColor}
                labelHeight = {15}
                value = {email}
                onChangeText = { (email) => this.validate('email', email)}
                error = {emailError}
                ref =  {(input) => { this.secondTextInput = input; }}
                // inputRef = {ref => {this._inputs['one'] = ref}}
                returnKeyType = "next"
                fontSize = {16}
                onSubmitEditing = {()=>{this.thirdTextInput.focus();}}
                // onSubmitEditing = {()=>this._next('two')}
                blurOnSubmit = {false}
              />
              <TextField
                label = "Phone Number"
                tintColor = {primaryColor}
                labelHeight = {15}
                value = {phoneNumber}
                onChangeText = { (phoneNumber) => this.validate('phoneNumber', phoneNumber)}
                error = {phoneNumberError}
                ref = {(input) => { this.thirdTextInput = input; }}
                // inputRef = {ref => {this._inputs['two'] = ref}}
                returnKeyType = "next"
                fontSize = {16}
                onSubmitEditing = {()=>{this.fourthTextInput.focus();}}
                // onSubmitEditing = {()=>this._next('three')}
                blurOnSubmit = {false}
                prefix = "+91"
              />
              <TextField
                label = "Password"
                tintColor = {primaryColor}
                labelHeight = {15}
                value = {password}
                onChangeText = { (password) => this.validate('password', password)}
                error = {passwordError}
                fontSize = {16}
                secureTextEntry = {true}
                ref = {(input) => { this.fourthTextInput = input; }}
                // inputRef = {ref => {this._inputs['three']}}
                autoComplete = {false}
                autoCapitalize = "none"
                returnKeyType = "done"
                blurOnSubmit = {true}
              />
              <View style = {styles.buttonContainer}>
                <TouchableCustom underlayColor = {'ffffff10'} onPress={()=> isVerifiedData ? this.sendRequest() : this.showToast()}>
                  <View style = {isVerifiedData? styles.signUpButton : styles.signUpButtonDisabled}>
                    <Text style = {styles.signUpButtonText}>Sign Up</Text>
                  </View>
                </TouchableCustom>
                <View style = {styles.linkContainer}>
                  <Text> Already have an account?</Text>
                  <TouchableCustom underlayColor = {'ffffff10'} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link} > Sign In</Text>
                  </TouchableCustom>
                </View>
              </View>
              <View style={{ flex : 1 }} />
            </KeyboardAvoidingView>
        )
    }
}
