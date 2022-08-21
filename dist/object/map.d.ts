export declare const ORIENTATION: {
    readonly ROTATED_0: 0;
    readonly ROTATED_90: 1;
    readonly ROTATED_180: 2;
    readonly ROTATED_270: 3;
};
export interface TownMap {
    id: string;
    backgroundImagePath: string;
    spawns: Spawn[];
    spaces: Space[];
    objects: TownObject[];
    collisions: string;
    nooks: {
        [areaId: string]: Nook;
    };
}
export interface Nook {
    name: string;
    nookCoords: {
        coords: {
            x: number;
            y: number;
        };
    };
}
export interface Spawn {
    x: number;
    y: number;
    spawnId?: string;
}
export interface Space {
    spaceId: string;
    x: number;
    y: number;
}
export interface Portal {
    targetX: number;
    targetY: number;
    targetMap: string;
    x: number;
    y: number;
}
interface TownObjectCommon {
    width: number;
    height: number;
    distThreshold?: number;
    x: number;
    y: number;
    id: string;
    normal: string;
    highlighted: string;
    orientation?: (typeof ORIENTATION)[keyof typeof ORIENTATION];
}
export interface NonInteractiveObject extends TownObjectCommon {
    type: 0;
}
export interface IFrameObject extends TownObjectCommon {
    type: 1;
    properties: {
        url: string;
    };
}
export interface ImagePosterObject extends TownObjectCommon {
    type: 2;
    properties: {
        image: string;
        preview: string;
        blurb: string;
        loading: string;
    };
}
export interface VideoObject extends TownObjectCommon {
    type: 3;
    properties: {
        video: string;
        startTime?: {
            _timezone: string;
            _seconds: number;
            _nanoseconds: number;
        };
    };
}
export interface ExternalCallObject extends TownObjectCommon {
    properties: {
        zoomLink: string;
    };
}
export interface NoteObject extends TownObjectCommon {
    type: 6;
    properties: {
        message: string;
    };
}
export interface ModalObject extends TownObjectCommon {
    type: 7;
    properties: {
        extensionData: {
            entries: Array<{
                type: string;
                value: string;
                key: string;
            }>;
        };
    };
}
export declare type TownObject = NonInteractiveObject | IFrameObject | ImagePosterObject | VideoObject | ExternalCallObject | NoteObject | ModalObject;
export {};
