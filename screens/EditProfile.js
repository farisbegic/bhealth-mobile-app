import {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Field, Formik} from "formik";
import CustomInput from "../components/common/CustomInput";
import * as Yup from "yup";

const EditProfile = ({ visible, onClose, user }) => {

    const [error, setError] = useState("");

    const initialValues = {
        name: user.name,
        surname: user.surname,
        username: user.username,
        email: user.email,
        password: user.password,
        date: new Date(),
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Required"),
        surname: Yup.string().required("Required"),
        username: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email format").required("Required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Required"),
    });

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
                                <Field
                                    component={CustomInput}
                                    name="email"
                                    placeholder="Email"
                                    textContentType="emailAddress"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    autoCompleteType="email"
                                />
                                <Field
                                    component={CustomInput}
                                    name="password"
                                    placeholder="Password"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                />
                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    style={styles.button}
                                    disabled={!isValid || values.email === ""}
                                >
                                    <Text style={styles.buttonText}>Register</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </Formik>

                    {error !== "" && <Text style={{ color: "red" }}>{error}</Text>}
                </View>

                <View style={styles.buttonContainer}>
                    <View style={styles.button}>

                        <TouchableOpacity style={styles.editProfileButton}>
                            <Text style={styles.buttonText}>Edit</Text>
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
}

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column', // default
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputText: {
        width: '70%',
        backgroundColor: 'white',
        borderWidth: 1,
        fontSize: 16,
        padding: 4
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16
    },
    button: {
        width: 120,
        marginHorizontal: 8
    },
    image: {
        width:100,
        height: 100,
        margin: 20
    },
    editProfileButton: {
        height: 40,
        width: 100,
        backgroundColor: "#369",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2,
        padding: 10,
        marginTop: 30,
    },
    buttonText: {
        color: "white",
        fontWeight: 500,
    },
    closeButton: {
        height: 40,
        width: 100,
        backgroundColor: "#cf0808",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2,
        padding: 10,
        marginTop: 30,
    },
    updateForm: {
        width: "80%",
        paddingTop: 30,
        alignItems: "center",
        gap: 10,
        justifyContent: "center",
    },
});