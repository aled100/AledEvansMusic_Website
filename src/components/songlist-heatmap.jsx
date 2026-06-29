import { useState, useMemo, useEffect, useRef } from "react";

const VIBE_MAP = {
  "From Me to You":                 { vibe: "singalong", energy: 55 },
  "In the Midnight Hour":           { vibe: "dance",     energy: 75 },
  "My Girl":                        { vibe: "mellow",    energy: 35 },
  "Can't Take My Eyes Off You":     { vibe: "singalong", energy: 70 },
  "All Along the Watchtower":       { vibe: "mellow",    energy: 55 },
  "Proud Mary":                     { vibe: "dance",     energy: 80 },
  "Brown Sugar":                    { vibe: "dance",     energy: 78 },
  "Maggie May":                     { vibe: "singalong", energy: 50 },
  "Rocket Man":                     { vibe: "mellow",    energy: 30 },
  "Ooh La La":                      { vibe: "singalong", energy: 60 },
  "Born to Run":                    { vibe: "singalong", energy: 85 },
  "Dancing Queen":                  { vibe: "dance",     energy: 90 },
  "The Gambler":                    { vibe: "mellow",    energy: 25 },
  "Beast of Burden":                { vibe: "mellow",    energy: 40 },
  "Don't Stop Me Now":              { vibe: "dance",     energy: 95 },
  "Highway to Hell":                { vibe: "singalong", energy: 88 },
  "Don't Stop Believin'":           { vibe: "singalong", energy: 82 },
  "Atlantic City":                  { vibe: "mellow",    energy: 30 },
  "Holding Out for a Hero":         { vibe: "dance",     energy: 88 },
  "Run to You":                     { vibe: "singalong", energy: 68 },
  "Dancing in the Dark":            { vibe: "dance",     energy: 75 },
  "Summer of '69":                  { vibe: "singalong", energy: 80 },
  "She Sells Sanctuary":            { vibe: "dance",     energy: 78 },
  "Livin' on a Prayer":             { vibe: "singalong", energy: 90 },
  "You Can Call Me Al":             { vibe: "dance",     energy: 72 },
  "Sweet Child O' Mine":            { vibe: "singalong", energy: 80 },
  "Think We're Alone Now":          { vibe: "dance",     energy: 75 },
  "I Wanna Dance with Somebody":    { vibe: "dance",     energy: 92 },
  "Fairytale of New York":          { vibe: "singalong", energy: 65 },
  "There She Goes":                 { vibe: "mellow",    energy: 35 },
  "A Little Respect":               { vibe: "dance",     energy: 82 },
  "Last Christmas":                 { vibe: "singalong", energy: 60 },
  "Sit Down":                       { vibe: "singalong", energy: 68 },
  "Friday I'm in Love":             { vibe: "dance",     energy: 72 },
  "Motorcycle Emptiness":           { vibe: "mellow",    energy: 50 },
  "Rhythm Is a Dancer":             { vibe: "dance",     energy: 90 },
  "Laid":                           { vibe: "mellow",    energy: 40 },
  "What's Up?":                     { vibe: "singalong", energy: 72 },
  "Live Forever":                   { vibe: "singalong", energy: 65 },
  "Basket Case":                    { vibe: "singalong", energy: 82 },
  "Zombie":                         { vibe: "mellow",    energy: 55 },
  "Wonderwall":                     { vibe: "singalong", energy: 70 },
  "Disco 2000":                     { vibe: "dance",     energy: 75 },
  "Back for Good":                  { vibe: "mellow",    energy: 35 },
  "Don't Look Back in Anger":       { vibe: "singalong", energy: 75 },
  "Angels":                         { vibe: "singalong", energy: 65 },
  "Bitter Sweet Symphony":          { vibe: "mellow",    energy: 50 },
  "Save Tonight":                   { vibe: "singalong", energy: 60 },
  "Good Riddance":                  { vibe: "mellow",    energy: 30 },
  "Torn":                           { vibe: "singalong", energy: 60 },
  "Iris":                           { vibe: "mellow",    energy: 45 },
  "Kiss Me":                        { vibe: "mellow",    energy: 30 },
  "Learning to Fly":                { vibe: "singalong", energy: 70 },
  "All the Small Things":           { vibe: "singalong", energy: 80 },
  "When You Say Nothing at All":    { vibe: "mellow",    energy: 30 },
  "Yellow":                         { vibe: "mellow",    energy: 40 },
  "Teenage Dirtbag":                { vibe: "singalong", energy: 72 },
  "Dancing in the Moonlight":       { vibe: "dance",     energy: 78 },
  "Drops of Jupiter":               { vibe: "singalong", energy: 58 },
  "Handbags and Gladrags":          { vibe: "mellow",    energy: 38 },
  "The Scientist":                  { vibe: "mellow",    energy: 28 },
  "Mr. Brightside":                 { vibe: "singalong", energy: 85 },
  "Stacy's Mom":                    { vibe: "dance",     energy: 78 },
  "Times Like These":               { vibe: "singalong", energy: 75 },
  "Dakota":                         { vibe: "singalong", energy: 72 },
  "When You Were Young":            { vibe: "singalong", energy: 80 },
  "Chasing Cars":                   { vibe: "mellow",    energy: 32 },
  "Last Request":                   { vibe: "mellow",    energy: 28 },
  "Valerie":                        { vibe: "dance",     energy: 85 },
  "Love Story":                     { vibe: "singalong", energy: 68 },
  "Use Somebody":                   { vibe: "singalong", energy: 65 },
  "Viva la Vida":                   { vibe: "singalong", energy: 75 },
  "Little Lion Man":                { vibe: "singalong", energy: 72 },
  "Many of Horror":                 { vibe: "mellow",    energy: 35 },
  "We Found Love":                  { vibe: "dance",     energy: 90 },
  "Chocolate":                      { vibe: "singalong", energy: 65 },
  "Blame It on Me":                 { vibe: "mellow",    energy: 45 },
  "Shut Up and Dance":              { vibe: "dance",     energy: 88 },
  "Adventure of a Lifetime":        { vibe: "dance",     energy: 80 },
  "Hold My Girl":                   { vibe: "mellow",    energy: 40 },
  "Will We Talk?":                  { vibe: "singalong", energy: 68 },
  "People Watching":                { vibe: "mellow",    energy: 42 },
  "Canter":                         { vibe: "singalong", energy: 65 },
  "Stick Season":                   { vibe: "mellow",    energy: 38 },
  "Flowers":                        { vibe: "dance",     energy: 80 },
  "Stargazing":                     { vibe: "mellow",    energy: 32 },
};

const DECADES = ["1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"];
const VIBES   = ["mellow", "singalong", "dance"];
const VIBE_LABELS = { mellow: "Mellow", singalong: "Sing-Along", dance: "Dance" };

// Site palette tokens
const IVORY = "#F5F1EA";
const COAL  = "#1d1d1b";
const GOLD  = "#bda05a";
const STONE = "#e5dfd6";
const MUTED = "#9a9585";

// Vibe accent colours used on song cards
const VIBE_ACCENT = {
  mellow:    MUTED,
  singalong: GOLD,
  dance:     "#7a5c1e",
};

function decadeOf(year) {
  return `${Math.floor(year / 10) * 10}s`;
}

// Stone → gold → deep amber gradient
function getColor(count, max) {
  if (count === 0) return STONE;
  const ratio = count / max;
  if (ratio < 0.5) {
    const t = ratio / 0.5;
    const r = Math.round(229 + t * (189 - 229));
    const g = Math.round(223 + t * (160 - 223));
    const b = Math.round(214 + t * (90  - 214));
    return `rgb(${r},${g},${b})`;
  }
  const t = (ratio - 0.5) / 0.5;
  const r = Math.round(189 + t * (122 - 189));
  const g = Math.round(160 + t * (92  - 160));
  const b = Math.round(90  + t * (30  - 90));
  return `rgb(${r},${g},${b})`;
}

function cellTextColor(count, max) {
  if (count === 0) return MUTED;
  return (count / max) >= 0.55 ? IVORY : COAL;
}

export default function SongHeatmap({ songs: rawSongs = [] }) {
  const songs = useMemo(
    () => rawSongs.map(s => ({ ...s, ...(VIBE_MAP[s.title] ?? { vibe: "singalong", energy: 60 }) })),
    [rawSongs]
  );

  const [tooltip, setTooltip]               = useState(null);
  const [selectedVibe, setSelectedVibe]     = useState(null);
  const [selectedDecade, setSelectedDecade] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSelectedVibe(null);
        setSelectedDecade(null);
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const grid = useMemo(() => {
    const map = {};
    DECADES.forEach(d => {
      map[d] = {};
      VIBES.forEach(v => { map[d][v] = []; });
    });
    songs.forEach(s => {
      const d = decadeOf(s.year);
      if (map[d]) map[d][s.vibe].push(s);
    });
    return map;
  }, [songs]);

  const maxCount = useMemo(() => {
    let m = 0;
    DECADES.forEach(d => VIBES.forEach(v => {
      m = Math.max(m, grid[d][v].length);
    }));
    return m;
  }, [grid]);

  const filteredSongs = useMemo(() => {
    return songs
      .filter(s => (!selectedVibe || s.vibe === selectedVibe) && (!selectedDecade || decadeOf(s.year) === selectedDecade))
      .sort((a, b) => a.year - b.year);
  }, [songs, selectedVibe, selectedDecade]);

  function handleCellClick(decade, vibe, songList) {
    if (songList.length === 0) return;
    if (selectedDecade === decade && selectedVibe === vibe) {
      setSelectedDecade(null);
      setSelectedVibe(null);
    } else {
      setSelectedDecade(decade);
      setSelectedVibe(vibe);
    }
  }

  return (
    <div ref={containerRef} style={{ color: COAL, fontFamily: "'Montserrat', system-ui, sans-serif" }}>

      {/* Subtitle */}
      <p style={{ margin: "0 0 28px", color: MUTED, fontSize: 13 }}>
        {songs.length} songs · click a cell or label to filter
      </p>

      {/* Heatmap */}
      <div style={{ maxWidth: 700, margin: "0 auto 40px" }}>

        {/* Column headers = vibes */}
        <div style={{ display: "grid", gridTemplateColumns: "72px repeat(3, 1fr)", gap: 6, marginBottom: 6 }}>
          <div />
          {VIBES.map(v => (
            <div
              key={v}
              onClick={() => setSelectedVibe(selectedVibe === v ? null : v)}
              style={{
                textAlign: "center", fontSize: 12, fontWeight: 600,
                color: selectedVibe === v ? GOLD : MUTED,
                letterSpacing: "0.05em", paddingBottom: 4,
                cursor: "pointer", transition: "color 0.2s",
              }}
            >
              {VIBE_LABELS[v]}
            </div>
          ))}
        </div>

        {/* Rows = decades */}
        {DECADES.map(decade => (
          <div key={decade} style={{ display: "grid", gridTemplateColumns: "72px repeat(3, 1fr)", gap: 6, marginBottom: 6 }}>
            <div
              onClick={() => setSelectedDecade(selectedDecade === decade ? null : decade)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "flex-end",
                paddingRight: 10, fontSize: 12, fontWeight: 600,
                color: selectedDecade === decade ? GOLD : MUTED,
                cursor: "pointer", transition: "color 0.2s",
              }}
            >
              {decade}
            </div>
            {VIBES.map(vibe => {
              const cellSongs = grid[decade][vibe];
              const count     = cellSongs.length;
              const isSelected = selectedDecade === decade && selectedVibe === vibe;
              const isFiltered = (selectedDecade && selectedDecade !== decade) || (selectedVibe && selectedVibe !== vibe);
              const bg = getColor(count, maxCount);
              return (
                <div
                  key={vibe}
                  onClick={() => handleCellClick(decade, vibe, cellSongs)}
                  onMouseEnter={() => count > 0 && setTooltip({ decade, vibe, songs: cellSongs })}
                  onMouseLeave={() => setTooltip(null)}
                  style={{
                    background:    bg,
                    borderRadius:  8,
                    padding:       "14px 8px",
                    textAlign:     "center",
                    cursor:        count > 0 ? "pointer" : "default",
                    opacity:       isFiltered ? 0.3 : 1,
                    outline:       isSelected ? `2px solid ${GOLD}` : "none",
                    outlineOffset: 2,
                    transition:    "opacity 0.25s, transform 0.15s",
                    transform:     isSelected ? "scale(1.04)" : "scale(1)",
                    boxShadow:     isSelected ? `0 2px 12px rgba(189,160,90,0.25)` : "none",
                  }}
                >
                  <div style={{ fontSize: 22, fontWeight: 700, color: cellTextColor(count, maxCount), lineHeight: 1 }}>
                    {count}
                  </div>
                  <div style={{ fontSize: 10, color: cellTextColor(count, maxCount), opacity: count === 0 ? 0.5 : 0.75, marginTop: 2 }}>
                    {count === 1 ? "song" : "songs"}
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {/* Legend */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 20, width: "fit-content", margin: "20px auto 0" }}>
          <span style={{ fontSize: 11, color: MUTED }}>Fewer</span>
          {[0, 0.2, 0.4, 0.6, 0.8, 1].map(r => (
            <div key={r} style={{
              width: 20, height: 16, borderRadius: 4,
              background: getColor(r, 1),
            }} />
          ))}
          <span style={{ fontSize: 11, color: MUTED }}>More</span>
        </div>
      </div>

      {/* Song list */}
      {(selectedVibe || selectedDecade) && (
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: 12, padding: "0 4px",
          }}>
            <div style={{ fontSize: 13, color: GOLD, fontWeight: 600 }}>
              {filteredSongs.length} song{filteredSongs.length !== 1 ? "s" : ""}
              {selectedDecade && ` · ${selectedDecade}`}
              {selectedVibe && ` · ${VIBE_LABELS[selectedVibe]}`}
            </div>
            <button
              onClick={() => { setSelectedVibe(null); setSelectedDecade(null); }}
              style={{
                background: "none",
                border: `1px solid rgba(29,29,27,0.2)`,
                color: MUTED,
                borderRadius: 6,
                padding: "4px 12px",
                cursor: "pointer",
                fontSize: 12,
                fontFamily: "inherit",
              }}
            >
              Clear
            </button>
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            {filteredSongs.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  background: "#fff",
                  borderRadius: 8,
                  padding: "10px 14px",
                  border: "1px solid rgba(29,29,27,0.08)",
                  borderLeft: `3px solid ${VIBE_ACCENT[s.vibe] ?? GOLD}`,
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: COAL }}>{s.title}</div>
                  <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>{s.artist}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                  <div style={{ fontSize: 13, color: GOLD, fontWeight: 600 }}>{s.year}</div>
                  <div style={{ fontSize: 10, marginTop: 2, color: VIBE_ACCENT[s.vibe] ?? MUTED }}>
                    {VIBE_LABELS[s.vibe]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
