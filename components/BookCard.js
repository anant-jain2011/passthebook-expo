import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState } from "react";
import { Button, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const BookCard = ({ book }) => {
  const [message, setMessage] = useState("");
  const [imgs, setImgs] = useState(book.imgs || []);
  const [giverDetails, setGiverDetails] = useState(book.giverDetails || {});
  const [subjects, setSubjects] = useState(book.subjects || []);
  const [showContactForm, setShowContactForm] = useState(false);

  const boardColors = {
    "uk_board": ["#f0f9ff", "#0369a1", "UK Board"],
    "cbse": ["#eff6ff", "#1e40af", "CBSE"],
    "icse": ["#fef3c7", "#d97706", "ICSE"],
    "ncert": ["#ecfdf5", "#059669", "NCERT"],
  };

  return (
    <View style={styles.card}>
      {typeof book != "undefined" && (
        <>
          <View style={styles.cardContent}>
            <Text style={styles.subjectBadge}>
              {subjects.join(", ")}
            </Text>

            <View style={styles.cardRow}>
              <Image
                source={{ uri: imgs[0] }}
                style={styles.bookImage}
              />

              <View style={styles.cardInfo}>
                <View style={styles.headerSection}>
                  <View style={styles.titleSection}>
                    <Text style={styles.bookTitle} numberOfLines={2}>{book.title}</Text>
                    <View style={styles.gradeRow}>
                      <FontAwesome
                        name="book"
                        size={14}
                        color="#0ea5e9"
                        style={{ marginRight: 6 }}
                      />
                      <Text style={styles.gradeText}>
                        Grade {book.grade}
                      </Text>
                    </View>
                  </View>

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
                </View>

                <View style={styles.infoSection}>
                  <View style={styles.infoRow}>
                    <FontAwesome
                      name="user-circle"
                      size={14}
                      color="#0ea5e9"
                      style={{ marginRight: 8 }}
                    />
                    <Text style={styles.infoText}>
                      By {giverDetails.ownerName}
                    </Text>
                  </View>
                </View>

                <View style={styles.footerRow}>
                  <View style={styles.ratingBadge}>
                    <Text style={styles.rating}>{book.location || ""}</Text>
                  </View>
                </View>

              </View>
            </View>

            {/* Condition Badge */}
            <View style={styles.conditionSection}>
              <Text style={styles.conditionLabel}>Condition:</Text>
              <Text
                style={[
                  styles.conditionBadge,
                  { backgroundColor: getConditionColor(book.condition)[0], color: getConditionColor(book.condition)[1] },
                ]}
              >
                {getConditionColor(book.condition)[2]}
              </Text>
            </View>

            {/* Contact Button */}
            <View
              style={({ pressed }) => [
                styles.contactButton,
                { backgroundColor: "#00aeff" },
                pressed && styles.contactButtonPressed,
              ]}
              onPress={() => setShowContactForm(true)}
            >
              <Text style={styles.contactButtonText}>
                Contact Owner
              </Text>
              <Entypo
                name="chevron-thin-right"
                size={16}
                color="white"
                style={{ marginLeft: 6 }}
              />
            </View>
          </View>

          {showContactForm && (
            <View style={styles.formOverlay}>
              <View style={styles.formContainer}>
                <View style={styles.formHeader}>
                  <Text style={styles.formTitle}>
                    Contact {giverDetails.ownerName}
                  </Text>
                  <Pressable
                    onPress={() => setShowContactForm(false)}
                    style={styles.closeButton}
                  >
                    <Entypo name="cross" size={20} color="#6b7280" />
                  </Pressable>
                </View>

                <View style={styles.formBody}>
                  <Text style={styles.formLabel}>
                    Message about {book.title}
                  </Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder={`Hi ${book.giverDetails.ownerName}, I'm interested in your ${book.title}...`}
                    placeholderTextColor="#9ca3af"
                    value={message}
                    onChangeText={setMessage}
                    multiline
                    numberOfLines={4}
                  />
                </View>

                <View style={styles.formActions}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.submitButton,
                      pressed && styles.submitButtonPressed,
                    ]}
                  >
                    <Text style={styles.submitButtonText}>
                      Send Message
                    </Text>
                  </Pressable>
                  <Pressable
                    style={({ pressed }) => [
                      styles.cancelButton,
                      pressed && styles.cancelButtonPressed,
                    ]}
                    onPress={() => setShowContactForm(false)}
                  >
                    <Text style={styles.cancelButtonText}>
                      Cancel
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const getConditionColor = (condition) => {
  const colors = {
    new: ["#dcfce7", "#16a34a", "New"],
    like_new: ["#fef3c7", "#d97706", "Like New"],
    used_good: ["#fce7f3", "#be185d", "Used - Good"],
    used_acceptable: ["#fed7aa", "#ea580c", "Used - Acceptable"],
    poor: ["#fecaca", "#dc2626", "Poor"],
  };
  return colors[condition] || ["#0055ff"];
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 4,
  },
  cardContent: {
    padding: 12,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bookImage: {
    width: 100,
    height: 140,
    borderRadius: 12,
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6366f1",
  },
  conditionText: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
    fontWeight: "600",
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  titleSection: {
    flex: 1,
    marginRight: 12,
  },
  subjectBadge: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0ea5e9",
    backgroundColor: "#e0f2fe",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 6,
    lineHeight: 24,
  },
  gradeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  gradeText: {
    fontSize: 13,
    color: "#6b7280",
  },
  boardBadge: {
    fontSize: 11,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    overflow: "hidden",
  },
  infoSection: {
    marginBottom: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: "#6b7280",
  },
  conditionSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  conditionLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#6b7280",
  },
  conditionBadge: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    flexShrink: 1,
  },
  contactButton: {
    backgroundColor: "#00aeff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 44,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    alignSelf: "stretch",
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#0077b6",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    zIndex: 10,
  },
  contactButtonPressed: {
    backgroundColor: "#0284c7",
    opacity: 0.9,
  },
  contactButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  formOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    zIndex: 1000,
  },
  formContainer: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
    maxHeight: "80%",
  },
  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
  },
  closeButton: {
    padding: 8,
  },
  formBody: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#1f2937",
    minHeight: 100,
    textAlignVertical: "top",
  },
  formActions: {
    flexDirection: "row",
    gap: 12,
  },
  submitButton: {
    flex: 1,
    backgroundColor: "#0ea5e9",
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonPressed: {
    backgroundColor: "#0284c7",
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  cancelButtonPressed: {
    backgroundColor: "#f3f4f6",
  },
  cancelButtonText: {
    color: "#6b7280",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default BookCard;
