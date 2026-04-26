import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChatsScreen() {
  const scrollViewRef = useRef();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [input, setInput] = useState("");
  const [space, setSpace] = useState(0);
  const [messages, setMessages] = useState([
    {
      content: `PassTheBook is an app in which users can share books with each other.
      For example, if Student A of grade 8 wants the book of 8th grade and a Student B of grade 9th is ready to give his books, the both students A & B can share their books through the app. For uploading books, the user can click on 'Add Books' Button and has to take a picture of the book and upload it on the app with some details like book name, board, grade, condition of the book etc. After uploading, other users can see the book and contact the person who has uploaded the books if they want to take that book. For finding books, the user can click on 'Find Books' Button and can see all the books uploaded by other users. The user can filter the books according to their needs like board, grade etc. If the user finds a book they want, they can contact the person who has uploaded the books through the contact details provided in the book details. The app also has a chat feature where users can chat with a bot to understand how to use the app effectively.

      You are a helpful assistant that helps users understand the features and functionalities of PassTheBook, a book sharing application. You can use the above explanation to provide clear and concise answers to user queries about how to use the app effectively, do not use the exact sentences used above, rephrase the sentences. If you don't know the answer, politely inform the user that you are unable to assist with that question. Always maintain a friendly and approachable tone. Always deny but in a polite manner if the user asks for anything irrelevant to the usage or the working of the PassTheBook. Do not include special characters like @,#,^,&,*,[] or citations or references to anything other than PassTheBook in your responses.`,
      role: "system",
    },
    {
      content: "Hello",
      role: "user",
    },
    {
      content: "Hi! 👋 I'm here to help you understand PassTheBook. What would you like to know first?",
      role: "assistant",
    },
  ]);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", e => setSpace(e.endCoordinates.height - (insets.bottom * 1.5)));
    Keyboard.addListener("keyboardDidHide", () => setSpace(0));

    scrollViewRef.current?.scrollToEnd({ animated: true });

    return () => {
      Keyboard.removeAllListeners("keyboardDidShow");
      Keyboard.removeAllListeners("keyboardDidHide");
    };
  }, [messages]);

  const handleSend = async () => {
  if (!input.trim()) return;

  const userMsg = { content: input, role: "user" };

  const newMsgs = [
    ...messages,
    userMsg,
    { content: "...", role: "assistant" },
  ];

  setMessages(newMsgs);
  setInput("");

  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=AIzaSyB45pKCB3r3H90Wvcgj8b1taz7qhK0KChI",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: [...messages, userMsg]
                    .map((m) => `${m.role}: ${m.content}`)
                    .join("\n"),
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await res.json();

    const reply =
      data && data.candidates[0].content.parts[0].text ||
      "No response, try again!";

    setMessages((prevMsgs) => {
      const updated = [...prevMsgs];
      updated[updated.length - 1] = {
        role: "assistant",
        content: reply.replace(/\*\*/g, ""),
      };
      return updated;
    });
  } catch (err) {
    console.error(err);

    setMessages((prevMsgs) => {
      const updated = [...prevMsgs];
      updated[updated.length - 1] = {
        role: "assistant",
        content: "Error fetching response",
      };
      return updated;
    });
  }
};

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: -insets.bottom }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Chat with PassTheBook Bot</Text>
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={styles.messageContainer}
          contentContainerStyle={styles.messageContentContainer}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.slice(2).map((msg, id) => (
            <View
              key={id}
              style={[styles.message, msg.role === "user" ? styles.userMessage : styles.botMessage]}
            >
              <View
                style={[styles.messageBubble, msg.role === "user" ? styles.userBubble : styles.botBubble]}
              >
                <Text style={[styles.messageText, msg.role === "user" ? styles.userText : styles.botText]}>
                  {msg.content}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={{ ...styles.inputContainer, bottom: space }}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask anything about PassTheBook..."
            value={input}
            onChangeText={setInput}
            placeholderTextColor="#999"
            returnKeyType="send"
            placeholderFontSize={10}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  messageContainer: {
    flex: 1,
  },
  messageContentContainer: {
    padding: 16,
    paddingBottom: 70,
  },
  message: {
    marginBottom: 12,
  },
  userMessage: {
    alignItems: "flex-end",
  },
  botMessage: {
    alignItems: "flex-start",
  },
  messageBubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    maxWidth: "80%",
  },
  userBubble: {
    backgroundColor: "#007AFF",
  },
  botBubble: {
    backgroundColor: "#e8e8e8",
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: "white",
  },
  botText: {
    color: "#333",
  },
  inputContainer: {
    position: "absolute",
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: "white",
  },
  sendButton: {
    backgroundColor: "#007AFF",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
