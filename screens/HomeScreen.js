import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, ScrollView, Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Header from "./Header";
import { useNavigation } from "@react-navigation/native";
import LaboratoryScreen from "./LaboratoryScreen"

const HomeScreen = () => {
  const [laboratories, setLaboratories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedLab, setSelectedLab] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLaboratories = async () => {
      try {
          const Labs = [
                          {
                            id: "1",
                            name: "SaNaSa",
                            address: "Džemala Bijedića 26",
                            phone: "061111722",
                            email: "labmail1@gmail.com"
                          },
                          {
                            id: "2",
                            name: "Interlab",
                            address: "Hamdije Kreševljakovića 19",
                            phone: "061111722",
                            email: "labmail2@gmail.com"
                          },
                          {
                            id: "3",
                            name: "LabEx",
                            address: "Titova 1",
                            phone: "061111722",
                            email: "labmail3@gmail.com"
                          },
                          {
                            id: "4",
                            name: "LabPlus",
                            address: "Obala Kulina Bana 9",
                            phone: "061111722",
                            email: "labmail4@gmail.com"
                          },
                          {
                            id: "5",
                            name: "MediLab",
                            address: "Zmaja od Bosne 8",
                            phone: "061111722",
                            email: "labmail5@gmail.com"
                          },
                          {
                            id: "6",
                            name: "BioLab",
                            address: "Kralja Tvrtka 15",
                            phone: "061111722",
                            email: "labmail6@gmail.com"
                          },
                          {
                            id: "7",
                            name: "ZdravoLab",
                            address: "Pofalići 10",
                            phone: "061111722",
                            email: "labmail1@gmail.com"
                          },
                          {
                            id: "8",
                            name: "LabPoint",
                            address: "Titova 45",
                            phone: "061111722",
                            email: "labmail1@gmail.com"
                          },
                          {
                            id: "9",
                            name: "CityLab",
                            address: "Safvet-bega Bašagića 27",
                            phone: "061111722",
                            email: "labmail1@gmail.com"
                          },
                          {
                            id: "10",
                            name: "LabExpert",
                            address: "Franjevaca 8",
                            phone: "061111722",
                            email: "labmail1@gmail.com"
                          },
                          {
                            id: "11",
                            name: "LabMedic",
                            address: "Marsala Tita 11",
                            phone: "061111722",
                            email: "labmail1@gmail.com"
                          },
                          {
                            id: "12",
                            name: "LabNova",
                            address: "Zmaja od Bosne 16",
                            phone: "061111722",
                            email: "labmail1@gmail.com"
                          },
                          {
                            id: "13",
                            name: "MegaLab",
                            address: "Titova 32",
                            phone: "061111722",
                            email: "labmail1@gmail.com"
                          },
                          {
                            id: "14",
                            name: "DermLab",
                            address: "Hamdije Ćemerlića 2",
                            phone: "061111722",
                            email: "labmail1@gmail.com"
                          },
                          {
                            id: "15",
                            name: "MedLab24",
                            address: "Bistrik 5",
                            phone: "061111722",
                            email: "labmail1@gmail.com"
                          },
                          {
                            id: "16",
                            name: "LabCentar",
                            address: "Aleja Bosne Srebrene 3",
                            phone: "061111722",
                            email: "labmail1@gmail.com"
                          },
                          {
                            id: "17",
                            name: "LabVita",
                            address: "Hamdije Čemerlića 12",
                            phone: "061111722",
                            email: "labmail1@gmail.com"
                          },
                          {
                            id: "18",
                            name: "LabClinic",
                            address: "Džemala Bijedića 55",
                            phone: "061111722",
                            email: "labmail1@gmail.com"
                          },
                          {
                            id: "19",
                            name: "LabTest",
                            address: "Titova 21",
                            phone: "061111722",
                            email: "labmail1@gmail.com"
                          },
                          {
                            id: "20",
                            name: "Eurofarm",
                            address: "Grbavicka 20",
                            phone: "061111722",
                            email: "labmail1@gmail.com"
                          },
                        ];


        const filteredLabs = Labs.filter((lab) =>
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

  const handleLabPress = (lab) => {
    setSelectedLab(lab);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedLab(null);
    setModalVisible(false);
  };

  const navigateToLabInfo = () => {
    navigation.navigate("LabInfo", { laboratory: selectedLab });
  };

  const renderLaboratories = () => {
    if (loading) {
      return <Text>Loading laboratories...</Text>;
    }

    if (laboratories.length === 0) {
      return <Text>No laboratories found.</Text>;
    }

    return laboratories.map((lab) => (
      <TouchableOpacity
        key={lab.id}
        style={[styles.labContainer, { borderColor: styles.searchBar.borderColor }]}
        onPress={() => handleLabPress(lab)}
      >
        <View style={styles.imageContainer}>
          <Image source={require("../assets/lab.jpeg")} style={styles.headerImage} />
        </View>
        <View style={styles.labInfoContainer}>
          <Text style={styles.labName}>{lab.name}</Text>
          <Text style={styles.labAddress}>{lab.address}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <Header />

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <AntDesign name="search1" size={20} color="#9E9E9E" style={styles.searchIcon} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#9E9E9E"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Laboratories */}
      <View style={styles.laboratories}>
        <Text style={styles.laboratoriesTitle}>Stay healthy.</Text>
        {renderLaboratories()}
      </View>

      {/* Laboratory Modal */}
      <Modal visible={modalVisible} animationType="slide" onRequestClose={closeModal}>
        <TouchableOpacity style={styles.modalContainer} onPress={navigateToLabInfo}>
          <LaboratoryScreen laboratory={selectedLab} />
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    backgroundColor: "#E6E6E6",
    paddingHorizontal: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#149998",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  laboratories: {
    flex: 1,
    padding: 10,
  },
  laboratoriesTitle: {
    fontSize: 36,
    marginBottom: 10,
    marginLeft: 90,
    color: "#9E9E9E",
  },
  labContainer: {
    backgroundColor: "#149998",
    borderWidth: 2,
    borderColor: "#149998",
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    flexDirection: "row",
  },
  imageContainer: {
    marginRight: 10,
  },
  headerImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 8,
  },
  labInfoContainer: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  labName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#FFFFFF",
  },
  labAddress: {
    fontSize: 16,
    color: "#FFC857",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});

export default HomeScreen;
