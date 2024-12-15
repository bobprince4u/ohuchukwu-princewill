import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import HomeScreen from './index';  // Referencing the HomeScreen component
import OrderbookScreen from '../components/OrderbookScreen'; './components/OrderbookScreen';
import BuyLimitScreen from '../components/BuyLimitScreen';
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#aaa"
        />
      </View>
      <DrawerItemList {...props} />
      <View style={styles.additionalOptions}>
        <TouchableOpacity style={styles.optionItem} onPress={() => console.log('Wallets Selected')}>
          <Text style={styles.optionText}>Wallets</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem} onPress={() => console.log('Roquu Hub Selected')}>
          <Text style={styles.optionText}>Roquu Hub</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem} onPress={() => console.log('Log out Selected')}>
          <Text style={styles.optionText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default function Layout() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
        drawerStyle: { backgroundColor: '#121212', width: 240 },
        drawerActiveTintColor: '#1e90ff',
        drawerInactiveTintColor: '#fff',
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Charts' }} />
      <Drawer.Screen name="Orderbook" component={OrderbookScreen} options={{ title: 'Orderbook' }} />
      <Drawer.Screen name="BuyLimit" component={BuyLimitScreen} options={{ title: 'Buy Limit' }} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#222',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#fff',
  },
  additionalOptions: {
    marginTop: 'auto',
    padding: 10,
  },
  optionItem: {
    paddingVertical: 15,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
});
