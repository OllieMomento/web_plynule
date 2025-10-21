<!-- Layout-only scaffold for landing page -->
<script lang="ts">
    import StylizedHeading from "$lib/components/StylizedHeading.svelte";
    import { onMount } from "svelte";

    // Header paths for morphing
    const CURVE_PATH =
        "M65.2804 62.8836L1.60645 1.3645L910.866 1.36456C906.77 11.5268 897.779 18.6021 889.182 25.3946C881.86 31.1792 876.597 38.9784 871.417 48.5837C856.633 76.0022 819.6 90.4165 789.528 82.2892L763.381 72.8462C742.08 67.0894 726.394 86.6842 705.999 78.267L702.563 76.8491C679.928 67.5077 655.091 65.5048 631.901 73.3693C610.365 80.6729 585.896 89.1011 566.011 91.6964C551.102 93.6424 537.611 85.5737 526.987 74.9332C516.363 64.2927 502.676 54.8474 488.044 58.311C467.035 63.2843 449.665 82.0335 428.869 95.7939C418.613 102.58 405.443 101.024 395.357 93.9863C385.272 86.949 372.271 85.6144 361.258 91.0856C338.03 102.624 320.125 111.886 297.174 94.6727C271.645 75.5254 238.5 78.7368 207.991 88.0973L191.538 93.1453C157.058 103.725 119.712 99.2383 88.7176 80.7934C80.24 75.7483 72.3752 69.7383 65.2804 62.8836Z";
    const RECT_PATH =
        "M0.95662 99.4031L0.606445 1.32391L909.867 1.32397V31.1644V99.4031H852.549H777.737H717.225H707.617H656.976H578.43H525.987H487.044H427.869H395.82H360.258H296.174H206.991H192.226H55.8834H0.95662Z";

    let headerShapeEl: SVGPathElement | null = null;
    let heroEl: HTMLElement | null = null;

    function loadGSAPWithMorph(): Promise<any> {
        return new Promise((resolve) => {
            const g: any = window as any;
            if (g.gsap && g.ScrollTrigger && g.MorphSVGPlugin) {
                return resolve({
                    gsap: g.gsap,
                    ScrollTrigger: g.ScrollTrigger,
                    MorphSVGPlugin: g.MorphSVGPlugin,
                });
            }
            const s1 = document.createElement("script");
            s1.src =
                "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js";
            const s2 = document.createElement("script");
            s2.src =
                "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js";
            // MorphSVGPlugin trial build (commonly used in GSAP demos)
            const s3 = document.createElement("script");
            s3.src = "https://assets.codepen.io/16327/MorphSVGPlugin3.min.js";
            let loaded = 0;
            const done = () => {
                loaded++;
                if (loaded === 3) {
                    resolve({
                        gsap: (window as any).gsap,
                        ScrollTrigger: (window as any).ScrollTrigger,
                        MorphSVGPlugin: (window as any).MorphSVGPlugin,
                    });
                }
            };
            s1.onload = done;
            s2.onload = done;
            s3.onload = done;
            document.head.appendChild(s1);
            document.head.appendChild(s2);
            document.head.appendChild(s3);
        });
    }

    onMount(() => {
        (async () => {
            const { gsap, ScrollTrigger, MorphSVGPlugin } =
                await loadGSAPWithMorph();
            if (!headerShapeEl || !heroEl) return;
            // set starting path
            headerShapeEl.setAttribute("d", RECT_PATH);
            gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);
            // Scroll-driven morph rectangle -> curve across hero
            gsap.to(headerShapeEl, {
                morphSVG: { shape: CURVE_PATH, shapeIndex: 0 },
                ease: "none",
                scrollTrigger: {
                    trigger: heroEl,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        })();
    });
</script>

<svelte:head>
    <script
        defer
        src="https://cdn.jsdelivr.net/npm/img-comparison-slider@8/dist/index.js"
    ></script>
</svelte:head>

<header class="sticky top-2 z-30 bg-transparent absolute h-32 mx-auto">
    <div class="relative z-30 mx-auto max-w-xl flex py-3">
        <a href="/" class="leading-none inline-flex items-center">
            <img src="/logo_1.svg" alt="Plynule" class="h-8 md:h-10 w-auto" />
        </a>
        <nav class="hidden sm:flex flex-1 justify-end gap-3 text-2xl">
            <a href="#what" class="nav-link">what?</a>
            <a href="#how" class="nav-link">how?</a>
            <a href="#who" class="nav-link">who?</a>
        </nav>
    </div>
    <!-- curved bottom edge over hero video -->
    <div
        class="h-32 absolute inset-x-0 bottom-0 pointer-events-none mx-auto max-w-3xl"
    >
        <svg
            class="w-full h-20"
            viewBox="0 0 954 125"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <!-- Animated path driven by GSAP ScrollTrigger within hero -->
            <path
                id="headerShape"
                bind:this={headerShapeEl}
                d={RECT_PATH}
                fill="white"
                stroke="black"
                stroke-width="4"
            />
        </svg>
    </div>
</header>

<main>
    <!-- Hero -->
    <section id="hero" class="relative" bind:this={heroEl}>
        <div
            class="relative bg-white flex items-center justify-center overflow-hidden px-12 -mt-22"
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
                            We Don’t Buy Wood, We Make It
                        </h3>
                        <p class="mt-4 text-xl leading-9 px-8">
                            We go into the forest, drop the tree, and turn it
                            into planks ourselves. Each log is cut, stacked, and
                            left to dry naturally — no shortcuts.
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
                            Straight Is So Last Year
                        </h3>
                        <p class="mt-4 text-xl leading-9 px-8">
                            For centuries, straight lines ruled — in furniture
                            and, well, everywhere else. Turns out, it’s okay to
                            bend a little.
                        </p>
                    </article>
                </div>
                <div>
                    <div
                        class="bg-black text-white text-xl tracking-wide px-8 py-3"
                    >
                        Finish
                    </div>
                    <article class="pt-4">
                        <h3 class="text-3xl font-extrabold leading-tight px-8">
                            Chasing the Perfect Hueeeee
                        </h3>
                        <p class="mt-4 text-xl leading-9 px-8">
                            We test oils like mad scientists and mix pigments
                            until something clicks. Each finish has its own
                            mood. That’s how we like it.
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
            <div class="wave relative mt-6 h-60">
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
                    <text
                        fill="currentColor"
                        font-size="44"
                        font-weight="500"
                        text-anchor="middle"
                        dominant-baseline="middle"
                    >
                        <textPath href="#how-wave" startOffset="50%">
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
                <a
                    href="https://instagram.com/plynule"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open plynule on Instagram"
                    class="ig-btn absolute left-1/2 top-50% -translate-x-1/2 -translate-y-2/3 w-28 h-28 md:w-32 md:h-32 rounded-full bg-black text-white flex items-center justify-center text-lg md:text-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                >
                    @plynule
                </a>
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
                class="-m-0 px-4 py-6 mt-4 bg-black text-white text-xl md:text-2xl tracking-wide"
            >
                <div class="news-ticker overflow-hidden whitespace-nowrap">
                    <div class="ticker-track animate-ticker-ltr">
                        <span class="ticker-copy"
                            >Ollie & Filip. We build stuff we like. Boring isn’t
                            one of them. •
                        </span>
                        <span class="ticker-copy" aria-hidden="true"
                            >Ollie & Filip. We build stuff we like. Boring isn’t
                            one of them. •
                        </span>
                    </div>
                </div>
            </div>
            <!-- About block with image comparison slider -->
            <div class="about mx-auto max-w-6xl">
                <div class="relative">
                    <img-comparison-slider
                        class="slider-example-split-line"
                        value="20%"
                    >
                        <div slot="first" class="ics-left relative">
                            <img
                                width="100%"
                                src="images/my_dva_2.jpg"
                                alt="Before"
                            />
                        </div>
                        <img
                            slot="second"
                            width="100%"
                            src="images/my_dva_1.jpg"
                            alt="After"
                        />
                        <span slot="handle">
                            <svg
                                class="handle"
                                width="41"
                                height="37"
                                viewBox="0 0 248 221"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M83.6144 192.876C59.5707 184.532 28.403 182.829 12.7301 168.865C-2.76476 154.73 -3.12095 128.334 6.31843 107.047C15.7578 85.7593 34.9927 69.5811 47.6379 50.5077C60.2831 31.4344 66.1605 9.29574 80.7648 2.48383C95.3691 -4.15777 118.344 4.5274 140.963 5.37888C163.582 6.06007 185.845 -1.09243 203.833 3.6759C221.821 8.44423 235.713 25.3037 242.481 43.5255C249.427 61.9176 249.071 81.8424 245.509 99.7237C241.768 117.775 235.001 133.613 227.877 151.494C220.753 169.205 213.272 188.789 198.846 202.413C184.42 216.037 162.87 223.7 143.813 220.124C124.578 216.377 107.48 201.221 83.6144 192.876Z"
                                    fill="#E4E0DD"
                                />
                                <circle
                                    cx="124.96"
                                    cy="110.056"
                                    r="12.4427"
                                    fill="black"
                                />
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M86.0885 109.864L93.9565 102.1C101.905 94.256 101.99 81.4541 94.1458 73.5059V73.5059L57.3027 109.864L94.1458 146.223V146.223C101.99 138.274 101.905 125.472 93.9565 117.629L86.0885 109.864Z"
                                    fill="black"
                                />
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M163.551 110.642L155.683 118.406C147.734 126.25 147.65 139.052 155.493 147V147L192.336 110.642L155.493 74.2833V74.2833C147.65 82.2316 147.734 95.0335 155.683 102.877L163.551 110.642Z"
                                    fill="black"
                                />
                            </svg>
                        </span>
                    </img-comparison-slider>
                </div>
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
    /* slider color variable */
    :global(.slider-example-split-line) {
        --divider-color: #e4e0dd;
    }
    /* Prevent header nav from shifting on hover: use transform instead of font-style */
    :global(nav .nav-link) {
        display: inline-block;
        transform: skewX(0deg);
        transition: transform 180ms ease;
        will-change: transform;
    }
    :global(nav .nav-link:hover) {
        transform: skewX(-20deg);
    }
    /* News ticker animation */
    @keyframes ticker-ltr {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(50%);
        }
    }
    :global(.news-ticker) {
        position: relative;
    }
    :global(.ticker-track) {
        display: inline-flex;
        white-space: nowrap;
        will-change: transform;
    }
    :global(.ticker-copy) {
        padding-right: 2rem;
    }
    :global(.animate-ticker-ltr) {
        animation: ticker-ltr 18s linear infinite;
    }
</style>
