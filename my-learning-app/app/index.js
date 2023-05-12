import { StyleSheet, Text, View,ScrollView,SafeAreaView, Button } from "react-native";
import { Stack,useRouter } from "expo-router";
import { useState } from "react";
import {COLORS,icons,images,SIZES} from "../constants";
import {ScreenHeaderBtn,Welcome,Popularjobs,Nearbyjobs} from "../components"


export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle:{backgroundColor:COLORS.lightWhite},
          headerShadowVisible:false,
          headerLeft:()=>{
            return(<ScreenHeaderBtn iconUrl={icons.share} dimension="60%"/>)
          },
          headerRight:()=>{
            return(<ScreenHeaderBtn iconUrl={images.profile} dimension="100%"/>)
          },
          headerTitle:"",
        }}>

      </Stack.Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex:1,padding:SIZES.medium}}>
          <Welcome/>
          <Popularjobs/>
          <Nearbyjobs/>
        </View>
      </ScrollView> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
