/* ==========================================================
   VEHICLES – edit / add / remove entries freely.
   images: put the client's real photos in /images/vehicles/ named <id>-1.jpg, <id>-2.jpg, <id>-3.jpg
   Leave price "" to show "Price on request".
   NOTE: model, AC, luggage and facilities below are PLACEHOLDERS – confirm per vehicle.
   group: "car" (four-wheelers) or "group" (tourist & group vehicles)
   ========================================================== */
(function () {
  const img = (id) => [1, 2, 3].map((n) => `images/vehicles/${id}-${n}.jpg`);
  const carFacilities = ["Comfortable seating", "Charging point", "Music system"];
  const groupFacilities = ["Pushback seats", "Music system", "Luggage space", "Reading lights"];
  const safety = ["Regularly serviced vehicle", "Professional driver", "Seat belts for passengers"];
  const pn = "Per day / per km – confirm with Oppam Travels";
  const PHOTO = {
    "car-4": "images/vehicles/swift-dzire.jpg", "car-5": "images/vehicles/innova-crysta.jpg", "suv-7": "images/vehicles/innova-crysta.jpg",
    "van-12": "images/vehicles/tempo-traveller.jpg", "van-17": "images/vehicles/urbania.jpg",
    "bus-26": "images/vehicles/luxury-bus.jpg", "bus-35": "images/vehicles/luxury-bus.jpg", "bus-52": "images/vehicles/luxury-bus.jpg"
  };
  const v = (id, group, name, seats, facilities, blurb) => ({ id, group, name, model: "Model to be confirmed", seats, ac: true, luggage: "Please enquire", driver: true, price: "", priceNote: pn, facilities, safety, images: [PHOTO[id] || `images/vehicles/${id}-1.svg`], blurb });
  window.VEHICLES = [
    { id:"innova-crysta", group:"car", name:"Toyota Innova Crysta", model:"Innova Crysta", seats:7, ac:true, luggage:"Please enquire", driver:true, price:"", priceNote:pn, facilities:[...carFacilities,"Family touring comfort"], safety, images:["images/vehicles/innova-crysta.jpg"], blurb:"A spacious premium MPV for family holidays and comfortable long-distance journeys." },
    { id:"urbania", group:"group", name:"Force Urbania", model:"Urbania Traveller", seats:17, ac:true, luggage:"Please enquire", driver:true, price:"", priceNote:pn, facilities:[...groupFacilities,"Wide entry and comfortable cabin"], safety, images:["images/vehicles/urbania.jpg"], blurb:"A premium group traveller for family tours, airport transfers and outstation journeys." },
    { id:"ertiga", group:"car", name:"Maruti Suzuki Ertiga", model:"Ertiga", seats:7, ac:true, luggage:"Please enquire", driver:true, price:"", priceNote:pn, facilities:[...carFacilities,"Flexible family seating"], safety, images:["images/vehicles/ertiga.jpg"], blurb:"A practical family vehicle for local sightseeing and outstation travel." },
    v("car-4", "car", "4-Seater Car", 4, carFacilities, "A compact, comfortable choice for couples and small families."),
    v("car-5", "car", "5-Seater Car", 5, carFacilities, "Room for the whole family with space for everyday luggage."),
    v("suv-7", "car", "6–7 Seater Family Vehicle", 7, [...carFacilities, "Extra legroom"], "Spacious seating for larger families and small friend groups."),
    v("van-12", "group", "12-Seater Traveller", 12, groupFacilities, "Ideal for family gatherings and friend groups."),
    v("van-17", "group", "17-Seater Traveller", 17, groupFacilities, "A comfortable mid-size option for tours and events."),
    v("bus-26", "group", "26-Seater Tourist Vehicle", 26, groupFacilities, "For school, office and community trips."),
    v("bus-35", "group", "35-Seater Tourist Bus", 35, groupFacilities, "Great value for larger groups travelling together."),
    v("bus-52", "group", "52-Seater Tourist Bus", 52, groupFacilities, "Our largest coach for big tours, pilgrimages and weddings.")
  ];
})();
