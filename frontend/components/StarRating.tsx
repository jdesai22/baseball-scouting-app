import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Assuming you are using Expo

interface StarRatingProps {
  maxStars?: number;
  rating: number;
  onRatingChange: (rating: number) => void;
  title?: string; // New title prop
}

const StarRating: React.FC<StarRatingProps> = ({
  maxStars = 5,
  rating,
  onRatingChange,
  title, // Destructure the title prop
}) => {
  const [selectedRating, setSelectedRating] = useState(rating);

  const handleStarPress = (star: number) => {
    setSelectedRating(star);
    onRatingChange(star);
  };

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      {/* Render the title */}
      <View style={styles.starsContainer}>
        {Array.from({ length: maxStars }, (_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleStarPress(index + 1)}
          >
            <FontAwesome
              name={index < selectedRating ? "star" : "star-o"}
              size={32}
              color="#FFD700"
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center", // Align items vertically centered
  },
  title: {
    flex: 1, // Take up remaining space
    fontSize: 16,
    fontWeight: "bold",
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center", // Center stars horizontally
    flex: 2, // Adjust this value to control the space taken by stars
  },
  star: {
    marginHorizontal: 4,
  },
});

export default StarRating;
