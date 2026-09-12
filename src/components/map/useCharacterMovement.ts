import { useState, useEffect, useRef, useCallback } from 'react';
import type { Point2D, FacingDirection } from '../../types/map';

interface UseCharacterMovementProps {
  initialPosition: Point2D;
  onMovementComplete?: (targetLevel: number) => void;
}

export interface CharacterMovementState {
  currentPosition: Point2D;
  facing: FacingDirection;
  isWalking: boolean;
  walkCycle: number; // 0 to 1
  startWalkingAlongPath: (waypoints: Point2D[], targetLevel: number, speedMultiplier?: number) => void;
  teleportToPosition: (pos: Point2D) => void;
}

export const useCharacterMovement = ({
  initialPosition,
  onMovementComplete,
}: UseCharacterMovementProps): CharacterMovementState => {
  const [currentPosition, setCurrentPosition] = useState<Point2D>(initialPosition);
  const [facing, setFacing] = useState<FacingDirection>('up');
  const [isWalking, setIsWalking] = useState(false);
  const [walkCycle, setWalkCycle] = useState(0);

  const animFrameRef = useRef<number | null>(null);
  const movementRef = useRef<{
    waypoints: Point2D[];
    targetLevel: number;
    totalDistance: number;
    segmentDistances: number[];
    startTime: number;
    duration: number;
    speedMultiplier: number;
  } | null>(null);

  // Sync position if initialPosition changes when not in motion
  useEffect(() => {
    if (!isWalking) {
      setCurrentPosition(initialPosition);
    }
  }, [initialPosition, isWalking]);

  const teleportToPosition = useCallback((pos: Point2D) => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    movementRef.current = null;
    setIsWalking(false);
    setWalkCycle(0);
    setCurrentPosition(pos);
  }, []);

  const startWalkingAlongPath = useCallback(
    (waypoints: Point2D[], targetLevel: number, speedMultiplier: number = 1) => {
      if (waypoints.length < 2) return;

      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }

      // Calculate total path distance and individual segment distances
      const segmentDistances: number[] = [];
      let totalDist = 0;

      for (let i = 0; i < waypoints.length - 1; i++) {
        const p1 = waypoints[i];
        const p2 = waypoints[i + 1];
        const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        segmentDistances.push(dist);
        totalDist += dist;
      }

      if (totalDist === 0) return;

      // Base Speed: ~110 pixels per second, scaled by speedMultiplier
      const baseSpeed = 110;
      const walkSpeed = baseSpeed * Math.max(0.2, speedMultiplier);
      const duration = (totalDist / walkSpeed) * 1000; // ms

      movementRef.current = {
        waypoints,
        targetLevel,
        totalDistance: totalDist,
        segmentDistances,
        startTime: performance.now(),
        duration,
        speedMultiplier,
      };

      setIsWalking(true);

      const step = (now: number) => {
        if (!movementRef.current) return;

        const { waypoints, targetLevel, totalDistance, segmentDistances, startTime, duration, speedMultiplier } =
          movementRef.current;
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);

        // Distance travelled along path
        const travelledDist = progress * totalDistance;

        // Find which segment we are currently on
        let accumulated = 0;
        let currentSegIndex = 0;
        let segmentT = 0;

        for (let i = 0; i < segmentDistances.length; i++) {
          const segDist = segmentDistances[i];
          if (accumulated + segDist >= travelledDist || i === segmentDistances.length - 1) {
            currentSegIndex = i;
            const segTravelled = travelledDist - accumulated;
            segmentT = segDist > 0 ? Math.min(1, Math.max(0, segTravelled / segDist)) : 0;
            break;
          }
          accumulated += segDist;
        }

        const p1 = waypoints[currentSegIndex];
        const p2 = waypoints[currentSegIndex + 1] || p1;

        // Interpolated coordinate along the curve
        const curX = p1.x + (p2.x - p1.x) * segmentT;
        const curY = p1.y + (p2.y - p1.y) * segmentT;
        setCurrentPosition({ x: curX, y: curY });

        // Calculate facing direction based on segment vector
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;

        if (Math.abs(dx) > Math.abs(dy) * 1.2) {
          setFacing(dx > 0 ? 'right' : 'left');
        } else {
          setFacing(dy > 0 ? 'down' : 'up');
        }

        // Continuous walking cadence scaled with speed (steps cadence)
        const stepCadence = Math.max(80, 380 / speedMultiplier);
        const cycleProgress = (elapsed % stepCadence) / stepCadence;
        setWalkCycle(cycleProgress);

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(step);
        } else {
          // Arrived at destination node
          setCurrentPosition(waypoints[waypoints.length - 1]);
          setIsWalking(false);
          setWalkCycle(0);
          movementRef.current = null;
          animFrameRef.current = null;

          if (onMovementComplete) {
            onMovementComplete(targetLevel);
          }
        }
      };

      animFrameRef.current = requestAnimationFrame(step);
    },
    [onMovementComplete]
  );

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return {
    currentPosition,
    facing,
    isWalking,
    walkCycle,
    startWalkingAlongPath,
    teleportToPosition,
  };
};
