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
import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const insets = useSafeAreaInsets();
  const [Booksets, setBooksets] = useState([]);

  useEffect(() => {
    if (user) {
      user.unsafeMetadata?.booksets &&
        user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            booksets: user.unsafeMetadata?.booksets.filter((a) => a),
          },
        });

      user.unsafeMetadata?.booksets?.length > 0 &&
        (async () => {
          let res = await fetch(
            "https://ptb-backend.vercel.app/get-books?id=" +
              user.unsafeMetadata?.booksets.join(",")
          );
          let data = await res.json();
          setBooksets(data);
        })();
    }
  }, []);

  // ✅ DELETE FUNCTION (GET REQUEST)
  const handleDelete = (booksetId) => {
    Alert.alert(
      "Delete Bookset",
      "Are you sure you want to delete this bookset?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // GET request for delete
              await fetch(
                "https://ptb-backend.vercel.app/delete?id=" + booksetId
              );

              // Update UI instantly
              setBooksets((prev) =>
                prev.filter((b) => b._id !== booksetId)
              );

              // Update Clerk metadata
              const updatedIds =
                user.unsafeMetadata?.booksets.filter(
                  (id) => id !== booksetId
                );

              await user.update({
                unsafeMetadata: {
                  ...user.unsafeMetadata,
                  booksets: updatedIds,
                },
              });
            } catch (err) {
              console.log(err);
              Alert.alert("Error", "Failed to delete bookset");
            }
          },
        },
      ]
    );
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: -insets.bottom }]}>
      {user && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.settingsButton}>
              <MaterialCommunityIcons name="cog" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity style={styles.settingsButton}>
              <MaterialCommunityIcons
                name="share-variant"
                size={24}
                color="#333"
              />
            </TouchableOpacity>
          </View>

          {/* Profile Section */}
          <View style={styles.profileSection}>
            {user.imageUrl && (
              <Image
                source={{ uri: user.imageUrl }}
                style={styles.profileImage}
              />
            )}
            <Text style={styles.name}>{user.fullName}</Text>
            <Text style={styles.handle}>
              {user.emailAddresses[0].emailAddress}
            </Text>

            {user.unsafeMetadata?.bio && (
              <Text style={styles.bio}>{user.unsafeMetadata?.bio}</Text>
            )}

            {/* Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {user.unsafeMetadata?.booksets?.length || 0}
                </Text>
                <Text style={styles.statLabel}>Booksets Uploaded</Text>
              </View>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() =>
                  Alert.alert(
                    "Coming Soon",
                    "This feature is not available yet."
                  )
                }
              >
                <Text style={styles.primaryButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Booksets */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Booksets</Text>

            {Booksets?.length > 0 ? (
              Booksets.map((bookset, index) => (
                <View style={styles.bookCard} key={index}>
                  
                  {/* DELETE BUTTON */}
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(bookset._id)}
                  >
                    <MaterialCommunityIcons
                      name="delete"
                      size={18}
                      color="#fff"
                    />
                  </TouchableOpacity>

                  <Image
                    source={{ uri: bookset.imgs[0] }}
                    style={styles.bookCover}
                  />

                  <View style={styles.bookInfo}>
                    <Text style={styles.bookTitle}>{bookset.title}</Text>
                    <Text style={styles.bookAuthor}>
                      Grade: {bookset.grade}
                    </Text>
                    <Text style={styles.progressText}>
                      Subjects: {bookset.subjects.join(", ")}
                    </Text>
                    <Text style={styles.progressText}>
                      Board: {bookset.board.toUpperCase()}
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
                No booksets uploaded yet.
              </Text>
            )}
          </View>

          <View style={styles.spacer} />

          {/* Sign Out */}
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
          >
            <Text style={styles.primaryButtonText}>Sign Out</Text>
            <MaterialCommunityIcons name="logout" size={18} color="#FFF" />
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

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
    borderWidth: 3,
    borderColor: "#E8B4C8",
  },

  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
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
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },

  bookCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    position: "relative",
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
    color: "#999",
    textAlign: "center",
    fontStyle: "italic",
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