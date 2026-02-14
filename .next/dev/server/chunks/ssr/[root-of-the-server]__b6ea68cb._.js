module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/weather--app-2/app/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/weather--app-2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/weather--app-2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function App() {
    const [city, setCity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [weather, setWeather] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [forecast, setForecast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [showHistory, setShowHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [localTime, setLocalTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const saved = localStorage.getItem("weatherHistory");
        setHistory(saved ? JSON.parse(saved) : []);
        getWeather(DEFAULT_CITY, true);
        const handleClickOutside = (event)=>{
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowHistory(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return ()=>document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!weather) return;
        const timer = setInterval(()=>{
            setLocalTime(getLocalTime(weather.timezone));
        }, 1000);
        return ()=>clearInterval(timer);
    }, [
        weather
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        localStorage.setItem("weatherHistory", JSON.stringify(history));
    }, [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                href: "https://fonts.googleapis.com/icon?family=Material+Icons",
                rel: "stylesheet"
            }, void 0, false, {
                fileName: "[project]/weather--app-2/app/page.js",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
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
            weather && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: 15,
                                    alignItems: 'center',
                                    flexWrap: 'wrap'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MainWeatherIcon, {
                                        iconType: weather.weather[0].main
                                    }, void 0, false, {
                                        fileName: "[project]/weather--app-2/app/page.js",
                                        lineNumber: 140,
                                        columnNumber: 16
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "search-container",
                        ref: dropdownRef,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "search-wrapper",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                    city && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            showHistory && filteredHistory.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                children: filteredHistory.map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            formatText(weather.name) !== formatText(DEFAULT_CITY) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "back-btn",
                                onClick: ()=>{
                                    setError("");
                                    getWeather(DEFAULT_CITY, true);
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "forecast-container",
                        style: {
                            display: 'flex',
                            gap: 6
                        },
                        children: forecast.map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass",
                                style: {
                                    flex: 1,
                                    padding: '12px 2px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: `https://openweathermap.org/img/wn/${f.weather[0].icon}.png`,
                                        alt: "",
                                        width: "38"
                                    }, void 0, false, {
                                        fileName: "[project]/weather--app-2/app/page.js",
                                        lineNumber: 185,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "detail-grid",
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '10px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailTile, {
                                label: "ΑΙΣΘΗΤΗ",
                                val: `${Math.round(weather.main.feels_like)}°`,
                                icon: "thermostat",
                                col: "#FFD700"
                            }, void 0, false, {
                                fileName: "[project]/weather--app-2/app/page.js",
                                lineNumber: 192,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailTile, {
                                label: "ΥΓΡΑΣΙΑ",
                                val: `${weather.main.humidity}%`,
                                icon: "water_drop",
                                col: "#4dabf7"
                            }, void 0, false, {
                                fileName: "[project]/weather--app-2/app/page.js",
                                lineNumber: 193,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailTile, {
                                label: "ΑΝΕΜΟΣ",
                                val: `${Math.round(weather.wind.speed)}m/s`,
                                icon: "air",
                                col: "#69db7c"
                            }, void 0, false, {
                                fileName: "[project]/weather--app-2/app/page.js",
                                lineNumber: 194,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailTile, {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailTile, {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailTile, {
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
function MainWeatherIcon({ iconType }) {
    const [isReady, setIsReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        document.fonts.ready.then(()=>setIsReady(true));
    }, []);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
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
function DetailTile({ label, val, icon, col }) {
    const [isReady, setIsReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        document.fonts.ready.then(()=>setIsReady(true));
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass",
        style: {
            padding: '15px 2px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d2d$app$2d$2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
const __TURBOPACK__default__export__ = App;
}),
"[project]/weather--app-2/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/weather--app-2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/weather--app-2/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/weather--app-2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/weather--app-2/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b6ea68cb._.js.map