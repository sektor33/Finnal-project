"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./Register.module.css"; 

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  username: yup.string().min(3).required("Username is required"),
  password: yup.string().min(6).required("Password is required"),
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  phone: yup.string().required("Phone is required"),
  city: yup.string().required("City is required"),
  street: yup.string().required("Street is required"),
  number: yup.number().typeError("House number must be a number").required("House number is required"),
  zipcode: yup.string().required("Zip code is required"),
});

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } =
    useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (v) => {
    const body = {
      email: v.email,
      username: v.username,
      password: v.password,
      name: { firstname: v.firstname, lastname: v.lastname },
      address: {
        city: v.city,
        street: v.street,
        number: Number(v.number),
        zipcode: v.zipcode,
        geolocation: { lat: "0", long: "0" },
      },
      phone: v.phone,
    };

    try {
      const res = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Registration failed");
      await res.json();
      reset();
      
      const el = document.getElementById("toast");
      if (el) {
        el.classList.add(styles.show);
        setTimeout(() => el.classList.remove(styles.show), 2200);
      }
      setTimeout(() => router.push("/login"), 800);
    } catch (e) {
      alert(e.message || "Registration error");
    }
  };

  
  const F = ({ name, label, type="text", placeholder }) => (
    <div className={styles.field}>
      <label htmlFor={name}>{label}</label>
      <input id={name} type={type} placeholder={placeholder} {...register(name)} />
      {errors[name] && <span className={styles.err}>{errors[name].message}</span>}
    </div>
  );

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Create account</h1>
          <p>Sign up to get started. It takes less than a minute.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.form}>
          <F name="email" label="Email" placeholder="you@email.com" />
          <F name="username" label="Username" placeholder="username" />
          <F name="password" label="Password" type="password" placeholder="********" />

          <div className={styles.grid2}>
            <F name="firstname" label="First name" />
            <F name="lastname"  label="Last name" />
          </div>

          <F name="phone" label="Phone" placeholder="1-570-236-7033" />

          <fieldset className={styles.box}>
            <legend>Address</legend>
            <div className={styles.grid2}>
              <F name="city"   label="City" />
              <F name="street" label="Street" />
            </div>
            <div className={styles.grid2}>
              <F name="number"  label="House number" />
              <F name="zipcode" label="Zip code" />
            </div>
          </fieldset>

          <div className={styles.actions}>
            <button className={styles.btn} disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create account"}
            </button>
            <span className={styles.link} onClick={() => router.push("/login")}>
              I already have an account
            </span>
          </div>

          <div className={styles.hr} />
          <p className={styles.note}>
            Note: FakeStore “register” is demo-only; use provided demo credentials for login.
          </p>
        </form>
      </div>

      <div id="toast" className={styles.toast}>Account created successfully ✨</div>
    </div>
  );
}
