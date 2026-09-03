"use client";

import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { useRef, useEffect, useState } from "react";
import {
motion,
useMotionValue,
useSpring,
useTransform,
useReducedMotion,
} from "framer-motion";

/**
 * ---------------------------------------------------------------------
 * three.js is loaded at RUNTIME from a CDN (jsDelivr) rather than
 * `import("three")`. This is deliberate: a static/dynamic import of the
 * "three" package gets resolved by webpack at BUILD time, so if the
 * package isn't installed the whole app fails to compile. Loading the
 * UMD build via a <script> tag sidesteps that entirely — nothing to
 * `npm install`, nothing for the bundler to resolve. window.THREE is
 * populated once the script loads, and is reused on future mounts.
 * ---------------------------------------------------------------------
 */
const THREE_CDN_URL = "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js";
let threeLoadPromise = null;

function loadThree() {
if (typeof window === "undefined") return Promise.reject(new Error("no window"));
if (window.THREE) return Promise.resolve(window.THREE);
if (threeLoadPromise) return threeLoadPromise;

threeLoadPromise = new Promise((resolve, reject) => {
const existing = document.querySelector(`script[src="${THREE_CDN_URL}"]`);
if (existing) {
existing.addEventListener("load", () => resolve(window.THREE));
existing.addEventListener("error", reject);
return;
}
const script = document.createElement("script");
script.src = THREE_CDN_URL;
script.async = true;
script.onload = () => resolve(window.THREE);
script.onerror = reject;
document.head.appendChild(script);
});

return threeLoadPromise;
}

/**
 * GarmentScene3D
 * ----------------------------------------------------------------------
 * Three menswear objects — a flat-lay dress shirt, a blazer, a necktie —
 * floating over the left/text panel. Upgraded from the previous version:
 * each piece now sits on a slim glowing "display pedestal" ring and uses
 * MeshPhysicalMaterial with a clearcoat pass, so fabric reads with a
 * subtle premium sheen instead of flat matte color. Still no textures,
 * still fully disposed on unmount, still skipped under prefers-reduced-motion.
 */
function GarmentScene3D({ className = "" }) {
const mountRef = useRef(null);
const reduceMotion = useReducedMotion();
const [failed, setFailed] = useState(false);

useEffect(() => {
if (reduceMotion) return;
let renderer, scene, camera, frameId, resizeObserver;
let disposed = false;

loadThree()
  .then((THREE) => {
    if (disposed || !mountRef.current || !THREE) {
      if (!THREE) setFailed(true);
      return;
    }

    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 9.5);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ---- lighting: cool key + rust rim + soft fill, tuned for the clearcoat pass ----
    const key = new THREE.DirectionalLight(0xffffff, 2.5);
    key.position.set(4, 5, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xb5502c, 1.6); // rust
    rim.position.set(-5, -2, -3);
    scene.add(rim);
    const fill = new THREE.PointLight(0xffffff, 0.7);
    fill.position.set(0, -3, 4);
    scene.add(fill);
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    const objects = new THREE.Group();
    scene.add(objects);

    const paperMat = new THREE.MeshPhysicalMaterial({
      color: 0xf4f1ea,
      roughness: 0.55,
      metalness: 0.04,
      clearcoat: 0.5,
      clearcoatRoughness: 0.3,
      side: THREE.DoubleSide,
    });
    const inkMat = new THREE.MeshPhysicalMaterial({
      color: 0x1c1a17,
      roughness: 0.35,
      metalness: 0.15,
      clearcoat: 0.7,
      clearcoatRoughness: 0.2,
      side: THREE.DoubleSide,
    });
    const rustMat = new THREE.MeshPhysicalMaterial({
      color: 0xb5502c,
      roughness: 0.4,
      metalness: 0.1,
      clearcoat: 0.6,
      clearcoatRoughness: 0.25,
      side: THREE.DoubleSide,
    });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdcd8cd, metalness: 0.9, roughness: 0.2 });
    const pedestalMat = new THREE.MeshBasicMaterial({ color: 0xb5502c, transparent: true, opacity: 0.55 });

    const extrudeSettings = { depth: 0.05, bevelEnabled: true, bevelSize: 0.015, bevelThickness: 0.015, bevelSegments: 3 };

    function addPedestal(radius, parentPos) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.012, 8, 48), pedestalMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(parentPos.x, parentPos.y - radius * 1.35, parentPos.z - 0.1);
      objects.add(ring);
      return ring;
    }

    /* ---------------- flat-lay dress shirt, with 4 small buttons ---------------- */
    const shirtShape = new THREE.Shape();
    shirtShape.moveTo(-0.15, 1.0);
    shirtShape.lineTo(0, 1.15);
    shirtShape.lineTo(0.15, 1.0);
    shirtShape.lineTo(0.5, 0.95);
    shirtShape.lineTo(0.95, 0.55);
    shirtShape.lineTo(0.55, 0.35);
    shirtShape.lineTo(0.45, -1.0);
    shirtShape.lineTo(-0.45, -1.0);
    shirtShape.lineTo(-0.55, 0.35);
    shirtShape.lineTo(-0.95, 0.55);
    shirtShape.lineTo(-0.5, 0.95);
    shirtShape.lineTo(-0.15, 1.0);
    const shirtGeo = new THREE.ExtrudeGeometry(shirtShape, extrudeSettings);
    const shirt = new THREE.Group();
    const shirtMesh = new THREE.Mesh(shirtGeo, paperMat);
    shirt.add(shirtMesh);
    const buttonGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.03, 16);
    [0.7, 0.35, 0, -0.35].forEach((by) => {
      const btn = new THREE.Mesh(buttonGeo, chromeMat);
      btn.rotation.x = Math.PI / 2;
      btn.position.set(0, by, 0.07);
      shirt.add(btn);
    });
    shirt.scale.setScalar(0.85);
    shirt.position.set(-1.9, 1.15, -0.4);
    shirt.rotation.z = 0.12;
    objects.add(shirt);
    const shirtPedestal = addPedestal(0.55, shirt.position);

    /* ---------------- blazer ---------------- */
    const blazerShape = new THREE.Shape();
    blazerShape.moveTo(-0.5, 1.0);
    blazerShape.lineTo(-0.15, 1.15);
    blazerShape.lineTo(0, 0.95);
    blazerShape.lineTo(0.15, 1.15);
    blazerShape.lineTo(0.5, 1.0);
    blazerShape.lineTo(0.9, 0.6);
    blazerShape.lineTo(0.55, 0.4);
    blazerShape.lineTo(0.4, -1.1);
    blazerShape.lineTo(-0.4, -1.1);
    blazerShape.lineTo(-0.55, 0.4);
    blazerShape.lineTo(-0.9, 0.6);
    blazerShape.lineTo(-0.5, 1.0);
    const blazerGeo = new THREE.ExtrudeGeometry(blazerShape, extrudeSettings);
    const blazer = new THREE.Mesh(blazerGeo, inkMat);
    blazer.scale.setScalar(0.78);
    blazer.position.set(2.0, -1.0, -0.5);
    blazer.rotation.z = -0.1;
    objects.add(blazer);
    const blazerPedestal = addPedestal(0.5, blazer.position);

    /* ---------------- necktie ---------------- */
    const tieShape = new THREE.Shape();
    tieShape.moveTo(-0.1, 1.1);
    tieShape.lineTo(0.1, 1.1);
    tieShape.lineTo(0.18, 0.5);
    tieShape.quadraticCurveTo(0.32, 0.1, 0.24, -0.7);
    tieShape.lineTo(0, -1.05);
    tieShape.lineTo(-0.24, -0.7);
    tieShape.quadraticCurveTo(-0.32, 0.1, -0.18, 0.5);
    tieShape.lineTo(-0.1, 1.1);
    const tieGeo = new THREE.ExtrudeGeometry(tieShape, extrudeSettings);
    const tie = new THREE.Mesh(tieGeo, rustMat);
    tie.scale.setScalar(0.75);
    tie.position.set(0.1, -1.65, 0.3);
    tie.rotation.z = 0.05;
    objects.add(tie);
    const tiePedestal = addPedestal(0.4, tie.position);

    // ---- interaction: gentle drift + cursor parallax ----
    const pointer = { x: 0, y: 0 };
    const onPointerMove = (e) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove);

    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();

      shirt.rotation.y = Math.sin(t * 0.4) * 0.3;
      shirt.position.y = 1.15 + Math.sin(t * 0.65) * 0.09;
      shirtPedestal.rotation.z = t * 0.3;

      blazer.rotation.y = Math.sin(t * 0.45 + 1) * 0.3;
      blazer.position.y = -1.0 + Math.sin(t * 0.7 + 1) * 0.09;
      blazerPedestal.rotation.z = t * -0.25;

      tie.rotation.y = Math.sin(t * 0.5 + 2) * 0.35;
      tie.position.y = -1.65 + Math.sin(t * 0.6 + 2) * 0.08;
      tiePedestal.rotation.z = t * 0.35;

      objects.rotation.y += (pointer.x * 0.2 - objects.rotation.y) * 0.04;
      objects.rotation.x += (-pointer.y * 0.12 - objects.rotation.x) * 0.04;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    resizeObserver = new ResizeObserver(() => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(mount);

    mountRef.current.__cleanup = () => {
      window.removeEventListener("pointermove", onPointerMove);
      resizeObserver?.disconnect();
      cancelAnimationFrame(frameId);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  })
  .catch(() => setFailed(true));

return () => {
  disposed = true;
  mountRef.current?.__cleanup?.();
};

}, [reduceMotion]);

if (failed) return null;

return (
<div
ref={mountRef}
aria-hidden="true"
className={`pointer-events-none absolute inset-0 z-0 ${className}`}
/>
);
}

/* ---------- hero ---------- */

export default function Hero() {
const reduceMotion = useReducedMotion();
const stageRef = useRef(null);

const mvX = useMotionValue(0);
const mvY = useMotionValue(0);
const springX = useSpring(mvX, { stiffness: 120, damping: 18, mass: 0.4 });
const springY = useSpring(mvY, { stiffness: 120, damping: 18, mass: 0.4 });

const rotateX = useTransform(springY, [-0.5, 0.5], [7, -7]);
const rotateY = useTransform(springX, [-0.5, 0.5], [-9, 9]);
const headlineX = useTransform(springX, [-0.5, 0.5], [6, -6]);

function handlePointerMove(e) {
if (reduceMotion) return;
const el = stageRef.current;
if (!el) return;
const rect = el.getBoundingClientRect();
mvX.set((e.clientX - rect.left) / rect.width - 0.5);
mvY.set((e.clientY - rect.top) / rect.height - 0.5);
}

function handlePointerLeave() {
mvX.set(0);
mvY.set(0);
}

const sequence = {
hidden: {},
show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const rise = {
hidden: { opacity: 0, y: 16 },
show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

return (
<section
className="relative overflow-hidden bg-paper border-b border-ink/15"
onPointerMove={handlePointerMove}
onPointerLeave={handlePointerLeave}
ref={stageRef}
aria-label="S & A Attire — Featured Collection"
>
{/* SEO: structured data for the featured product drop.
Ideally an Organization/WebSite JSON-LD block also lives once in
app/layout.js — this Product block belongs next to the content it describes. */}
<Script id="ld-product" type="application/ld+json" strategy="afterInteractive">
{JSON.stringify({
"@context": "https://schema.org",
"@type": "Product",
name: "The Check Shirt — Urban Check SS26",
brand: { "@type": "Brand", name: "S & A Attire" },
category: "Men's Shirts",
image: "https://www.saattire.com/images/bestduo.jpg",
description:
"Tailored men's check shirt from the S & A Attire SS26 Urban Check collection — built for the city, cut to move.",
offers: {
"@type": "AggregateOffer",
priceCurrency: "PKR",
availability: "https://schema.org/InStock",
url: "https://www.saattire.com/shop?category=Check%20Shirts",
},
})}
</Script>

  {/* Top bar */}
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 sm:px-8 lg:px-12 py-5 sm:py-6 border-b border-ink/15 font-mono text-[10px] sm:text-xs uppercase tracking-widest2 text-ink/70">
    <p className="max-w-[16rem] leading-relaxed">
      Fashion cut for the city that never sits still.
    </p>
    <p className="leading-relaxed sm:text-right">
      New Collection
      <br />
      2026
    </p>
  </div>

  {/* Main display */}
  <div className="relative" style={{ perspective: 1500 }}>
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] items-stretch gap-10 lg:gap-0"
      variants={sequence}
      initial="hidden"
      animate="show"
    >
      {/* Left — wordmark, carrying the 3D scene (shirt / blazer / tie) */}
      <motion.div
        className="relative flex flex-col justify-center items-center text-center px-6 sm:px-12 lg:px-16 py-16 sm:py-24 lg:py-0 overflow-hidden"
        style={{ x: reduceMotion ? 0 : headlineX }}
      >
        {/* real 3D shirt / blazer / necktie, rendered in WebGL, sits behind the text (z-0) */}
        <GarmentScene3D />

        <motion.p
          variants={rise}
          className="relative z-10 font-mono text-xs sm:text-sm uppercase tracking-widest2 text-rust mb-4 sm:mb-5"
        >
          Featured Drop — The Check Shirt
        </motion.p>

        <motion.h1
          variants={rise}
          className="relative z-10 font-display leading-[0.85] select-none text-[22vw] sm:text-[15vw] md:text-[12vw] lg:text-[7.5vw] xl:text-[6.5vw]"
        >
          S&nbsp;&amp;&nbsp;A
        </motion.h1>
        <span className="sr-only">S &amp; A Attire — Men's Tailored Clothing, Karachi</span>

        <motion.p
          variants={rise}
          className="relative z-10 mt-6 sm:mt-8 font-mono text-sm sm:text-base lg:text-lg uppercase tracking-widest2 text-ink/70 max-w-lg leading-relaxed"
        >
          Menswear for the modern city — tailored, essential, built to move.
        </motion.p>

        <motion.div
          variants={rise}
          className="relative z-10 mt-10 sm:mt-12 flex flex-wrap justify-center gap-4"
        >
          <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
            <Link
              href="/shop"
              className="block text-center bg-ink text-paper px-8 sm:px-10 py-4 sm:py-4.5 font-mono text-sm uppercase tracking-widest2 hover:bg-rust transition-colors focus-ring"
            >
              Shop Now
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
            <Link
              href="/shop?category=Check%20Shirts"
              className="block text-center border border-ink px-8 sm:px-10 py-4 sm:py-4.5 font-mono text-sm uppercase tracking-widest2 hover:border-rust hover:text-rust transition-colors focus-ring"
            >
              View The Shirt
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right — model photo showcase.
          FIX: `object-cover` was centering the crop, which cut the standing
          model's head off entirely. Biasing objectPosition toward the top
          and giving the frame a little more height keeps both faces in shot. */}
      <motion.div
        variants={rise}
        className="relative w-full h-[65vh] sm:h-[80vh] lg:h-auto lg:min-h-[720px]"
        style={{
          transformStyle: "preserve-3d",
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
        }}
      >
        <div className="absolute inset-0" style={{ transform: "translateZ(0px)" }}>
          <Image
            src="/images/bestduuu.jpg"
            alt="Two male models wearing S & A Attire tailored menswear, SS26 Urban Check collection, Karachi"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
            style={{ objectPosition: "center 12%" }}
          />
        </div>

        {/* Corner nameplate */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 bg-paper px-3 py-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest2 text-ink/70">
          S&nbsp;&amp;&nbsp;A Attire
        </div>

        {/* Hang tag */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 bg-ink text-paper px-3 py-2 shadow-lg">
          <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest2 leading-tight">
            Urban Check
            <br />
            SS26
          </p>
        </div>
      </motion.div>
    </motion.div>

    {/* Vertical location tag — also doubles as a local-SEO signal */}
    <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-4 xl:left-8 -rotate-90 origin-left">
      <p className="font-mono text-xs uppercase tracking-widest2 text-ink/60 whitespace-nowrap">
        Karachi, PK — Est. 2024
      </p>
    </div>
  </div>

  {/* Bottom bar */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-5 sm:gap-6 px-4 sm:px-8 lg:px-12 py-6 sm:py-7 border-t border-ink/15">
    <div className="flex flex-wrap justify-center gap-3 w-full sm:w-auto">
      <Link
        href="/shop"
        className="flex-1 sm:flex-none text-center bg-ink text-paper px-6 sm:px-8 py-3 sm:py-3.5 font-mono text-xs uppercase tracking-widest2 hover:bg-rust transition-colors focus-ring"
      >
        Shop Now
      </Link>
      <Link
        href="/shop"
        className="flex-1 sm:flex-none text-center border border-ink px-6 sm:px-8 py-3 sm:py-3.5 font-mono text-xs uppercase tracking-widest2 hover:border-rust hover:text-rust transition-colors focus-ring"
      >
        Explore New In
      </Link>
    </div>
    <p className="font-mono text-xs uppercase tracking-widest2 text-ink/70 text-center sm:text-right">
      New Collection
      <br />
      2026
    </p>
  </div>
</section>

);
}