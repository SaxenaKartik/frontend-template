import {StyleSheet} from 'react-native';
import {primaryColor, secondaryColor, deviceWidth, deviceHeight, commonBackgroundColor} from '@config/environments.js'


export default styles = StyleSheet.create({
  requestPageContainer : {
    backgroundColor : commonBackgroundColor,
    flex : 1,
    display : "flex",
    justifyContent : "center",
    padding : 30,
  },
  requestKeyboardContainer : {
    backgroundColor : commonBackgroundColor,
    flex : 1,
    display : "flex",
    justifyContent : "flex-end",
    padding : 30,
  },
  item : {

  },
  requestButtonDisabled :  {
    padding : 10,
    backgroundColor : secondaryColor,
    borderRadius : 30,
    marginTop : deviceHeight - 750,
    height : 55,
    justifyContent : "center",
    alignItems : "center",
    width : deviceWidth-150,
  },
  requestButton :  {
    padding : 10,
    backgroundColor : primaryColor,
    borderRadius : 30,
    marginTop : deviceHeight - 750,
    height : 55,
    justifyContent : "center",
    alignItems : "center",
    width : deviceWidth-150,
  },
  requestButtonText : {
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
    height : deviceHeight - 630,
  },
  imageContainer :{
    flex : 1,
    display : "flex",
    alignItems: "center",
    justifyContent : "center",
  },
  textField : {
  },
  textInput : {
    textAlignVertical : "top",
  },
  link : {
    padding : 10,
    color: '#ee4e34',
  },
  label : {
    fontSize : 16,
    color : "rgba(0, 0, 0, .38)"
  }
})
