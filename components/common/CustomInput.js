import React from "react";
import { Text, TextInput, StyleSheet } from "react-native";

const CustomInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <>
      <TextInput
        style={[
          styles.input,
          props.multiline && { height: props.numberOfLines * 40 },
          hasError && styles.errorInput,
        ]}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.4)",
    borderRadius: 5,
    padding: 10,
  },
  errorText: {
    width: "100%",
    fontSize: 13,
    color: "red",
  },
  errorInput: {
    borderColor: "red",
  },
});

export default CustomInput;
