import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";

const BookCard = ({ book }) => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [message, setMessage] = useState("");

  const boardColors = {
    "UK Board": ["#f0f9ff", "#0369a1"],
    CBSE: ["#eff6ff", "#1e40af"],
    ICSE: ["#fef3c7", "#d97706"],
  };

  return (
    <ThemedView style={styles.card}>
      {typeof book != "undefined" && (
        <>
          <ThemedView style={styles.cardContent}>
            {/* Header Section */}
            <ThemedView style={styles.headerSection}>
              <ThemedView style={styles.titleSection}>
                <ThemedText style={styles.subjectBadge}>
                  {book.subject}
                </ThemedText>
                <ThemedText style={styles.bookTitle}>{book.title}</ThemedText>
                <ThemedView style={styles.gradeRow}>
                  <FontAwesome
                    name="book"
                    size={14}
                    color="#0ea5e9"
                    style={{ marginRight: 6 }}
                  />
                  <ThemedText style={styles.gradeText}>
                    Grade {book.grade}
                  </ThemedText>
                </ThemedView>
              </ThemedView>

              <ThemedText
                style={[
                  styles.boardBadge,
                  {
                    backgroundColor: boardColors[book.board]?.[0],
                    color: boardColors[book.board]?.[1],
                  },
                ]}
              >
                {book.board}
              </ThemedText>
            </ThemedView>

            {/* Info Section */}
            <ThemedView style={styles.infoSection}>
              <ThemedView style={styles.infoRow}>
                <FontAwesome
                  name="map-marker"
                  size={14}
                  color="#0ea5e9"
                  style={{ marginRight: 8 }}
                />
                <ThemedText style={styles.infoText}>{book.location}</ThemedText>
              </ThemedView>

              <ThemedView style={styles.infoRow}>
                <FontAwesome
                  name="user-circle"
                  size={14}
                  color="#0ea5e9"
                  style={{ marginRight: 8 }}
                />
                <ThemedText style={styles.infoText}>
                  By {book.ownerName}
                </ThemedText>
              </ThemedView>
            </ThemedView>

            {/* Condition Badge */}
            <ThemedView style={styles.conditionSection}>
              <ThemedText style={styles.conditionLabel}>Condition:</ThemedText>
              <ThemedText
                style={[
                  styles.conditionBadge,
                  { backgroundColor: getConditionColor(book.condition) },
                ]}
              >
                {book.condition}
              </ThemedText>
            </ThemedView>
          </ThemedView>

          {/* Contact Button */}
          <Pressable
            style={({ pressed }) => [
              styles.contactButton,
              pressed && styles.contactButtonPressed,
            ]}
            onPress={() => setShowContactForm(true)}
          >
            <ThemedText style={styles.contactButtonText}>
              Contact Owner
            </ThemedText>
            <Entypo
              name="chevron-thin-right"
              size={16}
              color="white"
              style={{ marginLeft: 6 }}
            />
          </Pressable>

          {/* Contact Form Modal */}
          {showContactForm && (
            <ThemedView style={styles.formOverlay}>
              <ThemedView style={styles.formContainer}>
                <ThemedView style={styles.formHeader}>
                  <ThemedText style={styles.formTitle}>
                    Contact {book.ownerName}
                  </ThemedText>
                  <Pressable
                    onPress={() => setShowContactForm(false)}
                    style={styles.closeButton}
                  >
                    <Entypo name="cross" size={20} color="#6b7280" />
                  </Pressable>
                </ThemedView>

                <ThemedView style={styles.formBody}>
                  <ThemedText style={styles.formLabel}>
                    Message about {book.title}
                  </ThemedText>
                  <TextInput
                    style={styles.textInput}
                    placeholder={`Hi ${book.ownerName}, I'm interested in your ${book.title}...`}
                    placeholderTextColor="#9ca3af"
                    value={message}
                    onChangeText={setMessage}
                    multiline
                    numberOfLines={4}
                  />
                </ThemedView>

                <ThemedView style={styles.formActions}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.submitButton,
                      pressed && styles.submitButtonPressed,
                    ]}
                  >
                    <ThemedText style={styles.submitButtonText}>
                      Send Message
                    </ThemedText>
                  </Pressable>
                  <Pressable
                    style={({ pressed }) => [
                      styles.cancelButton,
                      pressed && styles.cancelButtonPressed,
                    ]}
                    onPress={() => setShowContactForm(false)}
                  >
                    <ThemedText style={styles.cancelButtonText}>
                      Cancel
                    </ThemedText>
                  </Pressable>
                </ThemedView>
              </ThemedView>
            </ThemedView>
          )}
        </>
      )}
    </ThemedView>
  );
};

const getConditionColor = (condition) => {
  const colors = {
    Excellent: "#d1fae5",
    Good: "#dbeafe",
    Fair: "#fef3c7",
    Poor: "#fee2e2",
  };
  return colors[condition] || "#f3f4f6";
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
    padding: 20,
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
    backgroundColor: "#0ea5e9",
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 20,
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
