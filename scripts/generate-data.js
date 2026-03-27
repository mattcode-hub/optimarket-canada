const fs = require('fs');
const path = require('path');

// Real optometry brands
const BRANDS = [
  'Topcon', 'Nidek', 'Marco', 'Reichert', 'Huvitz', 'Lombart',
  'Haag-Streit', 'Zeiss', 'Keeler', 'Heine', 'Essilor', 'Leica',
  'Heidelberg', 'Bausch & Lomb', 'Alcon', 'Johnson & Johnson',
  'Visionix', 'Optec', 'Rodenstock', 'Shamir'
];

const CANADIAN_CITIES = [
  'Toronto', 'Vancouver', 'Calgary', 'Ottawa', 'Montreal', 'Edmonton',
  'Winnipeg', 'Halifax', 'Victoria', 'Hamilton', 'Quebec City', 'Saskatoon',
  'Kingston', 'London', 'Windsor', 'Mississauga', 'Brampton', 'Surrey',
  'Burnaby', 'Markham', 'Durham', 'Kitchener', 'Waterloo', 'London',
  'Guelph', 'Niagara Falls', 'Oakville', 'Burlington', 'Richmond BC',
  'St. John\'s', 'Moncton', 'Fredericton', 'Charlottetown', 'Lethbridge'
];

const CLINIC_NAMES = [
  'Vision Centre', 'Eye Care Clinic', 'Optometry Services', 'Vision Associates',
  'Eye Health Clinic', 'Professional Vision', 'Modern Optometry', 'Complete Eye Care',
  'Advanced Vision', 'Precision Eye Care', 'Premier Vision', 'Excellence Optometry'
];

const DEALER_NAMES = [
  'MedEquip', 'OptiSupply', 'Vision Pro Equipment', 'Optical Solutions',
  'Professional Medical Supply', 'Equipment Direct', 'Optical Depot', 'Medical Vision',
  'Pro Equipment', 'Optical Wholesale', 'Premium Medical Supply', 'Optical Innovations'
];

const CATEGORIES = [
  {
    id: 'diagnostic-equipment',
    name: 'Diagnostic Equipment',
    subcategories: [
      'Phoropters', 'Autorefractors', 'Lensmeters', 'Keratometers',
      'Pachymeters', 'OCT Machines', 'Visual Field Analyzers', 'Fundus Cameras',
      'Slit Lamps', 'Retinoscopes'
    ]
  },
  {
    id: 'frames-lenses',
    name: 'Frames & Lenses',
    subcategories: [
      'Frame Collections', 'Lens Blanks', 'Progressive Lenses',
      'Photochromic Lenses', 'Lens Edgers', 'Frame Heaters', 'Frame Displays'
    ]
  },
  {
    id: 'trial-accessories',
    name: 'Trial Sets & Accessories',
    subcategories: [
      'Trial Lens Sets', 'Trial Frames', 'Flipper Bars', 'Occluders',
      'Pupillometers', 'PD Rulers'
    ]
  },
  {
    id: 'contact-lens',
    name: 'Contact Lens Equipment',
    subcategories: [
      'Topographers', 'Autokeratometers', 'Contact Lens Fitting Sets',
      'Inventory', 'Trial Sets'
    ]
  },
  {
    id: 'pre-testing',
    name: 'Pre-Testing Instruments',
    subcategories: [
      'Auto-Tonometers', 'NCT', 'Auto-Phoropters', 'Chart Projectors',
      'Visual Acuity Systems'
    ]
  },
  {
    id: 'furniture',
    name: 'Furniture & Office',
    subcategories: [
      'Exam Chairs', 'Instrument Stands', 'Slit Lamp Tables',
      'Waiting Room Furniture', 'Cabinetry', 'Storage Solutions'
    ]
  },
  {
    id: 'lab-equipment',
    name: 'Optical Lab Equipment',
    subcategories: [
      'Lens Edgers', 'Blockers', 'Tinting Units', 'AR Coating Systems',
      'Lens Drills', 'Frame Warmers', 'Groovers'
    ]
  },
  {
    id: 'specialty',
    name: 'Specialty & Low Vision',
    subcategories: [
      'Low Vision Aids', 'Magnifiers', 'Telescopic Systems', 'Electronic Aids'
    ]
  }
];

const CONDITIONS = ['New', 'Like New', 'Excellent', 'Good', 'Fair'];
const SHIPPING_OPTIONS = ['Free Shipping', 'Buyer Pays Shipping', 'Local Pickup Only', 'Shipping Available'];
const WARRANTY_OPTIONS = ['Manufacturer Warranty', 'Seller Warranty (90 days)', 'As-Is', 'Extended Warranty Available'];

// Curated Unsplash image URLs by category
const CATEGORY_IMAGES = {
  'Diagnostic Equipment': [
    'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1581093458791-9f3c3250a8b0?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1631549916768-4d8d7e0e1e4a?w=800&h=600&fit=crop',
  ],
  'Frames & Lenses': [
    'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556015048-4d3aa10df74c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1535930749574-1399327ce78f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1612444530582-fc66f5b16c3d?w=800&h=600&fit=crop',
  ],
  'Trial Sets & Accessories': [
    'https://images.unsplash.com/photo-1582719471384-894fbb16564e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1581093458791-9f3c3250a8b0?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&h=600&fit=crop',
  ],
  'Contact Lens Equipment': [
    'https://images.unsplash.com/photo-1582719471384-894fbb16564e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&h=600&fit=crop',
  ],
  'Pre-Testing Instruments': [
    'https://images.unsplash.com/photo-1551190822-a9ce113d0d15?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1581093458791-9f3c3250a8b0?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1631549916768-4d8d7e0e1e4a?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1582719471384-894fbb16564e?w=800&h=600&fit=crop',
  ],
  'Furniture & Office': [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1505409859467-3a796fd5a263?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1519219788971-8d9797e0928e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
  ],
  'Optical Lab Equipment': [
    'https://images.unsplash.com/photo-1581093458791-9f3c3250a8b0?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1582719471384-894fbb16564e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1631549916768-4d8d7e0e1e4a?w=800&h=600&fit=crop',
  ],
  'Specialty & Low Vision': [
    'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1581093458791-9f3c3250a8b0?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1582719471384-894fbb16564e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=600&fit=crop',
  ],
};

// Real equipment models
const EQUIPMENT_MODELS = {
  'Topcon': [
    'TRC-NW400', 'KR-8900', 'RK-F1', 'OP-1', 'SS-1', 'AR-800',
    'CV-5000', 'KR-800', 'TRC-50EX', 'IMAGEnet'
  ],
  'Nidek': [
    'ARK-1s', 'ARK-2', 'EyeMapper', 'US-4000', 'USA-6000',
    'RSA-7700', 'FA-500', 'TX-20P', 'OPD-SCAN'
  ],
  'Marco': [
    'ProDicer Plus', 'Essilor Visia', 'LensMeter 2020',
    'Phoroptor VRx', 'Auto Phoroptor', 'XL-75'
  ],
  'Reichert': [
    'Phoroptor VRx', 'Auto Phoroptor', 'Tono-Pen', 'Ocular Response Analyzer',
    'Lens Meter', 'Chart Projector'
  ],
  'Zeiss': [
    'Cirrus 5000', 'Atlas 5', 'Humphrey 860', 'IOLMaster 700',
    'SMILE', 'VISX S4'
  ],
  'Essilor': [
    'Visia', 'Digital LenseMeter', 'Reflex', 'E-System'
  ],
  'Haag-Streit': [
    'BM500', 'SL 2000', 'ArcLight', 'BAG 800', 'SL900'
  ],
  'Keeler': [
    'Specular Microscope', 'Autolens', 'Fundus Camera', 'Applanation Tonometer'
  ]
};

function generateSellers() {
  const sellers = [];
  const uniqueNames = new Set();
  const targetSellers = 80;

  // Generate clinic sellers
  for (let i = 0; i < 35; i++) {
    const city = CANADIAN_CITIES[Math.floor(Math.random() * CANADIAN_CITIES.length)];
    const clinicType = CLINIC_NAMES[Math.floor(Math.random() * CLINIC_NAMES.length)];
    const name = `${city} ${clinicType}`;
    if (uniqueNames.has(name)) continue;
    uniqueNames.add(name);

    sellers.push({
      id: `seller-${i}`,
      name,
      type: 'clinic',
      location: city,
      verified: Math.random() < 0.7,
      rating: (Math.random() * 2 + 3.5).toFixed(1),
      reviewCount: Math.floor(Math.random() * 150) + 5,
      memberSince: new Date(2015 + Math.floor(Math.random() * 9), Math.floor(Math.random() * 12)).toISOString().split('T')[0],
      avatar: `https://picsum.photos/seed/seller-${i}/100/100?random=${Math.random()}`,
      description: `Professional optometry clinic offering quality equipment and supplies.`
    });
  }

  // Generate dealer sellers
  for (let i = 35; i < 70; i++) {
    const city = CANADIAN_CITIES[Math.floor(Math.random() * CANADIAN_CITIES.length)];
    const dealerType = DEALER_NAMES[Math.floor(Math.random() * DEALER_NAMES.length)];
    const name = `${dealerType} - ${city}`;
    if (uniqueNames.has(name)) continue;
    uniqueNames.add(name);

    sellers.push({
      id: `seller-${i}`,
      name,
      type: 'dealer',
      location: city,
      verified: Math.random() < 0.75,
      rating: (Math.random() * 2 + 3.7).toFixed(1),
      reviewCount: Math.floor(Math.random() * 200) + 10,
      memberSince: new Date(2014 + Math.floor(Math.random() * 9), Math.floor(Math.random() * 12)).toISOString().split('T')[0],
      avatar: `https://picsum.photos/seed/seller-${i}/100/100?random=${Math.random()}`,
      description: `Equipment dealer specializing in optometry and ophthalmology supplies.`
    });
  }

  // Generate individual practitioners
  const firstNames = ['Dr. Sarah', 'Dr. James', 'Dr. Emily', 'Dr. Michael', 'Dr. Jennifer', 'Dr. David', 'Dr. Lisa', 'Dr. Robert'];
  const lastNames = ['Chen', 'Smith', 'Johnson', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];

  for (let i = 70; i < 80; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const city = CANADIAN_CITIES[Math.floor(Math.random() * CANADIAN_CITIES.length)];
    const name = `${firstName} ${lastName}, OD`;
    if (uniqueNames.has(name)) continue;
    uniqueNames.add(name);

    sellers.push({
      id: `seller-${i}`,
      name,
      type: 'practitioner',
      location: city,
      verified: Math.random() < 0.65,
      rating: (Math.random() * 2 + 3.8).toFixed(1),
      reviewCount: Math.floor(Math.random() * 80) + 3,
      memberSince: new Date(2016 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 12)).toISOString().split('T')[0],
      avatar: `https://picsum.photos/seed/seller-${i}/100/100?random=${Math.random()}`,
      description: `Licensed optometrist offering quality used equipment.`
    });
  }

  return sellers.slice(0, 80);
}

function generateListings(sellers) {
  const listings = [];
  let listingId = 1;
  const listingsPerSource = 300;
  const sources = 4;

  for (let source = 0; source < sources; source++) {
    for (let i = 0; i < listingsPerSource; i++) {
      const categoryIndex = Math.floor((source * listingsPerSource + i) / (listingsPerSource / CATEGORIES.length)) % CATEGORIES.length;
      const category = CATEGORIES[categoryIndex];
      const subcategory = category.subcategories[Math.floor(Math.random() * category.subcategories.length)];

      const brandName = BRANDS[Math.floor(Math.random() * BRANDS.length)];
      const modelOptions = EQUIPMENT_MODELS[brandName] || ['Model-' + Math.floor(Math.random() * 9000 + 1000)];
      const model = modelOptions[Math.floor(Math.random() * modelOptions.length)];

      const seller = sellers[Math.floor(Math.random() * sellers.length)];
      const condition = CONDITIONS[Math.floor(Math.random() * CONDITIONS.length)];
      const yearMfg = 2008 + Math.floor(Math.random() * 18);

      const priceMultiplier = {
        'Diagnostic Equipment': 5000,
        'Frames & Lenses': 500,
        'Trial Sets & Accessories': 200,
        'Contact Lens Equipment': 2000,
        'Pre-Testing Instruments': 3000,
        'Furniture & Office': 1500,
        'Optical Lab Equipment': 4000,
        'Specialty & Low Vision': 800
      }[category.name] || 1000;

      const basePrice = priceMultiplier * (0.5 + Math.random() * 1.5);
      const price = Math.round(basePrice);
      const originalPrice = Math.random() < 0.6 ? Math.round(price * (1.15 + Math.random() * 0.35)) : null;

      const daysAgo = Math.floor(Math.random() * 90);
      const datePosted = new Date();
      datePosted.setDate(datePosted.getDate() - daysAgo);

      const id = `listing-${String(listingId).padStart(5, '0')}`;
      listingId++;

      // Get category images
      const categoryImages = CATEGORY_IMAGES[category.name] || CATEGORY_IMAGES['Diagnostic Equipment'];
      const numImages = Math.floor(Math.random() * 3) + 3; // 3-5 images
      const selectedImages = [];
      for (let j = 0; j < numImages; j++) {
        const randomIdx = (source * listingsPerSource + i + j) % categoryImages.length;
        selectedImages.push(categoryImages[randomIdx]);
      }

      const listing = {
        id,
        title: `${brandName} ${model} - ${subcategory} (${condition})`,
        description: generateDescription(subcategory, condition, yearMfg, brandName),
        price,
        originalPrice,
        currency: 'CAD',
        condition,
        category: category.name,
        subcategory,
        categoryId: category.id,
        images: selectedImages,
        seller: {
          id: seller.id,
          name: seller.name,
          location: seller.location,
          verified: seller.verified,
          rating: parseFloat(seller.rating),
          reviewCount: seller.reviewCount,
          memberSince: seller.memberSince,
          avatar: seller.avatar
        },
        location: seller.location,
        datePosted: datePosted.toISOString(),
        views: Math.floor(Math.random() * 490) + 10,
        saves: Math.floor(Math.random() * 50),
        featured: Math.random() < 0.05,
        shipping: SHIPPING_OPTIONS[Math.floor(Math.random() * SHIPPING_OPTIONS.length)],
        brand: brandName,
        model,
        yearManufactured: yearMfg,
        warranty: WARRANTY_OPTIONS[Math.floor(Math.random() * WARRANTY_OPTIONS.length)]
      };

      listings.push(listing);
    }
  }

  return listings;
}

function generateDescription(subcategory, condition, yearMfg, brand) {
  const conditionDescriptions = {
    'New': 'Brand new, never been opened or used.',
    'Like New': 'Appears new with minimal signs of use. Fully functional.',
    'Excellent': 'Well-maintained, minor cosmetic wear. All functions working perfectly.',
    'Good': 'Normal wear from regular use. Fully operational.',
    'Fair': 'Shows use and age but fully functional. May have cosmetic marks.'
  };

  const ageDescriptions = {
    true: `Manufactured in ${yearMfg}, has been well-maintained and regularly serviced.`,
    false: `Recently refurbished and tested. Ready for immediate use in your practice.`
  };

  const features = {
    'Phoropters': 'Full sphere and cylinder range. Automat or manual operation. Easy to use.',
    'Autorefractors': 'High measurement speed. Accurate refraction data. USB connectivity.',
    'Lensmeters': 'Fast, accurate lens measurement. Digital display. Compact design.',
    'OCT Machines': 'High-resolution imaging. Multi-modal capabilities. Complete software.',
    'Slit Lamps': 'Excellent optics. Multiple magnifications. Full illumination system.',
    'Fundus Cameras': 'High-resolution imaging. Wide field capability. Digital recording.',
    'Trial Lens Sets': 'Complete range of lenses. Professional quality frames included.',
    'Exam Chairs': 'Ergonomic design. Smooth adjustments. Durable upholstery.',
    'Lens Edgers': 'Precision cutting. Multiple functions. Professional-grade equipment.',
    'Visual Acuity Systems': 'Multiple chart options. Easy calibration. Clear display.'
  };

  const feature = features[subcategory] || 'Excellent working condition. Professional equipment. Fully tested.';

  return `${conditionDescriptions[condition]} ${ageDescriptions[yearMfg > 2020]} ${feature} Perfect for expanding your optometry practice or updating existing equipment.`;
}

function generateReviews(sellers) {
  const reviews = [];
  const reviewTexts = [
    'Great equipment, arrived in perfect condition. Highly recommend this seller.',
    'Exactly as described. Fast shipping and excellent customer service.',
    'Very satisfied with my purchase. Equipment works flawlessly.',
    'Professional seller. Provided excellent support throughout the process.',
    'Outstanding quality. Better than expected. Will buy again.',
    'Equipment arrived well-packaged. Everything works perfectly.',
    'Responsive seller. Great communication throughout the transaction.',
    'Excellent condition for the price. Great value for money.',
    'Equipment is top quality. Seller was very helpful and professional.',
    'Perfect addition to our clinic. Highly recommended.',
    'Great product and even better service from the seller.',
    'Exceeded my expectations. Will definitely purchase from this seller again.',
    'Professional transaction from start to finish. Very satisfied.',
    'Equipment functions perfectly. Seller provided all documentation.',
    'Excellent seller. Answered all my questions promptly.',
    'Outstanding service. Quick delivery. Equipment as described.',
    'Very pleased with the quality and condition of the equipment.',
    'Seller went above and beyond. Highly satisfied with purchase.',
    'Great experience. Equipment works exactly as advertised.',
    'Reliable seller. Would recommend to any practice.'
  ];

  const reviewerNames = [
    'John T.', 'Sarah M.', 'Dr. James P.', 'Emily K.', 'Michael R.',
    'Jennifer L.', 'David S.', 'Lisa W.', 'Robert B.', 'Maria G.',
    'Chris J.', 'Amanda D.', 'Patrick H.', 'Susan V.', 'Kevin N.'
  ];

  for (let i = 0; i < 500; i++) {
    const seller = sellers[Math.floor(Math.random() * sellers.length)];
    const daysAgo = Math.floor(Math.random() * 365);
    const reviewDate = new Date();
    reviewDate.setDate(reviewDate.getDate() - daysAgo);

    reviews.push({
      id: `review-${i}`,
      sellerId: seller.id,
      rating: Math.floor(Math.random() * 2 + 4), // 4 or 5
      text: reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
      reviewer: reviewerNames[Math.floor(Math.random() * reviewerNames.length)],
      date: reviewDate.toISOString().split('T')[0],
      verified: true
    });
  }

  return reviews;
}

function generateCategoryData() {
  const categoryIcons = {
    'Diagnostic Equipment': 'Activity',
    'Frames & Lenses': 'Eye',
    'Trial Sets & Accessories': 'Grid',
    'Contact Lens Equipment': 'Droplet',
    'Pre-Testing Instruments': 'Gauge',
    'Furniture & Office': 'Home',
    'Optical Lab Equipment': 'Wrench',
    'Specialty & Low Vision': 'Zap'
  };

  return CATEGORIES.map(cat => ({
    id: cat.id,
    name: cat.name,
    icon: categoryIcons[cat.name],
    description: `Browse our selection of ${cat.name.toLowerCase()} equipment for optometry practices.`,
    subcategories: cat.subcategories,
    listingCount: 150
  }));
}

// Main execution
async function main() {
  try {
    console.log('Generating sellers...');
    const sellers = generateSellers();
    console.log(`Generated ${sellers.length} sellers`);

    console.log('Generating listings...');
    const listings = generateListings(sellers);
    console.log(`Generated ${listings.length} listings`);

    console.log('Generating reviews...');
    const reviews = generateReviews(sellers);
    console.log(`Generated ${reviews.length} reviews`);

    console.log('Generating category data...');
    const categories = generateCategoryData();
    console.log(`Generated ${categories.length} categories`);

    // Write files
    const dataDir = path.join(__dirname, '..', 'src', 'data');

    fs.writeFileSync(
      path.join(dataDir, 'listings.json'),
      JSON.stringify(listings, null, 2)
    );
    console.log(`✓ Wrote listings.json (${listings.length} listings)`);

    fs.writeFileSync(
      path.join(dataDir, 'sellers.json'),
      JSON.stringify(sellers, null, 2)
    );
    console.log(`✓ Wrote sellers.json (${sellers.length} sellers)`);

    fs.writeFileSync(
      path.join(dataDir, 'reviews.json'),
      JSON.stringify(reviews, null, 2)
    );
    console.log(`✓ Wrote reviews.json (${reviews.length} reviews)`);

    fs.writeFileSync(
      path.join(dataDir, 'categories.json'),
      JSON.stringify(categories, null, 2)
    );
    console.log(`✓ Wrote categories.json (${categories.length} categories)`);

    console.log('\nData generation complete!');
    console.log(`Total files created: 4`);
  } catch (error) {
    console.error('Error generating data:', error);
    process.exit(1);
  }
}

main();
