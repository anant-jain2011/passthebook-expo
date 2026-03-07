import { useAuth, useUser } from "@clerk/clerk-expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function ProfileScreen() {
    const insets = useSafeAreaInsets();
    const { id } = useLocalSearchParams();
    const [user, setUser] = useState(null);

    const [books, setBooks] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(
                    "https://ptb-backend.vercel.app/get-users?id=" + id
                );
                const data = await res.json();
                setUser(data);
            } catch (err) {
                console.log("err1:", err);
            }
        })();
    }, []);

    // FETCH DATA
    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    // Approved items
                    const resp = await fetch(
                        "https://ptb-backend.vercel.app/get-books?id2=" + id
                    );
                    const bs = await resp.json();

                    setBooks(bs || []);
                } catch (err) {
                    console.log("err 2:", err);
                }
            })();
        }
    }, [user]);

    return (
        <SafeAreaView style={{ ...styles.container, paddingBottom: -insets.bottom }}>
            {user && (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* HEADER */}
                    {/* <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.settingsButton}
                            onPress={() => router.push("/notifications")}
                        >
                            <MaterialCommunityIcons
                                name="bell-outline"
                                size={30}
                                color="#333"
                            />
                        </TouchableOpacity>

                        <Text style={styles.headerTitle}>Profile</Text>

                        <TouchableOpacity style={styles.settingsButton}>
                            <MaterialCommunityIcons
                                name="share-variant"
                                size={24}
                                color="#333"
                            />
                        </TouchableOpacity>
                    </View> */}

                    {/* PROFILE */}
                    <View style={styles.profileSection}>
                        {user.imageUrl && (
                            <Image
                                source={{ uri: user.imageUrl }}
                                style={styles.profileImage}
                            />
                        )}

                        <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
                        <Text style={styles.handle}>
                            {user.emailAddresses[0].emailAddress}
                        </Text>

                        {user.unsafeMetadata?.bio && (
                            <Text style={styles.bio}>
                                {user.unsafeMetadata.bio}
                            </Text>
                        )}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Uploads</Text>

                        {books.length > 0 ? (
                            books.map((bookset, index) => (
                                <View style={styles.bookCard} key={index}>
                                    <Image
                                        source={{ uri: bookset.imgs[0] }}
                                        style={styles.bookCover}
                                    />

                                    <View style={styles.bookInfo}>
                                        <Text style={styles.bookTitle}>
                                            {bookset.title}
                                        </Text>

                                        <Text style={styles.bookAuthor}>
                                            Grade: {bookset.grade}
                                        </Text>

                                        <Text style={styles.progressText}>
                                            Subjects:{" "}
                                            {bookset.subjects.join(", ")}
                                        </Text>

                                        <Text style={styles.progressText}>
                                            Board:{" "}
                                            {bookset.board.toUpperCase()}
                                        </Text>

                                        <Text style={styles.progressText}>
                                            Condition:{" "}
                                            {bookset.condition[0].toUpperCase() +
                                                bookset.condition.slice(1)}
                                        </Text>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.emptyText}>
                                Nothing to show.
                            </Text>
                        )}
                    </View>

                    <View style={styles.spacer} />
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

// STYLES
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 12,
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },

    settingsButton: {
        padding: 8,
    },

    profileSection: {
        alignItems: "center",
        paddingVertical: 24,
    },

    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },

    name: {
        fontSize: 24,
        fontWeight: "700",
    },

    handle: {
        fontSize: 14,
        color: "#999",
    },

    bio: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        marginHorizontal: 24,
    },

    statsContainer: {
        flexDirection: "row",
        marginVertical: 20,
        backgroundColor: "#FFF",
        borderRadius: 12,
        paddingVertical: 16,
        width: width - 32,
    },

    statItem: {
        flex: 1,
        alignItems: "center",
    },

    statNumber: {
        fontSize: 18,
        fontWeight: "700",
    },

    statLabel: {
        fontSize: 12,
        color: "#999",
    },

    div: {
        width: 1,
        backgroundColor: "#E0E0E0",
    },

    buttonContainer: {
        flexDirection: "row",
        paddingHorizontal: 16,
    },

    primaryButton: {
        flex: 1,
        backgroundColor: "#0c92ffff",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },

    primaryButtonText: {
        color: "#FFF",
        fontWeight: "600",
    },

    section: {
        marginTop: 24,
        paddingHorizontal: 16,
        marginBottom: 16,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 12,
    },

    tabsContainer: {
        flexDirection: "row",
        marginTop: 12,
        marginBottom: 18,
        backgroundColor: "#eee",
        borderRadius: 10,
        overflow: "hidden",
    },

    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
    },

    activeTab: {
        backgroundColor: "#0c92ffff",
    },

    tabText: {
        color: "#555",
        fontWeight: "600",
    },

    activeTabText: {
        color: "#fff",
    },

    bookCard: {
        flexDirection: "row",
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
    },

    deleteButton: {
        position: "absolute",
        top: 8,
        right: 8,
        backgroundColor: "#FF4D4D",
        padding: 6,
        borderRadius: 20,
        zIndex: 10,
    },

    bookCover: {
        width: 80,
        height: 120,
        borderRadius: 8,
    },

    bookInfo: {
        flex: 1,
        marginLeft: 12,
    },

    bookTitle: {
        fontWeight: "600",
    },

    bookAuthor: {
        fontSize: 12,
        color: "#999",
    },

    progressText: {
        fontSize: 11,
        color: "#999",
    },

    emptyText: {
        textAlign: "center",
        color: "#999",
    },

    spacer: {
        height: 24,
    },

    signOutButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FF4D4D",
        paddingVertical: 12,
        borderRadius: 10,
        marginHorizontal: 16,
        marginBottom: 32,
        gap: 8,
    },
});