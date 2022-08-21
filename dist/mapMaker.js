"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapMaker = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
class MapMaker {
    credential;
    constructor(credential) {
        this.credential = credential;
    }
    async handleError(res) {
        let content = "";
        if (res.headers.get("content-type")?.match(/^application\/json/)) {
            content = JSON.stringify(await res.json());
        }
        else if (res.headers.get("content-type")?.match(/^text/)) {
            content = await res.text();
        }
        throw new Error(`${res.status} ${res.url} ${res.statusText} ${content}`);
    }
    async getMap(spaceId, mapId) {
        const res = await (0, node_fetch_1.default)(`https://gather.town/api/getMap?spaceId=${spaceId}&mapId=${mapId}&apiKey=${this.credential.key}`);
        if (!res.ok) {
            await this.handleError(res);
        }
        return await res.json();
    }
    async setMap(spaceId, mapId, map) {
        const res = await (0, node_fetch_1.default)(`https://gather.town/api/setMap`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                apiKey: this.credential.key,
                spaceId: spaceId,
                mapId: mapId,
                mapContent: map
            }),
        });
        if (!res.ok) {
            await this.handleError(res);
        }
    }
    async uploadImage(spaceId, image) {
        const data = Array.from(image.values());
        const res = await (0, node_fetch_1.default)(`https://api.gather.town/api/uploadImage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                spaceId: spaceId,
                bytes: {
                    type: "Buffer",
                    data,
                }
            }),
        });
        if (!res.ok) {
            await this.handleError(res);
        }
        return await res.text();
    }
}
exports.MapMaker = MapMaker;
//# sourceMappingURL=mapMaker.js.map