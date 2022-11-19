---
title: "Warp : 커스텀 테마 설정 방법"
date: "2022-11-19"
---

---

> 원본 링크 : [Custom Themes](https://docs.warp.dev/features/themes/custom-themes)

# 1. Config 폴더 생성

---

```bash
# 루트 디렉토리에 .warp/themes 디렉토리 생성
mkdir -p ~/.warp/themes/
```

- 해당 디렉토리에 커스텀 테마 설정을 위한 `.yaml` 파일을 추가합니다.
- 경우에 따라, 배경을 이미지로 하기 위해서 해당 폴더에 이미지를 추가할 수도 있습니다.

# 2. 테마 파일 생성

---

```bash
# 1. 원하는 경로에 yaml 파일을 생성하여 내용을 작성하고 .warp/themes 경로에 해당 파일 복사
cp ~/Downloads/custom.yaml ~/.warp/themes/

# 2. config 폴더로 이동 후, 커스텀 파일 생성
cd ~/.warp/themes/
touch custom.yaml
```

- 앞에서 생성한 `~/.warp/themes` 경로에 `yaml` 파일만 생성하면 됩니다.
- 커스텀 파일 명칭은 자유롭게 해도 됩니다.

# 3. 테마 파일 내용 작성

---

```yaml
accent: "#268bd2" # Warp UI의 강조 컬러
background: "#002b36" # 터미널 배경 컬러
background_image:
  # 경로는 상대 경로로 베이스 경로는 ~/.warp/themes 입니다.
  # 아래의 경우 총 경로는 : ~/.warp/themes/warp.jpg
  path: warp.jpg
  opacity: 60 # 투명도
details: darker # 테마 다크/라이트 여부
foreground: "#839496" # 뭔지 모르겠습니다.
terminal_colors:
  bright:
    black: "#002b36"
    blue: "#839496"
    cyan: "#93a1a1"
    green: "#586e75"
    magenta: "#6c71c4"
    red: "#cb4b16"
    white: "#fdf6e3"
    yellow: "#657b83"
  normal:
    black: "#073642"
    blue: "#268bd2"
    cyan: "#2aa198"
    green: "#859900"
    magenta: "#d33682"
    red: "#dc322f"
    white: "#eee8d5"
    yellow: "#b58900"
```

# 4. 이미지 파일 추가

---

```yaml
# 다운로드 경로에 이미지 복사해서 추가
cp ~/Downloads/image.jpg ~/.warp/themes/
```

- 아니면 파인더로 찾아서 바로 넣어줘도 됩니다. (숨김 파일 전부 보기로)
- 확장자는 아래 3개만 가능합니다.
  - `.jpeg`
  - `.jpg`
  - `.JPEG`
