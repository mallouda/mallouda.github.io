const translations = {
  pl: {
    skip: "Przejdź do treści", navAbout: "O mnie", navExperience: "Doświadczenie", navProjects: "Projekty", navContact: "Kontakt",
    availability: "Otwarty na wartościowe rozmowy", heroLead: "Upraszczam", heroAccent: "skomplikowaną pracę.",
    heroSummary: "Jestem Szymon — specjalista e-commerce skupiony na systemach, automatyzacji i praktycznym rozwiązywaniu problemów.",
    seeWork: "Zobacz projekty", emailMe: "Napisz do mnie", locationValue: "Polska", locationLabel: "Lokalizacja", focusValue: "E-commerce", focusLabel: "Obecny kierunek", languagesLabel: "Języki",
    photoPlaceholder: "Miejsce na profesjonalny portret", portraitTitle: "Tutaj pojawi się Twoje główne zdjęcie", portraitHint: "Pionowy kadr · naturalne światło · proste tło",
    aboutEyebrow: "O mnie", aboutTitle: "Praktyczne myślenie przekładam na lepsze systemy.",
    aboutLead: "Lubię rozumieć, jak działają rzeczy, znajdować zbędne utrudnienia i tworzyć rozwiązania, dzięki którym codzienna praca staje się prostsza i szybsza.",
    aboutBody: "Zastąp ten akapit krótką historią: czym zajmujesz się obecnie, jakie problemy rozwiązujesz najlepiej i w jakim kierunku chcesz się rozwijać. Dwa lub trzy konkretne zdania będą mocniejsze niż długa autobiografia.",
    principleOneTitle: "Użyteczność ponad efekt", principleOneBody: "Rozwiązania powinny usprawniać prawdziwą pracę, a nie tylko dobrze wyglądać.",
    principleTwoTitle: "Nauka przez działanie", principleTwoBody: "Najszybciej uczę się, gdy wiedza prowadzi do praktycznego rezultatu.",
    principleThreeTitle: "Ciągłe ulepszanie", principleThreeBody: "Małe, regularne usprawnienia składają się na niezawodne systemy.",
    experienceEyebrow: "Doświadczenie i kompetencje", experienceTitle: "Praca łącząca operacje z technologią.", roleDate: "20XX — obecnie", roleType: "Doświadczenie zawodowe",
    roleTitle: "Systemy e-commerce i automatyzacja", roleCompany: "Nazwa firmy lub opis bez ujawniania pracodawcy",
    roleBulletOne: "Opisz jedno zadanie i problem biznesowy, który rozwiązuje.", roleBulletTwo: "Dodaj mierzalny rezultat: zaoszczędzony czas, mniej błędów lub obsłużone zamówienia.", roleBulletThree: "Wymień systemy i zespoły zaangażowane w pracę.",
    toolbox: "Obecny zestaw narzędzi", automation: "Automatyzacja", salesData: "Dane sprzedażowe", problemSolving: "Rozwiązywanie problemów", aiTools: "Narzędzia AI", skillsNote: "Dopracujemy tę listę, aby odzwierciedlała umiejętności, które potrafisz pewnie omówić i pokazać.",
    projectsEyebrow: "Wybrane projekty", projectsTitle: "Efekty przekonują bardziej niż lista umiejętności.", projectImage: "Miejsce na zdjęcie projektu / interfejs", caseStudy: "Studium przypadku", personalProject: "Projekt własny",
    projectOneTitle: "Automatyzacja procesu e-commerce", projectOneBody: "Opisz problem początkowy, wprowadzone zmiany i rezultat. W miarę możliwości użyj liczb.", operations: "Operacje",
    projectTwoTitle: "Analiza danych sprzedażowych", projectTwoBody: "Przyszłe studium przypadku dotyczące raportowania, prognozowania lub przełożenia danych na użyteczną decyzję.",
    projectThreeTitle: "To portfolio", projectThreeBody: "Po ukończeniu strony opisz decyzje projektowe i techniczne stojące za szymonsz.com.",
    contactEyebrow: "Porozmawiajmy", contactTitle: "Masz ciekawy problem lub propozycję?", contactBody: "Najłatwiej skontaktować się ze mną mailowo. Dodamy tutaj LinkedIn, GitHub i CV, gdy będą gotowe.", soon: "wkrótce", backToTop: "Wróć na górę"
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
