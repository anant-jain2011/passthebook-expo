import { useUser } from '@clerk/clerk-expo';
import { useFocusEffect, useRouter } from 'expo-router';
import { use, useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationsScreen() {
    const { user } = useUser();
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
            fetchNotifications().then(() => setLoading(false));
        }, [])
    );

    useEffect(() => {
        fetchNotifications().then(() => setLoading(false));
    }, []);

    const fetchNotifications = async () => {
        try {
            // Replace with your actual API endpoint
            const response = await fetch('https://ptb-backend.vercel.app/get-notifications?userId=' + user.id);
            const data = await response.json();
            console.log(data)

            setNotifications(data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderNotification = ({ item }) => (
        <View style={styles.notificationCard}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.message}>{item.body}</Text>
            <Text style={styles.timestamp}>{(new Date(item.updatedAt)).toDateString()}</Text>
        </View>
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Loading notifications...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {notifications.length === 0 ? (
                <Text style={styles.emptyText}>No notifications yet</Text>
            ) : (
                <FlatList
                    data={notifications}
                    renderItem={renderNotification}
                    keyExtractor={(item) => item._id}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    notificationCard: {
        backgroundColor: '#fff',
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#007AFF',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    message: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    timestamp: {
        fontSize: 12,
        color: '#999',
    },
    emptyText: {
        textAlign: 'center',
        color: '#999',
        marginTop: 20,
    },
});