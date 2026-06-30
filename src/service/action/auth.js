export const UserLogout = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/logout`);

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData?.message || "Logout failed");
  }

  return res.json();
};
