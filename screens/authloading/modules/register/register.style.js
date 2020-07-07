import {StyleSheet} from 'react-native';
import {primaryColor, secondaryColor, deviceWidth, deviceHeight, commonBackgroundColor} from '@config/environments.js'


export default styles = StyleSheet.create({
  registerPageContainer : {
    backgroundColor : commonBackgroundColor,
    flex : 1,
    display : "flex",
    justifyContent : "center",
    padding : 30,
  },
  signUpButtonDisabled :  {
    padding : 10,
    backgroundColor : secondaryColor,
    borderRadius : 30,
    marginTop : deviceHeight - 750,
    height : 55,
    justifyContent : "center",
    alignItems : "center",
    width : deviceWidth-150,
  },
  signUpButton :  {
    padding : 10,
    backgroundColor : primaryColor,
    borderRadius : 30,
    marginTop : deviceHeight - 750,
    height : 55,
    justifyContent : "center",
    alignItems : "center",
    width : deviceWidth-150,
  },
  signUpButtonText : {
    color : '#ffffff',
    fontSize : 12,
  },
  buttonContainer : {
    display : "flex",
    flex : 0.5,
    alignItems: "center",
  },
  linkContainer : {
    alignItems: "center",
    flexDirection : "row",
  },
  logo : {
    width : deviceWidth - 96,
    height : deviceHeight - 500,
  },
  imageContainer :{
    flex : 1,
    display : "flex",
    alignItems: "center",
    justifyContent : "center",
  },
  textField : {
  },
  link : {
    padding : 10,
    color: '#ee4e34',
  },
})
