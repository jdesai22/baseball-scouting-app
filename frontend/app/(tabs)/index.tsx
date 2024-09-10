import React, { useState } from "react";
import { Image, StyleSheet, Platform, TextInput, View } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import StarRating from "@/components/StarRating";
import GetLocationButton from "@/components/GetLocationButton";
import { Button } from "react-native";

export default function HomeScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fieldingRating, setFieldingRating] = useState(3);
  const [pitchingRating, setPitchingRating] = useState(3);
  const [hittingRating, setHittingRating] = useState(3);
  const [location, setLocation] = useState({});
  const [additionalNotes, setAdditionalNotes] = useState("");

  const handleSubmit = async () => {
    let ovr = ((fieldingRating + pitchingRating + hittingRating) / 3).toFixed(
      2
    );

    const reqbody = {
      name: firstName + " " + lastName,
      fname: firstName,
      lname: lastName,
      fielding: fieldingRating,
      pitching: pitchingRating,
      hitting: hittingRating,
      ovr: ovr,
      location: location,
      notes: additionalNotes,
    };

    const reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: reqHeaders,
      body: JSON.stringify(reqbody),
    };

    fetch("http://localhost:3000/addPlayer", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    setFirstName("");
    setLastName("");
    setFieldingRating(3);
    setPitchingRating(3);
    setHittingRating(3);
    setLocation({});
    setAdditionalNotes("");
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/baseball-field.jpg")}
          style={styles.baseballField}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Scouting Form</ThemedText>
      </ThemedView>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <StarRating
          title="Fielding"
          rating={fieldingRating}
          onRatingChange={setFieldingRating}
        />
        <StarRating
          title="Pitching"
          rating={pitchingRating}
          onRatingChange={setPitchingRating}
        />
        <StarRating
          title="Hitting"
          rating={hittingRating}
          onRatingChange={setHittingRating}
        />
        <GetLocationButton handleSetLocation={setLocation} />
        <TextInput
          style={styles.notesInput}
          placeholder="Additional Notes"
          value={additionalNotes}
          onChangeText={setAdditionalNotes}
          multiline={true}
          numberOfLines={8} // Adjust number of lines as needed
        />
        <Button
          title="Submit"
          onPress={handleSubmit}
          disabled={firstName == "" && lastName == ""}
        />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  formContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  notesInput: {
    height: 120,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  baseballField: {
    height: 250,
    width: 400,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

// import { Image, StyleSheet, Platform } from 'react-native';

// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

// export default function HomeScreen() {

//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//         <ThemedText>
//           Tap the Explore tab to learn more about what's included in this starter app.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           When you're ready, run{' '}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });
