
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
  nooks: { [areaId: string]: Nook },
}

export interface Nook {
  name: string;
  nookCoords: {
    coords: {
      x: number,
      y: number,
    }
  }
};
export interface Spawn {
  x: number,
  y: number,
  spawnId?: string,
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

interface TownObjectCommon {
  width: number; // the width of the image (pixels wide / 32)
  height: number; // the height of the image (pixels tall / 32)
  distThreshold?: number;
  x: number; //  the x coordinate of the top left corner
  y: number; // the y coordinate of the top left corner
  id: string;
  normal: string; // a link to an img src for how the object should show up when you're not within interaction range
  highlighted: string; //a link to an img src for how the object should show up when you are within range (and this is the closest object)
  orientation?: (typeof ORIENTATION)[keyof typeof ORIENTATION];
}

export interface NonInteractiveObject extends TownObjectCommon {
  type: 0;
}

export interface IFrameObject extends TownObjectCommon {
  type: 1;
  properties: {
    url: string;
  }
}


export interface ImagePosterObject extends TownObjectCommon {
  type: 2;
  properties: {
    image: string;  // the image you fullscreen when you press x
    preview: string; // the preview image that pops up at the bottom when you're in range
    // optional bonus fields
    blurb: string; // text you can add that shows up when people hover on the fullscreened poster
    loading: string; // the image/icon to show when the main image is loading after you interact
  }
}

export interface VideoObject extends TownObjectCommon {
  type: 3;
  properties: {
    video: string; // url of video you want. must be embedable
    // optional property for synced TV's
    startTime?: {
      _timezone: string; // string, timezone, like "America/Los_Angeles"
      _seconds: number; // number, Unix time
      _nanoseconds: number;// number, always 0
    }
  }
}

export interface ExternalCallObject extends TownObjectCommon {
  properties: {
    zoomLink: string; // any url, usually to a zoom/webex/Meets/etc call
  }
}

export interface NoteObject extends TownObjectCommon {
  type: 6;
  properties: {
    message: string;// string, what shows up in the object
  }
}


export interface ModalObject extends TownObjectCommon {
  type: 7;
  properties: {
    extensionData: {
      entries: Array<{
        type: string;
        value: string;
        key: string;
      }>
    }
  }
}

export type TownObject = NonInteractiveObject | IFrameObject | ImagePosterObject | VideoObject | ExternalCallObject | NoteObject | ModalObject;
