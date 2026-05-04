import { useAuth, useUser } from "@clerk/clerk-expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
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
import { Path, Svg } from "react-native-svg";

const { width } = Dimensions.get("window");

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const insets = useSafeAreaInsets();

  const [approved, setApproved] = useState([]);
  const [pending, setPending] = useState([]);
  const [activeTab, setActiveTab] = useState("approved");

  // FETCH DATA
  useEffect(() => {
    if (user) {
      const ids = user.unsafeMetadata?.booksets
        ?.filter((id) => id)
        .map((id) => encodeURIComponent(id.toString().trim()))
        .join(",");

      if (!ids) return;

      (async () => {
        try {
          // Approved items
          const resp = await fetch(
            "https://ptb-backend.vercel.app/get-books?id=" + ids
          );
          const bs = await resp.json();

          // Pending items
          const res = await fetch(
            "https://ptb-backend.vercel.app/get-requests?id=" + ids
          );
          const reqs = await res.json();

          setApproved(bs || []);
          setPending(reqs || []);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [user]);

  // DELETE FUNCTION
  const handleDelete = (booksetId) => {
    Alert.alert("Delete Item", "Are you sure you want to delete?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const safeId = encodeURIComponent(booksetId.toString().trim());

            await fetch("https://ptb-backend.vercel.app/delete?id=" + safeId);

            const updatedIds = user.unsafeMetadata?.booksets.filter(
              (id) => id !== booksetId
            );

            let metaData = {
              ...user.unsafeMetadata,
              booksets: updatedIds,
            };

            // Remove from both lists
            if (approved.includes(booksetId)) {
              metaData["bsCountA"] = approved.length - 1;

              setApproved((prev) => prev.filter((b) => b._id !== booksetId));
            } else {
              metaData["bsCount"] = pending.length - 1;

              setPending((prev) => prev.filter((b) => b._id !== booksetId));
            }

            await user.update({
              unsafeMetadata: metaData,
            });
          } catch (err) {
            console.log(err);
            Alert.alert("Error", "Delete failed");
          }
        },
      },
    ]);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const dataToShow = activeTab === "approved" ? approved : pending;

  return (
    <SafeAreaView
      style={{ ...styles.container, paddingBottom: -insets.bottom }}
    >
      {user && (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => router.push("/notifications")}
            >
              <Svg
                stroke="currentColor"
                fill="none"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
                aria-hidden="true"
                height="28px"
                width="28px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </Svg>
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Profile</Text>

            <TouchableOpacity style={styles.settingsButton} onPress={() => router.push("/(tabs)/wishlist")}>
              <Svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0.8}
                viewBox="0 0 24 24"
                height="30px"
                width="30px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path d="M12 20.043a.977.977 0 01-.7-.288L4.63 13.08a5.343 5.343 0 011.423-8.567A5.266 5.266 0 0112 5.371a5.272 5.272 0 015.947-.858 5.343 5.343 0 011.423 8.567l-6.676 6.675a.977.977 0 01-.694.288zM8.355 4.963a4.015 4.015 0 00-1.844.437 4.4 4.4 0 00-2.389 3.243 4.345 4.345 0 001.215 3.73l6.675 6.675 6.651-6.675a4.345 4.345 0 001.215-3.73A4.4 4.4 0 0017.489 5.4a4.338 4.338 0 00-4.968.852h0a.744.744 0 01-1.042 0 4.474 4.474 0 00-3.124-1.289z" />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* PROFILE */}
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
              <Text style={styles.bio}>{user.unsafeMetadata.bio}</Text>
            )}

            {/* STATS */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {user.unsafeMetadata?.bsCount || 0}
                </Text>
                <Text style={styles.statLabel}>Items Uploaded</Text>
              </View>

              <View style={styles.div} />

              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {user.unsafeMetadata?.bsCountA || 0}
                </Text>
                <Text style={styles.statLabel}>Items Approved</Text>
              </View>

              <View style={styles.div} />

              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {user.unsafeMetadata?.bsCount > 0
                    ? Math.round(
                        (user.unsafeMetadata.bsCountA /
                          user.unsafeMetadata.bsCount) *
                          100
                      )
                    : 0}
                  %
                </Text>
                <Text style={styles.statLabel}>Acceptance Rate</Text>
              </View>
            </View>

            {/* BUTTON */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() =>
                  Alert.alert("Coming Soon", "Feature not available")
                }
              >
                <Text style={styles.primaryButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* SECTION */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Uploads</Text>

            {/* TABS */}
            <View style={styles.tabsContainer}>
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "approved" && styles.activeTab,
                ]}
                onPress={() => setActiveTab("approved")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "approved" && styles.activeTabText,
                  ]}
                >
                  Approved
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "pending" && styles.activeTab,
                ]}
                onPress={() => setActiveTab("pending")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "pending" && styles.activeTabText,
                  ]}
                >
                  Pending
                </Text>
              </TouchableOpacity>
            </View>

            {/* LIST */}
            {dataToShow.length > 0 ? (
              dataToShow.map((bookset, index) => (
                <View style={styles.bookCard} key={index}>
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

                    {/* STATUS */}
                    <Text
                      style={{
                        marginTop: 4,
                        fontSize: 11,
                        color: activeTab === "approved" ? "green" : "orange",
                      }}
                    >
                      {activeTab === "approved"
                        ? "Approved"
                        : "Pending Approval"}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>No {activeTab} items.</Text>
            )}
          </View>

          <View style={styles.spacer} />

          {/* SIGN OUT */}
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
