const brands = window.BRAND_DATA || [];

const REGION_PAGES = [
  { name: "전국", href: "/index.html" },
  { name: "서울", href: "/regions/seoul.html" },
  { name: "부산", href: "/regions/busan.html" },
  { name: "대구", href: "/regions/daegu.html" },
  { name: "인천", href: "/regions/incheon.html" },
  { name: "광주", href: "/regions/gwangju.html" },
  { name: "대전", href: "/regions/daejeon.html" },
  { name: "울산", href: "/regions/ulsan.html" },
  { name: "세종", href: "/regions/sejong.html" },
  { name: "경기", href: "/regions/gyeonggi.html" },
  { name: "강원", href: "/regions/gangwon.html" },
  { name: "충북", href: "/regions/chungbuk.html" },
  { name: "충남", href: "/regions/chungnam.html" },
  { name: "전북", href: "/regions/jeonbuk.html" },
  { name: "전남", href: "/regions/jeonnam.html" },
  { name: "경북", href: "/regions/gyeongbuk.html" },
  { name: "경남", href: "/regions/gyeongnam.html" },
  { name: "제주", href: "/regions/jeju.html" }
];

const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const styleFilter = document.querySelector("#styleFilter");
const regionFilter = document.querySelector("#regionFilter");
const verifiedOnlyInput = document.querySelector("#verifiedOnly");
const resetButton = document.querySelector("#resetButton");
const brandGrid = document.querySelector("#brandGrid");
const brandCardTemplate = document.querySelector("#brandCardTemplate");
const brandCount = document.querySelector("#brandCount");
const locationCount = document.querySelector("#locationCount");
const resultSummary = document.querySelector("#resultSummary");
const activeChips = document.querySelector("#activeChips");
const regionGrid = document.querySelector("#regionGrid");
const regionStrip = document.querySelector("#regionStrip");
const pageTitleNode = document.querySelector("#pageTitle");
const pageDescriptionNode = document.querySelector("#pageDescription");
const datasetStatusNode = document.querySelector("#datasetStatus");
const paginationNode = document.querySelector("#pagination");

const PAGE_SIZE = 18;
let currentPage = 1;

const regionFromQuery = new URLSearchParams(window.location.search).get("region") || "";
const defaultRegion = document.body.dataset.defaultRegion || regionFromQuery;
const pageTitle = regionFromQuery
  ? `${regionFromQuery} 아카이브`
  : document.body.dataset.pageTitle || (defaultRegion ? `${defaultRegion} 아카이브` : "전국 아카이브");
const pageDescription = regionFromQuery
  ? `${regionFromQuery} 기준으로 연결된 브랜드만 모아 볼 수 있습니다.`
  : document.body.dataset.pageDescription ||
    (defaultRegion ? `${defaultRegion} 기준으로 연결된 브랜드만 모아 볼 수 있습니다.` : "");

const uniqueValues = (key) => {
  const values = new Set();
  brands.forEach((brand) => {
    brand[key].forEach((value) => values.add(value));
  });
  return [...values].sort((left, right) => left.localeCompare(right, "ko"));
};

const allCategories = uniqueValues("categories");
const allStyles = uniqueValues("styles");
const allRegions = uniqueValues("regions");

const populateSelect = (element, label, values) => {
  element.innerHTML = "";
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = `${label} 전체`;
  element.append(defaultOption);

  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    element.append(option);
  });
};

const buildRegionNavigation = () => {
  regionStrip.innerHTML = "";
  REGION_PAGES.forEach((region) => {
    const link = document.createElement("a");
    link.className = "region-link";
    link.href = region.href;
    link.textContent = region.name;
    if ((defaultRegion && region.name === defaultRegion) || (!defaultRegion && region.name === "전국")) {
      link.classList.add("active");
    }
    regionStrip.append(link);
  });
};

const renderRegionCards = () => {
  regionGrid.innerHTML = "";

  REGION_PAGES.filter((region) => region.name !== "전국").forEach((region) => {
    const count = brands.filter((brand) => brand.regions.includes(region.name)).length;
    const card = document.createElement("a");
    card.className = "region-card";
    card.href = region.href;
    card.innerHTML = `<strong>${region.name}</strong><p>${count}개 브랜드가 현재 데이터에 연결되어 있습니다.</p>`;
    regionGrid.append(card);
  });
};

const getFilters = () => ({
  search: searchInput.value.trim().toLowerCase(),
  category: categoryFilter.value,
  style: styleFilter.value,
  region: regionFilter.value || defaultRegion,
  verifiedOnly: verifiedOnlyInput.checked
});

const matchesSearch = (brand, search) => {
  if (!search) {
    return true;
  }

  const haystack = [
    brand.name,
    brand.summary,
    brand.styleNote,
    brand.showroom,
    ...brand.categories,
    ...brand.styles,
    ...brand.regions,
    ...brand.locations.flatMap((location) => [location.type, location.name, location.address])
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(search);
};

const filterBrands = (filters) =>
  brands.filter((brand) => {
    const categoryMatch = !filters.category || brand.categories.includes(filters.category);
    const styleMatch = !filters.style || brand.styles.includes(filters.style);
    const regionMatch = !filters.region || brand.regions.includes(filters.region);
    const verifiedMatch = !filters.verifiedOnly || brand.qualityTone === "official";

    return categoryMatch && styleMatch && regionMatch && verifiedMatch && matchesSearch(brand, filters.search);
  });

const createTag = (text, className = "") => {
  const tag = document.createElement("span");
  tag.className = `tag ${className}`.trim();
  tag.textContent = text;
  return tag;
};

const renderChips = (filters) => {
  activeChips.innerHTML = "";
  const chips = [];

  if (filters.region) {
    chips.push(`지역: ${filters.region}`);
  }
  if (filters.category) {
    chips.push(`카테고리: ${filters.category}`);
  }
  if (filters.style) {
    chips.push(`스타일: ${filters.style}`);
  }
  if (filters.search) {
    chips.push(`검색어: ${filters.search}`);
  }
  if (filters.verifiedOnly) {
    chips.push("공식 위치 공개");
  }

  chips.forEach((label) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = label;
    activeChips.append(chip);
  });
};

const getBadgeLabel = (brand) => (brand.qualityTone === "official" ? "공식 확인" : "공식/회사 정보");

const renderBrands = () => {
  const filters = getFilters();
  const filteredBrands = filterBrands(filters);
  const totalLocations = filteredBrands.reduce((count, brand) => count + brand.locations.length, 0);
  const totalPages = Math.max(1, Math.ceil(filteredBrands.length / PAGE_SIZE));
  currentPage = Math.min(currentPage, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleBrands = filteredBrands.slice(startIndex, startIndex + PAGE_SIZE);

  brandGrid.innerHTML = "";
  paginationNode.innerHTML = "";
  brandCount.textContent = `${filteredBrands.length}개`;
  locationCount.textContent = `${totalLocations}곳`;
  resultSummary.textContent =
    filteredBrands.length > 0
      ? `${filteredBrands.length}개 브랜드와 ${totalLocations}개 오프라인 포인트가 현재 조건에 맞습니다. ${currentPage} / ${totalPages} 페이지입니다.`
      : "조건에 맞는 브랜드가 없습니다.";

  renderChips(filters);

  if (!filteredBrands.length) {
    const empty = document.createElement("div");
    empty.className = "result-empty";
    empty.textContent = "검색어를 줄이거나 필터를 해제해 다시 확인해 보세요.";
    brandGrid.append(empty);
    return;
  }

  visibleBrands.forEach((brand) => {
    const fragment = brandCardTemplate.content.cloneNode(true);

    fragment.querySelector(".brand-region").textContent = brand.regions.join(" / ");
    fragment.querySelector(".brand-name").textContent = brand.name;
    fragment.querySelector(".quality-badge").textContent = getBadgeLabel(brand);
    fragment.querySelector(".brand-summary").textContent = brand.summary;
    fragment.querySelector(".showroom").textContent = brand.showroom;
    fragment.querySelector(".location-total").textContent = `${brand.locations.length}곳`;
    fragment.querySelector(".style-note").textContent = brand.styleNote;

    const categoryTags = fragment.querySelector(".category-tags");
    brand.categories.forEach((category) => categoryTags.append(createTag(category)));

    const styleTags = fragment.querySelector(".style-tags");
    brand.styles.forEach((style) => styleTags.append(createTag(style, "style")));

    const locationList = fragment.querySelector(".location-list");
    brand.locations.slice(0, 3).forEach((location) => {
      const item = document.createElement("div");
      item.className = "location-item";
      item.innerHTML = `
        <span class="location-type">${location.type}</span>
        <strong>${location.name}</strong>
        <span>${location.address}</span>
      `;
      locationList.append(item);
    });

    if (brand.locations.length > 3) {
      const more = document.createElement("div");
      more.className = "location-item";
      more.innerHTML = `<strong>추가 포인트 ${brand.locations.length - 3}곳</strong><span>공식 링크에서 더 확인할 수 있습니다.</span>`;
      locationList.append(more);
    }

    const siteLink = fragment.querySelector(".site-link");
    const sourceLink = fragment.querySelector(".source-link");
    siteLink.href = brand.officialSite;
    sourceLink.href = brand.sourceUrl;

    brandGrid.append(fragment);
  });

  if (totalPages > 1) {
    for (let page = 1; page <= totalPages; page += 1) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `page-button ${page === currentPage ? "active" : ""}`.trim();
      button.textContent = String(page);
      button.addEventListener("click", () => {
        currentPage = page;
        renderBrands();
      });
      paginationNode.append(button);
    }
  }
};

const resetFilters = () => {
  currentPage = 1;
  searchInput.value = "";
  categoryFilter.value = "";
  styleFilter.value = "";
  regionFilter.value = defaultRegion;
  verifiedOnlyInput.checked = false;
  renderBrands();
};

pageTitleNode.textContent = pageTitle;
pageDescriptionNode.textContent = pageDescription;
datasetStatusNode.textContent = `현재는 공식 소스로 정리한 ${brands.length}개 브랜드만 넣었습니다. 목표치 2,025개까지는 검증 가능한 원천 목록을 추가로 연결해야 합니다.`;

populateSelect(categoryFilter, "카테고리", allCategories);
populateSelect(styleFilter, "스타일", allStyles);
populateSelect(regionFilter, "지역", allRegions);

if (defaultRegion) {
  regionFilter.value = defaultRegion;
}

[searchInput, categoryFilter, styleFilter, regionFilter, verifiedOnlyInput].forEach((node) => {
  const rerender = () => {
    currentPage = 1;
    renderBrands();
  };
  node.addEventListener("input", rerender);
  node.addEventListener("change", rerender);
});

resetButton.addEventListener("click", resetFilters);

buildRegionNavigation();
renderRegionCards();
renderBrands();
