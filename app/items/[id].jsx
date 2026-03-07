import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addToCart } from "../../utils/funcs";

export default function BookDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching details for book ID:", id);
    (async () => {
      try {
        let res = await fetch(
          `https://ptb-backend.vercel.app/get-books?id=${id}`
        );
        let data = await res.json();
        setBook(data[0]);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }

  if (!book) return null;

  const conditionColors = {
    new: ["#dcfce7", "#16a34a", "New"],
    like_new: ["#fef3c7", "#d97706", "Like New"],
    used_good: ["#fce7f3", "#be185d", "Used - Good"],
    used_acceptable: ["#fed7aa", "#ea580c", "Used - Acceptable"],
    poor: ["#fecaca", "#dc2626", "Poor"],
  };

  const cond = conditionColors[book.condition];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={{ fontSize: 18 }}>
            <MaterialCommunityIcons name="arrow-left" size={20} color="#0ea5e9" />
          </Text>
        </TouchableOpacity>

        {/* 📸 Images */}
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
          {book.imgs.map((uri, i) => (
            <Image key={i} source={{ uri }} style={styles.image} />
          ))}
        </ScrollView>

        {/* 📄 Info */}
        <View style={styles.content}>

          <Text style={styles.title}>{book.title}</Text>

          <View style={styles.row}>
            <FontAwesome name="book" size={16} color="#0ea5e9" />
            <Text style={styles.text}>Grade {book.grade}</Text>
          </View>

          <View style={styles.row}>
            <FontAwesome name="user-circle" size={16} color="#0ea5e9" />
            <Text style={styles.text}>
              By {book.giverDetails?.ownerName}
            </Text>
          </View>

          {/* Subjects */}
          <View style={styles.tags}>
            {book.subjects.map((s, i) => (
              <Text key={i} style={styles.tag}>
                {s}
              </Text>
            ))}
          </View>

          {/* Condition */}
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

          {/* Board */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Board</Text>
            <Text style={styles.sectionText}>{book.board}</Text>
          </View>

        </View>
      </ScrollView>

      {/* 🔥 Sticky Bottom */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.cartBtn} onPress={() => addToCart(book)}>
          <Text style={styles.cartText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyBtn} onPress={() => router.push("/profile-ext?id=" + book.giverDetails.id)}>
          <Text style={styles.buyText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  backBtn: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 20,
    elevation: 5,
  },

  image: {
    width: 200,
    height: 300,
    resizeMode: "contain",
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
    gap: 8,
    marginBottom: 6,
  },

  text: {
    fontSize: 14,
    color: "#374151",
  },

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },

  tag: {
    backgroundColor: "#e0f2fe",
    color: "#0284c7",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    fontSize: 12,
  },

  conditionBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    gap: 10,
  },

  conditionLabel: {
    fontSize: 14,
    color: "#6b7280",
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
    marginBottom: 4,
  },

  sectionText: {
    fontSize: 14,
    color: "#374151",
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
    borderRadius: 10,
    alignItems: "center",
    marginRight: 6,
  },

  cartText: {
    fontWeight: "700",
  },

  buyBtn: {
    flex: 1,
    backgroundColor: "#0ea5e9",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 6,
  },

  buyText: {
    color: "#fff",
    fontWeight: "700",
  },
});