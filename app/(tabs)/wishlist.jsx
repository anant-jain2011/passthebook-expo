// import { Image } from "expo-image";
// import { useFocusEffect, useRouter } from "expo-router";
// import { useCallback, useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   SafeAreaView,
//   useSafeAreaInsets,
// } from "react-native-safe-area-context";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function WishlistScreen() {
  // const [wishlist, setWishlist] = useState([]);
  // const insets = useSafeAreaInsets();
  // const router = useRouter();

  // useEffect(() => {
  //   loadWishlist();
  // }, []);

  // const loadWishlist = async () => {
  //   const data = await AsyncStorage.getItem("wishlist");
  //   if (data) setWishlist(JSON.parse(data));
  // };

  // const removeItem = async (id) => {
  //   const updated = wishlist.filter((item) => item.id !== id);
  //   setWishlist(updated);
  //   await AsyncStorage.setItem("wishlist", JSON.stringify(updated));
  // };

  // const renderItem = ({ item }) => (
  //   <View style={styles.card}>
  //     <Image source={{ uri: item.image }} style={styles.image} />

  //     <Text numberOfLines={2} style={styles.title}>
  //       {item.title}
  //     </Text>

  //     <Pressable style={styles.heart} onPress={() => removeItem(item.id)}>
  //       <FontAwesome name="heart" size={20} color="red" />
  //     </Pressable>
  //   </View>
  // );

  // // ✅ Empty cart UI
  // if (!wishlist.length) {
  return (
    <View style={styles.emptyWrapper}>
      {/* // <Image
        //   source={require("@/assets/images/wishlist.webp")}
        //   style={{ width: "90%", height: 350 }}
        // /> */}
      <Text style={styles.emptyText}>Your wishlist is empty...</Text>
    </View>
  );
  // }

  // return (
  //   <SafeAreaView style={[styles.container, { paddingBottom: -insets.bottom }]}>
  //     <Text style={styles.title}>Shopping Cart</Text>

  //     <FlatList
  //       data={wishlist}
  //       renderItem={renderItem}
  //       keyExtractor={(item) => item._id}
  //       contentContainerStyle={{ paddingBottom: 0 }}
  //     />

  //     <View style={styles.footer}>
  //       <Text style={styles.totalLabel}>Total:</Text>
  //       <Text style={styles.totalPrice}>₹{total.toFixed(2)}</Text>
  //     </View>

  //     <TouchableOpacity
  //       style={styles.checkoutBtn}
  //       onPress={() => router.push("/checkout")}
  //     >
  //       <Text style={styles.checkoutText}>Proceed to Checkout</Text>
  //     </TouchableOpacity>
  //   </SafeAreaView>
  // );
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
    textAlign: "center",
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
