async function test() {
  try {
    const res = await fetch('https://api.rajseba.com/bookings/46');
    const json = await res.json();
    console.log("Services Response Status:", res.status);
    if (json && json.data) {
      console.log(JSON.stringify(json.data, null, 2));
    } else {
      console.log("No data field in response:", json);
    }
  } catch (error) {
    console.error("Error fetching services:", error);
  }
}

test();
