export const getFallbackVendorId = (profilesData: any): number => {
  const profiles = Array.isArray(profilesData) 
    ? profilesData 
    : (profilesData?.data || []);
  
  // Find the superadmin profile by email
  const superAdminProfile = profiles.find(
    (p: any) => p.user?.email === "superadmin@gmail.com"
  );
  if (superAdminProfile?.user?.id) {
    return Number(superAdminProfile.user.id);
  }
  // Safe default system fallback (superadmin@gmail.com user ID)
  return 18; 
};
