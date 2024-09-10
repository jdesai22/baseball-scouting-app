import React, { useState } from "react";
import { Button } from "react-native";
import * as Location from "expo-location";

interface GetLocationProps {
  handleSetLocation: (location: Object) => void;
}

const GetLocationButton: React.FC<GetLocationProps> = ({
  handleSetLocation,
}) => {
  const [buttonTitle, setButtonTitle] = useState("Get Location");

  const handleGetLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.warn("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    handleSetLocation(location);

    setButtonTitle("Get Location Again");
  };

  return (
    <Button title={buttonTitle} onPress={handleGetLocation} color={"black"} />
  );
};

export default GetLocationButton;
