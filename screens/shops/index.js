import React, {Component, useState } from 'react';
import {View, Text, TextInput, Button} from 'react-native';

export default class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading: true
        }
    }
    render(){
        return(
            <View>
                <Text>Name</Text>
                <TextInput/>
                <Text>Email</Text>
                <TextInput/>
                <Text>Phone No.</Text>
                <TextInput/>
                <Text>Password</Text>
                <TextInput/>
                <Button title = "Sign Up"></Button>
            </View>
        )
    }
}
