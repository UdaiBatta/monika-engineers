export const products = [
  // 1. Drive & Motion
  {
    id: 'delta-c2000-plus',
    image: '/images/products/delta-c2000-plus.jpg',
    name: 'DELTA C2000 PLUS VFD',
    brand: 'Delta',
    category: 'Drive & Motion',
    description: 'High-performance field-oriented control AC motor drive. Engineered for demanding industrial environments with heavy duty applications.',
    specs: {
      'Power Range': '0.75kW - 630kW',
      'Control Mode': 'FOC (Field Oriented Control), PM sensorless, V/F, SVC',
      'Overload Capacity': '150% for 60 seconds (Heavy Duty)',
      'Communication': 'MODBUS, optional CANopen, DeviceNet, PROFIBUS, EtherNet/IP'
    }
  },
  {
    id: 'inovance-md520',
    image: '/images/inovance-md520.jpg',
    name: 'INOVANCE MD520 HIGH PERFORMANCE VFD',
    brand: 'Inovance',
    category: 'Drive & Motion',
    description: 'High-performance general-purpose AC drive. Delivers exceptional torque performance and accurate speed control for machinery.',
    specs: {
      'Power Range': '0.4kW - 500kW',
      'Control Mode': 'SVC, FOC, V/F, PM Motor Control',
      'Overload Capacity': '150% for 60 seconds (Heavy Duty)',
      'Safety Standard': 'SIL2 STO (Safe Torque Off)'
    }
  },
  {
    id: 'inovance-md500-vfd',
    image: '/images/inovance-md500.jpg',
    name: 'INOVANCE MD500 VECTOR CONTROL VFD',
    brand: 'Inovance',
    category: 'Drive & Motion',
    description: 'Top-tier high performance vector control VFD. Trusted globally for heavy industrial application, cranes, elevators, and metal processing.',
    specs: {
      'Power Range': '0.18kW - 450kW',
      'Control Mode': 'Sensorless Vector Control, Closed Loop Vector Control',
      'Starting Torque': 'Up to 200% starting torque at 0Hz',
      'Operating Temp': '-10°C to 50°C without derating'
    }
  },
  {
    id: 'delta-vfd-mh300',
    image: '/images/delta-mh300.jpg',
    name: 'DELTA VFD MH300 COMPACT VFD',
    brand: 'Delta',
    category: 'Drive & Motion',
    description: 'High performance compact control drive. High speed capability up to 2000Hz, built-in PLC capacity, and outstanding motor control.',
    specs: {
      'Power Range': '0.18kW - 22kW',
      'Output Frequency': 'Up to 2000Hz (High Speed)',
      'Built-in PLC': '5k steps capacity',
      'Safety': 'STO (Safe Torque Off) SIL2 / PL d'
    }
  },
  {
    id: 'inovance-md290',
    name: 'INOVANCE MD290 STANDARD VFD',
    brand: 'Inovance',
    category: 'Drive & Motion',
    description: 'Standard variable torque AC drive suitable for fan and pump applications. Offers high reliability and energy-saving functions.',
    specs: {
      'Power Range': '0.4kW - 500kW',
      'Control Mode': 'V/F Control',
      'Overload Capacity': '110% for 60 seconds (Variable Torque)',
      'Built-in DC Reactor': 'Yes (above 18.5kW)'
    }
  },
  {
    id: 'delta-cfp2000',
    image: '/images/products/delta-cfp2000.jpg',
    name: 'DELTA CFP2000 IP55 VFD',
    brand: 'Delta',
    category: 'Drive & Motion',
    description: 'IP55 rated fan and pump drive designed specifically for HVAC, water treatment, and standard industrial ventilation systems.',
    specs: {
      'Power Range': '0.75kW - 90kW',
      'Enclosure Class': 'IP55 / NEMA 12 (Dust & Water Resistant)',
      'Built-in Features': 'BACnet, MODBUS, EMC Filter, DC Choke',
      'Multi-Pump Control': 'Supports up to 8 motors simultaneously'
    }
  },
  {
    id: 'inovance-md310',
    image: '/images/products/inovance-md310.jpg',
    name: 'INOVANCE MD310 COMPACT VFD',
    brand: 'Inovance',
    category: 'Drive & Motion',
    description: 'Compact open-loop vector AC drive. High-performance drive in a space-saving book-style layout.',
    specs: {
      'Power Range': '0.4kW - 18.5kW',
      'Control Mode': 'Open-loop Vector Control (SVC), V/F Control',
      'Starting Torque': '150% at 0.5Hz',
      'Communication': 'MODBUS-RTU, CANlink'
    }
  },
  {
    id: 'inovance-md200',
    image: '/images/inovance-md200-drive.jpg',
    name: 'INOVANCE MD200 MICRO VFD',
    brand: 'Inovance',
    category: 'Drive & Motion',
    description: 'Micro AC drive designed for low-power simple automation machinery. Highly cost-effective and extremely easy to configure.',
    specs: {
      'Power Range': '0.4kW - 2.2kW (Single/Three Phase)',
      'Control Mode': 'V/F Control',
      'Mounting': 'DIN Rail and wall mountable side-by-side',
      'Built-in PID': 'Yes'
    }
  },
  {
    id: 'delta-vfd-elw',
    image: '/images/delta-elw.jpg',
    name: 'DELTA VFD EL-W COMPACT VFD',
    brand: 'Delta',
    category: 'Drive & Motion',
    description: 'New generation multi-function compact drive. Offers multi-pump control, PID feedback, and space-saving side-by-side installations.',
    specs: {
      'Power Range': '0.2kW - 2.2kW',
      'Key Features': 'Multi-pump controller, built-in MODBUS, high-precision current detection',
      'Protection': 'Overcurrent, overvoltage, undervoltage, overheat, overload',
      'Mounting': 'Compact DIN-rail mount'
    }
  },
  {
    id: 'delta-me300-series',
    image: '/images/delta-me300.jpg',
    name: 'DELTA ME300 SERIES COMPACT VFD',
    brand: 'Delta',
    category: 'Drive & Motion',
    description: 'Compact vector control drive offering high efficiency and performance. Built-in STO safety function and supports both IM and PM motors.',
    specs: {
      'Power Range': '0.1kW - 7.5kW',
      'Motor Support': 'Induction Motor (IM) & Permanent Magnet Motor (PM)',
      'Starting Torque': '150% at 3Hz',
      'Safety Standard': 'STO (Safe Torque Off) SIL2'
    }
  },
  {
    id: 'yaskawa-vfd-cimrjtba0003baa',
    name: 'YASKAWA VFD J1000 MICRO',
    brand: 'Yaskawa',
    category: 'Drive & Motion',
    description: 'World-renowned Japanese engineering micro AC drive. Uncompromising quality, compact profile, and ultimate motor control reliability.',
    specs: {
      'Model Code': 'CIMR-JTBA0003BAA',
      'Power Class': '0.4kW (Three Phase 200V Input)',
      'Features': 'Energy-saving control, speed search function, auto-tuning',
      'Design Life': '10 years maintenance-free operation'
    }
  },
  {
    id: 'delta-vfd-cp2000',
    image: '/images/products/delta-vfd-cp2000.jpg',
    name: 'DELTA CP2000 SERIES VFD',
    brand: 'Delta',
    category: 'Drive & Motion',
    description: 'Sensorless Vector Control Drive designed specifically for blower, fan, pump, and HVAC applications. Intelligent energy saving.',
    specs: {
      'Power Range': '0.75kW - 400kW',
      'Control Mode': 'Sensorless Vector (SVC), V/F, PM motor control',
      'Special Focus': 'Fire mode bypass, multi-pump control, PID feedback',
      'IP Rating': 'IP20 / NEMA 1'
    }
  },
  {
    id: 'delta-asda-b2',
    name: 'DELTA ASDA-B2 SERVO SYSTEM SET',
    brand: 'Delta',
    category: 'Drive & Motion',
    description: 'High-performance AC Servo motor and drive kit. Excellent response times and high positioning accuracy for automation applications.',
    specs: {
      'Power Range': '100W - 3kW',
      'Encoder Resolution': '17-bit (160,000 pulses/rev)',
      'Control Modes': 'Position, Speed, and Torque Control',
      'Features': 'Built-in auto-tuning, vibration suppression'
    }
  },
  {
    id: 'inovance-sv630',
    image: '/images/products/inovance-sv630.jpeg',
    name: 'INOVANCE SV630 SERVO DRIVE SET',
    brand: 'Inovance',
    category: 'Drive & Motion',
    description: 'High-performance industrial servo set. Standard pulse/analog interface and dynamic control loop tuning for ultimate precision.',
    specs: {
      'Power Range': '100W - 7.5kW',
      'Interface': 'Pulse/Analog, EtherCAT (optional)',
      'Encoder': '23-bit absolute encoder',
      'Response Frequency': '3.2 kHz speed loop bandwidth'
    }
  },
  {
    id: 'ctb-servo-spindle',
    image: '/images/products/ctb-servo-spindle.jpg',
    name: 'CTB SERVO SPINDLE DRIVE',
    brand: 'CTB',
    category: 'Drive & Motion',
    description: 'High precision AC servo spindle drive and motor system. Designed for CNC machines, high speed spindles, and heavy turning tools.',
    specs: {
      'Power Range': '1.1kW - 75kW',
      'Max Speed': 'Up to 15,000 RPM',
      'Feedback': 'Encoder / Resolver compatibility',
      'Application': 'Tapping, carving, milling, spindle orientation'
    }
  },

  // 2. PLCs & HMIs
  {
    id: 'inovance-h0u-plc',
    image: '/images/products/inovance-h0u-plc.jpg',
    name: 'INOVANCE H0U MICRO PLC',
    brand: 'Inovance',
    category: 'PLCs & HMIs',
    description: 'Micro PLC offering high-speed inputs and pulse outputs. Perfect for small automated units, packaging machines, and conveyor controls.',
    specs: {
      'I/O Count': 'Up to 32 local digital I/O points',
      'Pulse Output': '2 channels 100kHz high-speed pulse',
      'Communication': 'MODBUS RTU (RS485), RS232',
      'Program Memory': '8k steps program capacity'
    }
  },
  {
    id: 'delta-dvp-40es2',
    image: '/images/products/delta-dvp-40es2.png',
    name: 'DELTA DVP-40ES2 PLC',
    brand: 'Delta',
    category: 'PLCs & HMIs',
    description: 'Highly integrated standard PLC with excellent sequential control. Widely used in packaging, textiles, water treatment, and manufacturing panels.',
    specs: {
      'I/O points': '40 points (24 inputs, 16 outputs)',
      'Output Type': 'Relay / Transistor (optional)',
      'Communication': '3 COM ports (RS-232 / RS-485), Modbus',
      'Program Memory': '16k steps capacity'
    }
  },
  {
    id: 'delta-dvp-14ss2',
    name: 'DELTA DVP-14SS2 MICRO PLC',
    brand: 'Delta',
    category: 'PLCs & HMIs',
    description: 'Ultra-compact, slim profile PLC. Ideal for small spaces, basic machine control, and distributed I/O systems.',
    specs: {
      'I/O points': '14 points (8 inputs, 6 outputs)',
      'Output Type': 'Transistor (11T) / Relay (11R)',
      'Expansion': 'Supports up to 8 expansion modules (DVP-S series)',
      'Program Memory': '8k steps capacity'
    }
  },
  {
    id: 'delta-dop-100-hmi',
    image: '/images/products/delta-dop-100-hmi.jpg',
    name: 'DELTA DOP-100 SERIES HMI',
    brand: 'Delta',
    category: 'PLCs & HMIs',
    description: 'Human Machine Interface with the latest high-speed processor. Features bright, high-resolution screens and robust industrial enclosure.',
    specs: {
      'Display Size': '7 inch / 10 inch TFT LCD touch panels',
      'Resolution': '800 x 480 / 1024 x 600',
      'Interfaces': 'COM ports, USB Client/Host, Ethernet (optional)',
      'IP Rating': 'IP65 Front Panel waterproof'
    }
  },
  {
    id: 'inovance-hmi-7000',
    image: '/images/products/inovance-hmi-7000.jpg',
    name: 'INOVANCE HMI 7000 SERIES',
    brand: 'Inovance',
    category: 'PLCs & HMIs',
    description: 'Industrial touch display panel for machine data monitoring and input. High color depth, rapid rendering, and easy protocol configuration.',
    specs: {
      'Display Size': '7.0 inch / 10.1 inch screens',
      'Processor': 'ARM Cortex-A7 high speed core',
      'Connectivity': 'Dual COM (RS232/RS485), USB, Ethernet',
      'Programming Software': 'InoTouch Editor'
    }
  },

  // 3. Sensors & Switches
  {
    id: 'teknic-egt30x10aw2202000l',
    image: '/images/catalog/teknic-proximity-official.jpg',
    name: 'TEKNIC PROXIMITY SENSOR EGT30X10',
    brand: 'Teknik',
    category: 'Sensors & Switches',
    description: 'Rugged inductive proximity sensor with M30 housing. Offers excellent sensing range, noise immunity, and high IP rating.',
    specs: {
      'Sensing Distance': '10mm (Shielded)',
      'Housing Size': 'M30 Threaded Barrel',
      'Output Type': 'AC 2-Wire (Normally Open / Normally Closed)',
      'Voltage Range': '20-250V AC',
      'IP Rating': 'IP67 Waterproof & Oil-resistant'
    }
  },
  {
    id: 'teknic-euchner-egl18x05up0242000lk',
    name: 'TEKNIC EUCHNER EGL18X05 PROXIMITY SENSOR',
    brand: 'Teknik',
    category: 'Sensors & Switches',
    description: 'Precision inductive proximity switch with M18 nickel-plated brass body. High switching frequency for automated manufacturing tracking.',
    specs: {
      'Sensing Distance': '5mm',
      'Housing Size': 'M18 Threaded',
      'Output Type': 'PNP / NPN (NO+NC user selectable)',
      'Voltage Range': '10-30V DC',
      'Connection': 'Cable type / Connector type'
    }
  },
  {
    id: 'teknic-egt08x1.5ap024',
    name: 'TEKNIC EGT08X1.5 AP024 PROXIMITY SENSOR',
    brand: 'Teknik',
    category: 'Sensors & Switches',
    description: 'Ultra-small M8 size inductive sensor. Best suited for high-density components, robotic pick-and-place arms, and compact tooling.',
    specs: {
      'Sensing Distance': '1.5mm',
      'Housing Size': 'M8 Threaded Barrel',
      'Output Type': 'PNP Normally Open (NO)',
      'Operating Voltage': '10-30V DC',
      'Switching Freq': '2000 Hz'
    }
  },
  {
    id: 'teknic-euchner-sn04d08',
    name: 'TEKNIC EUCHNER SN04D08 LIMIT SWITCH',
    brand: 'Teknik',
    category: 'Sensors & Switches',
    description: 'Multiple limit switch with standard housing and long mechanical lifespan. Widely used in machine tool indexing and positioning limits.',
    specs: {
      'Plungers': '4 Plungers (Spacing 8mm)',
      'Actuator Type': 'Chisel Plunger',
      'Contact Type': 'Snap Action Contacts',
      'Mechanical Life': '30 Million Operations'
    }
  },
  {
    id: 'bch-limit-switch-heavy',
    image: '/images/products/bch-limit-switch-heavy.jpg',
    name: 'BCH HEAVY DUTY LIMIT SWITCH',
    brand: 'BCH',
    category: 'Sensors & Switches',
    description: 'Industrial limit switch designed for tough factory environments. Housed in robust cast iron/aluminum alloy casing.',
    specs: {
      'Contact Rating': '10A at 415V AC',
      'Actuator Type': 'Roller Lever / Push Rod / Adjustable Roller',
      'Housing Material': 'Die-cast metal enclosure',
      'Conduit Entry': '0.5 inch NPT threaded entry'
    }
  },

  // 4. Switchgear & Control
  {
    id: 'chint-mcb-ebg-1p-c16',
    image: '/images/products/chint-mcb-ebg-1p-c16.png',
    name: 'CHINT MCB EBG 1P C16 6KA',
    brand: 'Chint',
    category: 'Switchgear & Control',
    description: 'High-quality single pole miniature circuit breaker for industrial and domestic distribution systems. Protects against short circuit and overload.',
    specs: {
      'Poles': '1 Pole',
      'Rated Current (In)': '16A',
      'Tripping Curve': 'C Curve (magnetic release 5-10 In)',
      'Breaking Capacity': '6kA (6000A)',
      'Standard': 'IEC/EN 60898-1'
    }
  },
  {
    id: 'chint-mcb-ebg-4p-c32',
    image: '/images/products/chint-mcb-ebg-4p-c32.png',
    name: 'CHINT MCB EBG 4P C32 6KA',
    brand: 'Chint',
    category: 'Switchgear & Control',
    description: 'Four-pole miniature circuit breaker designed for high-capacity 3-phase industrial power circuits. Complete isolation and protection.',
    specs: {
      'Poles': '4 Pole (3 Phase + Neutral)',
      'Rated Current (In)': '32A',
      'Tripping Curve': 'C Curve',
      'Breaking Capacity': '6kA',
      'Mounting': 'DIN Rail 35mm'
    }
  },
  {
    id: 'chint-contactor-3p-nc1',
    name: 'CHINT NC1 AC CONTACTOR 3P',
    brand: 'Chint',
    category: 'Switchgear & Control',
    description: 'Reliable 3-pole electrical contactor for starting and controlling AC motors, heating circuits, and electrical networks.',
    specs: {
      'Current Rating': '9A - 95A AC-3 operational range',
      'Poles': '3 Pole + Aux Contacts (NO/NC)',
      'Coil Voltages': '24V, 110V, 220V, 415V AC optional',
      'Standard': 'IEC/EN 60947-4-1'
    }
  },
  {
    id: 'bch-n1nh-40a-4p',
    name: 'BCH N1NH 40A 4-POLE CONTACTOR',
    brand: 'BCH',
    category: 'Switchgear & Control',
    description: 'Heavy duty power contactor designed for reliable motor switching and power control in challenging industrial panels.',
    specs: {
      'Current Rating': '40A (AC-3 duty)',
      'Poles': '4 Pole',
      'Coil Voltage': '110V / 220V / 415V AC (optional)',
      'Mechanical Life': '10 million operations'
    }
  },
  {
    id: 'bch-solenoid-brake-4',
    image: '/images/catalog/bch-solenoid-brake-official.jpg',
    name: 'BCH SOLENOID BRAKE 4 INCH D/A',
    brand: 'BCH',
    category: 'Switchgear & Control',
    description: 'Industrial electromagnetic drum brake. Solenoid operated direct acting brake for cranes, hoists, and elevators.',
    specs: {
      'Drum Diameter': '4 inches (100mm)',
      'Operation': 'Direct Acting (D/A)',
      'Voltage Rating': '380V / 415V AC',
      'Braking Torque': '2.0 kg-m (adjustable)'
    }
  },
  {
    id: 'bch-dol-starter',
    name: 'BCH DOL MOTOR STARTER',
    brand: 'BCH',
    category: 'Switchgear & Control',
    description: 'Direct-on-line motor starter in high-grade metal enclosure. Features built-in thermal overload protection and start/stop pushbuttons.',
    specs: {
      'HP Rating': 'Up to 10 HP (Three Phase)',
      'Relay Range': 'Overload protection range customized',
      'Coil Voltage': '415V AC (2 Phase Connection)',
      'Enclosure': 'IP54 Sheet Steel / Plastic optional'
    }
  },

  // 5. Process Instrumentation
  {
    id: 'selec-pid110-0-0-01',
    image: '/images/catalog/selec-pid110-official.jpg',
    name: 'SELEC PID110-0-0-01 TEMP CONTROLLER',
    brand: 'Selec',
    category: 'Process Instrumentation',
    description: 'Advanced dual display PID temperature controller. Offers high-accuracy self-tuning algorithm and dual output configurations.',
    specs: {
      'Display': 'Dual 4-digit LED display',
      'Sensor Inputs': 'Thermocouple (J, K, T, R, S) / RTD (Pt100)',
      'Control Action': 'PID Control with Auto-tuning or ON/OFF control',
      'Outputs': 'Relay + SSR Drive (user selectable)'
    }
  },
  {
    id: 'selec-tc303ax',
    image: '/images/catalog/selec-tc303ax-official.jpg',
    name: 'SELEC TC303AX TEMPERATURE CONTROLLER',
    brand: 'Selec',
    category: 'Process Instrumentation',
    description: 'Sleek single display digital temperature controller. Easy to install and configure for plastics, ovens, and packaging lines.',
    specs: {
      'Display': 'Single 3-digit bright LED display',
      'Sensing Inputs': 'J / K thermocouple inputs, RTD Pt100',
      'Control Type': 'ON/OFF or proportional control mode',
      'Size': '48 x 48 mm panel cutout'
    }
  },
  {
    id: 'selec-xt246',
    image: '/images/products/selec-xt246.jpg',
    name: 'SELEC XT246 DIGITAL TIMER',
    brand: 'Selec',
    category: 'Process Instrumentation',
    description: 'Dual display programmable digital timer. Supports multiple operating modes including On Delay, Interval, and Cyclic timing.',
    specs: {
      'Time Ranges': '0.01s to 999 hours programmable',
      'Control Modes': 'On Delay, Interval, Cyclic On-first, Cyclic Off-first',
      'Outputs': '2 sets of SPDT Relay contacts',
      'Mounting': 'Panel mount / 48 x 48 mm scale'
    }
  },
  {
    id: 'selec-xc22b',
    name: 'SELEC XC22B DIGITAL PANEL COUNTER',
    brand: 'Selec',
    category: 'Process Instrumentation',
    description: 'Microprocessor-based digital counter and rate indicator. Perfect for packaging throughput monitoring, coil winding, and batch processes.',
    specs: {
      'Display digits': '6-digit LED display (PV & SV)',
      'Input speed': '30 Hz / 2.5 kHz selectable high speed',
      'Sensor Type': 'PNP / NPN proximity sensor input',
      'Operating Mode': 'Batch, Total, Rate / Scale factor programmable'
    }
  },
  {
    id: 'omron-h7cz-counter',
    name: 'OMRON H7CZ-L8 DIGITAL COUNTER',
    brand: 'Omron',
    category: 'Process Instrumentation',
    description: 'Top quality industrial counter from Japan. Bright, high-contrast, dual-color display for excellent readability in any lighting.',
    specs: {
      'Poles/Pins': '8-Pin Octal Socket Mounting',
      'Supply Voltage': '100 - 240V AC 50/60Hz',
      'Count range': '-99999 to 999999',
      'Sensor supply': '12V DC auxiliary output'
    }
  },
  {
    id: 'selec-900vpr-2',
    image: '/images/catalog/selec-900vpr-official.jpg',
    name: 'SELEC 900VPR VOLTAGE PROTECTION RELAY',
    brand: 'Selec',
    category: 'Process Instrumentation',
    description: 'Three-phase protection relay monitoring under/over voltage, asymmetry, phase sequence, and phase failure.',
    specs: {
      'Monitored Parameters': 'Under Voltage, Over Voltage, Phase Failure, Phase Sequence',
      'System Type': '3 Phase 3 Wire / 3 Phase 4 Wire',
      'Tripping Time': 'Adjustable delay 0.1s to 30s',
      'Output Contacts': '2 x SPDT Relays rating 5A'
    }
  },

  // 6. Power Supplies & Accessories
  {
    id: 'omron-s8jc-z10024cd',
    name: 'OMRON S8JC-Z10024CD POWER SUPPLY',
    brand: 'Omron',
    category: 'Power Supplies & Accessories',
    description: 'High reliability metal framed SMPS. Stable 24V DC output with built-in protection against short circuits, overloads, and overvoltage.',
    specs: {
      'Input Voltage': '100-240V AC universal',
      'Output Voltage': '24V DC regulated',
      'Output Current': '4.5 Ampere (100W)',
      'Mounting': 'DIN Rail & chassis mounting'
    }
  },
  {
    id: 'lubi-lesp100d24',
    name: 'LUBI LESP100D24 5A SMPS',
    brand: 'Lubi',
    category: 'Power Supplies & Accessories',
    description: 'Reliable industrial switch mode power supply. Excellent voltage regulation, high efficiency, and convection cooling.',
    specs: {
      'Output Power': '120W',
      'Output Rating': '24V DC @ 5.0A',
      'Efficiency': 'Greater than 88%',
      'Protections': 'Over current, over voltage, thermal shutdown'
    }
  },
  {
    id: 'wago-261-361',
    image: '/images/products/wago-261-361.jpg',
    name: 'WAGO 261-361 END PLATE',
    brand: 'Wago',
    category: 'Power Supplies & Accessories',
    description: 'End plate accessory for Wago terminal blocks. Ensures electrical insulation, protection, and neat panel routing.',
    specs: {
      'Compatible Series': 'Wago 261 series terminal strips',
      'Thickness': '1.4 mm',
      'Color': 'Light gray',
      'Material': 'Polyamide 66 (Insulating material)'
    }
  },
  {
    id: 'wago-857-152',
    image: '/images/products/wago-857-152.jpg',
    name: 'WAGO BASIC RELAY 857-152',
    brand: 'Wago',
    category: 'Power Supplies & Accessories',
    description: 'Ultra-thin socket-mounted relay module. Saves valuable space inside control panels while providing galvanic isolation.',
    specs: {
      'Nominal Input': '24V DC control signal',
      'Contact Type': '1 changeover contact (SPDT)',
      'Contact Current': '6A continuous rating',
      'Module Width': '6.0 mm (Ultra Slim)'
    }
  },
  {
    id: 'selec-twct-t-d55',
    image: '/images/catalog/selec-twct-official.jpg',
    name: 'SELEC TAPE WOUND CURRENT TRANSFORMER',
    brand: 'Selec',
    category: 'Power Supplies & Accessories',
    description: 'High-quality current transformer for industrial power measuring meters. Encapsulated in protective winding tapes.',
    specs: {
      'Current Ratio': '300 / 5A primary to secondary ratio',
      'Accuracy Class': 'Class 1.0 accuracy',
      'Burden': '5.0 VA capacity',
      'Window Size': 'Diameter 55 mm'
    }
  }
];

// Display order for the grouped category showcase
export const CATEGORY_ORDER = [
  'Drive & Motion',
  'PLCs & HMIs',
  'Switchgear & Control',
  'Process Instrumentation',
  'Sensors & Switches',
  'Power Supplies & Accessories',
];

// Short human labels + one-line descriptions per category
export const CATEGORY_META = {
  'Drive & Motion':              { label: 'AC Drives, VFDs & Servo Systems', blurb: 'Field-oriented and vector-control drives, servo sets and spindle drives for machine tools, textile and plastic plants.' },
  'PLCs & HMIs':                 { label: 'PLCs & Touch HMIs',               blurb: 'Compact and modular programmable controllers with matched touch HMIs for machine and process logic.' },
  'Switchgear & Control':        { label: 'Switchgear & Control Gear',       blurb: 'MCBs, contactors, DOL starters and brakes for control panels and power distribution.' },
  'Process Instrumentation':     { label: 'Process Instrumentation',         blurb: 'PID temperature controllers, timers, counters and protection relays for process control.' },
  'Sensors & Switches':          { label: 'Sensors & Limit Switches',        blurb: 'Inductive proximity sensors and heavy-duty limit switches for position and presence sensing.' },
  'Power Supplies & Accessories':{ label: 'Power Supplies & Panel Accessories', blurb: 'SMPS, relays, current transformers and terminal accessories for panel building.' },
};
