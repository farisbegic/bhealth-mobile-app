import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, TouchableHighlight } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LaboratoryScreen = ({ route, navigation }) => {
  const { lab } = route.params;
  const [selectedDoctor, setSelectedDoctor] = useState(lab.doctors[0]);
  const [selectedService, setSelectedService] = useState(lab.services[0]);
  const [showDoctorsModal, setShowDoctorsModal] = useState(false);
  const [showServicesModal, setShowServicesModal] = useState(false);

  const handleClose = () => {
    navigation.goBack();
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDoctorsModal(false);
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setShowServicesModal(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Laboratory Details</Text>
        </View>
        <View style={styles.contentContainer}>
          <Image source={require("../assets/lab.jpeg")} style={styles.headerImage} />
          <Text style={styles.title}>Name:</Text>
          <Text style={styles.info}>{lab.name}</Text>
          <Text style={styles.title}>Address:</Text>
          <Text style={styles.info}>{lab.address}</Text>
          <Text style={styles.title}>Phone:</Text>
          <Text style={styles.info}>{lab.phone}</Text>
          <Text style={styles.title}>Email:</Text>
          <Text style={styles.info}>{lab.email}</Text>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Services:</Text>
            <TouchableHighlight
              style={styles.dropdownButton}
              underlayColor="#eeeeee"
              onPress={() => setShowServicesModal(true)}
            >
              <>
                <Text style={styles.dropdownButtonText}>{selectedService}</Text>
                <Ionicons name="caret-down" size={16} color="#666666" style={styles.dropdownButtonIcon} />
              </>
            </TouchableHighlight>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Doctors:</Text>
            <TouchableHighlight
              style={styles.dropdownButton}
              underlayColor="#eeeeee"
              onPress={() => setShowDoctorsModal(true)}
            >
              <>
                <Text style={styles.dropdownButtonText}>{selectedDoctor}</Text>
                <Ionicons name="caret-down" size={16} color="#666666" style={styles.dropdownButtonIcon} />
              </>
            </TouchableHighlight>
          </View>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showServicesModal}
        onRequestClose={() => setShowServicesModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {lab.services.map((service, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalItem}
                onPress={() => handleServiceSelect(service)}
              >
                <Text style={styles.modalItemText}>{service}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showDoctorsModal}
        onRequestClose={() => setShowDoctorsModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {lab.doctors.map((doctor, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalItem}
                onPress={() => handleDoctorSelect(doctor)}
              >
                <Text style={styles.modalItemText}>{doctor}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FDFC",
  },
  header: {
    backgroundColor: "#149998",
    padding: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#666666",
  },
  info: {
    fontSize: 16,
    color: "#666666",
    fontStyle: "italic",
  },
  sectionContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#666666",
  },
  dropdownButton: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#149998",
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownButtonText: {
    fontSize: 16,
    color: "#666666",
  },
  dropdownButtonIcon: {
    marginLeft: 5,
  },
  closeButton: {
    backgroundColor: "#149998",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center",
    width: "100%",
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerImage: {
    width: 300,
    height: 300,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    alignSelf: "center",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
  },
  modalItemText: {
    fontSize: 16,
    color: "#333333",
  },
});


export default LaboratoryScreen;
