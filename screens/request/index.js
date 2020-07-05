import React, {Component, useState } from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {} from '@config/validators.js';
import {} from '@config/messages.js';
import TouchableCustom from '@config/touchable_custom.js';
import styles from './register.style.js';

export default class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading: true,
            
            isVerifiedData : true,

        }
    }
    generateToken(){
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
        }, function(){}
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

      if(this.state.name && this.state.password && this.state.email && this.state.phoneNumber && !this.state.nameError && !this.state.passwordError && !this.state.emailError && this.state.phoneNumberError){
        this.setState({isVerifiedData : true})
      }
      else{
        this.setState({isVerifiedData : false})
      }
    }

    render(){
      const {name, password, email, phoneNumber, nameError, passwordError, emailError, phoneNumberError, isVerifiedData} = this.state
        return(
            <View style = {styles.registerPageContainer}>
                <TextField
                  label = "Name"
                  labelHeight = {15}
                  value = {name}
                  onChangeText = { (name) => this.validate('name', name)}
                  error = {nameError}
                  returnKeyType = "next"
                  fontSize = {12}
                  onSubmitEditing = {()=>this._next()}
                  blurOnSubmit = {false}
                />
                <TextField
                  label = "Email"
                  labelHeight = {15}
                  value = {email}
                  onChangeText = { (email) => this.validate('email', email)}
                  error = {emailError}
                  returnKeyType = "next"
                  fontSize = {12}
                  onSubmitEditing = {()=>this._next()}
                  blurOnSubmit = {false}
                />
                <TextField
                  label = "Phone Number"
                  labelHeight = {15}
                  value = {phoneNumber}
                  onChangeText = { (phoneNumber) => this.validate('phoneNumber', phoneNumber)}
                  error = {phoneNumberError}
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
                  <View pointerEvents = {() => isVerifiedData ? "auto": "none"} style = {isVerifiedData? styles.signUpButton : styles.signUpButtonDisabled}>
                    <Text style = {styles.signUpButtonText}>Sign Up</Text>
                  </View>
                </TouchableCustom>
            </View>
        )
    }
}
