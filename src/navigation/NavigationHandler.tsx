import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {store} from '../store/index';
import PokemonListScreen from '../screens/PokemonMainScreen';
import PokemonDetailsScreen from '../screens/PokemonDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="PokemonList"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="PokemonList" component={PokemonListScreen} />
          <Stack.Screen
            name="PokemonDetails"
            component={PokemonDetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
