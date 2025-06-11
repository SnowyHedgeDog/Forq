import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Switch, Image
} from 'react-native';
import Slider from '@react-native-community/slider';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [distance, setDistance] = useState(5);
  const [price, setPrice] = useState(30);
  const [aircon, setAircon] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const snapshot = await getDocs(collection(db, 'categories'));
      const categoryList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoryList);
    };

    fetchCategories();
  }, []);

  const toggleCategory = (name) => {
    setSelectedCategories(prev =>
      prev.includes(name)
        ? prev.filter(c => c !== name)
        : [...prev, name]
    );
  };

  const applyFilters = () => {
    console.log('Search:', query);
    console.log('Distance:', distance);
    console.log('Price:', price);
    console.log('Categories:', selectedCategories);
    console.log('Aircon:', aircon);

    // You'd now query Firestore using these filters.
  };

  return (
    <View style={styles.container}>
      {/* Search input */}
      <TextInput
        placeholder="Search for food or restaurants..."
        style={styles.input}
        value={query}
        onChangeText={setQuery}
      />

      {/* Filters */}
      <Text style={styles.label}>Max Distance: {distance} m</Text>
      <Slider
        minimumValue={50}
        maximumValue={1000}
        step={50}
        value={distance}
        onValueChange={setDistance}
      />

      <Text style={styles.label}>Max Price: ${price}</Text>
      <Slider
        minimumValue={5}
        maximumValue={100}
        step={1}
        value={price}
        onValueChange={setPrice}
      />

      <Text style={styles.label}>Cuisine</Text>
      <View style={styles.cuisineWrap}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.cuisineBtn, selectedCategories.includes(cat.name) && styles.cuisineSelected]}
            onPress={() => toggleCategory(cat.name)}
          >
            <Image source={{ uri: cat.image }} style={styles.cuisineImg} />
            <Text>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Air-conditioning</Text>
        <Switch value={aircon} onValueChange={setAircon} />
      </View>

      <TouchableOpacity style={styles.applyBtn} onPress={applyFilters}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Apply Filters</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 10, marginBottom: 20
  },
  label: { fontSize: 16, marginVertical: 10 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  cuisineWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  cuisineBtn: {
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
  cuisineSelected: {
    borderColor: '#f4511e',
    backgroundColor: '#ffece6',
  },
  cuisineImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 4
  },
  applyBtn: {
    backgroundColor: '#f4511e',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  }
});
