import BookCard from "@/components/BookCard";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import TypedText from "@/components/TypedText";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Link } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

const featuredBooks = [
  {
    id: "1",
    title: "Mathematics NCERT",
    subject: "Mathematics",
    grade: "10",
    condition: "Excellent",
    location: "Delhi",
    ownerName: "Aditya S.",
    createdAt: "2023-05-15",
    board: "CBSE",
  },
  {
    id: "2",
    title: "Science NCERT",
    subject: "Science",
    grade: "9",
    condition: "Good",
    location: "Mumbai",
    ownerName: "Priya K.",
    createdAt: "2023-06-02",
    board: "CBSE",
  },
  {
    id: "3",
    title: "English Literature",
    subject: "English",
    grade: "11",
    condition: "Fair",
    location: "Bangalore",
    ownerName: "Rahul M.",
    createdAt: "2023-06-10",
    board: "CBSE",
  },
];

export default function HomeScreen() {
  return (
    <ScrollView
      className="bg-white"
      style={{
        background: "white",
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
        <ThemedText
          type="title"
          style={{ marginTop: 15, fontSize: 40, lineHeight: 40 }}
        >
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

      <ThemedView
        className="flex flex-row gap-4 pt-4 mt-4 justify-center items-center w-full"
        style={
          {
            // backgroundColor: "#0ea5e9",
          }
        }
      >
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

      <ThemedView className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <ThemedView className="flex flex-col gap-3 w-full px-[5%]">
          <ThemedView className="w-12 h-12 rounded-full flex items-center justify-center ml-1">
            <Feather
              name="book-open"
              size={26}
              color="black"
              style={{
                borderRadius: 50,
                backgroundColor: "#a0F2FE",
                padding: 8,
                color: "#0a86c3",
              }}
            />
          </ThemedView>
          <ThemedText type="subtitle" className="text-xl font-semibold ml-2">
            Accessible Education
          </ThemedText>
          <ThemedText className="text-gray-600 ml-2">
            Making textbooks available to every student in India.
          </ThemedText>
        </ThemedView>

        <ThemedView className="flex flex-col gap-3 w-full px-[5%]">
          <ThemedView className="w-12 h-12 rounded-full flex items-center justify-center ml-1">
            <FontAwesome
              name="recycle"
              size={26}
              color="black"
              style={{
                borderRadius: 50,
                backgroundColor: "#a0F2FE",
                padding: 8,
                color: "#0a86c3",
              }}
            />
          </ThemedView>
          <ThemedText type="subtitle" className="text-xl font-semibold ml-2">
            Reduce Waste
          </ThemedText>
          <ThemedText className="text-gray-600 ml-2">
            Giving textbooks a second life reduces paper waste.
          </ThemedText>
        </ThemedView>

        <ThemedView className="flex flex-col gap-3 w-full px-[5%]">
          <ThemedView className="w-12 h-12 rounded-full flex items-center justify-center ml-1">
            <Feather
              name="heart"
              size={26}
              color="black"
              style={{
                borderRadius: 50,
                backgroundColor: "#a0F2FE",
                padding: 8,
                color: "#0a86c3",
              }}
            />
          </ThemedView>
          <ThemedText type="subtitle" className="text-xl font-semibold ml-2">
            Community Building
          </ThemedText>
          <ThemedText className="text-gray-600 ml-2">
            Connecting students to help each other succeed.
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView
        className="section bg-book-gray"
        style={{ paddingVertical: 60, paddingHorizontal: 16 }}
      >
        <ThemedView className="container mx-auto" style={{ marginBottom: 48 }}>
          <ThemedText
            className="rounded-full"
            style={{
              backgroundColor: "#a0F2FE",
              color: "#0086c3",
              borderRadius: 50,
              width: "70%",
              margin: "auto",
              textAlign: "center",
              padding: 10,
              fontWeight: "600",
              fontSize: 14,
              marginBottom: 24,
              letterSpacing: 0.5,
            }}
          >
            Simple Process
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 32,
              fontWeight: "700",
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            How PassTheBook Works
          </ThemedText>
          <ThemedText
            style={{
              color: "#6b7280",
              fontSize: 16,
              lineHeight: 24,
              textAlign: "center",
              maxWidth: 600,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Our platform makes it easy to exchange textbooks in three simple
            steps, connecting students across India.
          </ThemedText>
        </ThemedView>

        <ThemedView
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 24,
            justifyContent: "space-between",
            flexWrap: "wrap",
            paddingHorizontal: 16,
          }}
        >
          <ThemedView
            style={{
              flex: 1,
              minWidth: 300,
              backgroundColor: "#ffffff",
              borderRadius: 16,
              padding: 32,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 3,
              alignItems: "center",
            }}
          >
            <ThemedView
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#e0f2fe",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <Feather name="search" size={32} color="#0a86c3" />
            </ThemedView>

            <ThemedText
              style={{
                fontSize: 20,
                fontWeight: "600",
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              Find Books
            </ThemedText>

            <ThemedText
              style={{
                color: "#6b7280",
                fontSize: 15,
                lineHeight: 22,
                marginBottom: 24,
                textAlign: "center",
              }}
            >
              Search for the textbooks you need by subject, grade, or location
              to find matches near you.
            </ThemedText>

            <Link
              href="/find-book"
              style={{
                color: "#0ea5e9",
                fontWeight: "600",
                fontSize: 14,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              Start Searching
              <Entypo name="chevron-thin-right" size={16} color="#0ea5e9" />
            </Link>
          </ThemedView>

          <ThemedView
            style={{
              flex: 1,
              minWidth: 300,
              backgroundColor: "#ffffff",
              borderRadius: 16,
              padding: 32,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 3,
              alignItems: "center",
            }}
          >
            <ThemedView
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#e0f2fe",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <Feather name="upload" size={32} color="#0a86c3" />
            </ThemedView>

            <ThemedText
              style={{
                fontSize: 20,
                fontWeight: "600",
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              List Books
            </ThemedText>

            <ThemedText
              style={{
                color: "#6b7280",
                fontSize: 15,
                lineHeight: 22,
                marginBottom: 24,
                textAlign: "center",
              }}
            >
              List your old textbooks with details about condition, subject, and
              grade to help others find them.
            </ThemedText>

            <Link
              href="/list-book"
              style={{
                color: "#0ea5e9",
                fontWeight: "600",
                fontSize: 14,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              List Your Books
              <Entypo name="chevron-thin-right" size={16} color="#0ea5e9" />
            </Link>
          </ThemedView>

          <ThemedView
            style={{
              flex: 1,
              minWidth: 300,
              backgroundColor: "#ffffff",
              borderRadius: 16,
              padding: 32,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 3,
              alignItems: "center",
            }}
          >
            <ThemedView
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#e0f2fe",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <FontAwesome5 name="users" size={28} color="#0a86c3" />
            </ThemedView>

            <ThemedText
              style={{
                fontSize: 20,
                fontWeight: "600",
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              Connect
            </ThemedText>

            <ThemedText
              style={{
                color: "#6b7280",
                fontSize: 15,
                lineHeight: 22,
                marginBottom: 24,
                textAlign: "center",
              }}
            >
              Contact book owners directly and arrange a convenient exchange
              method that works for both of you.
            </ThemedText>

            <Link
              href="#"
              style={{
                color: "#0ea5e9",
                fontWeight: "600",
                fontSize: 14,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              Learn More
              <Entypo name="chevron-thin-right" size={16} color="#0ea5e9" />
            </Link>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* Featured Books Section */}
      <ThemedView className="section">
        <ThemedView className="container mx-auto">
          <ThemedView className="flex justify-between items-center mb-12">
            <ThemedView>
              <ThemedText className="inline-block px-3 py-1 rounded-full text-book-blue text-sm font-medium mb-4">
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
            <ThemedText>
              {featuredBooks.map((book) => {
                // return JSON.stringify(book);
                return <BookCard key={book.id} book={book} />;
              })}
            </ThemedText>
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
