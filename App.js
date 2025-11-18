import { useEffect, useState } from 'react';
import { FlatList, Text, View, Image, StyleSheet } from 'react-native';

const API_URL = "https://fakestoreapi.com/products";

const renderItem = ({ item }) => (
  <View style={styles.card}>
    <Image
      source={{ uri: item.image }}
      style={styles.productImage}
    />
    
    <View style={styles.content}>
      <Text style={styles.category}>{item.category}</Text>
      
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
      
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>
      
      <View style={styles.infoRow}>
        <Text style={styles.price}>R$ {(item.price * 5.5).toFixed(2)}</Text>
        
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>⭐ {item.rating.rate}</Text>
          <Text style={styles.ratingCount}>({item.rating.count})</Text>
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 12,
    marginVertical: 10,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 220,
    backgroundColor: '#f5f5f5',
    resizeMode: 'contain',
    padding: 10,
  },
  content: {
    padding: 14,
  },
  category: {
    fontSize: 11,
    color: '#ff6b35',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
    lineHeight: 20,
  },
  description: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 12,
    lineHeight: 17,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00a86b',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  ratingCount: {
    fontSize: 11,
    color: '#999999',
  },
});

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingVertical: 8, backgroundColor: '#fafafa' }}
    />
  );
}

