export interface TownMap {
    id: string;
    name: string;
    backgroundImagePath: string;
    foregroundImagePath?: string;
    spawns: Spawn[];
    objects: {
        [objectId: string]: TownObject;
    };
    collisions: string;
    nooks: {
        [areaId: string]: Nook;
    };
    portals: Portal[];
    dimensions: [number, number];
}
export interface Spawn {
    x: number;
    y: number;
    spawnId?: string;
}
export interface Nook {
    name: string;
    capacity?: number;
    nookCoords: {
        coords: Array<{
            x: number;
            y: number;
        }>;
    };
}
export interface Portal {
    targetX: number;
    targetY: number;
    targetMap: string;
    x: number;
    y: number;
}
export declare const OBJECT_TYPE: {
    readonly NON_INTERACTIVE: 0;
    readonly IFRAME: 1;
    readonly IMAGE_POSTER: 2;
    readonly VIDEO: 3;
    readonly EXTERNAL_CALL: 4;
    readonly EXPERIMENTAL: 5;
    readonly NOTE: 6;
    readonly MODAL: 7;
};
interface TownObjectCommon {
    width: number;
    height: number;
    distThreshold?: number;
    x: number;
    y: number;
    id: string;
    normal: string;
    zIndex: number;
    highlighted?: string;
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
    };
}
export interface ImagePosterObject extends TownObjectCommon {
    type: typeof OBJECT_TYPE.IMAGE_POSTER;
    properties: {
        image: string;
        preview: string;
        blurb: string;
        loading: string;
    };
}
export interface VideoObject extends TownObjectCommon {
    type: typeof OBJECT_TYPE.VIDEO;
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
    type: typeof OBJECT_TYPE.EXTERNAL_CALL;
    properties: {
        zoomLink: string;
    };
}
export interface ExperimentalObject extends TownObjectCommon {
    type: typeof OBJECT_TYPE.EXPERIMENTAL;
}
export interface NoteObject extends TownObjectCommon {
    type: typeof OBJECT_TYPE.NOTE;
    properties: {
        message: string;
    };
}
export interface ModalObject extends TownObjectCommon {
    type: typeof OBJECT_TYPE.MODAL;
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
export declare type TownObject = NonInteractiveObject | IFrameObject | ImagePosterObject | VideoObject | ExternalCallObject | ExperimentalObject | NoteObject | ModalObject;
export {};
