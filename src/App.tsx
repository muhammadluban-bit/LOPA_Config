import { useState, useEffect, useRef } from "react";

// Define the type for the coordinates
interface Coordinates {
  colStart: number;
  colEnd: number;
  rowStart: number;
  rowEnd: number;
}

// 1. FIXED: Converted to a proper object and moved OUTSIDE the component 
// so it doesn't trigger re-renders or waste memory.
const RECTANGLE_COORDS: Coordinates = {
  colStart: 11,
  colEnd: 1091,
  rowStart: 21,
  rowEnd: 171,
};

export default function App() {
  const [zoom, setZoom] = useState<number>(1);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const mobileCheck = window.innerWidth <= 768;
      setIsMobile(mobileCheck);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setZoom(isMobile ? 0.8 : 1);
  }, [isMobile]);

  const zoomIn = () => setZoom(z => Math.min(z * 1.2, 5));
  const zoomOut = () => setZoom(z => Math.max(z / 1.2, 0.05));
  
  const handleReset = () => {
    setZoom(isMobile ? 0.8 : 1);
    if (wrapperRef.current) {
      wrapperRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  };

  // 2. Dynamic grid tracks using the static constant
  const dynamicRectangleStyle = {
    gridColumn: isMobile 
      ? `${RECTANGLE_COORDS.rowStart} / ${RECTANGLE_COORDS.rowEnd}` 
      : `${RECTANGLE_COORDS.colStart} / ${RECTANGLE_COORDS.colEnd}`,
      
    gridRow: isMobile 
      ? `${RECTANGLE_COORDS.colStart} / ${RECTANGLE_COORDS.colEnd}` 
      : `${RECTANGLE_COORDS.rowStart} / ${RECTANGLE_COORDS.rowEnd}`,
  };

  return (
    <div className="app">
      <header className="navbar">
        <h1>Navigation Bar Placeholder</h1>
      </header>
  
      <div className="controls">
        <button onClick={zoomIn}>+</button>
        <button onClick={zoomOut}>-</button>
        <button onClick={handleReset}>Reset</button>
      </div>
  
      <main className="canvas-section">
        <div className="canvas-wrapper" ref={wrapperRef}>
          <div
            className={`canvas ${isMobile ? "canvas-mobile" : ""}`}
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top left", 
            }}
          >
            <div className="rectangle" style={dynamicRectangleStyle} />
          </div>
        </div>
      </main>
  
      <footer className="configurator">
        <h2>Configurator Placeholder</h2>
        <p>Future controls, properties and settings will go here.</p>
        
        <div style={{ marginTop: '10px', fontSize: '12px' }}>
          <strong>Static Coords:</strong> Columns ({RECTANGLE_COORDS.colStart}-{RECTANGLE_COORDS.colEnd}) | Rows ({RECTANGLE_COORDS.rowStart}-{RECTANGLE_COORDS.rowEnd})
        </div>
      </footer>
    </div>
  ); 
}
