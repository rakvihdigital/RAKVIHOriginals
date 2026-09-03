"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import bcrypt from "bcryptjs";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/context/AuthContext";

/* -------------------------------------------------------------------- */
/*  Types                                                                */
/* -------------------------------------------------------------------- */

type Tab = "signin" | "signup";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Which tab to open on first render. Defaults to "signin". */
  defaultTab?: Tab;
}

/* -------------------------------------------------------------------- */
/*  Shared field label — matches the existing design language           */
/* -------------------------------------------------------------------- */

function FieldLabel({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: "0.68rem",
          fontFamily: "var(--font-heading)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--color-gold)",
          marginBottom: "0.3rem",
          fontWeight: 700,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "1px solid var(--color-gold, #C9A24A)",
  borderRadius: 0,
  padding: "0.65rem 0.8rem",
  fontSize: "0.9rem",
  fontFamily: "var(--font-body, inherit)",
  color: "inherit",
  outline: "none",
};

/* -------------------------------------------------------------------- */
/*  Component                                                            */
/* -------------------------------------------------------------------- */

export default function AuthModal({
  isOpen,
  onClose,
  defaultTab = "signin",
}: AuthModalProps) {
  // This modal manages its OWN auth against the `users` table — it's
  // intentionally not routed through AuthContext's customers-based
  // login()/register(). `setSessionUser` just mirrors the verified
  // row into shared state so the header/cart/wishlist pick it up.
  const { setSessionUser } = useAuth();

  const [tab, setTab] = useState<Tab>(defaultTab);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Keep the tab in sync if the parent re-opens the modal with a different default.
  useEffect(() => {
    if (isOpen) setTab(defaultTab);
  }, [isOpen, defaultTab]);

  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset form state whenever the modal is closed.
  useEffect(() => {
    if (!isOpen) {
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (tab === "signup") {
      if (!name.trim()) {
        setError("Please tell us your name.");
        return;
      }
      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    setLoading(true);
    const supabase = createClient();
    const normalizedEmail = email.trim().toLowerCase();

    try {
      if (tab === "signup") {
        // 1. Make sure the email isn't already taken.
        const { data: existing, error: lookupError } = await supabase
          .from("users")
          .select("id")
          .eq("email", normalizedEmail)
          .maybeSingle();

        if (lookupError) throw lookupError;
        if (existing) {
          setError("An account with this email already exists.");
          setLoading(false);
          return;
        }

        // 2. Hash the password client-side, then insert into `users`.
        const passwordHash = await bcrypt.hash(password, 10);

        const { data: inserted, error: insertError } = await supabase
          .from("users")
          .insert({
            name: name.trim(),
            email: normalizedEmail,
            password: passwordHash,
          })
          .select("id, email, name")
          .single();

        if (insertError) throw insertError;

        // 3. Sync into shared state — Header, cart and wishlist update
        //    for this user's id right away.
        setSessionUser(inserted);
        onClose();
      } else {
        // Sign in: fetch the row by email, then compare the hash locally.
        const { data: row, error: fetchError } = await supabase
          .from("users")
          .select("id, email, name, password")
          .eq("email", normalizedEmail)
          .maybeSingle();

        if (fetchError) throw fetchError;
        if (!row) {
          // If you're SURE this email was registered, this almost
          // always means Row Level Security on `users` is blocking
          // anonymous SELECT (insert works, read doesn't) — see the
          // policy note wherever this component's docs live.
          setError("No account found with that email.");
          setLoading(false);
          return;
        }

        const passwordMatches = await bcrypt.compare(password, row.password);
        if (!passwordMatches) {
          setError("Incorrect password.");
          setLoading(false);
          return;
        }

        setSessionUser({ id: row.id, email: row.email, name: row.name });
        onClose();
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(10, 10, 10, 0.72)",
        backdropFilter: "blur(4px)",
        padding: "1rem",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        style={{
          width: "100%",
          maxWidth: "26rem",
          background: "var(--color-bg, #0e0e0e)",
          border: "1px solid var(--color-gold, #C9A24A)",
          padding: "2.25rem 2rem",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "transparent",
            border: "none",
            color: "var(--color-gold)",
            fontSize: "1.1rem",
            cursor: "pointer",
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            marginBottom: "1.75rem",
            borderBottom: "1px solid rgba(201,162,74,0.25)",
            paddingBottom: "0.75rem",
          }}
        >
          {(["signin", "signup"] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setTab(t);
                setError(null);
              }}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-heading)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                fontWeight: 700,
                padding: 0,
                color: tab === t ? "var(--color-gold)" : "rgba(255,255,255,0.4)",
                borderBottom:
                  tab === t ? "2px solid var(--color-gold)" : "2px solid transparent",
                paddingBottom: "0.6rem",
              }}
            >
              {t === "signin" ? "Sign In" : "Register"}
            </button>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
        >
          {tab === "signup" && (
            <FieldLabel label="Full Name">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
                autoComplete="name"
              />
            </FieldLabel>
          )}

          <FieldLabel label="Email">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              autoComplete="email"
            />
          </FieldLabel>

          <FieldLabel label="Password">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              autoComplete={tab === "signin" ? "current-password" : "new-password"}
            />
          </FieldLabel>

          {tab === "signup" && (
            <FieldLabel label="Confirm Password">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={inputStyle}
                autoComplete="new-password"
              />
            </FieldLabel>
          )}

          {error && (
            <p style={{ color: "#e07a6b", fontSize: "0.8rem", margin: 0 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "0.5rem",
              background: "var(--color-gold)",
              color: "#161616",
              border: "none",
              padding: "0.8rem",
              fontFamily: "var(--font-heading)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontSize: "0.75rem",
              fontWeight: 700,
              cursor: loading ? "default" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading
              ? "Please wait…"
              : tab === "signin"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        <p
          style={{
            marginTop: "1.25rem",
            fontSize: "0.75rem",
            textAlign: "center",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {tab === "signin" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setTab("signup");
                  setError(null);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--color-gold)",
                  cursor: "pointer",
                  padding: 0,
                  fontSize: "inherit",
                  textDecoration: "underline",
                }}
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setTab("signin");
                  setError(null);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--color-gold)",
                  cursor: "pointer",
                  padding: 0,
                  fontSize: "inherit",
                  textDecoration: "underline",
                }}
              >
                Sign In
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}