import { StyleSheet, Text, TextInput, View } from "react-native";

const InputBox = ({
  placeholder,
  autoComplete,
  secureTextEntry,
  value,
  setValue,
  keyboardType,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        placeholder={placeholder}
        autoComplete={autoComplete}
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  inputBox: {
    backgroundColor: "#ffffff",
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    color: "#000000",
  },
});

export default InputBox;
