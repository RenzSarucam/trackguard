import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center ">
      <Text className="text-red-500 mb-4">Index</Text>

      {/* Styled TouchableOpacity as button */}
      <TouchableOpacity className="bg-blue-500 py-3 px-6 rounded-lg" onPress={() => {
        router.push("/splash-screen");
      }}>
        <Text className="text-white text-lg">SplashScreen Buttons</Text>
      </TouchableOpacity>
    </View>
  );
}

