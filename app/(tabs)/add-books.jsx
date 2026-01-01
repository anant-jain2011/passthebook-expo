import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useFonts } from 'expo-font';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useRef, useState } from 'react';
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
    View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const CustomTextInput = (props) => {
    const defaultColor = '#999999ff';

    return (
        <TextInput
            {...props}
            placeholderTextColor={defaultColor}
            style={styles.input}
        />
    );
};

export default function AddBooksScreen() {
    const ref = useRef();
    const { user } = useUser();
    const [fontsLoaded] = useFonts({
        'Ionicons': require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
    });
    const [uris, setUris] = useState([]);
    const [space, setSpace] = useState(false);
    const [loading, setLoading] = useState(false);
    const insets = useSafeAreaInsets();
    const [formData, setFormData] = useState({
        imgs: [],
        title: '',
        subjects: [""],
        grade: '',
        board: '',
        condition: '',
        giverDetails: {
            ownerName: user.fullName,
            email: user.emailAddresses[0].emailAddress,
            whatsAppNum: user.phoneNumbers[0]?.phoneNumber || '',
        },
    });

    useEffect(() => {
        let backHandler = Keyboard.addListener("keyboardDidHide", () => {
            setSpace(false);
            TextInput.State.currentlyFocusedInput()?.blur();
        });

        return () => backHandler.remove();
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
            result.assets.map(async u => {
                setUris(prevUris => [...prevUris, u.uri]);
                setFormData({
                    ...formData,
                    imgs: [...formData.imgs, "data:image/" + u.mimeType.split('/')[1] + ";base64," + u.base64]
                });
            })
        }
    };

    const handleUpload = async () => {
        setLoading(true);

        try {
            // TODO: Implement upload logic
            let res = await fetch('http://ptb-backend.vercel.app/add-book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            let data = await res.json();


            await user.update({
                unsafeMetadata: {
                    ...user.unsafeMetadata,
                    hasUploadedBooks: true,
                    booksets: [...user.unsafeMetadata?.booksets || [], data.id],
                    bsCount: (user.unsafeMetadata?.bsCount || 0) + 1,
                }
            });

            console.log(data);

            Alert.alert('Success', 'Books uploaded successfully!');
        } catch (error) {
            Alert.alert('Error', 'Failed to upload books as ' + error.message);
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    const focusGVD = () => {
        setSpace(true);

        ref.current.scrollToEnd({ animated: true, duration: 2000 });
    };

    return (
        fontsLoaded && (
            <SafeAreaView style={[styles.container, {paddingBottom: -insets.bottom }]}>
                <ScrollView ref={ref}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Add Book Sets</Text>
                        <Text style={styles.subtitle}>Share your books with the community</Text>
                    </View>

                    <View style={styles.uploadSection}>
                        <View style={styles.uploadCard}>
                            <Ionicons name="images" size={48} color="#6366f1" />
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

                    </View>

                    {!!uris.length && uris.map((uri, index) =>
                        <View style={styles.imgCont} key={index}>
                            <Image source={{ uri }} style={styles.img} />
                        </View>
                    )}

                    <View style={styles.formSection}>
                        <Text style={styles.sectionTitle}>Book Details</Text>

                        <CustomTextInput
                            placeholder="Book Title"
                            value={formData.title}
                            onChangeText={(text) => setFormData({ ...formData, title: text })}
                        />

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginInline: 6 }}>
                            <Text>Add Subjects: </Text>

                            <TouchableOpacity style={{ backgroundColor: '#6366f1', padding: 8, borderRadius: 4 }} onPress={() => setFormData({ ...formData, subjects: [...formData.subjects, ""] })}>
                                <Ionicons name="add" size={20} color="white" />
                            </TouchableOpacity>
                        </View>

                        {formData.subjects && formData.subjects.map((subj, idx) =>
                            <CustomTextInput
                                key={idx}
                                placeholder={`Subject ${idx + 1}`}
                                value={subj}
                                onChangeText={(text) => {
                                    const newSubjects = [...formData.subjects];
                                    newSubjects[idx] = text;
                                    setFormData({ ...formData, subjects: newSubjects });
                                }}
                            />
                        )}

                        <CustomTextInput
                            placeholder="Grade"
                            keyboardType="numeric"
                            value={formData.grade}
                            onChangeText={(text) => setFormData({ ...formData, grade: text })}
                        />

                        <Picker
                            selectedValue={formData.condition}
                            style={styles.input}
                            onValueChange={condition => setFormData({ ...formData, condition })}
                        >
                            <Picker.Item style={styles.input} label=" -- Select Condition -- " value="" />
                            <Picker.Item style={styles.input} label="   New" value="new" />
                            <Picker.Item style={styles.input} label="   Like New" value="like_new" />
                            <Picker.Item style={styles.input} label="   Used - Good" value="used_good" />
                            <Picker.Item style={styles.input} label="   Used - Acceptable" value="used_acceptable" />
                            <Picker.Item style={styles.input} label="   Used - Poor" value="poor" />
                        </Picker>

                        <Picker
                            selectedValue={formData.board}
                            style={styles.input}
                            onValueChange={board => setFormData({ ...formData, board })}
                        >
                            <Picker.Item style={styles.input} label=" -- Select Board -- " value="" />
                            <Picker.Item style={styles.input} label="   CBSE" value="cbse" />
                            <Picker.Item style={styles.input} label="   ICSE" value="icse" />
                            <Picker.Item style={styles.input} label="   NCERT" value="ncert" />
                            <Picker.Item style={styles.input} label="   UK Board" value="uk_board" />
                        </Picker>

                        <Text style={styles.sectionTitle}>Giver Details</Text>

                        <CustomTextInput
                            placeholder="Your Name"
                            value={formData.giverDetails.ownerName}
                            onFocus={focusGVD}
                            onChangeText={(text) => setFormData({
                                ...formData,
                                giverDetails: { ...formData.giverDetails, ownerName: text }
                            })}
                        />

                        <CustomTextInput
                            placeholder="Email"
                            keyboardType="email-address"
                            value={formData.giverDetails.email}
                            onFocus={focusGVD}
                            onChangeText={(text) => setFormData({
                                ...formData,
                                giverDetails: { ...formData.giverDetails, email: text }
                            })}
                        />

                        <CustomTextInput
                            placeholder="WhatsApp Number"
                            keyboardType="phone-pad"
                            value={formData.giverDetails.whatsAppNum}
                            onFocus={focusGVD}
                            onChangeText={(text) => setFormData({
                                ...formData,
                                giverDetails: { ...formData.giverDetails, whatsAppNum: text }
                            })}
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.submitBtn, loading && styles.submitBtnDisabled, space && { marginBottom: 195 }]}
                        onPress={handleUpload}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <>
                                <Ionicons name="checkmark-circle" size={20} color="white" />
                                <Text style={styles.submitBtnText}>Upload Books</Text>
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
        backgroundColor: '#f8fafc',
    },
    imgCont: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
    },
    img: {
        width: 200,
        height: 300,
        resizeMode: 'contain',
        borderRadius: 12,
    },
    header: {
        padding: 24,
        paddingTop: 18,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#64748b',
    },
    uploadSection: {
        flexDirection: 'row',
        padding: 16,
        gap: 12,
    },
    uploadCard: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    uploadTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0f172a',
        marginTop: 12,
    },
    uploadDesc: {
        fontSize: 12,
        color: '#94a3b8',
        marginTop: 4,
    },
    uploadBtn: {
        backgroundColor: '#6366f1',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        marginTop: 12,
    },
    uploadBtnSecondary: {
        backgroundColor: '#8b5cf6',
    },
    uploadBtnText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    selectedSection: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0f172a',
        marginBottom: 12,
    },
    bookItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    bookIcon: {
        width: 40,
        height: 40,
        backgroundColor: '#f1f5f9',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    bookName: {
        flex: 1,
        fontSize: 14,
        color: '#334155',
        fontWeight: '500',
    },
    submitBtn: {
        gap: 8,
        borderRadius: 12,
        marginBottom: 24,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        justifyContent: 'center',
        backgroundColor: '#10b981',
    },
    submitBtnDisabled: {
        opacity: 0.6,
    },
    submitBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 14,
        color: '#0f172a',
        marginBottom: 12,
        placeholderTextColor: "#999999ff"
    },
    formSection: {
        padding: 16,
        gap: 12,
    }
});