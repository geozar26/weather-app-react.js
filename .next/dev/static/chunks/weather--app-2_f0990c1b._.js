(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/weather--app-2/app/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/weather--app-2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/weather--app-2/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
function App() {
    _s();
    const [city, setCity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [weather, setWeather] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [forecast, setForecast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [showHistory, setShowHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [localTime, setLocalTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const API_KEY = "8e870e1f59cadca07199db1d225e0dec";
    const DEFAULT_CITY = "Πάτρα";
    const formatText = (text)=>{
        if (!text) return "";
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    };
    const getLocalTime = (offset)=>{
        const d = new Date();
        const utc = d.getTime() + d.getTimezoneOffset() * 60000;
        const nd = new Date(utc + 1000 * offset);
        return {
            date: formatText(nd.toLocaleDateString('el-GR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
            })),
            time: nd.toLocaleTimeString('el-GR', {
                hour: '2-digit',
                minute: '2-digit'
            })
        };
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "App.useEffect": ()=>{
            const saved = localStorage.getItem("weatherHistory");
            setHistory(saved ? JSON.parse(saved) : []);
            getWeather(DEFAULT_CITY, true);
            const handleClickOutside = {
                "App.useEffect.handleClickOutside": (event)=>{
                    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                        setShowHistory(false);
                    }
                }
            }["App.useEffect.handleClickOutside"];
            document.addEventListener("mousedown", handleClickOutside);
            return ({
                "App.useEffect": ()=>document.removeEventListener("mousedown", handleClickOutside)
            })["App.useEffect"];
        }
    }["App.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "App.useEffect": ()=>{
            if (!weather) return;
            const timer = setInterval({
                "App.useEffect.timer": ()=>{
                    setLocalTime(getLocalTime(weather.timezone));
                }
            }["App.useEffect.timer"], 1000);
            return ({
                "App.useEffect": ()=>clearInterval(timer)
            })["App.useEffect"];
        }
    }["App.useEffect"], [
        weather
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "App.useEffect": ()=>{
            localStorage.setItem("weatherHistory", JSON.stringify(history));
        }
    }["App.useEffect"], [
        history
    ]);
    const getWeather = async (cityName, isInitial = false)=>{
        if (!cityName) return;
        setError("");
        setShowHistory(false);
        const searchName = cityName.trim();
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(searchName)}&appid=${API_KEY}&units=metric&lang=el`);
            const fRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(searchName)}&appid=${API_KEY}&units=metric&lang=el`);
            if (!res.ok || !fRes.ok) {
                setError("Η ΠΕΡΙΟΧΗ ΔΕΝ ΒΡΕΘΗΚΕ");
                return;
            }
            const data = await res.json();
            const fData = await fRes.json();
            setWeather(data);
            setLocalTime(getLocalTime(data.timezone));
            setForecast(fData.list.filter((item)=>item.dt_txt.includes("12:00:00")).slice(0, 5));
            if (!isInitial) {
                setHistory((prev)=>[
                        searchName,
                        ...prev.filter((c)=>c.toLowerCase() !== searchName.toLowerCase())
                    ].slice(0, 10));
            }
            setCity("");
        } catch (err) {
            setError("ΠΡΟΒΛΗΜΑ ΣΥΝΔΕΣΗΣ");
        }
    };
    const filteredHistory = city ? history.filter((h)=>h.toLowerCase().startsWith(city.toLowerCase())) : history;
    const getBg = (main)=>{
        switch(main){
            case 'Clear':
                return 'linear-gradient(to bottom, #f39c12, #d35400)';
            case 'Clouds':
                return 'linear-gradient(to bottom, #757f9a, #2c3e50)';
            case 'Rain':
            case 'Drizzle':
                return 'linear-gradient(to bottom, #4b6cb7, #182848)';
            case 'Thunderstorm':
                return 'linear-gradient(to bottom, #4834d4, #130f40)';
            case 'Snow':
                return 'linear-gradient(to bottom, #a1c4fd, #c2e9fb)';
            case 'Mist':
            case 'Smoke':
            case 'Haze':
            case 'Fog':
                return 'linear-gradient(to bottom, #bdc3c7, #2c3e50)';
            default:
                return 'linear-gradient(to bottom, #4c5c74, #2c3e50)';
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            background: weather ? getBg(weather.weather[0].main) : '#2c3e50',
            transition: 'background 0.8s ease',
            position: 'relative'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                href: "https://fonts.googleapis.com/icon?family=Material+Icons",
                rel: "stylesheet"
            }, void 0, false, {
                fileName: "[project]/weather--app-2/app/page.js",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        * { box-sizing: border-box; font-family: 'Segoe UI', sans-serif; margin: 0; padding: 0; }
        .glass { background: rgba(255, 255, 255, 0.15) !important; backdrop-filter: blur(12px); border-radius: 22px; border: 1px solid rgba(255, 255, 255, 0.25); box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .search-container { position: relative; width: 100%; max-width: 380px; z-index: 2000; margin: 0 auto; }
        .search-wrapper { background: white; border-radius: 50px; padding: 4px; display: flex; align-items: center; width: 100%; box-shadow: 0 10px 30px rgba(0,0,0,0.25); height: 48px; }
        .search-input { flex: 1; border: none; outline: none; padding: 0 12px; color: #333; font-weight: 700; background: transparent; min-width: 0; font-size: 0.9rem; }
        .search-btn { background: black; color: white; border: none; height: 40px; padding: 0 18px; border-radius: 50px; font-weight: 900; cursor: pointer; font-size: 0.65rem; transition: transform 0.2s ease; flex-shrink: 0; }
        .search-btn:hover { transform: scale(1.05); }
        .close-icon-btn { color: #666 !important; cursor: pointer; transition: all 0.2s ease; margin-right: 5px; font-size: 20px !important; display: flex !important; align-items: center; }
        .close-icon-btn:hover { transform: scale(1.2); color: #000 !important; }
        .back-btn { background: rgba(0,0,0,0.6); color: white; border: 1px solid rgba(255,255,255,0.4); padding: 10px 22px; border-radius: 50px; font-size: 0.75rem; font-weight: 900; cursor: pointer; margin-top: 15px; display: inline-flex; align-items: center; gap: 8px; transition: all 0.3s ease; }
        .back-btn:hover { background: white; color: black; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.3); }

        .tile-icon { visibility: hidden; }
        .tile-icon.ready { visibility: visible !important; }

        @media (max-width: 400px) { .detail-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `
            }, void 0, false, {
                fileName: "[project]/weather--app-2/app/page.js",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            weather && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: 'center',
                    width: '100%',
                    maxWidth: '450px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    padding: '20px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontWeight: 900,
                                    fontSize: '0.9rem',
                                    marginBottom: 5,
                                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                },
                                children: [
                                    localTime.date,
                                    " ",
                                    localTime.time
                                ]
                            }, void 0, true, {
                                fileName: "[project]/weather--app-2/app/page.js",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: 15,
                                    alignItems: 'center',
                                    flexWrap: 'wrap'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '4.5rem',
                                            fontWeight: 900,
                                            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                                        },
                                        children: [
                                            Math.round(weather.main.temp),
                                            "°"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/weather--app-2/app/page.js",
                                        lineNumber: 135,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '2.2rem',
                                            fontWeight: 950,
                                            textShadow: '0 2px 5px rgba(0,0,0,0.2)'
                                        },
                                        children: formatText(weather.name)
                                    }, void 0, false, {
                                        fileName: "[project]/weather--app-2/app/page.js",
                                        lineNumber: 136,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/weather--app-2/app/page.js",
                                lineNumber: 134,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MainWeatherIcon, {
                                        iconType: weather.weather[0].main
                                    }, void 0, false, {
                                        fileName: "[project]/weather--app-2/app/page.js",
                                        lineNumber: 140,
                                        columnNumber: 16
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '1.2rem',
                                            fontWeight: 900,
                                            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                        },
                                        children: formatText(weather.weather[0].description)
                                    }, void 0, false, {
                                        fileName: "[project]/weather--app-2/app/page.js",
                                        lineNumber: 141,
                                        columnNumber: 16
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/weather--app-2/app/page.js",
                                lineNumber: 139,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/weather--app-2/app/page.js",
                        lineNumber: 130,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "search-container",
                        ref: dropdownRef,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "search-wrapper",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "search-input",
                                        placeholder: "ΑΝΑΖΗΤΗΣΗ...",
                                        value: city,
                                        onFocus: ()=>setShowHistory(true),
                                        onChange: (e)=>{
                                            const val = e.target.value;
                                            setCity(val);
                                            if (val === "") setError(""); // Εξαφανίζεται ΜΟΝΟ όταν σβηστούν όλα
                                        },
                                        onKeyDown: (e)=>e.key === "Enter" && getWeather(city)
                                    }, void 0, false, {
                                        fileName: "[project]/weather--app-2/app/page.js",
                                        lineNumber: 147,
                                        columnNumber: 15
                                    }, this),
                                    city && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-icons close-icon-btn",
                                        onClick: ()=>{
                                            setCity("");
                                            setError("");
                                        },
                                        children: "close"
                                    }, void 0, false, {
                                        fileName: "[project]/weather--app-2/app/page.js",
                                        lineNumber: 159,
                                        columnNumber: 24
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "search-btn",
                                        onClick: ()=>getWeather(city),
                                        children: "ΑΝΑΖΗΤΗΣΗ"
                                    }, void 0, false, {
                                        fileName: "[project]/weather--app-2/app/page.js",
                                        lineNumber: 160,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/weather--app-2/app/page.js",
                                lineNumber: 146,
                                columnNumber: 13
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    color: '#FF8C00',
                                    fontWeight: '900',
                                    fontSize: '0.85rem',
                                    marginTop: '10px',
                                    textShadow: '0 1px 3px rgba(0,0,0,0.3)'
                                },
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/weather--app-2/app/page.js",
                                lineNumber: 163,
                                columnNumber: 23
                            }, this),
                            showHistory && filteredHistory.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "history-dropdown",
                                style: {
                                    position: 'absolute',
                                    top: '110%',
                                    left: 0,
                                    right: 0,
                                    background: 'white',
                                    borderRadius: '20px',
                                    zIndex: 3000,
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                                },
                                children: filteredHistory.map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "history-item",
                                        onClick: ()=>getWeather(h),
                                        style: {
                                            padding: '12px 18px',
                                            color: '#333',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            fontWeight: 800,
                                            borderBottom: '1px solid #eee'
                                        },
                                        children: [
                                            h,
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-icons close-icon-btn",
                                                style: {
                                                    fontSize: '18px'
                                                },
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    setHistory((prev)=>prev.filter((c)=>c !== h));
                                                },
                                                children: "close"
                                            }, void 0, false, {
                                                fileName: "[project]/weather--app-2/app/page.js",
                                                lineNumber: 169,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/weather--app-2/app/page.js",
                                        lineNumber: 168,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/weather--app-2/app/page.js",
                                lineNumber: 166,
                                columnNumber: 15
                            }, this),
                            formatText(weather.name) !== formatText(DEFAULT_CITY) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "back-btn",
                                onClick: ()=>{
                                    setError("");
                                    getWeather(DEFAULT_CITY, true);
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontWeight: 900
                                        },
                                        children: "←"
                                    }, void 0, false, {
                                        fileName: "[project]/weather--app-2/app/page.js",
                                        lineNumber: 176,
                                        columnNumber: 17
                                    }, this),
                                    " ΕΠΙΣΤΡΟΦΗ"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/weather--app-2/app/page.js",
                                lineNumber: 175,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/weather--app-2/app/page.js",
                        lineNumber: 145,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "forecast-container",
                        style: {
                            display: 'flex',
                            gap: 6
                        },
                        children: forecast.map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass",
                                style: {
                                    flex: 1,
                                    padding: '12px 2px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '0.75rem',
                                            fontWeight: 950
                                        },
                                        children: formatText(new Date(f.dt_txt).toLocaleDateString('el-GR', {
                                            weekday: 'short'
                                        }))
                                    }, void 0, false, {
                                        fileName: "[project]/weather--app-2/app/page.js",
                                        lineNumber: 184,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: `https://openweathermap.org/img/wn/${f.weather[0].icon}.png`,
                                        alt: "",
                                        width: "38"
                                    }, void 0, false, {
                                        fileName: "[project]/weather--app-2/app/page.js",
                                        lineNumber: 185,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontWeight: 950,
                                            fontSize: '1rem'
                                        },
                                        children: [
                                            Math.round(f.main.temp),
                                            "°"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/weather--app-2/app/page.js",
                                        lineNumber: 186,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/weather--app-2/app/page.js",
                                lineNumber: 183,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/weather--app-2/app/page.js",
                        lineNumber: 181,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "detail-grid",
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '10px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailTile, {
                                label: "ΑΙΣΘΗΤΗ",
                                val: `${Math.round(weather.main.feels_like)}°`,
                                icon: "thermostat",
                                col: "#FFD700"
                            }, void 0, false, {
                                fileName: "[project]/weather--app-2/app/page.js",
                                lineNumber: 192,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailTile, {
                                label: "ΥΓΡΑΣΙΑ",
                                val: `${weather.main.humidity}%`,
                                icon: "water_drop",
                                col: "#4dabf7"
                            }, void 0, false, {
                                fileName: "[project]/weather--app-2/app/page.js",
                                lineNumber: 193,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailTile, {
                                label: "ΑΝΕΜΟΣ",
                                val: `${Math.round(weather.wind.speed)}m/s`,
                                icon: "air",
                                col: "#69db7c"
                            }, void 0, false, {
                                fileName: "[project]/weather--app-2/app/page.js",
                                lineNumber: 194,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailTile, {
                                label: "ΑΝΑΤΟΛΗ",
                                val: new Date((weather.sys.sunrise + weather.timezone - 7200) * 1000).toLocaleTimeString('el-GR', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }),
                                icon: "wb_sunny",
                                col: "#ffd43b"
                            }, void 0, false, {
                                fileName: "[project]/weather--app-2/app/page.js",
                                lineNumber: 195,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailTile, {
                                label: "ΔΥΣΗ",
                                val: new Date((weather.sys.sunset + weather.timezone - 7200) * 1000).toLocaleTimeString('el-GR', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }),
                                icon: "wb_twilight",
                                col: "#FF3D00"
                            }, void 0, false, {
                                fileName: "[project]/weather--app-2/app/page.js",
                                lineNumber: 196,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailTile, {
                                label: "ΑΤΜ ΠΙΕΣΗ",
                                val: `${weather.main.pressure} hPa`,
                                icon: "speed",
                                col: "#00D4FF"
                            }, void 0, false, {
                                fileName: "[project]/weather--app-2/app/page.js",
                                lineNumber: 197,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/weather--app-2/app/page.js",
                        lineNumber: 191,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/weather--app-2/app/page.js",
                lineNumber: 129,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/weather--app-2/app/page.js",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_s(App, "Z0idc/+gvJx5mb8MjAxktnXsBTA=");
_c = App;
function MainWeatherIcon({ iconType }) {
    _s1();
    const [isReady, setIsReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MainWeatherIcon.useEffect": ()=>{
            document.fonts.ready.then({
                "MainWeatherIcon.useEffect": ()=>setIsReady(true)
            }["MainWeatherIcon.useEffect"]);
        }
    }["MainWeatherIcon.useEffect"], []);
    const getIconName = (type)=>{
        switch(type){
            case 'Clear':
                return 'wb_sunny';
            case 'Clouds':
                return 'cloud';
            case 'Rain':
                return 'umbrella';
            default:
                return 'filter_drama';
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
        className: `material-icons tile-icon ${isReady ? 'ready' : ''}`,
        style: {
            fontSize: '32px',
            color: iconType === 'Clear' ? '#ffd43b' : '#fff'
        },
        children: getIconName(iconType)
    }, void 0, false, {
        fileName: "[project]/weather--app-2/app/page.js",
        lineNumber: 217,
        columnNumber: 5
    }, this);
}
_s1(MainWeatherIcon, "5KP9N2szXKqzhBqfXaLUZqdM1dk=");
_c1 = MainWeatherIcon;
function DetailTile({ label, val, icon, col }) {
    _s2();
    const [isReady, setIsReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DetailTile.useEffect": ()=>{
            document.fonts.ready.then({
                "DetailTile.useEffect": ()=>setIsReady(true)
            }["DetailTile.useEffect"]);
        }
    }["DetailTile.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass",
        style: {
            padding: '15px 2px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                className: `material-icons tile-icon ${isReady ? 'ready' : ''}`,
                style: {
                    color: col,
                    fontSize: '24px',
                    marginBottom: '5px'
                },
                children: icon
            }, void 0, false, {
                fileName: "[project]/weather--app-2/app/page.js",
                lineNumber: 228,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: '0.65rem',
                    fontWeight: 950,
                    color: 'white',
                    marginBottom: '2px'
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/weather--app-2/app/page.js",
                lineNumber: 229,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: '1.05rem',
                    fontWeight: 950
                },
                children: val
            }, void 0, false, {
                fileName: "[project]/weather--app-2/app/page.js",
                lineNumber: 230,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/weather--app-2/app/page.js",
        lineNumber: 227,
        columnNumber: 5
    }, this);
}
_s2(DetailTile, "5KP9N2szXKqzhBqfXaLUZqdM1dk=");
_c2 = DetailTile;
const __TURBOPACK__default__export__ = App;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "App");
__turbopack_context__.k.register(_c1, "MainWeatherIcon");
__turbopack_context__.k.register(_c2, "DetailTile");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/weather--app-2/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/weather--app-2/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/weather--app-2/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/weather--app-2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/weather--app-2/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/weather--app-2/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=weather--app-2_f0990c1b._.js.map