import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const HomeScreen = () => {
  const [candlestickData, setCandlestickData] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1m');

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const kline = message.k;
      setCandlestickData((prevData) => [
        ...prevData.slice(-49), // Keep only the last 50 data points
        { time: kline.t, value: parseFloat(kline.c) },
      ]);
    };

    return () => socket.close();
  }, []);

  const chartData = {
    labels: candlestickData.map((d) => new Date(d.time).toLocaleTimeString()).slice(-6),
    datasets: [
      {
        data: candlestickData.map((d) => d.value),
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BTC/USDT Live Chart</Text>
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 20}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const chartConfig = {
  backgroundColor: '#1E2923',
  backgroundGradientFrom: '#08130D',
  backgroundGradientTo: '#08130D',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 10,
  },
});

export default HomeScreen;


