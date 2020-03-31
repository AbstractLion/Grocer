import * as React from 'react';
import {Text, View} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import StackWrapper from "../navigation/StackWrapper";

class QRCodeScanner extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const {status} = await BarCodeScanner.requestPermissionsAsync();
    this.setState({hasCameraPermission: status === 'granted'});
  };

  render() {
    const {hasCameraPermission, scanned} = this.state;

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
          marginBottom: 30
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={{flex: -1, width: "100%", height: "100%", alignSelf: 'stretch'}}
        />
        <Text
          style={{fontWeight: 'bold', textAlign: 'center', margin: 50}}

        >
          Scan a shopper's QR Code to allow them to prepare groceries for somebody else!
        </Text>
      </View>
    );
  }

  handleBarCodeScanned = ({type, data}) => {
    this.setState({scanned: true});
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    fetch('/lists/:id/activate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: {type},
        data: {data},
      }),
    });
  };
}

export default StackWrapper(QRCodeScanner, {
  headerRight: null,
});
