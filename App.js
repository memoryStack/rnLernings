/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  requireNativeComponent,
} from 'react-native'

const MyWheel = requireNativeComponent('RCTWheelPicker')

const App = () => {
  const [data, setData] = useState(['test1', 'test2', 'test3', 'test4', 'test5'])
  useEffect(() => {
    setTimeout(() => {
      setData(['1', '2', '3', '4'])
    }, 2000)
  }, [])

  const onChange = (data) => {
    console.log('@@@@@@@ data', data)
  }

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
      }}
    >    
      <MyWheel 
        style={{
          width: '100%',
          height: 200,
        }}
        data={data}
        onChange={onChange}
      />
   </View>
  );
};

export default App;
