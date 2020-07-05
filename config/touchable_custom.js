import React from 'react';
import {TouchableHighlight, TouchableNativeFeedback, Platform} from 'react-native';

export default TouchableCustom = Platform.OS=='ios'?TouchableHighlight:TouchableNativeFeedback;
