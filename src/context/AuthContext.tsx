"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { StoreProduct, ProductVariant } from "@/lib/fetchProducts";

export interface CartItem {
  product: StoreProduct;
  variant?: ProductVariant;
  quantity: number;
}

export interface CustomerProfile {
  id?: number | string;
  auth_user_id?: string;
  name: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  user: any | null;
  customer: CustomerProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  cart: CartItem[];
  wishlist: StoreProduct[];
  cartCount: number;
  wishlistCount: number;
  cartSubtotal: number;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  addToCart: (product: StoreProduct, variant?: ProductVariant, quantity?: number) => boolean;
  removeFromCart: (productId: number | string, variantId?: number | string) => void;
  updateCartQuantity: (productId: number | string, quantity: number, variantId?: number | string) => void;
  clearCart: () => void;
  toggleWishlist: (product: StoreProduct) => boolean;
  isInWishlist: (productId: number | string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CART_STORAGE_KEY = "rakvih_user_cart_v1";
const WISHLIST_STORAGE_KEY = "rakvih_user_wishlist_v1";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [customer, setCustomer] = useState<CustomerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<StoreProduct[]>([]);

  // 1. Listen to Supabase Auth State
  useEffect(() => {
    async function initAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          await loadCustomerProfile(session.user);
        }
      } catch (err) {
        console.error("Error checking session:", err);
      } finally {
        setIsLoading(false);
      }
    }

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          await loadCustomerProfile(session.user);
        } else {
          setUser(null);
          setCustomer(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 2. Load Cart & Wishlist from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch {
      // ignore JSON parse error
    }
  }, []);

  // 3. Save Cart & Wishlist on change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Load customer profile row from DB
  async function loadCustomerProfile(authUser: any) {
    try {
      const { data } = await supabase
        .from("customers")
        .select("*")
        .eq("auth_user_id", authUser.id)
        .single();

      if (data) {
        setCustomer(data);
      } else {
        // Fallback to user metadata
        setCustomer({
          name: authUser.user_metadata?.full_name || authUser.email?.split("@")[0] || "VIP Member",
          email: authUser.email || "",
          phone: authUser.user_metadata?.phone || "",
        });
      }
    } catch {
      setCustomer({
        name: authUser.email?.split("@")[0] || "VIP Member",
        email: authUser.email || "",
      });
    }
  }

  // Login
  async function login(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        setUser(data.user);
        await loadCustomerProfile(data.user);
        return { success: true };
      }

      return { success: false, error: "Login failed" };
    } catch (err: any) {
      return { success: false, error: err.message || "An unexpected error occurred" };
    }
  }

  // Register
  async function register(name: string, email: string, password: string, phone?: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            phone: phone || "",
          },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        setUser(data.user);
        // Insert record into customers table
        try {
          await supabase.from("customers").insert([
            {
              auth_user_id: data.user.id,
              name,
              email,
              phone: phone || null,
              is_blocked: false,
              created_at: new Date().toISOString(),
              last_sign_in_at: new Date().toISOString(),
            },
          ]);
        } catch (dbErr) {
          console.error("Could not insert into customers table:", dbErr);
        }

        setCustomer({ name, email, phone });
        return { success: true };
      }

      return { success: false, error: "Registration failed" };
    } catch (err: any) {
      return { success: false, error: err.message || "An unexpected error occurred" };
    }
  }

  // Logout
  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    setCustomer(null);
  }

  // Add to cart
  function addToCart(product: StoreProduct, variant?: ProductVariant, quantity: number = 1): boolean {
    if (!user) {
      return false; // Not authenticated
    }

    const effectiveVariant = variant || (product.variants && product.variants.length > 0 ? product.variants[0] : undefined);
    const variantId = effectiveVariant?.id;

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          ((!variantId && !item.variant?.id) || item.variant?.id === variantId)
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }

      return [...prev, { product, variant: effectiveVariant, quantity }];
    });

    return true;
  }

  // Remove from cart
  function removeFromCart(productId: number | string, variantId?: number | string) {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            (!variantId || item.variant?.id === variantId)
          )
      )
    );
  }

  // Update cart quantity
  function updateCartQuantity(productId: number | string, quantity: number, variantId?: number | string) {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          (!variantId || item.variant?.id === variantId)
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  }

  function clearCart() {
    setCart([]);
  }

  // Toggle wishlist
  function toggleWishlist(product: StoreProduct): boolean {
    if (!user) {
      return false; // Must login
    }

    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });

    return true;
  }

  function isInWishlist(productId: number | string): boolean {
    return wishlist.some((item) => item.id === productId);
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const cartSubtotal = cart.reduce((total, item) => {
    const itemPrice = item.variant?.salePrice || item.variant?.price || item.product.priceValue || 0;
    return total + itemPrice * item.quantity;
  }, 0);

  return (
    <AuthContext.Provider
      value={{
        user,
        customer,
        isAuthenticated: Boolean(user),
        isLoading,
        cart,
        wishlist,
        cartCount,
        wishlistCount,
        cartSubtotal,
        login,
        register,
        logout,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
