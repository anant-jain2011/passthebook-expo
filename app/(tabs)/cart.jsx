import { Image } from "expo-image";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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

  // ❌ No quantity → just remove
  const removeItem = async (id) => {
    await AsyncStorage.setItem(
      "cart",
      JSON.stringify(cartItems.filter((item) => item._id !== id))
    );
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View>
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
              {item.board.toUpperCase()}
            </Text>

            <View>
              <Text style={styles.cartItemTitle} numberOfLines={2}>
                {item.title}
              </Text>

              {/* show grade only if exists */}
              {!!item.grade && (
                <Text style={styles.cartItemGrade}>Grade {item.grade}</Text>
              )}
            </View>

            <View style={styles.cartItemMeta}>
              <Text style={styles.cartItemPrice}>₹{item.price}</Text>
              <Text style={styles.cartItemBy}>
                By {item.giverDetails.ownerName}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.flexer}>
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
    </View>
  );

  // ✅ Empty cart UI
  if (!cartItems.length) {
    return (
      <SafeAreaView style={styles.emptyWrapper}>
        <Image
          source={require("@/assets/images/not-found.avif")}
          style={{ width: "90%", height: 350 }}
        />
        <Text style={styles.emptyText}>Your cart is empty</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: -insets.bottom }]}>
      <Text style={styles.title}>Shopping Cart</Text>

      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 0 }}
      />

      <View style={styles.footer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalPrice}>₹{total.toFixed(2)}</Text>
      </View>

      <TouchableOpacity
        style={styles.checkoutBtn}
        onPress={() => router.push("/checkout")}
      >
        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    marginVertical: 16,
    color: "#0f172a",
  },

  emptyWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    marginTop: 20,
    color: "#64748b",
    fontSize: 24,
    fontWeight: "600",
  },

  cartItem: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  cartItemRow: {
    flexDirection: "row",
    gap: 12,
  },

  cartItemImage: {
    width: 90,
    height: 120,
    borderRadius: 12,
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

  cartItemTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1e293b",
    marginTop: 4,
  },

  cartItemGrade: {
    fontSize: 12,
    color: "#64748b",
  },

  cartItemMeta: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

  flexer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cartItemCondition: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 18,
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
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "#fee2e2",
    borderRadius: 8,
    marginTop: -6,
  },

  removeBtnText: {
    color: "#ef4444",
    fontWeight: "700",
    fontSize: 12,
  },

  // 🔥 Sticky Footer
  footer: {
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    backgroundColor: "#fff",
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
    backgroundColor: "#0ea5e9",
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 2,
    marginBottom: 20,
  },

  checkoutText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
