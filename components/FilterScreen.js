import React, { useEffect, useState } from 'react';
import { View, Text, Button, Switch, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const FilterScreen = ({ navigation, route }) => {
  const [distance, setDistance] = useState(5);
  const [price, setPrice] = useState(20);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [aircon, setAircon] = useState(false);

  // Fetch categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'categories'));
        const categoryList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCategories(categoryList);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const toggleCategory = (categoryName) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(selectedCategories.filter(c => c !== categoryName));
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };

  const applyFilters = () => {
    navigation.goBack();
    route.params.onApply({
      distance,
      price,
      selectedCategories,
      aircon
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Distance: {distance} km</Text>
      <Slider
        minimumValue={1}
        maximumValue={20}
        step={1}
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

      <Text style={styles.label}>Categories</Text>
      {categories.map(cat => (
        <TouchableOpacity
          key={cat.id}
          onPress={() => toggleCategory(cat.name)}
          style={[
            styles.cuisine,
            selectedCategories.includes(cat.name) && styles.selected
          ]}
        >
          <Image source={{ uri: cat.image }} style={styles.icon} />
          <Text>{cat.name}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.row}>
        <Text style={styles.label}>Air-conditioning</Text>
        <Switch value={aircon} onValueChange={setAircon} />
      </View>

      <Button title="Apply Filters" onPress={applyFilters} />
    </ScrollView>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, marginVertical: 10 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20
  },
  cuisine: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 10
  },
  selected: {
    backgroundColor: '#e0f7fa',
    borderColor: '#007BFF'
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 6
  }
});
