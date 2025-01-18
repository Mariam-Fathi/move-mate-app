import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { InputFieldProps } from "@/types/type";

const InputField = ({
  label,
  icon,
  emoji,
  colors = ["#d4d4d4", "#d4d4d4", "#d4d4d4"],
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500  ${containerStyle}`}
          >
            {icon && (
              <Image
                source={icon}
                className={`w-6 h-6 mb-[-px] ml-4 ${iconStyle}`}
              />
            )}
            <TextInput
              className={`rounded-full p-4 font-JakartaMedium text-[15px] flex-1 ${inputStyle} text-left`}
              secureTextEntry={secureTextEntry}
              {...props}
            />
            {/* {secureTextEntry && (
              <LinearGradient
                colors={colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  padding: 4,
                  borderRadius: 60,
                  marginRight: 16,
                }}
              >
                <View className="w-9 h-9 bg-neutral-100 items-center justify-center rounded-full">
                  <Text className="text-center">{emoji}</Text>
                </View>
              </LinearGradient>
            )} */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
