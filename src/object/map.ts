export interface TownMap {
  id: string;
  name: string;
  backgroundImagePath: string,
  foregroundImagePath?: string,
  spawns: Spawn[],
  objects: { [objectId: string]: TownObject },
  collisions: string, // base64 encoded string from binary data. each byte is 0 (not impassable) or 1 (impassable)
  nooks: { [areaId: string]: Nook },
  portals: Portal[],
  dimensions: [number, number],
}

export interface Spawn {
  x: number,
  y: number,
  spawnId?: string,
};

export interface Nook {
  name: string;
  capacity?: number,
  nookCoords: {
    coords: Array<{
      x: number,
      y: number,
    }>
  }
};

export interface Portal {
  targetX: number,
  targetY: number,
  targetMap: string,
  x: number,
  y: number,
}

export const OBJECT_TYPE = {
  NON_INTERACTIVE: 0,
  IFRAME: 1,
  IMAGE_POSTER: 2,
  VIDEO: 3,
  EXTERNAL_CALL: 4,
  EXPERIMENTAL: 5,
  NOTE: 6,
  MODAL: 7,
} as const;

interface TownObjectCommon {
  width: number; // the width of the image (pixels wide / 32)
  height: number; // the height of the image (pixels tall / 32)
  distThreshold?: number;
  x: number; //  the x coordinate of the top left corner
  y: number; // the y coordinate of the top left corner
  id: string;
  normal: string; // a link to an img src for how the object should show up when you're not within interaction range
  zIndex: number;
  highlighted?: string; //a link to an img src for how the object should show up when you are within range (and this is the closest object)
  color?: string;
  orientation?: number;
  templateId?: string;
  _tags?: Array<string>;
  _name?: string;
}

export interface NonInteractiveObject extends TownObjectCommon {
  type: typeof OBJECT_TYPE.NON_INTERACTIVE;
}

export interface IFrameObject extends TownObjectCommon {
  type: typeof OBJECT_TYPE.IFRAME;
  properties: {
    url: string;
  }
}


export interface ImagePosterObject extends TownObjectCommon {
  type: typeof OBJECT_TYPE.IMAGE_POSTER;
  properties: {
    image: string;  // the image you fullscreen when you press x
    preview: string; // the preview image that pops up at the bottom when you're in range
    // optional bonus fields
    blurb: string; // text you can add that shows up when people hover on the fullscreened poster
    loading: string; // the image/icon to show when the main image is loading after you interact
  }
}

export interface VideoObject extends TownObjectCommon {
  type: typeof OBJECT_TYPE.VIDEO;
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
  type: typeof OBJECT_TYPE.EXTERNAL_CALL;
  properties: {
    zoomLink: string; // any url, usually to a zoom/webex/Meets/etc call
  }
}


export interface ExperimentalObject extends TownObjectCommon {
  type: typeof OBJECT_TYPE.EXPERIMENTAL;
}

export interface NoteObject extends TownObjectCommon {
  type: typeof OBJECT_TYPE.NOTE;
  properties: {
    message: string;// string, what shows up in the object
  }
}


export interface ModalObject extends TownObjectCommon {
  type: typeof OBJECT_TYPE.MODAL;
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

export type TownObject = NonInteractiveObject | IFrameObject | ImagePosterObject | VideoObject | ExternalCallObject | ExperimentalObject | NoteObject | ModalObject;
