import { useUser } from "@clerk/clerk-expo";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useFonts } from "expo-font";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { PhotoIcon, AcademicCapIcon } from "react-native-heroicons/solid";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const CustomTextInput = (props) => {
  const defaultColor = "#999999ff";
  const { error, style, ...rest } = props;

  return (
    <>
      <TextInput
        {...rest}
        placeholderTextColor={defaultColor}
        style={[styles.input, style, error && styles.inputError]}
      />
      {error ? (
        <Text style={styles.errorText}>
          {typeof error === "string" ? error : "Required"}
        </Text>
      ) : null}
    </>
  );
};

export default function AddBooksScreen() {
  const ref = useRef();
  const { user } = useUser();
  const insets = useSafeAreaInsets();
  const [uris, setUris] = useState([]);
  const [space, setSpace] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    Ionicons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf"),
  });

  const defFD = {
    imgs: [],
    title: "",
    subjects: [""],
    institution: "", // NEW
    grade: "",
    type: "",
    board: "",
    condition: "",
    price: "", // NEW
    giverDetails: {
      id: user?.id,
      ownerName: user?.fullName || "",
    },
  };

  const [formData, setFormData] = useState(defFD);

  const [errors, setErrors] = useState({
    imgs: false,
    title: false,
    subjects: [false],
    institution: false, // NEW
    grade: false,
    condition: false,
    board: false,
    type: false,
    price: false, // NEW
    ownerName: false,
  });

  useEffect(() => {
    let backHandler = Keyboard.addListener("keyboardDidHide", () => {
      setSpace(0);
      TextInput.State.currentlyFocusedInput()?.blur();
    });
    let kbdHL = Keyboard.addListener("keyboardDidShow", (event) => {
      setSpace(event.endCoordinates.height);
    });

    return () => {
      backHandler.remove();
      kbdHL.remove();
    };
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      allowsEditing: true,
      base64: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      let newImgs = [...formData.imgs];

      result.assets.forEach((u) => {
        setUris((prevUris) => [...prevUris, u.uri]);

        newImgs.push(
          "data:image/" + u.mimeType.split("/")[1] + ";base64," + u.base64,
        );
      });

      setFormData({ ...formData, imgs: newImgs });
      setErrors((prev) => ({ ...prev, imgs: false }));
    }
  };

  const removeImg = (index) => {
    let newUris = [...uris];
    let newImgs = [...formData.imgs];

    newUris.splice(index, 1);
    newImgs.splice(index, 1);

    setUris(newUris);
    setFormData({ ...formData, imgs: newImgs });
  };

  const validate = () => {
    const newErrors = {
      imgs: false,
      title: false,
      subjects: [],
      institution: false,
      grade: false,
      condition: false,
      board: false,
      type: false,
      price: false,
      ownerName: false,
    };

    if (!formData.imgs || formData.imgs.length === 0)
      newErrors.imgs = "Please upload at least one image.";
    if (!formData.title || formData.title.trim() === "")
      newErrors.title = "Required.";
    newErrors.subjects = formData.subjects.map((s) =>
      !s || s.trim() === "" ? "Required." : false,
    );

    if (!formData.institution) newErrors.institution = "Required.";

    if (formData.institution === "school" && !formData.grade)
      newErrors.grade = "Required.";

    if (!formData.condition) newErrors.condition = "Required.";
    if (formData.institution === "school" && !formData.board)
      newErrors.board = "Required.";
    if (!formData.type) newErrors.type = "Required.";

    if (!formData.price) newErrors.price = "Required.";
    else if (isNaN(formData.price)) newErrors.price = "Invalid price.";

    if (!formData.giverDetails.ownerName) newErrors.ownerName = "Required.";

    setErrors(newErrors);

    const hasError = !!(
      newErrors.imgs ||
      newErrors.title ||
      newErrors.subjects.some((v) => v) ||
      newErrors.institution ||
      newErrors.grade ||
      newErrors.condition ||
      newErrors.type ||
      newErrors.board ||
      newErrors.price ||
      newErrors.ownerName
    );

    setErrors(newErrors);
    return !hasError;
  };

  const handleUpload = async () => {
    if (!validate()) {
      Alert.alert(
        "Empty fields!",
        "All the details/fields must be filled before submitting. ", //+ JSON.stringify(errors)
      );
      return;
    }

    setLoading(true);

    try {
      let res = await fetch("https://ptb-backend.vercel.app/add-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let data = await res.json();

      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          booksets: [...(user.unsafeMetadata?.booksets || []), data.id],
          bsCount: (user.unsafeMetadata?.bsCount || 0) + 1,
        },
      });

      console.log(data);

      Alert.alert(
        "Success",
        "Requested " + formData.type + " uploaded successfully!",
      );
      setFormData(defFD);
    } catch (error) {
      Alert.alert("Error", "Failed to upload books as " + error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    fontsLoaded && (
      <SafeAreaView
        style={[styles.container, { paddingBottom: -insets.bottom }]}
      >
        <ScrollView ref={ref}>
          <View style={styles.header}>
            <Text style={styles.title}>Request for Addition</Text>
            <Text style={styles.subtitle}>
              Share your books with the community
            </Text>
          </View>

          {/* Upload */}
          <View style={styles.uploadSection}>
            <View style={[styles.uploadCard, errors.imgs && styles.inputError]}>
              <Svg
                stroke="currentColor"
                fill="none"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="200px"
                width="200px"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
              >
                <Path d="M16 5h6M19 2v6M21 11.5V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h7.5" />
                <Path d="M21 15l-3.086-3.086a2 2 0 00-2.828 0L6 21" />
                <Circle cx={9} cy={9} r={2} />
              </Svg>
              <Text style={styles.uploadTitle}>Upload Book Covers</Text>
              <Text style={styles.uploadDesc}>PNG, JPG up to 10MB</Text>
              <TouchableOpacity
                style={styles.uploadBtn}
                onPress={pickImage}
                disabled={loading}
              >
                <Ionicons name="cloud-upload" size={20} color="white" />
                <Text style={styles.uploadBtnText}>Choose Image</Text>
              </TouchableOpacity>
            </View>

            {errors.imgs && <Text style={styles.errorText}>{errors.imgs}</Text>}
          </View>

          {/* Images */}
          <ScrollView horizontal style={styles.selectedSection}>
            {!!uris.length &&
              uris.map((uri, index) => (
                <View style={styles.imgCont} key={index}>
                  <Image source={{ uri }} style={styles.img} />
                  <Entypo
                    name="circle-with-cross"
                    size={32}
                    color="red"
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: 50,
                      position: "absolute",
                      bottom: 10,
                      left: "50%",
                      transform: [{ translateX: -16 }],
                    }}
                    onPress={() => removeImg(index)}
                  />
                </View>
              ))}
          </ScrollView>

          <Text style={styles.sectionTitle2}>Your Name</Text>

          <CustomTextInput
            placeholder="Your Name"
            value={formData.giverDetails.ownerName}
            style={{
              marginInline: 16,
            }}
            onChangeText={(text) => {
              setFormData({
                ...formData,
                giverDetails: {
                  ...formData.giverDetails,
                  ownerName: text,
                },
              });
              setErrors((prev) => ({ ...prev, ownerName: false }));
            }}
            error={errors.ownerName}
          />

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Book Details</Text>

            <CustomTextInput
              placeholder="Book Title"
              value={formData.title}
              onChangeText={(text) => {
                setFormData({ ...formData, title: text });
                setErrors((prev) => ({ ...prev, title: false }));
              }}
              error={errors.title}
            />

            {/* Subjects */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: 6,
                marginBottom: 8,
              }}
            >
              <Text>Add Subjects:</Text>

              <TouchableOpacity
                style={{
                  backgroundColor: "#6366f1",
                  padding: 8,
                  borderRadius: 4,
                }}
                onPress={() => {
                  setFormData((prev) => ({
                    ...prev,
                    subjects: [...prev.subjects, ""],
                  }));

                  setErrors((prev) => ({
                    ...prev,
                    subjects: [...(prev.subjects || []), false],
                  }));
                }}
              >
                <Ionicons name="add" size={20} color="white" />
              </TouchableOpacity>
            </View>

            {formData.subjects.map((subj, idx) => (
              <View
                key={idx}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {/* Input */}
                <View style={{ flex: 1 }}>
                  <CustomTextInput
                    placeholder={`Subject ${idx + 1}`}
                    value={subj}
                    onChangeText={(text) => {
                      const newSubjects = [...formData.subjects];
                      newSubjects[idx] = text;

                      setFormData((prev) => ({
                        ...prev,
                        subjects: newSubjects,
                      }));

                      setErrors((prev) => ({
                        ...prev,
                        subjects: (prev.subjects || []).map((v, i) =>
                          i === idx ? false : v,
                        ),
                      }));
                    }}
                    error={errors.subjects?.[idx]}
                  />
                </View>

                {/* Remove Button */}
                {formData.subjects.length > 1 && (
                  <TouchableOpacity
                    onPress={() => {
                      const newSubjects = [...formData.subjects];
                      const newErrors = [...(errors.subjects || [])];

                      newSubjects.splice(idx, 1);
                      newErrors.splice(idx, 1);

                      setFormData((prev) => ({
                        ...prev,
                        subjects: newSubjects,
                      }));

                      setErrors((prev) => ({
                        ...prev,
                        subjects: newErrors,
                      }));
                    }}
                    style={{
                      padding: 6,
                    }}
                  >
                    <Ionicons name="remove-circle" size={24} color="red" />
                  </TouchableOpacity>
                )}
              </View>
            ))}

            {/* Institution */}
            <Picker
              selectedValue={formData.institution}
              style={[styles.input, errors.institution && styles.inputError]}
              onValueChange={(institution) => {
                setFormData({
                  ...formData,
                  institution,
                  grade: institution === "school" ? formData.grade : "",
                });
                setErrors((prev) => ({
                  ...prev,
                  institution: false,
                }));
              }}
            >
              <Picker.Item label=" -- Select Institution -- " value="" />
              <Picker.Item label="School" value="school" />
              <Picker.Item label="College" value="college" />
              <Picker.Item label="Coaching" value="coaching" />
              <Picker.Item label="Other" value="other" />
            </Picker>

            {/* Grade (only school) */}
            {formData.institution === "school" && (
              <>
                <CustomTextInput
                  placeholder="Grade (1-12)"
                  keyboardType="numeric"
                  maxLength={2}
                  value={formData.grade}
                  onChangeText={(text) => {
                    setFormData({
                      ...formData,
                      grade: text === "0" ? "1" : +text > 12 ? "12" : text,
                    });
                    setErrors((prev) => ({ ...prev, grade: false }));
                  }}
                  error={errors.grade}
                />

                <Picker
                  selectedValue={formData.board}
                  style={[styles.input, errors.board && styles.inputError]}
                  onValueChange={(board) => {
                    setFormData({ ...formData, board });
                    setErrors((prev) => ({ ...prev, board: false }));
                  }}
                >
                  <Picker.Item label=" -- Select Board -- " value="" />
                  <Picker.Item label="CBSE" value="cbse" />
                  <Picker.Item label="ICSE" value="icse" />
                  <Picker.Item label="NCERT" value="ncert" />
                  <Picker.Item label="State Board" value="state_board" />
                </Picker>
              </>
            )}

            {/* Price */}
            <CustomTextInput
              placeholder="Price (₹)"
              keyboardType="numeric"
              value={formData.price}
              onChangeText={(text) => {
                setFormData({ ...formData, price: text });
                setErrors((prev) => ({ ...prev, price: false }));
              }}
              error={errors.price}
            />

            {/* Type */}
            <Picker
              selectedValue={formData.type}
              style={[styles.input, errors.type && styles.inputError]}
              onValueChange={(type) => {
                setFormData({ ...formData, type });
                setErrors((prev) => ({ ...prev, type: false }));
              }}
            >
              <Picker.Item label=" -- Select Type -- " value="" />
              <Picker.Item label="New" value="new" />
              <Picker.Item label="Single Book" value="single_book" />
              <Picker.Item label="Book Set" value="book_set" />
              <Picker.Item label="PYQs" value="pyqs" />
              <Picker.Item label="Notes" value="notes" />
            </Picker>

            {/* Condition */}
            <Picker
              selectedValue={formData.condition}
              style={[styles.input, errors.condition && styles.inputError]}
              onValueChange={(condition) => {
                setFormData({ ...formData, condition });
                setErrors((prev) => ({ ...prev, condition: false }));
              }}
            >
              <Picker.Item label=" -- Select Condition -- " value="" />
              <Picker.Item label="New" value="new" />
              <Picker.Item label="Like New" value="like_new" />
              <Picker.Item label="Used Good" value="used_good" />
              <Picker.Item label="Acceptable" value="used_acceptable" />
              <Picker.Item label="Poor" value="poor" />
            </Picker>
          </View>

          <TouchableOpacity
            style={[
              styles.submitBtn,
              loading && styles.submitBtnDisabled,
              space && { marginBottom: space - insets.bottom },
            ]}
            onPress={handleUpload}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={20} color="white" />
                <Text style={styles.submitBtnText}>Confirm Request</Text>
              </>
            )}
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  imgCont: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // marginVertical: 16,
    // borderRadius: 24,
    // backgroundColor: '#ee0f',
    marginRight: 12,
  },
  img: {
    width: 200,
    height: 300,
    resizeMode: "contain",
  },
  header: {
    padding: 24,
    paddingTop: 18,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
  },
  uploadSection: {
    flexDirection: "column",
    padding: 16,
    gap: 12,
  },
  uploadCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  uploadTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0f172a",
    marginTop: 12,
  },
  uploadDesc: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 4,
  },
  uploadBtn: {
    backgroundColor: "#6366f1",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 12,
  },
  uploadBtnSecondary: {
    backgroundColor: "#8b5cf6",
  },
  uploadBtnText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  selectedSection: {
    // paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 12,
  },
  sectionTitle2: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 12,
    paddingInline: 16,
  },
  bookItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  bookIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  bookName: {
    flex: 1,
    fontSize: 14,
    color: "#334155",
    fontWeight: "500",
  },
  submitBtn: {
    gap: 8,
    borderRadius: 12,
    marginBottom: 24,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    justifyContent: "center",
    backgroundColor: "#10b981",
  },
  submitBtnDisabled: {
    opacity: 0.6,
  },
  submitBtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: "#0f172a",
    marginBottom: 12,
    placeholderTextColor: "#999999ff",
  },
  inputError: {
    borderColor: "#ef4444",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginBottom: 8,
  },
  formSection: {
    padding: 16,
    gap: 12,
  },
});
