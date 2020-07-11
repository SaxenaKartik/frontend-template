import React, {Component, useState } from 'react';
import {View, Text, TextInput, Button, Image, ToastAndroid, KeyboardAvoidingView, Animated, Keyboard, FlatList} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {validateItems, validateAddr} from '@config/validators.js';
import {itemsErrorMsg, addrErrorMsg} from '@config/messages.js';
import TouchableCustom from '@config/touchable_custom.js';
import styles from './request.style.js';
import {primaryColor} from '@config/environments.js';


export default class Request extends Component{
  constructor(props){
      super(props);
      this.state={
          isLoading: true,
          items : "",
          addr : "",
          details : "",
          itemsError : "",
          addrError : "",
          detailsError : "",
          requests : "",
          isVerifiedData : false,
          // height : 80,
          createRequest : false,

      }
  }

  static navigationOptions = {
    title : "Request"
  }

  UNSAFE_componentWillMount(){
    id = 1 // fetch this from sync storage
    fetch("http://ec2-13-235-23-66.ap-south-1.compute.amazonaws.com/api/request/?user=" + id
    ,{
      method : "GET",
      headers : {
        "Content-Type" : "application/json",
      },
    }
  )
  .then(response => response.json())
  .then((responseJson) => {
    // console.log(responseJson)
    this.setState({
      isLoading: false,
      requests : responseJson
    }, function(){ }
    );
  })
  .catch((error) =>{
    console.error(error);
  });
}

  showToast(){
    ToastAndroid.show("Please enter valid information", ToastAndroid.SHORT);
  };
  sendRequest(){
      return fetch("http://ec2-13-235-23-66.ap-south-1.compute.amazonaws.com/api/request/"
      ,{
          method : "POST",
          headers : {
              "Content-Type" : "application/json",
          },
          body : JSON.stringify({
            // removing trailing and leading white spaces
              items : this.state.items.replace(/^\s+|\s+$/g, ''),
              deliver_addr : this.state.addr.replace(/^\s+|\s+$/g, ''),
              details : this.state.details.replace(/^\s+|\s+$/g, ''),
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
          dataSource ? this.props.navigation.navigate('Request') : this.showToastFailure();
      }
      );
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  async validate(type, data){
    if(type=='items'){
      await this.setState({items : data});
      !validateItems(data)? this.setState({[`${type}Error`]: itemsErrorMsg}) : this.setState({[`${type}Error`]: ""})
    }
    else if(type=='addr'){
      await this.setState({addr : data});
      !validateAddr(data)? this.setState({[`${type}Error`]: addrErrorMsg}) : this.setState({[`${type}Error`]: ""})
    }

    if(this.state.items && this.state.addr && !this.state.itemsError && !this.state.addrError){
      this.setState({isVerifiedData : true})
    }
    else{
      this.setState({isVerifiedData : false})
    }
  }

  // updateSize = (height) => {
  //   this.setState({
  //     height
  //   });
  // }
  //
  // _next() {
  //   this._inputs[field] && this._inputs[field].focus();
  // }

  render(){
    const {items, addr, details, itemsError, addrError, detailsError, isVerifiedData, height, requests} = this.state
    const {navigation} = this.props
    // let newStyle = {
    //   height
    // }
      let re = /\s[0-9]+/gm
      var itemCount = {}
      for(var i = 0; i<requests.length; i++){
        var count = ((requests[i].items || '').match(re) || []).length;
        itemCount[requests[i].id] = count;
      }

      return(
          // <View style = {styles.requestPageContainer}>
          <KeyboardAvoidingView style = {styles.requestKeyboardContainer} behaviour = "padding">
            <View>
              <FlatList
              data={requests}
              keyExtractor = { (item, index) => index.toString() }
              renderItem={({item}) => <Text style={styles.item}> Request #{item.id} Item Count : {itemCount[item.id]} Status : {item.status} </Text>}
              />
            </View>
            <TextField
              style = {[styles.textInput]}
              label = "List of items"
              tintColor = {primaryColor}
              labelHeight = {15}
              value = {items}
              onChangeText = { (items) => this.validate('items', items)}
              keyboardType = 'default'
              autoCorrect  = {false}
              editable = {true}
              placeholder = "Item : Quantity"
              error = {itemsError}
              multiline = {true}
              numberOfLines = {10}
              fontSize = {16}
              onSubmitEditing = {()=>{this.secondTextInput.focus();}}
              blurOnSubmit = {false}
              // onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
            />
            <TextField
              label = "Delivery Address"
              tintColor = {primaryColor}
              labelHeight = {15}
              value = {addr}
              onChangeText = { (addr) => this.validate('addr', addr)}
              error = {addrError}
              ref =  {(input) => { this.secondTextInput = input; }}
              returnKeyType = "next"
              fontSize = {16}
              onSubmitEditing = {()=>{this.thirdTextInput.focus();}}
              blurOnSubmit = {false}
            />
            <TextField
              label = "Details"
              tintColor = {primaryColor}
              labelHeight = {15}
              value = {details}
              onChangeText = { (details) => this.validate('details', details)}
              error = {detailsError}
              fontSize = {16}
              ref = {(input) => {this.thirdTextInput = input; }}
              autoComplete = {false}
              autoCapitalize = "none"
              returnKeyType = "done"
              blurOnSubmit = {true}
            />
            <View style = {styles.buttonContainer}>
              <TouchableCustom underlayColor = {'ffffff10'} onPress={()=> isVerifiedData ? this.sendRequest() : this.showToast()}>
                <View style = {isVerifiedData? styles.requestButton : styles.requestButtonDisabled}>
                  <Text style = {styles.requestButtonText}>Send Request</Text>
                </View>
              </TouchableCustom>
            </View>
            <View style={{ flex : 1 }} />
          </KeyboardAvoidingView>
      )
  }
}
