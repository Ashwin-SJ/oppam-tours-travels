/* ==========================================================
   PACKAGES – edit freely. price "" shows "Price on request".
   destinations: ids from destinations.js.  days: 0 = flexible/custom.
   type: one-day | two-day | three-day | weekend | family | friends | honeymoon | custom | kanyakumari | combined
   Hotels, meals and entry tickets are NOT assumed – list them in `inclusions` only if the client confirms.
   ========================================================== */
(function () {
  const note = "Final price depends on vehicle, season and inclusions – confirm with Oppam Travels";
  const p = (id, name, type, days, destinations, vehicles, popular) => ({
    id, name, type, days, nights: days > 0 ? days - 1 : 0, destinations, vehicles, popular: !!popular,
    inclusions: ["Vehicle with driver", "Sightseeing transfers as per plan"], price: "", priceNote: note
  });
  window.PACKAGE_TYPES = [
    ["all", "All"], ["one-day", "1 day"], ["two-day", "2 days"], ["three-day", "3 days"], ["weekend", "Weekend"],
    ["family", "Family"], ["friends", "Friends"], ["honeymoon", "Honeymoon"], ["kanyakumari", "Kanyakumari"], ["combined", "Kerala + Kanyakumari"], ["custom", "Customised"]
  ];
  const cars = ["car-4", "car-5", "suv-7"], mid = ["suv-7", "van-12", "van-17"], big = ["van-17", "bus-26", "bus-35", "bus-52"];
  window.PACKAGES = [
    p("kochi-one-day", "Kochi Heritage Day Tour", "one-day", 1, ["kochi"], cars),
    p("kanyakumari-one-day", "Kanyakumari Sunrise & Sightseeing", "one-day", 1, ["kanyakumari-beach", "vivekananda-rock", "thiruvalluvar-statue"], [...cars, "van-12"], true),
    p("athirappilly-one-day", "Athirappilly Waterfall Day Trip", "one-day", 1, ["athirappilly"], [...cars, "van-12"]),
    p("munnar-two-day", "Munnar Hills Escape", "two-day", 2, ["munnar"], cars, true),
    p("alleppey-two-day", "Alleppey Backwater Escape", "two-day", 2, ["alappuzha", "kumarakom"], cars),
    p("munnar-thekkady-three-day", "Munnar & Thekkady", "three-day", 3, ["munnar", "thekkady"], [...cars, "van-12"], true),
    p("wayanad-three-day", "Wayanad Nature Trip", "three-day", 3, ["wayanad"], [...cars, "van-12"]),
    p("vagamon-weekend", "Vagamon Weekend Getaway", "weekend", 2, ["vagamon"], cars),
    p("beach-weekend", "Varkala & Kovalam Beach Weekend", "weekend", 2, ["varkala", "kovalam"], cars, true),
    p("kerala-family", "Kerala Family Tour", "family", 4, ["munnar", "thekkady", "alappuzha"], mid, true),
    p("friends-group", "Friends Group Trip", "friends", 3, ["wayanad", "kozhikode"], [...mid, ...big]),
    p("honeymoon-kerala", "Kerala Honeymoon Journey", "honeymoon", 5, ["munnar", "thekkady", "alappuzha"], cars, true),
    p("custom-kerala", "Customised Kerala Tour", "custom", 0, [], [...cars, ...mid, ...big]),
    p("kanyakumari-heritage", "Kanyakumari Heritage & Waterfalls", "kanyakumari", 2, ["padmanabhapuram", "suchindram", "mathur-aqueduct", "thirparappu", "vattakottai", "muttom-beach"], [...cars, "van-12"]),
    p("kerala-kanyakumari", "Kerala & Kanyakumari Combined Tour", "combined", 5, ["kovalam", "kanyakumari-beach", "vivekananda-rock", "padmanabhapuram", "varkala"], [...cars, ...mid], true)
  ];
  // Dedicated, client-supplied package photos. Each package has its own image;
  // destination photos are not reused as package banners when a package photo exists.
  const packagePhotos = {
    "kerala-family": "images/packages/kerala-family.jpg",
    "honeymoon-kerala": "images/packages/kerala-honeymoon.jpg",
    "munnar-two-day": "images/packages/munnar-hills.jpg",
    "munnar-thekkady-three-day": "images/packages/munnar-thekkady.jpg",
    "beach-weekend": "images/packages/varkala-kovalam.jpg"
  };
  window.PACKAGES.forEach((item) => { if (packagePhotos[item.id]) item.image = packagePhotos[item.id]; });
  window.PACKAGES.find((x) => x.id === "custom-kerala").inclusions = ["Vehicle with driver", "Route and days planned around your wishes"];
})();
