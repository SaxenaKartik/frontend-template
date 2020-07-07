import {StyleSheet} from 'react-native';
import {primaryColor, secondaryColor, deviceWidth, deviceHeight, commonBackgroundColor} from '@config/environments.js'


export default styles = StyleSheet.create({
  homePageContainer : {
    backgroundColor : commonBackgroundColor,
    flex : 1,
    display : "flex",
    justifyContent : "center",
  },
  requestButtonDisabled :  {
    backgroundColor : secondaryColor,
    borderRadius : 30,
    marginTop : 25,
    height : 55,
    justifyContent : "center",
    alignItems : "center",
    width : deviceWidth-150,
  },
  requestButton :  {
    backgroundColor : primaryColor,
    borderRadius : 30,
    marginTop : 25,
    height : 55,
    justifyContent : "center",
    alignItems : "center",
    width : deviceWidth-150,
  },
  requestButtonText : {
    color : '#ffffff',
    fontSize : 12,
  },
  buttonLink : {
    display : "flex",
    alignItems: "center",
    justifyContent : "center",
  }
})
