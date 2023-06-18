import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import colors from "../../constants/colors";

const LabCard = ({ lab, onPress }) => {
  return (
    <TouchableOpacity
      key={lab.id}
      style={[styles.labContainer]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/lab.jpeg")}
          style={styles.headerImage}
        />
      </View>
      <Pressable onPress={onPress}>
        <View style={styles.labInfoContainer}>
          <Text style={styles.labName}>{lab.name}</Text>
          <Text style={styles.labAddress}>Address: {lab.address}</Text>
          <Text style={styles.labAddress}>Phone: {lab.phone}</Text>
        </View>
      </Pressable>
    </TouchableOpacity>
  );
};

export default LabCard;

const styles = StyleSheet.create({
  labContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#149998",
  },
  imageContainer: {
    marginRight: 10,
  },
  headerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  labInfoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  labName: {
    fontSize: 17,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: colors.secondary,
  },
  labAddress: {
    color: colors.tetriary,
  },
});
