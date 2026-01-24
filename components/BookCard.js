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
import Carousel from "./Carousel";

const BookCard = ({ book }) => {
  const [imgs] = useState(book.imgs || []);
  const [crl, setCrl] = useState(false);
  const [subjects] = useState(book.subjects || []);
  const [giverDetails] = useState(book.giverDetails || {});
  const [showContactForm, setShowContactForm] = useState(false);
  const [showEmailHint, setShowEmailHint] = useState(false);
  const [showWhatsAppHint, setShowWhatsAppHint] = useState(false);

  const handleContact = () => {
    if (giverDetails.email) {
      Linking.openURL(
        `mailto:${giverDetails.email}?subject=${encodeURIComponent(
          "Interested in " + book.title
        )}`
      );
    } else if (giverDetails.whatsAppNum) {
      const num = (giverDetails.whatsAppNum + "").replace(/\D/g, "");
      Linking.openURL(
        `https://wa.me/${num}?text=${encodeURIComponent(
          "Hi " +
            giverDetails.ownerName +
            ", I am interested in your " +
            book.title
        )}`
      );
    } else {
      Alert.alert(
        "No contact info",
        "This owner has not provided contact details."
      );
    }
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
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.subjectBadge}>{subjects.join(", ")}</Text>

          <View style={styles.cardRow}>
            <TouchableOpacity onPress={() => setCrl(true)}>
              <Image source={{ uri: imgs[0] }} style={styles.bookImage} />
            </TouchableOpacity>

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

          {/* Contact */}
          <Pressable
            style={({ pressed }) => [
              styles.contactButton,
              pressed && styles.contactButtonPressed,
            ]}
            onPress={() => setShowContactForm(true)}
          >
            <Text style={styles.contactButtonText}>Contact Owner</Text>
            <Entypo name="chevron-thin-right" size={18} color="white" />
          </Pressable>
        </View>

        {showContactForm && (
          <View style={styles.formOverlay}>
            <View style={styles.formContainer}>
              <View style={styles.formHeader}>
                <Text style={styles.formTitle}>
                  Contact {giverDetails.ownerName}
                </Text>
                <Pressable onPress={() => setShowContactForm(false)}>
                  <Entypo name="cross" size={22} color="#6b7280" />
                </Pressable>
              </View>

              <View style={styles.giverDetails}>
                <Text style={styles.giverLabel}>Contact details</Text>
                <Text style={styles.giverName}>
                  <Text style={styles.formTitle}>Giver Name: </Text>{" "}
                  {giverDetails.ownerName}
                </Text>

                {giverDetails.email ? (
                  <Pressable
                    style={styles.detailRow}
                    onPress={() =>
                      Linking.openURL(
                        `mailto:${
                          giverDetails.email
                        }?subject=${encodeURIComponent(
                          `Interested in ${book.title}`
                        )}`
                      )
                    }
                    accessibilityLabel={`${giverDetails.email}. Tap to open email.`}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={styles.detailLabel}>Email</Text>
                      <Pressable
                        onPress={() => {
                          setShowEmailHint(true);
                          setTimeout(() => setShowEmailHint(false), 2500);
                        }}
                        hitSlop={8}
                        style={{ marginLeft: 8 }}
                      >
                        <Entypo
                          name="info-with-circle"
                          size={16}
                          color="#6b7280"
                        />
                      </Pressable>
                    </View>

                    <Text style={styles.detailText}>{giverDetails.email}</Text>

                    {showEmailHint && (
                      <View style={styles.tooltip} pointerEvents="none">
                        <Text style={styles.tooltipText}>
                          Tap to open email
                        </Text>
                      </View>
                    )}
                  </Pressable>
                ) : null}

                {giverDetails.whatsAppNum ? (
                  <Pressable
                    style={styles.detailRow}
                    onPress={() => {
                      const num = (giverDetails.whatsAppNum + "").replace(
                        /\D/g,
                        ""
                      );
                      Linking.openURL(
                        `https://wa.me/${num}?text=${encodeURIComponent(
                          `Hi ${giverDetails.ownerName}, I'm interested in your ${book.title}`
                        )}`
                      );
                    }}
                    accessibilityLabel={`${giverDetails.whatsAppNum}. Tap to open WhatsApp.`}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={styles.detailLabel}>WhatsApp</Text>
                      <Pressable
                        onPress={() => {
                          setShowWhatsAppHint(true);
                          setTimeout(() => setShowWhatsAppHint(false), 2500);
                        }}
                        hitSlop={8}
                        style={{ marginLeft: 8 }}
                      >
                        <Entypo
                          name="info-with-circle"
                          size={16}
                          color="#6b7280"
                        />
                      </Pressable>
                    </View>

                    <Text style={styles.detailText}>
                      {giverDetails.whatsAppNum}
                    </Text>

                    {showWhatsAppHint && (
                      <View style={styles.tooltip} pointerEvents="none">
                        <Text style={styles.tooltipText}>
                          Tap to open WhatsApp
                        </Text>
                      </View>
                    )}
                  </Pressable>
                ) : null}
              </View>

              <View style={styles.formActions}>
                <Pressable
                  style={styles.cancelButton}
                  onPress={() => setShowContactForm(false)}
                >
                  <Text style={styles.cancelButtonText}>Back</Text>
                </Pressable>
                <Pressable style={styles.submitButton} onPress={handleContact}>
                  <Text style={styles.submitButtonText}>
                    {giverDetails.email
                      ? "Email"
                      : giverDetails.whatsAppNum
                      ? "WhatsApp"
                      : "OK"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      </View>
      
      {crl && <Carousel images={imgs} onClose={() => setCrl(false)} />}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 12,
    elevation: 4,
  },
  cardContent: {
    padding: 16,
  },
  cardRow: {
    flexDirection: "row",
    gap: 16,
  },
  bookImage: {
    width: 120,
    height: 170,
    borderRadius: 14,
  },
  cardInfo: {
    flex: 1,
  },
  subjectBadge: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0284c7",
    backgroundColor: "#e0f2fe",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  headerSection: {
    marginTop: 20,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },
  gradeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  gradeText: {
    fontSize: 15,
    color: "#374151",
    fontWeight: "500",
  },
  boardBadge: {
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    width: "fit-content",
    alignSelf: "flex-end",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 14,
  },
  infoText: {
    fontSize: 15,
    color: "#4b5563",
    fontWeight: "500",
  },
  conditionSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 16,
  },
  conditionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
  },
  conditionBadge: {
    fontSize: 13,
    fontWeight: "700",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  contactButton: {
    marginTop: 18,
    backgroundColor: "#0ea5e9",
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  contactButtonPressed: {
    backgroundColor: "#0284c7",
  },
  contactButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  /* FORM */
  formOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  formContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 20,
  },
  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 14,
    minHeight: 100,
    marginBottom: 16,
  },
  giverDetails: {
    marginBottom: 16,
  },
  giverLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 6,
  },
  giverName: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 10,
  },
  detailRow: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    marginBottom: 8,
  },
  tooltip: {
    position: "absolute",
    top: -36,
    right: 12,
    backgroundColor: "#111827",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  tooltipText: {
    color: "#fff",
    fontSize: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "600",
  },
  detailText: {
    fontSize: 14,
    color: "#0ea5e9",
    fontWeight: "700",
  },
  formActions: {
    flexDirection: "row",
    gap: 12,
  },
  submitButton: {
    flex: 1,
    backgroundColor: "#0ea5e9",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#6b7280",
    fontWeight: "600",
  },
});

export default BookCard;
