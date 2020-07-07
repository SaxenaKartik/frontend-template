import {StyleSheet} from 'react-native';
import {primaryColor, secondaryColor, deviceWidth, deviceHeight, commonBackgroundColor} from '@config/environments.js'


export default styles = StyleSheet.create({
  loginPageContainer : {
    backgroundColor : commonBackgroundColor,
    flex : 1,
    display : "flex",
    justifyContent : "center",
  },
  signInButtonDisabled :  {
    backgroundColor : secondaryColor,
    borderRadius : 30,
    marginTop : 25,
    height : 55,
    justifyContent : "center",
    alignItems : "center",
    width : deviceWidth-150,
  },
  signInButton :  {
    backgroundColor : primaryColor,
    borderRadius : 30,
    marginTop : 25,
    height : 55,
    justifyContent : "center",
    alignItems : "center",
    width : deviceWidth-150,
  },
  signInButtonText : {
    color : '#ffffff',
    fontSize : 12,
  },
  buttonLink : {
    display : "flex",
    alignItems: "center",
    justifyContent : "center",
  }
})
