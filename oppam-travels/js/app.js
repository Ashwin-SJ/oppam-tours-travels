/* Oppam Travels – shared components + page renderers (no build step needed). */
(function () {
  "use strict";
  const S = window.SITE, D = window.DESTINATIONS, V = window.VEHICLES, P = window.PACKAGES;
  const page = document.body.dataset.page;
  const app = document.getElementById("app");
  const qs = new URLSearchParams(location.search);

  /* ---------- helpers ---------- */
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const byId = (arr, id) => arr.find((x) => x.id === id);
  const waLink = (text) => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(text)}`;
  const bookUrl = (o) => "booking.html?" + new URLSearchParams(o).toString();
  const list = (a) => `<ul class="ticks">${a.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
  const priceHtml = (x) => (x.price ? `<span class="price">${esc(x.price)}</span>` : `<span class="price none">Price on request</span>`);
  const duration = (p) => (p.days === 0 ? "Flexible duration" : p.days === 1 ? "1 day (same day)" : `${p.days} days / ${p.nights} nights`);
  const IC = {
    seat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3a2 2 0 0 0-2 2v8a3 3 0 0 0 3 3h7v5h2v-5h1v-2h-3V5a2 2 0 0 0-2-2H7z" fill="currentColor"/></svg>',
    ac: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2v20M4.9 6l14.2 12M4.9 18L19.1 6M2 12h20" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>',
    driver: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" fill="currentColor"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6z" fill="currentColor"/></svg>',
    bag: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="8" width="16" height="12" rx="2" fill="currentColor"/><path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
    wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6-.3.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.300 2.400 1.500.3.100.5.100.600-.100l.8-1c.2-.300.400-.200.700-.100l1.900.9c.300.100.500.200.600.300.1.200.1.800-.1 1.400z"/></svg>',
    call: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.400 11.400 0 0 0 3.600.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.500a1 1 0 0 1 1 1c0 1.300.2 2.500.6 3.600a1 1 0 0 1-.25 1z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.500A2.500 2.500 0 1 1 12 6.500a2.500 2.500 0 0 1 0 5z"/></svg>'
  };
  const logo = `<img class="logo-mark" src="images/logo.png" alt="Oppam Tours &amp; Travels logo">`;

  function placeholder(label) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#0f5a43'/><stop offset='1' stop-color='#2f8a5f'/></linearGradient></defs><rect width='800' height='600' fill='url(#g)'/><path d='M0 470Q200 380 400 450T800 400V600H0Z' fill='#083a2b' opacity='.55'/><text x='400' y='285' text-anchor='middle' font-family='Georgia,serif' font-size='44' fill='#fff'>${esc(label)}</text><text x='400' y='332' text-anchor='middle' font-family='sans-serif' font-size='20' fill='#fff' opacity='.7'>Photo coming soon</text></svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  const img = (src, alt, eager) => `<img src="${esc(src)}" alt="${esc(alt)}" data-ph="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" width="800" height="600">`;
  document.addEventListener("error", (e) => {
    const t = e.target;
    if (t.tagName === "IMG" && !t.dataset.fb) { t.dataset.fb = "1"; t.src = placeholder(t.dataset.ph || ""); }
  }, true);

  function setMeta(title, desc) {
    document.title = `${title} | ${S.name}`;
    const m = document.querySelector('meta[name="description"]');
    if (m && desc) m.setAttribute("content", desc);
    const og = document.querySelector('meta[property="og:title"]');
    if (og) og.setAttribute("content", document.title);
  }

  /* ---------- shell: header, footer, floating buttons ---------- */
  const NAV = [["Home", "index.html", "home"], ["Vehicles", "vehicles.html", "vehicles"], ["About Us", "about.html", "about"], ["Contact", "contact.html", "contact"]];
  const activeKey = { vehicle: "vehicles", destination: "destinations", package: "packages" }[page] || page;

  function shell() {
    const links = NAV.map(([t, h, k]) => `<a href="${h}" ${k === activeKey ? 'aria-current="page"' : ""}>${t}</a>`).join("");
    document.body.insertAdjacentHTML("afterbegin", `
      <header class="site-header"><div class="wrap bar">
        <a class="brand" href="index.html" aria-label="${esc(S.name)} home">${logo}<span>${esc(S.name)}</span></a>
        <nav id="nav" class="nav" aria-label="Main">${links}<a class="btn btn-gold nav-book" href="booking.html">Book Your Trip</a></nav>
        <button class="burger" aria-expanded="false" aria-controls="nav" aria-label="Open menu"><span></span><span></span><span></span></button>
      </div></header>`);
    const social = Object.entries(S.social || {}).filter(([, u]) => u).map(([k, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${k[0].toUpperCase() + k.slice(1)}</a>`).join("");
    app.insertAdjacentHTML("afterend", `
      <footer class="site-footer"><div class="wrap footer-main">
        <div class="footer-brand-block"><a class="brand" href="index.html">${logo}<span>${esc(S.name)}</span></a><p class="footer-intro">Your travel partner for comfortable vehicle rentals, Kerala holidays and Kanyakumari sightseeing. Tell us where you want to go — we'll help plan the journey.</p><div class="footer-pills"><span>Vehicle rentals</span><span>Tour packages</span><span>Local &amp; outstation</span></div></div>
        <div class="footer-links"><h3>Quick Links</h3><div class="footer-link-grid">${NAV.map(([t, h]) => `<a href="${h}">${t}</a>`).join("")}<a href="booking.html">Book a Trip</a></div><a class="footer-book" href="booking.html">Plan your journey <span aria-hidden="true">→</span></a></div>
        <div class="footer-contact"><h3>Get in touch</h3><a class="footer-contact-card" href="tel:${esc(S.phone)}"><span class="footer-icon">☎</span><span><small>Call the coordinator</small><strong>${esc(S.phoneDisplay)}</strong></span></a><a class="footer-contact-card" target="_blank" rel="noopener" href="${waLink(`Hello ${S.name}! I would like to enquire about a trip. Please share the details.`)}"><span class="footer-icon">${IC.wa}</span><span><small>WhatsApp enquiries</small><strong>Chat with us</strong></span></a><a class="footer-contact-card" href="${esc(S.mapLink)}" target="_blank" rel="noopener"><span class="footer-icon">${IC.pin}</span><span><small>Our location</small><strong>${esc(S.address)}</strong></span></a><div class="footer-coordinator"><strong>${esc(S.owner)}</strong><span>${esc(S.coordinatorTitle)}</span><span>${esc(S.hours)}</span></div></div>
      </div><div class="wrap footer-bottom"><span>© ${new Date().getFullYear()} ${esc(S.name)}. All rights reserved.</span><span class="footer-made">${esc(S.developerCredit)}</span></div></footer>
      <div class="float" aria-label="Quick contact">
        <a class="fab fab-call" href="tel:${esc(S.phone)}" aria-label="Call Now">${IC.call}<span>Call Now</span></a>
        <a class="fab fab-wa" href="${waLink("*Hello Oppam Tours & Travels!*\n\nI would like to plan a trip. Please share your available vehicles, tour packages and best quotation.\n\nThank you.")}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${IC.wa}<span>WhatsApp</span></a>
      </div>
      <dialog id="lightbox" aria-label="Photo viewer"><button class="lb-close" aria-label="Close photo">×</button><img alt=""></dialog>`);
    const burger = document.querySelector(".burger");
    const setNav = (open) => { document.body.classList.toggle("nav-open", open); burger.setAttribute("aria-expanded", open); burger.setAttribute("aria-label", open ? "Close menu" : "Open menu"); };
    burger.addEventListener("click", () => setNav(!document.body.classList.contains("nav-open")));
    document.querySelector("#nav").addEventListener("click", (e) => { if (e.target.closest("a")) setNav(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setNav(false); });
    const lb = document.getElementById("lightbox");
    lb.addEventListener("click", () => lb.close());
  }

  /* ---------- cards ---------- */
  const destCard = (d) => `<a class="card dest-card" href="destination.html?id=${d.id}" data-region="${d.region}" data-name="${esc((d.name + " " + d.tagline).toLowerCase())}">
      <div class="media">${img(d.images[0], d.name)}</div>
      <div class="dest-text"><span class="tag">${d.region === "Kerala" ? "Kerala" : "Kanyakumari"}</span><h3>${esc(d.name)}</h3><p>${esc(d.tagline)}</p></div></a>`;

  const vehicleCard = (v) => `<article class="card veh-card" data-group="${v.group}">
      <a class="media" href="vehicle.html?id=${v.id}" aria-label="${esc(v.name)} details">${img(v.images[0], v.name)}</a>
      <div class="card-body">
        <h3>${esc(v.name)}</h3><p class="muted">${esc(v.model)}</p>
        <ul class="chips"><li>${IC.seat}${v.seats} seats</li><li>${IC.ac}${v.ac ? "AC" : "Non-AC"}</li><li>${IC.driver}${v.driver ? "Driver included" : "Self-drive"}</li>${v.luggage ? `<li>${IC.bag}${esc(v.luggage)}</li>` : ""}</ul>
        <p>${esc(v.blurb)}</p>
        <p class="safety-line">${esc(v.safety[0])} · ${esc(v.safety[1])}</p>
        <div class="card-foot">${priceHtml(v)}<div class="btns"><a class="btn btn-outline" href="vehicle.html?id=${v.id}">View Details</a><a class="btn btn-primary" href="${bookUrl({ vehicle: v.id })}">Book Now</a></div></div>
      </div></article>`;

  const pkgImg = (p) => { if (p.image) return p.image; const d = byId(D, p.destinations[0]); return d ? d.images[0] : "images/destinations/munnar-1.svg"; };
  const packageCard = (p) => `<article class="card pkg-card" data-type="${p.type}">
      <a class="media" href="package.html?id=${p.id}" aria-label="${esc(p.name)} details">${img(pkgImg(p), p.name)}<span class="badge">${duration(p)}</span></a>
      <div class="card-body">
        <h3>${esc(p.name)}</h3>
        <p class="muted">${p.destinations.length ? p.destinations.map((i) => esc(byId(D, i).name)).join(", ") : "Any Kerala destinations you choose"}</p>
        <p class="small"><strong>Vehicles:</strong> ${p.vehicles.map((i) => byId(V, i).seats).filter((x, i, a) => a.indexOf(x) === i).join(", ")}-seater options</p>
        <div class="card-foot">${priceHtml(p)}<div class="btns"><a class="btn btn-outline" href="package.html?id=${p.id}">View Package</a><a class="btn btn-primary" href="${bookUrl({ package: p.id })}">Book Now</a></div></div>
      </div></article>`;

  const head = (title, sub) => `<section class="page-head"><div class="wrap"><h1>${esc(title)}</h1><p>${esc(sub)}</p></div></section>`;
  const notFound = (what, href) => `<section class="section"><div class="wrap narrow center"><h1>We couldn't find that ${what}</h1><p>The link may be old. Browse all ${what}s instead.</p><a class="btn btn-primary" href="${href}">See all ${what}s</a></div></section>`;
  const ctaBand = `<section class="cta-band"><div class="wrap"><h2>Tell us where you want to go</h2><p>Send your trip details on WhatsApp and Oppam Travels will reply with availability and price.</p><div class="btns"><a class="btn btn-gold" href="booking.html">Book Your Trip</a><a class="btn btn-ghost" href="booking.html?package=custom">Request a custom package</a></div></div></section>`;

  /* ---------- pages ---------- */
  const pages = {};

  pages.home = () => {
    setMeta("Kerala & Kanyakumari Tours and Vehicle Rental", "Oppam Travels offers vehicle rental with drivers, tour packages and sightseeing across Kerala and Kanyakumari. Book on WhatsApp.");
    const route = ["bekal", "wayanad", "kozhikode", "thrissur", "athirappilly", "munnar", "kochi", "vagamon", "thekkady", "alappuzha", "varkala", "kovalam", "kanyakumari-beach"].map((i) => byId(D, i));
    const why = [["Professional drivers", "Drivers who know Kerala and Kanyakumari roads."], ["Well-maintained vehicles", "From 4-seater cars to 52-seater tourist buses."], ["Comfortable journeys", "Plan the pace of your trip with us, not around a fixed script."], ["Custom packages", "Tell us your days, group and wishes; we build the plan."], ["Simple WhatsApp booking", "Send your request in under a minute."], ["Support on the way", "Reach us during your journey if plans change."]];
    app.innerHTML = `
    <section class="hero"><svg class="route-art" viewBox="0 0 600 400" aria-hidden="true" preserveAspectRatio="xMaxYMax meet"><path class="route-line" d="M20 40 C 180 60, 120 200, 260 230 S 420 300, 540 360" fill="none" stroke="#e8b03a" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 12"/><circle cx="540" cy="360" r="8" fill="#e8b03a"/><text x="530" y="340" text-anchor="end" fill="#fff" font-size="16" font-family="Figtree,sans-serif">Kanyakumari</text></svg>
      <div class="wrap hero-in"><h1>Explore Kerala &amp; Beyond with Oppam Travels</h1>
      <p>Travel with confidence across Kerala and Kanyakumari. Choose from cars, SUVs, Tempo Travellers and luxury buses, with trip planning coordinated by Pro Abi S.</p>
      <div class="btns"><a class="btn btn-ghost" href="booking.html">Book Your Trip</a></div>
      <div class="hero-fleet" aria-label="Featured Oppam Travels vehicles">
        <a href="vehicle.html?id=innova-crysta"><img src="images/vehicles/innova-crysta.jpg" alt="Innova Crysta"><span>Innova Crysta</span></a>
        <a href="vehicle.html?id=urbania"><img src="images/vehicles/urbania.jpg" alt="Force Urbania"><span>Force Urbania</span></a>
        <a href="vehicle.html?id=ertiga"><img src="images/vehicles/ertiga.jpg" alt="Ertiga"><span>Ertiga</span></a>
      </div>
      <p class="hero-owner">Tours &amp; package coordinator: <strong>${esc(S.owner)} · ${esc(S.phoneDisplay)}</strong></p>
      </div></section>
    <div class="wrap"><form class="quick" action="booking.html" method="get"><label>From<input name="from" placeholder="Starting location" autocomplete="off"></label><label>To<input name="destination" list="dl-dest" placeholder="Destination" autocomplete="off"></label><label>Travel date<input type="date" name="date" min="${new Date().toISOString().slice(0, 10)}"></label><button class="btn btn-primary" type="submit">Plan my trip</button><datalist id="dl-dest">${D.map((d) => `<option value="${esc(d.name)}">`).join("")}</datalist></form></div>
    <section class="service-ribbon"><div class="wrap service-ribbon-in"><span>Car &amp; SUV Rental</span><span>Tempo Traveller · 9 / 16 / 26 Seats</span><span>Luxury Bus · AC / Non-AC</span><span>Tour Packages</span><span>Airport Transfers</span><span>Local &amp; Outstation Trips</span></div></section>
    <section class="section"><div class="wrap"><div class="sec-head"><h2>Featured destinations</h2><a href="destinations.html">View all ${D.length} destinations</a></div><div class="grid">${D.filter((d) => d.featured).slice(0, 8).map(destCard).join("")}</div></div></section>
    <section class="section alt"><div class="wrap"><div class="sec-head"><h2>One state, one road, many stops</h2></div><p class="lead">Kerala and Kanyakumari line up roughly from north to south. Pick the places you like and we'll join them into one trip.</p><ol class="route" aria-label="Destinations from north to south">${route.map((d) => `<li><a href="destination.html?id=${d.id}"><i></i>${esc(d.name)}</a></li>`).join("")}</ol></div></section>
    <section class="section"><div class="wrap"><div class="sec-head"><h2>Popular travel packages</h2><a href="packages.html">View all packages</a></div><div class="grid">${P.filter((p) => p.popular).slice(0, 6).map(packageCard).join("")}</div></div></section>
    <section class="section alt"><div class="wrap"><div class="sec-head"><h2>Vehicles for every group</h2><a href="vehicles.html">View all vehicles</a></div><div class="grid two">
      <a class="cat" href="vehicles.html?cat=car"><h3>Cars &amp; family vehicles</h3><p>4, 5 and 6–7 seaters for couples and families.</p><ul class="chips">${V.filter((v) => v.group === "car").map((v) => `<li>${v.seats} seats</li>`).join("")}</ul></a>
      <a class="cat" href="vehicles.html?cat=group"><h3>Tourist &amp; group vehicles</h3><p>12 to 52 seaters for tours, weddings and events.</p><ul class="chips">${V.filter((v) => v.group === "group").map((v) => `<li>${v.seats} seats</li>`).join("")}</ul></a></div></div></section>

    ${S.testimonials.length ? `<section class="section alt"><div class="wrap"><div class="sec-head"><h2>What travellers say</h2></div><div class="grid">${S.testimonials.map((t) => `<figure class="quote"><blockquote>${esc(t.text)}</blockquote><figcaption>${esc(t.name)}, ${esc(t.place)}${t.sample ? ' <span class="sample">Sample</span>' : ""}</figcaption></figure>`).join("")}</div></div></section>` : ""}
    ${ctaBand}`;
  };

  pages.about = () => {
    setMeta("About Us", "Oppam Travels: vehicle rental with drivers and tour packages across Kerala and Kanyakumari. Learn about our drivers, vehicles and safety practices.");
    const safe = [["Experienced, professional drivers", "Your driver handles the road so you can enjoy the journey."], ["Properly maintained vehicles", "Vehicles are kept in good running order for long trips."], ["Comfortable travel", "Seating and pace planned around your group."], ["Safe driving practices", "Steady, careful driving on hill and highway roads."], ["Family-friendly transport", "Suitable for children and senior travellers."], ["Group travel facilities", "Vehicles from 12 to 52 seats for larger parties."], ["Support throughout the journey", "Call or message us if anything changes on the road."]];
    app.innerHTML = `${head("About Oppam Travels", "Travel together, travel comfortably.")}
    <section class="section"><div class="wrap split"><div><h2>Oppam means “together”</h2><p><strong>Oppam Tours &amp; Travels</strong> is coordinated by <strong>${esc(S.owner)}</strong>, based in <strong>Poovar, Thiruvananthapuram</strong>. Call <a href="tel:${esc(S.phone)}">${esc(S.phoneDisplay)}</a> for vehicle rentals, tour packages and trip coordination.</p><p>In Malayalam, <em>oppam</em> means “along with”. That is how we like to travel with you: planning the route with you, driving you there, and staying reachable until you are home.</p><p>We offer vehicles with drivers and tour packages across Kerala and Kanyakumari, from one-day sightseeing to multi-day family and honeymoon tours.</p><div class="btns"><a class="btn btn-primary" href="vehicles.html">See our vehicles</a></div></div><div class="media rounded">${img("images/about-group.jpg", "Oppam Travels vehicle")}</div></div></section>
    <section class="section alt" id="safety"><div class="wrap"><div class="sec-head"><h2>Safety and professional drivers</h2></div><div class="grid why">${safe.map(([t, d]) => `<div class="why-item"><h3>${t}</h3><p>${d}</p></div>`).join("")}</div>
    ${S.credentials.length ? `<h3 class="mt">Verified credentials</h3><ul class="ticks">${S.credentials.map((c) => `<li><strong>${esc(c.title)}</strong>: ${esc(c.detail)}</li>`).join("")}</ul>` : ""}</div></section>${ctaBand}`;
  };

  pages.vehicles = () => {
    setMeta("Vehicles for Rent", "Rent 4-seater to 52-seater vehicles with drivers for Kerala and Kanyakumari trips. Cars, travellers and tourist buses.");
    const cat = qs.get("cat") || "all";
    app.innerHTML = `${head("Vehicles", "Choose the right vehicle for your group. All vehicles come with a driver.")}
    <section class="section"><div class="wrap"><div class="filters" role="group" aria-label="Filter vehicles">${[["all", "All"], ["car", "Cars & family vehicles"], ["group", "Tourist & group vehicles"]].map(([k, t]) => `<button class="chip ${k === cat ? "on" : ""}" data-f="${k}" aria-pressed="${k === cat}">${t}</button>`).join("")}</div><div class="grid vehicles" id="items">${V.map(vehicleCard).join("")}</div></div></section>${ctaBand}`;
    filterGrid("group", cat);
  };

  pages.vehicle = () => {
    const v = byId(V, qs.get("id"));
    if (!v) { setMeta("Vehicle not found"); app.innerHTML = notFound("vehicle", "vehicles.html"); return; }
    setMeta(v.name, `${v.name}: ${v.seats}-seater with ${v.driver ? "driver" : "self-drive"} from Oppam Travels. View details and book on WhatsApp.`);
    const dests = D.filter((d) => d.vehicles.includes(v.id)).slice(0, 8);
    app.innerHTML = `<section class="section"><div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="vehicles.html">Vehicles</a> / ${esc(v.name)}</nav>
      <div class="split top">${gallery(v.images, v.name)}<div>
        <h1>${esc(v.name)}</h1><p class="muted">${esc(v.model)}</p><p>${esc(v.blurb)}</p>
        <div class="price-box">${priceHtml(v)}<small>${esc(v.priceNote || "")}</small></div>
        <div class="btns"><a class="btn btn-primary" href="${bookUrl({ vehicle: v.id })}">Book Now</a><a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink(`Hello Oppam Travels, I would like to enquire about the ${v.name}.`)}">${IC.wa}Ask on WhatsApp</a></div>
      </div></div>
      <div class="grid two mt"><div class="panel"><h2>Specifications</h2><table class="spec"><tr><th>Seating</th><td>${v.seats} passengers</td></tr><tr><th>Air conditioning</th><td>${v.ac ? "Available" : "Not available"}</td></tr><tr><th>Driver</th><td>${v.driver ? "Included" : "Not included"}</td></tr><tr><th>Luggage</th><td>${esc(v.luggage || "Please enquire")}</td></tr><tr><th>Model</th><td>${esc(v.model)}</td></tr></table></div>
      <div class="panel"><h2>Facilities</h2>${list(v.facilities)}<h2>Safety &amp; comfort</h2>${list(v.safety)}</div></div>
      ${dests.length ? `<h2 class="mt">Popular trips for this vehicle</h2><ul class="chips big">${dests.map((d) => `<li><a href="destination.html?id=${d.id}">${esc(d.name)}</a></li>`).join("")}</ul>` : ""}</div></section>`;
    initGallery();
  };

  pages.destinations = () => {
    setMeta("Tourist Destinations in Kerala & Kanyakumari", "Explore Munnar, Alappuzha, Wayanad, Thekkady, Kochi, Kanyakumari and more. Plan your trip with Oppam Travels.");
    const cat = qs.get("region") || "all";
    app.innerHTML = `${head("Destinations", "Hills, backwaters, beaches, forts and temples across Kerala and Kanyakumari.")}
    <section class="section"><div class="wrap"><div class="filters"><div role="group" aria-label="Filter by region">${[["all", "All"], ["Kerala", "Kerala"], ["Kanyakumari", "Kanyakumari"]].map(([k, t]) => `<button class="chip ${k === cat ? "on" : ""}" data-f="${k}" aria-pressed="${k === cat}">${t}</button>`).join("")}</div><label class="search"><span class="sr">Search destinations</span><input id="q" type="search" placeholder="Search destinations"></label></div>
    <div class="grid" id="items">${D.map(destCard).join("")}</div><p id="none" class="center muted" hidden>No destinations match your search.</p></div></section>${ctaBand}`;
    filterGrid("region", cat, true);
  };

  pages.destination = () => {
    const d = byId(D, qs.get("id"));
    if (!d) { setMeta("Destination not found"); app.innerHTML = notFound("destination", "destinations.html"); return; }
    setMeta(`${d.name} Tour & Travel`, `Visit ${d.name}: ${d.intro} Plan your trip and book a vehicle with Oppam Travels.`);
    const pk = P.filter((p) => p.destinations.includes(d.id));
    const near = D.filter((x) => x.region === d.region && x.id !== d.id).slice(0, 3);
    app.innerHTML = `<section class="dest-hero"><div class="media">${img(d.images[0], d.name, true)}</div><div class="wrap"><nav class="crumbs light" aria-label="Breadcrumb"><a href="destinations.html">Destinations</a> / ${esc(d.name)}</nav><h1>${esc(d.name)}</h1><p>${esc(d.tagline)}</p></div></section>
    <section class="section"><div class="wrap"><div class="split top"><div><h2>About ${esc(d.name)}</h2><p class="lead">${esc(d.intro)}</p>
      <div class="facts"><div><small>Suggested duration</small><strong>${esc(d.duration)}</strong></div><div><small>Region</small><strong>${d.region === "Kerala" ? "Kerala" : "Kanyakumari, Tamil Nadu"}</strong></div>${d.travelInfo ? `<div><small>Travel information</small><strong>${esc(d.travelInfo)}</strong></div>` : ""}</div>
      <a class="btn btn-primary big" href="${bookUrl({ destination: d.name })}">Book a Trip to ${esc(d.name)}</a></div>${gallery(d.images, d.name)}</div>
      <div class="grid two mt"><div class="panel"><h2>Famous attractions &amp; places to visit</h2>${list(d.attractions)}</div><div class="panel"><h2>Activities &amp; sightseeing</h2>${list(d.activities)}</div></div>
      <h2 class="mt">Suitable vehicles</h2><div class="grid vehicles">${d.vehicles.map((i) => vehicleCard(byId(V, i))).join("")}</div>
      <h2 class="mt">Travel packages including ${esc(d.name)}</h2>${pk.length ? `<div class="grid">${pk.map(packageCard).join("")}</div>` : `<p>No fixed package yet. <a href="${bookUrl({ package: "custom", destination: d.name })}">Request a customised trip</a>.</p>`}
      <h2 class="mt">More in ${d.region === "Kerala" ? "Kerala" : "Kanyakumari"}</h2><div class="grid">${near.map(destCard).join("")}</div></div></section>`;
    initGallery();
  };

  pages.packages = () => {
    setMeta("Travel Packages", "Kerala and Kanyakumari tour packages: one-day, weekend, family, friends, honeymoon and customised trips from Oppam Travels.");
    const cat = qs.get("type") || "all";
    app.innerHTML = `${head("Travel packages", "Ready-made trips you can book as they are, or change to suit you.")}
    <section class="section"><div class="wrap"><div class="filters scroll" role="group" aria-label="Filter packages">${window.PACKAGE_TYPES.map(([k, t]) => `<button class="chip ${k === cat ? "on" : ""}" data-f="${k}" aria-pressed="${k === cat}">${t}</button>`).join("")}</div><div class="grid" id="items">${P.map(packageCard).join("")}</div>
    <div class="panel custom"><h2>Want something different?</h2><p>Tell us your dates, group size and the places you like. We'll shape a plan around them.</p><a class="btn btn-primary" href="booking.html?package=custom">Request a customised package</a></div></div></section>`;
    filterGrid("type", cat);
  };

  pages.package = () => {
    const p = byId(P, qs.get("id"));
    if (!p) { setMeta("Package not found"); app.innerHTML = notFound("package", "packages.html"); return; }
    const ds = p.destinations.map((i) => byId(D, i));
    setMeta(p.name, `${p.name}: ${duration(p)}. ${ds.map((d) => d.name).join(", ") || "Customised Kerala tour"}. Book with Oppam Travels.`);
    const images = p.image ? [p.image, ...ds.map((d) => d.images[0])].slice(0, 3) : (ds.length ? ds.map((d) => d.images[0]).slice(0, 3) : ["images/destinations/munnar-1.svg"]);
    app.innerHTML = `<section class="section"><div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="packages.html">Packages</a> / ${esc(p.name)}</nav>
      <div class="split top">${gallery(images, p.name)}<div><h1>${esc(p.name)}</h1>
      <div class="facts"><div><small>Duration</small><strong>${duration(p)}</strong></div><div><small>Destinations</small><strong>${ds.length ? ds.map((d) => esc(d.name)).join(", ") : "Chosen by you"}</strong></div></div>
      <div class="price-box">${priceHtml(p)}<small>${esc(p.priceNote)}</small></div>
      <div class="btns"><a class="btn btn-primary" href="${bookUrl({ package: p.id })}">Book Now</a><a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink(`Hello Oppam Travels, I would like details of the "${p.name}" package.`)}">${IC.wa}Ask on WhatsApp</a></div></div></div>
      <div class="grid two mt"><div class="panel"><h2>Sightseeing included</h2>${ds.length ? `<ul class="ticks">${ds.map((d) => `<li><a href="destination.html?id=${d.id}">${esc(d.name)}</a>: ${esc(d.attractions.slice(0, 3).join(", "))}</li>`).join("")}</ul>` : "<p>Any places in Kerala you like. We'll plan the route with you.</p>"}</div>
      <div class="panel"><h2>What's included</h2>${list(p.inclusions)}<p class="small muted">Hotels, meals and entry tickets: please confirm with Oppam Travels when you enquire.</p></div></div>
      <h2 class="mt">Vehicle options</h2><div class="grid vehicles">${p.vehicles.map((i) => vehicleCard(byId(V, i))).join("")}</div></div></section>`;
    initGallery();
  };

  pages.booking = () => {
    setMeta("Book Your Trip", "Send your trip request to Oppam Travels on WhatsApp: choose destination, dates, vehicle and package.");
    const today = new Date().toISOString().slice(0, 10);
    const demo = S.whatsapp === "919000000000";
    app.innerHTML = `${head("Book your trip", "Fill in your plan and send it to us on WhatsApp. We'll reply with availability and price.")}
    <section class="section"><div class="wrap narrow">
      ${demo ? `<div class="notice warn">Setup needed: the WhatsApp number in <code>js/config.js</code> is still the placeholder.</div>` : ""}
      <form id="bk" class="form" novalidate>
        <div class="row"><label>Your name<input name="name" autocomplete="name" required><small class="err"></small></label><label>Mobile number<input name="mobile" type="tel" inputmode="tel" autocomplete="tel" placeholder="e.g. 98765 43210" required><small class="err"></small></label></div>
        <div class="row"><label>Starting location<input name="from" autocomplete="off" required><small class="err"></small></label><label>Destination<input name="destination" list="dl-dest" autocomplete="off" required><small class="err"></small></label></div>
        <div class="row"><label>Travel date<input name="date" type="date" min="${today}" required><small class="err"></small></label><label>Return date <span class="opt">(optional for one-way)</span><input name="ret" type="date" min="${today}"><small class="err"></small></label></div>
        <div class="row"><label>Number of passengers<input name="pax" type="number" min="1" max="60" inputmode="numeric" required><small class="err"></small></label>
        <label>Preferred vehicle<select name="vehicle"><option value="">No preference</option>${V.map((v) => `<option value="${v.id}">${esc(v.name)}</option>`).join("")}</select></label></div>
        <label>Preferred travel package<select name="package"><option value="">Vehicle only, no package</option><option value="custom">Customised package request</option>${P.filter((p) => p.id !== "custom-kerala").map((p) => `<option value="${p.id}">${esc(p.name)} (${duration(p)})</option>`).join("")}</select></label>
        <label>Additional requirements<textarea name="notes" rows="4" maxlength="600" placeholder="Pickup point, child seat, luggage, places you'd like to visit…"></textarea></label>
        <datalist id="dl-dest">${D.map((d) => `<option value="${esc(d.name)}">`).join("")}</datalist>
        <button class="btn btn-wa big" type="submit">${IC.wa}Book via WhatsApp</button>
        <p class="small muted">This sends a booking request. Your trip is confirmed only when Oppam Travels replies and agrees the details.</p>
        <div id="sent" class="notice" hidden>WhatsApp should now be open with your message ready. Press <strong>Send</strong> there to reach us. If nothing opened, <a id="fallback" target="_blank" rel="noopener" href="#">tap here to open WhatsApp</a>.</div>
      </form></div></section>`;
    initBooking();
  };

  pages.contact = () => {
    setMeta("Contact Us", "Call or message Oppam Travels on WhatsApp for vehicle rental and Kerala & Kanyakumari tour packages.");
    app.innerHTML = `${head("Contact us", "Questions about a trip, a vehicle or a price? Reach us any of these ways.")}
    <section class="section"><div class="wrap split top"><div class="stack">
      <a class="contact-card" href="tel:${esc(S.phone)}">${IC.call}<span><strong>Call</strong>${esc(S.phoneDisplay)}</span></a>
      <a class="contact-card" target="_blank" rel="noopener" href="${waLink("Hello Oppam Travels!")}">${IC.wa}<span><strong>WhatsApp</strong>Message us</span></a>
      ${S.email ? `<a class="contact-card" href="mailto:${esc(S.email)}"><span><strong>Email</strong>${esc(S.email)}</span></a>` : ""}
      <div class="contact-card">${IC.pin}<span><strong>${esc(S.owner)} · ${esc(S.coordinatorTitle)}</strong>${esc(S.address)}<br>${esc(S.hours)}${S.mapLink ? `<br><a href="${esc(S.mapLink)}" target="_blank" rel="noopener">Open in Maps</a>` : ""}</span></div></div>
      <form id="cf" class="form panel" novalidate><h2>Send a quick message</h2><label>Your name<input name="name" autocomplete="name" required><small class="err"></small></label><label>Mobile number<input name="mobile" type="tel" inputmode="tel" required><small class="err"></small></label><label>Message<textarea name="msg" rows="4" required></textarea><small class="err"></small></label><button class="btn btn-wa" type="submit">${IC.wa}Send on WhatsApp</button></form></div></section>`;
    const f = document.getElementById("cf");
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      const ok = validate(f, { name: (v) => (v.trim().length < 2 ? "Enter your name." : ""), mobile: phoneRule, msg: (v) => (v.trim().length < 5 ? "Write a short message." : "") });
      if (!ok) return;
      const d = new FormData(f);
      openWA(`*Message – ${S.name} website*\nName: ${d.get("name")}\nMobile: ${d.get("mobile")}\n\n${d.get("msg")}`);
    });
  };

  /* ---------- shared widgets ---------- */
  function filterGrid(attr, initial, withSearch) {
    const items = [...document.querySelectorAll("#items > *")];
    let f = initial, q = "";
    const apply = () => {
      let shown = 0;
      items.forEach((el) => {
        const key = attr === "group" ? el.dataset.group : attr === "region" ? el.dataset.region : el.dataset.type;
        const ok = (f === "all" || key === f) && (!q || (el.dataset.name || "").includes(q));
        el.hidden = !ok; if (ok) shown++;
      });
      const none = document.getElementById("none"); if (none) none.hidden = shown > 0;
    };
    document.querySelectorAll(".filters .chip").forEach((b) => b.addEventListener("click", () => {
      f = b.dataset.f;
      document.querySelectorAll(".filters .chip").forEach((x) => { const on = x === b; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on); });
      apply();
    }));
    if (withSearch) document.getElementById("q").addEventListener("input", (e) => { q = e.target.value.trim().toLowerCase(); apply(); });
    apply();
  }

  function gallery(images, alt) {
    return `<div class="gallery"><button class="g-main media" data-open aria-label="Enlarge photo">${img(images[0], alt)}</button>${images.length > 1 ? `<div class="g-thumbs">${images.map((s, i) => `<button class="g-thumb ${i === 0 ? "on" : ""}" data-src="${esc(s)}" aria-label="Show photo ${i + 1}">${img(s, alt)}</button>`).join("")}</div>` : ""}</div>`;
  }
  function initGallery() {
    const main = document.querySelector(".g-main img"); if (!main) return;
    document.querySelectorAll(".g-thumb").forEach((t) => t.addEventListener("click", () => {
      const inner = t.querySelector("img");
      main.dataset.fb = ""; main.src = inner.currentSrc || inner.src;
      document.querySelectorAll(".g-thumb").forEach((x) => x.classList.toggle("on", x === t));
    }));
    document.querySelector("[data-open]").addEventListener("click", () => {
      const lb = document.getElementById("lightbox"); lb.querySelector("img").src = main.src; lb.querySelector("img").alt = main.alt;
      lb.showModal();
    });
  }

  function openWA(text) {
    const url = waLink(text);
    const w = window.open(url, "_blank", "noopener");
    if (!w) location.href = url;
    return url;
  }
  const phoneRule = (v) => (/^\+?\d{10,13}$/.test(v.replace(/[\s-]/g, "")) ? "" : "Enter a valid mobile number (10 digits).");
  function validate(form, rules) {
    let first = null;
    Object.entries(rules).forEach(([name, rule]) => {
      const el = form.elements[name], msg = rule(el.value, form);
      const out = el.closest("label").querySelector(".err");
      el.setAttribute("aria-invalid", !!msg); if (out) out.textContent = msg;
      if (msg && !first) first = el;
    });
    if (first) first.focus();
    return !first;
  }

  function initBooking() {
    const f = document.getElementById("bk");
    const set = (n, v) => { if (v && f.elements[n]) f.elements[n].value = v; };
    set("from", qs.get("from")); set("destination", qs.get("destination")); set("date", qs.get("date"));
    set("vehicle", byId(V, qs.get("vehicle")) ? qs.get("vehicle") : ""); const pk = qs.get("package"); if (pk === "custom" || byId(P, pk)) set("package", pk);
    const fmt = (s) => { if (!s) return "—"; const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }); };
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      const today = new Date().toISOString().slice(0, 10);
      const ok = validate(f, {
        name: (v) => (v.trim().length < 2 ? "Enter your name." : ""),
        mobile: phoneRule,
        from: (v) => (v.trim().length < 2 ? "Enter your starting location." : ""),
        destination: (v) => (v.trim().length < 2 ? "Enter your destination." : ""),
        date: (v) => (!v ? "Choose your travel date." : v < today ? "Travel date can't be in the past." : ""),
        ret: (v, fm) => (v && fm.elements.date.value && v < fm.elements.date.value ? "Return date must be on or after the travel date." : ""),
        pax: (v) => { const n = Number(v); return !Number.isInteger(n) || n < 1 || n > 60 ? "Enter passengers between 1 and 60." : ""; }
      });
      if (!ok) return;
      const d = Object.fromEntries(new FormData(f));
      const veh = byId(V, d.vehicle), pkg = d.package === "custom" ? { name: "Customised package request" } : byId(P, d.package);
      const msg = [`*NEW TRIP ENQUIRY – ${S.name}*`, `*Travel Coordinator:* ${S.owner}`, `*Contact:* ${S.phoneDisplay}`, "", `*CUSTOMER DETAILS*`, `Name: ${d.name.trim()}`, `Mobile: ${d.mobile.trim()}`, `From: ${d.from.trim()}`, `Destination: ${d.destination.trim()}`, `Travel date: ${fmt(d.date)}`, `Return date: ${fmt(d.ret)}`, `Passengers: ${d.pax}`, `Vehicle: ${veh ? veh.name : "No preference"}`, `Package: ${pkg ? pkg.name : "Vehicle only"}`, `Notes: ${d.notes.trim() || "No additional requirements"}`, "", `*Sent from:* Oppam Travels official website`, "Kindly share vehicle availability, package details and your best quotation. Please confirm the booking only after discussing the final details with me.", "", "Thank you."].join("\n");
      const url = openWA(msg);
      const sent = document.getElementById("sent"); sent.hidden = false; document.getElementById("fallback").href = url; sent.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    f.addEventListener("input", (e) => { const l = e.target.closest("label"); const o = l && l.querySelector(".err"); if (o && o.textContent) { o.textContent = ""; e.target.setAttribute("aria-invalid", "false"); } });
  }

  /* ---------- boot ---------- */
  shell();
  (pages[page] || pages.home)();
})();
