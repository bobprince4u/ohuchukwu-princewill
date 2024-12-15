import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const OrderbookScreen = () => {
  const [orderbook, setOrderbook] = useState({ bids: [], asks: [] });

  useEffect(() => {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@depth');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setOrderbook((prev) => {
        const bids = [...prev.bids, ...data.b].slice(-20);
        const asks = [...prev.asks, ...data.a].slice(-20);
        return { bids, asks };
      });
    };

    return () => socket.close();
  }, []);

  const renderOrder = (item, type) => (
    <View style={[styles.row, type === 'bid' ? styles.bid : styles.ask]}>
      <Text style={styles.text}>Price: {item[0]}</Text>
      <Text style={styles.text}>Amount: {item[1]}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orderbook</Text>
      <Text style={styles.subtitle}>Bids</Text>
      <FlatList
        data={orderbook.bids}
        keyExtractor={(item, index) => `bid-${index}`}
        renderItem={({ item }) => renderOrder(item, 'bid')}
        style={styles.list}
      />
      <Text style={styles.subtitle}>Asks</Text>
      <FlatList
        data={orderbook.asks}
        keyExtractor={(item, index) => `ask-${index}`}
        renderItem={({ item }) => renderOrder(item, 'ask')}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 5,
  },
  list: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  bid: {
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
  },
  ask: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
  },
  text: {
    color: '#fff',
  },
});

export default OrderbookScreen;
