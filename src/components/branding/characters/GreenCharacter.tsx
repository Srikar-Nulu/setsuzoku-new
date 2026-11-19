import React, { forwardRef } from "react";

interface GreenCharacterProps {
  className?: string;
  style?: React.CSSProperties;
}

// Exact traced vector artwork paths from reference video (frame_05.50s.png & frame_01.00s.png)
const GREEN_HIGHFIVE_BODY = "M 634,192 L 632,207 L 640,219 L 679,253 L 702,280 L 712,358 L 720,373 L 727,375 L 737,369 L 737,336 L 743,329 L 754,333 L 795,367 L 807,370 L 815,366 L 817,351 L 784,318 L 772,292 L 797,285 L 814,275 L 825,260 L 823,250 L 814,248 L 783,260 L 758,260 L 730,254 L 692,232 L 649,188 L 642,187 Z";
const GREEN_HIGHFIVE_HEAD = "M 738,176 L 737,178 L 734,178 L 724,184 L 720,188 L 720,190 L 716,195 L 716,199 L 714,200 L 714,223 L 716,225 L 718,231 L 722,236 L 730,243 L 733,243 L 734,245 L 739,245 L 742,247 L 754,247 L 761,245 L 763,243 L 769,241 L 779,231 L 779,229 L 783,223 L 784,215 L 783,200 L 781,195 L 775,186 L 767,180 L 761,178 L 759,176 Z";

const GREEN_RUN_BODY = "M 1193,326 L 1170,328 L 1156,336 L 1150,346 L 1150,363 L 1144,384 L 1121,418 L 1122,427 L 1133,430 L 1155,410 L 1160,412 L 1164,426 L 1152,463 L 1158,516 L 1166,523 L 1177,521 L 1181,514 L 1183,468 L 1194,448 L 1200,448 L 1226,477 L 1262,495 L 1279,496 L 1279,474 L 1256,460 L 1235,435 L 1218,374 L 1221,372 L 1230,379 L 1251,411 L 1261,411 L 1267,400 L 1257,373 L 1247,358 L 1231,344 Z";
const GREEN_RUN_HEAD = "M 1164,246 L 1161,248 L 1158,248 L 1156,250 L 1154,250 L 1144,259 L 1144,261 L 1142,262 L 1140,266 L 1140,269 L 1138,270 L 1138,275 L 1136,278 L 1136,285 L 1138,288 L 1138,293 L 1140,296 L 1140,299 L 1150,311 L 1153,311 L 1154,313 L 1156,313 L 1158,315 L 1161,315 L 1163,317 L 1181,317 L 1184,315 L 1187,315 L 1188,313 L 1190,313 L 1193,311 L 1203,301 L 1203,298 L 1205,297 L 1205,294 L 1207,291 L 1207,270 L 1205,269 L 1205,266 L 1203,264 L 1203,262 L 1191,250 L 1188,250 L 1187,248 L 1183,248 L 1180,246 Z";

export const GreenCharacter = forwardRef<SVGGElement, GreenCharacterProps>(
  ({ className, style }, ref) => {
    return (
      <g ref={ref} className={className} style={style} id="green-character">
        {/* 1. Running Entrance Pose (Traced from frame_01.00s.png) */}
        <g id="green-run-pose" opacity="1">
          {/* Motion Trail 2 */}
          <g transform="translate(80, -20)" opacity="0.2" className="green-trail">
            <path d={GREEN_RUN_BODY} fill="#34A486" />
            <path d={GREEN_RUN_HEAD} fill="#34A486" />
          </g>
          {/* Motion Trail 1 */}
          <g transform="translate(40, -10)" opacity="0.4" className="green-trail">
            <path d={GREEN_RUN_BODY} fill="#34A486" />
            <path d={GREEN_RUN_HEAD} fill="#34A486" />
          </g>
          {/* Main Running Figure */}
          <g id="green-run-main">
            <path d={GREEN_RUN_BODY} fill="#34A486" />
            <path d={GREEN_RUN_HEAD} fill="#34A486" />
          </g>
        </g>

        {/* 2. High-Five Settled Pose (Traced from frame_05.50s.png) */}
        <g id="green-highfive-pose" opacity="0">
          <ellipse
            cx="750"
            cy="375"
            rx="45"
            ry="7"
            fill="rgba(52, 164, 134, 0.15)"
            className="green-character-shadow"
          />
          <path d={GREEN_HIGHFIVE_BODY} fill="#34A486" className="green-body" />
          <path d={GREEN_HIGHFIVE_HEAD} fill="#34A486" className="green-head" />
        </g>
      </g>
    );
  }
);

GreenCharacter.displayName = "GreenCharacter";
