import { Link } from "expo-router";
import BookCard from "@/components/BookCard";
import TypedText from "@/components/TypedText";
import Feather from "@expo/vector-icons/Feather";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ScrollView, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const featuredBooks = [
  {
    id: "1",
    title: "Mathematics NCERT",
    subjects: ["Mathematics"],
    grade: "10",
    condition: "like_new",
    location: "Delhi",
    board: "cbse",
    imgs: ["https://via.placeholder.com/100x140"],
    giverDetails: { ownerName: "Aditya S." },
    createdAt: "2023-05-15",
  },
  {
    id: "2",
    title: "Science NCERT",
    subjects: ["Science"],
    grade: "9",
    condition: "used_good",
    location: "Mumbai",
    board: "cbse",
    imgs: ["https://via.placeholder.com/100x140"],
    giverDetails: { ownerName: "Priya K." },
    createdAt: "2023-06-02",
  },
  {
    id: "3",
    title: "English Literature",
    subjects: ["English"],
    grade: "11",
    condition: "used_acceptable",
    location: "Bangalore",
    board: "cbse",
    imgs: ["https://via.placeholder.com/100x140"],
    giverDetails: { ownerName: "Rahul M." },
    createdAt: "2023-06-10",
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      {/* ===== HEADER ===== */}
      <ThemedView style={styles.header}>
        <Feather name="book-open" size={36} color="#fff" />
        <ThemedText style={styles.headerTitle}>PassTheBook</ThemedText>
      </ThemedView>

      {/* ===== HERO ===== */}
      <ThemedView style={{ paddingHorizontal: 16 }}>
        <ThemedText style={styles.heroBadge}>
          Share Knowledge, Save Trees
        </ThemedText>

        <ThemedText style={styles.heroSubtitle}>
          <TypedText texts={["Connect.", "Exchange.", "Make a Difference."]} />
        </ThemedText>

        <Link href="/find-books" style={styles.primaryBtn}>
          <ThemedText style={styles.primaryBtnText}>
            Find Textbooks →
          </ThemedText>
        </Link>

        <Link href="/add-books" style={styles.secondaryBtn}>
          <ThemedText style={styles.secondaryBtnText}>
            List Your Books
          </ThemedText>
        </Link>
      </ThemedView>

      {/* ===== WHY PASS THE BOOK ===== */}
      <ThemedView style={{ padding: 16 }}>
        <ThemedView style={styles.featureCard}>
          <Feather name="book-open" size={28} color="#0ea5e9" />
          <ThemedText style={styles.featureTitle}>Accessible Education</ThemedText>
          <ThemedText style={styles.featureDesc}>
            Making textbooks available to every student in India.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.featureCard}>
          <FontAwesome name="recycle" size={28} color="#0ea5e9" />
          <ThemedText style={styles.featureTitle}>Reduce Waste</ThemedText>
          <ThemedText style={styles.featureDesc}>
            Giving textbooks a second life reduces paper waste.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.featureCard}>
          <Feather name="heart" size={28} color="#0ea5e9" />
          <ThemedText style={styles.featureTitle}>Community Building</ThemedText>
          <ThemedText style={styles.featureDesc}>
            Connecting students to help each other succeed.
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* ===== HOW IT WORKS ===== */}
      <ThemedView style={{ padding: 16 }}>
        <ThemedText style={styles.sectionBadge}>Simple Process</ThemedText>
        <ThemedText style={styles.sectionTitle}>
          How PassTheBook Works
        </ThemedText>
        <ThemedText style={styles.sectionDesc}>
          Exchange textbooks in three simple steps and help students across
          India.
        </ThemedText>

        <ThemedView style={styles.featureCard}>
          <Feather name="search" size={32} color="#0ea5e9" />
          <ThemedText style={styles.featureTitle}>Find Books</ThemedText>
          <ThemedText style={styles.featureDesc}>
            Search by subject, grade, or location to find books near you.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.featureCard}>
          <Feather name="upload" size={32} color="#0ea5e9" />
          <ThemedText style={styles.featureTitle}>List Books</ThemedText>
          <ThemedText style={styles.featureDesc}>
            Upload your books and help someone who needs them.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.featureCard}>
          <FontAwesome5 name="users" size={28} color="#0ea5e9" />
          <ThemedText style={styles.featureTitle}>Connect</ThemedText>
          <ThemedText style={styles.featureDesc}>
            Contact book owners and arrange an exchange easily.
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* ===== FEATURED BOOKS ===== */}
      <ThemedView style={{ padding: 16 }}>
        <ThemedText style={styles.sectionTitle}>Featured Books</ThemedText>

        <ThemedView style={styles.bookList}>
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </ThemedView>
      </ThemedView>

      {/* ===== CTA ===== */}
      <ThemedView style={{ padding: 24 }}>
        <ThemedText style={styles.sectionTitle}>
          Ready to Make a Difference?
        </ThemedText>
        <ThemedText style={styles.sectionDesc}>
          Join thousands of students making education more accessible.
        </ThemedText>

        <Link href="/find-books" style={styles.primaryBtn}>
          <ThemedText style={styles.primaryBtnText}>
            Find Textbooks
          </ThemedText>
        </Link>

        <Link href="/add-books" style={styles.secondaryBtn}>
          <ThemedText style={styles.secondaryBtnText}>
            List Your Books
          </ThemedText>
        </Link>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#f8fafc",
  },
  header: {
    backgroundColor: "#0ea5e9",
    paddingVertical: 32,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 6,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: "800",
    color: "#fff",
    marginLeft: 8,
  },
  heroBadge: {
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    borderRadius: 999,
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 6,
    fontWeight: "700",
    marginTop: 24,
  },
  heroSubtitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    marginTop: 22,
    marginVertical: 10,
    height: 26,
  },
  primaryBtn: {
    backgroundColor: "#0ea5e9",
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 12,
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#0ea5e9",
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
    textAlign: "center",
    marginTop: 12,
  },
  secondaryBtnText: {
    color: "#0ea5e9",
    fontWeight: "700",
  },
  featureCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    marginTop: 16,
    elevation: 4,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 12,
  },
  featureDesc: {
    color: "#6b7280",
    marginTop: 6,
    lineHeight: 22,
  },
  sectionBadge: {
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    fontWeight: "700",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 36,
  },
  sectionDesc: {
    textAlign: "center",
    color: "#6b7280",
    lineHeight: 22,
  },

  bookList: {
    marginTop: 16,
  },
});
