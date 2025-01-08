import { useUser } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constants";
import { useLocationStore } from "@/store";
import AutocompleteTextInput from "@/components/AutocompleteTextInput";

const mokedRecentRides = [
  {
    ride_id: "1",
    origin_address: "Habeeb Turning",
    destination_address: "Kerdasa",
    origin_latitude: 30.3141955,
    origin_longitude: 31.3122847,
    destination_latitude: 30.013056,
    destination_longitude: 31.208853,
    ride_time: 61,
    fare_price: 19500.0,
    payment_status: "paid",
    driver_id: 2,
    user_id: "1",
    created_at: "2024-12-1 10:49:20.620007",
    driver: {
      driver_id: "2",
      first_name: "Mazen",
      last_name: "",
      profile_image_url:
        "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
      car_image_url:
        "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
      car_seats: 4,
      rating: "4.60",
    },
  },
  {
    ride_id: "2",
    origin_address: "Habeeb Turning",
    destination_address: "Kerdasa",
    origin_latitude: 30.3141955,
    origin_longitude: 31.3122847,
    destination_latitude: 30.013056,
    destination_longitude: 31.208853,
    ride_time: 66,
    fare_price: 24500.0,
    payment_status: "paid",
    driver_id: 1,
    user_id: "1",
    created_at: "2024-08-12 06:12:17.683046",
    driver: {
      driver_id: "1",
      first_name: "Ali",
      last_name: "",
      profile_image_url:
        "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
      car_image_url:
        "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
      car_seats: 4,
      rating: "4.80",
    },
  },
  {
    ride_id: "3",
    origin_address: "Habeeb Turning",
    destination_address: "Kerdasa",
    origin_latitude: 30.3141955,
    origin_longitude: 31.3122847,
    destination_latitude: 30.013056,
    destination_longitude: 31.208853,
    ride_time: 30,
    fare_price: 6200.0,
    payment_status: "paid",
    driver_id: 1,
    user_id: "1",
    created_at: "2024-08-12 08:49:01.809053",
    driver: {
      driver_id: "1",
      first_name: "Mahmoud",
      last_name: "",
      profile_image_url:
        "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
      car_image_url:
        "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
      car_seats: 4,
      rating: "4.80",
    },
  },
  {
    ride_id: "4",
    origin_address: "Habeeb Turning",
    destination_address: "Kerdasa",
    origin_latitude: 30.3141955,
    origin_longitude: 31.3122847,
    destination_latitude: 30.013056,
    destination_longitude: 31.208853,
    ride_time: 90,
    fare_price: 7900.0,
    payment_status: "paid",
    driver_id: 3,
    user_id: "1",
    created_at: "2024-08-12 18:43:54.297838",
    driver: {
      driver_id: "3",
      first_name: "Hassan",
      last_name: "",
      profile_image_url:
        "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
      car_image_url:
        "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
      car_seats: 4,
      rating: "4.70",
    },
  },
];

const Home = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const { setUserLocation } = useLocationStore();

  const loading = false;

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };

  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${address[0].formattedAddress}, ${address[0].region}`,
      });
    };
    requestLocation();
  }, []);

  const handleDestinationPress = async () => {
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=kerdasa&format=json&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`
    );
    const locaionList = await res.json();
    console.log(locaionList.results[0]);
  };

  return (
    <SafeAreaView className="bg-general-500">
      <StatusBar backgroundColor={"black"} />
      <FlatList
        data={mokedRecentRides?.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item, index) => index.toString()}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <View>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="No recent rides found"
                  resizeMode="contain"
                />
                <Text className="text-sm">No recent rides found</Text>
              </View>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <View>
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="text-2xl font-JakartaExtraBold">
                Welcome {user?.firstName} Mariam 👋
              </Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className="justify-center items-center w-10 h-10 rounded-full bg-white"
              >
                <Image source={icons.out} className="w-4 h-4" />
              </TouchableOpacity>
            </View>

            <AutocompleteTextInput />

            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Your current location
            </Text>
            <View className="flex flex-row items-center bg-transparent h-[300px]">
              <Map />
            </View>

            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Recent Rides
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
