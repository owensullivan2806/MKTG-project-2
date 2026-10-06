import { useEffect, useLayoutEffect, useState } from "react";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { initMotion, ScrollTrigger } from "./lib/scroll";
import { ShoeStage } from "./components/ShoeStage";

const SHOP =
  "https://shop.merch.google/product/google-checkered-shoelaces-white-ggoegcba186299";
const image = (name: string) => `${import.meta.env.BASE_URL}img/${name}`;
const Arrow = () => <span aria-hidden="true">↗</span>;
function ShopLink({
  children = "Shop the laces",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      className={`button ${className}`}
      href={SHOP}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <Arrow />
    </a>
  );
}
function ColorMark() {
  return (
    <span className="color-mark" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}
function Slot({ name, angle = 0 }: { name: string; angle?: number }) {
  return (
    <div
      className={`shoe-slot ${name}`}
      data-shoe-slot
      data-angle={angle}
      aria-hidden="true"
    />
  );
}
export default function App() {
  const reduced = useReducedMotion();
  const [menu, setMenu] = useState(false);
  useLayoutEffect(() => initMotion(reduced), [reduced]);
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header">
        <a className="brand" href="#top" aria-label="Lace your own way — home">
          <ColorMark />
          <span>
            Google <strong>checkered laces</strong>
          </span>
        </a>
        <button
          className="menu-toggle"
          aria-expanded={menu}
          aria-controls="navigation"
          onClick={() => setMenu(!menu)}
        >
          {menu ? "Close −" : "Menu +"}
        </button>
        <nav
          id="navigation"
          className={menu ? "nav open" : "nav"}
          aria-label="Main navigation"
        >
          <a href="#the-look" onClick={() => setMenu(false)}>
            The look
          </a>
          <a href="#details" onClick={() => setMenu(false)}>
            The details
          </a>
          <ShopLink className="nav-shop">Get your pair</ShopLink>
        </nav>
      </header>
      <main id="main">
        <div className="journey" id="top">
          <ShoeStage reduced={reduced} />
          <section className="hero scene" aria-labelledby="hero-title">
            <div className="hero-topline">
              <span>SMALL DETAIL. MAIN CHARACTER ENERGY.</span>
              <span className="edition">
                GOOGLE CHECKERED SHOELACES / WHITE
              </span>
            </div>
            <div className="hero-grid">
              <div className="hero-copy">
                <h1 id="hero-title">
                  LACE
                  <br />
                  YOUR
                  <br />
                  <span className="blue">OWN WAY.</span>
                </h1>
                <p className="hero-intro">
                  Your favorite kicks.
                  <br />A little more <em>you.</em>
                </p>
                <p className="hero-description">
                  Give your everyday sneakers a colorful refresh with Google
                  Checkered Shoelaces White.
                </p>
                <div className="hero-actions">
                  <ShopLink />
                  <span className="price-note">
                    <strong>$5.00</strong>
                    <span>One small style upgrade.</span>
                  </span>
                </div>
              </div>
              <div className="hero-visual">
                <div className="orbit" aria-hidden="true" />
                <Slot name="hero-slot" angle={-8} />
                <span className="sticker">
                  GOOD
                  <br />
                  VIBES.
                  <svg viewBox="0 0 60 24" aria-hidden="true">
                    <path d="M10 4 Q30 30 50 4" />
                  </svg>
                </span>
                <span className="image-caption">
                  THE LACES ARE THE STATEMENT.
                  <br />
                  THE SNEAKER IS YOUR CANVAS.
                </span>
              </div>
            </div>
            <div className="hero-bottom">
              <a href="#the-look">
                A little color goes a long way <span aria-hidden="true">↓</span>
              </a>
              <span>BLUE. RED. YELLOW. GREEN. YOU.</span>
            </div>
          </section>
          <div className="ticker" aria-hidden="true">
            <div>
              {Array.from({ length: 4 }, (_, i) => (
                <span key={i}>
                  SAME KICKS <b>✳</b> NEW ENERGY <b>✳</b> LACE YOUR OWN WAY{" "}
                  <b>✳</b>
                </span>
              ))}
            </div>
          </div>
          <section
            id="the-look"
            className="look scene"
            aria-labelledby="look-title"
          >
            <div className="section-topline">
              <span>01 / A LITTLE SWITCH-UP</span>
              <ColorMark />
            </div>
            <div className="look-grid">
              <div className="look-visual">
                <span className="outline-type" aria-hidden="true">
                  REMIX
                </span>
                <Slot name="look-slot" angle={12} />
                <span className="scribble" aria-hidden="true">
                  same shoes,
                  <br />
                  new mood. ↗
                </span>
              </div>
              <div className="look-copy">
                <span className="eyebrow">FOR THE EVERYDAY ORIGINAL</span>
                <h2 id="look-title">
                  Small change.
                  <br />
                  <span>Big personality.</span>
                </h2>
                <p>
                  You don’t need a whole new wardrobe to change things up. Start
                  with the detail that ties it all together.
                </p>
                <div className="benefit">
                  <span>01</span>
                  <div>
                    <h3>Make your basics anything but.</h3>
                    <p>
                      Bright checks bring a playful pop to an all-white sneaker,
                      your go-to denim, or a simple everyday fit.
                    </p>
                  </div>
                </div>
                <div className="benefit">
                  <span>02</span>
                  <div>
                    <h3>Bring your own kind of color.</h3>
                    <p>
                      From the first class to the last coffee run, let a small
                      detail say something about you.
                    </p>
                  </div>
                </div>
                <a className="text-link" href="#details">
                  Meet your new favorite detail{" "}
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </section>
          <section
            id="details"
            className="details scene"
            aria-labelledby="details-title"
          >
            <div className="section-topline">
              <span>02 / CHECK THE DETAILS</span>
              <span>DESIGNED TO STAND OUT</span>
            </div>
            <div className="details-grid">
              <div className="details-copy">
                <span className="eyebrow">
                  A CLASSIC PATTERN. A COLORFUL TWIST.
                </span>
                <h2 id="details-title">
                  All the right
                  <br />
                  <span className="blue">checks.</span>
                </h2>
                <p>
                  Blue, red, yellow, and green meet a crisp white base. An easy
                  way to add a little Google personality to the shoes you
                  already love.
                </p>
                <dl className="specs">
                  <div>
                    <dt>Pattern</dt>
                    <dd>Multicolor checkered</dd>
                  </div>
                  <div>
                    <dt>Base color</dt>
                    <dd>White</dd>
                  </div>
                  <div>
                    <dt>Dimensions</dt>
                    <dd>0.5″ wide × 45″ long</dd>
                  </div>
                  <div>
                    <dt>Made in</dt>
                    <dd>USA</dd>
                  </div>
                </dl>
                <p className="fit-note">
                  Make it a good fit: compare the 45″ length with your current
                  laces before ordering.
                </p>
              </div>
              <div className="detail-visual">
                <div className="checker-panel" aria-hidden="true" />
                <Slot name="detail-slot" angle={-12} />
                <div className="detail-tag">
                  <ColorMark />
                  <span>
                    FOUR COLORS.
                    <br />
                    ENDLESS OUTFIT IDEAS.
                  </span>
                </div>
              </div>
            </div>
          </section>
          <section
            id="shop"
            className="purchase scene"
            aria-labelledby="purchase-title"
          >
            <div className="section-topline">
              <span>03 / YOUR NEXT SMALL UPGRADE</span>
              <span>GO ON. MIX IT UP.</span>
            </div>
            <div className="purchase-grid">
              <div className="purchase-visual">
                <span className="big-star" aria-hidden="true">
                  ✳
                </span>
                <Slot name="purchase-slot" angle={3} />
              </div>
              <div className="purchase-copy">
                <span className="eyebrow">GOOD STYLE IS IN THE DETAILS</span>
                <h2 id="purchase-title">
                  Tie it all
                  <br />
                  together.
                </h2>
                <h3>
                  Google Checkered
                  <br />
                  Shoelaces White
                </h3>
                <p>
                  For your campus rotation, your weekend uniform, or that friend
                  who’s always adding their own twist.
                </p>
                <div className="purchase-price">
                  $5<span>.00</span>
                  <small>USD · Shoelaces only</small>
                </div>
                <ShopLink className="dark-button">Make them yours</ShopLink>
                <p className="purchase-note">
                  Shop at the official Google Merch Shop.
                  <br />
                  Current price, availability, and shipping confirmed there.
                </p>
              </div>
            </div>
          </section>
        </div>
        <section className="closer" aria-labelledby="closer-title">
          <div className="product-photo">
            <img
              src={image("checkered-laces.jpg")}
              alt="Official product photo of white shoelaces with blue, red, yellow, and green checks"
              loading="lazy"
              width="600"
              height="600"
            />
            <span>THE ORIGINAL / GOOGLE CHECKERED SHOELACES WHITE</span>
          </div>
          <div className="faq">
            <span className="eyebrow">BEFORE YOU LACE UP</span>
            <h2 id="closer-title">A few loose ends.</h2>
            <details>
              <summary>
                Are the sneakers included?<span>+</span>
              </summary>
              <p>
                No. This product is the shoelaces only. The sneaker shown is an
                AI-generated styling illustration.
              </p>
            </details>
            <details>
              <summary>
                Will these fit my shoes?<span>+</span>
              </summary>
              <p>
                The laces measure 0.5″ wide by 45″ long. Compare them with your
                current laces and your shoe’s eyelets to check the fit.
              </p>
            </details>
            <details>
              <summary>
                Where can I buy them?<span>+</span>
              </summary>
              <p>
                Purchase directly from the{" "}
                <a href={SHOP} target="_blank" rel="noopener noreferrer">
                  official Google Merch Shop
                </a>
                . The store provides current pricing, stock, delivery options,
                and returns information.
              </p>
            </details>
            <details>
              <summary>
                How can I style the checks?<span>+</span>
              </summary>
              <p>
                Try them with a plain white sneaker and denim, or pick up one of
                the four colors elsewhere in your outfit. Keep it simple and let
                the laces do the talking.
              </p>
            </details>
          </div>
        </section>
      </main>
      <footer>
        <div className="footer-head">
          <a className="brand" href="#top">
            <ColorMark />
            <span>
              Little details.
              <br />
              <strong>Lots of personality.</strong>
            </span>
          </a>
          <a className="back-top" href="#top">
            Back to top ↑
          </a>
        </div>
        <div className="footer-bottom">
          <p>
            Independent student marketing concept. Not affiliated with or
            endorsed by Google.
            <br />
            Google is a trademark of Google LLC. Generated sneaker image is for
            styling illustration; shoes not included.
          </p>
          <a href={SHOP} target="_blank" rel="noopener noreferrer">
            Official product listing ↗
          </a>
        </div>
      </footer>
    </>
  );
}
