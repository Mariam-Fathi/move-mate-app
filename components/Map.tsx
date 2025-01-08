import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { useLocationStore } from "@/store"; // Adjust path as needed
import { ActivityIndicator, Text, View } from "react-native";
import { icons } from "@/constants";

const mokedDriver = [
  {
    id: "1",
    first_name: "James",
    last_name: "Wilson",
    profile_image_url:
      "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
    car_image_url:
      "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
    car_seats: 4,
    latitude: 30.3141955,
    longitude: 31.3122847,
    rating: "4.80",
  },
  {
    id: "2",
    first_name: "David",
    last_name: "Brown",
    profile_image_url:
      "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
    car_image_url:
      "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
    car_seats: 5,
    latitude: 30.3141955,
    longitude: 31.3122847,
    rating: "4.60",
  },
  {
    id: "3",
    first_name: "Michael",
    last_name: "Johnson",
    profile_image_url:
      "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
    car_image_url:
      "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
    car_seats: 4,
    latitude: 30.3141955,
    longitude: 31.3122847,
    rating: "4.70",
  },
  {
    id: "4",
    first_name: "Robert",
    last_name: "Green",
    profile_image_url:
      "https://ucarecdn.com/fdfc54df-9d24-40f7-b7d3-6f391561c0db/-/preview/626x417/",
    car_image_url:
      "https://ucarecdn.com/b6fb3b55-7676-4ff3-8484-fb115e268d32/-/preview/930x932/",
    car_seats: 4,
    latitude: 30.3141955,
    longitude: 31.3122847,
    rating: "4.90",
  },
];

const Map = () => {
  const [loading, setLoading] = useState(true);

  const markerIconUrl = `https://api.geoapify.com/v1/icon?size=xx-large&type=awesome&color=%233e9cfe&icon=paw&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`;

  // state management for user location
  const { userLongitude, userLatitude } = useLocationStore();

  // Ensure that the user location is valid
  useEffect(() => {
    if (userLatitude && userLongitude) {
      setLoading(false);
    }
  }, [userLatitude, userLongitude]);

  // If loading, do not render the map
  if (loading || !userLatitude || !userLongitude) {
    return (
      <View className="w-full h-full justify-center items-center">
        <ActivityIndicator />
      </View>
    );
  }

  console.log("User Location:", userLatitude, userLongitude);

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      style={{ width: "100%", height: "100%" }}
      region={{
        latitude: userLatitude,
        longitude: userLongitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      showsUserLocation={true}
      userInterfaceStyle="light"
      showsPointsOfInterest={false}
    >
      {mokedDriver.map((driver) => {
        const latOffset = (Math.random() - 0.5) * 0.01;
        const lngOffset = (Math.random() - 0.5) * 0.01;
        return (
          <Marker
            key={driver.id}
            coordinate={{
              latitude: driver.latitude + +latOffset,
              longitude: driver.longitude + lngOffset,
            }}
            image={icons.marker}
          />
        );
      })}
    </MapView>
  );
};

export default Map;
