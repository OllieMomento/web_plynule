<!-- Layout-only scaffold for landing page -->
<script lang="ts">
    import StylizedHeading from "$lib/components/StylizedHeading.svelte";
    import { onMount } from "svelte";

    let kuteTween: any = null;
    let hasStarted = false;

    // Paths used in the header SVG
    const CURVE_PATH =
        "M65.2804 62.8836L1.60645 1.3645L910.866 1.36456C906.77 11.5268 897.779 18.6021 889.182 25.3946C881.86 31.1792 876.597 38.9784 871.417 48.5837C856.633 76.0022 819.6 90.4165 789.528 82.2892L763.381 72.8462C742.08 67.0894 726.394 86.6842 705.999 78.267L702.563 76.8491C679.928 67.5077 655.091 65.5048 631.901 73.3693C610.365 80.6729 585.896 89.1011 566.011 91.6964C551.102 93.6424 537.611 85.5737 526.987 74.9332C516.363 64.2927 502.676 54.8474 488.044 58.311C467.035 63.2843 449.665 82.0335 428.869 95.7939C418.613 102.58 405.443 101.024 395.357 93.9863C385.272 86.949 372.271 85.6144 361.258 91.0856C338.03 102.624 320.125 111.886 297.174 94.6727C271.645 75.5254 238.5 78.7368 207.991 88.0973L191.538 93.1453C157.058 103.725 119.712 99.2383 88.7176 80.7934C80.24 75.7483 72.3752 69.7383 65.2804 62.8836Z";

    const RECT_PATH =
        "M0.95662 99.4031L0.606445 1.32391L909.867 1.32397V31.1644V99.4031H852.549H777.737H717.225H707.617H656.976H578.43H525.987H487.044H427.869H395.82H360.258H296.174H206.991H192.226H55.8834H0.95662Z";

    onMount(() => {
        (async () => {
            // @ts-ignore - dynamic ESM import from CDN
            const mod: any = await import(
                "https://cdn.skypack.dev/kute.js@2.2.4"
            );
            const KUTE: any = mod.default || (mod as any);
            kuteTween = KUTE.fromTo(
                "#headerShapeCurve",
                { path: "#headerShapeCurve" },
                { path: "#headerShapeRect" },
                { duration: 600, easing: "easingCubicInOut", paused: true },
            );

            const threshold = 40;
            const onScroll = () => {
                if (!kuteTween) return;
                const over = window.scrollY > threshold;
                if (over && !hasStarted) {
                    hasStarted = true;
                    kuteTween.start();
                } else if (!over && hasStarted) {
                    kuteTween.reverse();
                    hasStarted = false;
                }
            };
            window.addEventListener("scroll", onScroll, { passive: true });
            onScroll();
        })();
    });
</script>

<header class="sticky top-0 z-30 bg-transparent absolute h-32 mx-auto">
    <div class="relative z-30 mx-auto max-w-2xl flex py-2">
        <a href="/" class="leading-none inline-flex items-center">
            <img src="/logo_1.svg" alt="Plynule" class="h-8 md:h-10 w-auto" />
        </a>
        <nav class="hidden sm:flex flex-1 justify-end gap-4 text-2xl">
            <a href="#what" class="hover:opacity-70">what?</a>
            <a href="#how" class="hover:opacity-70">how?</a>
            <a href="#who" class="hover:opacity-70">who?</a>
        </nav>
    </div>
    <!-- curved bottom edge over hero video -->
    <div
        class="h-32 absolute inset-x-0 bottom-0 pointer-events-none mx-auto max-w-3xl"
    >
        <svg
            class="w-full h-15"
            viewBox="0 0 954 125"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <path
                id="headerShapeCurve"
                d={CURVE_PATH}
                fill="white"
                stroke="black"
                stroke-width="4"
            />
            <path id="headerShapeRect" d={RECT_PATH} fill="none" />
        </svg>
    </div>
</header>

<main>
    <!-- Hero -->
    <section id="hero" class="relative">
        <div
            class="relative bg-white flex items-center justify-center overflow-hidden px-12 -mt-24"
        >
            <video
                class="block w-full h-full object-contain border-2 border-black"
                src="/video.mp4"
                autoplay
                muted
                loop
                playsinline
            ></video>
            <div class="mx-auto max-w-6xl"></div>
        </div>
    </section>

    <!-- What -->
    <section id="what" class="">
        <StylizedHeading
            level="h1"
            class="text-8xl text-center mt-12 relative z-10"
            text={"what is plynule?"}
        />
        <div class="-m-3 mx-auto relative">
            <!-- Mobile stacked layout -->
            <div class=" md:hidden space-y-10">
                <div>
                    <div
                        class="bg-black text-white text-xl tracking-wide px-8 py-3"
                    >
                        Material
                    </div>
                    <article class="pt-4">
                        <h3 class="text-3xl font-extrabold leading-tight px-8">
                            Wood, but Not Bought
                        </h3>
                        <p class="mt-4 text-xl leading-9 px-8">
                            We harvest our own ash and maple from the Broumov
                            forests in the Czech Republic. Each log dries
                            naturally for years.
                        </p>
                    </article>
                </div>
                <div>
                    <div
                        class="bg-black text-white text-xl tracking-wide px-8 py-3"
                    >
                        Form
                    </div>
                    <article class="pt-4">
                        <h3 class="text-3xl font-extrabold leading-tight px-8">
                            Straight is So Last Year
                        </h3>
                        <p class="mt-4 text-xl leading-9 px-8">
                            For centuries, straight lines was the only way. Not
                            anymore. straight and plynule lines meet
                        </p>
                    </article>
                </div>
                <div>
                    <div
                        class="bg-black text-white text-xl tracking-wide px-8 py-3"
                    >
                        Finnish
                    </div>
                    <article class="pt-4">
                        <h3 class="text-3xl font-extrabold leading-tight px-8">
                            Chasing the Perfect Hue
                        </h3>
                        <p class="mt-4 text-xl leading-9 px-8">
                            We finish each shelf with premium oils, layered to
                            enhance the grain and add rich, lasting color. We
                            mix and match to find the sweet spot in every shade
                        </p>
                    </article>
                </div>
            </div>

            <!-- Desktop/Tablet 3-column layout -->
            <div class="hidden md:block">
                <!-- Top labels bar -->
                <div
                    class="px-12 grid grid-cols-3 bg-black text-white text-xl md:text-2xl tracking-wide"
                >
                    <div class="px-4 py-3">Material</div>
                    <div class="px-4 py-3">Form</div>
                    <div class="px-4 py-3">Finnish</div>
                </div>

                <!-- Content with decorative dividers -->
                <div
                    class="px-12 relative grid gap-10 lg:gap-16 md:grid-cols-3 pt-8"
                >
                    <!-- vertical wavy dividers -->
                    <svg
                        class="hidden md:block absolute top-0 bottom-0 text-black"
                        style="left: 33.3333%"
                        width="16"
                        height="100%"
                        viewBox="0 0 16 600"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <path
                            d="M8 0 C 0 100, 16 200, 8 300 C 0 400, 16 500, 8 600"
                            stroke="currentColor"
                            stroke-width="2"
                            fill="none"
                        ></path>
                    </svg>
                    <svg
                        class="hidden md:block absolute top-0 bottom-0 text-black"
                        style="left: 66.6666%"
                        width="16"
                        height="100%"
                        viewBox="0 0 16 600"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <path
                            d="M8 0 C 0 100, 16 200, 8 300 C 0 400, 16 500, 8 600"
                            stroke="currentColor"
                            stroke-width="2"
                            fill="none"
                        ></path>
                    </svg>

                    <article class="min-h-28">
                        <h3
                            class="text-3xl md:text-4xl font-extrabold leading-tight"
                        >
                            Wood, but Not Bought
                        </h3>
                        <p class="mt-4 text-xl leading-9">
                            We harvest our own ash and maple from the Broumov
                            forests in the Czech Republic. Each log dries
                            naturally for years.
                        </p>
                    </article>

                    <article class="min-h-28">
                        <h3
                            class="text-3xl md:text-4xl font-extrabold leading-tight"
                        >
                            Straight is So Last Year
                        </h3>
                        <p class="mt-4 text-xl leading-9">
                            For centuries, straight lines was the only way. Not
                            anymore. straight and plynule lines meet
                        </p>
                    </article>

                    <article class="min-h-28">
                        <h3
                            class="text-3xl md:text-4xl font-extrabold leading-tight"
                        >
                            Chasing the Perfect Hue
                        </h3>
                        <p class="mt-4 text-xl leading-9">
                            We finish each shelf with premium oils, layered to
                            enhance the grain and add rich, lasting color. We
                            mix and match to find the sweet spot in every shade
                        </p>
                    </article>
                </div>
            </div>
        </div>
    </section>

    <!-- HOW title + labels + rhythm line -->

    <section id="how" class="how-section">
        <StylizedHeading
            level="h1"
            class="text-8xl text-center mt-12 relative z-10"
            text={"how to get plynule?"}
        />
        <!-- Labels bar -->
        <div class="-m-7">
            <div
                class="labels px-4 py-3 mt-4 text-xl md:text-2xl tracking-wide text-center gap-8 flex justify-center"
            >
                <span>No Stock</span> <span>Small Drops</span>
                <span>Custom Work</span>
            </div>

            <!-- Wave with text along path -->
            <div class="wave mt-6">
                <svg
                    class="w-full h-28 md:h-40"
                    viewBox="0 0 1440 140"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        id="how-wave"
                        d="M0,90 C 180,40 280,140 420,110 C 560,80 680,150 820,120 C 940,94 1020,92 1160,108 C 1320,126 1440,110 1440,110"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                    />
                    <text fill="currentColor" font-size="44" font-weight="500">
                        <textPath
                            href="#how-wave"
                            startOffset="0%"
                            dominant-baseline="hanging"
                        >
                            <animate
                                attributeName="startOffset"
                                from="-10%"
                                to="110%"
                                dur="8s"
                                repeatCount="indefinite"
                            />
                            Follow our rhythm
                        </textPath>
                    </text>
                </svg>
            </div>
            <div class="mt-8 flex justify-center">
                <button
                    class="ig-btn w-28 h-28 md:w-32 md:h-32 rounded-full bg-black text-white flex items-center justify-center text-lg md:text-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                >
                    @plynule
                </button>
            </div>
        </div>
    </section>

    <!-- Who -->
    <section id="who" class="">
        <StylizedHeading
            level="h1"
            class="text-8xl text-center mt-12 relative z-10"
            text={"who is plynule?"}
        />
        <div class="-m-7">
            <div
                class="-m-0 px-4 py-3 mt-4 bg-black text-white text-xl md:text-2xl tracking-wide text-center gap-8 flex justify-center"
            >
                <span>Duo of 2 friends</span> <span>Ollie</span>
                <span>Filip</span>
            </div>
        </div>
    </section>
</main>

<footer class="py-10"></footer>

<style lang="postcss">
    @reference "tailwindcss";
    :global(.how-section) {
        color: #111111;
        background: #ffffff;
        transition:
            background-color 300ms ease,
            color 300ms ease;
    }
    :global(.how-section .labels) {
        background: #000000;
        color: #ffffff;
    }
    :global(.how-section .wave svg) {
        color: #111111;
    }
    :global(.how-section .ig-btn) {
        filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.25));
    }
    /* Only when the IG button is hovered: flip wave colors */
    :global(.how-section:has(.ig-btn:hover) .wave svg) {
        color: #ffffff;
    }
    /* Button hover styling */
    :global(.how-section .ig-btn:hover) {
        background: #ffffff;
        color: #000000;
    }
    /* Only invert the heading of the next section (who) when button is hovered */
    :global(.how-section:has(.ig-btn:hover) + #who > *:first-child) {
        //background: #000000;
    }
    /* Remove the top gap (no layout change applied) */
    /* Also darken the local wrapper (the one that contains labels, wave, button) */
    :global(.how-section:has(.ig-btn:hover) > .-m-7) {
        background: #000000;
        color: #ffffff;
    }
    /* Animate the wave path when button is hovered */
    @keyframes wave-dash {
        to {
            stroke-dashoffset: -120;
        }
    }
    :global(.how-section .wave path) {
        stroke-dasharray: none;
    }
    :global(.how-section:has(.ig-btn:hover) .wave path) {
        stroke-dasharray: 12 12;
        animation: wave-dash 1.2s linear infinite;
    }
</style>
