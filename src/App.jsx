/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Phone, Mail, MapPin, Menu, X, Check, Send, Copy, RotateCcw,
  ArrowRight, Plus, Cpu, Factory, CircuitBoard, Wrench, ShieldCheck, ChevronDown,
  Star, ShoppingCart, Trash2, MessageCircle, ArrowUp, CheckCircle, FileCheck, Truck,
  Search, ChevronLeft, ChevronRight
} from 'lucide-react';
import { products, CATEGORY_ORDER, CATEGORY_META } from './products';
import { fullCatalog, catalogCategoryOrder } from './catalog';
import CatalogPage, { catalogNav } from './CatalogPage';
import './App.css';
import './PremiumHome.css';

const WHATSAPP = '919781921116';

const SEO_PATH_ROUTES = {
  '/products/vfd-ac-drives/': '#/catalog/group/Drive%20%26%20Motion',
  '/products/plc-hmi/': '#/catalog/group/PLCs%20%26%20HMIs',
  '/products/switchgear-control-gear/': '#/catalog/group/Switchgear%20%26%20Control',
  '/products/sensors-limit-switches/': '#/catalog/group/Sensors%20%26%20Switches',
  '/products/process-instrumentation/': '#/catalog/group/Process%20Instrumentation',
  '/services/control-panel-manufacturing/': '#capabilities',
  '/services/vfd-drive-repair/': '#repair',
  '/industrial-automation-ludhiana/': '#top',
};

// Fades a product photo in once it finishes loading (handles cached images too)
function markLoaded(el) {
  if (el && el.complete) el.classList.add('is-loaded');
}

// Fades an element up into view the first time it crosses into the viewport.
function Reveal({ children, className = '', delay = 0, as: Tag = 'div', ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        obs.unobserve(el);
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

// Counts a stat (e.g. "287+", "1,000+") up from zero once it scrolls into view.
function StatPill({ num, label }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const match = num.match(/^([\d,]+)(.*)$/);
    if (!match) return;
    const target = parseInt(match[1].replace(/,/g, ''), 10);
    const suffix = match[2];
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.unobserve(el);
      const start = performance.now();
      const duration = 1200;
      const step = (now) => {
        const p = Math.min(Math.max((now - start) / duration, 0), 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(target * eased).toLocaleString('en-IN') + suffix);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [num]);
  return (
    <div className="stat-pill" ref={ref}>
      <span className="stat-pill__num">{display ?? num}</span>
      <span className="stat-pill__label">{label}</span>
    </div>
  );
}

// Authorized / core brands (verified dealerships). Other leading brands stocked on request.
const brandMarquee = [
  { name: 'Delta',      logo: '/images/brands/delta-ref.png'   },
  { name: 'Inovance',   logo: '/images/brands/inovance.png'    },
  { name: 'Selec',      logo: '/images/brands/selec.png'       },
  { name: 'Chint',      logo: '/images/brands/chint.png'       },
  { name: 'BCH',        logo: '/images/brands/bch-ref.jpg'     },
  { name: 'Lubi',       logo: '/images/brands/lubi.svg'        },
  { name: 'Teknic',     logo: '/images/brands/teknic.jpg'      },
  { name: 'Omron',      logo: '/images/brands/omron.jpg'       },
  { name: 'Panasonic',  logo: '/images/brands/panasonic.png'   },
  { name: 'Wago',       logo: '/images/brands/wago.jpg'        },
  { name: 'Schneider',  logo: '/images/brands/schneider.jpg'   },
  { name: 'Baumer',     logo: '/images/brands/baumer.jpg'      },
  { name: 'Nidec',      logo: '/images/brands/nidec.jpg'       },
  { name: 'Hust',       logo: '/images/brands/hust.jpg'        },
];

const industries = [
  'Textile & Weaving',
  'Plastic & Injection Moulding',
  'Machine Tool & CNC',
  'Automotive Components',
  'HVAC & Pumping',
  'Food & Packaging',
  'Process & Chemical',
  'General Manufacturing',
];

const faqList = [
  {
    id: 'faq-1',
    question: 'Do you build control panels in-house?',
    answer: 'Yes. PLC, VFD, MCC, PCC and APFC panels are designed, assembled and tested in our own Ludhiana workshop. Share your motor ratings, voltage, control logic and dimensional limits and we size and quote the panel for you.',
  },
  {
    id: 'faq-2',
    question: 'Can you find replacements for obsolete or discontinued parts?',
    answer: 'Sourcing hard-to-find parts is a core strength. We match the technical specification of your old drive, sensor or controller and recommend a form-fit-functional equivalent from Delta, Inovance, Selec, Chint or another stocked brand.',
  },
  {
    id: 'faq-3',
    question: 'Are the products genuine and warranted?',
    answer: 'All new products are 100% genuine and carry the standard manufacturer warranty. We supply proper GST invoices and assist with warranty-claim coordination.',
  },
  {
    id: 'faq-4',
    question: 'Do you supply outside Ludhiana?',
    answer: 'Yes. We are based in Millerganj, Ludhiana and supply factories, panel builders and OEMs across Punjab and India through express cargo.',
  },
];

const heroSlides = [
  { img: '/images/company/company-product-range.jpg', alt: 'Monika Engineers industrial automation product range', caption: '30 years of automation products and support', position: 'right center' },
  { img: '/images/company/plc-motion-control.jpg', alt: 'PLC and motion-control products supplied by Monika Engineers', caption: 'PLC and motion-control solutions', position: 'right center' },
  { img: '/images/company/servo-motor-drives.jpg', alt: 'Servo motors and drive systems supplied by Monika Engineers', caption: 'Servo motors and drive systems', position: 'right center' },
];

const googleReviews = [
  { name: 'Paramjit Singh', rating: 5, text: 'Best people in trade, qualified and cooperative staff who understand customer requirements for factory automation.', role: 'Google review' },
  { name: 'Sandeep Singh', rating: 5, text: 'Super helpful staff and excellent engineering services.', role: 'Google review' },
  { name: 'Baljit Singh', rating: 5, text: 'Good service and support for PLC, servo, HMI, drives and SCADA installation. A cooperative and qualified engineering team.', role: 'Google review' },
];

const AVATAR_COLORS = ['#d6510a','#17243b','#2c5282','#276749','#744210'];
function avatarColor(name) {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) & 0xff;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartSent, setCartSent] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const slideTimer = useRef(null);
  const [navCatalogOpen, setNavCatalogOpen] = useState(false);

  // Contact form
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');

  // Quick enquiry wizard
  const [wizStep, setWizStep] = useState(1);
  const [wizRole, setWizRole] = useState('');
  const [wizFocus, setWizFocus] = useState('');
  const [copied, setCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [hoverStep, setHoverStep] = useState(-1);

  const handleCallClick = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    e.preventDefault();
    navigator.clipboard?.writeText('+91 97819 21116');
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 1800);
  };

  // Full industrial supplies catalog — opened as its own hash-routed page (#/catalog)
  const [route, setRoute] = useState(window.location.hash);
  const [pendingScroll, setPendingScroll] = useState('');

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    const onScroll = () => setShowTop(window.scrollY > 420);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const siteQuery = new URLSearchParams(window.location.search).get('q');
    if (!window.location.hash && siteQuery) {
      window.location.hash = `#/catalog?q=${encodeURIComponent(siteQuery)}`;
      return;
    }
    const mappedHash = SEO_PATH_ROUTES[window.location.pathname];
    if (!window.location.hash && mappedHash) window.location.hash = mappedHash;
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = `https://www.monikaengineers.co.in${window.location.pathname === '/' ? '/' : window.location.pathname}`;
  }, []);

  // After exiting catalog page, scroll to the pending section
  useEffect(() => {
    if (!route.startsWith('#/catalog') && pendingScroll) {
      requestAnimationFrame(() => {
        const el = document.getElementById(pendingScroll);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
      setPendingScroll('');
    }
  }, [route, pendingScroll]);

  useEffect(() => {
    if (route.startsWith('#/catalog')) window.scrollTo(0, 0);
  }, [route]);

  // Header gains a shadow once the page is scrolled past the hero
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: highlight the nav link for the section currently in view
  const [activeSection, setActiveSection] = useState('');
  useEffect(() => {
    if (route.startsWith('#/catalog')) return;
    const ids = ['capabilities', 'brands', 'repair', 'about', 'products', 'enquiry', 'contact'];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const clearAtTop = () => {
      if (window.scrollY < 160) setActiveSection('');
    };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    els.forEach((el) => obs.observe(el));
    clearAtTop();
    window.addEventListener('scroll', clearAtTop, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener('scroll', clearAtTop);
    };
  }, [route]);

  // Hero photo auto-advance
  useEffect(() => {
    slideTimer.current = setInterval(() => setSlideIdx(i => (i + 1) % heroSlides.length), 5500);
    return () => clearInterval(slideTimer.current);
  }, []);
  const goSlide = (dir) => {
    clearInterval(slideTimer.current);
    setSlideIdx(i => (i + dir + heroSlides.length) % heroSlides.length);
    slideTimer.current = setInterval(() => setSlideIdx(i => (i + 1) % heroSlides.length), 5500);
  };

  // Enquiry cart helpers
  const addToCart = (item) => setCartItems(prev =>
    prev.find(p => p.name === item.name) ? prev : [...prev, item]
  );
  const removeFromCart = (name) => setCartItems(prev => prev.filter(p => p.name !== name));
  const sendCartEnquiry = () => {
    const lines = cartItems.map(i => `• ${i.name} (${i.category})`).join('\n');
    openWhatsApp(`Monika Engineers — Bulk Enquiry\n-----------------------------\n${lines}\n\nPlease share availability, pricing and delivery for the above items.`);
    setCartSent(true);
    setTimeout(() => {
      setCartSent(false);
      setCartItems([]);
      setCartOpen(false);
    }, 3500);
  };

  const isCatalogPage = route.startsWith('#/catalog');
  const [catalogRoutePath, catalogRouteQuery = ''] = isCatalogPage
    ? route.replace('#/catalog', '').split('?')
    : ['', ''];
  const catalogQueryParams = new URLSearchParams(catalogRouteQuery);
  const catalogInitialQuery = catalogQueryParams.get('q') || '';
  const catalogInitialGroup = isCatalogPage && catalogRoutePath.includes('/group/')
    ? decodeURIComponent(catalogRoutePath.split('/group/')[1] || '')
    : '';
  const catalogInitialBrand = isCatalogPage && catalogRoutePath.includes('/brand/')
    ? decodeURIComponent(catalogRoutePath.split('/brand/')[1] || '')
    : '';
  const catalogInitialCategory = !catalogInitialGroup && !catalogInitialBrand && isCatalogPage
    ? decodeURIComponent(catalogRoutePath.replace(/^\//, ''))
    : '';
  const fullCatalogCount = useMemo(
    () => catalogCategoryOrder.reduce((n, cat) => n + fullCatalog[cat].length, 0),
    []
  );

  const grouped = useMemo(() => {
    return CATEGORY_ORDER.map((cat) => ({
      category: cat,
      meta: CATEGORY_META[cat],
      items: products.filter((p) => p.category === cat),
    })).filter((g) => g.items.length > 0);
  }, []);

  const wizardMessage = useMemo(() => {
    if (!wizRole || !wizFocus) return '';
    return [
      'Monika Engineers — Enquiry',
      '-----------------------------',
      `Role: ${wizRole}`,
      `Looking for: ${wizFocus}`,
      'Please share pricing, specification and availability. Equivalent model suggestions welcome if a standard model is not in stock.',
    ].join('\n');
  }, [wizRole, wizFocus]);

  const openWhatsApp = (text) => {
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const handleCategoryEnquiry = (category, brandsIn) => {
    const label = CATEGORY_META[category]?.label || category;
    openWhatsApp(`Monika Engineers — Enquiry\n-----------------------------\nCategory: ${label}\nBrands: ${brandsIn.join(', ')}\nRequest: please share available models, pricing and specifications.`);
  };

  const handleItemEnquiry = (categoryLabel, itemName) => {
    openWhatsApp(`Monika Engineers — Enquiry\n-----------------------------\nCategory: ${categoryLabel}\nItem: ${itemName}\nRequest: please share pricing, specification and availability.`);
  };

  const goToCatalogCategory = (cat) => {
    setNavCatalogOpen(false);
    setMobileOpen(false);
    setActiveSection('');
    window.location.hash = cat ? `#/catalog/${encodeURIComponent(cat)}` : '#/catalog';
  };

  const goToCatalogGroup = (group) => {
    setNavCatalogOpen(false);
    setMobileOpen(false);
    setActiveSection('');
    window.location.hash = `#/catalog/group/${encodeURIComponent(group)}`;
  };

  const goToCatalogBrand = (brandName) => {
    setActiveSection('');
    window.location.hash = `#/catalog/brand/${encodeURIComponent(brandName)}`;
  };

  const exitCatalogPage = () => { window.location.hash = '#top'; };

  // ── FIX 3: Smart nav — exits catalog page first, then scrolls to target section
  const navigateTo = (e, sectionId) => {
    e.preventDefault();
    setNavCatalogOpen(false);
    setMobileOpen(false);
    if (isCatalogPage) {
      // Exit catalog; pendingScroll useEffect will handle the scroll after re-render
      setPendingScroll(sectionId);
      window.location.hash = '#home';
    } else if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('');
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.location.hash = `#${sectionId}`;
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    openWhatsApp([
      'Monika Engineers — Enquiry',
      '-----------------------------',
      `Name: ${formName || 'Not provided'}`,
      `Phone: ${formPhone || 'Not provided'}`,
      'Requirement:',
      formMessage || 'Please contact me regarding industrial automation products and panels.',
    ].join('\n'));
  };

  const copyWizard = () => {
    if (!wizardMessage) return;
    navigator.clipboard?.writeText(wizardMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const resetWizard = () => { setWizStep(1); setWizRole(''); setWizFocus(''); };

  const navLinks = [
    ['#top', 'Home'],
    ['#brands', 'Brands'],
    ['#about', 'About'],
    ['#capabilities', 'Solutions'],
    ['#repair', 'Services'],
    ['#catalog', 'Products'],
    ['#contact', 'Contact'],
  ];

  return (
    <div className="shell">
      <a className="skip-link" href="#top">Skip to content</a>
      <div className="authority-bar">
        <div className="container authority-bar__inner">
          <span>Trusted Inovance channel partner</span>
          <a href="https://www.inovance.eu/es/india/news/details?cHash=c137d4eaa6455f2103ea9b36ef7dcf45&tx_news_pi1%5Baction%5D=detail&tx_news_pi1%5Bcontroller%5D=News&tx_news_pi1%5Bnews%5D=415" target="_blank" rel="noreferrer">
            MACHAUTO EXPO 2026 <ArrowRight size={12} />
          </a>
        </div>
      </div>
      {/* Header */}
      <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="container header__inner">
          <a href="#top" className="brand">
            <img src="/logo-header.webp" alt="Monika Engineers" className="brand__logo-full" width="1000" height="218" />
          </a>

          <nav className="nav" aria-label="Primary">
            {navLinks.map(([href, label]) => {
              if (href === '#catalog') {
                return (
                  <div className="navdrop" key={href}>
                    <button
                      className={`nav__link navdrop__trigger${!isCatalogPage && activeSection === 'products' ? ' is-active' : ''}`}
                      onClick={() => setNavCatalogOpen((o) => !o)}
                      aria-expanded={navCatalogOpen}
                    >
                      {label} <ChevronDown size={14} className={navCatalogOpen ? 'is-open' : ''} />
                    </button>
                    {navCatalogOpen && (
                      <div className="navdrop__menu">
                        <button className="navdrop__item navdrop__item--all" onClick={() => goToCatalogCategory(null)}>
                          <span>Search all products</span>
                          <ArrowRight size={14} />
                        </button>
                        {catalogNav.map(([cat, count]) => (
                          <button key={cat} className="navdrop__item" onClick={() => goToCatalogCategory(cat)}>
                            <span>{cat}</span>
                            <span className="navdrop__item-count">{count}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              const sectionId = href.replace('#', '');
              const isActive = !isCatalogPage && (sectionId === 'top' ? activeSection === '' : activeSection === sectionId);
              return (
                <a
                  key={href}
                  href={href}
                  className={`nav__link${isActive ? ' is-active' : ''}`}
                  onClick={(e) => navigateTo(e, sectionId)}
                >{label}</a>
              );
            })}
          </nav>
          {navCatalogOpen && <div className="navdrop-backdrop" onClick={() => setNavCatalogOpen(false)} />}

          <div className="header__cta">
            <a className="btn btn--primary" href="#enquiry">Request a quote</a>
          </div>

          <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`drawer-backdrop ${mobileOpen ? 'is-open' : ''}`} onClick={() => setMobileOpen(false)} />
      <aside className={`drawer ${mobileOpen ? 'is-open' : ''}`}>
        <div className="drawer__head">
          <img src="/logo-header.webp" alt="Monika Engineers" className="drawer__logo-full" />
          <button onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={22} /></button>
        </div>
        <nav className="drawer__nav">
          {navLinks.map(([href, label]) => {
            if (href === '#catalog') {
              return (
                <div className="drawer__navdrop" key={href}>
                  <button
                    className="drawer__link drawer__navdrop-trigger"
                    onClick={() => setNavCatalogOpen((o) => !o)}
                    aria-expanded={navCatalogOpen}
                  >
                    <span>{label}</span>
                    <ChevronDown size={16} className={navCatalogOpen ? 'is-open' : ''} />
                  </button>
                  {navCatalogOpen && (
                    <div className="drawer__navdrop-menu">
                      <button className="drawer__navdrop-item drawer__navdrop-item--all" onClick={() => goToCatalogCategory(null)}>
                        <span>Search all products</span>
                        <ArrowRight size={14} />
                      </button>
                      {catalogNav.map(([cat, count]) => (
                        <button key={cat} className="drawer__navdrop-item" onClick={() => goToCatalogCategory(cat)}>
                          <span>{cat}</span>
                          <span>{count}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            const sId = href.replace('#', '');
            return <a key={href} href={href} className={`drawer__link${!isCatalogPage && activeSection === sId ? ' is-active' : ''}`} onClick={(e) => navigateTo(e, sId)}>{label}</a>;
          })}
        </nav>
        <div className="drawer__cta">
          <a className="btn btn--ghost" href="tel:+919781921116" onClick={() => setMobileOpen(false)}><Phone size={16} /> Call now</a>
          <a className="btn btn--primary" href="#enquiry" onClick={() => setMobileOpen(false)}>Get a quote</a>
        </div>
      </aside>

      {isCatalogPage ? (
        <main>
          <CatalogPage key={route} initialQuery={catalogInitialQuery} initialCategory={catalogInitialCategory} initialGroup={catalogInitialGroup} initialBrand={catalogInitialBrand} onBack={exitCatalogPage} onEnquire={handleItemEnquiry} onAddToCart={addToCart} />
        </main>
      ) : (
      <main id="top">
        <section className="power-hero">
          <div className="container power-hero__grid">
            <div className="power-hero__copy">
              <h1>Industrial automation, engineered around your production.</h1>
              <p className="power-hero__lead">Automation products, control panels and engineering support from one experienced Ludhiana team.</p>
              <div className="power-hero__actions">
                <button className="btn btn--power" onClick={() => goToCatalogCategory(null)}>Browse catalogue <ArrowRight size={16} /></button>
                <a className="btn btn--power-ghost" href="tel:+919781921116" onClick={handleCallClick}>
                  {phoneCopied ? 'Number copied: +91 97819 21116' : 'Talk to an engineer'}
                </a>
              </div>
              <p className="power-hero__since">Serving manufacturers since 1996</p>
            </div>

            <div className="hero-media" aria-live="polite">
              {heroSlides.map((slide, i) => (
                <img key={slide.img} src={slide.img} alt={slide.alt} className={`hero-media__image${i === slideIdx ? ' is-active' : ''}`} style={{ objectPosition: slide.position }} loading={i === 0 ? 'eager' : 'lazy'} />
              ))}
              <div className="hero-media__bar">
                <span>{heroSlides[slideIdx].caption}</span>
                <span className="hero-media__count">{String(slideIdx + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}</span>
                <div className="hero-media__controls">
                  <button onClick={() => goSlide(-1)} aria-label="Previous image"><ChevronLeft size={18} /></button>
                  <button onClick={() => goSlide(1)} aria-label="Next image"><ChevronRight size={18} /></button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section className="stats-strip">
          <div className="container stats-strip__grid">
            {[['30', 'Years of industrial experience'],['1,000+', 'Customers served'],[`${fullCatalogCount}`, 'Product lines'],['14', 'Leading automation brands']].map(([n, l]) => (
              <StatPill key={l} num={n} label={l} />
            ))}
          </div>
        </section>

        {/* Brand strip */}
        <section className="brands section" id="brands">
          <div className="container">
            <Reveal as="div" className="brands__hd">
              <h2 className="brands__label">Automation brands we supply and support</h2>
              <span className="brands__label-sub">Select a brand to browse products</span>
            </Reveal>
            <div className="brands__grid">
              {brandMarquee.map((b) => (
                <button key={b.name} className="brand-card" onClick={() => goToCatalogBrand(b.name)}>
                  <div className="brand-card__img">
                    <img src={b.logo} alt={b.name} loading="lazy" />
                  </div>
                  <span className="brand-card__name">{b.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="section" id="about">
          <div className="container about__grid">
            <Reveal className="about__media">
              <img src="/images/home-about.jpg" alt="Factory automation data displayed beside an industrial production line" loading="lazy" />
            </Reveal>
            <Reveal className="about__copy" delay={120}>
              <span className="eyebrow">Who we are</span>
              <h2 className="section__title section__title--underline">A manufacturer and integrator, not just a supplier.</h2>
              <p className="prose">
                Since 1996, factories, panel builders and OEMs across Punjab have relied on us for genuine
                automation products, in-house panel building and practical commissioning support.
              </p>
              <ul className="checklist">
                <li><Check size={17} /> Drives matched to real machine loads, not catalogue numbers</li>
                <li><Check size={17} /> Genuine products with manufacturer warranty and GST invoicing</li>
                <li><Check size={17} /> Panels wired and tested before they reach your floor</li>
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Capabilities */}
        <section className="section solutions-section" id="capabilities">
          <div className="container">
            <Reveal as="div" className="solutions-section__head">
              <div>
                <span className="eyebrow">Solutions that keep industry moving</span>
                <h2 className="section__title">From concept to commissioning. Backed for life.</h2>
              </div>
              <p className="section__sub">One accountable engineering partner for product selection, panel building, programming, commissioning and after-sales support.</p>
            </Reveal>
            <div className="solution-flow" onMouseLeave={() => setHoverStep(-1)}>
              <div className="solution-flow__line" aria-hidden="true" style={{ '--fill': `${((hoverStep + 1) / 5) * 100}%` }}><span /></div>
              {[
                { icon: Search, title: 'Product selection', text: 'Right components, correctly sized.' },
                { icon: CircuitBoard, title: 'Panel build', text: 'Engineered and assembled in-house.' },
                { icon: Cpu, title: 'Programming', text: 'PLC, HMI and drive configuration.' },
                { icon: Factory, title: 'Commissioning', text: 'On-site startup and validation.' },
                { icon: ShieldCheck, title: 'Support', text: 'Responsive after-sales assistance.' },
              ].map(({ icon: Icon, title, text }, i) => (
                <Reveal as="article" className="solution-step" key={title} delay={i * 80} onMouseEnter={() => setHoverStep(i)}>
                  <span className="solution-step__num">0{i + 1}</span>
                  <span className="solution-step__icon"><Icon size={22} strokeWidth={1.6} /></span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Drive Repair & Service */}
        <section className="repair-section" id="repair">
          <div className="container repair__layout">
            <div className="repair__content">
              <Reveal as="div">
                <span className="eyebrow">Repair &amp; service</span>
                <h2 className="section__title section__title--light">Keep your drives running.</h2>
                <p className="section__sub">Component-level diagnosis and repair for AC drives, servo drives and spindle drives, followed by functional testing.</p>
              </Reveal>
              <div className="repair__grid">
                {[
                  { icon: Wrench, title: 'Multi-brand expertise', text: 'Support for Delta, Inovance, Yaskawa, Siemens, ABB, Mitsubishi and other major brands.' },
                  { icon: ShieldCheck, title: 'Warranty on repair work', text: 'Warranty is provided for the repair work performed, with clear communication before work begins.' },
                  { icon: CircuitBoard, title: 'Board-level diagnosis', text: 'Fault tracing and component replacement for power and control sections where repair is viable.' },
                  { icon: Factory, title: 'On-site support', text: 'Technical support can be arranged for larger installations in Ludhiana and nearby industrial areas.' },
                ].map(({ icon: Icon, title, text }, i) => (
                  <Reveal as="article" className="repair-card" key={title} delay={i * 60}>
                    <Icon size={20} strokeWidth={1.6} className="repair-card__icon" />
                    <div><h3 className="repair-card__title">{title}</h3><p className="repair-card__text">{text}</p></div>
                  </Reveal>
                ))}
              </div>
              <a className="btn btn--repair" href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hi Monika Engineers, I need drive repair service. Please let me know what details you require (make, model, fault description).')}`} target="_blank" rel="noreferrer">
                Discuss a repair <ArrowRight size={16} />
              </a>
            </div>
            <Reveal className="repair__media" delay={100}>
              <img src="/images/company/drive-board-repair.jpg" alt="Technician soldering an industrial drive circuit board" loading="lazy" />
              <img src="/images/company/automation-parts-stock.jpg" alt="Automation components stocked on workshop shelves" loading="lazy" />
            </Reveal>
          </div>
        </section>

        <section className="partner-feature" aria-labelledby="partner-title">
          <div className="container partner-feature__grid">
            <Reveal className="partner-feature__copy">
              <p className="partner-feature__logos"><span>MONIKA ENGINEERS</span><b>×</b><span>INOVANCE</span></p>
              <span className="eyebrow">Trusted channel partnership</span>
              <h2 id="partner-title">Automation innovation on North India&apos;s biggest industrial stage.</h2>
              <p>Monika Engineers joined Inovance at MACHAUTO EXPO 2026 in Ludhiana, presenting drive, motion-control and machine-automation technology to manufacturers and machine builders.</p>
              <a className="btn btn--partner" href="https://www.inovance.eu/es/india/news/details?cHash=c137d4eaa6455f2103ea9b36ef7dcf45&tx_news_pi1%5Baction%5D=detail&tx_news_pi1%5Bcontroller%5D=News&tx_news_pi1%5Bnews%5D=415" target="_blank" rel="noreferrer">Read the Inovance feature <ArrowRight size={16} /></a>
            </Reveal>
            <Reveal className="partner-feature__products" delay={100}>
              <img src="/images/products/inovance-md310.jpg" alt="Inovance MD310 AC drive" loading="lazy" />
              <img src="/images/products/inovance-sv630.jpeg" alt="Inovance SV630 servo drive" loading="lazy" />
              <div className="partner-feature__stamp"><strong>MACHAUTO</strong><span>EXPO 2026 · LUDHIANA</span></div>
            </Reveal>
          </div>
        </section>

        {/* Products — category showcase */}
        <section className="section has-ghost" id="products">
          <span className="ghost-text" aria-hidden="true">SUPPLY</span>
          <div className="container">
            <Reveal as="div">
              <span className="eyebrow">What we supply</span>
              <h2 className="section__title section__title--underline">Products</h2>
              <p className="section__sub">
                Genuine automation products from the brands below — stocked, supplied and supported across
                Punjab and India. Pick a range and we&apos;ll send the right model and pricing.
              </p>
            </Reveal>

            <div className="catgrid">
              {grouped.slice(0, 3).map(({ category, meta, items }, i) => {
                const brandsIn = [...new Set(items.map((i) => i.brand))];
                const thumb = items.find((i) => i.image)?.image;
                return (
                  <Reveal as="article" className="catcard catcard--clickable" key={category} delay={(i % 6) * 60} onClick={() => goToCatalogGroup(category)}>
                    {thumb && (
                      <div className="catcard__media">
                        <img
                          src={thumb}
                          alt=""
                          loading="lazy"
                          ref={markLoaded}
                          onLoad={(e) => e.currentTarget.classList.add('is-loaded')}
                        />
                      </div>
                    )}
                    <h3 className="catcard__title">{meta?.label || category}</h3>
                    {meta?.blurb && <p className="catcard__blurb">{meta.blurb}</p>}
                    <p className="catcard__brands">{brandsIn.join(' · ')}</p>
                    <div className="catcard__actions">
                      <span className="catcard__cta">
                        Browse range <ArrowRight size={15} />
                      </span>
                      <button className="catcard__enquire" onClick={(e) => { e.stopPropagation(); handleCategoryEnquiry(category, brandsIn); }}>
                        Quick enquiry
                      </button>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <div className="catalog__link">
              <button className="btn btn--ghost" onClick={() => goToCatalogCategory(null)}>
                Browse the full industrial supplies catalog ({fullCatalogCount}+ items) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="section hiw" id="process">
          <div className="container">
            <Reveal as="div" className="hiw__head">
              <span className="eyebrow eyebrow--center">How it works</span>
              <h2 className="section__title">From enquiry to running machine</h2>
            </Reveal>
            <div className="hiw__grid">
              {[
                { n: '01', icon: MessageCircle, t: 'Send your requirement', d: 'WhatsApp your product list, motor rating — or just a photo of the old part’s nameplate.' },
                { n: '02', icon: FileCheck, t: 'Get the right model & price', d: 'We match the exact model or a drop-in equivalent, and come back with pricing and availability.' },
                { n: '03', icon: Truck, t: 'Dispatch & support', d: 'Same-day dispatch on stocked items with GST invoice — and commissioning help when you need it.' },
              ].map(({ n, icon: Icon, t, d }, i) => (
                <Reveal as="article" className="hiw__step" key={n} delay={i * 110}>
                  <div className="hiw__icon"><Icon size={22} strokeWidth={1.7} /></div>
                  <span className="hiw__num">{n}</span>
                  <h3 className="hiw__t">{t}</h3>
                  <p className="hiw__d">{d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Quick enquiry wizard */}
        <section className="section section--navy grain" id="enquiry">
          <div className="container enquiry__grid">
            <Reveal as="div" className="enquiry__intro">
              <span className="eyebrow">Quick enquiry</span>
              <h2 className="section__title section__title--light">Tell us what you need in two taps.</h2>
              <p className="enquiry__lead">
                Pick your role and what you&apos;re after — we&apos;ll build a tidy WhatsApp message you can send or copy,
                so we can come back with pricing and the right model fast.
              </p>
              <div className="enquiry__direct">
                <ShieldCheck size={18} />
                <span>Prefer to talk? Call <a href="tel:+919781921116">+91 97819 21116</a></span>
              </div>
            </Reveal>

            <Reveal as="div" className="wizard" delay={120}>
              <div className="wizard__steps">
                {[1, 2, 3].map((n) => (
                  <span key={n} className={`wizard__dot ${wizStep >= n ? 'is-active' : ''}`} />
                ))}
              </div>

              {wizStep === 1 && (
                <div className="wizard__panel">
                  <h3 className="wizard__q">1 · Your role</h3>
                  <div className="wizard__opts">
                    {[
                      ['Factory owner / manager', 'Fast replacement spares, minimum downtime'],
                      ['Panel builder / OEM', 'Breakers, contactors, terminals, custom panels'],
                      ['Maintenance engineer', 'Sensors, controllers, protection relays'],
                      ['Trader / wholesaler', 'Bulk supply and competitive pricing'],
                    ].map(([t, d]) => (
                      <button key={t} className={`wopt ${wizRole === t ? 'is-sel' : ''}`}
                        onClick={() => { setWizRole(t); setWizStep(2); }}>
                        <span className="wopt__t">{t}</span>
                        <span className="wopt__d">{d}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {wizStep === 2 && (
                <div className="wizard__panel">
                  <h3 className="wizard__q">2 · What you&apos;re after</h3>
                  <div className="wizard__opts wizard__opts--two">
                    {[
                      ['AC drives & servos', 'Delta, Inovance, CTB spindle drives'],
                      ['PLCs & HMIs', 'Delta DVP/DOP, Inovance controllers'],
                      ['Switchgear & relays', 'Chint MCBs/contactors, BCH starters'],
                      ['Sensors & limit switches', 'Teknik proximity & limit switches'],
                      ['Instrumentation', 'Selec timers, counters, PID controllers'],
                      ['Control panel / project', 'Full panel build or integration'],
                    ].map(([t, d]) => (
                      <button key={t} className={`wopt ${wizFocus === t ? 'is-sel' : ''}`}
                        onClick={() => { setWizFocus(t); setWizStep(3); }}>
                        <span className="wopt__t">{t}</span>
                        <span className="wopt__d">{d}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {wizStep === 3 && (
                <div className="wizard__panel">
                  <h3 className="wizard__q">3 · Send it</h3>
                  <pre className="wizard__preview">{wizardMessage}</pre>
                  <div className="wizard__send">
                    <button className="btn btn--primary" onClick={() => openWhatsApp(wizardMessage)}>
                      <Send size={16} /> Send on WhatsApp
                    </button>
                    <button className="btn btn--on-dark" onClick={copyWizard}>
                      <Copy size={16} /> {copied ? 'Copied' : 'Copy text'}
                    </button>
                  </div>
                </div>
              )}

              <div className="wizard__foot">
                {wizStep > 1
                  ? <button className="wizard__link" onClick={() => setWizStep((s) => s - 1)}>← Back</button>
                  : <span />}
                {wizStep === 3 &&
                  <button className="wizard__link" onClick={resetWizard}><RotateCcw size={13} /> Start over</button>}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Industries */}
        <section className="section" id="industries">
          <div className="container industries__inner">
            <Reveal as="div">
              <span className="eyebrow">Where we work</span>
              <h2 className="section__title section__title--underline">Industries served</h2>
              <p className="section__sub">Automation, drives and control products trusted across Punjab&apos;s key manufacturing sectors since 1996.</p>
            </Reveal>
            <ul className="industries__list">
              {industries.map((i, idx) => <Reveal as="li" key={i} className="industries__item" delay={idx * 50}>{i}</Reveal>)}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="section section--mist" id="faq">
          <div className="container faq__wrap">
            <Reveal className="faq__intro">
              <span className="eyebrow">Good to know</span>
              <h2 className="section__title section__title--underline">Common questions</h2>
            </Reveal>
            <div className="faq__list">
              {faqList.map((f) => {
                const open = activeFaq === f.id;
                return (
                  <div className={`faq ${open ? 'is-open' : ''}`} key={f.id}>
                    <button className="faq__q" onClick={() => setActiveFaq(open ? null : f.id)} aria-expanded={open}>
                      <span>{f.question}</span>
                      <Plus className="faq__icon" size={18} />
                    </button>
                    <div className="faq__a"><p>{f.answer}</p></div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="section" id="contact">
          <div className="container contact__grid">
            <Reveal as="div" className="contact__info">
              <span className="eyebrow">Get in touch</span>
              <h2 className="section__title section__title--underline">Let&apos;s price your requirement.</h2>
              <p className="prose">
                Send your product list, motor ratings or panel requirement and we&apos;ll come back with pricing,
                specifications and the right model — including equivalents for anything obsolete.
              </p>
              <div className="contact__points">
                <a className="cpoint" href="tel:+919781921116"><Phone size={18} /><span><b>+91 97819 21116</b><br />+91 98728 46445</span></a>
                <a className="cpoint" href="mailto:vikas@monikaengineers.co.in"><Mail size={18} /><span>vikas@monikaengineers.co.in</span></a>
                <a className="cpoint" href="https://maps.google.com/?q=Monika+Engineers+Millerganj+Ludhiana" target="_blank" rel="noreferrer"><MapPin size={18} /><span>Millerganj, Ludhiana, Punjab — 141003</span></a>
              </div>
              <div className="contact__map">
                <iframe title="Monika Engineers location" src="https://maps.google.com/maps?q=30.8922649,75.8650452&z=17&output=embed" width="100%" height="220" style={{border:0,borderRadius:'8px'}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </Reveal>

            <Reveal as="form" className="contact__form" delay={120} onSubmit={handleFormSubmit}>
              <label className="field">
                <span>Your name</span>
                <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="e.g. Harpreet Singh" required />
              </label>
              <label className="field">
                <span>Mobile number</span>
                <input type="tel" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} placeholder="e.g. 98765 43210" required />
              </label>
              <label className="field">
                <span>Requirement</span>
                <textarea value={formMessage} onChange={(e) => setFormMessage(e.target.value)} rows={4} placeholder="Models, HP/kW ratings, panel details or repair support…" required />
              </label>
              <button className="btn btn--primary" type="submit"><Send size={16} /> Send on WhatsApp</button>
              <p className="contact__note">Opens WhatsApp with your details filled in — nothing is sent until you press send.</p>
            </Reveal>
          </div>
        </section>
      </main>
      )}

      {/* Google Reviews */}
      <section className="section section--mist reviews-section has-ghost">
        <span className="ghost-text" aria-hidden="true">TRUSTED</span>
        <div className="container">
          <Reveal as="div" style={{textAlign:'center',marginBottom:'2.5rem'}}>
            <span className="eyebrow eyebrow--center">What customers say</span>
            <h2 className="section__title" style={{marginBottom:'0.5rem'}}>Trusted by Punjab industry</h2>
            <p className="section__sub" style={{margin:'0 auto'}}>4.3 on Google · 37 verified reviews</p>
          </Reveal>
          <div className="reviews__grid">
            {googleReviews.map(({ name, rating, text, role }, i) => (
              <Reveal as="article" className="review-card" key={name} delay={i * 70}>
                <div className="review-card__stars">{Array.from({length:rating}).map((_,j)=><Star key={j} size={14} fill="currentColor" />)}</div>
                <p className="review-card__text">&ldquo;{text}&rdquo;</p>
                <div className="review-card__author">
                  <div className="review-card__avatar" style={{background: avatarColor(name)}}>{name.charAt(0)}</div>
                  <div className="review-card__author-info"><strong>{name}</strong><span>{role}</span></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-footer CTA */}
      <section className="prefooter grain">
        <div className="container prefooter__inner">
          <div className="prefooter__copy">
            <span className="eyebrow">Ready when you are</span>
            <h2 className="prefooter__title">Need a price today?</h2>
            <p className="prefooter__sub">Send your product list or motor rating on WhatsApp — we reply during business hours, usually within the hour.</p>
          </div>
          <div className="prefooter__actions">
            <a className="btn btn--primary" href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hi Monika Engineers, please share pricing for my requirement.')}`} target="_blank" rel="noreferrer">
              <MessageCircle size={17} /> WhatsApp us now
            </a>
            <a className="btn btn--on-dark" href="tel:+919781921116"><Phone size={16} /> +91 97819 21116</a>
          </div>
        </div>
      </section>

      {/* Footer */}

      <footer className="footer">
        <div className="container footer__grid">
          <div>
            <img src="/logo-header.webp" alt="Monika Engineers" className="footer__logo" />
            <p className="footer__text">
              Industrial process instrumentation, automation and in-house control-panel manufacturing in
              Millerganj, Ludhiana since 1996.
            </p>
          </div>
          <div>
            <h4 className="footer__h">Brands</h4>
            <ul className="footer__links">
              {['Delta Electronics','Inovance','Selec','Chint & BCH','Lubi & Teknik'].map(b => (
                <li key={b}><button className="footer__link-btn" onClick={() => goToCatalogBrand(b.split(' ')[0])}>{b}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="footer__h">Quick links</h4>
            <ul className="footer__links">
              <li><a href="#about">About us</a></li>
              <li><a href="#capabilities">Capabilities</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#repair">Drive repair</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer__h">Contact</h4>
            <ul className="footer__links footer__links--contact">
              <li><a href="tel:+919781921116">+91 97819 21116</a></li>
              <li><a href="tel:+919872846445">+91 98728 46445</a></li>
              <li><a href="mailto:vikas@monikaengineers.co.in">vikas@monikaengineers.co.in</a></li>
              <li>Millerganj, Ludhiana — 141003</li>
              <li className="footer__hours">Mon–Sat · 9 AM – 7 PM</li>
            </ul>
          </div>
        </div>
        <div className="container footer__bottom">
          <span>© {new Date().getFullYear()} Monika Engineers. All rights reserved.</span>
          <div className="footer__legal">
            <span className="footer__gstin">GSTIN 03ABFPB7490P1ZE</span>
            <span className="footer__sep-dot">·</span>
            <span>Est. 1996</span>
            <span className="footer__sep-dot">·</span>
            <span>Millerganj, Ludhiana</span>
          </div>
        </div>
      </footer>
      {/* Back to top */}
      <button className={`back-to-top${showTop ? ' is-visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
        <ArrowUp size={20} />
      </button>

      {/* WhatsApp sticky */}
      <a className="wa-sticky" href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hi Monika Engineers, I would like to enquire about your products and services.')}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <MessageCircle size={26} />
      </a>

      {/* Enquiry cart button */}
      {cartItems.length > 0 && (
        <button className="cart-sticky" onClick={() => setCartOpen(true)} aria-label="Open enquiry cart">
          <ShoppingCart size={22} />
          <span className="cart-sticky__count">{cartItems.length}</span>
        </button>
      )}

      {/* Cart drawer */}
      {cartOpen && (
        <div className="cart-backdrop" onClick={() => setCartOpen(false)}>
          <aside className="cart-drawer" onClick={e => e.stopPropagation()}>
            <div className="cart-drawer__head">
              <h3>Enquiry Cart ({cartItems.length})</h3>
              <button onClick={() => setCartOpen(false)}><X size={20} /></button>
            </div>
            {cartSent ? (
              <div className="cart-drawer__sent">
                <CheckCircle size={48} className="cart-drawer__sent-icon" />
                <h4>Enquiry sent!</h4>
                <p>WhatsApp is opening with your {cartItems.length} items. We&apos;ll reply with pricing shortly.</p>
              </div>
            ) : (
              <ul className="cart-drawer__list">
                {cartItems.map(item => (
                  <li key={item.name} className="cart-drawer__item">
                    <div>
                      <p className="cart-drawer__name">{item.name}</p>
                      <p className="cart-drawer__cat">{item.category}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.name)} aria-label="Remove"><Trash2 size={15} /></button>
                  </li>
                ))}
              </ul>
            )}
            <div className="cart-drawer__foot">
              {!cartSent && <>
              <button className="btn btn--primary" style={{width:'100%'}} onClick={sendCartEnquiry}>
                <Send size={15} /> Send all {cartItems.length} items on WhatsApp
              </button>
              <button className="btn btn--ghost" style={{width:'100%',marginTop:'0.5rem'}} onClick={() => setCartItems([])}>Clear cart</button>
              </>}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
