import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CheckoutScreen() {
    const [cartItems, setCartItems] = useState([]);
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const insets = useSafeAreaInsets();

    useFocusEffect(
        React.useCallback(() => {
            // Load cart items from AsyncStorage when the screen is focused
            const loadCart = async () => {
                try {
                    const value = await AsyncStorage.getItem('cart');
                    if (value) {
                        setCartItems(JSON.parse(value));
                    }
                } catch (e) {
                    console.error('Failed to load cart items', e);
                }
            };

            loadCart();
        }, [])
    );

    const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const tax = 4.95;
    const total = subtotal + tax - discount;

    const applyPromo = () => {
        if (promoCode === 'SAVE100') {
            setDiscount(subtotal * 1);
        } else {
            Alert.alert('Invalid Promo Code', 'The promo code you entered is either invalid or expired. Please try again.');
        }
    };

    return (
        <SafeAreaView style={[styles.container, { paddingBottom: -insets.bottom }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Checkout</Text>
                    <Text style={styles.itemCount}>{cartItems.length} items</Text>
                </View>

                {/* Cart Items */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    <FlatList
                        scrollEnabled={false}
                        data={cartItems}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => (
                            <View style={styles.cartItem}>
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemTitle}>{item.title}</Text>
                                    <Text style={styles.itemAuthor}>{item.type}</Text>
                                    <Text style={styles.itemPrice}>₹{item.price.toFixed(2)}</Text>
                                </View>
                            </View>
                        )}
                    />
                </View>

                {/* Promo Code */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Promo Code</Text>
                    <View style={styles.promoContainer}>
                        <TextInput
                            style={styles.promoInput}
                            placeholder="Enter promo code"
                            placeholderTextColor="#999"
                            value={promoCode}
                            onChangeText={setPromoCode}
                        />
                        <TouchableOpacity style={styles.promoButton} onPress={applyPromo}>
                            <Text style={styles.promoButtonText}>Apply</Text>
                        </TouchableOpacity>
                    </View>

                    {/* feature to remove the discount */}
                    {discount > 0 && (
                        <TouchableOpacity onPress={() => setDiscount(0)}>
                            <Text style={styles.removeDiscountText}>Remove Discount</Text>
                        </TouchableOpacity>
                    )}
                    {discount > 0 && (
                        <Text style={styles.discountText}>✓ {parseInt((discount/subtotal)*100)}% Discount applied: - ₹{discount.toFixed(2)}</Text>
                    )}
                </View>

                {/* Shipping Address */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Shipping Address</Text>
                    <View style={styles.addressBox}>
                        <Text style={styles.addressText}>John Doe</Text>
                        <Text style={styles.addressText}>123 Main Street</Text>
                        <Text style={styles.addressText}>New York, NY 10001</Text>
                    </View>
                    <TouchableOpacity style={styles.changeLink}>
                        <Text style={styles.changeLinkText}>Change Address</Text>
                    </TouchableOpacity>
                </View>

                {/* Payment Method */}
                <View style={styles.section}>
                    <TouchableOpacity onPress={() => {
                        var options = {
                            description: 'Credits towards consultation',
                            image: 'https://i.imgur.com/3g7nmJC.png',
                            currency: 'INR',
                            key: '', // Your api key
                            amount: '5000',
                            name: 'foo',
                            prefill: {
                                email: 'void@razorpay.com',
                                contact: '9191919191',
                                name: 'Razorpay Software'
                            },
                            theme: { color: '#F37254' }
                        }
                        RazorpayCheckout.open(options).then((data) => {
                            // handle success
                            alert(`Success: ${data.razorpay_payment_id}`);
                        }).catch((error) => {
                            // handle failure
                            alert(`Error: ${error} | ${error.description}`);
                        });
                    }}>
                        <Text style={styles.paymentText}>Pay with Razorpay</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.changeLink} onPress={() => Alert.alert("ho")}>
                        <Text style={styles.changeLinkText}>Change Payment Method</Text>
                    </TouchableOpacity>
                </View>

                {/* Price Breakdown */}
                <View style={styles.section}>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Subtotal</Text>
                        <Text style={styles.priceValue}>₹{subtotal.toFixed(2)}</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Delivery Fee</Text>
                        <Text style={styles.priceValue}>₹{tax.toFixed(2)}</Text>
                    </View>
                    {discount > 0 && (
                        <View style={styles.priceRow}>
                            <Text style={styles.priceLabel}>Discount</Text>
                            <Text style={[styles.priceValue, { color: '#34C759' }]}>-₹{discount.toFixed(2)}</Text>
                        </View>
                    )}
                    <View style={styles.divider} />
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>₹{total.toFixed(2)}</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Checkout Button */}
            <TouchableOpacity style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>Complete Purchase</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
    },
    itemCount: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    section: {
        marginHorizontal: 16,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 12,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
    },
    itemInfo: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    itemAuthor: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: '600',
        color: '#007AFF',
        marginTop: 4,
    },
    promoContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    promoInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E5E5EA',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        color: '#000',
    },
    promoButton: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        paddingHorizontal: 16,
        justifyContent: 'center',
    },
    promoButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    discountText: {
        color: '#34C759',
        fontSize: 12,
        marginTop: 8,
        fontWeight: '500',
    },
    removeDiscountText: {
        color: '#FF3B30',
        fontSize: 12,
        marginTop: 8,
        fontWeight: '500',
    },
    addressBox: {
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
    },
    addressText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
    paymentBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
    },
    paymentText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    changeLink: {
        paddingVertical: 4,
    },
    changeLinkText: {
        fontSize: 14,
        color: '#007AFF',
        fontWeight: '600',
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    priceLabel: {
        fontSize: 14,
        color: '#666',
    },
    priceValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E5EA',
        marginVertical: 12,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
    totalValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#007AFF',
    },
    checkoutButton: {
        marginHorizontal: 16,
        marginVertical: 16,
        backgroundColor: '#007AFF',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});