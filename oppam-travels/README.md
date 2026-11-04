# Oppam Tours & Travels — Complete Website

Responsive static website built with HTML, CSS and vanilla JavaScript. No npm install or build step is required.

## Run locally
1. Extract this folder.
2. Open it in VS Code.
3. Install the Live Server extension and choose **Open with Live Server** on `index.html`. Alternatively run `python -m http.server 8000` in this folder and visit `http://localhost:8000`.

## Supplied business details
- Business: Oppam Tours & Travels
- Coordinator name shown in the supplied advertisement: **Pro Abi S**
- Phone / WhatsApp: **7034600898** (India: 91 7034600898)
- Location: **Poovar, Thiruvananthapuram, Kerala**
- Developer credit: **Designed & Developed by Ashwin SJ**

Confirm all business details with the owner before publishing.

## Supplied photos integrated
- `images/logo.png` — supplied Oppam logo
- `images/hero-banner.jpg` — supplied homepage banner
- `images/about-group.jpg` — supplied group travel photo
- `images/vehicles/` — Swift Dzire (4-seater category), Innova Crysta, Ertiga, Force Urbania, Tempo Traveller and luxury bus
- `images/destinations/` — Munnar, Wayanad, Alappuzha, Kochi, Thekkady, Vagamon, Varkala, Kovalam, Kanyakumari Beach, Vivekananda Rock Memorial and Thirparappu Falls
- `images/packages/` — dedicated Kerala family, Kerala honeymoon, Munnar, Munnar–Thekkady and Varkala–Kovalam package photos

All displayed photos are stored locally in this project. The website does not load stock photos from online image services. Destinations for which no photo was supplied still use local SVG placeholders; replace those with client-approved photos whenever available. The Thiruvalluvar Statue card currently uses a local placeholder until a dedicated photograph is supplied.

## Update contact and content
- `js/config.js` — phone, WhatsApp, address, coordinator name, hours, social links and developer credit.
- `js/data/vehicles.js` — vehicle models, seating, facilities and prices. The Swift Dzire is assigned to the 4-seater category. Categories without a matching client-supplied photo use a local SVG placeholder rather than duplicating another vehicle photo.
- `js/data/destinations.js` — destination text and photo mapping.
- `js/data/packages.js` — package descriptions and prices. Prices are intentionally left as “Price on request”.

## WhatsApp booking
The booking form validates the details and opens a pre-filled WhatsApp enquiry to `+91 7034600898`. The customer must press Send in WhatsApp. This does not confirm a booking; the travel company must confirm availability and price.

## Before publishing
1. Confirm the phone number, coordinator name, location and business hours with the owner.
2. Confirm vehicle models, seat counts, AC status, luggage, facilities and pricing.
3. Replace sample testimonials in `js/config.js` with genuine customer reviews or remove them.
4. Add approved photos for destinations that still show local placeholders.
5. Verify permission/licensing for all supplied photos.
6. Test the booking flow on a phone and desktop.

## Pages
Home · About Us · Vehicles · Vehicle Details · Destinations · Destination Details · Packages · Package Details · Booking · Contact.
