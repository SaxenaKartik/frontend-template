import React,{Component} from 'react';
import {View, Text, Button} from 'react-native';
import TouchableCustom from '@config/touchable_custom.js';
import styles from './homepage.style.js';

export default class Homepage extends Component{
    render(){
      const {navigation} = this.props
        return(
          <View style = {styles.homePageContainer}>
            <View style = {styles.buttonLink}>
              <TouchableCustom underlayColor = {'ffffff10'} onPress={()=> navigation.navigate('Request')}>
                <View style = {styles.requestButton}>
                  <Text style = {styles.requestButtonText}>Create Request</Text>
                </View>
              </TouchableCustom>
            </View>
          </View>
        )
    }
}
