import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
    Modal,
    Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Header from "./Header";
import { useNavigation } from "@react-navigation/native";
import LaboratoryScreen from "./LaboratoryScreen";

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
                        email: "labmail1@gmail.com",
                        services: ["Service A", "Service B", "Service C"],
                        doctors: ["Dr. John Doe", "Dr. Jane Smith", "Dr. David Johnson"]
                    },
                    {
                        id: "2",
                        name: "Interlab",
                        address: "Hamdije Kreševljakovića 19",
                        phone: "061111722",
                        email: "labmail2@gmail.com",
                        services: ["Service X", "Service Y", "Service Z"],
                        doctors: ["Dr. Michael Brown", "Dr. Emily Davis", "Dr. Olivia Wilson"]
                    },
                    {
                        id: "3",
                        name: "LabEx",
                        address: "Titova 1",
                        phone: "061111722",
                        email: "labmail3@gmail.com",
                        services: ["Service P", "Service Q", "Service R"],
                        doctors: ["Dr. Christopher Taylor", "Dr. Sophia Martinez", "Dr. Samuel Anderson"]
                    },
                    {
                        id: "4",
                        name: "LabPlus",
                        address: "Obala Kulina Bana 9",
                        phone: "061111722",
                        email: "labmail4@gmail.com",
                        services: ["Service X", "Service Y", "Service Z"],
                        doctors: ["Dr. Michael Brown", "Dr. Emily Davis", "Dr. Olivia Wilson"]
                    },
                    {
                        id: "5",
                        name: "MediLab",
                        address: "Zmaja od Bosne 8",
                        phone: "061111722",
                        email: "labmail5@gmail.com",
                        services: ["Service X", "Service Y", "Service Z"],
                        doctors: ["Dr. Michael Brown", "Dr. Emily Davis", "Dr. Olivia Wilson"]
                    },
                    {
                        id: "6",
                        name: "BioLab",
                        address: "Kralja Tvrtka 15",
                        phone: "061111722",
                        email: "labmail6@gmail.com",
                        services: ["Service X", "Service Y", "Service Z"],
                        doctors: ["Dr. Michael Brown", "Dr. Emily Davis", "Dr. Olivia Wilson"]
                    },
                    {
                        id: "7",
                        name: "ZdravoLab",
                        address: "Pofalići 10",
                        phone: "061111722",
                        email: "labmail1@gmail.com",
                        services: ["Service X", "Service Y", "Service Z"],
                        doctors: ["Dr. Michael Brown", "Dr. Emily Davis", "Dr. Olivia Wilson"]
                    },
                    {
                        id: "8",
                        name: "LabPoint",
                        address: "Titova 45",
                        phone: "061111722",
                        email: "labmail1@gmail.com",
                        services: ["Service X", "Service Y", "Service Z"],
                        doctors: ["Dr. Michael Brown", "Dr. Emily Davis", "Dr. Olivia Wilson"]
                    },
                    {
                        id: "9",
                        name: "CityLab",
                        address: "Safvet-bega Bašagića 27",
                        phone: "061111722",
                        email: "labmail1@gmail.com",
                        services: ["Service X", "Service Y", "Service Z"],
                        doctors: ["Dr. Michael Brown", "Dr. Emily Davis", "Dr. Olivia Wilson"]
                    },
                    {
                        id: "10",
                        name: "LabExpert",
                        address: "Franjevaca 8",
                        phone: "061111722",
                        email: "labmail1@gmail.com",
                        services: ["Service X", "Service Y", "Service Z"],
                        doctors: ["Dr. Michael Brown", "Dr. Emily Davis", "Dr. Olivia Wilson"]
                    },
                    {
                        id: "11",
                        name: "LabMedic",
                        address: "Marsala Tita 11",
                        phone: "061111722",
                        email: "labmail1@gmail.com",
                        services: ["Service X", "Service Y", "Service Z"],
                        doctors: ["Dr. Michael Brown", "Dr. Emily Davis", "Dr. Olivia Wilson"]
                    },
                    {
                        id: "12",
                        name: "LabNova",
                        address: "Zmaja od Bosne 16",
                        phone: "061111722",
                        email: "labmail1@gmail.com",
                        services: ["Service X", "Service Y", "Service Z"],
                        doctors: ["Dr. Michael Brown", "Dr. Emily Davis", "Dr. Olivia Wilson"]
                    },
                    {
                        id: "13",
                        name: "MegaLab",
                        address: "Titova 32",
                        phone: "061111722",
                        email: "labmail1@gmail.com",
                        services: ["Service X", "Service Y", "Service Z"],
                        doctors: ["Dr. Michael Brown", "Dr. Emily Davis", "Dr. Olivia Wilson"]
                    },
                    {
                        id: "14",
                        name: "DermLab",
                        address: "Hamdije Ćemerlića 2",
                        phone: "061111722",
                        email: "labmail1@gmail.com",
                        services: ["Service X", "Service Y", "Service Z"],
                        doctors: ["Dr. Michael Brown", "Dr. Emily Davis", "Dr. Olivia Wilson"]
                    },
                    {
                        id: "15",
                        name: "MedLab24",
                        address: "Bistrik 5",
                        phone: "061111722",
                        email: "labmail1@gmail.com",
                        services: ["Service X", "Service Y", "Service Z"],
                        doctors: ["Dr. Michael Brown", "Dr. Emily Davis", "Dr. Olivia Wilson"]
                    },
                    {
                        id: "16",
                        name: "LabCentar",
                        address: "Aleja Bosne Srebrene 3",
                        phone: "061111722",
                        email: "labmail1@gmail.com",
                        services: ["Service X", "Service Y", "Service Z"],
                        doctors: ["Dr. Michael Brown", "Dr. Emily Davis", "Dr. Olivia Wilson"]
                    },
                    {
                        id: "17",
                        name: "LabVita",
                        address: "Hamdije Čemerlića 12",
                        phone: "061111722",
                        email: "labmail1@gmail.com",
                        services: ["Service X", "Service Y", "Service Z"],
                        doctors: ["Dr. Michael Brown", "Dr. Emily Davis", "Dr. Olivia Wilson"]
                    },
                    {
                        id: "18",
                        name: "LabClinic",
                        address: "Džemala Bijedića 55",
                        phone: "061111722",
                        email: "labmail1@gmail.com",
                        services: ["Service X", "Service Y", "Service Z"],
                        doctors: ["Dr. Michael Brown", "Dr. Emily Davis", "Dr. Olivia Wilson"]
                    },
                    {
                        id: "19",
                        name: "LabTest",
                        address: "Titova 21",
                        phone: "061111722",
                        email: "labmail1@gmail.com",
                        services: ["Service X", "Service Y", "Service Z"],
                        doctors: ["Dr. Michael Brown", "Dr. Emily Davis", "Dr. Olivia Wilson"]
                    },
                    {
                        id: "20",
                        name: "Eurofarm",
                        address: "Grbavicka 20",
                        phone: "061111722",
                        email: "labmail1@gmail.com",
                        services: ["Service X", "Service Y", "Service Z"],
                        doctors: ["Dr. Michael Brown", "Dr. Emily Davis", "Dr. Olivia Wilson"]
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
        setModalVisible(false);
    };

    const navigateToLabInfo = () => {
        navigation.navigate("Laboratory", { lab: selectedLab });
        closeModal();
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
                <Pressable onPress={() => handleLabPress(lab)}>
                    <View style={styles.labInfoContainer}>
                        <Text style={styles.labName}>{lab.name}</Text>
                        <Text style={styles.labAddress}>{lab.address}</Text>
                    </View>
                </Pressable>
            </TouchableOpacity>
        ));
    };

    return (
        <ScrollView style={styles.container}>
            <Header />

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


            <View style={styles.laboratoriesContainer}>
                <Text style={styles.sectionTitle}>Stay healthy.</Text>
                {renderLaboratories()}
            </View>


            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedLab && (
                            <>
                                <Text style={styles.modalLabName}>{selectedLab.name}</Text>
                                <Text style={styles.modalLabAddress}>{selectedLab.address}</Text>

                                <TouchableOpacity style={styles.moreInfoButtonContainer} onPress={navigateToLabInfo}>
                                    <Text style={styles.moreInfoButtonText}>See All The Information</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.closeButtonContainer} onPress={closeModal}>
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
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
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 36,
        marginBottom: 10,
        marginLeft: 90,
        color: "#9E9E9E"
    },
    labContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#149998"
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
        flex: 1

    },
    labName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFFFFF"
    },
    labAddress: {
        color: "#FFC857",
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