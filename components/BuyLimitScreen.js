import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const BuyLimitScreen = () => {
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [marketPrice, setMarketPrice] = useState('');

  useEffect(() => {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMarketPrice(parseFloat(data.c).toFixed(2));
    };

    return () => socket.close();
  }, []);

  const handleBuy = () => {
    // Add your buy logic here
    console.log(`Buy order placed: Price - ${price}, Amount - ${amount}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buy BTC</Text>

      <View style={styles.marketPriceContainer}>
        <Text style={styles.marketPriceLabel}>Current Market Price (USDT):</Text>
        <Text style={styles.marketPrice}>{marketPrice}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Limit Price (USDT):</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          placeholder="Enter price"
          placeholderTextColor="#aaa"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Amount (BTC):</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="Enter amount"
          placeholderTextColor="#aaa"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleBuy}>
        <Text style={styles.buttonText}>Buy BTC</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  marketPriceContainer: {
    marginBottom: 15,
  },
  marketPriceLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  marketPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e90ff',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    padding: 10,
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BuyLimitScreen;



