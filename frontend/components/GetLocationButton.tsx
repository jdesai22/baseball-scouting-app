import React from "react";
import { Button } from "react-native";
import * as Location from "expo-location";

interface GetLocationProps {
  handleSetLocation: (location: Object) => void;
}

const GetLocationButton: React.FC<GetLocationProps> = ({
  handleSetLocation,
}) => {
  // const [locationFound, setLocationFound] = React.useState(false);

  const handleGetLocation = async () => {
    // console.log(GetLocation.openSettings());
    // if (hasLocationPermission) {
    // }
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.warn("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    handleSetLocation(location);
    // if (location) {
    //   setLocationFound(true);
    // }
  };

  return (
    <Button title="Get Location" onPress={handleGetLocation} color={"black"} />
  );
};

export default GetLocationButton;
