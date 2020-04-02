import React, {useEffect, useState, useContext} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import StackWrapper from "../navigation/StackWrapper";
import * as SecureStore from 'expo-secure-store';
import UserContext from "../contexts/User";

function ProfileScreen() {
  const [pushToken, setPushToken] = useState('');
  const {user, setUser} = useContext(UserContext);

  useEffect(() => {
    (async() => {
      setPushToken(await SecureStore.getItemAsync('pushToken'));
    })();
  }, []);

  return (
    <View>
      <Text>{pushToken}</Text>
      <Button
        title="Create Shopper"
        onPress={async () => {
          const pushToken = await SecureStore.getItemAsync('pushToken');
          const usersUrl = 'https://grocerserver.herokuapp.com/users';
          const response = await fetch(usersUrl, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              phoneNumber: '4161324634',
              email: 'john.doe@gmail.com',
              firstName: 'John',
              lastName: 'Doe',
              role: 'Shopper',
              pushToken
            })
          });
          const result = await response.json();
          setUser(result);
          await SecureStore.setItemAsync('userId', result._id);

        }}
      />
      <Button
        title="Create Worker"
        onPress={() => {
        }}
      />
    </View>
  );
}

export default StackWrapper(ProfileScreen);
