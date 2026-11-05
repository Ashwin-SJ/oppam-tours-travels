/* DESTINATIONS – photos are local files. Replace the SVG placeholders in images/destinations with your own photos. */
(function () {
  const PHOTO_MAP = {
    munnar: "images/destinations/munnar.jpg",
    wayanad: "images/destinations/wayanad.jpg",
    alappuzha: "images/destinations/alappuzha.jpg",
    kochi: "images/destinations/kochi.jpg",
    thekkady: "images/destinations/thekkady.jpg",
    "kanyakumari-beach": "images/destinations/kanyakumari-beach.jpg",
    "vivekananda-rock": "images/destinations/vivekananda-rock.jpg",
    "thiruvalluvar-statue": "images/destinations/kanyakumari-beach.jpg",
    thirparappu: "images/destinations/thirparappu.jpg",
    vagamon: "images/destinations/vagamon.jpg",
    varkala: "images/destinations/varkala.jpg",
    kovalam: "images/destinations/kovalam.jpg"
  };
  const d = (id, name, region, featured, tagline, intro, attractions, activities, duration) => ({
    id, name, region, featured, tagline, intro, attractions, activities, duration,
    travelInfo: "",
    vehicles: region === "Kanyakumari" ? ["car-4", "car-5", "suv-7", "van-12", "van-17"] : ["car-4", "car-5", "suv-7", "van-12"],
    images: (PHOTO_MAP[id] ? [PHOTO_MAP[id]] : [1, 2, 3].map((n) => `images/destinations/${id}-${n}.svg`))
  });
  window.DESTINATIONS = [
    d("munnar", "Munnar", "Kerala", true, "Tea-covered hills in the clouds", "A hill station in the Western Ghats known for rolling tea estates, cool air and sweeping viewpoints.", ["Tea plantations", "Eravikulam National Park", "Mattupetty Dam", "Echo Point", "Top Station"], ["Tea estate walks", "Viewpoint photography", "Visit a tea museum", "Nature walks"], "2–3 days"),
    d("alappuzha", "Alappuzha (Alleppey)", "Kerala", true, "Backwaters, houseboats and village life", "The heart of Kerala's backwaters, with canals, coconut groves and slow, scenic water journeys.", ["Vembanad Lake", "Alappuzha Beach", "Marari Beach", "Krishnapuram Palace", "Pathiramanal Island"], ["Houseboat or shikara cruise", "Canoe village tours", "Beach sunsets"], "1–2 days"),
    d("wayanad", "Wayanad", "Kerala", true, "Forests, caves and misty peaks", "A green highland district of waterfalls, wildlife, spice gardens and ancient rock caves.", ["Edakkal Caves", "Banasura Sagar Dam", "Soochipara Falls", "Pookode Lake", "Kuruva Island"], ["Trekking", "Lake boating", "Spice plantation visits", "Wildlife viewing"], "2–3 days"),
    d("thekkady", "Thekkady", "Kerala", true, "Wildlife and spice country", "Home to Periyar Tiger Reserve and the fragrant spice gardens of nearby Kumily.", ["Periyar Tiger Reserve", "Periyar Lake", "Kumily spice plantations", "Murikkady"], ["Boat ride on Periyar Lake", "Spice garden tours", "Kalaripayattu and Kathakali shows", "Nature walks"], "1–2 days"),
    d("kochi", "Kochi", "Kerala", true, "Heritage port city", "A historic port where Chinese, Portuguese, Dutch and British influences meet along the waterfront.", ["Fort Kochi", "Chinese fishing nets", "Mattancherry Palace", "Jew Town", "Santa Cruz Basilica", "Marine Drive"], ["Heritage walk", "Harbour cruise", "Seafood and café trail", "Art and gallery visits"], "1–2 days"),
    d("kumarakom", "Kumarakom", "Kerala", false, "Birds and calm lake views", "A quiet village on Vembanad Lake, popular for birdwatching and relaxing backwater stays.", ["Kumarakom Bird Sanctuary", "Vembanad Lake", "Backwater canals"], ["Birdwatching", "Houseboat stay", "Village canoe rides"], "1 day"),
    d("vagamon", "Vagamon", "Kerala", true, "Pine forests and rolling meadows", "A cool, uncrowded hill destination of green meadows, pine groves and open viewpoints.", ["Pine forest", "Vagamon Meadows", "Thangal Para", "Kurisumala", "Marmala Waterfall"], ["Meadow walks", "Viewpoint visits", "Photography"], "1–2 days"),
    d("varkala", "Varkala", "Kerala", true, "Cliffside beach and sunsets", "A rare red-cliff coastline with a lively beach walk, cafés and a revered seaside temple.", ["Varkala (Papanasam) Beach", "Cliff walk", "Janardhana Swamy Temple", "Sivagiri Mutt", "Kappil Lake"], ["Cliff walk", "Beach time", "Ayurvedic wellness", "Sunset viewing"], "1–2 days"),
    d("kovalam", "Kovalam", "Kerala", true, "Crescent beaches near the capital", "A well-loved beach resort with sheltered, crescent-shaped bays close to Thiruvananthapuram.", ["Lighthouse Beach", "Hawah Beach", "Samudra Beach", "Vizhinjam"], ["Swimming", "Surf lessons", "Ayurvedic massage", "Lighthouse view"], "1–2 days"),
    d("athirappilly", "Athirappilly", "Kerala", true, "Kerala's grand waterfall", "A broad, powerful waterfall set in lush forest, best paired with nearby Vazhachal.", ["Athirappilly Falls", "Vazhachal Falls", "Charpa Falls", "Vazhachal forest"], ["Waterfall viewing", "Forest drive", "Photography"], "1 day"),
    d("thrissur", "Thrissur", "Kerala", false, "Cultural capital of Kerala", "A city of temples, festivals and palaces, famous for the annual Thrissur Pooram.", ["Vadakkunnathan Temple", "Shakthan Thampuran Palace", "Peechi Dam", "Thrissur Zoo and Museum"], ["Temple and heritage visits", "Festival experience (seasonal)", "Local food trail"], "1 day"),
    d("kozhikode", "Kozhikode", "Kerala", false, "Malabar flavours and old trade routes", "A historic Malabar coastal city known for its food, beaches and craft traditions.", ["Kozhikode Beach", "Kappad Beach", "Mananchira Square", "Sargaalaya Craft Village", "Thusharagiri Falls"], ["Malabar food trail", "Beach evenings", "Craft village visit"], "1–2 days"),
    d("bekal", "Bekal", "Kerala", false, "A seaside fort in the north", "Home to Kerala's largest fort, set beside a calm beach on the northern coast.", ["Bekal Fort", "Bekal Beach", "Kappil Beach", "Valiyaparamba backwaters"], ["Fort exploration", "Beach time", "Backwater visits"], "1 day"),
    d("idukki", "Idukki", "Kerala", false, "Dams and high-range views", "A mountainous district famous for its giant arch dam and quiet hill scenery.", ["Idukki Arch Dam", "Cheruthoni Dam", "Hill View Park", "Ramakkalmedu", "Idukki Wildlife Sanctuary"], ["Dam viewing (subject to opening times)", "Viewpoint visits", "Scenic drives"], "1–2 days"),
    d("ponmudi", "Ponmudi", "Kerala", false, "A hill getaway near the capital", "A cool hill station an easy drive from Thiruvananthapuram, with winding ghat roads and misty views.", ["Golden Valley", "Meenmutty Waterfalls", "Kallar River", "Hairpin-bend ghat road"], ["Short treks", "Viewpoints", "Riverside stop"], "1 day"),

    d("kanyakumari-beach", "Kanyakumari Beach", "Kanyakumari", true, "Where three seas meet", "India's southern tip, where the Arabian Sea, Bay of Bengal and Indian Ocean meet, famous for sunrise and sunset views.", ["Sunrise point", "Sunset view point", "Kumari Amman Temple", "Gandhi Memorial Mandapam", "Our Lady of Ransom Church"], ["Watch the sunrise", "Beach walk", "Temple visit", "Souvenir shopping"], "1 day"),
    d("vivekananda-rock", "Vivekananda Rock Memorial", "Kanyakumari", true, "A memorial on the sea", "A memorial built on a rocky island just off the shore, reached by a short ferry ride.", ["Vivekananda Rock Memorial", "Sri Pada Mandapam", "Meditation hall", "Ferry crossing"], ["Ferry ride", "Quiet reflection", "Sea views"], "Half day"),
    d("thiruvalluvar-statue", "Thiruvalluvar Statue", "Kanyakumari", true, "A giant statue of the Tamil poet-saint", "A towering stone statue of the poet Thiruvalluvar standing on a rock beside Vivekananda Rock.", ["Thiruvalluvar Statue", "Boat ferry", "Sea views"], ["Boat ride", "Photography"], "Half day"),
    d("suchindram", "Suchindram Temple", "Kanyakumari", false, "Temple of carved pillars", "The Thanumalayan Temple is known for its tall gopuram and richly carved pillars.", ["Thanumalayan Temple", "Carved gopuram", "Sculpted pillars"], ["Temple visit", "Architecture viewing"], "1–2 hours"),
    d("padmanabhapuram", "Padmanabhapuram Palace", "Kanyakumari", true, "A wooden palace of old Travancore", "A historic palace complex famed for its carved wooden architecture, once a seat of the Travancore kings.", ["Palace complex", "Carved wooden halls", "Palace museum"], ["Guided heritage visit", "Photography"], "Half day"),
    d("mathur-aqueduct", "Mathur Aqueduct", "Kanyakumari", false, "A towering aqueduct bridge", "Mathur Hanging Trough is one of the tallest aqueduct bridges in Asia, set among green fields.", ["Mathur Hanging Trough", "Walkway along the channel", "Village countryside"], ["Scenic stop", "Photography"], "1–2 hours"),
    d("thirparappu", "Thirparappu Waterfalls", "Kanyakumari", false, "A cool plunge in the countryside", "A popular waterfall with a bathing area and an old Shiva temple nearby.", ["Thirparappu Falls", "Nearby Shiva temple", "Bathing pool"], ["Waterfall visit", "Picnic stop"], "Half day"),
    d("vattakottai", "Vattakottai Fort", "Kanyakumari", false, "A fort beside the sea", "A coastal fort of granite walls with open sea views, close to Kanyakumari.", ["Fort ramparts", "Sea-facing viewpoint", "Nearby beach"], ["Fort walk", "Sunset views"], "1–2 hours"),
    d("muttom-beach", "Muttom Beach", "Kanyakumari", false, "Rocky shores and a lighthouse", "A scenic beach with rock formations and a lighthouse on the Kanyakumari coast.", ["Muttom Beach", "Muttom Lighthouse", "Rocky shoreline"], ["Beach walk", "Photography", "Sunset views"], "1–2 hours")
  ];

  // Client-supplied destination photographs (local files, no external image links).
  const suppliedPhotos = {
    kozhikode: ["images/destinations/kozhikode.jpg"],
    thrissur: ["images/destinations/thrissur.jpg"],
    athirappilly: ["images/destinations/athirappilly.jpg"],
    kumarakom: ["images/destinations/kumarakom.jpg"],
    bekal: ["images/destinations/bekal.jpg"],
    "muttom-beach": ["images/destinations/muttom-beach.jpg"],
    vattakottai: ["images/destinations/vattakottai.jpg"],
    "mathur-aqueduct": ["images/destinations/mathur-aqueduct.jpg"],
    padmanabhapuram: ["images/destinations/padmanabhapuram.jpg", "images/destinations/padmanabhapuram-2.jpg"],
    suchindram: ["images/destinations/suchindram.jpg"],
    idukki: ["images/destinations/idukki.jpg"],
    ponmudi: ["images/destinations/ponmudi.jpg"]
  };
  window.DESTINATIONS.forEach((destination) => {
    if (suppliedPhotos[destination.id]) destination.images = suppliedPhotos[destination.id];
  });
})();
