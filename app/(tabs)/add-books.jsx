import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function AddBooksScreen() {
    const [loading, setLoading] = useState(false);
    const [uris, setUris] = useState([]);
    const [formData, setFormData] = useState({
        imgs: [],
        title: '',
        subjects: [""],
        grade: '',
        board: '',
        condition: '',
        giverDetails: {
            ownerName: '',
            email: '',
            whatsAppNum: '',
        },
    });

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

            console.log(data);

            Alert.alert('Success', 'Books uploaded successfully!');
        } catch (error) {
            Alert.alert('Error', 'Failed to upload books as ' + error.message);
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
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

                <TextInput
                    style={styles.input}
                    placeholder="Book Title"
                    value={formData.title}
                    onChangeText={(text) => setFormData({ ...formData, title: text })}
                />

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginInline: 6 }}>
                    <Text>Add Subjects: </Text>

                    <TouchableOpacity style={{ backgroundColor: '#6366f1', padding: 8, borderRadius: 4 }} onPress={()=>setFormData({...formData, subjects: [...formData.subjects, ""]})}>
                        <Ionicons name="add" size={20} color="white" />
                    </TouchableOpacity>
                </View>

                {formData.subjects && formData.subjects.map((subj, idx) =>
                    <TextInput
                        key={idx}
                        style={styles.input}
                        placeholder={`Subject ${idx + 1}`}
                        value={subj}
                        onChangeText={(text) => {
                            const newSubjects = [...formData.subjects];
                            newSubjects[idx] = text;
                            setFormData({ ...formData, subjects: newSubjects });
                        }}
                    />
                )}

                <TextInput
                    style={styles.input}
                    placeholder="Grade"
                    keyboardType="numeric"
                    value={formData.grade}
                    onChangeText={(text) => setFormData({ ...formData, grade: text })}
                />

                <Picker
                    style={styles.input}
                    selectedValue={formData.condition}
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
                    style={styles.input}
                    selectedValue={formData.board}
                    onValueChange={board => setFormData({ ...formData, board })}
                >
                    <Picker.Item style={styles.input} label=" -- Select Board -- " value="" />
                    <Picker.Item style={styles.input} label="   CBSE" value="cbse" />
                    <Picker.Item style={styles.input} label="   ICSE" value="icse" />
                    <Picker.Item style={styles.input} label="   NCERT" value="ncert" />
                    <Picker.Item style={styles.input} label="   UK Board" value="uk_board" />
                </Picker>

                <Text style={styles.sectionTitle}>Giver Details</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your Name"
                    value={formData.giverDetails.ownerName}
                    onChangeText={(text) => setFormData({
                        ...formData,
                        giverDetails: { ...formData.giverDetails, ownerName: text }
                    })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={formData.giverDetails.email}
                    onChangeText={(text) => setFormData({
                        ...formData,
                        giverDetails: { ...formData.giverDetails, email: text }
                    })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="WhatsApp Number"
                    keyboardType="phone-pad"
                    value={formData.giverDetails.whatsAppNum}
                    onChangeText={(text) => setFormData({
                        ...formData,
                        giverDetails: { ...formData.giverDetails, whatsAppNum: text }
                    })}
                />
            </View>

            <TouchableOpacity
                style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
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
        backgroundColor: '#10b981',
        marginHorizontal: 16,
        marginBottom: 24,
        paddingVertical: 16,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
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
    },
    formSection: {
        padding: 16,
        gap: 12,

    }
});