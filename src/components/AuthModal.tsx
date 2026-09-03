"use client";

import React, {
  useState,
  useEffect,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


/* =====================================================
   TYPES
===================================================== */

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectUrl?: string;
  defaultTab?: "signin" | "signup";
}


/* =====================================================
   AUTH MODAL
===================================================== */

export default function AuthModal({
  isOpen,
  onClose,
  redirectUrl,
  defaultTab = "signin",
}: AuthModalProps) {

  const router = useRouter();

  const {
    login,
    register,
    isAuthenticated,
    user,
    customer,
    logout,
  } = useAuth();


  /* =====================================================
     STATE
  ===================================================== */

  const [activeTab, setActiveTab] =
    useState<"signin" | "signup">(defaultTab);

  const [errorMsg, setErrorMsg] =
    useState<string | null>(null);

  const [successMsg, setSuccessMsg] =
    useState<string | null>(null);

  const [isLoading, setIsLoading] =
    useState(false);


  /* =====================================================
     SIGN IN STATE
  ===================================================== */

  const [signInEmail, setSignInEmail] =
    useState("");

  const [signInPassword, setSignInPassword] =
    useState("");


  /* =====================================================
     SIGN UP STATE
  ===================================================== */

  const [signUpName, setSignUpName] =
    useState("");

  const [signUpEmail, setSignUpEmail] =
    useState("");

  const [signUpPhone, setSignUpPhone] =
    useState("");

  const [signUpPassword, setSignUpPassword] =
    useState("");

  const [signUpConfirm, setSignUpConfirm] =
    useState("");


  /* =====================================================
     RESET FORM
  ===================================================== */

  const resetForm = useCallback(() => {

    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(false);

    setSignInEmail("");
    setSignInPassword("");

    setSignUpName("");
    setSignUpEmail("");
    setSignUpPhone("");
    setSignUpPassword("");
    setSignUpConfirm("");

  }, []);


  /* =====================================================
     CLOSE MODAL
  ===================================================== */

  const handleClose = useCallback(() => {

    resetForm();

    setActiveTab(defaultTab);

    onClose();

  }, [
    resetForm,
    defaultTab,
    onClose,
  ]);


  /* =====================================================
     UPDATE TAB WHEN MODAL OPENS
  ===================================================== */

  useEffect(() => {

    if (isOpen) {

      setActiveTab(defaultTab);

      setErrorMsg(null);

      setSuccessMsg(null);

    }

  }, [
    isOpen,
    defaultTab,
  ]);


  /* =====================================================
     ESCAPE + BODY SCROLL LOCK
  ===================================================== */

  useEffect(() => {

    if (!isOpen) return;

    const handleKeyDown =
      (event: KeyboardEvent) => {

        if (event.key === "Escape") {

          handleClose();

        }

      };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";


    return () => {

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow =
        previousOverflow;

    };

  }, [
    isOpen,
    handleClose,
  ]);


  /* =====================================================
     SIGN IN
  ===================================================== */

  const handleSignIn =
    async (
      event: React.FormEvent
    ) => {

      event.preventDefault();

      setErrorMsg(null);

      setSuccessMsg(null);

      setIsLoading(true);


      try {

        const result =
          await login(
            signInEmail,
            signInPassword
          );


        if (!result.success) {

          setErrorMsg(
            result.error ||
              "Invalid credentials. Please check your email and password."
          );

          return;

        }


        setSuccessMsg(
          "Successfully signed in!"
        );


        setTimeout(() => {

          resetForm();

          onClose();

          if (redirectUrl) {

            router.push(
              redirectUrl
            );

          }

        }, 500);

      } catch (error: any) {

        setErrorMsg(
          error?.message ||
            "Unable to sign in. Please try again."
        );

      } finally {

        setIsLoading(false);

      }

    };


  /* =====================================================
     SIGN UP
  ===================================================== */

  const handleSignUp =
    async (
      event: React.FormEvent
    ) => {

      event.preventDefault();

      setErrorMsg(null);

      setSuccessMsg(null);


      /* PASSWORD MATCH */

      if (
        signUpPassword !==
        signUpConfirm
      ) {

        setErrorMsg(
          "Passwords do not match. Please re-enter."
        );

        return;

      }


      /* PASSWORD LENGTH */

      if (
        signUpPassword.length < 6
      ) {

        setErrorMsg(
          "Password must be at least 6 characters long."
        );

        return;

      }


      /* NAME */

      if (
        !signUpName.trim()
      ) {

        setErrorMsg(
          "Please enter your full name."
        );

        return;

      }


      setIsLoading(true);


      try {

        const result =
          await register(
            signUpName.trim(),
            signUpEmail.trim(),
            signUpPassword,
            signUpPhone.trim()
          );


        if (!result.success) {

          setErrorMsg(
            result.error ||
              "Could not create account. Please try again."
          );

          return;

        }


        setSuccessMsg(
          "Account created successfully! Welcome to RAKVIH Originals."
        );


        setTimeout(() => {

          resetForm();

          onClose();


          if (redirectUrl) {

            router.push(
              redirectUrl
            );

          }

        }, 1200);

      } catch (error: any) {

        setErrorMsg(
          error?.message ||
            "Unable to create account. Please try again."
        );

      } finally {

        setIsLoading(false);

      }

    };


  /* =====================================================
     DON'T RENDER
  ===================================================== */

  if (!isOpen) {

    return null;

  }


  /* =====================================================
     RENDER
  ===================================================== */

  return createPortal((

    <div
      role="dialog"
      aria-modal="true"
      aria-label={
        activeTab === "signin"
          ? "Sign in"
          : "Create account"
      }

      onMouseDown={(event) => {

        if (
          event.target ===
          event.currentTarget
        ) {

          handleClose();

        }

      }}

      style={{

        position: "fixed",

        inset: 0,

        zIndex: 1000,

        background:
          "rgba(6, 5, 3, 0.72)",

        backdropFilter:
          "blur(6px)",

        display: "flex",

        alignItems:
          "center",

        justifyContent:
          "center",

        padding:
          "1rem",

      }}
    >


      {/* MODAL CARD */}

      <div
        className="auth-card-wrap"

        style={{

          position:
            "relative",

          width:
            "100%",

          maxWidth:
            "480px",

          maxHeight:
            "88vh",

          display:
            "flex",

          flexDirection:
            "column",

          background:
            "#0c0a06",

          border:
            "1px solid rgba(255, 255, 255, 0.12)",

          borderRadius:
            "24px",

          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.7)",

          overflow:
            "hidden",

        }}
      >


        {/* CLOSE BUTTON */}

        <button
          type="button"

          onClick={
            handleClose
          }

          aria-label="Close"

          style={{

            position:
              "absolute",

            top:
              "1rem",

            right:
              "1rem",

            width:
              "36px",

            height:
              "36px",

            borderRadius:
              "50%",

            border:
              "1px solid rgba(255, 255, 255, 0.15)",

            background:
              "rgba(255, 255, 255, 0.05)",

            color:
              "rgba(255, 255, 255, 0.7)",

            fontSize:
              "1.1rem",

            lineHeight:
              1,

            cursor:
              "pointer",

            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            zIndex:
              10,

          }}
        >
          ×
        </button>


        {/* CONTENT */}

        <div
          style={{

            overflowY:
              "auto",

            padding:
              "1.5rem 1.75rem",

            display:
              "flex",

            flexDirection:
              "column",

          }}
        >


          {/* =====================================================
              AUTHENTICATED VIEW
          ===================================================== */}

          {isAuthenticated && user ? (

            <div
              style={{

                textAlign:
                  "center",

                padding:
                  "1rem 0",

              }}
            >


              <span
                className="brand-gold-badge"

                style={{

                  marginBottom:
                    "1rem",

                  display:
                    "inline-block",

                }}
              >
                VIP Member Authenticated
              </span>


              <h2
                style={{

                  fontFamily:
                    "var(--font-display)",

                  fontSize:
                    "1.8rem",

                  color:
                    "#ffffff",

                  margin:
                    "0 0 0.5rem",

                }}
              >

                Welcome back,{" "}

                {
                  customer?.name ||
                  user?.user_metadata
                    ?.full_name ||
                  user?.email
                    ?.split("@")[0] ||
                  "VIP Member"
                }

              </h2>


              <p
                style={{

                  color:
                    "rgba(255, 255, 255, 0.6)",

                  margin:
                    "0 0 1.5rem",

                  fontSize:
                    "0.9rem",

                }}
              >

                You have full access to your saved wishlist,
                private salon appointments, and shopping bag.

              </p>


              <div
                style={{

                  display:
                    "flex",

                  gap:
                    "1rem",

                  justifyContent:
                    "center",

                  flexWrap:
                    "wrap",

                }}
              >


                <button
                  type="button"

                  onClick={
                    handleClose
                  }

                  className="hero-cta-pill"
                >
                  Continue Shopping
                </button>


                <button
                  type="button"

                  onClick={async () => {

                    await logout();

                    handleClose();

                  }}

                  style={{

                    background:
                      "rgba(255, 255, 255, 0.05)",

                    border:
                      "1px solid rgba(255, 255, 255, 0.2)",

                    color:
                      "#ffffff",

                    padding:
                      "0.85rem 1.75rem",

                    borderRadius:
                      "999px",

                    cursor:
                      "pointer",

                    fontFamily:
                      "var(--font-heading)",

                    fontSize:
                      "0.75rem",

                    fontWeight:
                      700,

                    letterSpacing:
                      "0.15em",

                    textTransform:
                      "uppercase",

                  }}
                >
                  Sign Out
                </button>


              </div>

            </div>


          ) : (


            /* =====================================================
                LOGIN / REGISTER VIEW
            ===================================================== */

            <div>


              {/* HEADER */}

              <div
                style={{

                  textAlign:
                    "center",

                  marginBottom:
                    "1.1rem",

                  marginTop:
                    0,

                }}
              >


                <span
                  className="brand-gold-badge"

                  style={{

                    marginBottom:
                      "0.5rem",

                    display:
                      "inline-block",

                  }}
                >
                  Maison Privé Access
                </span>


                <h1
                  style={{

                    fontFamily:
                      "var(--font-display)",

                    fontSize:
                      "1.6rem",

                    color:
                      "#ffffff",

                    margin:
                      "0 0 0.3rem",

                  }}
                >

                  {
                    activeTab === "signin"
                      ? "Sign In To Your Vault"
                      : "Create VIP Membership"
                  }

                </h1>


                <p
                  style={{

                    color:
                      "rgba(255, 255, 255, 0.6)",

                    fontSize:
                      "0.82rem",

                    margin:
                      0,

                  }}
                >

                  Access exclusive drops, save your bespoke wishlist,
                  and enjoy private concierge checkout.

                </p>


              </div>


              {/* TABS */}

              <div
                style={{

                  display:
                    "grid",

                  gridTemplateColumns:
                    "1fr 1fr",

                  gap:
                    "6px",

                  background:
                    "rgba(255, 255, 255, 0.04)",

                  padding:
                    "4px",

                  borderRadius:
                    "999px",

                  marginBottom:
                    "1rem",

                  border:
                    "1px solid rgba(255, 255, 255, 0.08)",

                }}
              >


                {/* SIGN IN TAB */}

                <button
                  type="button"

                  onClick={() => {

                    setActiveTab(
                      "signin"
                    );

                    setErrorMsg(
                      null
                    );

                    setSuccessMsg(
                      null
                    );

                  }}

                  style={{

                    background:
                      activeTab === "signin"
                        ? "var(--color-gold)"
                        : "transparent",

                    color:
                      activeTab === "signin"
                        ? "#0c0a06"
                        : "rgba(255, 255, 255, 0.7)",

                    border:
                      "none",

                    padding:
                      "0.5rem",

                    borderRadius:
                      "999px",

                    fontFamily:
                      "var(--font-heading)",

                    fontSize:
                      "0.72rem",

                    fontWeight:
                      800,

                    letterSpacing:
                      "0.15em",

                    textTransform:
                      "uppercase",

                    cursor:
                      "pointer",

                  }}
                >
                  Sign In
                </button>


                {/* CREATE ACCOUNT TAB */}

                <button
                  type="button"

                  onClick={() => {

                    setActiveTab(
                      "signup"
                    );

                    setErrorMsg(
                      null
                    );

                    setSuccessMsg(
                      null
                    );

                  }}

                  style={{

                    background:
                      activeTab === "signup"
                        ? "var(--color-gold)"
                        : "transparent",

                    color:
                      activeTab === "signup"
                        ? "#0c0a06"
                        : "rgba(255, 255, 255, 0.7)",

                    border:
                      "none",

                    padding:
                      "0.5rem",

                    borderRadius:
                      "999px",

                    fontFamily:
                      "var(--font-heading)",

                    fontSize:
                      "0.72rem",

                    fontWeight:
                      800,

                    letterSpacing:
                      "0.15em",

                    textTransform:
                      "uppercase",

                    cursor:
                      "pointer",

                  }}
                >
                  Create Account
                </button>


              </div>


              {/* ERROR MESSAGE */}

              {errorMsg && (

                <div
                  style={{

                    background:
                      "rgba(231, 76, 60, 0.15)",

                    border:
                      "1px solid rgba(231, 76, 60, 0.4)",

                    color:
                      "#e74c3c",

                    padding:
                      "0.7rem 1rem",

                    borderRadius:
                      "10px",

                    marginBottom:
                      "1rem",

                    fontSize:
                      "0.82rem",

                  }}
                >
                  {errorMsg}
                </div>

              )}


              {/* SUCCESS MESSAGE */}

              {successMsg && (

                <div
                  style={{

                    background:
                      "rgba(46, 204, 113, 0.15)",

                    border:
                      "1px solid rgba(46, 204, 113, 0.4)",

                    color:
                      "#2ecc71",

                    padding:
                      "0.7rem 1rem",

                    borderRadius:
                      "10px",

                    marginBottom:
                      "1rem",

                    fontSize:
                      "0.82rem",

                  }}
                >
                  {successMsg}
                </div>

              )}


              {/* =====================================================
                  SIGN IN FORM
              ===================================================== */}

              {activeTab === "signin" ? (


                <form
                  onSubmit={
                    handleSignIn
                  }

                  style={{

                    display:
                      "flex",

                    flexDirection:
                      "column",

                    gap:
                      "0.85rem",

                  }}
                >


                  <Field
                    label="Email Address"
                  >

                    <input
                      type="email"

                      required

                      autoComplete="email"

                      value={
                        signInEmail
                      }

                      onChange={(event) =>
                        setSignInEmail(
                          event.target.value
                        )
                      }

                      placeholder="name@example.com"

                      className="filter-input-glass"

                      style={{

                        width:
                          "100%",

                        borderRadius:
                          "10px",

                        padding:
                          "0.7rem 1rem",

                      }}
                    />

                  </Field>


                  <Field
                    label="Password"
                  >

                    <input
                      type="password"

                      required

                      autoComplete="current-password"

                      value={
                        signInPassword
                      }

                      onChange={(event) =>
                        setSignInPassword(
                          event.target.value
                        )
                      }

                      placeholder="••••••••••••"

                      className="filter-input-glass"

                      style={{

                        width:
                          "100%",

                        borderRadius:
                          "10px",

                        padding:
                          "0.7rem 1rem",

                      }}
                    />

                  </Field>


                  <button
                    type="submit"

                    disabled={
                      isLoading
                    }

                    className="hero-cta-pill"

                    style={{

                      marginTop:
                        "0.2rem",

                      width:
                        "100%",

                      padding:
                        "0.85rem",

                      cursor:
                        isLoading
                          ? "not-allowed"
                          : "pointer",

                      opacity:
                        isLoading
                          ? 0.7
                          : 1,

                    }}
                  >

                    {
                      isLoading
                        ? "Authenticating..."
                        : "Sign In to VIP Vault"
                    }

                  </button>


                </form>


              ) : (


                /* =====================================================
                    SIGN UP FORM
                ===================================================== */

                <form
                  onSubmit={
                    handleSignUp
                  }

                  style={{

                    display:
                      "flex",

                    flexDirection:
                      "column",

                    gap:
                      "0.75rem",

                  }}
                >


                  <Field
                    label="Full Name"
                  >

                    <input
                      type="text"

                      required

                      autoComplete="name"

                      value={
                        signUpName
                      }

                      onChange={(event) =>
                        setSignUpName(
                          event.target.value
                        )
                      }

                      placeholder="e.g. Devendra Verma"

                      className="filter-input-glass"

                      style={{

                        width:
                          "100%",

                        borderRadius:
                          "10px",

                        padding:
                          "0.65rem 1rem",

                      }}
                    />

                  </Field>


                  <Field
                    label="Email Address"
                  >

                    <input
                      type="email"

                      required

                      autoComplete="email"

                      value={
                        signUpEmail
                      }

                      onChange={(event) =>
                        setSignUpEmail(
                          event.target.value
                        )
                      }

                      placeholder="name@example.com"

                      className="filter-input-glass"

                      style={{

                        width:
                          "100%",

                        borderRadius:
                          "10px",

                        padding:
                          "0.65rem 1rem",

                      }}
                    />

                  </Field>


                  <Field
                    label="Phone (Optional)"
                  >

                    <input
                      type="tel"

                      autoComplete="tel"

                      value={
                        signUpPhone
                      }

                      onChange={(event) =>
                        setSignUpPhone(
                          event.target.value
                        )
                      }

                      placeholder="+91 98200 00000"

                      className="filter-input-glass"

                      style={{

                        width:
                          "100%",

                        borderRadius:
                          "10px",

                        padding:
                          "0.65rem 1rem",

                      }}
                    />

                  </Field>


                  <Field
                    label="Password"
                  >

                    <input
                      type="password"

                      required

                      autoComplete="new-password"

                      value={
                        signUpPassword
                      }

                      onChange={(event) =>
                        setSignUpPassword(
                          event.target.value
                        )
                      }

                      placeholder="Minimum 6 characters"

                      className="filter-input-glass"

                      style={{

                        width:
                          "100%",

                        borderRadius:
                          "10px",

                        padding:
                          "0.65rem 1rem",

                      }}
                    />

                  </Field>


                  <Field
                    label="Confirm Password"
                  >

                    <input
                      type="password"

                      required

                      autoComplete="new-password"

                      value={
                        signUpConfirm
                      }

                      onChange={(event) =>
                        setSignUpConfirm(
                          event.target.value
                        )
                      }

                      placeholder="Re-enter password"

                      className="filter-input-glass"

                      style={{

                        width:
                          "100%",

                        borderRadius:
                          "10px",

                        padding:
                          "0.65rem 1rem",

                      }}
                    />

                  </Field>


                  <button
                    type="submit"

                    disabled={
                      isLoading
                    }

                    className="hero-cta-pill"

                    style={{

                      marginTop:
                        "0.2rem",

                      width:
                        "100%",

                      padding:
                        "0.85rem",

                      cursor:
                        isLoading
                          ? "not-allowed"
                          : "pointer",

                      opacity:
                        isLoading
                          ? 0.7
                          : 1,

                    }}
                  >

                    {
                      isLoading
                        ? "Creating Account..."
                        : "Create VIP Account"
                    }

                  </button>


                </form>

              )}


              {/* SUPPORT SECTION REMOVED */}

            </div>

          )}

        </div>

      </div>

    </div>

  ), document.body);

}


/* =====================================================
   FIELD COMPONENT
===================================================== */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {

  return (

    <div>

      <label
        style={{

          display:
            "block",

          fontSize:
            "0.68rem",

          fontFamily:
            "var(--font-heading)",

          letterSpacing:
            "0.15em",

          textTransform:
            "uppercase",

          color:
            "var(--color-gold)",

          marginBottom:
            "0.3rem",

          fontWeight:
            700,

        }}
      >

        {label}

      </label>

      {children}

    </div>

  );

}