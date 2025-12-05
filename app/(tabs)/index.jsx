import React from "react";
import { Link } from "expo-router";
import TypedText from "@/components/TypedText";
import Entypo from "@expo/vector-icons/Entypo";
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
    subject: "Mathematics",
    grade: "10",
    board: "Excellent",
    location: "Delhi",
    ownerName: "Aditya S.",
    createdAt: "2023-05-15",
  },
  {
    id: "2",
    title: "Science NCERT",
    subject: "Science",
    grade: "9",
    board: "Good",
    location: "Mumbai",
    ownerName: "Priya K.",
    createdAt: "2023-06-02",
  },
  {
    id: "3",
    title: "English Literature",
    subject: "English",
    grade: "11",
    board: "Fair",
    location: "Bangalore",
    ownerName: "Rahul M.",
    createdAt: "2023-06-10",
  },
];

export default function HomeScreen() {
  return (
    <ScrollView
      style={{
        backgroundColor: "white",
      }}
    >
      <ThemedView
        className="w-full flex justify-center items-center h-40"
        style={{
          backgroundColor: "#0ea5e9",
          display: "flex",
          flexDirection: "row",
          gap: 8,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Feather
          name="book-open"
          size={35}
          color="black"
          style={{ marginTop: 15 }}
        />
        <ThemedText type="title" style={{ marginTop: 15, fontSize: 40 }}>
          PassTheBook
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText
          className="rounded-full"
          style={{
            backgroundColor: "#a0F2FE",
            color: "#0086c3",
            borderRadius: 50,
            width: "70%",
            margin: "auto",
            textAlign: "center",
            padding: 5,
            fontWeight: "600",
            fontSize: 17,
            marginTop: 20,
          }}
        >
          Share Knowledge, Save Trees
        </ThemedText>

        <ThemedText type="subtitle" className="mt-6 text-center">
          <TypedText texts={["Connect,", "Exchange,", "Make a Difference."]} />
        </ThemedText>
      </ThemedView>

      <ThemedView className="flex flex-wrap gap-4 pt-4 mt-4">
        <Link
          href="/find-book"
          className="text-white px-6 py-4 rounded-full font-medium hover:bg-book-blue/90 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
          style={{ backgroundColor: "#0ea5e9" }}
        >
          Find Textbooks{" "}
          <Entypo name="chevron-thin-right" size={18} color="white" />
        </Link>
        <Link
          href="/list-book"
          className="bg-transparent border-2 border-book-blue text-book-blue px-6 py-3 rounded-full font-medium hover:bg-book-blue/10 transition-all flex items-center gap-2"
        >
          List Your Books
        </Link>
      </ThemedView>

      <ThemedView className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <ThemedView className="flex flex-col gap-3">
          <ThemedView className="w-12 h-12 rounded-full bg-book-light-blue flex items-center justify-center">
            <Feather
              name="book-open"
              size={24}
              color="black"
              style={{
                borderRadius: 50,
                backgroundColor: "#a0F2FE",
                padding: 5,
                color: "#0a86c3",
              }}
            />
          </ThemedView>
          <ThemedText type="subtitle" className="text-xl font-semibold">
            Accessible Education
          </ThemedText>
          <ThemedText className="text-gray-600">
            Making textbooks available to every student in India.
          </ThemedText>
        </ThemedView>

        <ThemedView className="flex flex-col gap-3">
          <ThemedView className="w-12 h-12 rounded-full bg-book-light-blue flex items-center justify-center">
            <FontAwesome
              name="recycle"
              size={24}
              color="black"
              style={{
                borderRadius: 50,
                backgroundColor: "#a0F2FE",
                padding: 5,
                color: "#0a86c3",
              }}
            />
          </ThemedView>
          <ThemedText type="subtitle" className="text-xl font-semibold">
            Reduce Waste
          </ThemedText>
          <ThemedText className="text-gray-600">
            Giving textbooks a second life reduces paper waste.
          </ThemedText>
        </ThemedView>

        <ThemedView className="flex flex-col gap-3">
          <ThemedView className="w-12 h-12 rounded-full bg-book-light-blue flex items-center justify-center">
            <Feather
              name="heart"
              size={24}
              color="black"
              style={{
                borderRadius: 50,
                backgroundColor: "#a0F2FE",
                padding: 5,
                color: "#0a86c3",
              }}
            />
          </ThemedView>
          <ThemedText type="subtitle" className="text-xl font-semibold">
            Community Building
          </ThemedText>
          <ThemedText className="text-gray-600">
            Connecting students to help each other succeed.
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView className="section bg-book-gray">
        <ThemedView className="container mx-auto">
          <ThemedView className="text-center max-w-3xl mx-auto mb-16">
            <ThemedText className="inline-block px-3 py-1 rounded-full bg-book-light-blue text-book-blue text-sm font-medium mb-4">
              Simple Process
            </ThemedText>
            <ThemedText className="text-3xl md:text-4xl font-bold mb-6">
              How PassTheBook Works
            </ThemedText>
            <ThemedText className="text-gray-600 text-lg">
              Our platform makes it easy to exchange textbooks in three simple
              steps, connecting students across India.
            </ThemedText>
          </ThemedView>

          <ThemedView className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ThemedView className="bg-white rounded-2xl p-8 shadow-soft text-center">
              <ThemedView className="w-16 h-16 rounded-full bg-book-light-blue flex items-center justify-center mx-auto mb-6">
                <Feather name="search" size={32} color="#0a86c3" />
              </ThemedView>

              <ThemedText className="text-xl font-semibold mb-4">
                Find Books
              </ThemedText>

              <ThemedText className="text-gray-600 mb-6">
                Search for the textbooks you need by subject, grade, or location
                to find matches near you.
              </ThemedText>

              <Link
                href="/find-book"
                className="text-book-blue font-medium hover:underline inline-flex items-center"
              >
                Start Searching
                <Entypo name="chevron-thin-right" size={18} color="white" />
              </Link>
            </ThemedView>

            <ThemedView className="bg-white rounded-2xl p-8 shadow-soft text-center">
              <ThemedView className="w-16 h-16 rounded-full bg-book-light-blue flex items-center justify-center mx-auto mb-6">
                <Feather name="upload" size={32} color="black" />
              </ThemedView>

              <ThemedText className="text-xl font-semibold mb-4">
                List Books
              </ThemedText>

              <ThemedText className="text-gray-600 mb-6">
                List your old textbooks with details about board, subject, and
                grade to help others find them.
              </ThemedText>

              <Link
                href="/list-book"
                className="text-book-blue font-medium hover:underline inline-flex items-center"
              >
                List Your Books
              </Link>
            </ThemedView>

            <ThemedView className="bg-white rounded-2xl p-8 shadow-soft text-center">
              <ThemedView className="w-16 h-16 rounded-full bg-book-light-blue flex items-center justify-center mx-auto mb-6">
                <FontAwesome5 name="users" size={24} color="black" />
              </ThemedView>

              <ThemedText className="text-xl font-semibold mb-4">
                Connect
              </ThemedText>

              <ThemedText className="text-gray-600 mb-6">
                Contact book owners directly and arrange a convenient exchange
                method that works for both of you.
              </ThemedText>

              <Link
                href="#"
                className="text-book-blue font-medium hover:underline inline-flex items-center"
              >
                Learn More
                <Entypo name="chevron-thin-right" size={18} color="white" />
              </Link>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* Featured Books Section */}
      <ThemedView className="section">
        <ThemedView className="container mx-auto">
          <ThemedView className="flex justify-between items-center mb-12">
            <ThemedView>
              <ThemedText className="inline-block px-3 py-1 rounded-full bg-book-light-blue text-book-blue text-sm font-medium mb-4">
                Recently Listed
              </ThemedText>

              <ThemedText className="text-3xl font-bold">
                Featured Books
              </ThemedText>
            </ThemedView>

            <Link
              href="/find-book"
              className="text-book-blue font-medium hover:underline inline-flex items-center"
            >
              View All
              <Entypo name="chevron-thin-right" size={18} color="white" />
            </Link>
          </ThemedView>

          <ThemedView className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* CTA Section */}
      <ThemedView className="section bg-gradient-to-r from-[#1fa5ff] to-blue-600 text-white">
        <ThemedView className="container mx-auto text-center max-w-3xl">
          <ThemedText className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </ThemedText>
          <ThemedText className="text-xl mb-8 opacity-90">
            Join thousands of students across India who are making education
            more accessible and sustainable.
          </ThemedText>
          <ThemedView className="flex flex-wrap justify-center gap-4">
            <Link
              href="/find-book"
              className="bg-white text-book-blue rounded-full px-6 py-3 font-medium hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl"
            >
              Find Textbooks
            </Link>
            <Link
              href="/list-book"
              className="bg-transparent border-2 border-white text-white rounded-full px-6 py-3 font-medium hover:bg-white/10 transition-all"
            >
              List Your Books
            </Link>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
