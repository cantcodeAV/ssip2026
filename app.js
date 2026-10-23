/**
 * Green Leaders Foundation - Single Page Application Logic
 * Vanilla JavaScript implementation for interactions, calculations, animations, and modals.
 */

// State Management
const appState = {
  currentDonationAmount: 2500,
  currentFrequency: 'one-time',
  currentPaymentMethod: 'upi',
  activeTargetCause: 'General Relief & High Priority Drives',
  calculatorAmount: 1500,
  activeInitiativeId: null
};

// Initiative Data Catalog
const initiativesData = {
  vidya: {
    title: 'Project Vidya: Digital Literacy on Wheels',
    badge: 'Education',
    category: 'education',
    location: 'Mumbai & Pune (14 Slum Clusters)',
    target: '1,200 Children Enrolled',
    raised: '₹4,20,000',
    goal: '₹5,00,000',
    img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    desc: 'Project Vidya deploys mobile solar-powered computer labs into deep informal settlements. Volunteer engineers and educators run visual coding classes, STEM experiments, and provide students with digital tablets, school bags, and stationery.'
  },
  annapurna: {
    title: 'Annapurna Kitchen: Daily Nutritious Slum Meals',
    badge: 'Food Relief',
    category: 'food',
    location: 'Dharavi, Govandi, & Malad',
    target: '1,000 Daily Hot Meals',
    raised: '₹7,80,000',
    goal: '₹8,50,000',
    img: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
    desc: 'Annapurna Kitchen operates 3 community kitchens that cook balanced, hot meals using fresh produce, lentils, vegetables, and boiled eggs. We ensure that poverty never deprives a growing child of essential micro-nutrients.'
  },
  coastal: {
    title: 'Mission Clean Coast: Ocean Plastic Rescue',
    badge: 'Clean-Up',
    category: 'cleanup',
    location: 'Versova, Dadar & Juhu Shores',
    target: '125+ Tons Plastic Cleared',
    raised: '₹3,10,000',
    goal: '₹4,00,000',
    img: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80',
    desc: 'Mobilizing hundreds of citizen volunteers every weekend to intercept microplastics from mangrove roots and shoreline mud. All collected waste is segregated, audited for brand accountability, and transported to certified recycling facilities.'
  },
  shiksha: {
    title: 'Shiksha Sahay: Girls Mentorship Program',
    badge: 'Education',
    category: 'education',
    location: 'Chembur & Thane',
    target: '300+ Adolescent Girls',
    raised: '₹2,60,000',
    goal: '₹3,00,000',
    img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    desc: 'Targeted academic intervention and scholarship support to prevent girl dropouts between grades 8 and 12. Pairs students with women mentors in technology, medicine, and public service.'
  },
  rescue: {
    title: 'Surplus Food Rescue Network',
    badge: 'Food Relief',
    category: 'food',
    location: 'Greater Mumbai & Navi Mumbai',
    target: '500+ Meals Nightly',
    raised: '₹1,90,000',
    goal: '₹2,50,000',
    img: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    desc: 'Connecting wedding halls, tech parks, and corporate cafeterias to nocturnal slum shelters. Temperature-monitored vans pick up untouched excess food within 45 minutes of notification.'
  },
  canopy: {
    title: 'Green Canopy: 25,000 Tree Miyawaki Urban Forest',
    badge: 'Clean-Up & Ecology',
    category: 'cleanup',
    location: 'Thane & Navi Mumbai Industrial Belts',
    target: '25,000 Indigenous Trees',
    raised: '₹4,80,000',
    goal: '₹6,00,000',
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    desc: 'Transforming barren municipal wastelands into dense multi-layered native forests using the Japanese Miyawaki method. Creates biodiversity hotspots, restores groundwater tables, and reduces local temperatures by up to 3°C.'
  }
};

// DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initCountersOnScroll();
  initImpactCalculator();
  initCardNumberFormatter();
  initScrollEffects();
});

/* ------------------------------------------------------------- */
/* 1. Mobile Navigation & Scroll Effects */
/* ------------------------------------------------------------- */
function initMobileNavigation() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', toggleMobileMenu);
  }

  // Close mobile menu when link clicked
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (menu && !menu.classList.contains('hidden')) {
        toggleMobileMenu();
      }
    });
  });
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');
  if (!menu) return;

  const isHidden = menu.classList.contains('hidden');
  if (isHidden) {
    menu.classList.remove('hidden');
    menuIcon.classList.remove('fa-bars');
    menuIcon.classList.add('fa-xmark');
  } else {
    menu.classList.add('hidden');
    menuIcon.classList.remove('fa-xmark');
    menuIcon.classList.add('fa-bars');
  }
}

function initScrollEffects() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  const mainHeader = document.getElementById('mainHeader');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header shadow transition
    if (scrollY > 50) {
      mainHeader.classList.add('shadow-md');
    } else {
      mainHeader.classList.remove('shadow-md');
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100');
      }
    }
  });
}

/* ------------------------------------------------------------- */
/* 2. Scroll-Triggered Animated Numerical Counters */
/* ------------------------------------------------------------- */
function initCountersOnScroll() {
  const counters = document.querySelectorAll('.counter-val');
  if (!counters.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach(counter => animateCounter(counter));
      }
    });
  }, { threshold: 0.3 });

  const impactSection = document.getElementById('impact');
  if (impactSection) {
    observer.observe(impactSection);
  }
}

function animateCounter(counterElement) {
  const target = parseInt(counterElement.getAttribute('data-target'), 10);
  const duration = 2000; // ms
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);
  let frame = 0;

  const counterInterval = setInterval(() => {
    frame++;
    const progress = easeOutQuad(frame / totalFrames);
    const currentVal = Math.round(target * progress);

    counterElement.textContent = currentVal.toLocaleString('en-IN') + '+';

    if (frame === totalFrames) {
      clearInterval(counterInterval);
      counterElement.textContent = target.toLocaleString('en-IN') + '+';
    }
  }, frameRate);
}

function easeOutQuad(t) {
  return t * (2 - t);
}

/* ------------------------------------------------------------- */
/* 3. Filterable Initiatives Grid */
/* ------------------------------------------------------------- */
function filterInitiatives(category) {
  // Update Tab Button Styles
  const filterButtons = document.querySelectorAll('.filter-tab-btn');
  filterButtons.forEach(btn => {
    const btnCategory = btn.getAttribute('data-filter');
    if (btnCategory === category) {
      btn.className = 'filter-tab-btn active px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-brand-600 text-white shadow-sm transition-all duration-200';
    } else {
      btn.className = 'filter-tab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-brand-700 hover:bg-slate-100 transition-all duration-200';
    }
  });

  // Filter Card Display
  const cards = document.querySelectorAll('.initiative-card');
  cards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    if (category === 'all' || cardCategory === category) {
      card.style.display = 'flex';
      card.classList.add('animate-fadeIn');
    } else {
      card.style.display = 'none';
    }
  });
}

/* ------------------------------------------------------------- */
/* 4. Interactive Impact Calculator */
/* ------------------------------------------------------------- */
function initImpactCalculator() {
  const slider = document.getElementById('impactSlider');
  if (slider) {
    slider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      updateCalculatorValues(val);
      syncCalculatorPresetButtons(val);
    });
  }
  updateCalculatorValues(appState.calculatorAmount);
}

function setCalculatorAmount(amount) {
  appState.calculatorAmount = amount;
  const slider = document.getElementById('impactSlider');
  if (slider) slider.value = amount;
  updateCalculatorValues(amount);
  syncCalculatorPresetButtons(amount);
}

function syncCalculatorPresetButtons(amount) {
  const presetBtns = document.querySelectorAll('.calc-preset-btn');
  presetBtns.forEach(btn => {
    const btnAmount = parseInt(btn.textContent.replace(/[^\d]/g, ''), 10);
    if (btnAmount === amount) {
      btn.className = 'calc-preset-btn active py-2.5 px-2 rounded-xl border-2 border-amber-500 bg-amber-500/20 font-bold text-sm text-amber-300 transition-all text-center';
    } else {
      btn.className = 'calc-preset-btn py-2.5 px-2 rounded-xl border border-slate-600 bg-slate-700/50 hover:bg-slate-700 font-bold text-sm text-slate-200 transition-all text-center';
    }
  });
}

function updateCalculatorValues(amount) {
  appState.calculatorAmount = amount;

  // Format currency
  const formatted = '₹' + amount.toLocaleString('en-IN');
  const display = document.getElementById('calcAmountDisplay');
  const ctaAmount = document.getElementById('calcCtaAmount');
  if (display) display.textContent = formatted;
  if (ctaAmount) ctaAmount.textContent = formatted;

  // 80G Tax deduction calculation (approx 30% tax slab on 50% deduction)
  const taxSavings = Math.round(amount * 0.30);
  const taxDisplay = document.getElementById('calcTaxSavings');
  if (taxDisplay) taxDisplay.textContent = '₹' + taxSavings.toLocaleString('en-IN');

  // Realistic dynamic outcomes
  const mealsCount = Math.max(1, Math.round(amount / 100));
  const mealsElem = document.getElementById('calcMealsOutput');
  if (mealsElem) {
    mealsElem.textContent = `${mealsCount} Wholesome Hot Meals`;
  }

  const booksElem = document.getElementById('calcBooksOutput');
  if (booksElem) {
    if (amount < 1000) {
      booksElem.textContent = '1 Essential Student Stationery & Math Kit';
    } else if (amount < 3000) {
      const months = Math.max(1, Math.floor(amount / 1500));
      booksElem.textContent = `${months} Month Complete School Supplies & Tutoring`;
    } else {
      const students = Math.max(1, Math.floor(amount / 2500));
      booksElem.textContent = `Full Academic Term Kit for ${students} Students`;
    }
  }

  const treesCount = Math.max(1, Math.round(amount / 750));
  const treesElem = document.getElementById('calcTreesOutput');
  if (treesElem) {
    treesElem.textContent = `${treesCount} Native Miyawaki Trees Planted & Nurtured`;
  }

  const wasteKg = Math.max(5, Math.round(amount / 100));
  const wasteElem = document.getElementById('calcWasteOutput');
  if (wasteElem) {
    wasteElem.textContent = `${wasteKg} kg Ocean Plastic Waste Removed`;
  }
}

function triggerCalculatedDonation() {
  openDonationModalWithAmount(appState.calculatorAmount, 'Interactive Impact Calculator Pledge');
}

/* ------------------------------------------------------------- */
/* 5. Comprehensive Interactive Donation Modal */
/* ------------------------------------------------------------- */
function openDonationModal() {
  const modal = document.getElementById('donationModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  setModalAmount(appState.currentDonationAmount);
}

function closeDonationModal() {
  const modal = document.getElementById('donationModal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

function openDonationModalWithAmount(amount, causeTitle) {
  appState.currentDonationAmount = amount;
  if (causeTitle) {
    appState.activeTargetCause = causeTitle;
    const targetText = document.getElementById('donationTargetCauseText');
    if (targetText) {
      targetText.textContent = `Allocated to: ${causeTitle}`;
    }
  }
  openDonationModal();
  setModalAmount(amount);
}

function setDonationFrequency(frequency) {
  appState.currentFrequency = frequency;
  const oneTimeBtn = document.getElementById('freqOneTimeBtn');
  const monthlyBtn = document.getElementById('freqMonthlyBtn');

  if (frequency === 'one-time') {
    oneTimeBtn.className = 'py-2.5 rounded-xl bg-white text-slateDark-900 shadow-sm transition-all';
    monthlyBtn.className = 'py-2.5 rounded-xl text-slate-600 hover:text-slateDark-900 transition-all flex items-center justify-center gap-1.5';
    showToast('Changed to One-Time Gift', 'info');
  } else {
    monthlyBtn.className = 'py-2.5 rounded-xl bg-white text-slateDark-900 shadow-sm transition-all flex items-center justify-center gap-1.5';
    oneTimeBtn.className = 'py-2.5 rounded-xl text-slate-600 hover:text-slateDark-900 transition-all';
    showToast('Enrolled as Monthly Impact Guardian (Auto-debit setup simulated)', 'info');
  }
}

function setModalAmount(amount) {
  appState.currentDonationAmount = amount;
  const input = document.getElementById('modalCustomAmount');
  if (input) input.value = amount;

  // Sync Chips
  const chips = document.querySelectorAll('.modal-amt-chip');
  chips.forEach(chip => {
    const val = parseInt(chip.textContent.replace(/[^\d]/g, ''), 10);
    if (val === amount) {
      chip.className = 'modal-amt-chip active py-2.5 rounded-xl border-2 border-amber-500 bg-amber-50 font-bold text-sm text-amber-700 transition-all';
    } else {
      chip.className = 'modal-amt-chip py-2.5 rounded-xl border border-slate-300 font-bold text-sm text-slate-700 hover:border-brand-500 transition-all';
    }
  });

  updateModalLabels(amount);
}

function handleCustomModalAmount(val) {
  const num = parseInt(val, 10) || 0;
  appState.currentDonationAmount = num;

  // Deselect chips if not matching
  const chips = document.querySelectorAll('.modal-amt-chip');
  chips.forEach(chip => {
    const chipVal = parseInt(chip.textContent.replace(/[^\d]/g, ''), 10);
    if (chipVal === num) {
      chip.className = 'modal-amt-chip active py-2.5 rounded-xl border-2 border-amber-500 bg-amber-50 font-bold text-sm text-amber-700 transition-all';
    } else {
      chip.className = 'modal-amt-chip py-2.5 rounded-xl border border-slate-300 font-bold text-sm text-slate-700 hover:border-brand-500 transition-all';
    }
  });

  updateModalLabels(num);
}

function updateModalLabels(amount) {
  const submitLabel = document.getElementById('modalSubmitAmountLabel');
  if (submitLabel) {
    submitLabel.textContent = '₹' + amount.toLocaleString('en-IN');
  }

  const hint = document.getElementById('modalImpactHintText');
  if (hint) {
    const meals = Math.max(1, Math.round(amount / 100));
    hint.textContent = `Provides: ${meals} nutritious meals + field program supplies`;
  }
}

function selectPayMethod(method) {
  appState.currentPaymentMethod = method;

  // Toggle button styling
  const buttons = document.querySelectorAll('.pay-method-btn');
  buttons.forEach(btn => {
    btn.className = 'pay-method-btn py-2.5 px-2 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold text-xs flex flex-col items-center gap-1 hover:border-slate-400';
  });

  const activeBtn = event ? event.currentTarget : null;
  if (activeBtn) {
    activeBtn.className = 'pay-method-btn active py-2.5 px-2 rounded-xl border-2 border-brand-600 bg-brand-50 text-brand-900 font-bold text-xs flex flex-col items-center gap-1';
  }

  // Toggle container visibility
  const upiBox = document.getElementById('payContainerUpi');
  const cardBox = document.getElementById('payContainerCard');
  const netBox = document.getElementById('payContainerNetbanking');

  if (upiBox) upiBox.classList.add('hidden');
  if (cardBox) cardBox.classList.add('hidden');
  if (netBox) netBox.classList.add('hidden');

  if (method === 'upi' && upiBox) upiBox.classList.remove('hidden');
  if (method === 'card' && cardBox) cardBox.classList.remove('hidden');
  if (method === 'netbanking' && netBox) netBox.classList.remove('hidden');
}

function initCardNumberFormatter() {
  const cardInput = document.getElementById('mockCardNumber');
  if (!cardInput) return;

  cardInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += value[i];
    }
    e.target.value = formatted;
  });
}

function processDonation(e) {
  e.preventDefault();

  const donorName = document.getElementById('donorName').value.trim();
  const donorEmail = document.getElementById('donorEmail').value.trim();
  const donorPhone = document.getElementById('donorPhone').value.trim();
  const donorPan = document.getElementById('donorPan').value.trim().toUpperCase();

  if (!donorName || !donorEmail || !donorPhone) {
    showToast('Please fill all mandatory donor fields.', 'warning');
    return;
  }

  if (donorPan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(donorPan)) {
    showToast('Invalid PAN format. Please provide valid 10-digit PAN (e.g., ABCDE1234F).', 'warning');
    return;
  }

  const submitBtn = document.getElementById('modalSubmitBtn');
  const originalHtml = submitBtn.innerHTML;

  // Processing Animation State
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <i class="fa-solid fa-circle-notch fa-spin"></i>
    <span>Verifying with Banking Gateway...</span>
  `;

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalHtml;

    closeDonationModal();
    openReceiptModal({
      name: donorName,
      email: donorEmail,
      phone: donorPhone,
      pan: donorPan || 'NOT PROVIDED (Standard Receipt)',
      amount: appState.currentDonationAmount,
      method: appState.currentPaymentMethod.toUpperCase()
    });

    showToast(`Donation of ₹${appState.currentDonationAmount.toLocaleString('en-IN')} Successful!`, 'success');
  }, 1400);
}

/* ------------------------------------------------------------- */
/* 6. Digital 80G Tax Exemption Receipt Modal */
/* ------------------------------------------------------------- */
function openReceiptModal(data) {
  const modal = document.getElementById('receiptModal');
  if (!modal) return;

  const txnId = 'GLF-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000);
  const now = new Date();
  const dateFormatted = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  document.getElementById('receiptTxnId').textContent = txnId;
  document.getElementById('receiptDonorName').textContent = data.name;
  document.getElementById('receiptDate').textContent = dateFormatted;
  document.getElementById('receiptPan').textContent = data.pan;
  document.getElementById('receiptAmount').textContent = '₹' + data.amount.toLocaleString('en-IN');
  document.getElementById('receiptPayMode').textContent = data.method === 'UPI' ? 'UPI / QR Transfer' : (data.method === 'CARD' ? 'Credit/Debit Card' : 'Net Banking');

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeReceiptModal() {
  const modal = document.getElementById('receiptModal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

function shareDonationAchievement() {
  const shareText = "I just supported Green Leaders Foundation in educating underprivileged kids and planting native forests! Join me at greenleaders.org 🌱";
  if (navigator.share) {
    navigator.share({
      title: 'I Donated to Green Leaders Foundation',
      text: shareText,
      url: window.location.href
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(shareText);
    showToast('Impact message copied to clipboard!', 'info');
  }
}

/* ------------------------------------------------------------- */
/* 7. Volunteer Sign-Up Modal */
/* ------------------------------------------------------------- */
function openVolunteerModal() {
  const modal = document.getElementById('volunteerModal');
  if (!modal) return;
  document.getElementById('volDriveName').value = 'General Volunteer Pool (All Upcoming Drives)';
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function openVolunteerModalForDrive(driveTitle, defaultRole) {
  const modal = document.getElementById('volunteerModal');
  if (!modal) return;
  document.getElementById('volDriveName').value = driveTitle;
  if (defaultRole) {
    document.getElementById('volRole').value = defaultRole;
  }
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeVolunteerModal() {
  const modal = document.getElementById('volunteerModal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

function handleVolunteerSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('volFullName').value.trim();
  const phone = document.getElementById('volPhone').value.trim();
  const role = document.getElementById('volRole').value;

  closeVolunteerModal();
  showToast(`Welcome aboard, ${name}! You are registered for: ${role}. Check your WhatsApp for pass.`, 'success');
  e.target.reset();
}

/* ------------------------------------------------------------- */
/* 8. Initiative Detail Modal */
/* ------------------------------------------------------------- */
function openInitiativeDetails(id) {
  const data = initiativesData[id];
  if (!data) return;

  appState.activeInitiativeId = id;
  const modal = document.getElementById('initiativeDetailModal');
  if (!modal) return;

  document.getElementById('initModalImg').src = data.img;
  document.getElementById('initModalImg').alt = data.title;
  document.getElementById('initModalBadge').textContent = data.badge;
  document.getElementById('initModalTitle').textContent = data.title;
  document.getElementById('initModalDesc').textContent = data.desc;
  document.getElementById('initModalLocation').textContent = data.location;
  document.getElementById('initModalTarget').textContent = data.target;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeInitiativeDetails() {
  const modal = document.getElementById('initiativeDetailModal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

function donateToCurrentInitiative() {
  const data = initiativesData[appState.activeInitiativeId];
  closeInitiativeDetails();
  if (data) {
    openDonationModalWithAmount(2500, data.title);
  } else {
    openDonationModal();
  }
}

function volunteerForCurrentInitiative() {
  const data = initiativesData[appState.activeInitiativeId];
  closeInitiativeDetails();
  if (data) {
    openVolunteerModalForDrive(data.title, 'Field Volunteer');
  } else {
    openVolunteerModal();
  }
}

/* ------------------------------------------------------------- */
/* 9. Audited Report Modal & PDF Simulator */
/* ------------------------------------------------------------- */
function openAuditedReportModal() {
  const modal = document.getElementById('auditedReportModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeAuditedReportModal() {
  const modal = document.getElementById('auditedReportModal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

function simulatePdfDownload() {
  closeAuditedReportModal();
  showToast('Generating official Deloitte-verified FY24 Audited Report PDF...', 'info');
  setTimeout(() => {
    showToast('Download started: Green_Leaders_Foundation_Audited_Report_FY24.pdf', 'success');
  }, 1000);
}

/* ------------------------------------------------------------- */
/* 10. FAQ Accordion Toggle */
/* ------------------------------------------------------------- */
function toggleFaq(btn) {
  const content = btn.nextElementSibling;
  const icon = btn.querySelector('i');
  if (!content) return;

  const isHidden = content.classList.contains('hidden');

  // Close all other FAQs
  document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
  document.querySelectorAll('.faq-toggle-btn i').forEach(ic => ic.style.transform = 'rotate(0deg)');

  if (isHidden) {
    content.classList.remove('hidden');
    if (icon) icon.style.transform = 'rotate(180deg)';
  } else {
    content.classList.add('hidden');
    if (icon) icon.style.transform = 'rotate(0deg)';
  }
}

/* ------------------------------------------------------------- */
/* 11. Contact & Newsletter Form Handlers */
/* ------------------------------------------------------------- */
function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contactName').value.trim();
  showToast(`Thank you, ${name}! Your inquiry has been routed to our community lead.`, 'success');
  e.target.reset();
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('newsletterEmail').value.trim();
  showToast(`Subscribed! Monthly transparent field updates will be sent to ${email}.`, 'success');
  e.target.reset();
}

/* ------------------------------------------------------------- */
/* 12. Toast Notification System */
/* ------------------------------------------------------------- */
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-white text-xs sm:text-sm font-semibold transform transition-all duration-300 translate-y-2 opacity-0';

  let iconClass = 'fa-solid fa-circle-check';
  let bgClass = 'bg-brand-700';

  if (type === 'warning') {
    iconClass = 'fa-solid fa-triangle-exclamation';
    bgClass = 'bg-amber-600';
  } else if (type === 'info') {
    iconClass = 'fa-solid fa-circle-info';
    bgClass = 'bg-slateDark-900';
  }

  toast.classList.add(bgClass);
  toast.innerHTML = `
    <i class="${iconClass} text-base shrink-0"></i>
    <span class="flex-1">${message}</span>
    <button class="opacity-70 hover:opacity-100 transition-opacity ml-2" onclick="this.parentElement.remove()">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  container.appendChild(toast);

  // Trigger enter animation
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  });

  // Auto remove after 4.5 seconds
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4500);
}

// Global modal background click listener to close modals
window.addEventListener('click', (e) => {
  const donationModal = document.getElementById('donationModal');
  const receiptModal = document.getElementById('receiptModal');
  const volunteerModal = document.getElementById('volunteerModal');
  const initModal = document.getElementById('initiativeDetailModal');
  const reportModal = document.getElementById('auditedReportModal');

  if (e.target === donationModal) closeDonationModal();
  if (e.target === receiptModal) closeReceiptModal();
  if (e.target === volunteerModal) closeVolunteerModal();
  if (e.target === initModal) closeInitiativeDetails();
  if (e.target === reportModal) closeAuditedReportModal();
});

// Escape key listener to close active modal
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeDonationModal();
    closeReceiptModal();
    closeVolunteerModal();
    closeInitiativeDetails();
    closeAuditedReportModal();
  }
});
