
export const ORIENTATION = {
  ROTATED_0: 0,
  ROTATED_90: 1,
  ROTATED_180: 2,
  ROTATED_270: 3,
} as const;

export interface TownMap {
  id: string;
  backgroundImagePath: string,
  spawns: Spawn[],
  spaces: Space[],
  objects: TownObject[],
  collisions: string, // base64 encoded string from binary data. each byte is 0 (not impassable) or 1 (impassable) 
}

export interface Spawn {
  x: number,
  y: number,
};

export interface Space {
  spaceId: string,
  x: number,
  y: number,
};

export interface Portal {
  targetX: number,
  targetY: number,
  targetMap: string,
  x: number,
  y: number,
}

export interface TownObject {
  width: number,
  height: number,
  distThreshold?: number,
  x: number,
  y: number,
  templateId: string,
  id: string,
  highlighted: string,
  normal: string;
  type: number;
  _name: string;
  orientation: (typeof ORIENTATION)[keyof typeof ORIENTATION];
}
