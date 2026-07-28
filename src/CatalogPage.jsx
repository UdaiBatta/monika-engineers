/* eslint-disable react/prop-types */
import { useMemo, useState, useEffect, useRef } from 'react';
import { Search, ArrowLeft, ChevronDown, X, Send, ShoppingCart, Clock, SlidersHorizontal, Plus, Check } from 'lucide-react';
import { fullCatalog, catalogCategoryOrder } from './catalog';

// Normalises raw catalog.js category names → clean canonical names shown in sidebar.
// Merges duplicates (e.g. 7 VFD variants → 'AC Drives') and renames brand-as-category entries.
const CATEGORY_MERGE = {
  // VFDs
  'Variable Frequency Drive':         'AC Drives',
  'Variable Frequency Drive Inverter': 'AC Drives',
  'VFD Drive':                         'AC Drives',
  'Delta AC Drive':                    'AC Drives',
  'Yaskawa AC Drive':                  'AC Drives',
  'Motor Drives':                      'AC Drives',
  'Fuji Electric':                     'AC Drives',
  // Servo
  'Servo Drives':                      'AC Servo Drives',
  'Servo Motor':                       'AC Servo Drives',
  'Servo Motors and Drives':           'AC Servo Drives',
  // Switchgear
  'Switches':                          'Electrical Switchgear',
  'Switch Gear':                       'Electrical Switchgear',
  'Schneider Contactor Relay MCB MCCB':'Electrical Switchgear',
  'Electrodes & Accessories':          'Electrical Switchgear',
  // HMI
  'Delta HMI Display':                 'HMI',
  // Sensors / instruments
  'Autonics':                          'Sensors',
  'New Items':                         'Sensors',
  'Scientific Instruments':            'Controllers',
  // Limit switches
  'Teknic Limit Switch':               'Limit Switches',
  // Push buttons
  'Sign Board':                        'Push Button Switches',
  // Power / accessories
  'Lubi Electronics':                  'SMPS',
  'Wago Products':                     'Accessories',
  'Electric Cable':                    'Accessories',
  'Tower Light':                       'Accessories',
};

// Maps products-section category keys → merged canonical catalog category names
const PRODUCT_GROUP_CATS = {
  'Drive & Motion':            ['AC Servo Drives', 'AC Drives'],
  'PLCs & HMIs':               ['PLC', 'HMI'],
  'Switchgear & Control':      ['Electrical Switchgear', 'Circuit Breaker', 'DOL Starter', 'Starters', 'Push Button Switches', 'Selector Switch'],
  'Process Instrumentation':   ['Temperature Controller', 'Electronic Timers', 'Relays', 'Digital Timer', 'Energy Meter', 'Digital Voltmeter', 'Digital Counter', 'Digital Panel Counter', 'Panels, Relays & Other Units', 'Controllers'],
  'Sensors & Switches':        ['Sensors', 'Limit Switches'],
  'Power Supplies & Accessories': ['SMPS', 'Accessories', 'Transformers', 'Encoders', 'Gear Box'],
};

// Category-level typical specs shown in modal when item has no own specs/description
const CATEGORY_INFO = {
  'AC Drives':                    { specs: { 'Type': 'AC Variable Frequency Drive (VFD)', 'Control Modes': 'V/F, SVC, FOC', 'Input': '1-phase 230V / 3-phase 415V (model-dependent)', 'Protection': 'Overcurrent, overvoltage, overtemperature', 'Communication': 'MODBUS RTU (standard); optional CANopen / EtherNet' }, note: 'Available in 0.4 kW–630 kW. Enquire for exact model, power range and pricing.' },
  'Variable Frequency Drive':     { specs: { 'Type': 'AC Variable Frequency Drive (VFD)', 'Control Modes': 'V/F, SVC, FOC (model-dependent)', 'Input': '1-phase 230V / 3-phase 415V', 'Protection': 'Overcurrent, overvoltage, overtemperature, short circuit', 'Communication': 'MODBUS RTU standard' }, note: 'Available in 0.4 kW–500 kW. Contact us for model selection and pricing.' },
  'Variable Frequency Drive Inverter': { specs: { 'Type': 'AC Variable Frequency Drive', 'Control': 'V/F and vector control', 'Input Voltage': '3-phase 415V ±10%', 'Frequency Range': '0–600 Hz', 'Protection Class': 'IP20 standard' }, note: 'Multiple power ratings available. Enquire for datasheet.' },
  'Delta AC Drive':               { specs: { 'Brand': 'Delta Electronics', 'Control Modes': 'V/F, SVC, FOC, PM sensorless', 'Input': '1-phase 230V / 3-phase 415–480V', 'Overload': '150% for 60 s (heavy duty)', 'Communication': 'MODBUS; optional CANopen, PROFIBUS, EtherNet/IP' }, note: 'Delta drives available from 0.2 kW to 630 kW. Enquire for series and model.' },
  'VFD Drive':                    { specs: { 'Type': 'Variable Frequency Drive', 'Voltage': '3-phase 415V', 'Control': 'V/F / vector', 'Protection': 'IP20 / IP55 (model-dependent)' }, note: 'Contact us for power range, make and pricing.' },
  'Motor Drives':                 { specs: { 'Type': 'AC Motor Drive / Inverter', 'Voltage': '230V single-phase or 415V three-phase', 'Control': 'V/F and sensorless vector' }, note: 'Enquire for specific make, model and power range.' },
  'Yaskawa AC Drive':             { specs: { 'Brand': 'Yaskawa Electric', 'Series': 'GA700 / GA800 / V1000 (model-dependent)', 'Input': '3-phase 415V', 'Control': 'V/F, Open-loop vector, Closed-loop vector', 'Communication': 'MODBUS, MECHATROLINK, EtherNet/IP' }, note: 'Genuine Yaskawa drives stocked and sourced on request. Enquire for model and pricing.' },
  'AC Servo Drives':              { specs: { 'Type': 'AC Servo Drive & Motor System', 'Control Modes': 'Position, Speed, Torque', 'Feedback': 'Incremental / Absolute encoder', 'Communication': 'CANopen, EtherCAT (model-dependent)', 'Protection': 'Overcurrent, overvoltage, encoder error' }, note: 'Servo sets available in 100W–15kW. Enquire for make, model and matching motor.' },
  'Servo Drives':                 { specs: { 'Type': 'AC Servo Drive', 'Control': 'Position / Speed / Torque modes', 'Feedback': 'Encoder feedback (17–23 bit)', 'Bus': 'EtherCAT / CANopen / MODBUS (model-dependent)' }, note: 'Contact us for power rating, make and servo motor pairing.' },
  'Servo Motor':                  { specs: { 'Type': 'AC Servo Motor', 'Torque Range': '0.32 Nm–50 Nm (model-dependent)', 'Feedback': 'Incremental or absolute encoder', 'Protection': 'IP65 standard', 'Frame': 'Flange-mount IEC standard' }, note: 'Matched servo motor and drive sets available. Enquire for specifications.' },
  'Servo Motors and Drives':      { specs: { 'Type': 'Servo Drive + Motor Package', 'Control': 'Position, Speed, Torque', 'Encoder': '17–23 bit absolute', 'Interface': 'EtherCAT / CANopen' }, note: 'Complete servo sets. Enquire for make, rating and availability.' },
  'PLC':                          { specs: { 'Type': 'Programmable Logic Controller', 'I/O': 'Digital & Analog I/O (model-dependent)', 'Programming': 'IEC 61131-3 (Ladder, FBD, ST)', 'Communication': 'MODBUS, Ethernet, CANopen (model-dependent)', 'Power': '24V DC supply' }, note: 'Compact and modular PLC ranges available. Enquire for I/O count and communication needs.' },
  'HMI':                          { specs: { 'Type': 'Human Machine Interface (Touch Panel)', 'Display': '4"–15" TFT colour touchscreen (model-dependent)', 'Resolution': '480×272 to 1280×800', 'Communication': 'RS232/485, Ethernet, USB', 'OS': 'Embedded (Windows CE / Linux)' }, note: 'Enquire for screen size, make and compatible PLC protocols.' },
  'Delta HMI Display':            { specs: { 'Brand': 'Delta Electronics', 'Display': '4.3"–15" TFT colour touch', 'Protocol Support': 'MODBUS, Delta DVP/AS/AH, Omron, Mitsubishi, Siemens', 'Communication': 'RS232, RS485, Ethernet', 'Software': 'DOPSoft (free)' }, note: 'Delta HMI panels in stock. Enquire for screen size and model.' },
  'Switches':                     { specs: { 'Type': 'Industrial Electrical Switch / Contactor', 'Rating': 'As per model (9A–630A)', 'Voltage': 'Up to 690V AC', 'Standard': 'IEC 60947' }, note: 'Contact us for current rating, coil voltage and availability.' },
  'Electrical Switchgear':        { specs: { 'Type': 'Low Voltage Switchgear', 'Standards': 'IEC 60947, IS 13947', 'Voltage': 'Up to 690V AC / 250V DC', 'Applications': 'Motor control, power distribution, panel building' }, note: 'Enquire for type (MCB, MCCB, contactor, isolator), rating and make.' },
  'Switch Gear':                  { specs: { 'Type': 'LV Switchgear Component', 'Voltage': 'Up to 690V AC' }, note: 'Enquire for exact type, current rating and make.' },
  'Circuit Breaker':              { specs: { 'Type': 'Moulded Case / Miniature Circuit Breaker', 'Breaking Capacity': '6 kA–100 kA (model-dependent)', 'Poles': '1P / 2P / 3P / 4P', 'Standard': 'IEC 60898 / IEC 60947-2' }, note: 'MCB and MCCB ranges in stock. Enquire for rating and breaking capacity.' },
  'DOL Starter':                  { specs: { 'Type': 'Direct-On-Line Motor Starter', 'Contactor Rating': '9A–115A (model-dependent)', 'Overload Relay': 'Thermal / electronic', 'Voltage': '415V AC 3-phase' }, note: 'Enquire for motor kW rating and make.' },
  'Starters':                     { specs: { 'Type': 'Motor Starter (DOL / Star-Delta)', 'Voltage': '415V AC 3-phase', 'Protection': 'Thermal overload, short circuit' }, note: 'Contact us for starter type and motor rating.' },
  'Push Button Switches':         { specs: { 'Type': 'Industrial Push Button / Pilot Device', 'Contact': 'NO / NC / NO+NC', 'IP Rating': 'IP65', 'Mounting': '22mm / 30mm panel cut-out' }, note: 'Enquire for colour, contact type and quantity.' },
  'Selector Switch':              { specs: { 'Type': 'Rotary Selector Switch', 'Positions': '2 / 3 position', 'Contact': 'NO/NC', 'Mounting': '22mm / 30mm' }, note: 'Enquire for positions, contact arrangement and make.' },
  'Schneider Contactor Relay MCB MCCB': { specs: { 'Brand': 'Schneider Electric', 'Products': 'Contactors, overload relays, MCBs, MCCBs', 'Range': 'TeSys, Acti 9, Compact NSX', 'Standard': 'IEC 60947' }, note: 'Genuine Schneider Electric components. Enquire for part number and quantity.' },
  'Temperature Controller':       { specs: { 'Type': 'PID Temperature Controller', 'Input': 'Thermocouple (J/K/T/R/S) / RTD Pt100', 'Output': 'Relay / SSR / Analog (4–20 mA)', 'Display': '4-digit LED', 'Accuracy': '±0.3% FS' }, note: 'Available in 48×48, 72×72, 96×96 mm DIN formats. Enquire for sensor type and output.' },
  'Electronic Timers':            { specs: { 'Type': 'Industrial Timer Relay', 'Time Range': '0.1 s – 100 h (model-dependent)', 'Modes': 'ON-delay, OFF-delay, cyclic, interval', 'Supply': '24V DC / 230V AC', 'Output': 'SPDT relay contact' }, note: 'Contact us for timing range and operating mode.' },
  'Relays':                       { specs: { 'Type': 'Industrial Control Relay', 'Coil Voltage': '24V DC / 24V AC / 230V AC', 'Contacts': '4 SPDT (model-dependent)', 'Contact Rating': '10A at 250V AC', 'Standard': 'IEC 61810' }, note: 'PCB, plugin and flange mount variants available. Enquire for coil voltage and contact rating.' },
  'Digital Timer':                { specs: { 'Type': 'Digital Timer / Counter', 'Display': 'LED 6-digit', 'Modes': 'Count-up, count-down, time totaliser', 'Input': 'NPN/PNP pulse, voltage' }, note: 'Contact us for counting mode and supply voltage.' },
  'Energy Meter':                 { specs: { 'Type': 'Digital Energy / Power Meter', 'Measurement': 'kWh, kVAh, kW, V, A, PF', 'Communication': 'MODBUS RTU (RS485)', 'Accuracy': 'Class 1 / Class 0.5S', 'Mounting': 'DIN rail / panel' }, note: 'Single and three-phase variants available. Enquire for accuracy class and communication.' },
  'Sensors':                      { specs: { 'Types Available': 'Inductive proximity, capacitive, photoelectric, ultrasonic', 'Output': 'NPN / PNP NO/NC', 'Supply': '10–30V DC', 'Connection': 'M8 / M12 / M18 / M30 threaded housing' }, note: 'Wide sensor range from Omron, Autonics, Baumer. Enquire for sensing distance, type and output.' },
  'Limit Switches':               { specs: { 'Type': 'Mechanical / Safety Limit Switch', 'Contact': 'SPDT / DPDT', 'IP Rating': 'IP65–IP67', 'Actuator': 'Roller lever, plunger, fork', 'Rating': '10A at 400V AC' }, note: 'Heavy-duty limit switches from Teknic, Omron. Enquire for actuator type and IP rating.' },
  'Teknic Limit Switch':          { specs: { 'Brand': 'Teknic', 'Type': 'Heavy-duty mechanical limit switch', 'Contact': 'SPDT / DPDT', 'IP Rating': 'IP65 / IP67', 'Housing': 'Die-cast zinc / plastic' }, note: 'Genuine Teknic limit switches. Enquire for model, actuator type and quantity.' },
  'Autonics':                     { specs: { 'Brand': 'Autonics (Korea)', 'Products': 'Proximity sensors, photoelectric sensors, temperature controllers, timers, counters', 'Output': 'NPN / PNP', 'Supply': '12–24V DC' }, note: 'Genuine Autonics products. Enquire for product type and model number.' },
  'SMPS':                         { specs: { 'Type': 'Switched Mode Power Supply', 'Output Voltage': '12V DC / 24V DC (standard)', 'Output Current': '2.5A–40A (model-dependent)', 'Efficiency': '>88%', 'Mounting': 'DIN rail' }, note: 'DIN rail SMPS in 12V and 24V ranges. Enquire for output current and make.' },
  'Wago Products':                { specs: { 'Brand': 'WAGO (Germany)', 'Products': 'Spring-clamp terminal blocks, I/O modules, CAGE CLAMP connectors', 'Wire Range': '0.08–35 mm²', 'Rating': 'Up to 1000V / 125A (model-dependent)' }, note: 'Genuine WAGO components. Enquire for part number and quantity.' },
  'Encoders':                     { specs: { 'Type': 'Incremental / Absolute Rotary Encoder', 'Resolution': '100–10,000 PPR (incremental)', 'Output': 'Push-pull, line driver, HTL', 'Supply': '5V / 10–30V DC', 'Shaft': '6mm / 10mm solid or hollow' }, note: 'Encoders from Baumer, Nidec, Shimpo. Enquire for resolution, shaft size and output type.' },
  'Transformers':                 { specs: { 'Type': 'Control / Isolation Transformer', 'Primary': '415V / 230V AC', 'Secondary': '110V / 24V / 12V AC (model-dependent)', 'Frequency': '50 Hz', 'Standard': 'IS 2026' }, note: 'Enquire for kVA rating, primary/secondary voltage and IP rating.' },
  'Gear Box':                     { specs: { 'Type': 'Industrial Gearbox / Speed Reducer', 'Reduction Ratios': '5:1 – 100:1 (model-dependent)', 'Mounting': 'Flange / foot / shaft', 'Input': 'B5 flange for IEC motor frame' }, note: 'Enquire for reduction ratio, output torque and mounting style.' },
};

const KNOWN_BRANDS = [
  'Delta', 'Inovance', 'Chint', 'Selec', 'BCH', 'Lubi', 'Teknic', 'Omron', 'Wago',
  'Yaskawa', 'CTB', 'Schneider', 'Autonics', 'Fuji', 'Panasonic', 'Tamagawa', 'Euchner',
  'Advantech', 'Leuze', 'Shimpo', 'Nidec', 'Baumer',
];

const BRAND_LOGOS = {
  'Delta':      '/images/brands/delta.png',
  'Inovance':   '/images/brands/inovance.png',
  'Chint':      '/images/brands/chint.png',
  'Selec':      '/images/brands/selec.png',
  'BCH':        '/images/brands/bch.png',
  'Lubi':       '/images/brands/lubi.svg',
  'Teknic':     '/images/brands/teknic.svg',
  'Omron':      '/images/brands/omron.jpg',
  'Wago':       '/images/brands/wago.jpg',
  'Schneider':  '/images/brands/schneider.jpg',
  'Panasonic':  '/images/brands/panasonic.png',
  'Nidec':      '/images/brands/nidec.jpg',
  'Baumer':     '/images/brands/baumer.jpg',
  'Fuji':       '/images/brands/fuji.svg',
  'CTB':        '/images/brands/ctb.png',
  'Yaskawa':    '/images/brands/yaskawa.svg',
  'Euchner':    '/images/brands/euchner.svg',
  'Autonics':   '/images/brands/autonics.svg',
  'Leuze':      '/images/brands/leuze.svg',
  'Advantech':  '/images/brands/advantech.svg',
  'Tamagawa':   '/images/brands/tamagawa.svg',
  'Shimpo':     '/images/brands/shimpo.svg',
};

// Fixes catalog.js items that are in the wrong raw category by matching name keywords.
// Falls back to CATEGORY_MERGE[rawCat] or the raw category itself.
function resolveCategory(name, rawCat) {
  const u = name.toUpperCase();
  if (/(CIRCUIT BREAKER|MCCB|MCB\b|CONTACTOR|MOULDED CASE)/.test(u))  return 'Electrical Switchgear';
  if (/\bSENSORS?\b|PROXIMITY SENSOR|PHOTOELECTRIC/.test(u) &&
      !/SERVO/.test(u))                                                  return 'Sensors';
  if (/(TEMPERATURE CONTROLLER|TEMP CONTROLLER)/.test(u))               return 'Temperature Controller';
  if (/(AC DRIVE|FREQUENCY DRIVE|MOTOR DRIVE|INVERTER\b|VFD\b)/.test(u) &&
      !/(SERVO)/.test(u))                                                return 'AC Drives';
  return CATEGORY_MERGE[rawCat] || rawCat;
}

// Merged category list with item counts — the clean taxonomy shown in nav menus.
// Same normalization the catalog page itself uses, so nav clicks always land on a real filter.
// eslint-disable-next-line react-refresh/only-export-components
export const catalogNav = (() => {
  const counts = new Map();
  for (const cat of catalogCategoryOrder) {
    for (const item of fullCatalog[cat]) {
      const c = resolveCategory(item.name, cat);
      counts.set(c, (counts.get(c) || 0) + 1);
    }
  }
  return [...new Set(catalogCategoryOrder.map(c => CATEGORY_MERGE[c] || c))]
    .filter(c => counts.has(c))
    .map(c => [c, counts.get(c)]);
})();

// Fades a product photo in once it finishes loading (handles cached images too)
function markLoaded(el) {
  if (el && el.complete) el.classList.add('is-loaded');
}

function detectBrand(name) {
  const upper = name.toUpperCase();
  for (const brand of KNOWN_BRANDS) {
    if (upper.includes(brand.toUpperCase())) return brand;
  }
  return 'Other';
}

const LS_KEY = 'me_recent';
const MAX_RECENT = 8;

const PAGE_SIZE = 60;

function CatalogPage({ initialQuery = '', initialCategory = '', initialGroup = '', initialBrand = '', onBack, onEnquire, onAddToCart }) {
  const baseGroupCats = PRODUCT_GROUP_CATS[initialGroup] || null;
  const [groupActive, setGroupActive] = useState(true);
  const groupCats = baseGroupCats && groupActive ? baseGroupCats : null;
  const [query, setQuery]           = useState(initialQuery);
  const [category, setCategory]     = useState(initialCategory);
  const [brand, setBrand]           = useState(initialBrand);
  const [page, setPage]             = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const gridRef = useRef(null);
  const [recentItems, setRecentItems]   = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; } catch { return []; }
  });
  const [reqName, setReqName]   = useState('');
  const [reqPhone, setReqPhone] = useState('');
  const [reqModel, setReqModel] = useState(initialQuery);
  const [justAdded, setJustAdded] = useState('');
  const addedTimer = useRef(null);

  const flashAdded = (name) => {
    clearTimeout(addedTimer.current);
    setJustAdded(name);
    addedTimer.current = setTimeout(() => setJustAdded(''), 1300);
  };
  useEffect(() => () => clearTimeout(addedTimer.current), []);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setSelectedItem(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedItem ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedItem]);

  const openItem = (item) => {
    setSelectedItem(item);
    setRecentItems(prev => {
      const next = [item, ...prev.filter(r => r.name !== item.name)].slice(0, MAX_RECENT);
      try { localStorage.setItem(LS_KEY, JSON.stringify(next)); } catch { /* storage unavailable — recents just won't persist */ }
      return next;
    });
  };

  const flat = useMemo(() => {
    const rows = [];
    for (const cat of catalogCategoryOrder) {
      for (const item of fullCatalog[cat]) {
        rows.push({ category: resolveCategory(item.name, cat), brand: detectBrand(item.name), ...item });
      }
    }
    return rows;
  }, []);

  const mergedCategoryOrder = useMemo(
    () => [...new Set(catalogCategoryOrder.map(c => CATEGORY_MERGE[c] || c))],
    []
  );

  const brandOptions = useMemo(() => {
    const pool = groupCats ? flat.filter(r => groupCats.includes(r.category)) : flat;
    const counts = new Map();
    for (const r of pool) counts.set(r.brand, (counts.get(r.brand) || 0) + 1);
    const PRIORITY_BRANDS = ['Delta', 'Inovance'];
    return [...counts.entries()]
      .filter(([name]) => name !== 'Other')
      .sort((a, b) => {
        const pa = PRIORITY_BRANDS.indexOf(a[0]);
        const pb = PRIORITY_BRANDS.indexOf(b[0]);
        if (pa !== -1 || pb !== -1) {
          if (pa === -1) return 1;
          if (pb === -1) return -1;
          return pa - pb;
        }
        return b[1] - a[1];
      })
      .concat(counts.has('Other') ? [['Other', counts.get('Other')]] : []);
  }, [flat, groupCats]);

  const categoryOptions = useMemo(() => {
    const pool = groupCats ? flat.filter(r => groupCats.includes(r.category)) : flat;
    const source = brand ? pool.filter(r => r.brand === brand) : pool;
    const cats = new Set(source.map(r => r.category));
    return mergedCategoryOrder
      .filter(c => cats.has(c))
      .map(c => [c, source.filter(r => r.category === c).length])
      // Most-stocked categories first — easier to scan the sidebar
      .sort((a, b) => b[1] - a[1]);
  }, [flat, brand, groupCats, mergedCategoryOrder]);

  useEffect(() => {
    if (category && !categoryOptions.some(([c]) => c === category)) setCategory('');
  }, [categoryOptions, category]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return flat.filter((r) => {
      if (groupCats && !groupCats.includes(r.category)) return false;
      if (category && r.category !== category) return false;
      if (brand && r.brand !== brand) return false;
      if (!q) return true;
      return r.name.toLowerCase().includes(q) || r.category.toLowerCase().includes(q);
    });
  }, [flat, query, category, brand, groupCats]);

  useEffect(() => { setPage(1); }, [query, category, brand, groupCats]);

  const totalPages = Math.ceil(results.length / PAGE_SIZE);
  const pageItems  = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goToPage = (p) => {
    setPage(p);
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const clearFilters = () => { setQuery(''); setCategory(''); setBrand(''); };
  const hasActiveFilters = query || category || brand;

  const sendRequest = () => {
    const msg = encodeURIComponent(`Monika Engineers — Product Request\n-----------------------------\nModel / Description: ${reqModel}\nName: ${reqName}\nPhone: ${reqPhone}\n\nPlease let me know if this is available or suggest an equivalent.`);
    window.open(`https://wa.me/919781921116?text=${msg}`, '_blank');
  };

  return (
    <div className="catalogpage">
      <div className="container">
        <button className="catalogpage__back" onClick={onBack}>
          <ArrowLeft size={16} /> Back to site
        </button>

        <span className="eyebrow">Full range</span>
        <h1 className="section__title">Industrial Supplies Catalog</h1>
        <p className="section__sub">
          {flat.length}+ lines across {mergedCategoryOrder.length} categories. Click any item to view details and enquire.
        </p>

        <div className="catalogpage__layout">
          {/* Category sidebar */}
          <aside className={`catalogpage__sidebar${sidebarOpen ? ' catalogpage__sidebar--open' : ''}`}>
            <p className="catalogpage__sidebar-heading">Categories</p>
            <button
              className={`catalogpage__cat-btn${!category ? ' catalogpage__cat-btn--active' : ''}`}
              onClick={() => { setCategory(''); setSidebarOpen(false); }}
            >
              <span>All categories</span>
              <span className="catalogpage__cat-count">{(groupCats ? flat.filter(r => groupCats.includes(r.category)) : flat).filter(r => !brand || r.brand === brand).length}</span>
            </button>
            {categoryOptions.map(([cat, count]) => (
              <button
                key={cat}
                className={`catalogpage__cat-btn${category === cat ? ' catalogpage__cat-btn--active' : ''}`}
                onClick={() => { setCategory(cat); setSidebarOpen(false); }}
              >
                <span>{cat}</span>
                <span className="catalogpage__cat-count">{count}</span>
              </button>
            ))}
          </aside>

          {/* Main content */}
          <div className="catalogpage__main">
            {/* Mobile category toggle */}
            <button className="catalogpage__sidebar-toggle" onClick={() => setSidebarOpen(o => !o)}>
              <SlidersHorizontal size={15} />
              {category ? category : 'All categories'}
              <ChevronDown size={14} className={sidebarOpen ? 'rotate-180' : ''} />
            </button>

            <div className="catalogpage__search">
              <Search size={18} />
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="Search e.g. VFD, MCB, Delta, proximity sensor…"
                autoFocus={!window.matchMedia('(pointer: coarse)').matches} />
              {query && <button className="catalogpage__clear" onClick={() => setQuery('')} aria-label="Clear"><X size={16} /></button>}
            </div>

            <div className="catalogpage__brand-bar">
              <button
                className={`brand-chip${!brand ? ' brand-chip--active' : ''}`}
                onClick={() => setBrand('')}
              >All brands</button>
              {brandOptions.map(([name]) => (
                <button
                  key={name}
                  className={`brand-chip${brand === name ? ' brand-chip--active' : ''}`}
                  onClick={() => setBrand(brand === name ? '' : name)}
                  title={name}
                >
                  {BRAND_LOGOS[name]
                    ? <img src={BRAND_LOGOS[name]} alt={name} className="brand-chip__logo" />
                    : name}
                </button>
              ))}
            </div>
            <div className="catalogpage__count-row">
              <p className="catalogpage__count">
                {results.length} result{results.length === 1 ? '' : 's'}
              </p>
              {baseGroupCats && groupActive && (
                <button className="catalogpage__show-all" onClick={() => { setGroupActive(false); setCategory(''); }}>
                  View full catalogue
                </button>
              )}
            </div>

            {(hasActiveFilters || (initialGroup && groupActive)) && (
              <div className="catalogpage__filters">
                {initialGroup && groupActive && (
                  <span className="filter-pill filter-pill--static">{initialGroup}</span>
                )}
                {query && (
                  <button className="filter-pill" onClick={() => setQuery('')}>
                    <span className="filter-pill__key">Search</span> “{query}” <X size={13} />
                  </button>
                )}
                {category && (
                  <button className="filter-pill" onClick={() => setCategory('')}>
                    <span className="filter-pill__key">Category</span> {category} <X size={13} />
                  </button>
                )}
                {brand && (
                  <button className="filter-pill" onClick={() => setBrand('')}>
                    <span className="filter-pill__key">Brand</span> {brand} <X size={13} />
                  </button>
                )}
                {hasActiveFilters && (
                  <button className="filter-pill__clear" onClick={clearFilters}>Clear all</button>
                )}
              </div>
            )}

            {/* Recently viewed */}
            {recentItems.length > 0 && !hasActiveFilters && (
              <div className="catalog__recent">
                <p className="catalog__recent-label"><Clock size={13} /> Recently viewed</p>
                <div className="catalog__recent-list">
                  {recentItems.map((item, i) => (
                    <button key={i} className="catalog__recent-chip" onClick={() => openItem(item)}>
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {results.length > 0 ? (<>
              <div className="catalog__grid" ref={gridRef}>
                {pageItems.map((item, idx) => (
                  <div className="catalog__item" role="button" tabIndex={0} key={`${item.category}-${idx}`}
                    onClick={() => openItem(item)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openItem(item); } }}>
                    <span className="catalog__item-media">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        ref={markLoaded}
                        referrerPolicy="no-referrer"
                        onLoad={(e) => e.currentTarget.classList.add('is-loaded')}
                        onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.classList.add('is-loaded'); }}
                      />
                      <span className="catalog__item-skel" aria-hidden="true" />
                    </span>
                    <span className="catalog__item-name">{item.name}</span>
                    {item.brand !== 'Other' && <span className="catalog__item-brand">{item.brand}</span>}
                    {onAddToCart && (
                      <button type="button" className={`catalog__item-quick-add${justAdded === item.name ? ' is-added' : ''}`}
                        aria-label={`Add ${item.name} to enquiry cart`}
                        onClick={(e) => { e.stopPropagation(); onAddToCart(item); flashAdded(item.name); }}>
                        {justAdded === item.name ? <><Check size={14} /> Added</> : <><Plus size={14} /> Add</>}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="catalog__pagination">
                  <button className="catalog__page-btn" onClick={() => goToPage(page - 1)} disabled={page === 1}>← Prev</button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
                    .reduce((acc, p, i, arr) => {
                      if (i > 0 && p - arr[i - 1] > 1) acc.push('…');
                      acc.push(p);
                      return acc;
                    }, [])
                    .map((p, i) =>
                      p === '…'
                        ? <span key={`ellipsis-${i}`} className="catalog__page-ellipsis">…</span>
                        : <button key={p} className={`catalog__page-btn${p === page ? ' catalog__page-btn--active' : ''}`} onClick={() => goToPage(p)}>{p}</button>
                    )}
                  <button className="catalog__page-btn" onClick={() => goToPage(page + 1)} disabled={page === totalPages}>Next →</button>
                </div>
              )}
            </>) : (
              <div className="catalogpage__noresults">
                <p className="catalogpage__empty">No matches found — can&apos;t find what you need?</p>
                <div className="catalogpage__request">
                  <h3>Request this product</h3>
                  <p>Tell us the model number or description and we&apos;ll source it or suggest an equivalent.</p>
                  <div className="req-form">
                    <input placeholder="Model / product description" value={reqModel} onChange={e => setReqModel(e.target.value)} />
                    <input placeholder="Your name" value={reqName} onChange={e => setReqName(e.target.value)} />
                    <input placeholder="Your phone" type="tel" value={reqPhone} onChange={e => setReqPhone(e.target.value)} />
                    <button className="btn btn--primary" onClick={sendRequest}><Send size={15} /> Send request on WhatsApp</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product detail modal */}
      {selectedItem && (
        <div className="item-modal" onClick={(e) => { if (e.target === e.currentTarget) setSelectedItem(null); }}>
          <div className="item-modal__panel">
            <div className="item-modal__header">
              <div>
                <span className="item-modal__cat">{selectedItem.category}</span>
                {selectedItem.brand !== 'Other' && <span className="item-modal__brand">{selectedItem.brand}</span>}
              </div>
              <button className="item-modal__close" onClick={() => setSelectedItem(null)} aria-label="Close"><X size={20} /></button>
            </div>

            <div className="item-modal__body">
              {selectedItem.image && (
                <div className="item-modal__img-wrap">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    ref={markLoaded}
                    onLoad={(e) => e.currentTarget.classList.add('is-loaded')}
                  />
                </div>
              )}
              <div className="item-modal__info">
                <h2 className="item-modal__title">{selectedItem.name}</h2>
                {(() => {
                  const hasOwnSpecs = selectedItem.specs && Object.keys(selectedItem.specs).length > 0;
                  const catInfo = CATEGORY_INFO[selectedItem.category];
                  const specs = hasOwnSpecs ? selectedItem.specs : catInfo?.specs;
                  const note = !hasOwnSpecs && catInfo?.note;
                  return (<>
                    {specs && (
                      <table className="item-modal__specs">
                        <tbody>
                          {Object.entries(specs).map(([k, v]) => (
                            <tr key={k}><th>{k}</th><td>{v}</td></tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                    {selectedItem.description && <p className="item-modal__desc">{selectedItem.description}</p>}
                    {note && <p className="item-modal__note">{note}</p>}
                  </>);
                })()}
              </div>
            </div>

            <div className="item-modal__footer">
              <button className="btn btn--primary"
                onClick={() => { onEnquire(selectedItem.category, selectedItem.name); setSelectedItem(null); }}>
                <Send size={16} /> Enquire on WhatsApp
              </button>
              {onAddToCart && (
                <button className="btn btn--ghost"
                  onClick={() => { onAddToCart(selectedItem); setSelectedItem(null); }}>
                  <ShoppingCart size={16} /> Add to enquiry cart
                </button>
              )}
              <button className="btn btn--ghost" onClick={() => setSelectedItem(null)}>Back</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CatalogPage;
