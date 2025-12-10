import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const SkeletonLoader = () => (
  <View style={styles.skeletonCard}>
    <View style={[styles.skeletonImage, styles.skeleton]} />
    <View style={[styles.skeletonTitle, styles.skeleton]} />
    <View style={[styles.skeletonAuthor, styles.skeleton]} />
    <View style={[styles.skeletonPrice, styles.skeleton]} />
  </View>
);

const BookCard = ({ item }) => (
  <LinearGradient
    colors={["#ffffff", "#f8f9ff"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.card}
  >
    <Image source={{ uri: item.coverImage }} style={styles.bookImage} />
    <View style={styles.content}>
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.author}>{item.author}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>₹{item.price}</Text>
        <View style={styles.ratingBadge}>
          <Text style={styles.rating}>★ {item.rating}</Text>
        </View>
      </View>
    </View>
  </LinearGradient>
);

export default function FindBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      // Replace with your actual API call
      // const response = await fetch('YOUR_API_ENDPOINT');
      // const data = await response.json();
      // setBooks(data);

      // Simulated delay
      setTimeout(() => {
        setBooks([
          {
            id: "1",
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            price: 299,
            coverImage: "https://via.placeholder.com/150x220?text=Gatsby",
            rating: 4.5,
          },
          {
            id: "2",
            title: "1984",
            author: "George Orwell",
            price: 349,
            coverImage: "https://via.placeholder.com/150x220?text=1984",
            rating: 4.7,
          },
          {
            id: "3",
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            price: 279,
            coverImage: "https://via.placeholder.com/150x220?text=Mockingbird",
            rating: 4.8,
          },
        ]);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching books:", error);
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#f0f4ff", "#ffffff"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Books</Text>
        <Text style={styles.headerSubtitle}>Find your next favorite read</Text>
      </View>

      {loading ? (
        <FlatList
          data={[1, 2, 3, 4]}
          keyExtractor={(_, i) => i.toString()}
          renderItem={() => <SkeletonLoader />}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BookCard item={item} />}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
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
    flexDirection: "row",
    borderRadius: 16,
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  skeletonImage: {
    width: 100,
    height: 140,
    borderRadius: 12,
    marginRight: 16,
  },
  skeleton: {
    backgroundColor: "#e5e7eb",
  },
  skeletonTitle: {
    height: 16,
    borderRadius: 8,
    marginBottom: 8,
    width: "80%",
  },
  skeletonAuthor: {
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
    width: "60%",
  },
  skeletonPrice: {
    height: 14,
    borderRadius: 6,
    width: "40%",
  },
});
