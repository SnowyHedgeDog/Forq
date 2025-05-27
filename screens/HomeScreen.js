import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function HomeScreen({ navigation }) {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'restaurants'));
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRestaurants(list);
      } catch (error) {
        console.error("Error fetching restaurants:",  error.message, error.code);
      }
    };

    fetchRestaurants();
  }, []);

  console.log("Restaurants data:", restaurants);

  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={{ marginRight: 8 }} />
          <TextInput placeholder="Search" style={styles.searchInput} />
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Ionicons name="person-circle-outline" size={28} color="#444" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.iconText}>
            <FontAwesome name="heart-o" size={16} />
            <Text style={styles.actionText}>Favorites</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.iconText}>
            <FontAwesome name="history" size={16} />
            <Text style={styles.actionText}>History</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.iconText}>
            <FontAwesome name="user" size={16} />
            <Text style={styles.actionText}>Following</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome name="bookmark-o" size={16} />
        </TouchableOpacity>
      </View>

      {/* Hot Picks Banner */}
      <View style={styles.bannerContainer}>
        <Image source={require('../assets/Hotpicks.jpg')} style={styles.bannerImage} />
        <Text style={styles.bannerText}>Hot Picks</Text>
      </View>

      {/* Category Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Search By Category</Text>
        <Text style={styles.sectionArrow}>›</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {['Sushi', 'Hotpot', 'Indian', 'BBQ'].map((item, index) => (
          <View key={index} style={styles.categoryItem}>
            <Image source={{ uri: 'https://via.placeholder.com/60' }} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{item}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Popular Restaurants */}
      <Text style={styles.sectionTitle}>Popular Restaurants Near You</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {restaurants.map((restaurant) => (
        <TouchableOpacity
          key={restaurant.id} 
          onPress={() => navigation.navigate('RestaurantDetail', { restaurantId: restaurant.id })}
          style={styles.restaurantCard}
        >
          <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
        </TouchableOpacity>
      ))}

      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    paddingHorizontal: 8,
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 4,
  },
  bannerContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
  },
  bannerText: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionArrow: {
    fontSize: 18,
  },
  categoryScroll: {
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
  },
  restaurantCard: {
    width: 120,
    marginRight: 16,
    alignItems: 'center',
    //borderWidth: 1, // ← debug
    //borderColor: 'blue', // ← debug
  },
  restaurantImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    marginTop: 4,
    //backgroundColor: 'rgba(255, 0, 0, 0.3)', //for debug
  },

  searchWrapper: {
    marginTop: 20, // adds vertical space above search bar
  },
  
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 16,
    justifyContent: 'space-between', // pushes profile icon to right
  },
  
  searchInput: {
    flex: 1,
    height: 40,
    marginRight: 8,
  }
  
});
