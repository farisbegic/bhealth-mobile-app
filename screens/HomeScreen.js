import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Header from "./Header";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";
import labs from "../constants/labs";
import LabCard from "../components/common/LabCard";

const HomeScreen = () => {
  const [laboratories, setLaboratories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLaboratories = async () => {
      try {
        const filteredLabs = labs.filter((lab) =>
          lab.name.toLowerCase().includes(searchText.toLowerCase())
        );

        setLaboratories(filteredLabs);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching laboratories:", error);
        setLoading(false);
      }
    };

    fetchLaboratories();
  }, [searchText]);

  const navigateToLabInfo = (lab) => {
    navigation.navigate("Laboratory", { lab: lab });
  };

  const renderLaboratories = () => {
    if (loading) {
      return <Text>Loading laboratories...</Text>;
    }

    if (laboratories.length === 0) {
      return <Text>No laboratories found.</Text>;
    }

    return laboratories.map((lab, index) => (
      <LabCard key={index} lab={lab} onPress={() => navigateToLabInfo(lab)} />
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <Header />
      <View style={styles.searchBar}>
        <AntDesign
          name="search1"
          size={20}
          color="#9E9E9E"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#9E9E9E"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.laboratoriesContainer}>{renderLaboratories()}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 20,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#000",
  },
  laboratoriesContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 36,
    marginBottom: 10,
    marginLeft: 90,
    color: "#9E9E9E",
  },
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 40,
    alignItems: "center",
  },
  modalLabName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalLabAddress: {
    color: "#9E9E9E",
    marginBottom: 20,
  },
  modalLabInfoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalLabInfo: {
    marginBottom: 20,
  },
  moreInfoButtonContainer: {
    backgroundColor: "#149998",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  moreInfoButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  closeButtonContainer: {
    backgroundColor: "#149998",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
