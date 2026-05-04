import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";

const BookCard = ({ book }) => {
  const [imgs] = useState(book.imgs || []);
  const [subjects] = useState(book.subjects || []);
  const [giverDetails] = useState(book.giverDetails || {});
  const router = useRouter();

  const handleClick = () => {
    router.push(`/items/${book._id}`);
  };

  const boardColors = {
    uk_board: ["#f0f9ff", "#0369a1", "UK Board"],
    cbse: ["#eff6ff", "#1e40af", "CBSE"],
    icse: ["#fef3c7", "#d97706", "ICSE"],
    ncert: ["#ecfdf5", "#059669", "NCERT"],
  };

  const getConditionColor = (condition) => {
    const colors = {
      new: ["#dcfce7", "#16a34a", "New"],
      like_new: ["#fef3c7", "#d97706", "Like New"],
      used_good: ["#fce7f3", "#be185d", "Used - Good"],
      used_acceptable: ["#fed7aa", "#ea580c", "Used - Acceptable"],
      poor: ["#fecaca", "#dc2626", "Poor"],
    };
    return colors[condition] || ["#e5e7eb", "#374151", "Unknown"];
  };

  return (
    <>
      <Pressable style={styles.card} onPress={handleClick}>
        {/* <View style={styles.card} onPress={handleClick}> */}
        <View style={styles.cardContent}>
          <Text style={styles.subjectBadge}>{subjects.join(", ")}</Text>

          <View>
            <Image source={{ uri: imgs[0] }} style={styles.bookImage} />

            <View style={styles.cardInfo}>
              <Text
                style={[
                  styles.boardBadge,
                  {
                    backgroundColor: boardColors[book.board]?.[0],
                    color: boardColors[book.board]?.[1],
                  },
                ]}
              >
                {boardColors[book.board]?.[2]}
              </Text>

              <View style={styles.headerSection}>
                <View style={styles.titleSection}>
                  <Text style={styles.bookTitle} numberOfLines={3}>
                    {book.title}
                  </Text>

                  <View style={styles.gradeRow}>
                    <FontAwesome name="book" size={16} color="#0ea5e9" />
                    <Text style={styles.gradeText}>Grade {book.grade}</Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <FontAwesome name="user-circle" size={16} color="#0ea5e9" />
                  <Text style={styles.infoText}>
                    By {giverDetails.ownerName}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Condition */}
          <View style={styles.conditionSection}>
            <Text style={styles.conditionLabel}>Condition:</Text>
            <Text
              style={[
                styles.conditionBadge,
                {
                  backgroundColor: getConditionColor(book.condition)[0],
                  color: getConditionColor(book.condition)[1],
                },
              ]}
            >
              {getConditionColor(book.condition)[2]}
            </Text>
          </View>
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: "49%",
    marginRight: "3%",
    elevation: 4,
    // flex: 1, // 🔥 grid support
  },

  cardContent: {
    padding: 12,
  },

  // REMOVE row layout
  cardRow: {
    flexDirection: "column", // 🔥 column layout
  },

  // FULL WIDTH IMAGE
  bookImage: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    marginBottom: 10,
  },

  cardInfo: {
    width: "100%",
  },

  subjectBadge: {
    fontSize: 11,
    fontWeight: "600",
    color: "#0284c7",
    backgroundColor: "#e0f2fe",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 6,
  },

  // FIX THIS ❌ width: "fit-content" not supported
  boardBadge: {
    fontSize: 10,
    fontWeight: "700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 6,
  },

  headerSection: {
    marginTop: 4,
  },

  bookTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },

  gradeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },

  gradeText: {
    fontSize: 12,
    color: "#374151",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },

  infoText: {
    fontSize: 12,
    color: "#4b5563",
  },

  conditionSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },

  conditionLabel: {
    fontSize: 11,
    color: "#6b7280",
  },

  conditionBadge: {
    fontSize: 11,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },

  formActions: {
    marginTop: 10,
    flexDirection: "row",
    gap: 8,
  },

  submitButton: {
    flex: 1,
    backgroundColor: "#0ea5e9",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  submitButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  cancelButtonText: {
    color: "#6b7280",
    fontWeight: "600",
    fontSize: 12,
  },
});

export default BookCard;
