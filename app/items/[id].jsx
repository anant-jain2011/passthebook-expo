import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState, useMemo } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addToCart } from "../../utils/funcs";

const { width } = Dimensions.get("window");

export default function BookDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await fetch(
          `https://ptb-backend.vercel.app/get-books?id=${id}`
        );
        const data = await res.json();

        if (mounted) setBook(data[0]);
      } catch (e) {
        console.log(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [id]);

  /* ================= CONDITION ================= */

  const cond = useMemo(() => {
    const map = {
      new: ["#dcfce7", "#0c77b1", "New"],
      like_new: ["#fef3c7", "#d97706", "Like New"],
      used_good: ["#fce7f3", "#be185d", "Used - Good"],
      used_acceptable: ["#fed7aa", "#ea580c", "Used - Acceptable"],
      poor: ["#fecaca", "#dc2626", "Poor"],
    };
    return map[book?.condition] || map["used_good"];
  }, [book]);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#1a9ee5" />
      </View>
    );
  }

  if (!book) return null;

  /* ================= UI ================= */

  return (
    <SafeAreaView style={styles.container}>
      {/* BACK */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.back()}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          size={22}
          color="#111"
        />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 📸 IMAGE CAROUSEL */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {book.imgs.map((uri,i) => (
            <Image
              key={i}
              source={{ uri }}
              style={styles.image}
            />
          ))}
        </ScrollView>

        {/* 📄 CONTENT */}
        <View style={styles.content}>
          <Text style={styles.title}>{book.title}</Text>

          {/* ROWS */}
          <View style={styles.row}>
            <FontAwesome name="book" size={16} color="#0c77b1" />
            <Text style={styles.text}>Grade {book.grade}</Text>
          </View>

          <View style={styles.row}>
            <FontAwesome name="user-circle" size={16} color="#0c77b1" />
            <Text style={styles.text}>
              By {book.giverDetails?.ownerName}
            </Text>
          </View>

          {/* TAGS */}
          <View style={styles.tags}>
            {book.subjects.map((s,i) => (
              <Text key={i} style={styles.tag}>
                {s}
              </Text>
            ))}
          </View>

          {/* CONDITION */}
          <View style={styles.conditionBox}>
            <Text style={styles.conditionLabel}>Condition</Text>
            <Text
              style={[
                styles.conditionBadge,
                { backgroundColor: cond[0], color: cond[1] },
              ]}
            >
              {cond[2]}
            </Text>
          </View>

          {/* BOARD */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Board</Text>
            <Text style={styles.sectionText}>{book.board}</Text>
          </View>
        </View>
      </ScrollView>

      {/* 🔥 BOTTOM BAR */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.cartBtn}
          activeOpacity={0.8}
          onPress={() => addToCart(book)}
        >
          <Text style={styles.cartText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buyBtn}
          activeOpacity={0.8}
          onPress={() =>
            router.push("/profile-ext?id=" + book.giverDetails.id)
          }
        >
          <Text style={styles.buyText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  backBtn: {
    position: "absolute",
    top: 10,
    left: 16,
    zIndex: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    elevation: 6,
  },

  image: {
    width: width,
    height: 280,
    resizeMode: "cover",
  },

  content: {
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  text: {
    marginLeft: 8,
    fontSize: 14,
    color: "#374151",
  },

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },

  tag: {
    backgroundColor: "#dcfce7",
    color: "#0c77b1",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    fontSize: 12,
    marginRight: 8,
    marginBottom: 6,
  },

  conditionBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },

  conditionLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginRight: 10,
  },

  conditionBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    fontWeight: "700",
  },

  section: {
    marginTop: 16,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
  },

  sectionText: {
    fontSize: 14,
    color: "#374151",
    marginTop: 4,
  },

  bottomBar: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },

  cartBtn: {
    flex: 1,
    backgroundColor: "#e5e7eb",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginRight: 6,
  },

  cartText: {
    fontWeight: "700",
  },

  buyBtn: {
    flex: 1,
    backgroundColor: "#0c77b1",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginLeft: 6,
  },

  buyText: {
    color: "#fff",
    fontWeight: "700",
  },
});