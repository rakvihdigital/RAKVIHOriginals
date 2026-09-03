"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import { supabase } from "@/lib/supabase";

import {
  StoreProduct,
  ProductVariant,
} from "@/lib/fetchProducts";

/* =====================================================
   TYPES
===================================================== */

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
  phone?: string | null;
  is_blocked?: boolean;
  created_at?: string;
  last_sign_in_at?: string | null;
}

interface AuthResult {
  success: boolean;
  error?: string;
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

  login: (
    email: string,
    password: string
  ) => Promise<AuthResult>;

  register: (
    name: string,
    email: string,
    password: string,
    phone?: string
  ) => Promise<AuthResult>;

  logout: () => Promise<void>;

  addToCart: (
    product: StoreProduct,
    variant?: ProductVariant,
    quantity?: number
  ) => boolean;

  removeFromCart: (
    productId: number | string,
    variantId?: number | string
  ) => void;

  updateCartQuantity: (
    productId: number | string,
    quantity: number,
    variantId?: number | string
  ) => void;

  clearCart: () => void;

  toggleWishlist: (
    product: StoreProduct
  ) => boolean;

  isInWishlist: (
    productId: number | string
  ) => boolean;
}

/* =====================================================
   CONTEXT
===================================================== */

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

/* =====================================================
   STORAGE KEYS
===================================================== */

const CART_STORAGE_KEY = "rakvih_user_cart_v1";
const WISHLIST_STORAGE_KEY = "rakvih_user_wishlist_v1";

/* =====================================================
   PROVIDER
===================================================== */

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any | null>(null);

  const [customer, setCustomer] =
    useState<CustomerProfile | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [cart, setCart] = useState<CartItem[]>([]);

  const [wishlist, setWishlist] =
    useState<StoreProduct[]>([]);

  /* =====================================================
     LOAD CUSTOMER PROFILE
  ===================================================== */

  const loadCustomerProfile = useCallback(
    async (
      authUser: any
    ): Promise<CustomerProfile | null> => {
      if (!authUser?.id) {
        return null;
      }

      try {
        const { data, error } = await supabase
          .from("customers")
          .select("*")
          .eq("auth_user_id", authUser.id)
          .maybeSingle();

        if (error) {
          console.error(
            "Customer profile load error:",
            error.message
          );
        }

        if (data) {
          setCustomer(data);

          return data;
        }

        /*
          Customer profile doesn't exist.

          Create it automatically.
        */

        const fallbackCustomer = {
          auth_user_id: authUser.id,

          name:
            authUser.user_metadata?.full_name ||
            authUser.email?.split("@")[0] ||
            "Customer",

          email: authUser.email || "",

          phone:
            authUser.user_metadata?.phone ||
            null,

          is_blocked: false,

          last_sign_in_at:
            new Date().toISOString(),
        };

        const {
          data: createdCustomer,
          error: createError,
        } = await supabase
          .from("customers")
          .upsert(
            fallbackCustomer,
            {
              onConflict: "auth_user_id",
            }
          )
          .select()
          .single();

        if (createError) {
          console.error(
            "Customer creation error:",
            createError.message
          );

          return null;
        }

        setCustomer(createdCustomer);

        return createdCustomer;
      } catch (error) {
        console.error(
          "Unexpected customer profile error:",
          error
        );

        return null;
      }
    },
    []
  );

  /* =====================================================
     INITIAL AUTH CHECK
  ===================================================== */

  useEffect(() => {
    let mounted = true;

    async function initializeAuth() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (mounted && session?.user) {
          setUser(session.user);

          await loadCustomerProfile(
            session.user
          );
        }
      } catch (error) {
        console.error(
          "Auth initialization error:",
          error
        );
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setUser(session.user);

          await loadCustomerProfile(
            session.user
          );
        } else {
          setUser(null);
          setCustomer(null);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadCustomerProfile]);

  /* =====================================================
     LOAD LOCAL CART + WISHLIST
  ===================================================== */

  useEffect(() => {
    try {
      const savedCart =
        localStorage.getItem(CART_STORAGE_KEY);

      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }

      const savedWishlist =
        localStorage.getItem(
          WISHLIST_STORAGE_KEY
        );

      if (savedWishlist) {
        setWishlist(
          JSON.parse(savedWishlist)
        );
      }
    } catch (error) {
      console.error(
        "Storage loading error:",
        error
      );
    }
  }, []);

  /* =====================================================
     SAVE CART
  ===================================================== */

  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart)
      );
    } catch {
      // Ignore storage errors
    }
  }, [cart]);

  /* =====================================================
     SAVE WISHLIST
  ===================================================== */

  useEffect(() => {
    try {
      localStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(wishlist)
      );
    } catch {
      // Ignore storage errors
    }
  }, [wishlist]);

  /* =====================================================
     LOGIN
  ===================================================== */

  async function login(
    email: string,
    password: string
  ): Promise<AuthResult> {
    try {
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        });

      if (error) {
        return {
          success: false,
          error: error.message,
        };
      }

      if (!data.user) {
        return {
          success: false,
          error: "Login failed.",
        };
      }

      const customerProfile =
        await loadCustomerProfile(data.user);

      /*
        CHECK IF BLOCKED
      */

      if (customerProfile?.is_blocked) {
        await supabase.auth.signOut();

        setUser(null);
        setCustomer(null);

        return {
          success: false,
          error:
            "Your account has been blocked. Please contact support.",
        };
      }

      /*
        UPDATE LAST LOGIN
      */

      await supabase
        .from("customers")
        .update({
          last_sign_in_at:
            new Date().toISOString(),
        })
        .eq(
          "auth_user_id",
          data.user.id
        );

      setUser(data.user);

      return {
        success: true,
      };
    } catch (error: any) {
      return {
        success: false,
        error:
          error?.message ||
          "An unexpected error occurred.",
      };
    }
  }

  /* =====================================================
     REGISTER
  ===================================================== */

  async function register(
    name: string,
    email: string,
    password: string,
    phone?: string
  ): Promise<AuthResult> {
    try {
      const normalizedEmail =
        email.trim().toLowerCase();

      /*
        CREATE AUTH USER
      */

      const {
        data,
        error,
      } = await supabase.auth.signUp({
        email: normalizedEmail,

        password,

        options: {
          data: {
            full_name: name.trim(),
            phone: phone?.trim() || "",
          },
        },
      });

      if (error) {
        return {
          success: false,
          error: error.message,
        };
      }

      if (!data.user) {
        return {
          success: false,
          error:
            "Account creation failed.",
        };
      }

      /*
        CREATE CUSTOMER TABLE RECORD
      */

      const customerData = {
        auth_user_id: data.user.id,

        name: name.trim(),

        email: normalizedEmail,

        phone:
          phone?.trim() || null,

        is_blocked: false,

        last_sign_in_at:
          new Date().toISOString(),
      };

      const {
        data: insertedCustomer,
        error: customerError,
      } = await supabase
        .from("customers")
        .upsert(
          customerData,
          {
            onConflict:
              "auth_user_id",
          }
        )
        .select()
        .single();

      if (customerError) {
        console.error(
          "Customer insert error:",
          customerError.message
        );

        return {
          success: false,
          error:
            "Account was created, but customer details could not be saved. Please contact support.",
        };
      }

      setUser(data.user);

      setCustomer(
        insertedCustomer
      );

      return {
        success: true,
      };
    } catch (error: any) {
      return {
        success: false,
        error:
          error?.message ||
          "An unexpected error occurred.",
      };
    }
  }

  /* =====================================================
     LOGOUT
  ===================================================== */

  async function logout(): Promise<void> {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );
    } finally {
      setUser(null);
      setCustomer(null);
    }
  }

  /* =====================================================
     ADD TO CART
  ===================================================== */

  function addToCart(
    product: StoreProduct,
    variant?: ProductVariant,
    quantity: number = 1
  ): boolean {
    if (!user) {
      return false;
    }

    const effectiveVariant =
      variant ||
      (
        product.variants &&
        product.variants.length > 0
          ? product.variants[0]
          : undefined
      );

    const variantId =
      effectiveVariant?.id;

    setCart((previous) => {
      const existingIndex =
        previous.findIndex(
          (item) =>
            item.product.id ===
              product.id &&
            (
              (
                !variantId &&
                !item.variant?.id
              ) ||
              item.variant?.id ===
                variantId
            )
        );

      if (existingIndex > -1) {
        return previous.map(
          (item, index) => {
            if (
              index ===
              existingIndex
            ) {
              return {
                ...item,
                quantity:
                  item.quantity +
                  quantity,
              };
            }

            return item;
          }
        );
      }

      return [
        ...previous,
        {
          product,
          variant:
            effectiveVariant,
          quantity,
        },
      ];
    });

    return true;
  }

  /* =====================================================
     REMOVE FROM CART
  ===================================================== */

  function removeFromCart(
    productId: number | string,
    variantId?: number | string
  ) {
    setCart((previous) =>
      previous.filter(
        (item) =>
          !(
            item.product.id ===
              productId &&
            (
              variantId === undefined ||
              item.variant?.id ===
                variantId
            )
          )
      )
    );
  }

  /* =====================================================
     UPDATE CART QUANTITY
  ===================================================== */

  function updateCartQuantity(
    productId: number | string,
    quantity: number,
    variantId?: number | string
  ) {
    if (quantity <= 0) {
      removeFromCart(
        productId,
        variantId
      );

      return;
    }

    setCart((previous) =>
      previous.map((item) => {
        if (
          item.product.id ===
            productId &&
          (
            variantId === undefined ||
            item.variant?.id ===
              variantId
          )
        ) {
          return {
            ...item,
            quantity,
          };
        }

        return item;
      })
    );
  }

  /* =====================================================
     CLEAR CART
  ===================================================== */

  function clearCart() {
    setCart([]);
  }

  /* =====================================================
     TOGGLE WISHLIST
  ===================================================== */

  function toggleWishlist(
    product: StoreProduct
  ): boolean {
    if (!user) {
      return false;
    }

    setWishlist((previous) => {
      const exists =
        previous.some(
          (item) =>
            item.id ===
            product.id
        );

      if (exists) {
        return previous.filter(
          (item) =>
            item.id !==
            product.id
        );
      }

      return [
        ...previous,
        product,
      ];
    });

    return true;
  }

  /* =====================================================
     CHECK WISHLIST
  ===================================================== */

  function isInWishlist(
    productId: number | string
  ): boolean {
    return wishlist.some(
      (item) =>
        item.id === productId
    );
  }

  /* =====================================================
     COUNTS
  ===================================================== */

  const cartCount =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  const wishlistCount =
    wishlist.length;

  const cartSubtotal =
    cart.reduce(
      (total, item) => {
        const itemPrice =
          item.variant?.salePrice ||
          item.variant?.price ||
          item.product.priceValue ||
          0;

        return (
          total +
          itemPrice *
            item.quantity
        );
      },
      0
    );

  /* =====================================================
     PROVIDER
  ===================================================== */

  return (
    <AuthContext.Provider
      value={{
        user,
        customer,

        isAuthenticated:
          Boolean(user),

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

/* =====================================================
   AUTH HOOK
===================================================== */

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
}