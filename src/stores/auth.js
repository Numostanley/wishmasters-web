import { defineStore } from "pinia";
import { useMutation } from "@tanstack/vue-query";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginService } from "@/services/auth.service";
import { clearCookies, getToken, setCookies } from "../utils/cookies";
import { registerService } from "../services/auth.service";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const user = ref(null);
  const isAuthenticated = ref(false);

  // Handle login mutation
  const loginMutation = useMutation({
    mutationFn: (formData) => loginService(formData),
    onSuccess: (response) => {
      const { data, status } = response;

      if (status) {
        // Save token and user data
        const userData = {
          full_name: data?.data?.full_name,
          phone_number: data?.data?.phone_number,
          id: data?.data?.id,
        };

        setCookies(data.data.token, userData);
        user.value = userData;
        isAuthenticated.value = true;

        // Redirect to competitions page after login
        router.push("/competitions");
      } else {
        alert(data?.message);
      }
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (formData) => registerService(formData),
    onSuccess: (response) => {
      const { data, status } = response;
      if (status) {
        alert("Registered successfully, please proceed to login");
        // Redirect to competitions page after login
        router.push("/login");
      } else {
        alert(data?.message);
      }
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
  });

  const logout = () => clearCookies();

  return {
    user,
    isAuthenticated,
    loginMutation,
    registerMutation,
    logout,
  };
});
