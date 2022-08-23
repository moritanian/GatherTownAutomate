/// <reference types="node" />
import { TownMap } from './object/map';
export declare type Credential = {
    key: string;
};
export declare class MapMaker {
    private credential;
    constructor(credential: Credential);
    private handleError;
    getMap(spaceId: string, mapId: string): Promise<TownMap>;
    setMap(spaceId: string, mapId: string, map: TownMap): Promise<void>;
    uploadImage(spaceId: string, image: Buffer): Promise<string>;
    setCollision(map: TownMap, x: number, y: number, value: boolean): void;
    getCollision(map: TownMap, x: number, y: number): boolean;
}
