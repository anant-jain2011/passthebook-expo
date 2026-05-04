import { ThemedText } from "@/components/themed-text";
import { useUser } from "@clerk/clerk-expo";
import Feather from "@expo/vector-icons/Feather";
import { Link, useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Action = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.actionItem} onPress={onPress}>
    <Feather name={icon} size={22} color="#34b7d1" />
    <ThemedText style={styles.actionText}>{label}</ThemedText>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const { user } = useUser();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ScrollView
      style={styles.screen}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      {/* ===== HEADER ===== */}
      <View style={[styles.header, { marginTop: insets.top }]}>
        <Feather name="menu" size={24} color="#111" />

        <View style={styles.headerCenter}>
          <Feather name="book-open" size={26} color="#0c77b1" />
          <ThemedText style={styles.headerTitle}>PassTheBook</ThemedText>
        </View>

        <View style={styles.headerRight}>
          <Feather
            name="bell"
            size={22}
            color="#111"
            style={{ marginRight: 12 }}
            onPress={() => router.push("/notifications")}
          />
          <Feather
            name="shopping-cart"
            size={22}
            color="#111"
            onPress={() => router.push("/cart")}
          />
        </View>
      </View>

      {/* ===== GREETING ===== */}
      <View style={styles.padding}>
        <ThemedText style={styles.greeting}>
          Hello, {user?.firstName} 👋
        </ThemedText>
        <ThemedText style={styles.subText}>
          Find affordable books. Sell to students.
        </ThemedText>
      </View>

      {/* ===== SEARCH ===== */}
      {/* <View style={styles.searchBar}>
        <Feather name="search" size={20} color="#999" />
        <TextInput
          placeholder="Search books, subjects..."
          style={styles.input}
          placeholderTextColor="#9ca3af"
        />
        <Feather name="sliders" size={20} color="#1687a3" />
      </View> */}

      {/* ===== ACTIONS ===== */}
      <View style={styles.actions}>
        <Action
          icon="book"
          label="Books"
          onPress={() => router.push("/(tabs)/find-books")}
        />
        <Action
          icon="tag"
          label="Sell"
          onPress={() => router.push("/(tabs)/add-books")}
        />
        <Action icon="bookmark" label="Orders" />
        <Action
          icon="heart"
          label="Wishlist"
          onPress={() => router.push("/(tabs)/wishlist")}
        />
      </View>

      {/* ===== BANNER ===== */}
      <View style={styles.banner}>
        <View>
          <ThemedText style={styles.bannerTitle}>
            A Smarter way to exchange books.
          </ThemedText>

          <Link href="/find-books" style={styles.bannerBtn}>
            <ThemedText style={styles.bannerBtnText}>Explore Now →</ThemedText>
          </Link>
        </View>
      </View>

      {/* ===== BOOKS ===== */}
      <View style={styles.padding}>
        <ThemedText style={styles.sectionTitle}>Why PassTheBook?</ThemedText>

        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Feather name="book-open" size={24} color="#0c77b1" />
            <ThemedText style={styles.infoTitle}>Affordable Books</ThemedText>
            <ThemedText style={styles.infoDesc}>
              Buy second-hand books at the best prices.
            </ThemedText>
          </View>

          <View style={styles.infoCard}>
            <Feather name="repeat" size={24} color="#0c77b1" />
            <ThemedText style={styles.infoTitle}>Reuse & Save</ThemedText>
            <ThemedText style={styles.infoDesc}>
              Give books a second life and reduce waste.
            </ThemedText>
          </View>

          <View style={styles.infoCard}>
            <Feather name="shield" size={24} color="#0c77b1" />
            <ThemedText style={styles.infoTitle}>Safe Listings</ThemedText>
            <ThemedText style={styles.infoDesc}>
              Admin approval ensures quality content.
            </ThemedText>
          </View>

          <View style={styles.infoCard}>
            <Feather name="shopping-bag" size={24} color="#0c77b1" />
            <ThemedText style={styles.infoTitle}>Easy Buying</ThemedText>
            <ThemedText style={styles.infoDesc}>
              Seamless checkout like an e-commerce app.
            </ThemedText>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  padding: {
    paddingHorizontal: 16,
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 6,
  },

  /* GREETING */
  greeting: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: "700",
  },

  subText: {
    color: "#6b7280",
    marginTop: 4,
  },

  /* SEARCH */
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 16,
    padding: 12,
    borderRadius: 14,
    elevation: 3,
  },

  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 14,
    color: "#444",
  },

  /* ACTIONS */
  actions: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  actionItem: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    paddingBottom: 10,
    borderRadius: 14,
    width: 70,
    elevation: 3,
  },

  actionText: {
    fontSize: 12,
    marginTop: 4,
  },

  /* BANNER */
  banner: {
    margin: 16,
    backgroundColor: "#dcfafc",
    borderRadius: 20,
    padding: 20,
  },

  bannerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  bannerSub: {
    marginTop: 6,
    color: "#065f46",
  },

  bannerBtn: {
    backgroundColor: "#00b1e2",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    marginTop: 12,
    alignSelf: "flex-start",
  },

  bannerBtnText: {
    color: "#fff",
    fontWeight: "600",
  },

  /* BOOKS */
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  bookCard: {
    width: 140,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    marginRight: 12,
    elevation: 3,
  },

  bookImg: {
    height: 120,
    backgroundColor: "#e5e7eb",
    borderRadius: 10,
  },

  bookTitle: {
    marginTop: 8,
    fontWeight: "600",
  },

  price: {
    marginTop: 4,
    color: "#0f9bff",
    fontWeight: "700",
  },

  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  infoCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  infoTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "700",
  },

  infoDesc: {
    marginTop: 4,
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 16,
  },
});
