const page = document.body.dataset.page;
const app = document.querySelector("#app");
const themeKey = "stylist-theme";
const savedKey = "stylist-saved-brands";
const recentKey = "stylist-recent-brands";
const reportKey = "stylist-report-drafts";
const routeKey = "stylist-route-plan";
const moodboardStateKey = "stylist-moodboard-state";
const brandOverrideKey = "stylist-brand-overrides";
const customBrandKey = "stylist-custom-brands";
const KAKAO_MAP_KEY = "3f221aae00c4902d862593ba1dd601c3";

const knownMeta = {
  "LOW CLASSIC": { target: "여성", price: "$$$", season: "프리폴, 코트, 셋업", loan: "문의 가능", sponsorship: "문의 가능", response: "보통", instagram: "@lowclassic", showroom: "예약 방문 가능", note: "광고, 에디토리얼 모두 강함", sample: "중간", hours: "운영 시간 사전 문의 권장", contact: "공식 사이트 문의 또는 인스타그램 DM 확인", pr: "세일즈/PR 공개 메일 별도 확인 필요", booking: "쇼룸 방문 전 예약 문의 권장", caution: "샘플 수량과 사이즈 폭은 시즌별 변동 가능" },
  "RECTO": { target: "여성", price: "$$$$", season: "테일러드, 포멀", loan: "문의 가능", sponsorship: "문의 가능", response: "보통", instagram: "@recto_official", showroom: "예약 방문 권장", note: "포멀, 광고, 셀럽 협찬에 적합", sample: "중간", hours: "플래그십 운영 시간은 공식 스토어 공지 확인", contact: "공식 사이트 고객/스토어 채널 우선", pr: "브랜드 세일즈 채널 별도 문의 필요", booking: "도산 플래그십 방문 전 일정 체크 권장", caution: "포멀 샘플은 수량 제한 가능성 있음" },
  "Matin Kim": { target: "유니섹스", price: "$$$", season: "트렌드 아이템, 데님, 아우터", loan: "문의 가능", sponsorship: "문의 가능", response: "빠름", instagram: "@matinkim_magazine", showroom: "예약 가능", note: "광고와 셀럽 협찬 레퍼런스 다수", sample: "쉬움", hours: "성수/도산 운영 시간은 공식 스토어 페이지 확인", contact: "공식 사이트 고객센터 및 인스타그램 공지 확인", pr: "협찬은 공식 채널 문의 기준", booking: "성수 방문과 샘플 문의는 사전 연락 권장", caution: "트렌드 상품은 회전이 빨라 재고 변동이 큼" },
  "AMOMENTO": { target: "여성", price: "$$$$", season: "니트, 구조적 아우터", loan: "문의 가능", sponsorship: "문의 필요", response: "보통", instagram: "@amomento.co", showroom: "예약 가능", note: "에디토리얼 무드 강함", sample: "중간", hours: "서촌 스토어 운영 시간 확인 권장", contact: "공식 사이트 문의와 인스타그램 채널 확인", pr: "PR/세일즈 공개 정보 확인 필요", booking: "방문 및 샘플 문의는 사전 컨택 권장", caution: "구조적 피스는 사이즈 체감 차이 확인 필요" },
  "Stand Oil": { target: "여성", price: "$$", season: "백, 슈즈, 소품", loan: "미확인", sponsorship: "문의 가능", response: "보통", instagram: "@standoil", showroom: "방문 가능", note: "백 포인트 스타일링에 강함", sample: "쉬움", hours: "성수 스토어 운영 시간 공지 확인", contact: "공식 사이트 FAQ 및 고객 문의 채널 활용", pr: "협찬 문의 여부는 브랜드 공지 확인", booking: "일반 방문 가능, 대량 셀렉은 문의 권장", caution: "컬러별 품절 속도가 빠른 편" },
  "OSOI": { target: "여성", price: "$$$", season: "백, 슈즈", loan: "미확인", sponsorship: "문의 가능", response: "보통", instagram: "@osoi_official", showroom: "방문 가능", note: "조형적 액세서리 포인트", sample: "중간", hours: "성수 스토어 운영 시간 확인 권장", contact: "공식 사이트와 인스타그램 채널 병행 확인", pr: "브랜드 채널 문의 기준", booking: "방문 가능, 특별 셀렉은 문의 권장", caution: "핵심 백 모델은 시즌 전개 속도가 빠름" },
  "Rockfish Weatherwear": { target: "여성", price: "$$", season: "슈즈, 레인, 메리제인", loan: "미확인", sponsorship: "문의 가능", response: "빠름", instagram: "@rockfishweatherwear", showroom: "방문 가능", note: "슈즈 포인트 소싱에 적합", sample: "쉬움", hours: "매장별 운영 시간 공지 확인", contact: "공식 사이트 고객 채널 우선", pr: "협찬 문의는 브랜드 공식 채널 확인", booking: "오프라인 방문 가능", caution: "사이즈 빠짐이 빨라 촬영 일정 전 선확인 필요" },
  "Margesherwood": { target: "여성", price: "$$$", season: "백, Y2K, 의상 믹스", loan: "문의 가능", sponsorship: "문의 가능", response: "보통", instagram: "@margesherwood", showroom: "방문 가능", note: "백 셀렉이 강한 브랜드", sample: "중간", hours: "한남 플래그십 운영 시간 공지 확인", contact: "공식 사이트 문의 채널 우선", pr: "협찬/세일즈 문의 별도 확인 필요", booking: "방문은 가능하나 사전 컨택 권장", caution: "백 중심 셀렉으로 의상 샘플은 시즌별 편차 존재" },
  "Didier Dubot": { target: "여성", price: "$$$$", season: "주얼리 포인트", loan: "문의 필요", sponsorship: "문의 가능", response: "보통", instagram: "@didierdubot_official", showroom: "오프라인 다수", note: "주얼리 포인트용 활용도 높음", sample: "중간", hours: "백화점/플래그십 영업 시간 기준", contact: "공식 사이트 스토어 안내 채널 확인", pr: "브랜드 본사/매장 문의 병행 필요", booking: "주얼리 셀렉은 방문 전 문의 권장", caution: "보안/대여 규정 확인 필요" },
  "thisisneverthat": { target: "유니섹스", price: "$$", season: "스트릿, 스케이트, 아우터", loan: "문의 가능", sponsorship: "문의 가능", response: "빠름", instagram: "@thisisneverthat", showroom: "방문 가능", note: "스트릿 촬영용 강점", sample: "쉬움", hours: "도산 플래그십 영업 시간 확인", contact: "공식 사이트 및 인스타그램 채널 확인", pr: "협찬 공개 채널 확인 필요", booking: "일반 방문 가능", caution: "핵심 협업 상품은 소진이 빠름" }
};

const moodMap = {
  "미니멀": "여백 많은 실루엣, 구조적인 아우터, 톤다운 팔레트",
  "스트릿": "그래픽, 루즈핏, 브랜드 존재감이 강한 룩",
  "조형적": "형태가 먼저 보이는 액세서리와 실루엣",
  "Y2K": "로고, 빈티지, 슬림 핏과 2000s 무드",
  "테일러드": "재킷, 코트, 팬츠 셋업 중심",
  "아방가르드": "형태 실험, 젠더리스, 강한 실루엣"
};

const slug = (value) => value.toLowerCase().replace(/\./g, "").replace(/[^a-z0-9가-힣]+/g, "-");
const readJson = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_error) {
    return fallback;
  }
};
const storageGet = (key) => readJson(key, []);
const objectStorageGet = (key) => readJson(key, {});
const emitStateChange = (type, detail = {}) => window.dispatchEvent(new CustomEvent("stylist:state", { detail: { type, ...detail } }));
const storageSet = (key, value, type = "storage") => {
  localStorage.setItem(key, JSON.stringify(value));
  emitStateChange(type, { key, value });
};
const googleMapLink = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
const naverMapLink = (address) => `https://map.naver.com/p/search/${encodeURIComponent(address)}`;
const brandAddressText = (brand) => [brand.showroom, ...brand.locations.flatMap((location) => [location.name, location.address])].join(" ");
const matchesRegionKeyword = (brand, keyword) => !keyword || brand.regions.includes(keyword) || brandAddressText(brand).includes(keyword);
const boardState = () => {
  const saved = storageGet(moodboardStateKey);
  return Array.isArray(saved) ? saved : [];
};
const saveBoardState = (items) => storageSet(moodboardStateKey, items, "board");

const enrichBrand = (brand, index) => {
  const extra = knownMeta[brand.name] || {};
  const primaryLocation = brand.locations[0] || { address: brand.showroom, name: "대표 포인트" };
  return {
    ...brand,
    id: slug(brand.name),
    koreanName: brand.name,
    englishName: brand.name,
    target: extra.target || (brand.categories.includes("주얼리") ? "여성" : "유니섹스"),
    price: extra.price || "$$$",
    season: extra.season || "데일리, 룩북 확인 필요",
    loan: extra.loan || "미확인",
    sponsorship: extra.sponsorship || "미확인",
    response: extra.response || "확인 필요",
    instagram: extra.instagram || "",
    showroomGuide: extra.showroom || (brand.qualityTone === "official" ? "방문 가능" : "운영 확인 필요"),
    stylistNote: extra.note || brand.styleNote,
    sampleDifficulty: extra.sample || "확인 필요",
    operatingHours: extra.hours || "운영 시간 공개 정보 확인 필요",
    contactChannel: extra.contact || "공식 사이트 또는 인스타그램 채널 확인 필요",
    prInfo: extra.pr || "PR/세일즈 문의 정보 확인 필요",
    bookingMethod: extra.booking || "방문 전 공식 채널 문의 권장",
    caution: extra.caution || "대여 및 재고 규정은 시즌별로 달라질 수 있음",
    updatedAt: `2026-03-${String((index % 12) + 1).padStart(2, "0")}`,
    primaryLocation,
    moodSummary: brand.styles.slice(0, 3).join(" · "),
    googleMapUrl: googleMapLink(primaryLocation.address),
    naverMapUrl: naverMapLink(primaryLocation.address)
  };
};

const applyBrandOverrides = (brand) => {
  const overrides = objectStorageGet(brandOverrideKey)[brand.id] || {};
  const nextPrimaryAddress = overrides.primaryLocationAddress || overrides.showroom || brand.primaryLocation.address;
  const primaryLocation = {
    ...brand.primaryLocation,
    address: nextPrimaryAddress
  };
  return {
    ...brand,
    ...overrides,
    primaryLocation,
    showroom: overrides.showroom || brand.showroom,
    googleMapUrl: googleMapLink(nextPrimaryAddress),
    naverMapUrl: naverMapLink(nextPrimaryAddress)
  };
};

let brands = [];
let byId = {};

function refreshBrandCache() {
  const customBrands = storageGet(customBrandKey);
  brands = [...(window.BRAND_DATA || []), ...customBrands].map(enrichBrand).map(applyBrandOverrides);
  byId = Object.fromEntries(brands.map((brand) => [brand.id, brand]));
}

refreshBrandCache();

const shell = (content) => `
  <div class="shell">
    <header class="topbar">
      <div class="brandmark">
        <strong>Stylist Brand Archive</strong>
        <span>촬영 전날에도 바로 쓰는 한국 디자이너 브랜드 소싱 툴</span>
      </div>
      <nav class="main-nav">
        ${navLink("브랜드 찾기", "brands.html", page === "brands")}
        ${navLink("지도", "map.html", page === "map")}
        ${navLink("무드보드", "moodboard.html", page === "moodboard")}
        ${navLink("대여·협찬", "rental.html", page === "rental")}
        ${navLink("업데이트", "updates.html", page === "updates")}
        ${navLink("제보/수정", "report.html", page === "report")}
        ${navLink("관리자", "admin.html", page === "admin")}
      </nav>
      <div class="utility-nav">
        <a class="utility-button" href="brands.html">검색</a>
        <a class="utility-button" href="moodboard.html">내 저장</a>
        <a class="utility-button" href="brands.html?sort=recent">최근 본 브랜드</a>
        <button id="themeToggle" class="theme-toggle" type="button">다크모드</button>
      </div>
    </header>
    ${content}
    <footer class="footer">
      <span>검수된 한국 디자이너 브랜드 아카이브</span>
      <span>쇼룸, 대여, 무드, 지역을 한 번에 탐색</span>
    </footer>
  </div>
`;

function navLink(label, href, active) {
  return `<a class="nav-link ${active ? "active" : ""}" href="${href}">${label}</a>`;
}

function renderBrandCard(brand) {
  const saved = storageGet(savedKey).includes(brand.id);
  const routed = storageGet(routeKey).includes(brand.id);
  return `
    <article class="brand-card">
      <div class="brand-head">
        <div>
          <p class="meta">${brand.regions.join(" · ")}</p>
          <h3>${brand.name}</h3>
        </div>
        <span class="save-chip">${brand.updatedAt}</span>
      </div>
      <p>${brand.summary}</p>
      <div class="brand-tags">
        ${brand.categories.slice(0, 3).map((item) => `<span class="tag">${item}</span>`).join("")}
        ${brand.styles.slice(0, 3).map((item) => `<span class="tag alt">${item}</span>`).join("")}
      </div>
      <div class="brand-meta-grid">
        <div class="brand-meta-item"><strong>지역</strong><span>${brand.primaryLocation.address}</span></div>
        <div class="brand-meta-item"><strong>쇼룸</strong><span>${brand.showroomGuide}</span></div>
        <div class="brand-meta-item"><strong>대여/협찬</strong><span>${brand.loan} / ${brand.sponsorship}</span></div>
      </div>
      <div class="action-row">
        <a class="mini-button" href="brand.html?brand=${brand.id}">상세 보기</a>
        <a class="mini-button" href="map.html?region=${encodeURIComponent(brand.regions[0])}">지도에서 보기</a>
        <button class="mini-button" data-save-brand="${brand.id}" type="button">${saved ? "저장됨" : "무드보드 담기"}</button>
        <button class="mini-button" data-route-brand="${brand.id}" type="button">${routed ? "동선 저장됨" : "동선 담기"}</button>
      </div>
    </article>
  `;
}

function homePage() {
  const featured = brands.slice(0, 8);
  const moods = ["미니멀", "로맨틱", "구조적", "스트리트", "Y2K", "아방가르드", "클래식 테일러링", "액세서리 포인트"];
  const updates = brands.slice(0, 6).map((brand, index) => ({ date: brand.updatedAt, title: `${brand.name} 정보 갱신`, text: index % 2 === 0 ? "쇼룸 주소와 최근 검수일을 재확인했습니다." : "브랜드 링크와 오프라인 포인트를 업데이트했습니다." }));
  return shell(`
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Stylist-first sourcing</p>
        <h1>한국 디자이너 브랜드를 스타일링 실무 기준으로 찾다</h1>
        <p>지역, 무드, 아이템, 대여 가능 여부까지 한 번에 탐색하고 쇼룸 동선과 연락 포인트를 빠르게 정리할 수 있게 설계했습니다.</p>
        <div class="hero-search">
          <input class="search-input" id="heroSearch" type="search" placeholder="브랜드명 / 지역 / 스타일 / 아이템 검색 예: 성수 여성 미니멀 아우터 대여 가능" />
          <div class="quick-filters">
            ${["성수", "한남", "청담", "미니멀", "스트리트", "액세서리", "슈즈", "대여 가능", "협찬 가능"].map((chip) => `<button class="quick-chip" data-home-filter="${chip}" type="button">${chip}</button>`).join("")}
          </div>
        </div>
      </div>
      <div class="hero-aside">
        <div class="metric-card"><small>브랜드 수</small><strong>${brands.length}</strong></div>
        <div class="metric-card"><small>공식 사이트 연결</small><strong>${brands.filter((brand) => brand.officialSite).length}</strong></div>
        <div class="metric-card"><small>실무 필드</small><strong>대여 · 협찬 · 연락 · 최근 검수</strong></div>
        <div class="info-tile">
          <h3>오늘 바로 시작</h3>
          <p class="subtle">예쁜 소개보다 빠른 판단. 검색, 비교, 동선, 저장까지 첫 화면에서 시작하도록 설계했습니다.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <div><h2>퀵 액션</h2><p class="subtle">실무자가 가장 자주 누를 동작을 바로 배치했습니다.</p></div>
      </div>
      <div class="section-grid-3">
        ${[
          ["오늘 바로 방문 가능한 쇼룸 찾기", "서울 주요 쇼룸과 플래그십 중심으로 바로 진입", "brands.html?visit=showroom"],
          ["촬영용 대여 가능한 브랜드만 보기", "대여·협찬 문의 가능 브랜드 중심 탐색", "rental.html?mode=loan"],
          ["성수/한남 쇼룸 지도 보기", "하루 동선을 만들기 좋은 핵심 지역", "map.html"],
          ["여성 컨템포러리 브랜드 모아보기", "광고, 에디토리얼, 셀럽 협찬 후보", "brands.html?mood=컨템포러리"],
          ["슈즈/백/주얼리 브랜드만 보기", "포인트 아이템 위주 빠른 셀렉", "brands.html?category=슈즈"],
          ["최근 검수된 브랜드부터 보기", "신뢰도 높은 최신 업데이트 기준", "updates.html"]
        ].map(([title, text, href]) => `<a class="action-card" href="${href}"><strong>${title}</strong><span class="subtle">${text}</span></a>`).join("")}
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <div><h2>검증된 브랜드</h2><p class="subtle">카드 한 장에서 실무 판단에 필요한 핵심 정보를 먼저 보이게 했습니다.</p></div>
        <a class="secondary-button" href="brands.html">전체 브랜드 보기</a>
      </div>
      <div class="brand-grid">${featured.map(renderBrandCard).join("")}</div>
    </section>

    <section class="section section-grid-2">
      <div class="map-stage">
        <div class="section-head"><div><h2>지역별 쇼룸 한눈에 보기</h2><p class="subtle">성수, 한남, 청담, 도산, 서촌, 부산권 동선 기준</p></div></div>
        <div class="pill-row">${["성수", "한남", "청담", "도산", "서촌", "부산"].map((tab) => `<a class="pill" href="map.html?region=${encodeURIComponent(tab)}">${tab}</a>`).join("")}</div>
        <div class="mock-map">
          <span class="map-pin" style="left:18%;top:32%"></span>
          <span class="map-pin" style="left:38%;top:40%"></span>
          <span class="map-pin" style="left:58%;top:28%"></span>
          <span class="map-pin" style="left:72%;top:52%"></span>
          <span class="map-pin" style="left:46%;top:70%"></span>
        </div>
      </div>
      <div class="section-card">
        <div class="section-head"><div><h2>스타일 / 무드 탐색</h2><p class="subtle">브랜드명이 아니라 무드로 찾는 흐름을 위한 탐색 카드</p></div></div>
        <div class="mood-grid">
          ${moods.map((mood) => `<a class="mood-card" href="brands.html?mood=${encodeURIComponent(mood)}"><strong>${mood}</strong><span class="subtle">${moodMap[mood] || "관련 브랜드를 빠르게 모아봅니다."}</span></a>`).join("")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-head"><div><h2>촬영 목적별 추천 브랜드</h2><p class="subtle">일반 디렉터리가 아니라 실무 큐레이션이 보이도록 구성했습니다.</p></div></div>
      <div class="curation-grid section-grid-3">
        ${[
          ["광고 촬영에 강한 브랜드", "Low Classic, Matin Kim, Recto 등 광고 비주얼과 대중 인지도를 함께 가진 브랜드 중심"],
          ["에디토리얼 무드가 강한 브랜드", "AMOMENTO, Hyein Seo, EENK, OPEN YY 같은 구조감 있는 브랜드 중심"],
          ["슈즈 셀렉이 좋은 브랜드", "Rockfish Weatherwear, OSOI, Stand Oil 같이 포인트 아이템이 선명한 브랜드 중심"],
          ["주얼리 포인트용 브랜드", "Didier Dubot, Midnight Moment 등 포인트 스타일링용"],
          ["한남 하루 동선 추천", "Mardi Mercredi, Rockfish, Nohant, Hyein Seo 인근 순환 동선"],
          ["성수 저예산 소싱 추천", "Stand Oil, Archive Bold, Codegraphy, Citybreeze 인근 위주"]
        ].map(([title, text]) => `<div class="section-card"><strong>${title}</strong><p class="subtle">${text}</p></div>`).join("")}
      </div>
    </section>

    <section class="section section-grid-2">
      <div class="section-card">
        <div class="section-head"><div><h2>최근 업데이트</h2><p class="subtle">살아있는 데이터라는 인상을 주는 신뢰 섹션</p></div><a class="secondary-button" href="updates.html">업데이트 전체 보기</a></div>
        <div class="timeline">
          ${updates.map((item) => `<div class="timeline-item"><span class="date">${item.date}</span><strong>${item.title}</strong><p>${item.text}</p></div>`).join("")}
        </div>
      </div>
      <div class="cta-band">
        <div>
          <h2>쇼룸 이전, 연락처 변경, 신규 브랜드 정보를 알고 있나요?</h2>
          <p>현장 정보를 가장 빨리 반영할 수 있도록 제보와 수정 요청 흐름을 별도 페이지로 분리했습니다.</p>
        </div>
        <div class="page-actions">
          <a class="primary-button" href="report.html">브랜드 제보</a>
          <a class="secondary-button" href="report.html">정보 수정 요청</a>
        </div>
      </div>
    </section>
  `);
}

function brandsPage() {
  return shell(`
    <section class="section">
      <div class="section-head">
        <div><p class="eyebrow">Brand Finder</p><h2>브랜드 찾기</h2><p class="subtle">지역, 카테고리, 무드, 실무 필터를 함께 걸어 빠르게 후보를 좁힙니다.</p></div>
      </div>
      <div class="brand-list-layout">
        <aside class="sidebar">
          <div class="panel">
            <div class="filter-group"><label>검색</label><input id="brandSearch" class="search-input" type="search" placeholder="브랜드명, 지역, 무드, 아이템" /></div>
            <div class="filter-group"><label>지역</label><select id="regionSelect" class="filter-select"><option value="">전체 지역</option>${optionSet(brands.flatMap((b) => b.regions))}</select></div>
            <div class="filter-group"><label>카테고리</label><select id="categorySelect" class="filter-select"><option value="">전체 카테고리</option>${optionSet(brands.flatMap((b) => b.categories))}</select></div>
            <div class="filter-group"><label>무드</label><select id="moodSelect" class="filter-select"><option value="">전체 무드</option>${optionSet(brands.flatMap((b) => b.styles))}</select></div>
            <div class="filter-group"><label>타깃</label><select id="targetSelect" class="filter-select"><option value="">전체 타깃</option>${optionSet(brands.map((b) => b.target))}</select></div>
            <div class="filter-group"><label>가격대</label><select id="priceSelect" class="filter-select"><option value="">전체 가격대</option>${optionSet(brands.map((b) => b.price))}</select></div>
            <div class="filter-group"><label>실무 필터</label>
              <div class="pill-row">
                ${["쇼룸 있음", "대여 가능", "협찬 가능", "빠른 응답", "최근 업데이트", "저장됨", "최근 본 브랜드"].map((item) => `<button class="pill" data-work-filter="${item}" type="button">${item}</button>`).join("")}
              </div>
            </div>
          </div>
        </aside>
        <div>
          <div class="section-head"><div><h2>결과</h2><p id="brandResultText" class="subtle">전체 브랜드를 불러오는 중입니다.</p></div></div>
          <div class="results-toolbar">
            <div id="resultMeta" class="result-meta"></div>
            <select id="sortSelect" class="filter-select">
              <option value="updated">최신 업데이트순</option>
              <option value="name">가나다순</option>
              <option value="loan">대여 가능 우선</option>
              <option value="response">빠른 응답 우선</option>
              <option value="saved">저장 많은 순</option>
              <option value="recent">최근 본 브랜드 우선</option>
            </select>
          </div>
          <div id="brandResults" class="brand-grid"></div>
        </div>
      </div>
    </section>
  `);
}

function detailPage() {
  const id = new URLSearchParams(location.search).get("brand");
  const brand = byId[id] || brands[0];
  rememberRecent(brand.id);
  return shell(`
    <section class="section">
      <div class="detail-grid">
        <div class="detail-column">
          <div class="detail-block">
            <p class="eyebrow">Brand Detail</p>
            <h1>${brand.koreanName}</h1>
            <p class="subtle">${brand.englishName} · ${brand.target} · ${brand.moodSummary}</p>
            <div class="pill-row">
              ${brand.styles.map((item) => `<span class="pill">${item}</span>`).join("")}
            </div>
            <div class="detail-actions">
              <button class="primary-button" data-save-brand="${brand.id}" type="button">저장</button>
              <a class="secondary-button" href="${brand.officialSite || brand.sourceUrl}" target="_blank" rel="noreferrer">공식 사이트</a>
            </div>
          </div>

          <div class="detail-block">
            <h3>기본 정보</h3>
            <div class="detail-list">
              <div><strong>브랜드 소개</strong><span>${brand.summary}</span></div>
              <div><strong>카테고리</strong><span>${brand.categories.join(", ")}</span></div>
              <div><strong>타깃</strong><span>${brand.target}</span></div>
              <div><strong>가격대</strong><span>${brand.price}</span></div>
              <div><strong>대표 스타일</strong><span>${brand.styles.join(", ")}</span></div>
              <div><strong>시즌 강점</strong><span>${brand.season}</span></div>
            </div>
          </div>

          <div class="detail-block">
            <h3>실무 정보</h3>
            <div class="detail-list">
              <div><strong>쇼룸 주소</strong><span>${brand.showroom}</span></div>
              <div><strong>운영 시간</strong><span>${brand.operatingHours}</span></div>
              <div><strong>예약 방식</strong><span>${brand.showroomGuide}</span></div>
              <div><strong>예약 메모</strong><span>${brand.bookingMethod}</span></div>
              <div><strong>문의 채널</strong><span>${brand.contactChannel}</span></div>
              <div><strong>공식 사이트</strong><span>${brand.officialSite || "미확인"}</span></div>
              <div><strong>인스타그램</strong><span>${brand.instagram || "미확인"}</span></div>
              <div><strong>PR / 세일즈</strong><span>${brand.prInfo}</span></div>
              <div><strong>대여 가능 여부</strong><span>${brand.loan}</span></div>
              <div><strong>협찬 가능 여부</strong><span>${brand.sponsorship}</span></div>
              <div><strong>유의사항</strong><span>${brand.caution}</span></div>
            </div>
          </div>

          <div class="detail-block">
            <h3>스타일리스트 메모</h3>
            <div class="detail-list">
              <div><strong>실무 메모</strong><span>${brand.stylistNote}</span></div>
              <div><strong>응답 속도</strong><span>${brand.response}</span></div>
              <div><strong>샘플 수급 난이도</strong><span>${brand.sampleDifficulty}</span></div>
              <div><strong>최근 검수일</strong><span>${brand.updatedAt}</span></div>
            </div>
          </div>
        </div>

        <aside class="detail-column">
          <div class="detail-block">
            <h3>대표 포인트</h3>
            <div class="map-list">
              ${brand.locations.map((location) => `<div class="map-item"><strong>${location.name}</strong><p>${location.type} · ${location.address}</p><div class="action-row"><a class="mini-button" href="${googleMapLink(location.address)}" target="_blank" rel="noreferrer">구글맵</a><a class="mini-button" href="${naverMapLink(location.address)}" target="_blank" rel="noreferrer">네이버지도</a></div></div>`).join("")}
            </div>
          </div>
          <div class="detail-block">
            <h3>비주얼 아카이브</h3>
            <div class="section-grid-2">
              ${brand.styles.slice(0, 4).map((item) => `<div class="section-card"><strong>${item}</strong><p class="subtle">${moodMap[item] || "브랜드 룩북과 시즌 아카이브로 확장 예정"}</p></div>`).join("")}
            </div>
          </div>
          <div class="detail-block">
            <h3>유사 브랜드 추천</h3>
            <div class="map-list">
              ${brands.filter((candidate) => candidate.id !== brand.id && candidate.styles.some((style) => brand.styles.includes(style))).slice(0, 4).map((candidate) => `<a class="map-item" href="brand.html?brand=${candidate.id}"><strong>${candidate.name}</strong><p>${candidate.moodSummary}</p></a>`).join("")}
            </div>
          </div>
        </aside>
      </div>
    </section>
  `);
}

function mapPage() {
  const region = new URLSearchParams(location.search).get("region") || "서울";
  const filtered = brands.filter((brand) => matchesRegionKeyword(brand, region));
  const routeSaved = storageGet(routeKey).map((id) => byId[id]).filter(Boolean);
  return shell(`
    <section class="section">
      <div class="section-head"><div><p class="eyebrow">Map & Route</p><h2>지도</h2><p class="subtle">지역별 군집화와 하루 동선 기준으로 브랜드를 확인합니다.</p></div></div>
      <div class="map-layout">
        <aside class="panel sidebar">
          <div class="filter-group"><label>지역 탭</label><div class="pill-row">${["서울", "부산", "대구", "경기", "제주"].map((item) => `<a class="pill" href="map.html?region=${encodeURIComponent(item)}">${item}</a>`).join("")}</div></div>
          <div class="filter-group"><label>핵심 지역</label><div class="pill-row">${["성수", "한남", "청담", "도산", "서촌"].map((item) => `<a class="pill" href="map.html?region=${encodeURIComponent(item)}">${item}</a>`).join("")}</div></div>
          <div class="filter-group"><label>실무 버튼</label><div class="pill-row">${["현재 범위", "도보 15분", "대여 가능", "협찬 가능", "동선 저장"].map((item) => `<span class="pill">${item}</span>`).join("")}</div></div>
          <div class="map-list">${filtered.slice(0, 6).map((brand) => `<div class="map-item"><strong>${brand.name}</strong><p>${brand.primaryLocation.address}</p><div class="action-row"><button class="mini-button" data-route-brand="${brand.id}" type="button">동선 담기</button><a class="mini-button" href="${brand.googleMapUrl}" target="_blank" rel="noreferrer">구글맵</a></div></div>`).join("")}</div>
          <div class="detail-block">
            <h3>저장된 하루 코스</h3>
            <div id="routeList" class="map-list">
              ${routeSaved.length ? routeSaved.map((brand) => `<div class="map-item"><strong>${brand.name}</strong><p>${brand.primaryLocation.address}</p></div>`).join("") : `<div class="map-item"><strong>저장된 동선이 없습니다.</strong><p>브랜드 카드에서 동선 담기를 누르면 여기에 쌓입니다.</p></div>`}
            </div>
            <div class="action-row">
              <button id="clearRoute" class="mini-button" type="button">동선 비우기</button>
              <a class="mini-button" href="moodboard.html">무드보드로 이동</a>
            </div>
          </div>
        </aside>
        <div class="map-stage">
          <div class="section-head"><div><h2>${region} 쇼룸 동선</h2><p class="subtle">실제 카카오 지도로 브랜드 포인트를 확인하고 외부 지도 앱으로 이어서 열 수 있습니다.</p></div></div>
          <div class="map-toolbar">
            <span class="pill">핀 ${filtered.length}개</span>
            <span class="pill" data-route-count>동선 저장 ${routeSaved.length}개</span>
            <a class="mini-button" href="${filtered[0] ? filtered[0].googleMapUrl : googleMapLink(region)}" target="_blank" rel="noreferrer">현재 지역 구글맵 열기</a>
          </div>
          <div id="kakaoMap" class="map-canvas" data-region="${region}"></div>
          <div class="map-list">${filtered.slice(0, 4).map((brand) => `<div class="map-item"><strong>${brand.name}</strong><p>${brand.primaryLocation.name} · ${brand.primaryLocation.address}</p><div class="action-row"><button class="mini-button" data-route-brand="${brand.id}" type="button">이 동선 저장</button><a class="mini-button" href="${brand.naverMapUrl}" target="_blank" rel="noreferrer">네이버지도</a><a class="mini-button" href="brand.html?brand=${brand.id}">상세</a></div></div>`).join("")}</div>
        </div>
      </div>
    </section>
  `);
}

function moodboardPage() {
  const state = boardState();
  const fallbackSaved = storageGet(savedKey)
    .filter((id) => !state.some((item) => item.id === id))
    .map((id) => ({ id, note: "", purpose: "패션 화보", order: 0 }));
  const merged = [...state, ...fallbackSaved]
    .map((item, index) => ({ ...item, order: item.order ?? index }))
    .sort((a, b) => a.order - b.order)
    .map((item) => ({ ...item, brand: byId[item.id] }))
    .filter((item) => item.brand);
  return shell(`
    <section class="section">
      <div class="section-head"><div><p class="eyebrow">Moodboard</p><h2>무드보드</h2><p class="subtle">브랜드를 저장하고, 촬영 목적 태그와 노트를 붙여 후보군을 정리합니다.</p></div></div>
      <div class="section-grid-2">
        <div class="section-card">
          <div class="board-toolbar">
            <span class="pill">2026 봄 패션 화보</span>
            <span class="pill">배우 협찬 후보</span>
            <span class="pill">성수 쇼룸 하루 일정</span>
            <button id="exportPdf" class="mini-button" type="button">PDF 내보내기</button>
          </div>
          <div id="savedBoard" class="map-list">
            ${merged.length ? merged.map((item, index) => `
              <div class="board-item" data-board-item="${item.brand.id}">
                <strong>${item.brand.name}</strong>
                <p>${item.brand.moodSummary}</p>
                <div class="board-meta">
                  <select class="filter-select" data-board-purpose="${item.brand.id}">
                    ${["패션 화보", "광고 촬영", "배우 협찬", "쇼룸 하루 일정", "셀렉 후보"].map((purpose) => `<option value="${purpose}" ${item.purpose === purpose ? "selected" : ""}>${purpose}</option>`).join("")}
                  </select>
                  <div class="action-row">
                    <button class="mini-button" data-board-up="${item.brand.id}" type="button" ${index === 0 ? "disabled" : ""}>위로</button>
                    <button class="mini-button" data-board-down="${item.brand.id}" type="button" ${index === merged.length - 1 ? "disabled" : ""}>아래로</button>
                  </div>
                </div>
                <textarea data-board-note="${item.brand.id}" placeholder="촬영 메모, 셀렉 포인트, 연락 상태를 적어두세요.">${item.note || ""}</textarea>
                <div class="board-tools">
                  <a class="mini-button" href="brand.html?brand=${item.brand.id}">상세 보기</a>
                  <a class="mini-button" href="map.html?region=${encodeURIComponent(item.brand.regions[0])}">지도 보기</a>
                  <button class="mini-button" data-board-remove="${item.brand.id}" type="button">제거</button>
                </div>
              </div>
            `).join("") : `<div class="board-empty"><strong>아직 저장된 브랜드가 없습니다.</strong><p>브랜드 카드에서 무드보드 담기를 누르면 여기에 쌓입니다.</p></div>`}
          </div>
        </div>
        <div class="section-card">
          <h2>추천 후보</h2>
          <div class="map-list">${brands.slice(0, 8).map((brand) => `<div class="board-item"><strong>${brand.name}</strong><p>${brand.styles.join(", ")}</p><button class="mini-button" data-save-brand="${brand.id}" type="button">무드보드 담기</button></div>`).join("")}</div>
        </div>
      </div>
    </section>
  `);
}

function rentalPage() {
  const filtered = brands.filter((brand) => brand.loan !== "미확인" || brand.sponsorship !== "미확인");
  return shell(`
    <section class="section">
      <div class="section-head"><div><p class="eyebrow">Loan & Sponsorship</p><h2>대여 · 협찬</h2><p class="subtle">촬영용 샘플 문의와 셀럽 협찬 가능성을 실무 기준으로 보는 페이지입니다.</p></div></div>
      <div class="section-grid-4">
        ${["대여 가능한 브랜드만 보기", "협찬 가능한 브랜드만 보기", "응답 빠른 브랜드", "최근 정책 변경 브랜드"].map((item) => `<div class="section-card"><strong>${item}</strong><p class="subtle">운영 검수와 문의 기록 기반으로 확장할 수 있는 카드 구조입니다.</p></div>`).join("")}
      </div>
      <div class="brand-grid" style="margin-top:16px;">${filtered.slice(0, 10).map(renderBrandCard).join("")}</div>
    </section>
  `);
}

function updatesPage() {
  const updates = brands.slice(0, 12).map((brand, index) => ({
    date: brand.updatedAt,
    title: `${brand.name} 검수 완료`,
    text: index % 3 === 0 ? "쇼룸 주소 업데이트" : index % 3 === 1 ? "공식 링크 재확인" : "대여·협찬 메모 보강"
  }));
  return shell(`
    <section class="section">
      <div class="section-head"><div><p class="eyebrow">Updates</p><h2>업데이트</h2><p class="subtle">살아있는 데이터라는 신뢰를 주는 운영 로그 페이지입니다.</p></div></div>
      <div class="section-grid-4">
        <div class="section-card"><strong>신규 등록 브랜드</strong><p class="subtle">12개</p></div>
        <div class="section-card"><strong>주소 업데이트</strong><p class="subtle">5건</p></div>
        <div class="section-card"><strong>폐점/이전 반영</strong><p class="subtle">2건</p></div>
        <div class="section-card"><strong>대여 정책 변경</strong><p class="subtle">3건</p></div>
      </div>
      <div class="timeline" style="margin-top:16px;">${updates.map((item) => `<div class="timeline-item"><span class="date">${item.date}</span><strong>${item.title}</strong><p>${item.text}</p></div>`).join("")}</div>
    </section>
  `);
}

function reportPage() {
  return shell(`
    <section class="section">
      <div class="section-head"><div><p class="eyebrow">Submit</p><h2>제보 / 수정</h2><p class="subtle">사용자 제출 → 관리자 검토 → 승인 후 반영 구조를 염두에 둔 폼입니다.</p></div></div>
      <div class="section-grid-2">
        <form id="reportForm" class="report-card">
          <div class="filter-group"><label>브랜드명</label><input name="brand" required /></div>
          <div class="filter-group"><label>수정 종류</label><select name="type"><option>주소 수정</option><option>연락처 수정</option><option>쇼룸 운영 여부</option><option>신규 브랜드 제보</option></select></div>
          <div class="filter-group"><label>참고 링크</label><input name="link" /></div>
          <div class="filter-group"><label>비고</label><textarea name="note" placeholder="변경 내용을 자세히 적어주세요."></textarea></div>
          <button class="primary-button" type="submit">제출하기</button>
        </form>
        <div class="report-card">
          <h2>운영 방식</h2>
          <div class="timeline">
            <div class="timeline-item"><strong>1. 사용자가 제출</strong><p>브랜드명, 수정 종류, 참고 링크를 남깁니다.</p></div>
            <div class="timeline-item"><strong>2. 관리자 검토</strong><p>공식 사이트와 SNS, 현장 연락으로 정보를 검수합니다.</p></div>
            <div class="timeline-item"><strong>3. 승인 후 반영</strong><p>업데이트 히스토리에 로그를 남기고 최근 검수일을 갱신합니다.</p></div>
          </div>
          <p id="reportStatus" class="report-help">제출하면 브라우저 로컬 저장소에 임시 기록합니다.</p>
        </div>
      </div>
    </section>
  `);
}

function adminPage() {
  const reports = storageGet(reportKey);
  const recentReports = reports.slice(0, 8);
  const recentlyChecked = [...brands].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 8);
  const officialCount = brands.filter((brand) => brand.qualityTone === "official").length;
  const loanCount = brands.filter((brand) => brand.loan !== "미확인").length;
  const editable = brands[0];
  const customBrands = storageGet(customBrandKey).slice(0, 6);
  return shell(`
    <section class="section">
      <div class="section-head"><div><p class="eyebrow">Admin Review</p><h2>검수 대시보드</h2><p class="subtle">브랜드 상태, 최근 검수, 사용자 제보를 한 화면에서 운영하는 관리자용 시뮬레이션입니다.</p></div></div>
      <div class="dashboard-grid">
        <aside class="dashboard-stack">
          <div class="section-card">
            <strong>브랜드 현황</strong>
            <div class="timeline" style="margin-top:12px;">
              <div class="timeline-item"><span class="date">TOTAL</span><strong>${brands.length}개 브랜드</strong><p>현재 데이터베이스 기준 등록 브랜드 수</p></div>
              <div class="timeline-item"><span class="date">OFFICIAL</span><strong>${officialCount}개 공식 검수</strong><p>공식 스토어/매장 페이지 기준 확인 완료</p></div>
              <div class="timeline-item"><span class="date">LOAN</span><strong>${loanCount}개 대여 정보 보유</strong><p>대여 또는 협찬 문의 메모가 들어간 브랜드</p></div>
            </div>
          </div>
          <div class="section-card">
            <strong>운영 액션</strong>
            <div class="board-tools">
              <button class="mini-button" type="button">브랜드 등록</button>
              <button class="mini-button" type="button">태그 관리</button>
              <button class="mini-button" type="button">무드 분류 관리</button>
              <button class="mini-button" type="button">업데이트 로그 생성</button>
            </div>
          </div>
          <div class="section-card">
            <div class="section-head"><div><h2>브랜드 즉시 수정</h2><p class="subtle">운영 메모와 실무 필드를 저장하면 새로고침 없이 바로 반영됩니다.</p></div></div>
            <form id="adminBrandForm" class="admin-editor">
              <div class="filter-group">
                <label>브랜드 선택</label>
                <select id="adminBrandSelect" class="filter-select">
                  ${brands.map((brand) => `<option value="${brand.id}" ${brand.id === editable.id ? "selected" : ""}>${brand.name}</option>`).join("")}
                </select>
              </div>
              <div class="filter-group"><label>대여 가능 여부</label><input name="loan" value="${editable.loan}" /></div>
              <div class="filter-group"><label>협찬 가능 여부</label><input name="sponsorship" value="${editable.sponsorship}" /></div>
              <div class="filter-group"><label>응답 속도</label><input name="response" value="${editable.response}" /></div>
              <div class="filter-group"><label>운영 시간</label><input name="operatingHours" value="${editable.operatingHours}" /></div>
              <div class="filter-group"><label>예약 메모</label><textarea name="bookingMethod">${editable.bookingMethod}</textarea></div>
              <div class="filter-group"><label>문의 채널</label><textarea name="contactChannel">${editable.contactChannel}</textarea></div>
              <div class="filter-group"><label>PR / 세일즈</label><textarea name="prInfo">${editable.prInfo}</textarea></div>
              <div class="filter-group"><label>유의사항</label><textarea name="caution">${editable.caution}</textarea></div>
              <div class="action-row">
                <button class="primary-button" type="submit">바로 반영</button>
                <button id="adminResetBrand" class="secondary-button" type="button">브랜드 초기화</button>
              </div>
              <p id="adminBrandStatus" class="report-help">저장 즉시 현재 페이지 상태와 로컬 데이터가 함께 갱신됩니다.</p>
            </form>
          </div>
          <div class="section-card">
            <div class="section-head"><div><h2>신규 브랜드 등록</h2><p class="subtle">관리자에서 직접 추가한 브랜드가 브랜드 찾기와 메인 화면에 바로 반영됩니다.</p></div></div>
            <form id="adminCreateForm" class="admin-editor">
              <div class="filter-group"><label>브랜드명</label><input name="name" required placeholder="예: Studio Example" /></div>
              <div class="filter-group"><label>한 줄 설명</label><textarea name="summary" required placeholder="브랜드 특징을 짧고 명확하게 입력"></textarea></div>
              <div class="admin-grid-2">
                <div class="filter-group"><label>지역</label><input name="regions" required placeholder="서울, 부산" /></div>
                <div class="filter-group"><label>쇼룸 주소</label><input name="showroom" required placeholder="서울 성동구 ..." /></div>
              </div>
              <div class="admin-grid-2">
                <div class="filter-group"><label>카테고리</label><input name="categories" required placeholder="의류, 가방, 액세서리" /></div>
                <div class="filter-group"><label>스타일 태그</label><input name="styles" required placeholder="미니멀, 컨템포러리, 스트릿" /></div>
              </div>
              <div class="admin-grid-2">
                <div class="filter-group"><label>공식 사이트</label><input name="officialSite" placeholder="https://..." /></div>
                <div class="filter-group"><label>출처 링크</label><input name="sourceUrl" placeholder="https://..." /></div>
              </div>
              <div class="admin-grid-2">
                <div class="filter-group"><label>타깃</label><input name="target" placeholder="여성, 유니섹스" /></div>
                <div class="filter-group"><label>가격대</label><input name="price" placeholder="$$$" /></div>
              </div>
              <div class="admin-grid-2">
                <div class="filter-group"><label>대여 가능 여부</label><input name="loan" placeholder="문의 가능" /></div>
                <div class="filter-group"><label>협찬 가능 여부</label><input name="sponsorship" placeholder="문의 가능" /></div>
              </div>
              <div class="action-row">
                <button class="primary-button" type="submit">브랜드 등록</button>
                <button id="adminCreateReset" class="secondary-button" type="button">입력 초기화</button>
              </div>
              <p id="adminCreateStatus" class="report-help">입력 후 등록하면 로컬 브랜드 데이터에 즉시 추가됩니다.</p>
            </form>
          </div>
        </aside>
        <div class="dashboard-stack">
          <div class="section-card">
            <div class="section-head"><div><h2>최근 검수 브랜드</h2><p class="subtle">최근 검수일과 운영 상태를 기준으로 관리</p></div></div>
            <table class="dashboard-table">
              <thead>
                <tr><th>브랜드</th><th>최근 검수</th><th>쇼룸</th><th>대여/협찬</th><th>상태</th></tr>
              </thead>
              <tbody>
                ${recentlyChecked.map((brand) => `
                  <tr>
                    <td><strong>${brand.name}</strong><br/><span class="subtle">${brand.regions.join(" · ")}</span></td>
                    <td>${brand.updatedAt}</td>
                    <td>${brand.showroomGuide}</td>
                    <td>${brand.loan} / ${brand.sponsorship}</td>
                    <td><span class="status-chip ${brand.qualityTone === "official" ? "ok" : "warn"}">${brand.qualityTone === "official" ? "검수 완료" : "추가 확인 필요"}</span></td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
          <div class="section-card">
            <div class="section-head"><div><h2>사용자 제보 대기</h2><p class="subtle">로컬에 저장된 제보를 운영 검토 큐처럼 보여줍니다.</p></div></div>
            ${recentReports.length ? `
              <table class="dashboard-table">
                <thead>
                  <tr><th>브랜드명</th><th>유형</th><th>참고 링크</th><th>상태</th></tr>
                </thead>
                <tbody>
                  ${recentReports.map((item, index) => `
                    <tr>
                      <td>${item.brand}</td>
                      <td>${item.type}</td>
                      <td>${item.link || "없음"}</td>
                      <td>
                        <div class="board-tools">
                          <span class="status-chip warn">검토 대기</span>
                          <button class="mini-button" data-report-approve="${index}" type="button">승인</button>
                          <button class="mini-button" data-report-reject="${index}" type="button">반려</button>
                        </div>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            ` : `<div class="board-empty"><strong>현재 대기 중인 제보가 없습니다.</strong><p>제보 페이지에서 제출하면 여기에 표시됩니다.</p></div>`}
          </div>
          <div class="section-card">
            <div class="section-head"><div><h2>실시간 프리뷰</h2><p class="subtle">방금 수정한 브랜드의 핵심 실무 정보 미리보기</p></div></div>
            <div id="adminPreview"></div>
          </div>
          <div class="section-card">
            <div class="section-head"><div><h2>최근 등록 브랜드</h2><p class="subtle">관리자에서 직접 추가한 로컬 브랜드 목록</p></div></div>
            <div id="adminCustomBrandList" class="map-list">
              ${customBrands.length ? customBrands.map((brand) => `
                <div class="map-item">
                  <strong>${brand.name}</strong>
                  <p>${brand.showroom}</p>
                  <div class="action-row">
                    <span class="status-chip ok">로컬 등록</span>
                    <button class="mini-button" data-custom-remove="${slug(brand.name)}" type="button">삭제</button>
                  </div>
                </div>
              `).join("") : `<div class="board-empty"><strong>직접 등록한 브랜드가 없습니다.</strong><p>왼쪽 폼에서 신규 브랜드를 추가하면 여기에 바로 표시됩니다.</p></div>`}
            </div>
          </div>
        </div>
      </div>
    </section>
  `);
}

function optionSet(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, "ko")).map((item) => `<option value="${item}">${item}</option>`).join("");
}

function render() {
  refreshBrandCache();
  const content = {
    home: homePage,
    brands: brandsPage,
    brand: detailPage,
    map: mapPage,
    moodboard: moodboardPage,
    rental: rentalPage,
    updates: updatesPage,
    report: reportPage,
    admin: adminPage
  }[page]();

  app.innerHTML = content;
  bindShared();
  if (page === "brands") bindBrandsPage();
  if (page === "report") bindReportPage();
  if (page === "map") bindMapPage();
  if (page === "moodboard") bindMoodboardPage();
  if (page === "admin") bindAdminPage();
}

function showToast(message) {
  let toast = document.querySelector("#floatingToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "floatingToast";
    toast.className = "floating-toast";
    document.body.append(toast);
  }
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 1800);
}

function syncActionButtons() {
  const saved = new Set(storageGet(savedKey));
  const routed = new Set(storageGet(routeKey));
  document.querySelectorAll("[data-save-brand]").forEach((button) => {
    button.textContent = saved.has(button.dataset.saveBrand) ? "저장됨" : "무드보드 담기";
  });
  document.querySelectorAll("[data-route-brand]").forEach((button) => {
    button.textContent = routed.has(button.dataset.routeBrand) ? "동선 저장됨" : "동선 담기";
  });
}

function refreshCurrentPageState(type) {
  syncActionButtons();
  if (page === "brands") {
    const search = document.querySelector("#brandSearch");
    if (search) {
      search.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }
  if (page === "map" && (type === "route" || type === "storage")) {
    renderRouteList();
  }
  if (page === "moodboard" && (type === "saved" || type === "board")) {
    render();
  }
  if (page === "admin" && type === "report") {
    render();
  }
}

function renderRouteList() {
  const routeList = document.querySelector("#routeList");
  const toolbar = document.querySelector(".map-toolbar");
  if (!routeList) {
    return;
  }
  const routeSaved = storageGet(routeKey).map((id) => byId[id]).filter(Boolean);
  routeList.innerHTML = routeSaved.length
    ? routeSaved.map((brand) => `<div class="map-item"><strong>${brand.name}</strong><p>${brand.primaryLocation.address}</p></div>`).join("")
    : `<div class="map-item"><strong>저장된 동선이 없습니다.</strong><p>브랜드 카드에서 동선 담기를 누르면 여기에 쌓입니다.</p></div>`;
  if (toolbar) {
    const countChip = toolbar.querySelector("[data-route-count]");
    if (countChip) {
      countChip.textContent = `동선 저장 ${routeSaved.length}개`;
    }
  }
}

function adminPreviewCard(brand) {
  return `
    <article class="brand-card compact">
      <div class="brand-head">
        <div>
          <p class="meta">${brand.regions.join(" · ")}</p>
          <h3>${brand.name}</h3>
        </div>
        <span class="save-chip">${brand.updatedAt}</span>
      </div>
      <div class="brand-meta-grid">
        <div class="brand-meta-item"><strong>대여</strong><span>${brand.loan}</span></div>
        <div class="brand-meta-item"><strong>협찬</strong><span>${brand.sponsorship}</span></div>
        <div class="brand-meta-item"><strong>응답</strong><span>${brand.response}</span></div>
      </div>
      <div class="detail-list compact-list">
        <div><strong>운영 시간</strong><span>${brand.operatingHours}</span></div>
        <div><strong>문의 채널</strong><span>${brand.contactChannel}</span></div>
        <div><strong>PR / 세일즈</strong><span>${brand.prInfo}</span></div>
      </div>
    </article>
  `;
}

function loadKakaoMapSdk() {
  if (window.kakao && window.kakao.maps) {
    return Promise.resolve(window.kakao);
  }

  if (window.__kakaoMapLoadingPromise) {
    return window.__kakaoMapLoadingPromise;
  }

  window.__kakaoMapLoadingPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&autoload=false&libraries=services`;
    script.onload = () => window.kakao.maps.load(() => resolve(window.kakao));
    script.onerror = () => reject(new Error("Kakao map sdk load failed"));
    document.head.append(script);
  });

  return window.__kakaoMapLoadingPromise;
}

async function initKakaoMap() {
  const mapNode = document.querySelector("#kakaoMap");
  if (!mapNode) {
    return;
  }

  const kakao = await loadKakaoMapSdk();
  const region = mapNode.dataset.region || "서울";
  const filtered = brands.filter((brand) => matchesRegionKeyword(brand, region));
  const map = new kakao.maps.Map(mapNode, {
    center: new kakao.maps.LatLng(37.5447, 127.0557),
    level: 7
  });
  const geocoder = new kakao.maps.services.Geocoder();
  const bounds = new kakao.maps.LatLngBounds();
  let placed = 0;

  await Promise.all(
    filtered.slice(0, 12).map(
      (brand) =>
        new Promise((resolve) => {
          geocoder.addressSearch(brand.primaryLocation.address, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
              const marker = new kakao.maps.Marker({ map, position: coords });
              const info = new kakao.maps.InfoWindow({
                content: `<div style="padding:10px 12px;font-size:12px;line-height:1.4;"><strong>${brand.name}</strong><br/>${brand.primaryLocation.address}</div>`
              });
              kakao.maps.event.addListener(marker, "click", () => info.open(map, marker));
              bounds.extend(coords);
              placed += 1;
            }
            resolve();
          });
        })
    )
  );

  if (placed > 0) {
    map.setBounds(bounds);
  }
}

function bindShared() {
  const toggle = document.querySelector("#themeToggle");
  const savedTheme = localStorage.getItem(themeKey) || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.body.dataset.theme = savedTheme;
  toggle.textContent = savedTheme === "dark" ? "화이트모드" : "다크모드";
  toggle.addEventListener("click", () => {
    const next = document.body.dataset.theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = next;
    localStorage.setItem(themeKey, next);
    toggle.textContent = next === "dark" ? "화이트모드" : "다크모드";
  });

  document.querySelectorAll("[data-save-brand]").forEach((button) => {
    button.addEventListener("click", () => {
      const list = new Set(storageGet(savedKey));
      list.add(button.dataset.saveBrand);
      storageSet(savedKey, [...list], "saved");
      const board = boardState();
      if (!board.some((item) => item.id === button.dataset.saveBrand)) {
        board.push({ id: button.dataset.saveBrand, note: "", purpose: "패션 화보", order: board.length });
        saveBoardState(board);
      }
      syncActionButtons();
      refreshCurrentPageState("saved");
      showToast("무드보드에 바로 반영했습니다.");
    });
  });

  document.querySelectorAll("[data-route-brand]").forEach((button) => {
    button.addEventListener("click", () => {
      const list = new Set(storageGet(routeKey));
      list.add(button.dataset.routeBrand);
      storageSet(routeKey, [...list], "route");
      syncActionButtons();
      refreshCurrentPageState("route");
      showToast("하루 동선에 바로 담았습니다.");
    });
  });

  const heroSearch = document.querySelector("#heroSearch");
  if (heroSearch) {
    heroSearch.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        location.href = `brands.html?query=${encodeURIComponent(heroSearch.value)}`;
      }
    });
  }

  document.querySelectorAll("[data-home-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      location.href = `brands.html?query=${encodeURIComponent(button.dataset.homeFilter)}`;
    });
  });

  syncActionButtons();
}

function bindBrandsPage() {
  const search = document.querySelector("#brandSearch");
  const region = document.querySelector("#regionSelect");
  const category = document.querySelector("#categorySelect");
  const mood = document.querySelector("#moodSelect");
  const target = document.querySelector("#targetSelect");
  const price = document.querySelector("#priceSelect");
  const sortSelect = document.querySelector("#sortSelect");
  const resultText = document.querySelector("#brandResultText");
  const resultGrid = document.querySelector("#brandResults");
  const resultMeta = document.querySelector("#resultMeta");

  const query = new URLSearchParams(location.search);
  search.value = query.get("query") || "";
  if (query.get("category")) category.value = query.get("category");
  if (query.get("mood")) mood.value = query.get("mood");

  let activeWorkFilter = "";
  document.querySelectorAll("[data-work-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeWorkFilter = button.dataset.workFilter;
      document.querySelectorAll("[data-work-filter]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      update();
    });
  });

  function update() {
    const filtered = brands.filter((brand) => {
      const q = search.value.trim().toLowerCase();
      const queryMatch = !q || [brand.name, brand.summary, brand.regions.join(" "), brand.styles.join(" "), brand.categories.join(" "), brand.primaryLocation.address].join(" ").toLowerCase().includes(q);
      const regionMatch = !region.value || brand.regions.includes(region.value);
      const categoryMatch = !category.value || brand.categories.includes(category.value);
      const moodMatch = !mood.value || brand.styles.includes(mood.value);
      const targetMatch = !target.value || brand.target === target.value;
      const priceMatch = !price.value || brand.price === price.value;
      const savedList = storageGet(savedKey);
      const recentList = storageGet(recentKey);
      const workMatch =
        !activeWorkFilter ||
        (activeWorkFilter === "쇼룸 있음" && brand.showroomGuide.includes("방문")) ||
        (activeWorkFilter === "대여 가능" && brand.loan !== "미확인") ||
        (activeWorkFilter === "협찬 가능" && brand.sponsorship !== "미확인") ||
        (activeWorkFilter === "빠른 응답" && brand.response === "빠름") ||
        (activeWorkFilter === "최근 업데이트" && brand.updatedAt >= "2026-03-09") ||
        (activeWorkFilter === "저장됨" && savedList.includes(brand.id)) ||
        (activeWorkFilter === "최근 본 브랜드" && recentList.includes(brand.id));
      return queryMatch && regionMatch && categoryMatch && moodMatch && targetMatch && priceMatch && workMatch;
    });

    const savedList = storageGet(savedKey);
    const recentList = storageGet(recentKey);
    const savedScore = (brand) => (savedList.includes(brand.id) ? 1 : 0);
    const recentScore = (brand) => {
      const index = recentList.indexOf(brand.id);
      return index === -1 ? 999 : index;
    };
    const sorted = [...filtered].sort((left, right) => {
      switch (sortSelect.value) {
        case "name":
          return left.name.localeCompare(right.name, "ko");
        case "loan":
          return Number(right.loan !== "미확인") - Number(left.loan !== "미확인");
        case "response":
          return Number(right.response === "빠름") - Number(left.response === "빠름");
        case "saved":
          return savedScore(right) - savedScore(left);
        case "recent":
          return recentScore(left) - recentScore(right);
        case "updated":
        default:
          return right.updatedAt.localeCompare(left.updatedAt);
      }
    });

    resultText.textContent = `${sorted.length}개 브랜드가 현재 조건에 맞습니다.`;
    resultMeta.innerHTML = `
      <span class="pill">최근 본 ${recentList.length}개</span>
      <span class="pill">저장 ${savedList.length}개</span>
      <span class="pill">대여 가능 ${sorted.filter((brand) => brand.loan !== "미확인").length}개</span>
    `;
    resultGrid.innerHTML = sorted.map(renderBrandCard).join("");
    bindShared();
    syncActionButtons();
  }

  [search, region, category, mood, target, price, sortSelect].forEach((node) => node.addEventListener("input", update));
  update();
}

function bindReportPage() {
  const form = document.querySelector("#reportForm");
  const status = document.querySelector("#reportStatus");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const list = storageGet(reportKey);
    list.unshift({ ...data, submittedAt: new Date().toISOString() });
    storageSet(reportKey, list, "report");
    form.reset();
    status.textContent = "제출 내용이 로컬에 임시 저장되었습니다. 운영 검토 흐름과 연동할 수 있는 상태입니다.";
    showToast("제보가 바로 저장되었습니다.");
  });
}

function bindMapPage() {
  initKakaoMap().catch(() => {
    const mapNode = document.querySelector("#kakaoMap");
    if (mapNode) {
      mapNode.innerHTML = `<div class="map-fallback"><strong>지도를 불러오지 못했습니다.</strong><p>카카오맵 앱 키 허용 도메인과 네트워크 상태를 확인하세요.</p></div>`;
    }
  });
  const clearRoute = document.querySelector("#clearRoute");
  if (!clearRoute) {
    return;
  }

  clearRoute.addEventListener("click", () => {
    storageSet(routeKey, [], "route");
    renderRouteList();
    syncActionButtons();
    showToast("저장된 동선을 비웠습니다.");
  });
}

function bindMoodboardPage() {
  const persist = () => {
    const items = [...document.querySelectorAll("[data-board-item]")].map((node, index) => ({
      id: node.dataset.boardItem,
      note: node.querySelector("[data-board-note]").value,
      purpose: node.querySelector("[data-board-purpose]").value,
      order: index
    }));
    saveBoardState(items);
  };

  document.querySelectorAll("[data-board-note]").forEach((textarea) => {
    textarea.addEventListener("input", persist);
  });

  document.querySelectorAll("[data-board-purpose]").forEach((select) => {
    select.addEventListener("change", persist);
  });

  document.querySelectorAll("[data-board-remove]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.boardRemove;
      storageSet(savedKey, storageGet(savedKey).filter((item) => item !== id), "saved");
      saveBoardState(boardState().filter((item) => item.id !== id).map((item, index) => ({ ...item, order: index })));
      render();
    });
  });

  document.querySelectorAll("[data-board-up]").forEach((button) => {
    button.addEventListener("click", () => {
      const items = boardState().sort((a, b) => a.order - b.order);
      const index = items.findIndex((item) => item.id === button.dataset.boardUp);
      if (index <= 0) {
        return;
      }
      [items[index - 1], items[index]] = [items[index], items[index - 1]];
      saveBoardState(items.map((item, order) => ({ ...item, order })));
      render();
    });
  });

  document.querySelectorAll("[data-board-down]").forEach((button) => {
    button.addEventListener("click", () => {
      const items = boardState().sort((a, b) => a.order - b.order);
      const index = items.findIndex((item) => item.id === button.dataset.boardDown);
      if (index === -1 || index >= items.length - 1) {
        return;
      }
      [items[index], items[index + 1]] = [items[index + 1], items[index]];
      saveBoardState(items.map((item, order) => ({ ...item, order })));
      render();
    });
  });

  const exportButton = document.querySelector("#exportPdf");
  if (exportButton) {
    exportButton.addEventListener("click", () => {
      window.print();
    });
  }
}

function bindAdminPage() {
  const reports = storageGet(reportKey);
  const select = document.querySelector("#adminBrandSelect");
  const form = document.querySelector("#adminBrandForm");
  const status = document.querySelector("#adminBrandStatus");
  const preview = document.querySelector("#adminPreview");
  const createForm = document.querySelector("#adminCreateForm");
  const createStatus = document.querySelector("#adminCreateStatus");

  const fillAdminForm = (brandId) => {
    const brand = byId[brandId];
    if (!brand || !form) {
      return;
    }
    ["loan", "sponsorship", "response", "operatingHours", "bookingMethod", "contactChannel", "prInfo", "caution"].forEach((field) => {
      form.elements[field].value = brand[field] || "";
    });
    if (preview) {
      preview.innerHTML = adminPreviewCard(brand);
    }
  };

  if (select) {
    fillAdminForm(select.value);
    select.addEventListener("change", () => fillAdminForm(select.value));
  }

  if (form && select) {
    const updatePreviewFromForm = () => {
      const base = byId[select.value];
      if (!base || !preview) {
        return;
      }
      preview.innerHTML = adminPreviewCard({
        ...base,
        loan: form.elements.loan.value.trim() || base.loan,
        sponsorship: form.elements.sponsorship.value.trim() || base.sponsorship,
        response: form.elements.response.value.trim() || base.response,
        operatingHours: form.elements.operatingHours.value.trim() || base.operatingHours,
        bookingMethod: form.elements.bookingMethod.value.trim() || base.bookingMethod,
        contactChannel: form.elements.contactChannel.value.trim() || base.contactChannel,
        prInfo: form.elements.prInfo.value.trim() || base.prInfo,
        caution: form.elements.caution.value.trim() || base.caution
      });
    };

    form.querySelectorAll("input, textarea").forEach((node) => {
      node.addEventListener("input", updatePreviewFromForm);
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const overrides = objectStorageGet(brandOverrideKey);
      overrides[select.value] = {
        ...(overrides[select.value] || {}),
        loan: form.elements.loan.value.trim(),
        sponsorship: form.elements.sponsorship.value.trim(),
        response: form.elements.response.value.trim(),
        operatingHours: form.elements.operatingHours.value.trim(),
        bookingMethod: form.elements.bookingMethod.value.trim(),
        contactChannel: form.elements.contactChannel.value.trim(),
        prInfo: form.elements.prInfo.value.trim(),
        caution: form.elements.caution.value.trim()
      };
      storageSet(brandOverrideKey, overrides, "brand-override");
      refreshBrandCache();
      fillAdminForm(select.value);
      status.textContent = "선택한 브랜드 정보가 즉시 반영되었습니다.";
      showToast("브랜드 실무 정보를 바로 반영했습니다.");
    });
  }

  const resetButton = document.querySelector("#adminResetBrand");
  if (resetButton && select) {
    resetButton.addEventListener("click", () => {
      const overrides = objectStorageGet(brandOverrideKey);
      delete overrides[select.value];
      storageSet(brandOverrideKey, overrides, "brand-override");
      refreshBrandCache();
      fillAdminForm(select.value);
      if (status) {
        status.textContent = "선택한 브랜드의 로컬 수정값을 초기화했습니다.";
      }
      showToast("브랜드 수정값을 초기화했습니다.");
    });
  }

  document.querySelectorAll("[data-report-approve]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.reportApprove);
      reports.splice(index, 1);
      storageSet(reportKey, reports, "report");
      showToast("제보를 승인 처리했습니다.");
    });
  });

  document.querySelectorAll("[data-report-reject]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.reportReject);
      reports.splice(index, 1);
      storageSet(reportKey, reports, "report");
      showToast("제보를 반려 처리했습니다.");
    });
  });

  if (createForm) {
    createForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(createForm).entries());
      const list = storageGet(customBrandKey);
      const name = data.name.trim();
      const id = slug(name);
      if (!name) {
        return;
      }
      const record = {
        name,
        categories: data.categories.split(",").map((item) => item.trim()).filter(Boolean),
        styles: data.styles.split(",").map((item) => item.trim()).filter(Boolean),
        regions: data.regions.split(",").map((item) => item.trim()).filter(Boolean),
        summary: data.summary.trim(),
        styleNote: `${data.styles.trim()} 기반 신규 등록 브랜드`,
        showroom: data.showroom.trim(),
        officialSite: data.officialSite.trim(),
        sourceUrl: data.sourceUrl.trim() || data.officialSite.trim(),
        qualityTone: data.officialSite.trim() ? "official" : "mixed",
        locations: [
          {
            type: "쇼룸",
            name: `${name} 쇼룸`,
            address: data.showroom.trim()
          }
        ]
      };
      const deduped = list.filter((item) => slug(item.name) !== id);
      deduped.unshift(record);
      storageSet(customBrandKey, deduped, "custom-brand");

      const overrides = objectStorageGet(brandOverrideKey);
      overrides[id] = {
        target: data.target.trim() || "유니섹스",
        price: data.price.trim() || "$$$",
        loan: data.loan.trim() || "미확인",
        sponsorship: data.sponsorship.trim() || "미확인",
        response: "확인 필요",
        operatingHours: "운영 시간 확인 필요",
        bookingMethod: "방문 전 문의 권장",
        contactChannel: data.officialSite.trim() ? "공식 사이트 확인" : "공식 채널 확인 필요",
        prInfo: "PR/세일즈 문의 정보 확인 필요",
        caution: "신규 등록 브랜드로 세부 정보 추가 검수 필요"
      };
      storageSet(brandOverrideKey, overrides, "brand-override");

      createForm.reset();
      if (createStatus) {
        createStatus.textContent = `${name} 브랜드를 로컬 데이터에 등록했고 즉시 반영했습니다.`;
      }
      showToast("신규 브랜드를 바로 등록했습니다.");
      render();
    });
  }

  const createReset = document.querySelector("#adminCreateReset");
  if (createReset && createForm) {
    createReset.addEventListener("click", () => {
      createForm.reset();
      if (createStatus) {
        createStatus.textContent = "입력값을 초기화했습니다.";
      }
    });
  }

  document.querySelectorAll("[data-custom-remove]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.customRemove;
      const list = storageGet(customBrandKey).filter((item) => slug(item.name) !== id);
      storageSet(customBrandKey, list, "custom-brand");
      const overrides = objectStorageGet(brandOverrideKey);
      delete overrides[id];
      storageSet(brandOverrideKey, overrides, "brand-override");
      showToast("등록한 브랜드를 삭제했습니다.");
      render();
    });
  });
}

function rememberRecent(id) {
  const items = storageGet(recentKey).filter((item) => item !== id);
  items.unshift(id);
  storageSet(recentKey, items.slice(0, 10), "recent");
}

window.addEventListener("stylist:state", (event) => {
  refreshBrandCache();
  refreshCurrentPageState(event.detail.type);
});

render();
