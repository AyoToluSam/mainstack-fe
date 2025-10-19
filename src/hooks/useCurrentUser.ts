import { useGetUserQuery } from "@/store/app/user/api";
import { useMemo } from "react";

export const useCurrentUser = () => {
  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useGetUserQuery();

  const userName = useMemo(() => {
    if (!user) return "";
    return `${user.first_name} ${user.last_name}`;
  }, [user]);

  return { user: user, userName, isUserLoading, userError };
};
