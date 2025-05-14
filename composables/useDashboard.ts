import { ref } from "vue";
import type { Dashboard } from "~/interfaces/dashboard";

// Using ref to save product, error and loading
export const showDashboard = () => {
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);
  const dashboards = ref<Dashboard[]>([]);

  const fetchDashboards = async (): Promise<void> => {
    loading.value = true;
    try {
      const { token } = getTokenAndUserId();

      const { data, error: fetchError, execute } = await useLazyFetch<Dashboard[]>(
        'https://fullstackexam2025backend.onrender.com/api/projects/',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token
          },
          immediate: false,
        }
      );

      await execute();

      if (fetchError.value) {
        throw new Error(fetchError.value.message || "Failed to fetch dashboards");
      }

      dashboards.value = data.value || [];

    } catch (err) {
      error.value = (err as Error).message;

    } finally {
      loading.value = false;
    }
  };

  const getTokenAndUserId = (): { token: string, userId: string } => {
    const token = localStorage.getItem('lsToken');
    const userId = localStorage.getItem('userIDToken');

    if (!token) throw new Error("No token available");
    if (!userId) throw new Error("No user ID available");

    return { token, userId };
  };

  return {
    dashboards,
    error,
    loading,
    fetchDashboards,
  };
};
