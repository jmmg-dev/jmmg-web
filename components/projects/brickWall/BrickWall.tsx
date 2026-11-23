"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Castle wall built brick by brick, a metaphor for building new projects.
 * A wall with a tower at each end: bricks drop into place row by row from the bottom
 * (most in grey, some in the theme colour), the towers keep rising above the wall, the
 * battlements are laid and a flag is raised on each tower. It plays once, when the castle
 * scrolls into view, and does not loop.
 */

const WIDTH = 460;
const BRICK_W = 24;
const BRICK_H = 10;
const GAP = 2;
const PITCH_X = BRICK_W + GAP;
const PITCH_Y = BRICK_H + GAP;
/** Rows of the wall between the towers */
const WALL_ROWS = 5;
/** Rows of each tower: they rise above the wall */
const TOWER_ROWS = 7;
/** Width of each tower, two bricks */
const TOWER_W = 2 * PITCH_X - GAP;
/** Room above the towers' battlements for the flags */
const FLAG_H = 20;
const HEIGHT = (TOWER_ROWS + 1) * PITCH_Y + FLAG_H;
/** Delay between one brick and the next */
const STEP_MS = 24;

type Brick = { x: number; y: number; w: number; theme: boolean; delay: number };

/** Top of the bricks in a row, counting rows from the bottom */
const rowY = (row: number) => HEIGHT - (row + 1) * PITCH_Y;

/** Builds the castle once, deterministically, in the order the bricks are laid */
const buildBricks = () => {
  const bricks: Brick[] = [];
  let order = 0;
  const lay = (x: number, w: number, row: number, theme: boolean) =>
    bricks.push({ x, y: rowY(row), w, theme, delay: order++ * STEP_MS });

  /** A running-bond row between x0 and x1: every other row is shifted by half a brick */
  const fillRow = (x0: number, x1: number, row: number) => {
    const start = x0 - (row % 2 ? PITCH_X / 2 : 0);
    for (let x = start; x < x1; x += PITCH_X) {
      const left = Math.max(x0, x);
      const right = Math.min(x1, x + BRICK_W);
      if (right - left < 4) continue;
      // Roughly one in five bricks in the theme colour, scattered without a visible pattern
      lay(
        left,
        right - left,
        row,
        (Math.round(left / PITCH_X) * 7 + row * 11) % 5 === 0,
      );
    }
  };

  const towers = [
    [0, TOWER_W],
    [WIDTH - TOWER_W, WIDTH],
  ] as const;
  const wall = [TOWER_W + GAP, WIDTH - TOWER_W - GAP] as const;

  for (let row = 0; row <= TOWER_ROWS; row++) {
    if (row < WALL_ROWS) {
      // Wall and towers rise together
      fillRow(towers[0][0], towers[0][1], row);
      fillRow(wall[0], wall[1], row);
      fillRow(towers[1][0], towers[1][1], row);
    } else if (row === WALL_ROWS) {
      // Wall battlements (every other slot, away from the towers) while the towers keep rising
      fillRow(towers[0][0], towers[0][1], row);
      for (
        let x = wall[0] + PITCH_X, col = 1;
        x + BRICK_W <= wall[1] - PITCH_X;
        x += PITCH_X, col++
      ) {
        if (col % 2) lay(x, BRICK_W, row, col % 4 === 1);
      }
      fillRow(towers[1][0], towers[1][1], row);
    } else if (row < TOWER_ROWS) {
      for (const [x0, x1] of towers) fillRow(x0, x1, row);
    } else {
      // Tower battlements: a merlon at each corner
      const merlon = (TOWER_W - 2 * GAP) / 3;
      for (const [x0, x1] of towers) {
        lay(x0, merlon, row, false);
        lay(x1 - merlon, merlon, row, true);
      }
    }
  }
  return { bricks, total: order * STEP_MS };
};

const { bricks: BRICKS, total: BUILD_MS } = buildBricks();
/** A flag in the middle of each tower, standing between its merlons */
const FLAGS = [TOWER_W / 2, WIDTH - TOWER_W / 2];
const POLE_TOP = rowY(TOWER_ROWS) + BRICK_H - FLAG_H - BRICK_H;
const POLE_H = FLAG_H + BRICK_H;

export const BrickWall = ({ className = "" }: { className?: string }) => {
  const ref = useRef<SVGSVGElement>(null);
  const [built, setBuilt] = useState(false);

  // Start building the first time at least half of the castle is visible
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBuilt(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMinYMax meet"
      className={`brick-wall ${className}`}
      data-built={built || undefined}
    >
      {BRICKS.map((b) => (
        <rect
          key={`${b.x}-${b.y}`}
          className="brick"
          data-tone={b.theme ? "theme" : "grey"}
          x={b.x}
          y={b.y}
          width={b.w}
          height={BRICK_H}
          rx={1.5}
          style={{ "--d": `${b.delay}ms` } as CSSProperties}
        />
      ))}
      {/* A flag raised on each tower once the castle is finished */}
      {FLAGS.map((cx, i) => (
        <g
          key={cx}
          className="brick-flag"
          style={{ "--d": `${BUILD_MS + 250 + i * 150}ms` } as CSSProperties}
        >
          <rect
            x={cx - 0.75}
            y={POLE_TOP}
            width={1.5}
            height={POLE_H}
            rx={0.75}
          />
          <path d={`M ${cx + 0.75} ${POLE_TOP} l 12 4 l -12 4 z`} />
        </g>
      ))}
    </svg>
  );
};
