const { useState, useEffect, useRef } = React;
const Icon = ({ size = 16, color = "currentColor", strokeWidth = 2 }) => (
  <span aria-hidden="true" style={{ display: "inline-block", width: size, height: size, color, fontSize: size * 0.9, lineHeight: `${size}px`, fontWeight: strokeWidth > 2 ? 700 : 400, textAlign: "center" }}>•</span>
);
const iconNames = [
  "Home", "ShoppingBag", "Wrench", "Heart", "User", "Search", "Bell", "ChevronRight",
  "ChevronLeft", "Star", "MapPin", "Clock", "Phone", "Check", "X", "Plus", "ArrowRight",
  "Calendar", "Truck", "Car", "Bike", "Settings", "LogOut", "FileText", "ShieldCheck",
  "Fuel", "Gauge", "Palette", "MessageCircle", "Download", "RotateCcw", "CheckCircle2",
  "Circle", "ArrowLeft", "Mail", "Lock", "Eye", "EyeOff", "ChevronDown", "Sparkles",
  "BatteryCharging", "Wind", "Disc", "Package", "PhoneCall", "Navigation2",
];
const icons = Object.fromEntries(iconNames.map((name) => [name, Icon]));
const { Home, ShoppingBag, Wrench, Heart, User, Search, Bell, ChevronRight,
  ChevronLeft, Star, MapPin, Clock, Phone, Check, X, Plus, ArrowRight,
  Calendar, Truck, Car, Bike, Settings, LogOut, FileText, ShieldCheck,
  Fuel, Gauge, Palette, MessageCircle, Download, RotateCcw, CheckCircle2,
  Circle, ArrowLeft, Mail, Lock, Eye, EyeOff, ChevronDown, Sparkles,
  BatteryCharging, Wind, Disc, Package, PhoneCall, Navigation2 } = icons;

/* ============================== THEME ============================== */
const T = {
  ink: "#0D1013",
  ink2: "#15181D",
  panel: "#1B1F26",
  panelLine: "#2A2F38",
  ivory: "#F6F4EF",
  ivoryDim: "#EDEAE2",
  paper: "#FBFAF7",
  copper: "#C6813E",
  copperLight: "#E3A968",
  teal: "#35C9A5",
  amber: "#E8B34A",
  red: "#E2604F",
  textHi: "#F3F1EC",
  textLo: "#9AA0AA",
  textInkHi: "#181A1D",
  textInkLo: "#6B7178",
};

const FONTS = (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
    .f-display{font-family:'Space Grotesk',sans-serif;}
    .f-body{font-family:'Inter',sans-serif;}
    .f-mono{font-family:'IBM Plex Mono',monospace;}
    .noscroll::-webkit-scrollbar{display:none;}
    .noscroll{-ms-overflow-style:none;scrollbar-width:none;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes pulseRing{0%{box-shadow:0 0 0 0 rgba(198,129,62,0.45)}70%{box-shadow:0 0 0 10px rgba(198,129,62,0)}100%{box-shadow:0 0 0 0 rgba(198,129,62,0)}}
    @keyframes spinSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes dash{0%{stroke-dashoffset:120}100%{stroke-dashoffset:0}}
    .anim-fadeUp{animation:fadeUp .5s ease both;}
    .anim-fadeIn{animation:fadeIn .4s ease both;}
    .anim-pulse{animation:pulseRing 2s infinite;}
    .anim-spin-slow{animation:spinSlow 6s linear infinite;}
  `}</style>
);

/* ============================== MOCK DATA ============================== */
const CATEGORIES = ["All", "New Arrivals", "Popular", "Cars", "Bikes", "Accessories", "Offers"];

const PRODUCTS = [
  { id: "p1", name: "Aventra GT Coupe", category: "Cars", tag: "New Arrival", price: 4899000, oldPrice: 5199000, rating: 4.8, reviews: 214, seed: "aventra-gt", desc: "A precision-tuned grand tourer built for long, quiet highways and short, loud bursts of it.", specs: { Engine: "3.0L Turbo I6", Power: "382 bhp", "0–100": "4.6s", Transmission: "8-Speed Auto" }, colors: ["#1B1F26", "#C6813E", "#F6F4EF"] },
  { id: "p2", name: "Solace Sedan Elite", category: "Cars", tag: "Popular", price: 2199000, oldPrice: null, rating: 4.6, reviews: 532, seed: "solace-sedan", desc: "The everyday premium sedan — quiet cabin, calm ride, and a dashboard that gets out of your way.", specs: { Engine: "2.0L Hybrid", Power: "215 bhp", Mileage: "22 km/l", Transmission: "CVT" }, colors: ["#15181D", "#9AA0AA", "#C6813E"] },
  { id: "p3", name: "Ridgeback SUV X7", category: "Cars", tag: "Offers", price: 3799000, oldPrice: 4099000, rating: 4.7, reviews: 388, seed: "ridgeback-suv", desc: "Seven seats, all-wheel confidence, and a boot big enough to argue about on the way home.", specs: { Engine: "2.5L Turbo", Power: "265 bhp", Seating: "7", Drive: "AWD" }, colors: ["#1B1F26", "#35C9A5"] },
  { id: "p4", name: "Kestrel 650 Roadster", category: "Bikes", tag: "New Arrival", price: 589000, oldPrice: null, rating: 4.9, reviews: 176, seed: "kestrel-650", desc: "Naked, light, and tuned for the kind of corners that make you late on purpose.", specs: { Engine: "648cc Twin", Power: "68 bhp", Weight: "192 kg", Tank: "15 L" }, colors: ["#E2604F", "#15181D"] },
  { id: "p5", name: "Voyager Tourer 400", category: "Bikes", tag: "Popular", price: 349000, oldPrice: 379000, rating: 4.5, reviews: 298, seed: "voyager-400", desc: "Built for the 400 km days — upright seating, long-travel suspension, and a screen that actually works.", specs: { Engine: "411cc Single", Power: "27 bhp", Weight: "182 kg", Tank: "13 L" }, colors: ["#C6813E", "#F6F4EF"] },
  { id: "p6", name: "Ember City 125", category: "Bikes", tag: "Offers", price: 118000, oldPrice: 129000, rating: 4.4, reviews: 641, seed: "ember-125", desc: "The commuter that doesn't feel like a compromise. Light, frugal, and easy to park anywhere.", specs: { Engine: "125cc", Mileage: "58 km/l", Weight: "118 kg", Tank: "9 L" }, colors: ["#35C9A5", "#1B1F26"] },
  { id: "p7", name: "AllTerrain Alloy Set 18\"", category: "Accessories", tag: "Popular", price: 64000, oldPrice: null, rating: 4.6, reviews: 89, desc: "Forged alloy wheel set, balanced and ready to bolt on. Fits most mid-size SUVs.", specs: { Size: "18 inch", Material: "Forged Alloy", Set: "4 wheels", Warranty: "3 yrs" }, colors: ["#15181D", "#9AA0AA"], seed: "alloy-set" },
  { id: "p8", name: "Dashcam Pro 4K Duo", category: "Accessories", tag: "New Arrival", price: 12500, oldPrice: 14900, rating: 4.3, reviews: 412, desc: "Front and rear 4K recording with night vision and a companion app for quick clips.", specs: { Resolution: "4K + 1080p", Storage: "128GB incl.", "Night Vision": "Yes", Warranty: "1 yr" }, colors: ["#1B1F26"], seed: "dashcam" },
];

const IMG = (seed, w = 800, h = 600) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

const OFFERS = [
  { id: "o1", title: "Monsoon Service Special", subtitle: "20% off on general service, this week only", seed: "offer-service" },
  { id: "o2", title: "Ridgeback X7 Launch", subtitle: "Book a test drive and get accessory credit", seed: "offer-suv" },
  { id: "o3", title: "Trade-In Bonus", subtitle: "Extra value on your old bike this month", seed: "offer-tradein" },
];

const SERVICE_TYPES = [
  { id: "s1", name: "General Service", icon: Wrench, desc: "Full checkup & fluids" },
  { id: "s2", name: "Oil Change", icon: Fuel, desc: "Engine oil & filter" },
  { id: "s3", name: "Repair", icon: Settings, desc: "Diagnose & fix issues" },
  { id: "s4", name: "Inspection", icon: ShieldCheck, desc: "Pre-purchase / periodic" },
  { id: "s5", name: "AC Service", icon: Wind, desc: "Cooling system check" },
  { id: "s6", name: "Battery", icon: BatteryCharging, desc: "Test & replace" },
  { id: "s7", name: "Tyres", icon: Disc, desc: "Rotation & replacement" },
  { id: "s8", name: "Accessories", icon: Package, desc: "Fitment & upgrades" },
];

const SERVICE_CENTERS = [
  { id: "c1", name: "Northline Service Hub", distance: "1.8 km", rating: 4.7, address: "12 Northline Ave, Sector 4", hours: "9:00 AM – 7:00 PM", phone: "+91 98765 43210" },
  { id: "c2", name: "Prime Motors Workshop", distance: "3.2 km", rating: 4.5, address: "45 MG Road, near Metro Station", hours: "8:30 AM – 6:30 PM", phone: "+91 98765 11223" },
  { id: "c3", name: "速 AutoCare Express", distance: "5.6 km", rating: 4.8, address: "Plot 9, Industrial Layout", hours: "9:00 AM – 8:00 PM", phone: "+91 98765 99887" },
];

const TIME_SLOTS = ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "04:30 PM"];

const BOOKING_HISTORY = [
  { id: "SRV-2026-00118", date: "25 Aug 2026", product: "Solace Sedan Elite", type: "General Service", center: "Northline Service Hub", amount: 4850, status: "Completed" },
  { id: "SRV-2026-00104", date: "02 Jul 2026", product: "Kestrel 650 Roadster", type: "Tyres", center: "Prime Motors Workshop", amount: 8200, status: "Completed" },
  { id: "SRV-2026-00097", date: "14 Jun 2026", product: "Solace Sedan Elite", type: "AC Service", center: "Northline Service Hub", amount: 0, status: "Cancelled" },
];

const NOTIFICATIONS = [
  { id: "n1", category: "Booking updates", title: "Your vehicle is ready for pickup", time: "10 min ago", read: false },
  { id: "n2", category: "Service reminders", title: "Your service is scheduled for tomorrow, 10:30 AM", time: "2 hr ago", read: false },
  { id: "n3", category: "Offers", title: "20% OFF on your next service", time: "1 day ago", read: true },
  { id: "n4", category: "Product updates", title: "Ridgeback SUV X7 is now available near you", time: "3 days ago", read: true },
];

const inr = (n) => (n === 0 ? "Included" : "₹" + n.toLocaleString("en-IN"));

/* ============================== SMALL UI ATOMS ============================== */
const Btn = ({ children, onClick, variant = "primary", full, disabled, size = "md", icon: Icon }) => {
  const base = "f-body font-semibold flex items-center justify-center gap-2 rounded-2xl transition-all active:scale-[0.97] disabled:opacity-40";
  const sizes = { md: "px-5 py-3.5 text-sm", sm: "px-4 py-2.5 text-xs" };
  const styles = {
    primary: { background: `linear-gradient(135deg, ${T.copperLight}, ${T.copper})`, color: T.textInkHi },
    dark: { background: T.ink, color: T.textHi, border: `1px solid ${T.panelLine}` },
    outline: { background: "transparent", color: T.textHi, border: `1px solid ${T.panelLine}` },
    ghost: { background: T.panel, color: T.textHi },
  };
  return (
    <button disabled={disabled} onClick={onClick} className={`${base} ${sizes[size]} ${full ? "w-full" : ""}`} style={styles[variant]}>
      {Icon && <Icon size={16} strokeWidth={2.2} />}
      {children}
    </button>
  );
};

const Chip = ({ children, active, onClick }) => (
  <button onClick={onClick} className="f-body text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-all"
    style={active ? { background: T.copper, color: T.textInkHi } : { background: T.panel, color: T.textLo, border: `1px solid ${T.panelLine}` }}>
    {children}
  </button>
);

const Stars = ({ rating, size = 12 }) => (
  <div className="flex items-center gap-1">
    <Star size={size} fill={T.amber} color={T.amber} />
    <span className="f-mono text-xs" style={{ color: T.textLo }}>{rating}</span>
  </div>
);

const SectionHeader = ({ title, action, onAction }) => (
  <div className="flex items-center justify-between px-5 mb-3">
    <h3 className="f-display text-base font-semibold" style={{ color: T.textHi }}>{title}</h3>
    {action && (
      <button onClick={onAction} className="f-body text-xs font-semibold flex items-center gap-0.5" style={{ color: T.copperLight }}>
        {action}<ChevronRight size={14} />
      </button>
    )}
  </div>
);

const IconCircle = ({ icon: Icon, label, onClick, tone = "panel" }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-2 anim-fadeUp">
    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: tone === "copper" ? `${T.copper}22` : T.panel, border: `1px solid ${T.panelLine}` }}>
      <Icon size={20} color={tone === "copper" ? T.copperLight : T.textHi} strokeWidth={2} />
    </div>
    <span className="f-body text-[11px] text-center leading-tight" style={{ color: T.textLo, width: 64 }}>{label}</span>
  </button>
);

const EmptyState = ({ icon: Icon, title, subtitle, action, onAction }) => (
  <div className="flex flex-col items-center justify-center text-center px-10 py-16 anim-fadeIn">
    <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5" style={{ background: T.panel, border: `1px solid ${T.panelLine}` }}>
      <Icon size={30} color={T.copperLight} strokeWidth={1.6} />
    </div>
    <h4 className="f-display text-base font-semibold mb-1.5" style={{ color: T.textHi }}>{title}</h4>
    <p className="f-body text-xs mb-6 leading-relaxed" style={{ color: T.textLo }}>{subtitle}</p>
    {action && <Btn onClick={onAction} size="sm">{action}</Btn>}
  </div>
);

const StatusPill = ({ status }) => {
  const map = {
    Completed: { bg: `${T.teal}22`, c: T.teal },
    Cancelled: { bg: `${T.red}22`, c: T.red },
    Upcoming: { bg: `${T.amber}22`, c: T.amber },
  };
  const s = map[status] || map.Upcoming;
  return <span className="f-body text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: s.bg, color: s.c }}>{status}</span>;
};

/* ============================== SCREENS ============================== */

function SplashScreen({ onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2200); return () => clearTimeout(t); }, []);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center" style={{ background: `radial-gradient(circle at 50% 30%, ${T.ink2}, ${T.ink})` }}>
      <div className="relative flex items-center justify-center mb-6">
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center anim-pulse" style={{ background: `linear-gradient(135deg, ${T.copperLight}, ${T.copper})` }}>
          <Gauge size={38} color={T.textInkHi} strokeWidth={2.2} />
        </div>
      </div>
      <h1 className="f-display text-2xl font-bold tracking-wide anim-fadeUp" style={{ color: T.textHi }}>AUTOVERA</h1>
      <p className="f-body text-xs mt-1.5 tracking-[0.2em] anim-fadeUp" style={{ color: T.textLo }}>SHOWROOM &amp; SERVICE</p>
      <div className="mt-10 w-32 h-[3px] rounded-full overflow-hidden" style={{ background: T.panel }}>
        <div className="h-full rounded-full" style={{ background: T.copper, animation: "loadbar 2s ease forwards" }} />
      </div>
      <style>{`@keyframes loadbar{from{width:0%}to{width:100%}}`}</style>
    </div>
  );
}

const ONBOARD = [
  { title: "Explore. Discover. Choose.", desc: "Explore our latest products from the comfort of your phone.", seed: "onb-1", icon: ShoppingBag },
  { title: "Everything in One Place", desc: "Compare products, discover offers and save your favorites.", seed: "onb-2", icon: Heart },
  { title: "Service Made Simple", desc: "Book, track and manage your service anytime.", seed: "onb-3", icon: Wrench },
];

function OnboardingScreen({ onFinish }) {
  const [i, setI] = useState(0);
  const step = ONBOARD[i];
  return (
    <div className="w-full h-full flex flex-col" style={{ background: T.ink }}>
      <div className="flex justify-end px-5 pt-5">
        <button onClick={onFinish} className="f-body text-xs font-semibold" style={{ color: T.textLo }}>Skip</button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-8 anim-fadeIn" key={i}>
        <div className="w-full aspect-square rounded-3xl mb-8 overflow-hidden relative" style={{ background: T.panel }}>
          <img src={IMG(step.seed, 500, 500)} className="w-full h-full object-cover opacity-70" alt="" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-md" style={{ background: "rgba(198,129,62,0.85)" }}>
              <step.icon size={26} color={T.textInkHi} />
            </div>
          </div>
        </div>
        <h2 className="f-display text-xl font-bold text-center mb-3" style={{ color: T.textHi }}>{step.title}</h2>
        <p className="f-body text-sm text-center leading-relaxed" style={{ color: T.textLo }}>{step.desc}</p>
      </div>
      <div className="flex items-center justify-center gap-2 mb-6">
        {ONBOARD.map((_, idx) => (
          <div key={idx} className="rounded-full transition-all" style={{ width: idx === i ? 22 : 7, height: 7, background: idx === i ? T.copper : T.panelLine }} />
        ))}
      </div>
      <div className="px-6 pb-8">
        <Btn full onClick={() => (i < 2 ? setI(i + 1) : onFinish())} icon={i === 2 ? undefined : ChevronRight}>
          {i === 2 ? "Get Started" : "Next"}
        </Btn>
      </div>
    </div>
  );
}

function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [showPw, setShowPw] = useState(false);
  return (
    <div className="w-full h-full overflow-y-auto noscroll" style={{ background: T.ink }}>
      <div className="px-7 pt-12 pb-8 anim-fadeUp">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: `linear-gradient(135deg, ${T.copperLight}, ${T.copper})` }}>
          <Gauge size={22} color={T.textInkHi} />
        </div>
        <h1 className="f-display text-2xl font-bold mb-1.5" style={{ color: T.textHi }}>{mode === "login" ? "Welcome back" : "Create account"}</h1>
        <p className="f-body text-sm mb-8" style={{ color: T.textLo }}>{mode === "login" ? "Log in to continue to Autovera" : "Sign up to explore the showroom & service"}</p>

        <div className="space-y-3.5">
          {mode === "signup" && (
            <Field icon={User} placeholder="Full name" />
          )}
          <Field icon={Mail} placeholder="Mobile number or email" />
          {mode === "signup" && <Field icon={Phone} placeholder="Mobile number" />}
          <Field icon={Lock} placeholder="Password" type={showPw ? "text" : "password"} rightIcon={showPw ? EyeOff : Eye} onRight={() => setShowPw(!showPw)} />
          {mode === "signup" && <Field icon={Lock} placeholder="Confirm password" type="password" />}
        </div>

        {mode === "login" && (
          <div className="flex items-center justify-between mt-4 mb-1">
            <label className="flex items-center gap-2 f-body text-xs" style={{ color: T.textLo }}>
              <input type="checkbox" className="accent-current" /> Remember me
            </label>
            <button className="f-body text-xs font-semibold" style={{ color: T.copperLight }}>Forgot password?</button>
          </div>
        )}

        <div className="mt-7">
          <Btn full onClick={onLogin}>{mode === "login" ? "Log In" : "Create Account"}</Btn>
        </div>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1" style={{ background: T.panelLine }} />
          <span className="f-body text-[11px]" style={{ color: T.textLo }}>OR</span>
          <div className="h-px flex-1" style={{ background: T.panelLine }} />
        </div>

        <Btn full variant="outline" onClick={onLogin}>Continue with Google</Btn>

        <p className="f-body text-xs text-center mt-8" style={{ color: T.textLo }}>
          {mode === "login" ? "New here?" : "Already have an account?"}{" "}
          <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="font-semibold" style={{ color: T.copperLight }}>
            {mode === "login" ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}

function Field({ icon: Icon, placeholder, type = "text", rightIcon: RightIcon, onRight }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl" style={{ background: T.panel, border: `1px solid ${T.panelLine}` }}>
      <Icon size={17} color={T.textLo} />
      <input type={type} placeholder={placeholder} className="flex-1 bg-transparent outline-none f-body text-sm" style={{ color: T.textHi }} />
      {RightIcon && <button onClick={onRight}><RightIcon size={16} color={T.textLo} /></button>}
    </div>
  );
}

/* --------- HOME --------- */
function HomeScreen({ go, wishlist, toggleWish, unreadCount, upcoming }) {
  return (
    <Screen>
      <TopBar unreadCount={unreadCount} onBell={() => go("notifications")} onProfile={() => go("profile")} />
      <div className="px-5 pb-3">
        <SearchBar onClick={() => go("search")} />
      </div>

      <div className="px-5 pb-6 grid grid-cols-2 gap-3">
        <FeatureCard title="Online Showroom" subtitle="Explore our latest products" cta="Explore Now" seed="feature-showroom" onClick={() => go("showroom")} />
        <FeatureCard title="Service Center" subtitle="Book and manage your service" cta="Book Service" seed="feature-service" onClick={() => go("service")} tone="teal" />
      </div>

      <SectionHeader title="Featured Products" action="View All" onAction={() => go("showroom")} />
      <div className="flex gap-3.5 overflow-x-auto noscroll px-5 pb-7">
        {PRODUCTS.slice(0, 5).map((p) => (
          <ProductCard key={p.id} p={p} wishlist={wishlist} toggleWish={toggleWish} onClick={() => go("product", p)} compact />
        ))}
      </div>

      <SectionHeader title="Latest Offers" />
      <OfferCarousel />

      <div className="px-5 mt-8 mb-2">
        <h3 className="f-display text-base font-semibold mb-4" style={{ color: T.textHi }}>Quick Actions</h3>
        <div className="grid grid-cols-4 gap-2">
          <IconCircle icon={Wrench} label="Book Service" onClick={() => go("book")} tone="copper" />
          <IconCircle icon={FileText} label="Service History" onClick={() => go("history")} />
          <IconCircle icon={Heart} label="Wishlist" onClick={() => go("wishlist")} />
          <IconCircle icon={MessageCircle} label="Contact Support" onClick={() => go("centers")} />
        </div>
      </div>

      <div className="px-5 mt-8 pb-6">
        {upcoming ? (
          <div className="rounded-3xl p-5 anim-fadeUp" style={{ background: `linear-gradient(135deg, ${T.panel}, ${T.ink2})`, border: `1px solid ${T.panelLine}` }}>
            <div className="flex items-center justify-between mb-4">
              <span className="f-body text-[11px] font-semibold tracking-wide" style={{ color: T.copperLight }}>UPCOMING SERVICE</span>
              <Clock size={14} color={T.textLo} />
            </div>
            <p className="f-display text-sm font-semibold mb-3" style={{ color: T.textHi }}>{upcoming.product}</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <InfoRow label="Service" value={upcoming.type} />
              <InfoRow label="Date" value={upcoming.date} />
              <InfoRow label="Time" value={upcoming.time} />
              <InfoRow label="Center" value={upcoming.center} />
            </div>
            <Btn full size="sm" onClick={() => go("tracking")}>View Details</Btn>
          </div>
        ) : (
          <div className="rounded-3xl p-6 text-center anim-fadeUp" style={{ background: T.panel, border: `1px dashed ${T.panelLine}` }}>
            <p className="f-body text-xs mb-4" style={{ color: T.textLo }}>Your next service is just a few taps away.</p>
            <Btn size="sm" onClick={() => go("book")}>Book Service</Btn>
          </div>
        )}
      </div>
    </Screen>
  );
}

const InfoRow = ({ label, value }) => (
  <div>
    <p className="f-body text-[10px]" style={{ color: T.textLo }}>{label}</p>
    <p className="f-body text-xs font-semibold" style={{ color: T.textHi }}>{value}</p>
  </div>
);

function TopBar({ unreadCount, onBell, onProfile }) {
  return (
    <div className="flex items-center justify-between px-5 pt-6 pb-4">
      <div>
        <p className="f-body text-xs" style={{ color: T.textLo }}>Good morning</p>
        <h2 className="f-display text-lg font-bold" style={{ color: T.textHi }}>Arjun Mehta</h2>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={onBell} className="w-10 h-10 rounded-full flex items-center justify-center relative" style={{ background: T.panel, border: `1px solid ${T.panelLine}` }}>
          <Bell size={17} color={T.textHi} />
          {unreadCount > 0 && <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full" style={{ background: T.red }} />}
        </button>
        <button onClick={onProfile} className="w-10 h-10 rounded-full overflow-hidden" style={{ border: `1px solid ${T.panelLine}` }}>
          <img src={IMG("avatar-user", 100, 100)} className="w-full h-full object-cover" alt="" />
        </button>
      </div>
    </div>
  );
}

function SearchBar({ onClick, value, onChange, placeholder = "Search products, services…" }) {
  return (
    <div onClick={onClick} className="flex items-center gap-2.5 px-4 py-3 rounded-2xl cursor-text" style={{ background: T.panel, border: `1px solid ${T.panelLine}` }}>
      <Search size={16} color={T.textLo} />
      {onChange ? (
        <input value={value} onChange={onChange} placeholder={placeholder} className="flex-1 bg-transparent outline-none f-body text-sm" style={{ color: T.textHi }} />
      ) : (
        <span className="f-body text-sm" style={{ color: T.textLo }}>{placeholder}</span>
      )}
    </div>
  );
}

function FeatureCard({ title, subtitle, cta, seed, onClick, tone = "copper" }) {
  const grad = tone === "copper" ? `linear-gradient(160deg, ${T.copper}, #8a5726)` : `linear-gradient(160deg, ${T.teal}, #1c7d66)`;
  return (
    <button onClick={onClick} className="rounded-3xl overflow-hidden relative text-left h-48 flex flex-col justify-end p-4 anim-fadeUp" style={{ background: grad }}>
      <img src={IMG(seed, 300, 300)} className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity" alt="" />
      <div className="relative z-10">
        <p className="f-display text-sm font-bold leading-tight mb-1" style={{ color: T.textInkHi }}>{title}</p>
        <p className="f-body text-[10.5px] mb-3 leading-snug" style={{ color: "rgba(13,16,19,0.75)" }}>{subtitle}</p>
        <span className="inline-flex items-center gap-1 f-body text-[11px] font-bold px-3 py-1.5 rounded-full" style={{ background: T.ink, color: T.textHi }}>
          {cta} <ArrowRight size={11} />
        </span>
      </div>
    </button>
  );
}

function OfferCarousel() {
  const [idx, setIdx] = useState(0);
  const ref = useRef(null);
  return (
    <div>
      <div ref={ref} onScroll={(e) => setIdx(Math.round(e.target.scrollLeft / e.target.clientWidth))}
        className="flex gap-3 overflow-x-auto noscroll px-5 pb-4 snap-x snap-mandatory">
        {OFFERS.map((o) => (
          <div key={o.id} className="min-w-[85%] snap-center rounded-3xl overflow-hidden relative h-32 flex items-end p-4" style={{ background: T.panel }}>
            <img src={IMG(o.seed, 500, 250)} className="absolute inset-0 w-full h-full object-cover opacity-40" alt="" />
            <div className="relative z-10">
              <p className="f-display text-sm font-bold" style={{ color: T.textHi }}>{o.title}</p>
              <p className="f-body text-[11px]" style={{ color: T.textLo }}>{o.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-1.5">
        {OFFERS.map((_, i) => (
          <div key={i} className="rounded-full transition-all" style={{ width: i === idx ? 16 : 6, height: 6, background: i === idx ? T.copper : T.panelLine }} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ p, wishlist, toggleWish, onClick, compact }) {
  const isWish = wishlist.includes(p.id);
  return (
    <button onClick={onClick} className={`text-left rounded-3xl overflow-hidden flex-shrink-0 anim-fadeUp ${compact ? "w-40" : "w-full"}`} style={{ background: T.panel, border: `1px solid ${T.panelLine}` }}>
      <div className="relative aspect-[4/3]">
        <img src={IMG(p.seed || p.id, 400, 300)} className="w-full h-full object-cover" alt={p.name} />
        {p.tag && <span className="absolute top-2 left-2 f-body text-[9px] font-bold px-2 py-1 rounded-full" style={{ background: T.ink, color: T.copperLight }}>{p.tag}</span>}
        <button onClick={(e) => { e.stopPropagation(); toggleWish(p.id); }} className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(13,16,19,0.6)" }}>
          <Heart size={13} fill={isWish ? T.red : "none"} color={isWish ? T.red : T.textHi} />
        </button>
      </div>
      <div className="p-3">
        <p className="f-body text-xs font-semibold truncate" style={{ color: T.textHi }}>{p.name}</p>
        <p className="f-body text-[10px] mb-1.5" style={{ color: T.textLo }}>{p.category}</p>
        <div className="flex items-center justify-between">
          <p className="f-mono text-xs font-semibold" style={{ color: T.copperLight }}>{inr(p.price)}</p>
          <Stars rating={p.rating} />
        </div>
      </div>
    </button>
  );
}

/* --------- SHOWROOM --------- */
function ShowroomScreen({ go, back, wishlist, toggleWish }) {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const list = PRODUCTS.filter((p) => (cat === "All" || p.category === cat || p.tag === cat) && p.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <Screen>
      <ScreenHeader title="Online Showroom" onBack={back} />
      <div className="px-5 pb-4"><SearchBar value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" /></div>
      <div className="flex gap-2 overflow-x-auto noscroll px-5 pb-5">
        {CATEGORIES.map((c) => <Chip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Chip>)}
      </div>
      {list.length === 0 ? (
        <EmptyState icon={Search} title="No products found" subtitle="Try a different search term or category." />
      ) : (
        <div className="grid grid-cols-2 gap-3.5 px-5 pb-8">
          {list.map((p) => <ProductCard key={p.id} p={p} wishlist={wishlist} toggleWish={toggleWish} onClick={() => go("product", p)} />)}
        </div>
      )}
    </Screen>
  );
}

function ScreenHeader({ title, onBack, right }) {
  return (
    <div className="flex items-center justify-between px-5 pt-6 pb-5">
      <div className="flex items-center gap-3">
        {onBack && <button onClick={onBack} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: T.panel, border: `1px solid ${T.panelLine}` }}><ArrowLeft size={16} color={T.textHi} /></button>}
        <h2 className="f-display text-lg font-bold" style={{ color: T.textHi }}>{title}</h2>
      </div>
      {right}
    </div>
  );
}

/* --------- PRODUCT DETAIL --------- */
function ProductDetailScreen({ product, back, wishlist, toggleWish, go }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [color, setColor] = useState(0);
  const isWish = wishlist.includes(product.id);
  const images = [product.seed, product.seed + "-2", product.seed + "-3"];
  const similar = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <Screen noPadBottom>
      <div className="relative">
        <div className="aspect-[4/3] relative overflow-hidden">
          <img src={IMG(images[imgIdx], 700, 550)} className="w-full h-full object-cover anim-fadeIn" key={imgIdx} alt="" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-6">
            <button onClick={back} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(13,16,19,0.55)" }}><ArrowLeft size={16} color="#fff" /></button>
            <button onClick={() => toggleWish(product.id)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(13,16,19,0.55)" }}>
              <Heart size={16} fill={isWish ? T.red : "none"} color={isWish ? T.red : "#fff"} />
            </button>
          </div>
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
            {images.map((_, i) => <button key={i} onClick={() => setImgIdx(i)} className="rounded-full transition-all" style={{ width: i === imgIdx ? 16 : 6, height: 6, background: i === imgIdx ? T.copper : "rgba(255,255,255,0.5)" }} />)}
          </div>
        </div>

        <div className="px-5 pt-5 pb-32">
          {product.tag && <span className="f-body text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: `${T.copper}22`, color: T.copperLight }}>{product.tag}</span>}
          <h1 className="f-display text-xl font-bold mt-2.5 mb-1.5" style={{ color: T.textHi }}>{product.name}</h1>
          <div className="flex items-center gap-3 mb-4">
            <Stars rating={product.rating} size={14} />
            <span className="f-body text-xs" style={{ color: T.textLo }}>({product.reviews || 0} reviews)</span>
          </div>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="f-mono text-2xl font-bold" style={{ color: T.textHi }}>{inr(product.price)}</span>
            {product.oldPrice && <span className="f-mono text-sm line-through" style={{ color: T.textLo }}>{inr(product.oldPrice)}</span>}
          </div>

          <p className="f-body text-sm leading-relaxed mb-6" style={{ color: T.textLo }}>{product.desc}</p>

          {product.colors && (
            <div className="mb-6">
              <p className="f-body text-xs font-semibold mb-2.5 flex items-center gap-1.5" style={{ color: T.textHi }}><Palette size={13} /> Available colors</p>
              <div className="flex gap-2.5">
                {product.colors.map((c, i) => (
                  <button key={i} onClick={() => setColor(i)} className="w-8 h-8 rounded-full" style={{ background: c, border: color === i ? `2px solid ${T.copperLight}` : `2px solid transparent`, outline: `1px solid ${T.panelLine}`, outlineOffset: 2 }} />
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <p className="f-body text-xs font-semibold mb-2.5" style={{ color: T.textHi }}>Specifications</p>
            <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${T.panelLine}` }}>
              {Object.entries(product.specs || {}).map(([k, v], i) => (
                <div key={k} className="flex items-center justify-between px-4 py-3" style={{ background: i % 2 ? T.ink2 : T.panel }}>
                  <span className="f-body text-xs" style={{ color: T.textLo }}>{k}</span>
                  <span className="f-mono text-xs font-semibold" style={{ color: T.textHi }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {similar.length > 0 && (
            <div className="-mx-5">
              <SectionHeader title="Similar Products" />
              <div className="flex gap-3.5 overflow-x-auto noscroll px-5">
                {similar.map((p) => <ProductCard key={p.id} p={p} wishlist={wishlist} toggleWish={toggleWish} onClick={() => go("product", p)} compact />)}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 px-5 py-4 flex gap-2.5" style={{ background: `linear-gradient(0deg, ${T.ink} 70%, transparent)` }}>
        <Btn variant="outline" size="sm" onClick={() => go("book")}>Book a Visit</Btn>
        <Btn size="sm" full icon={MessageCircle} onClick={() => go("book")}>Enquire Now</Btn>
      </div>
    </Screen>
  );
}

/* --------- WISHLIST --------- */
function WishlistScreen({ back, wishlist, toggleWish, go }) {
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));
  return (
    <Screen>
      <ScreenHeader title="Wishlist" onBack={back} />
      {items.length === 0 ? (
        <EmptyState icon={Heart} title="No saved products yet" subtitle="Explore the showroom and save your favorites." action="Explore Showroom" onAction={() => go("showroom")} />
      ) : (
        <div className="grid grid-cols-2 gap-3.5 px-5 pb-8">
          {items.map((p) => <ProductCard key={p.id} p={p} wishlist={wishlist} toggleWish={toggleWish} onClick={() => go("product", p)} />)}
        </div>
      )}
    </Screen>
  );
}

/* --------- SERVICE DASHBOARD --------- */
function ServiceDashboard({ go, back }) {
  return (
    <Screen>
      <ScreenHeader title="Service Center" onBack={back} />
      <p className="f-body text-xs px-5 -mt-3 mb-6" style={{ color: T.textLo }}>Keep your vehicle running at its best.</p>

      <div className="px-5 mb-7">
        <div className="rounded-3xl p-5 anim-fadeUp" style={{ background: `${T.amber}18`, border: `1px solid ${T.amber}33` }}>
          <div className="flex items-center gap-2 mb-1.5">
            <Gauge size={14} color={T.amber} />
            <span className="f-body text-[11px] font-semibold" style={{ color: T.amber }}>SERVICE DUE SOON</span>
          </div>
          <p className="f-body text-xs mb-3" style={{ color: T.textHi }}>Your next service is recommended in 500 km.</p>
          <Btn size="sm" onClick={() => go("book")}>Book Service</Btn>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3.5 px-5 mb-8">
        <ServiceTile icon={Wrench} label="Book Service" desc="Schedule a new visit" onClick={() => go("book")} />
        <ServiceTile icon={FileText} label="Service History" desc="Past & upcoming jobs" onClick={() => go("history")} />
        <ServiceTile icon={Navigation2} label="Track Service" desc="Live status updates" onClick={() => go("tracking")} />
        <ServiceTile icon={MapPin} label="Service Centers" desc="Find one near you" onClick={() => go("centers")} />
      </div>

      <SectionHeader title="Service Types" />
      <div className="grid grid-cols-2 gap-3 px-5 pb-8">
        {SERVICE_TYPES.map((s) => (
          <button key={s.id} onClick={() => go("book")} className="flex items-center gap-3 p-3.5 rounded-2xl text-left anim-fadeUp" style={{ background: T.panel, border: `1px solid ${T.panelLine}` }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${T.copper}22` }}>
              <s.icon size={16} color={T.copperLight} />
            </div>
            <div className="min-w-0">
              <p className="f-body text-xs font-semibold truncate" style={{ color: T.textHi }}>{s.name}</p>
              <p className="f-body text-[10px] truncate" style={{ color: T.textLo }}>{s.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </Screen>
  );
}

const ServiceTile = ({ icon: Icon, label, desc, onClick }) => (
  <button onClick={onClick} className="p-4 rounded-2xl text-left anim-fadeUp" style={{ background: T.panel, border: `1px solid ${T.panelLine}` }}>
    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${T.teal}1f` }}>
      <Icon size={17} color={T.teal} />
    </div>
    <p className="f-body text-sm font-semibold mb-0.5" style={{ color: T.textHi }}>{label}</p>
    <p className="f-body text-[10.5px]" style={{ color: T.textLo }}>{desc}</p>
  </button>
);

/* --------- BOOKING FLOW --------- */
const STEP_LABELS = ["Vehicle", "Service", "Center", "Date & Time", "Details", "Pickup", "Confirm"];

function BookingFlow({ back, onComplete }) {
  const [step, setStep] = useState(0);
  const [vehicle, setVehicle] = useState(null);
  const [service, setService] = useState(null);
  const [center, setCenter] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [issue, setIssue] = useState("");
  const [pickup, setPickup] = useState(null);

  const next = () => setStep((s) => Math.min(s + 1, 6));
  const prev = () => (step === 0 ? back() : setStep((s) => s - 1));

  const canNext = [!!vehicle, !!service, !!center, !!date && !!time, true, !!pickup, true][step];

  const dates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(2026, 7, 27 + i);
    return { label: d.toLocaleDateString("en-US", { weekday: "short" }), num: d.getDate() };
  });

  return (
    <Screen>
      <ScreenHeader title="Book Service" onBack={prev} />
      <div className="px-5 mb-6">
        <div className="flex items-center gap-1.5 mb-2">
          {STEP_LABELS.map((_, i) => (
            <div key={i} className="h-1 flex-1 rounded-full" style={{ background: i <= step ? T.copper : T.panelLine }} />
          ))}
        </div>
        <p className="f-body text-[11px] font-semibold" style={{ color: T.textLo }}>Step {step + 1} of 7 · {STEP_LABELS[step]}</p>
      </div>

      <div className="px-5 pb-32 anim-fadeIn" key={step}>
        {step === 0 && (
          <div className="space-y-3">
            {PRODUCTS.filter((p) => p.category !== "Accessories").slice(0, 4).map((p) => (
              <SelectCard key={p.id} selected={vehicle?.id === p.id} onClick={() => setVehicle(p)}>
                <img src={IMG(p.seed, 100, 100)} className="w-12 h-12 rounded-xl object-cover" alt="" />
                <div className="flex-1 min-w-0"><p className="f-body text-sm font-semibold" style={{ color: T.textHi }}>{p.name}</p><p className="f-body text-[11px]" style={{ color: T.textLo }}>{p.category}</p></div>
              </SelectCard>
            ))}
            <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl f-body text-xs font-semibold" style={{ border: `1px dashed ${T.panelLine}`, color: T.copperLight }}>
              <Plus size={14} /> Add New
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="grid grid-cols-2 gap-3">
            {SERVICE_TYPES.map((s) => (
              <SelectCard key={s.id} selected={service?.id === s.id} onClick={() => setService(s)} column>
                <s.icon size={20} color={service?.id === s.id ? T.copperLight : T.textLo} />
                <p className="f-body text-xs font-semibold mt-2" style={{ color: T.textHi }}>{s.name}</p>
                <p className="f-body text-[10px]" style={{ color: T.textLo }}>{s.desc}</p>
              </SelectCard>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            {SERVICE_CENTERS.map((c) => (
              <SelectCard key={c.id} selected={center?.id === c.id} onClick={() => setCenter(c)}>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="f-body text-sm font-semibold" style={{ color: T.textHi }}>{c.name}</p>
                    <Stars rating={c.rating} />
                  </div>
                  <p className="f-body text-[11px] mb-1.5" style={{ color: T.textLo }}>{c.address}</p>
                  <div className="flex items-center gap-3">
                    <span className="f-body text-[10px] flex items-center gap-1" style={{ color: T.copperLight }}><MapPin size={10} />{c.distance}</span>
                    <span className="f-body text-[10px] flex items-center gap-1" style={{ color: T.textLo }}><Clock size={10} />{c.hours}</span>
                  </div>
                </div>
              </SelectCard>
            ))}
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="f-body text-xs font-semibold mb-3" style={{ color: T.textHi }}>Select Date</p>
            <div className="flex gap-2.5 overflow-x-auto noscroll pb-5">
              {dates.map((d, i) => (
                <button key={i} onClick={() => setDate(d)} className="flex flex-col items-center justify-center rounded-2xl flex-shrink-0" style={{ width: 52, height: 64, background: date?.num === d.num ? T.copper : T.panel, border: `1px solid ${date?.num === d.num ? T.copper : T.panelLine}` }}>
                  <span className="f-body text-[10px]" style={{ color: date?.num === d.num ? T.textInkHi : T.textLo }}>{d.label}</span>
                  <span className="f-display text-base font-bold" style={{ color: date?.num === d.num ? T.textInkHi : T.textHi }}>{d.num}</span>
                </button>
              ))}
            </div>
            <p className="f-body text-xs font-semibold mb-3" style={{ color: T.textHi }}>Available Time Slots</p>
            <div className="grid grid-cols-3 gap-2.5">
              {TIME_SLOTS.map((t) => (
                <button key={t} onClick={() => setTime(t)} className="py-3 rounded-xl f-body text-xs font-semibold" style={{ background: time === t ? T.copper : T.panel, color: time === t ? T.textInkHi : T.textHi, border: `1px solid ${time === t ? T.copper : T.panelLine}` }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <p className="f-body text-xs font-semibold mb-3" style={{ color: T.textHi }}>Describe your issue (optional)</p>
            <textarea value={issue} onChange={(e) => setIssue(e.target.value)} rows={6} placeholder="E.g. Unusual noise while braking, AC not cooling properly…"
              className="w-full rounded-2xl px-4 py-3.5 f-body text-sm outline-none resize-none" style={{ background: T.panel, border: `1px solid ${T.panelLine}`, color: T.textHi }} />
          </div>
        )}

        {step === 5 && (
          <div className="space-y-3">
            {[
              { id: "self", label: "I'll bring it myself", icon: Car },
              { id: "pickup", label: "Pickup required", icon: Truck },
              { id: "drop", label: "Drop-off required", icon: Navigation2 },
              { id: "both", label: "Pickup & Drop", icon: RotateCcw },
            ].map((o) => (
              <SelectCard key={o.id} selected={pickup === o.id} onClick={() => setPickup(o.id)}>
                <o.icon size={18} color={pickup === o.id ? T.copperLight : T.textLo} />
                <p className="f-body text-sm font-semibold flex-1" style={{ color: T.textHi }}>{o.label}</p>
              </SelectCard>
            ))}
          </div>
        )}

        {step === 6 && (
          <div className="rounded-3xl p-5" style={{ background: T.panel, border: `1px solid ${T.panelLine}` }}>
            <p className="f-display text-sm font-bold mb-4" style={{ color: T.textHi }}>Service Booking Summary</p>
            <div className="space-y-3">
              <SummaryRow label="Product" value={vehicle?.name} />
              <SummaryRow label="Service" value={service?.name} />
              <SummaryRow label="Service Center" value={center?.name} />
              <SummaryRow label="Date" value={date ? `Aug ${date.num}, 2026` : "—"} />
              <SummaryRow label="Time" value={time} />
              <SummaryRow label="Pickup & Drop" value={{ self: "Self drop-off", pickup: "Pickup required", drop: "Drop-off required", both: "Pickup & Drop" }[pickup]} />
              <div className="h-px my-1" style={{ background: T.panelLine }} />
              <SummaryRow label="Estimated Cost" value="₹1,800 – ₹3,500" highlight />
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 inset-x-0 px-5 py-4" style={{ background: `linear-gradient(0deg, ${T.ink} 70%, transparent)` }}>
        <Btn full disabled={!canNext} onClick={() => (step === 6 ? onComplete({ vehicle, service, center, date, time, pickup }) : next())}>
          {step === 6 ? "Confirm Booking" : "Continue"}
        </Btn>
      </div>
    </Screen>
  );
}

const SelectCard = ({ children, selected, onClick, column }) => (
  <button onClick={onClick} className={`w-full flex ${column ? "flex-col items-start" : "items-center gap-3.5"} p-4 rounded-2xl text-left transition-all`}
    style={{ background: selected ? `${T.copper}16` : T.panel, border: `1.5px solid ${selected ? T.copper : T.panelLine}` }}>
    {children}
  </button>
);

const SummaryRow = ({ label, value, highlight }) => (
  <div className="flex items-center justify-between">
    <span className="f-body text-xs" style={{ color: T.textLo }}>{label}</span>
    <span className={`f-mono text-xs font-semibold ${highlight ? "text-sm" : ""}`} style={{ color: highlight ? T.copperLight : T.textHi }}>{value || "—"}</span>
  </div>
);

/* --------- BOOKING SUCCESS --------- */
function BookingSuccess({ booking, go }) {
  return (
    <Screen>
      <div className="flex flex-col items-center justify-center pt-16 px-8 text-center">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 anim-pulse" style={{ background: `${T.teal}22` }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: T.teal }}>
            <Check size={30} color={T.ink} strokeWidth={3} />
          </div>
        </div>
        <h2 className="f-display text-xl font-bold mb-2" style={{ color: T.textHi }}>Service Booked Successfully!</h2>
        <p className="f-mono text-xs mb-8" style={{ color: T.copperLight }}>Booking ID: SRV-2026-00125</p>

        <div className="w-full rounded-3xl p-5 text-left mb-8" style={{ background: T.panel, border: `1px solid ${T.panelLine}` }}>
          <SummaryRow label="Date" value={booking?.date ? `Aug ${booking.date.num}, 2026` : "Aug 27, 2026"} />
          <div className="h-2" />
          <SummaryRow label="Time" value={booking?.time || "10:30 AM"} />
          <div className="h-2" />
          <SummaryRow label="Service Center" value={booking?.center?.name || "Northline Service Hub"} />
          <div className="h-2" />
          <SummaryRow label="Service Type" value={booking?.service?.name || "General Service"} />
        </div>

        <div className="w-full space-y-2.5">
          <Btn full onClick={() => go("tracking")}>Track Service</Btn>
          <Btn full variant="outline" onClick={() => go("history")}>View Booking</Btn>
          <Btn full variant="ghost" onClick={() => go("home")}>Back to Home</Btn>
        </div>
      </div>
    </Screen>
  );
}

/* --------- SERVICE TRACKING --------- */
const TRACK_STEPS = [
  { label: "Booking Confirmed", done: true },
  { label: "Vehicle Received", done: true },
  { label: "Inspection in Progress", done: false, current: true },
  { label: "Service in Progress", done: false },
  { label: "Quality Check", done: false },
  { label: "Ready for Pickup", done: false },
];

function TrackingScreen({ back }) {
  return (
    <Screen>
      <ScreenHeader title="Track Service" onBack={back} />
      <div className="px-5 mb-6">
        <div className="rounded-3xl p-5" style={{ background: `${T.copper}14`, border: `1px solid ${T.copper}33` }}>
          <p className="f-body text-[11px] mb-1" style={{ color: T.textLo }}>Estimated completion</p>
          <p className="f-display text-base font-bold" style={{ color: T.textHi }}>Today, 5:30 PM</p>
        </div>
      </div>
      <div className="px-5 pb-8">
        <p className="f-mono text-[11px] mb-6" style={{ color: T.textLo }}>Booking SRV-2026-00125 · Solace Sedan Elite</p>
        {TRACK_STEPS.map((s, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: s.done ? T.teal : s.current ? T.copper : T.panel, border: `1px solid ${s.done ? T.teal : s.current ? T.copper : T.panelLine}` }}>
                {s.done ? <Check size={13} color={T.ink} strokeWidth={3} /> : s.current ? <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.textInkHi }} /> : <Circle size={9} color={T.textLo} fill={T.textLo} />}
              </div>
              {i < TRACK_STEPS.length - 1 && <div className="w-px flex-1 my-1" style={{ background: s.done ? T.teal : T.panelLine, minHeight: 32 }} />}
            </div>
            <div className="pb-8">
              <p className="f-body text-sm font-semibold" style={{ color: s.current ? T.copperLight : T.textHi }}>{s.label}</p>
              {s.current && <p className="f-body text-[11px] mt-0.5" style={{ color: T.textLo }}>Our technician is currently checking your vehicle.</p>}
            </div>
          </div>
        ))}
      </div>
    </Screen>
  );
}

/* --------- SERVICE HISTORY --------- */
function HistoryScreen({ back, go }) {
  const [filter, setFilter] = useState("All");
  const list = BOOKING_HISTORY.filter((b) => filter === "All" || b.status === filter);
  return (
    <Screen>
      <ScreenHeader title="Service History" onBack={back} />
      <div className="flex gap-2 px-5 pb-5 overflow-x-auto noscroll">
        {["All", "Completed", "Cancelled", "Upcoming"].map((f) => <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>{f}</Chip>)}
      </div>
      {list.length === 0 ? (
        <EmptyState icon={FileText} title="No records found" subtitle="Bookings matching this filter will show up here." />
      ) : (
        <div className="px-5 space-y-3 pb-8">
          {list.map((b) => (
            <button key={b.id} onClick={() => go("serviceDetails", b)} className="w-full text-left rounded-2xl p-4" style={{ background: T.panel, border: `1px solid ${T.panelLine}` }}>
              <div className="flex items-center justify-between mb-2">
                <span className="f-body text-[11px]" style={{ color: T.textLo }}>{b.date}</span>
                <StatusPill status={b.status} />
              </div>
              <p className="f-body text-sm font-semibold mb-0.5" style={{ color: T.textHi }}>{b.type}</p>
              <p className="f-body text-[11px] mb-3" style={{ color: T.textLo }}>{b.product} · {b.center}</p>
              <div className="flex items-center justify-between">
                <span className="f-mono text-sm font-semibold" style={{ color: T.copperLight }}>{inr(b.amount)}</span>
                <span className="f-body text-[11px] font-semibold flex items-center gap-0.5" style={{ color: T.textLo }}>View Details <ChevronRight size={12} /></span>
              </div>
            </button>
          ))}
        </div>
      )}
    </Screen>
  );
}

function ServiceDetailsScreen({ booking, back }) {
  if (!booking) return null;
  return (
    <Screen>
      <ScreenHeader title="Service Details" onBack={back} />
      <div className="px-5 pb-8">
        <div className="rounded-3xl p-5 mb-5" style={{ background: T.panel, border: `1px solid ${T.panelLine}` }}>
          <div className="flex items-center justify-between mb-4">
            <span className="f-mono text-xs" style={{ color: T.copperLight }}>{booking.id}</span>
            <StatusPill status={booking.status} />
          </div>
          <SummaryRow label="Product" value={booking.product} />
          <div className="h-2.5" /><SummaryRow label="Service Type" value={booking.type} />
          <div className="h-2.5" /><SummaryRow label="Service Center" value={booking.center} />
          <div className="h-2.5" /><SummaryRow label="Date" value={booking.date} />
          <div className="h-2.5" /><SummaryRow label="Technician" value="R. Kulkarni" />
          <div className="h-2.5" /><SummaryRow label="Estimated Cost" value={inr(booking.amount)} />
          <div className="h-2.5" /><SummaryRow label="Final Cost" value={inr(booking.amount)} highlight />
        </div>
        <div className="space-y-2.5">
          <Btn full variant="outline" icon={PhoneCall}>Contact Service Center</Btn>
          <Btn full variant="outline" icon={Download}>Download Invoice</Btn>
          <Btn full icon={RotateCcw}>Book Again</Btn>
        </div>
      </div>
    </Screen>
  );
}

/* --------- SERVICE CENTERS --------- */
function CentersScreen({ back, go }) {
  const [view, setView] = useState("list");
  return (
    <Screen>
      <ScreenHeader title="Service Centers" onBack={back} right={
        <div className="flex rounded-full overflow-hidden" style={{ border: `1px solid ${T.panelLine}` }}>
          {["list", "map"].map((v) => (
            <button key={v} onClick={() => setView(v)} className="px-3 py-1.5 f-body text-[10px] font-semibold capitalize" style={{ background: view === v ? T.copper : "transparent", color: view === v ? T.textInkHi : T.textLo }}>{v}</button>
          ))}
        </div>
      } />
      <div className="px-5 pb-4"><SearchBar placeholder="Search service centers…" /></div>
      {view === "map" ? (
        <div className="mx-5 rounded-3xl h-56 mb-4 flex items-center justify-center relative overflow-hidden" style={{ background: T.panel, border: `1px solid ${T.panelLine}` }}>
          <img src={IMG("map-view", 500, 300)} className="absolute inset-0 w-full h-full object-cover opacity-30" alt="" />
          <div className="relative z-10 flex flex-col items-center">
            <MapPin size={22} color={T.copperLight} />
            <span className="f-body text-[11px] mt-1" style={{ color: T.textLo }}>Using your current location</span>
          </div>
        </div>
      ) : null}
      <div className="px-5 space-y-3 pb-8">
        {SERVICE_CENTERS.map((c) => (
          <div key={c.id} className="rounded-2xl p-4" style={{ background: T.panel, border: `1px solid ${T.panelLine}` }}>
            <div className="flex items-center justify-between mb-1.5">
              <p className="f-body text-sm font-semibold" style={{ color: T.textHi }}>{c.name}</p>
              <Stars rating={c.rating} />
            </div>
            <p className="f-body text-[11px] mb-2.5" style={{ color: T.textLo }}>{c.address}</p>
            <div className="flex items-center gap-4 mb-4">
              <span className="f-body text-[10px] flex items-center gap-1" style={{ color: T.copperLight }}><MapPin size={10} />{c.distance}</span>
              <span className="f-body text-[10px] flex items-center gap-1" style={{ color: T.textLo }}><Clock size={10} />{c.hours}</span>
              <span className="f-body text-[10px] flex items-center gap-1" style={{ color: T.textLo }}><Phone size={10} />{c.phone}</span>
            </div>
            <div className="flex gap-2.5">
              <Btn size="sm" variant="outline" full icon={Navigation2}>Get Directions</Btn>
              <Btn size="sm" full icon={Wrench} onClick={() => go("book")}>Book Service</Btn>
            </div>
          </div>
        ))}
      </div>
    </Screen>
  );
}

/* --------- NOTIFICATIONS --------- */
function NotificationsScreen({ back }) {
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Service reminders", "Booking updates", "Offers", "Product updates"];
  const list = NOTIFICATIONS.filter((n) => filter === "All" || n.category === filter);
  return (
    <Screen>
      <ScreenHeader title="Notifications" onBack={back} />
      <div className="flex gap-2 px-5 pb-5 overflow-x-auto noscroll">
        {cats.map((c) => <Chip key={c} active={filter === c} onClick={() => setFilter(c)}>{c}</Chip>)}
      </div>
      {list.length === 0 ? (
        <EmptyState icon={Bell} title="You're all caught up" subtitle="New updates will show up here." />
      ) : (
        <div className="px-5 space-y-2.5 pb-8">
          {list.map((n) => (
            <div key={n.id} className="flex gap-3 p-4 rounded-2xl" style={{ background: n.read ? T.panel : `${T.copper}12`, border: `1px solid ${n.read ? T.panelLine : T.copper + "44"}` }}>
              <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: n.read ? "transparent" : T.copper }} />
              <div className="flex-1 min-w-0">
                <p className="f-body text-[10px] font-semibold mb-1 uppercase tracking-wide" style={{ color: T.textLo }}>{n.category}</p>
                <p className="f-body text-sm" style={{ color: T.textHi }}>{n.title}</p>
                <p className="f-body text-[10px] mt-1" style={{ color: T.textLo }}>{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Screen>
  );
}

/* --------- PROFILE --------- */
function ProfileScreen({ go, onLogout }) {
  const items = [
    { icon: User, label: "My Profile" },
    { icon: Car, label: "My Products" },
    { icon: FileText, label: "My Bookings", action: () => go("history") },
    { icon: Wrench, label: "Service History", action: () => go("history") },
    { icon: Heart, label: "Wishlist", action: () => go("wishlist") },
    { icon: Bell, label: "Notifications", action: () => go("notifications") },
    { icon: MapPin, label: "Addresses" },
    { icon: MessageCircle, label: "Help & Support" },
    { icon: FileText, label: "Terms & Conditions" },
    { icon: ShieldCheck, label: "Privacy Policy" },
    { icon: Settings, label: "Settings" },
  ];
  return (
    <Screen>
      <div className="px-5 pt-6 pb-6 flex items-center gap-4">
        <img src={IMG("avatar-user", 120, 120)} className="w-16 h-16 rounded-full object-cover" style={{ border: `2px solid ${T.copper}` }} alt="" />
        <div>
          <h2 className="f-display text-lg font-bold" style={{ color: T.textHi }}>Arjun Mehta</h2>
          <p className="f-body text-xs" style={{ color: T.textLo }}>arjun.mehta@email.com</p>
        </div>
      </div>
      <div className="px-5 space-y-1.5 pb-8">
        {items.map((it) => (
          <button key={it.label} onClick={it.action} className="w-full flex items-center gap-3.5 px-3.5 py-3.5 rounded-2xl" style={{ background: T.panel }}>
            <it.icon size={17} color={T.textLo} />
            <span className="flex-1 text-left f-body text-sm" style={{ color: T.textHi }}>{it.label}</span>
            <ChevronRight size={15} color={T.textLo} />
          </button>
        ))}
        <button onClick={onLogout} className="w-full flex items-center gap-3.5 px-3.5 py-3.5 rounded-2xl mt-3" style={{ background: `${T.red}14` }}>
          <LogOut size={17} color={T.red} />
          <span className="flex-1 text-left f-body text-sm font-semibold" style={{ color: T.red }}>Logout</span>
        </button>
      </div>
    </Screen>
  );
}

/* ============================== LAYOUT ============================== */
function Screen({ children, noPadBottom }) {
  return <div className={`w-full h-full overflow-y-auto noscroll relative ${noPadBottom ? "" : ""}`} style={{ background: T.ink }}>{children}</div>;
}

function BottomNav({ active, go }) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "showroom", label: "Showroom", icon: ShoppingBag },
    { id: "service", label: "Service", icon: Wrench },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "profile", label: "Profile", icon: User },
  ];
  return (
    <div className="flex items-center justify-around px-2 pt-2.5 pb-6" style={{ background: T.ink2, borderTop: `1px solid ${T.panelLine}` }}>
      {tabs.map((t) => {
        const isActive = active === t.id;
        return (
          <button key={t.id} onClick={() => go(t.id)} className="flex flex-col items-center gap-1 px-3 py-1">
            <t.icon size={19} color={isActive ? T.copperLight : T.textLo} fill={isActive && t.id === "wishlist" ? T.copperLight : "none"} strokeWidth={isActive ? 2.3 : 1.9} />
            <span className="f-body text-[9.5px] font-semibold" style={{ color: isActive ? T.copperLight : T.textLo }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ============================== ROOT APP ============================== */
function App() {
  const [stage, setStage] = useState("splash"); // splash | onboarding | auth | app
  const [tab, setTab] = useState("home");
  const [screen, setScreen] = useState("home");
  const [stack, setStack] = useState([]);
  const [payload, setPayload] = useState(null);
  const [wishlist, setWishlist] = useState(["p1", "p4"]);
  const [lastBooking, setLastBooking] = useState(null);
  const [hasUpcoming, setHasUpcoming] = useState(true);

  const toggleWish = (id) => setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));

  const go = (dest, data) => {
    setStack((s) => [...s, screen]);
    setScreen(dest);
    if (data) setPayload(data);
    if (["home", "showroom", "service", "wishlist", "profile"].includes(dest)) setTab(dest);
  };
  const back = () => {
    setStack((s) => {
      const copy = [...s];
      const prev = copy.pop() || "home";
      setScreen(prev);
      if (["home", "showroom", "service", "wishlist", "profile"].includes(prev)) setTab(prev);
      return copy;
    });
  };
  const goTab = (t) => { setTab(t); setScreen(t); setStack([]); };

  const upcoming = hasUpcoming ? { product: "Solace Sedan Elite", type: "General Service", date: "28 Aug 2026", time: "10:30 AM", center: "Northline Service Hub" } : null;
  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

  const renderScreen = () => {
    switch (screen) {
      case "home": return <HomeScreen go={go} wishlist={wishlist} toggleWish={toggleWish} unreadCount={unreadCount} upcoming={upcoming} />;
      case "showroom": return <ShowroomScreen go={go} back={back} wishlist={wishlist} toggleWish={toggleWish} />;
      case "product": return <ProductDetailScreen product={payload} back={back} wishlist={wishlist} toggleWish={toggleWish} go={go} />;
      case "wishlist": return <WishlistScreen back={back} wishlist={wishlist} toggleWish={toggleWish} go={go} />;
      case "service": return <ServiceDashboard go={go} back={back} />;
      case "book": return <BookingFlow back={back} onComplete={(b) => { setLastBooking(b); setHasUpcoming(true); go("success"); }} />;
      case "success": return <BookingSuccess booking={lastBooking} go={(d) => (d === "home" ? goTab("home") : go(d))} />;
      case "tracking": return <TrackingScreen back={back} />;
      case "history": return <HistoryScreen back={back} go={go} />;
      case "serviceDetails": return <ServiceDetailsScreen booking={payload} back={back} />;
      case "centers": return <CentersScreen back={back} go={go} />;
      case "notifications": return <NotificationsScreen back={back} />;
      case "profile": return <ProfileScreen go={go} onLogout={() => { setStage("auth"); setScreen("home"); setTab("home"); setStack([]); }} />;
      default: return <HomeScreen go={go} wishlist={wishlist} toggleWish={toggleWish} unreadCount={unreadCount} upcoming={upcoming} />;
    }
  };

  const showBottomNav = ["home", "showroom", "wishlist", "service", "profile"].includes(screen);

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6" style={{ background: `radial-gradient(circle at 50% 0%, #23272E, #08090B 65%)` }}>
      {FONTS}
      <div className="relative" style={{ width: 390, height: 800 }}>
        <div className="absolute inset-0 rounded-[3rem] overflow-hidden flex flex-col" style={{ background: T.ink, boxShadow: "0 40px 80px rgba(0,0,0,0.55), 0 0 0 10px #0a0b0d, 0 0 0 11px #2a2f38" }}>
          <div className="absolute top-0 inset-x-0 h-7 flex items-center justify-center z-30 pointer-events-none">
            <div className="w-28 h-6 rounded-full" style={{ background: "#0a0b0d" }} />
          </div>
          <div className="flex-1 relative overflow-hidden">
            {stage === "splash" && <SplashScreen onDone={() => setStage("onboarding")} />}
            {stage === "onboarding" && <OnboardingScreen onFinish={() => setStage("auth")} />}
            {stage === "auth" && <AuthScreen onLogin={() => setStage("app")} />}
            {stage === "app" && renderScreen()}
          </div>
          {stage === "app" && showBottomNav && <BottomNav active={tab} go={goTab} />}
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);