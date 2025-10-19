export const getInitials = (name: string): string => {
  if (!name || name.trim().length === 0) {
    return "U";
  }

  const nameParts = name.trim().split(/\s+/);

  if (nameParts.length === 1) {
    // Single name: take first two characters
    return nameParts[0].substring(0, 2).toUpperCase();
  }

  // Multiple names: take first character of first and last name
  const firstInitial = nameParts[0][0];
  const lastInitial = nameParts[nameParts.length - 1][0];

  return (firstInitial + lastInitial).toUpperCase();
};
