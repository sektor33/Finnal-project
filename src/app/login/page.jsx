"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import styles from "./Login.module.css"; 

const schema = yup.object({
  username: yup.string().required("Username is required").min(3, "Min 3 chars"),
  password: yup.string().required("Password is required").min(6, "Min 6 chars"),
  remember: yup.boolean().optional(),
});

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) router.replace("/products");
  }, [loading, isAuthenticated, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "johnd",
      password: "m38rmF$",
      remember: true,
    },
  });

  const onSubmit = async (values) => {
    try {
      await login(values);
      router.push("/products");
    } catch (err) {
      alert("Login error: " + (err?.message || "Unknown error"));
    }
  };

  if (loading) return null;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome back 👋</h1>
        <p className={styles.subtitle}>Log in to continue to your account</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.form}>
          <div className={styles.field}>
            <label>Username</label>
            <input {...register("username")} placeholder="Enter username" />
            {errors.username && <span className={styles.error}>{errors.username.message}</span>}
          </div>

          <div className={styles.field}>
            <label>Password</label>
            <input type="password" {...register("password")} placeholder="Enter password" />
            {errors.password && <span className={styles.error}>{errors.password.message}</span>}
          </div>

          <label className={styles.remember}>
            <input type="checkbox" {...register("remember")} />
            Remember me
          </label>

          <button disabled={isSubmitting} className={styles.btn}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p className={styles.demo}>
            Example creds → <code>johnd</code> / <code>m38rmF$</code>
          </p>
        </form>
      </div>
    </div>
  );
}

