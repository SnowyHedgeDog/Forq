// screens/DiscoverScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import * as Location from 'expo-location';


export default function DiscoverScreen({ navigation }) {
  const [restaurants, setRestaurants] = useState([]);
  const [locationPermission, setLocationPermission] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const snapshot = await getDocs(collection(db, 'restaurants'));
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRestaurants(list);
    };
    fetchRestaurants();
  }, []);
  
  // 📍 Ask for location permission (only once)
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        setLocationPermission(false);
      } else {
        setLocationPermission(true);
      }
    })();
  }, []);

  if (locationPermission === null || restaurants.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading map and restaurants...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 1.3521, //Default Singapore
          longitude: 103.8198,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {restaurants.map((restaurant) => {
          if (restaurant.latitude && restaurant.longitude) {
            console.log("Placing marker for:", restaurant.name);
            return (
              <Marker
                key={restaurant.id}
                coordinate={{
                  latitude: restaurant.latitude,
                  longitude: restaurant.longitude,
                }}
                title={restaurant.name}
              />
            );
          }
          return null;
        })}
      </MapView>

      <View style={styles.header}>
        <Text style={styles.headerText}>Explore Restaurants</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  
});
