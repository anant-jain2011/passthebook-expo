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
  // const [isFollowing, setIsFollowing] = useState(false);

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

          {/* Profile Picture & Info */}
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
              {/* <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>1.2K</Text>
                            <Text style={styles.statLabel}>Followers</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>384</Text>
                            <Text style={styles.statLabel}>Following</Text>
                        </View> */}
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() =>
                  Alert.alert(
                    "Coming Soon",
                    "This feature is not available yet. It will be released in the next update."
                  )
                }
              >
                <Text style={styles.primaryButtonText}>Edit Profile</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                            style={[styles.secondaryButton, isFollowing && styles.followingButton]}
                            onPress={() => setIsFollowing(!isFollowing)}
                        >
                            <Text style={[styles.secondaryButtonText, isFollowing && styles.followingText]}>
                                {isFollowing ? 'Following' : 'Follow'}
                            </Text>
                        </TouchableOpacity> */}
            </View>
          </View>

          {/* Currently Reading */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Booksets</Text>
            {Booksets?.length > 0 ? (
              Booksets.map((bookset, index) => (
                <View style={styles.bookCard} key={index}>
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
                      Subjects mentioned: {bookset.subjects.join(", ")}
                    </Text>
                    <Text style={styles.progressText}>
                      Board: {bookset.board.toUpperCase()}
                    </Text>
                    <Text style={styles.progressText}>
                      Condtion:{" "}
                      {bookset.condition[0].toUpperCase() +
                        bookset.condition.slice(1)}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Text
                style={{
                  color: "#999",
                  fontStyle: "italic",
                  textAlign: "center",
                }}
              >
                No booksets uploaded yet.
              </Text>
            )}
          </View>

          {/* Recent Activity */}
          {/* <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent Activity</Text>
                    {[1, 2, 3].map((item) => (
                        <View key={item} style={styles.activityItem}>
                            <MaterialCommunityIcons name="star" size={18} color="#FFB800" />
                            <View style={styles.activityContent}>
                                <Text style={styles.activityText}>Rated "Atomic Habits" 5 stars</Text>
                                <Text style={styles.activityDate}>2 days ago</Text>
                            </View>
                        </View>
                    ))}
                </View> */}

          {/* Favorite Genres */}
          {/* <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Favorite Genres</Text>
                    <View style={styles.genresContainer}>
                        {['Fiction', 'Mystery', 'Romance', 'Self-Help', 'Sci-Fi'].map((genre) => (
                            <TouchableOpacity key={genre} style={styles.genreTag}>
                                <Text style={styles.genreText}>{genre}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View> */}

          <View style={styles.spacer} />

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
    marginBottom: 4,
  },
  handle: {
    fontSize: 14,
    color: "#999",
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginHorizontal: 24,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingVertical: 16,
    width: width - 32,
    marginHorizontal: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#EEE",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  statLabel: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
  },
  primaryButton: {
    flex: 0.5,
    backgroundColor: "#0c92ffff",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  primaryButtonText: {
    fontWeight: "600",
    color: "#FFF",
    fontSize: 14,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEE",
  },
  followingButton: {
    backgroundColor: "#E8B4C8",
    borderColor: "#E8B4C8",
  },
  secondaryButtonText: {
    fontWeight: "600",
    color: "#333",
    fontSize: 14,
  },
  followingText: {
    color: "#FFF",
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
  },
  bookCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  bookCover: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  bookInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  bookAuthor: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#EEE",
    borderRadius: 2,
    marginTop: 8,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    backgroundColor: "#E8B4C8",
  },
  progressText: {
    fontSize: 11,
    color: "#999",
    marginTop: 6,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    gap: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
  },
  activityDate: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
  },
  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  genreTag: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#E8B4C8",
  },
  genreText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#E8B4C8",
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
