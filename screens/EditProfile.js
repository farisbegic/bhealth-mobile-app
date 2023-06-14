import React, {useState} from "react";
import {db} from "../firebase";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import colors from "../constants/colors";
import collections from "../constants/collections";
import {Field, Formik} from "formik";
import * as Yup from "yup";
import CustomInput from "../components/common/CustomInput";

const EditProfile = ({ visible, onClose, user, onUpdate }) => {

    const [error, setError] = useState("");

    const initialValues = {
        name: user.name,
        surname: user.surname,
        username: user.username,
    };

    const validationSchema = Yup.object({
        name: Yup.string(),
        surname: Yup.string(),
        username: Yup.string(),
    });

    const handleUpdate = async (values) => {
        try {
            const docRef = doc(db, collections.users, user.id);
            const docSnapshot = await getDoc(docRef);

            if (docSnapshot.exists()) {
                await updateDoc(docRef, {
                    name: values.name,
                    surname: values.surname,
                    username: values.username,
                });
            } else {
                console.log('Document does not exist!');
            }
        } catch (error) {
            console.error('Error while updating document:', error);
        }

        const updatedUserData = { ...user, ...values };
        onUpdate(updatedUserData);

        onClose();
    };


    return (
        <Modal visible={visible} animationType='slide'>
            <View style={styles.container}>
                <View style={styles.updateForm}>
                    <Formik
                        validationSchema={validationSchema}
                        initialValues={initialValues}
                        onSubmit={(values) => handleUpdate(values)}
                    >
                        {({ handleSubmit, isValid, values }) => (
                            <>
                                <Field
                                    component={CustomInput}
                                    name="name"
                                    placeholder="Name"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                                <Field
                                    component={CustomInput}
                                    name="surname"
                                    placeholder="Surname"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                                <Field
                                    component={CustomInput}
                                    name="username"
                                    placeholder="Username"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    style={styles.button}
                                    disabled={!isValid || values.email === ""}
                                >
                                    <Text style={styles.buttonText}>Edit</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </Formik>
                    {error !== "" && <Text style={{ color: "red" }}>{error}</Text>}

                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
    heading: {
        fontSize: 25,
        fontWeight: "bold",
    },
    icon: {
        fontSize: 40,
    },
    updateForm: {
        width: "80%",
        paddingTop: 30,
        alignItems: "center",
        gap: 10,
        justifyContent: "center",
    },
    input: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.4)",
        borderRadius: 5,
        padding: 10,
    },
    button: {
        width: "100%",
        height: 40,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
    closeButton: {
        width: "100%",
        height: 40,
        backgroundColor: colors.red,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginBottom: 10,
    },
});
