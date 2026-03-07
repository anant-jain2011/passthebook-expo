import BookCard from "@/components/BookCard";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Picky from "../../components/Picky";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SkeletonLoader = () => (
  <View style={styles.skeletonCard}>
    <View style={[styles.skeletonImage, styles.skeleton]} />
    <View style={styles.skeletonContent}>
      <View style={[styles.skeletonTitle, styles.skeleton]} />
      <View style={[styles.skeletonAuthor, styles.skeleton]} />
      <View style={styles.skeletonFooter}>
        <View style={[styles.skeletonPrice, styles.skeleton]} />
        <View style={[styles.skeletonBadge, styles.skeleton]} />
      </View>
    </View>
  </View>
);

export default function FindBooks() {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    subjects: "",
    grade: null,
    condition: null,
    board: null,
    type: null,
  });
  const [loading, setLoading] = useState(true);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [fOpen, setFOpen] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://ptb-backend.vercel.app/get-books");
      const data = await response.json();

      setTimeout(() => {
        setBooks(data);
        setFilteredBooks(data);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching books:", error);
      setLoading(false);
    }
  };

  const filter = (det, val) => {
    filters[det] = val;

    const filtered = books.filter((book) => {
      return Object.keys(filters).every((key) => {
        if (!filters[key]) {
          return true;
        }

        let returner = (val) => val.toLowerCase().includes(filters[key].toString().toLowerCase());

        if (key === "subjects") {
          return returner(book[key].join(""));
        }
        if (key === "grade") {
          return returner(book[key].toString());
        }
        if (key == "title") {
          return returner(book[key]);
        }
        return book[key] == filters[key];
      });
    });

    setFilters(filters);
    setFilteredBooks(filtered);
  }

  return (
    <LinearGradient colors={["#f0f4ff", "#ffffff"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Books</Text>
        <Text style={styles.headerSubtitle}>Find the textbooks you need</Text>
      </View>

      <View style={{ padding: 15, borderRadius: 0 }}>
        <View style={styles.refreshButtonContainer}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#1a1a2e", verticalAlign: "middle", }}>
            Filters
          </Text>

          <TouchableOpacity onPress={fetchBooks} style={styles.refreshButton}>
            <Text style={styles.refreshButtonText}>Refresh</Text>
            <FontAwesome name="repeat" size={24} style={styles.refreshIcon} />
          </TouchableOpacity>
        </View>

        {fOpen &&
          <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "flex-start", gap: "2%" }}>
            <TextInput placeholder="Search by subject" name="Subject" value={filters["subject"]} cVal={filters["subject"]} onChangeText={(text) => filter("subjects", text)} style={styles.dropdown} />
            <TextInput placeholder="Search by grade" name="Grade" keyboardType="numeric" value={filters["grade"]} cVal={filters["grade"]} onChangeText={(value) => filter("grade", value.toString())} style={styles.dropdown} />
            <Picky name="Condition" values={[
              { "value": null, "label": "No filter" },
              { "value": "new", "label": "New" },
              { "value": "used", "label": "Used" },
              { "value": "like_new", "label": "Like New" }
            ]} cVal={filters["condition"]} onChange={(value) => filter("condition", value)} dStyles={styles.dropdown} />
            <Picky name="Board" values={[
              { "value": null, "label": "No filter" },
              { "value": "cbse", "label": "CBSE" },
              { "value": "icse", "label": "ICSE" },
              { "value": "ncert", "label": "NCERT" },
              { "value": "state_board", "label": "State Board" }
            ]} cVal={filters["board"]} onChange={(value) => filter("board", value)} dStyles={styles.dropdown} />
          </View>
        }

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
          <Pressable onPress={() => {
            setFilters({ subjects: "", grade: null, condition: null, board: null });
            setFilteredBooks(books);
          }} style={{ paddingInline: 10, marginTop: 10, paddingBlock: 5, borderRadius: 20, backgroundColor: "#e0e7ff" }}>
            <Text style={{ color: "#4f46e5", fontWeight: "600" }}>Clear Filters</Text>
          </Pressable>
          <Pressable onPress={() => {
            setFOpen(!fOpen);
          }} style={{ paddingInline: 10, marginTop: 10, paddingBlock: 5, borderRadius: 20, backgroundColor: "#e0e7ff" }}>
            <Text style={{ color: "#4f46e5", fontWeight: "600" }}>{fOpen ? "Collapse Filters" : "Expand Filters"}</Text>
          </Pressable>
        </View>
      </View>

      {/* <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 30 }}>
        <TouchableOpacity
          onPress={() => filter("title", "")}
          style={{
            backgroundColor: "#e0e7ff",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            marginRight: 10,
          }}
        >
          <Text style={{ color: "#4f46e5", fontWeight: "600" }}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => filter("title", "calculus")}
          style={{
            backgroundColor: "#e0e7ff",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            marginRight: 10,
          }}
        >
          <Text style={{ color: "#4f46e5", fontWeight: "600" }}>Calculus</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => filter("title", "physics")}
          style={{
            backgroundColor: "#e0e7ff",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            marginRight: 10,
          }}
        >
          <Text style={{ color: "#4f46e5", fontWeight: "600" }}>Physics</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => filter("title", "chemistry")}
          style={{
            backgroundColor: "#e0e7ff",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "#4f46e5", fontWeight: "600" }}>Chemistry</Text>
        </TouchableOpacity>
      </View> */}

      {loading ? (
        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          keyExtractor={(_, i) => i.toString()}
          numColumns={2}
          renderItem={() => <SkeletonLoader />}
          scrollEnabled={true}
          contentContainerStyle={styles.listContainer}
        />
      ) : filteredBooks.length > 0 ? (
        <FlatList
          data={filteredBooks}
          keyExtractor={book => book._id}
          numColumns={2}
          renderItem={({ item: book }) => <BookCard key={book._id} book={book} />}
          scrollEnabled={true}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Text style={{ fontSize: 18, color: "#7c7c8e" }}>
            No books available at the moment.
          </Text>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  dropdown: {
    height: 40,
    width: '49%',
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 0.6,
    borderRadius: 99,
    paddingHorizontal: 15,
    verticalAlign: "middle",
    marginBottom: 10,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1a1a2e",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#7c7c8e",
    fontWeight: "500",
  },
  refreshButtonContainer: {
    paddingHorizontal: 10,
    marginTop: -15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  refreshButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingBottom: 8,
    borderRadius: 20,
    paddingTop: -20,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#eef2ff",
  },
  refreshButtonText: {
    color: "#4f46e5",
    // marginTop: -5,
    fontWeight: "700",
    paddingTop: 8,
  },
  refreshIcon: {
    color: "#4f46e5",
    paddingLeft: 10,
    paddingTop: 8,
    fontSize: 20,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  card: {
    flexDirection: "row",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  bookImage: {
    width: 100,
    height: 140,
    borderRadius: 12,
    marginRight: 16,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: 4,
  },
  author: {
    fontSize: 13,
    color: "#7c7c8e",
    fontWeight: "500",
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 18,
    fontWeight: "800",
    color: "#6366f1",
  },
  ratingBadge: {
    backgroundColor: "#fef3c7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rating: {
    fontSize: 12,
    fontWeight: "600",
    color: "#f59e0b",
  },
  skeletonCard: {
    width: "49%",
    // margin: 8,
    flexDirection: "column",
    borderRadius: 16,
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginRight: "2%",
  },

  // IMAGE FULL WIDTH
  skeletonImage: {
    width: "100%",   // 🔥 important
    height: 140,
    borderRadius: 12,
    marginBottom: 12, // ❌ marginBlock → ✔ marginBottom
  },

  skeleton: {
    backgroundColor: "#e5e7eb",
  },

  skeletonContent: {
    width: "100%",
    justifyContent: "center",
  },

  skeletonTitle: {
    height: 16,
    borderRadius: 8,
    marginBottom: 8,
    width: "85%",
  },

  skeletonAuthor: {
    height: 12,
    borderRadius: 6,
    marginBottom: 10,
    width: "60%",
  },

  skeletonFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },

  skeletonPrice: {
    height: 14,
    borderRadius: 6,
    width: "40%",
  },

  skeletonBadge: {
    width: 64,
    height: 20,
    borderRadius: 8,
  },
});
