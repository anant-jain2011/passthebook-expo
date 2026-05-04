import { Image } from 'expo-image';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CartScreen() {
    const [cartItems, setCartItems] = useState([]);
    const insets = useSafeAreaInsets();
    const router = useRouter();

    // ✅ Load cart ONLY once
    useFocusEffect(
        useCallback(() => {
            loadCart();
        }, [])
    );

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        const value = await AsyncStorage.getItem("cart");
        if (value) {
            const parsed = JSON.parse(value);

            // ✅ Remove duplicates (important)
            const uniqueItems = parsed.filter(
                (item, index, self) =>
                    index === self.findIndex((i) => i._id === item._id)
            );

            setCartItems(uniqueItems);
        }
    };

    // ✅ Save cart whenever changed

    // ❌ No quantity → just remove
    const removeItem = async (id) => {
        await AsyncStorage.setItem("cart", JSON.stringify(cartItems.filter(item => item._id !== id)));
        setCartItems(prev => prev.filter(item => item._id !== id));
    };

    const total = cartItems.reduce((sum, item) => sum + Number(item.price || 0), 0);

    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <View style={styles.cartItemContent}>

                <Text style={styles.cartItemSubject}>
                    {item.subjects?.join(", ")}
                </Text>

                <View style={styles.cartItemRow}>
                    <Image
                        source={{ uri: item.imgs?.[0] }}
                        style={styles.cartItemImage}
                    />

                    <View style={styles.itemInfo}>
                        <Text
                            style={[
                                styles.boardBadge,
                                {
                                    backgroundColor: "#e0f2fe",
                                    color: "#0284c7",
                                },
                            ]}
                        >
                            {item.board}
                        </Text>

                        <View style={styles.cartItemHeader}>
                            <Text style={styles.cartItemTitle} numberOfLines={2}>
                                {item.title}
                            </Text>

                            {/* show grade only if exists */}
                            {!!item.grade && (
                                <Text style={styles.cartItemGrade}>
                                    Grade {item.grade}
                                </Text>
                            )}
                        </View>

                        <View style={styles.cartItemMeta}>
                            <Text style={styles.cartItemPrice}>
                                ₹{item.price}
                            </Text>
                            <Text style={styles.cartItemBy}>
                                By {item.ownerName}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.cartItemCondition}>
                    <Text style={styles.conditionLabel}>Condition:</Text>
                    <Text style={styles.conditionBadge}>{item.condition}</Text>
                </View>

                {/* ✅ Only remove button */}
                <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => removeItem(item._id)}
                >
                    <Text style={styles.removeBtnText}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    // ✅ Empty cart UI
    if (!cartItems.length) {
        return (
            <SafeAreaView style={styles.container}>
                <Image source={require("@/assets/images/not-found.avif")} style={{ width: "90%", height: 340 }} />
                <Text style={styles.emptyText}>
                    Your cart is empty.
                </Text>
                {/* e */}
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { paddingBottom: -insets.bottom }]}>
            <Text style={styles.title}>Shopping Cart</Text>

            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />

            <View style={styles.footer}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalPrice}>₹{total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity style={styles.checkoutBtn} onPress={() => router.push("/checkout")}>
                <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8fafc",
        padding: 16,
        justifyContent: "center",
        alignItems: "center"
    },

    title: {
        fontSize: 26,
        fontWeight: "800",
        marginBottom: 16,
        color: "#0f172a",
    },

    emptyText: {
        textAlign: "center",
        marginTop: 30,
        color: "#64748b",
        fontSize: 36,
    },

    cartItem: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 14,
        marginBottom: 14,
        elevation: 3,
    },

    cartItemContent: {
        gap: 10,
    },

    cartItemSubject: {
        fontSize: 12,
        color: "#6366f1",
        fontWeight: "600",
    },

    cartItemRow: {
        flexDirection: "row",
        gap: 12,
    },

    cartItemImage: {
        width: 90,
        height: 120,
        borderRadius: 10,
        backgroundColor: "#e2e8f0",
    },

    itemInfo: {
        flex: 1,
        justifyContent: "space-between",
    },

    boardBadge: {
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        fontSize: 10,
        fontWeight: "700",
    },

    cartItemHeader: {
        marginTop: 4,
        gap: 4,
    },

    cartItemTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1e293b",
    },

    cartItemGrade: {
        fontSize: 12,
        color: "#64748b",
    },

    cartItemMeta: {
        marginTop: 6,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    cartItemPrice: {
        fontSize: 18,
        fontWeight: "800",
        color: "#10b981",
    },

    cartItemBy: {
        fontSize: 11,
        color: "#94a3b8",
    },

    cartItemCondition: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 4,
    },

    conditionLabel: {
        fontSize: 12,
        color: "#64748b",
    },

    conditionBadge: {
        fontSize: 11,
        fontWeight: "600",
        backgroundColor: "#e2e8f0",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        color: "#334155",
    },

    removeBtn: {
        alignSelf: "flex-end",
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: "#fee2e2",
        borderRadius: 8,
        marginTop: 6,
    },

    removeBtnText: {
        color: "#ef4444",
        fontWeight: "700",
        fontSize: 12,
    },

    footer: {
        marginTop: "auto",
        paddingVertical: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: "#e2e8f0",
    },

    totalLabel: {
        fontSize: 16,
        color: "#64748b",
        fontWeight: "600",
    },

    totalPrice: {
        fontSize: 22,
        fontWeight: "800",
        color: "#10b981",
    },

    checkoutBtn: {
        backgroundColor: "#6366f1",
        paddingVertical: 16,
        borderRadius: 12,
        marginTop: 10,
    },

    checkoutText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "700",
        textAlign: "center",
    },
});