import React, { forwardRef } from "react";

interface BlueCharacterProps {
  className?: string;
  style?: React.CSSProperties;
}

// Exact traced vector artwork paths from reference video (frame_05.50s.png & frame_01.00s.png)
const BLUE_HIGHFIVE_BODY = "M 635,188 L 626,190 L 587,230 L 545,254 L 495,260 L 463,248 L 456,248 L 452,252 L 454,266 L 464,277 L 484,287 L 501,289 L 504,293 L 486,325 L 460,348 L 458,361 L 462,367 L 480,367 L 528,329 L 535,331 L 538,337 L 538,369 L 542,373 L 552,374 L 561,367 L 575,278 L 586,263 L 636,221 L 637,216 L 630,206 L 630,195 Z";
const BLUE_HIGHFIVE_HEAD = "M 518,176 L 513,178 L 504,184 L 498,191 L 498,193 L 496,195 L 494,200 L 493,206 L 494,222 L 496,224 L 496,227 L 498,228 L 498,230 L 500,233 L 508,241 L 510,241 L 516,245 L 523,247 L 536,247 L 543,245 L 545,243 L 547,243 L 548,241 L 550,241 L 557,235 L 563,225 L 565,217 L 565,204 L 563,201 L 563,197 L 561,195 L 561,193 L 559,190 L 551,182 L 548,180 L 546,180 L 545,178 L 542,178 L 540,176 L 531,175 Z";

const BLUE_RUN_BODY = "M 84,326 L 46,344 L 20,375 L 12,396 L 12,408 L 19,413 L 26,413 L 33,407 L 52,375 L 60,374 L 52,414 L 40,441 L 30,454 L 0,473 L 0,497 L 11,497 L 52,479 L 83,447 L 96,469 L 98,515 L 102,521 L 113,523 L 121,517 L 127,473 L 117,430 L 119,413 L 125,411 L 146,430 L 155,429 L 159,418 L 133,379 L 127,340 L 119,332 L 103,326 Z";
const BLUE_RUN_HEAD = "M 91,248 L 80,256 L 72,268 L 72,271 L 70,274 L 70,287 L 72,290 L 72,295 L 74,296 L 74,299 L 82,309 L 85,311 L 87,311 L 88,313 L 97,317 L 117,317 L 129,311 L 137,303 L 137,300 L 139,299 L 139,297 L 141,295 L 141,292 L 143,289 L 143,274 L 141,271 L 141,268 L 139,267 L 139,264 L 135,258 L 121,248 L 118,248 L 116,246 L 98,246 L 95,248 Z";

export const BlueCharacter = forwardRef<SVGGElement, BlueCharacterProps>(
  ({ className, style }, ref) => {
    return (
      <g ref={ref} className={className} style={style} id="blue-character">
        {/* 1. Running Entrance Pose (Traced from frame_01.00s.png) */}
        <g id="blue-run-pose" opacity="1">
          {/* Motion Trail 2 */}
          <g transform="translate(-80, -20)" opacity="0.2" className="blue-trail">
            <path d={BLUE_RUN_BODY} fill="#357AC8" />
            <path d={BLUE_RUN_HEAD} fill="#357AC8" />
          </g>
          {/* Motion Trail 1 */}
          <g transform="translate(-40, -10)" opacity="0.4" className="blue-trail">
            <path d={BLUE_RUN_BODY} fill="#357AC8" />
            <path d={BLUE_RUN_HEAD} fill="#357AC8" />
          </g>
          {/* Main Running Figure */}
          <g id="blue-run-main">
            <path d={BLUE_RUN_BODY} fill="#357AC8" />
            <path d={BLUE_RUN_HEAD} fill="#357AC8" />
          </g>
        </g>

        {/* 2. High-Five Settled Pose (Traced from frame_05.50s.png) */}
        <g id="blue-highfive-pose" opacity="0">
          <ellipse
            cx="530"
            cy="375"
            rx="45"
            ry="7"
            fill="rgba(53, 122, 200, 0.15)"
            className="blue-character-shadow"
          />
          <path d={BLUE_HIGHFIVE_BODY} fill="#357AC8" className="blue-body" />
          <path d={BLUE_HIGHFIVE_HEAD} fill="#357AC8" className="blue-head" />
        </g>
      </g>
    );
  }
);

BlueCharacter.displayName = "BlueCharacter";
