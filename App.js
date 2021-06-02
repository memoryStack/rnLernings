/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native'

import RNFetchBlob from 'rn-fetch-blob'
import * as RNFS from 'react-native-fs'

const getWritePermission = async () => {
  try {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    const permissionStatus = await PermissionsAndroid.request(permission)
    return permissionStatus === PermissionsAndroid.RESULTS.GRANTED
  } catch (error) {
      console.log('@@@@@@ error while asking for permission', error)
  }
  return false
}

const App = () => {

  

  // using RNFetchBlob
  // const saveTheFile = async () => {
  //   console.log('@@@@@@@@', RNFetchBlob)
  //   const { fs } = RNFetchBlob.fs
  //   const folderPath = RNFetchBlob.fs.dirs.DownloadDir + '/DummyFolder'
  //   const filePath = folderPath + '/test.txt'

  //   const writePermission = await getWritePermission()

  //   if (writePermission) {
  //   //   console.log('@@@@@@@ fs', fs)
  //   //   RNFetchBlob.fs.exists(folderPath)
  //   //   .then(exists => {
  //   //     console.log('@@@@@ folder', folderPath, exists)
  //   //     if (!exists) {
  //   //       RNFetchBlob.fs.mkdir(folderPath)
  //   //       .then(result => {
  //   //         console.log('@@@@@ made directory', result)
  //   //       })
  //   //     }
  //   //   })


  //     RNFetchBlob.fs.ls(RNFetchBlob.fs.dirs.DownloadDir)
  //     .then(result => {
  //       console.log('@@@@ dowload contents', result)
  //     })
  //   }
  // }

  // using RNFS
  const saveTheFileAndroid = async () => {

    console.log('@@@@@@@@ fs', RNFS)

    // const path = RNFS.DocumentDirectoryPath + '/test.txt'
    // console.log('@@@@@@@@ file will be located at', path)
    

    if (await getWritePermission()) {
      const folderPath = RNFS.ExternalStorageDirectoryPath + '/ISmrt'
      const filePath = folderPath + '/test.txt'
      RNFS.exists(folderPath)
      .then(exists => {
        if (!exists) { // rate the folder and then write to the file
          RNFS.mkdir(folderPath)
          .then(something => {
            // write to the file
            RNFS.writeFile(filePath, 'Lorem ipsum dolor sit amet', 'utf8')
            .then((success) => {
              console.log('@@@@@@@@@@ FILE WRITTEN!', success);
            })
          })
        }

        // write to the file
        RNFS.writeFile(filePath, 'Lorem ipsum dolor sit amet', 'utf8')
        .then((success) => {
          console.log('@@@@@@@@@@ FILE WRITTEN!', success);
        })
        
        console.log('@@@@@@@', folderPath, exists)
      })
    } else {
      
    }
  }

  const saveFileIOS = () => {
    console.log('@@@@@@ rnfs', RNFS)
    const folderPath =  RNFS.DocumentDirectoryPath + '/ISmrt'
    const filePath = folderPath + '/test.txt'
    console.log('@@@@@@ filePath', filePath)
    RNFS.exists(folderPath)
    .then(exists => {
      if (!exists) { // make the directory and the save it to the file
        RNFS.mkdir(folderPath)
        .then(() => {
          RNFS.writeFile(filePath, 'Lorem ipsum dolor sit amet', 'utf8')
          .then(() => {
            console.log('@@@@@@ file saved')
          })
        })
      } else { // directly save to the file
        RNFS.writeFile(filePath, 'Lorem ipsum dolor sit amet', 'utf8')
        .then(() => {
          console.log('@@@@@@ file saved')
        })
      }
    })
  }

  return (
    <View
      style={{
        position: 'absolute',
        justifyContent: 'center',
        alignContent: 'center',
        top: 100,
        left: 100,
        width: 100,
        height: 100,
        backgroundColor: 'red'
      }}
    >
      <TouchableOpacity 
        onPress={saveFileIOS}
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'red'
      }}
      >
        <Text>{`save the file`}</Text>
      
    </TouchableOpacity>
    </View>
  );
};

export default App;
