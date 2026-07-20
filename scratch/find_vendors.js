async function run() {
  try {
    const res = await fetch('https://api.rajseba.com/profiles');
    const json = await res.json();
    if (json && Array.isArray(json)) {
      const activeVendors = json.filter(p => p.user && p.user.role && (p.user.role.name === 'Vendor' || p.user.role === 'vendor' || p.user.role.name === 'vendor'));
      console.log(`Found ${activeVendors.length} active vendors:`);
      activeVendors.forEach(v => {
        console.log(`- Vendor User ID: ${v.user.id}, Name: ${v.user.name}`);
      });
    } else {
      console.log("Unexpected format:", json);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
run();
