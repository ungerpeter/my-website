import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { css } from "~/styled-system/css";
import { center } from "~/styled-system/patterns";

export interface SvgAvatarProps {}

export const SvgAvatar = component$<SvgAvatarProps>(() => {
  const avatarRef = useSignal<HTMLDivElement>();
  const eyesSvgRef = useSignal<SVGSVGElement>();
  const pupilsRef = useSignal<SVGGElement>();
  const animate = useSignal(false);

  const pupilsMaxTranslateX = 3.2;
  const pupilsMaxTranslateY = 2.3;
  const headMaxTiltDeg = 15;

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    animate.value = true;
    const eyeFollowAnimation = true;
    const headFollowAnimation = true;

    if (eyeFollowAnimation) {
      window.addEventListener("mousemove", (event) => {
        if (eyesSvgRef.value && pupilsRef.value) {
          const rect = pupilsRef.value.getBoundingClientRect();
          const offsetX = (event.clientX - rect.left - rect.width / 2) / 100;
          const offsetY = (event.clientY - rect.top - rect.height / 2) / 100;

          const translateX =
            offsetX < 0
              ? Math.max(offsetX, -pupilsMaxTranslateX)
              : Math.min(offsetX, pupilsMaxTranslateX);
          const translateY =
            offsetY < 0
              ? Math.max(offsetY, -pupilsMaxTranslateY)
              : Math.min(offsetY, pupilsMaxTranslateY);

          const svgMatrix = eyesSvgRef.value.createSVGMatrix();
          const svgTransform =
            pupilsRef.value.transform.baseVal.createSVGTransformFromMatrix(
              svgMatrix.translate(translateX, translateY)
            );
          pupilsRef.value.transform.baseVal.initialize(svgTransform);
        }
      });
    }
    if (headFollowAnimation) {
      if (avatarRef.value) {
        window.addEventListener("mousemove", (event) => {
          const distance = 1000;
          const rect = avatarRef.value!.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const mouseX = event.clientX;
          const mouseY = event.clientY;
          const deltaX = mouseX - centerX;
          const deltaY = mouseY - centerY;

          const angleY = Math.atan2(deltaX, distance) * (180 / Math.PI);
          const angleX = -Math.atan2(deltaY, distance) * (180 / Math.PI);
          const finalAngleY =
            angleY < 0
              ? Math.max(angleY, -headMaxTiltDeg)
              : Math.min(angleY, headMaxTiltDeg);
          const finalAngleX =
            angleX < 0
              ? Math.max(angleX, -headMaxTiltDeg)
              : Math.min(angleX, headMaxTiltDeg);

          avatarRef.value!.style.transform = `rotateX(${finalAngleX}deg) rotateY(${finalAngleY}deg)`;
        });
      }
    }
  });

  const viewBox = "0 0 138.03658 228.6062";
  const gTransform = "translate(-38.562516,-23.609584)";

  const zLayers = {
    head: 0,
    chin_beard: 15,
    ears: 15,
    eyes: 30,
    pupils: 30,
    eye_accents_upper: 32,
    eye_accents_lower: 34,
    head_accents_upper: 29,
    head_accents_middle: 32,
    head_accents_lower: 35,
    lips: 40,
    goat_beard: 40,
    eyebrows: 40,
    mustache_beard: 45,
    nose: 45,
    glasses: 50,
    nose_center: 60,
  };

  return (
    <div class={center({ perspective: "1000px" })}>
      <div
        id="avatar"
        ref={avatarRef}
        class={css({
          transformStyle: "preserve-3d",
          transition: "transform 0.1s",
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "1fr",
          "& > div": {
            gridColumn: "1 / 2",
            gridRow: "1 / 2",
          },
          "& svg": {
            width: "100%",
            maxWidth: "250px",
            height: "auto",
            stroke: "#fff",
            strokeWidth: 0.5,
            "& #glasses_g": {
              fillOpacity: 0.3,
              strokeWidth: 1.5,
              stroke: "#999",
            },
            "& #lips_g": {
              strokeWidth: 0.3,
              stroke: "#999",
            },
            "& .eye_accents_g": {
              strokeWidth: 0.3,
              stroke: "#999",
            },
            "& .head_accents_g": {
              strokeWidth: 0.3,
              stroke: "#999",
            },
          },
        })}
      >
        <div id="head" style={{ transform: `translateZ(${zLayers.head}px)` }}>
          <svg viewBox={viewBox}>
            <g id="head_g" transform={gTransform}>
              <path
                d="m 106.2092,23.743095 c 32.67207,-0.22761 53.37151,31.457279 58.96805,43.97349 1.01176,2.262736 1.77114,6.228292 1.90051,8.70775 0.46167,8.847822 0.20377,25.086455 0.7979,35.492775 0.71904,12.59418 2.99778,12.14163 2.99778,35.57365 0,23.43202 -8.70069,41.75927 -17.78683,55.55885 -9.08614,13.79958 -19.85066,22.60696 -30.7772,26.78016 -10.92654,4.1732 -17.58265,4.41576 -29.378243,0.3997 -11.795597,-4.01606 -26.060075,-13.28842 -35.57365,-28.17912 -9.513575,-14.8907 -14.18949,-39.04157 -14.18949,-58.95634 0,-19.91477 1.649477,-20.01859 2.398223,-31.97631 0.748746,-11.957722 0.926479,-33.039388 1.99852,-39.770546 1.072041,-6.731158 20.944871,-47.341425 58.64443,-47.604059 z"
                id="head_outline"
              />
            </g>
          </svg>
        </div>

        <div id="eyes" style={{ transform: `translateZ(${zLayers.eyes}px)` }}>
          <svg ref={eyesSvgRef} viewBox={viewBox}>
            <g id="eyes_g" transform={gTransform}>
              <path
                d="m 126.0569,114.15587 c 1.46028,-2.70064 2.80204,-3.13415 4.33238,-4.1236 2.04901,-1.3248 4.34287,-2.3825 6.73348,-2.87086 2.19907,-0.44923 4.21484,7.5e-4 6.42029,0.41758 2.29539,0.43383 4.52612,1.34824 6.52469,2.55768 1.04465,0.63217 2.78914,1.81057 2.76646,2.40108 -0.0323,0.84027 -1.84427,1.78234 -3.28844,2.55767 -2.02106,1.08506 -3.72042,1.66324 -5.58513,2.2445 -1.96633,0.61294 -4.05598,1.12681 -6.1071,0.93955 -1.68777,-0.15409 -3.19786,-1.12395 -4.80217,-1.67032 -1.45834,-0.49665 -2.97373,-0.84276 -4.38459,-1.46152 -0.75568,-0.33142 -1.7836,-0.0694 -2.29669,0 -0.34354,0.0465 -0.47807,-0.68681 -0.31318,-0.99176 z"
                id="right_eye"
              />
              <path
                d="m 88.541699,115.05104 c -1.097955,-1.28518 -1.439202,-2.54498 -3.825247,-3.58202 -3.026787,-1.31552 -6.310965,-2.34484 -9.611106,-2.37801 -2.844282,-0.0286 -5.757122,0.65502 -8.323021,1.88259 -2.47194,1.18261 -4.262928,3.52755 -4.311874,4.19777 -0.07555,1.03451 3.974744,3.33838 7.493173,4.40657 2.657248,0.80673 5.692525,1.04319 8.203607,0.5945 2.254904,-0.40291 3.386334,-1.5857 5.459302,-2.56024 0.828864,-0.38967 1.599618,-0.92652 2.47709,-1.189 1.660249,-0.49664 3.563711,-0.0546 2.438076,-1.37216 z"
                id="left_eye"
              />
            </g>
          </svg>
        </div>

        <div id="pupils" style={{ transform: `translateZ(${zLayers.pupils}px)` }}>
          <svg viewBox={viewBox}>
            <defs>
              <clipPath id="eyes-clip-path">
                <path
                  d="m 88.541699,115.05104 c -1.097955,-1.28518 -1.439202,-2.54498 -3.825247,-3.58202 -3.026787,-1.31552 -6.310965,-2.34484 -9.611106,-2.37801 -2.844282,-0.0286 -5.757122,0.65502 -8.323021,1.88259 -2.47194,1.18261 -4.262928,3.52755 -4.311874,4.19777 -0.07555,1.03451 3.974744,3.33838 7.493173,4.40657 2.657248,0.80673 5.692525,1.04319 8.203607,0.5945 2.254904,-0.40291 3.386334,-1.5857 5.459302,-2.56024 0.828864,-0.38967 1.599618,-0.92652 2.47709,-1.189 1.660249,-0.49664 3.563711,-0.0546 2.438076,-1.37216 z"
                  id="left_eye_clip_path"
                />
                <path
                  d="m 126.0569,114.15587 c 1.46028,-2.70064 2.80204,-3.13415 4.33238,-4.1236 2.04901,-1.3248 4.34287,-2.3825 6.73348,-2.87086 2.19907,-0.44923 4.21484,7.5e-4 6.42029,0.41758 2.29539,0.43383 4.52612,1.34824 6.52469,2.55768 1.04465,0.63217 2.78914,1.81057 2.76646,2.40108 -0.0323,0.84027 -1.84427,1.78234 -3.28844,2.55767 -2.02106,1.08506 -3.72042,1.66324 -5.58513,2.2445 -1.96633,0.61294 -4.05598,1.12681 -6.1071,0.93955 -1.68777,-0.15409 -3.19786,-1.12395 -4.80217,-1.67032 -1.45834,-0.49665 -2.97373,-0.84276 -4.38459,-1.46152 -0.75568,-0.33142 -1.7836,-0.0694 -2.29669,0 -0.34354,0.0465 -0.47807,-0.68681 -0.31318,-0.99176 z"
                  id="right_eye_clip_path"
                />
              </clipPath>
            </defs>
            <g
              id="pupils_g"
              transform={gTransform}
              clip-path="url(#eyes-clip-path)"
            >
              <g ref={pupilsRef}>
                <path
                  id="left_pupil"
                  d="m 80.792498,114.54897 a 5.2712803,5.2712803 0 0 1 -5.266939,5.27128 5.2712803,5.2712803 0 0 1 -5.275615,-5.26259 5.2712803,5.2712803 0 0 1 5.258247,-5.27995 5.2712803,5.2712803 0 0 1 5.284278,5.25389 l -5.271252,0.0174 z"
                />
                <path
                  id="right_pupil"
                  d="m 144.43421,112.54897 a 5.2712803,5.2712803 0 0 1 -5.266939,5.27128 5.2712803,5.2712803 0 0 1 -5.275615,-5.26259 5.2712803,5.2712803 0 0 1 5.258247,-5.27995 5.2712803,5.2712803 0 0 1 5.284278,5.25389 l -5.271252,0.0174 z"
                />
              </g>
            </g>
          </svg>
        </div>

        <div id="lips" style={{ transform: `translateZ(${zLayers.lips}px)` }}>
          <svg viewBox={viewBox}>
            <g id="lips_g" transform={gTransform}>
              <path
                d="m 86.684055,185.70585 c 0,0 9.296967,-1.64965 13.982775,-1.50794 0.91107,0.0275 2.69602,0.45695 2.69602,0.45695 l 3.88411,1.41656 3.10728,-1.14239 c 0,0 1.76032,-0.73748 2.69603,-0.82251 5.16123,-0.46899 15.44502,1.78211 15.44502,1.78211 0,0 -7.05643,0.0244 -9.64648,0.54713 -2.27749,0.45965 -6.57653,2.30944 -6.57653,2.30944 l -5.26339,0.41788 -5.18098,-0.40824 c 0,0 -3.801323,-1.38806 -7.259581,-1.97454 -1.981594,-0.33606 -7.792884,-0.84597 -7.792884,-0.84597 z"
                id="upper_lip"
              />
              <path
                d="m 85.436328,185.95002 c -6.713291,0.92704 8.791466,9.22541 15.437402,10.55176 1.99604,0.39836 2.73239,-1.08972 6.02951,-0.96472 2.34754,0.089 5.90892,0.72354 5.90892,0.72354 0,0 23.4108,-8.90255 16.64271,-10.0694 -1.55187,-0.26755 -6.96987,-0.53459 -11.1546,0.36177 -2.80054,0.59987 -3.92145,1.79506 -6.63372,2.23104 -2.6999,0.43399 -5.48453,0.56262 -8.20013,0.24118 -2.89537,-0.34272 -8.441317,-2.29122 -8.441317,-2.29122 0,0 -8.519905,-0.93155 -9.588775,-0.78395 z"
                id="lower_lip"
              />
            </g>
          </svg>
        </div>

        <div id="goat_beard" style={{ transform: `translateZ(${zLayers.goat_beard}px)` }}>
          <svg viewBox={viewBox}>
            <g id="goat_beard_g" transform={gTransform}>
              <path d="m 90.098837,196.56656 c 0,0 2.887714,1.39103 7.974586,2.93801 2.748957,0.83599 8.394307,-1.95867 8.394307,-1.95867 0,0 6.1345,1.8617 8.81401,1.25914 6.17871,-1.38945 8.53421,-2.09857 8.53421,-2.09857 0,0 -2.37581,6.13818 -2.6582,9.37363 -0.15897,1.82138 -0.0364,3.72787 0.55962,5.4563 0.97012,2.81331 5.43306,8.29264 5.43306,8.29264 0,0 -13.40446,4.45467 -19.69708,4.40919 -7.36474,-0.0532 -21.36093,-4.46631 -21.36093,-4.46631 0,0 3.695996,-5.8832 4.566037,-8.37542 0.680664,-1.94975 0.731538,-4.09093 0.699526,-6.15583 -0.04529,-2.92132 -1.259146,-8.67411 -1.259146,-8.67411 z" />
            </g>
          </svg>
        </div>

        <div id="chin_beard" style={{ transform: `translateZ(${zLayers.chin_beard}px)` }}>
          <svg viewBox={viewBox}>
            <g id="chin_beard_g" transform={gTransform}>
              <path d="m 170.40873,136.70018 c 0,0 -2.56074,20.71337 -9.3727,30.78779 -6.81196,10.07443 -12.82277,12.79395 -14.88127,18.59435 -4.11699,11.60079 -4.72839,21.29599 -4.72839,21.29599 0,0 -12.49833,10.83383 -18.61708,12.36602 -3.05938,0.76609 -7.88682,2.17991 -13.77229,2.49139 -5.88547,0.31148 -12.558798,-1.15481 -16.608206,-2.09633 -8.098824,-1.88306 -17.118155,-9.75364 -17.118155,-9.75364 0,0 0.679684,-11.31312 -6.15837,-22.34407 -3.511336,-5.66439 -7.840823,-7.38749 -15.37884,-19.21063 -7.011427,-10.99719 -10.584637,-34.69188 -10.584637,-34.69188 0,0 -3.03469,18.90179 -1.016406,34.0934 2.018286,15.1916 8.480693,43.33038 16.770673,55.54181 8.28998,12.21143 9.435549,20.56648 22.321403,25.0208 6.442928,2.22716 16.270348,3.3341 25.989378,3.29076 9.71903,-0.0433 19.32967,-1.23695 25.33904,-3.61089 12.01874,-4.74788 12.06411,-11.0954 20.19817,-23.90035 8.13406,-12.80496 18.08556,-46.42884 19.81988,-61.46415 1.73433,-15.0353 -2.2022,-26.41037 -2.2022,-26.41037 z" />
            </g>
          </svg>
        </div>

        <div id="mustache_beard" style={{ transform: `translateZ(${zLayers.mustache_beard}px)` }}>
          <svg viewBox={viewBox}>
            <g id="mustache_beard_g" transform={gTransform}>
              <path d="m 107.9862,166.31029 c 0,0 -7.87819,-2.27535 -12.531025,-2.24346 -2.810679,0.0193 -8.104846,3.0668 -11.503796,5.19877 -3.313881,2.07861 -7.322155,4.33055 -10.468794,7.15035 -3.289473,2.9478 -5.281921,7.71017 -5.341561,12.1268 -0.06528,4.8341 7.236921,13.15671 7.236921,13.15671 0,0 -1.962614,-9.48341 0.847607,-13.01235 3.905136,-4.90389 11.771363,-6.10316 18.023,-6.56708 8.896928,-0.66021 16.338748,-1.15464 24.876688,-0.50581 6.48493,0.4928 14.25976,2.51856 18.60047,7.36163 2.67122,2.98037 3.75353,11.40496 3.75353,11.40496 0,0 6.1663,-9.59693 5.6303,-14.86976 -0.51846,-5.10025 -1.93409,-5.89185 -5.74292,-9.32321 -2.45436,-2.21112 -7.30624,-5.05024 -10.03914,-7.03625 -2.77029,-2.01318 -8.67615,-6.0339 -11.97962,-6.0318 -3.00425,0.002 -11.36166,3.1905 -11.36166,3.1905 z" />
            </g>
          </svg>
        </div>

        <div id="ears" style={{ transform: `translateZ(${zLayers.ears}px)` }}>
          <svg viewBox={viewBox}>
            <g id="ears_g" transform={gTransform}>
              <path
                d="m 167.94776,113.21394 c 1.11543,-1.71889 2.17585,-4.03915 4.20888,-3.78314 2.51211,0.31634 3.06507,4.19309 3.6658,6.65274 1.75077,7.16837 -0.64322,14.75216 -0.54308,22.13055 0.0357,2.62816 1.29496,5.40069 0.40731,7.87467 -0.72481,2.02015 -2.4262,3.78972 -4.34465,4.75196 -1.21965,0.61175 -3.99319,1.76944 -4.07311,0.40731 -0.46796,-7.9757 -0.55993,-22.26215 -1.08616,-33.12794 -0.0736,-1.51954 0.93687,-3.62998 1.76501,-4.90615 z"
                id="right_ear"
              />
              <path
                d="m 45.896663,115.66779 c -0.838533,-1.62659 -1.565075,-4.43329 -3.536353,-4.47198 -1.694236,-0.0332 -2.37593,2.58232 -2.851177,4.20888 -2.361647,8.08285 1.242149,16.85133 0.678852,25.25326 -0.113477,1.69257 -1.147816,3.36017 -0.81462,5.0235 0.387266,1.93325 1.484264,3.92673 3.122716,5.0235 0.915053,0.61253 2.498967,1.34036 3.258484,0.54308 0.751947,-0.78933 1.878946,-23.39304 2.036553,-30.41253 0.03862,-1.71992 -1.21365,-3.84708 -1.894455,-5.16771 z"
                id="left_ear"
              />
            </g>
          </svg>
        </div>

        <div id="eye_accents_lower" style={{ transform: `translateZ(${zLayers.eye_accents_lower}px)` }}>
          <svg viewBox={viewBox}>
            <g id="eye_accents_lower_g" class="eye_accents_g" transform={gTransform}>
              <path
                d="m 124.23598,121.8412 c 2.17007,2.17007 6.32937,4.70182 15.00965,5.06349"
                id="eye_accent_right_lower"
              />
              <path
                d="m 90.962558,122.97156 c 1.376072,-1.76924 0.149156,3.52454 -14.062055,6.28549"
                id="eye_accent_left_lower"
              />
            </g>
          </svg>
        </div>

        <div id="eye_accents_upper" style={{ transform: `translateZ(${zLayers.eye_accents_upper}px)` }}>
          <svg viewBox={viewBox}>
            <g id="eye_accents_upper_g" class="eye_accents_g" transform={gTransform}>
              <path
                d="m 125.32151,119.71549 c 0,0 4.34014,4.34014 7.77608,4.70182"
                id="eye_accent_right_upper"
              />
              <path
                d="m 90.781237,119.71549 c 0,0 -0.542518,3.61679 -8.499441,5.9677"
                id="eye_accent_left_upper"
              />
            </g>
          </svg>
        </div>

        <div id="eyebrows" style={{ transform: `translateZ(${zLayers.eyebrows}px)` }}>
          <svg viewBox={viewBox}>
            <g id="eyebrows_g" transform={gTransform}>
              <path
                d="m 120.73365,103.41618 c -1.24258,-0.65751 -0.55347,-5.921409 2.03541,-6.719809 2.5889,-0.798411 22.18782,-4.192653 30.08948,-4.472388 4.77154,-0.169258 10.93421,4.623256 12.06077,6.395411 1.5625,2.457886 0.87698,6.865566 0.87698,6.865566 0,0 -4.28886,-3.22383 -9.90611,-5.20223 -5.47519,-1.928357 -11.62401,-1.621243 -17.38903,-0.942428 -6.14445,0.723488 -16.52492,4.733388 -17.7675,4.075878 z"
                id="right_eyebrow"
              />
              <path
                d="m 94.59267,104.27805 c 1.217165,-0.70344 0.332021,-5.937952 -2.284874,-6.639146 -2.616893,-0.701194 -22.328872,-3.361368 -30.235464,-3.345903 -4.774534,0.0093 -10.753984,5.028252 -11.813607,6.841229 -1.469647,2.51451 -0.62005,6.89353 -0.62005,6.89353 0,0 4.165513,-3.38171 9.704999,-5.56844 5.399378,-2.13143 11.555372,-2.05409 17.341717,-1.59098 6.167183,0.49359 16.690112,4.11315 17.907277,3.40971 z"
                id="left_eyebrow"
              />
            </g>
          </svg>
        </div>

        <div id="head_accents_upper" style={{ transform: `translateZ(${zLayers.head_accents_upper}px)` }}>
          <svg viewBox={viewBox}>
            <g id="head_accents_upper_g" class="head_accents_g" transform={gTransform}>
              <path
                d="m 89.672003,58.259953 c 0,0 12.618517,-2.684788 31.412047,-0.268478"
                id="forehead_upper_accent"
              />
            </g>
          </svg>
        </div>

        <div id="head_accents_middle" style={{ transform: `translateZ(${zLayers.head_accents_middle}px)` }}>
          <svg viewBox={viewBox}>
            <g id="head_accents_middle_g" class="head_accents_g" transform={gTransform}>
              <path
                d="m 78.664363,67.119764 c 0,0 26.042467,-5.101103 55.038207,0"
                id="forehead_middle_accent"
              />
            </g>
          </svg>
        </div>

        <div id="head_accents_lower" style={{ transform: `translateZ(${zLayers.head_accents_lower}px)` }}>
          <svg viewBox={viewBox}>
            <g id="head_accents_lower_g" class="head_accents_g" transform={gTransform}>
              <path
                d="m 73.026301,75.979572 c 0,0 41.614249,-8.322852 66.045849,0"
                id="forehead_lower_accent"
              />
            </g>
          </svg>
        </div>

        <div id="nose" style={{ transform: `translateZ(${zLayers.nose}px)` }}>
          <svg viewBox={viewBox}>
            <g id="nose_g" transform={gTransform}>
              <path
                d="m 96.962697,160.93226 c 0,0 -2.963189,1.78531 -4.35606,1.21002 -2.315057,-0.95617 -3.371739,-4.05239 -3.710721,-6.53409 -0.300086,-2.19695 1.613358,-6.45343 1.613358,-6.45343"
                id="nose_left"
              />
              <path
                d="m 120.5177,160.52892 c 0,0 3.61444,1.69471 5.16273,0.88735 2.1865,-1.14015 3.27951,-4.23313 3.14605,-6.69543 -0.13977,-2.5787 -2.61078,-4.45943 -4.03339,-6.61476 -1.70985,-2.59052 -4.0954,-4.76852 -5.40474,-7.58277 -0.81983,-1.7621 -1.45202,-5.64675 -1.45202,-5.64675"
                id="nose_right"
              />
            </g>
          </svg>
        </div>

        <div id="nose_center" style={{ transform: `translateZ(${zLayers.nose_center}px)` }}>
          <svg viewBox={viewBox}>
            <g id="nose_center_g" transform={gTransform}>
              <path
                d="m 94.139323,158.10889 c 0,0 4.213411,-0.8762 6.211417,-0.32267 1.62429,0.44999 2.58267,2.33138 4.19473,2.82337 2.2632,0.69071 4.80337,0.57472 7.09877,0 2.15884,-0.54053 3.70822,-2.701 5.88875,-3.14604 1.7985,-0.36707 5.48541,0.484 5.48541,0.484"
              />
            </g>
          </svg>
        </div>

        <div id="glasses" style={{ transform: `translateZ(${zLayers.glasses}px)` }}>
          <svg viewBox={viewBox}>
            <g id="glasses_g" transform={gTransform}>
              <path
                d="m 69.01604,98.822046 c 0,0 26.299417,-0.956345 29.009052,11.157324 2.709638,12.11367 -6.375615,24.22734 -6.375615,24.22734 0,0 -7.601875,8.63171 -21.677095,8.12891 -11.971915,-0.42766 -16.553773,-4.19996 -16.553773,-4.19996 0,0 -4.485758,-2.9726 -6.398442,-7.75432 -1.912686,-4.78171 -4.781714,-15.46086 -4.30354,-20.24258 0.478171,-4.78171 5.259882,-10.04159 13.548182,-10.838543 C 64.55311,98.503263 69.01604,98.822046 69.01604,98.822046 Z M 176.02029,84.148477"
                id="left_glasses"
              />
              <path
                d="m 146.66144,99.45069 c 0,0 -26.29942,-0.956345 -29.00905,11.15732 -2.70964,12.11367 6.37561,24.22734 6.37561,24.22734 0,0 7.60188,8.63171 21.6771,8.12891 11.97191,-0.42766 16.55377,-4.19996 16.55377,-4.19996 0,0 4.48576,-2.9726 6.39844,-7.75432 1.91269,-4.78171 4.78172,-15.46086 4.30354,-20.24258 -0.47817,-4.78171 -5.25988,-10.04159 -13.54818,-10.838539 -8.2883,-0.796954 -12.75123,-0.478171 -12.75123,-0.478171 z M 39.65719,84.777121"
                id="right_glasses"
              />
              <path
                d="m 98.248061,110.01268 c 0,0 10.327719,-2.78399 19.487959,0.0898"
                id="center_glasses"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
});
