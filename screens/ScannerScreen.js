import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import StackWrapper from "../navigation/StackWrapper";
import {Button} from 'react-native-elements';

function QRCodeScanner() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedCode, setScannedCode] = useState('');

  useEffect(() => {
    (async() => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  async function handleBarCodeScanned({type, data}) {
    if (data === scannedCode) return;
    setScannedCode(data);
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // Activating the QR Code, data string in form of <userId>=<qrCode>
    if (data.includes("=")) {
      const [userId, qrCode] = data.split('=');
      const activateUrl = 'https://grocerserver.herokuapp.com/lists/activate';
      const response = await fetch(activateUrl, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId, qrCode})
      });
      const result = await response.json();
      console.log(result);
    } else {
      // Without the = sign it's just the QR Code
      const completeUrl = 'https://grocerserver.herokuapp.com/lists/complete';
      const response = await fetch(completeUrl, {
        method: 'POST',
        body: JSON.stringify({qrCode: data}),
      });
      const result = await response.json();
      console.log(result);
    }
    setScanned(false);
  }

  if (hasCameraPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        marginTop: 30,
        marginBottom: 30,
      }}>
      <View style={{
        flex: 1,
        position: 'relative'
      }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0}}
        />
      </View>
      <Text
        style={{fontWeight: 'bold', textAlign: 'center', margin: 50}}
      >
        Scan a shopper's QR Code to allow them toprepare groceries for somebody
        else!
      </Text>
      <Button
        onPress={() => setScannedCode('')}
        title="Rescan"
      />
    </View>
  );
}

export default StackWrapper(QRCodeScanner, {
  headerRight: null,
});
