# Brand Import Pipeline

이 프로젝트는 외부 API나 대량 원본 데이터를 바로 앱에 붙일 수 있도록 `data/imported-brands.js` 레이어를 추가해둔 상태다.

## 목적

- 2,000개 이상 브랜드 원본을 정제해서 앱에 추가
- 기존 `data/brands.js`는 유지
- 대량 원본은 별도 파일로 관리

## 입력 형식

원본은 JSON 배열 기준이다. 예시는 [imports/brand-import-template.json](/home/user/yparkw/imports/brand-import-template.json)에 있다.

필수에 가까운 필드:

- `name`
- `categories`
- `styles`
- `regions`
- `showroom`

선택 필드:

- `summary`
- `styleNote`
- `officialSite`
- `sourceUrl`
- `qualityTone`
- `locations`

## 빌드 방법

```bash
node scripts/build-imported-brands.mjs --input imports/raw-brands.json
```

기본 출력 파일:

```bash
data/imported-brands.js
```

## 앱 반영 방식

- `data/brands.js`
- `data/imported-brands.js`
- 관리자 로컬 등록 브랜드

위 3개를 합쳐서 앱에서 렌더링한다.

## 실제 2,000개 확장 절차

1. 외부 API 또는 원본 JSON/CSV 확보
2. JSON 배열 형태로 정리
3. `build-imported-brands.mjs`로 변환
4. `data/imported-brands.js` 생성
5. 사이트에서 바로 확인

## 주의

- 공식 사이트와 쇼룸 주소는 원본 단계에서 한 번 더 검수하는 게 맞다
- 공개 API가 없으면 여러 소스를 합쳐 정제해야 한다
- 이 스크립트는 대량 반영용 뼈대이며, 실제 수집기는 별도 구현이 필요하다
