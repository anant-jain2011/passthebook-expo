import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { scheduleNotificationAsync } from "expo-notifications";

export default function ChatsScreen() {
    const router = useRouter();
    const { user } = useUser();
    const scrollViewRef = useRef();
    const insets = useSafeAreaInsets();
    const [space, setSpace] = useState(0);
    const [input, setInput] = useState("");
    const { name, id } = useLocalSearchParams();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", e => setSpace(e.endCoordinates.height - (insets.bottom * 1.5)));
        Keyboard.addListener("keyboardDidHide", () => setSpace(0));

        scrollViewRef.current?.scrollToEnd({ animated: true });

        id && fetch("https://ptb-backend.vercel.app/get-chats?id=" + id)
            .then(res => res.json())
            .then(data => {
                setMessages(data.messages);
            });

        return () => {
            Keyboard.removeAllListeners("keyboardDidShow");
            Keyboard.removeAllListeners("keyboardDidHide");
        };
    }, [messages]);

    const handleSend = () => {
        if (input.trim()) {
            let newMsgs = [...messages, { content: input, sender: user.id }];
            setMessages(newMsgs);

            fetch("https://ptb-backend.vercel.app/chat",
                {
                    method: "POST",
                    body: JSON.stringify({
                        id: id || null,
                        rid: user.publicMetadata?.pushToken || null,
                        fname: user.firstName,
                        msg: { content: input, sender: user.id },
                    }),
                }
            ).then(res => res.json())
                .then(async () => {
                    

                    
                });

            setInput("");
        }
    };

    return (
        <SafeAreaView style={[styles.container, { paddingBottom: -insets.bottom }]}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Chat with {name}</Text>
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