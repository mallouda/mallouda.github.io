const translations = {
  pl: {
    skip: "Przejdź do treści", navAbout: "O mnie", navExperience: "Doświadczenie", navEducation: "Wykształcenie", navContact: "Kontakt",
    availability: "Operacje i automatyzacja e-commerce", heroLead: "Upraszczam", heroAccent: "skomplikowaną pracę.",
    heroSummary: "Jestem Szymon. Konfiguruję i automatyzuję systemy, na których działają sklepy internetowe, żeby zamówienia wymagały mniej ręcznej pracy i powodowały mniej błędów.",
    seeWork: "Zobacz doświadczenie", emailMe: "Napisz do mnie", locationValue: "Polska", locationLabel: "Lokalizacja", sinceLabel: "W e-commerce od", languagesLabel: "Języki",
    aboutEyebrow: "O mnie", aboutTitle: "Praktyczne myślenie przekładam na lepsze systemy.",
    aboutLead: "Lubię rozumieć, jak działają rzeczy, znajdować zbędne utrudnienia i tworzyć rozwiązania, dzięki którym codzienna praca staje się prostsza i szybsza.",
    aboutBody: "Od 2024 roku pracuję w operacjach e-commerce, konfigurując i automatyzując systemy obsługi zamówień, na których opiera się sprzedawca internetowy. Mam wykształcenie informatyczne, a obecnie kończę studia magisterskie z zarządzania. Moja praca dyplomowa dotyczy wykorzystania AI w zarządzaniu sprzedażą w e-commerce.",
    principleOneTitle: "Użyteczność ponad efekt", principleOneBody: "Rozwiązania powinny usprawniać prawdziwą pracę, a nie tylko dobrze wyglądać.",
    principleTwoTitle: "Nauka przez działanie", principleTwoBody: "Najszybciej uczę się, gdy wiedza prowadzi do praktycznego rezultatu.",
    principleThreeTitle: "Ciągłe ulepszanie", principleThreeBody: "Małe, regularne usprawnienia składają się na niezawodne systemy.",
    experienceEyebrow: "Doświadczenie i umiejętności", experienceTitle: "Praca łącząca operacje z technologią.", roleDate: "2024 — obecnie", roleType: "Handel internetowy · Polska",
    roleTitle: "Systemy e-commerce i automatyzacja",
    roleBulletOne: "Konfiguruję i utrzymuję BaseLinkera oraz IdoSell w codziennej obsłudze zamówień.",
    roleBulletTwo: "Projektuję akcje automatyczne i reguły, które zdejmują z zespołu powtarzalne czynności.",
    roleBulletThree: "Tworzę własne szablony wydruków i eksportów dokumentów oraz danych.",
    roleBulletFour: "Rozwiązuję problemy operacyjne i usprawniam procesy od początku do końca.",
    toolbox: "Narzędzia", automation: "Automatyzacja procesów", templates: "Szablony wydruków i eksportów", troubleshooting: "Rozwiązywanie problemów", workflow: "Projektowanie procesów",
    educationEyebrow: "Wykształcenie", educationTitle: "Techniczne podstawy, menedżerskie spojrzenie.",
    eduOneDate: "2026 — 2027 (planowo)", eduOneTitle: "Studia magisterskie, Zarządzanie", eduOnePlace: "Uniwersytet WSB Merito, Poznań",
    eduTwoTitle: "Studia inżynierskie, Informatyka", eduTwoPlace: "Uniwersytet WSB Merito, Poznań",
    eduThreeTitle: "Technik informatyk", eduThreePlace: "Technikum TEB Edukacja, Poznań",
    contactEyebrow: "Kontakt", contactTitle: "Masz ciekawy problem lub propozycję?", contactBody: "Najłatwiej skontaktować się ze mną mailowo.", backToTop: "Wróć na górę"
  }
};

const languageButton = document.querySelector('.language-toggle');
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
let currentLanguage = localStorage.getItem('site-language') || (navigator.language.startsWith('pl') ? 'pl' : 'en');
const englishText = {};

document.querySelectorAll('[data-i18n]').forEach(element => { englishText[element.dataset.i18n] = element.textContent; });

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.dataset.i18n;
    element.textContent = language === 'pl' ? (translations.pl[key] || englishText[key]) : englishText[key];
  });
  languageButton.innerHTML = language === 'pl'
    ? '<span>EN</span><span aria-hidden="true">/</span><span class="language-active">PL</span>'
    : '<span class="language-active">EN</span><span aria-hidden="true">/</span><span>PL</span>';
  languageButton.setAttribute('aria-label', language === 'pl' ? 'Change language to English' : 'Zmień język na polski');
  localStorage.setItem('site-language', language);
}

languageButton.addEventListener('click', () => setLanguage(currentLanguage === 'en' ? 'pl' : 'en'));
menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

window.addEventListener('scroll', () => document.querySelector('.site-header').classList.toggle('scrolled', window.scrollY > 12), { passive: true });
document.getElementById('year').textContent = new Date().getFullYear();
setLanguage(currentLanguage);
