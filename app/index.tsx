import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  useColorScheme,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { StatusBar } from "expo-status-bar";

const API_URL = process.env.EXPO_PUBLIC_EXCHANGE_RATE_API_URL || "";

interface ExchangeRates {
  [key: string]: number;
}

export default function Index() {
  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("INR");
  const [convertedAmount, setConvertedAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const colorScheme = useColorScheme();

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async (): Promise<void> => {
    try {
      if (!API_URL) {
        console.error("API URL is not defined");
        setIsLoading(false);
        return;
      }
      const response = await axios.get(API_URL);
      // Check if the response is successful or not. If not, log the error and return.
      if (response?.data?.result !== "success") {
        console.error("Error fetching exchange rates:", response.data);
        setIsLoading(false);
        return;
      }
      setExchangeRates(response.data.conversion_rates);
      setCurrencies(Object.keys(response.data.conversion_rates).sort());
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      setIsLoading(false);
    }
  };

  const convertCurrency = (): void => {
    const numAmount = Number(amount);
    if (isNaN(numAmount)) {
      alert("Please enter a valid amount");
      return;
    }

    const baseAmount = numAmount / exchangeRates[fromCurrency];
    const convertedValue = baseAmount * exchangeRates[toCurrency];
    setConvertedAmount(convertedValue.toFixed(2));
  };

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: colorScheme === "dark" ? "#1c1c1e" : "#f0f0f0" },
        ]}
      >
        <ActivityIndicator
          size="large"
          color={colorScheme === "dark" ? "#ffffff" : "#007AFF"}
        />
        <Text style={{ color: colorScheme === "dark" ? "#ffffff" : "#000000" }}>
          Loading exchange rates...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: colorScheme === "dark" ? "#1c1c1e" : "#f0f0f0" },
        ]}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              {
                color: colorScheme === "dark" ? "#ffffff" : "#000000",
                borderColor: colorScheme === "dark" ? "#ffffff" : "gray",
              },
            ]}
            keyboardType="numeric"
            placeholder="Enter amount"
            placeholderTextColor={colorScheme === "dark" ? "#a0a0a0" : "#808080"}
            value={amount}
            onChangeText={setAmount}
          />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={fromCurrency}
              style={[
                styles.picker,
                {
                  color: colorScheme === "dark" ? "#ffffff" : "#000000",
                  // backgroundColor: colorScheme === "dark" ? "#000000" : "#ffffff",
                },
              ]}
              onValueChange={(itemValue: string) => setFromCurrency(itemValue)}
            >
              {currencies.map((currency) => (
                <Picker.Item
                  key={currency}
                  label={currency}
                  value={currency}
                  color={colorScheme === "dark" ? "#ffffff" : "#000000"}
                  style={{ backgroundColor: colorScheme === "dark" ? "#000000" : "#ffffff" }}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text
            style={[
              styles.resultText,
              { color: colorScheme === "dark" ? "#ffffff" : "#000000" },
            ]}
          >
            {convertedAmount}
          </Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={toCurrency}
              style={[
                styles.picker,
                {
                  color: colorScheme === "dark" ? "#ffffff" : "#000000",
                  // backgroundColor: colorScheme === "dark" ? "#000000" : "#ffffff",
                },
              ]}
              onValueChange={(itemValue: string) => setToCurrency(itemValue)}
            >
              {currencies.map((currency) => (
                <Picker.Item
                  key={currency}
                  label={currency}
                  value={currency}
                  color={colorScheme === "dark" ? "#ffffff" : "#000000"}
                  style={{ backgroundColor: colorScheme === "dark" ? "#000000" : "#ffffff" }}
                />
              ))}
            </Picker>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={convertCurrency}>
          <Text style={styles.buttonText}>Convert</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 50,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  pickerContainer: {
    flex: 1,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  picker: {},
  resultText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
