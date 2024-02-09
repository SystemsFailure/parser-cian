"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_https_proxy_fix_1 = require("axios-https-proxy-fix");
var proxy_1 = require("./utils/proxy");
var parser_abstract_1 = require("./abstract/parser.abstract");
var types = [
    'suburbanrent', // Дом/дача
    'flatrent', // Квартира
];
var ParserCian = /** @class */ (function (_super) {
    __extends(ParserCian, _super);
    function ParserCian() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Основной метод parse(), отсюда все начинается
     */
    ParserCian.prototype.parse = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("[@] Parser started");
                        return [4 /*yield*/, this.customFetchData("https://api.cian.ru/search-offers/v2/search-offers-desktop", this.cities)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ParserCian.prototype.downloadFile = function (proxies, item, isExist) {
        return __awaiter(this, void 0, void 0, function () {
            var arrayPhotosUrls, arrayBuffersImages, _i, _a, photo, proxy, link, response, err_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        arrayPhotosUrls = [];
                        arrayBuffersImages = [];
                        if (!!isExist) return [3 /*break*/, 9];
                        _i = 0, _a = item.photos;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                        photo = _a[_i];
                        // Временная заглушка
                        if (photo === item.photos[3])
                            return [3 /*break*/, 7];
                        proxy = proxies[Math.floor(Math.random() * 10)];
                        link = photo.thumbnail2Url;
                        arrayPhotosUrls.push(link);
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, (0, axios_https_proxy_fix_1.default)({
                                method: 'get',
                                url: link,
                                responseType: 'arraybuffer',
                                proxy: proxy,
                                timeout: this.timeout,
                            })];
                    case 3:
                        response = _b.sent();
                        arrayBuffersImages.push(response.data);
                        // await s3.put(
                        //     'rent/' + galleryImageName,
                        //     response.data,
                        //     {
                        //         visibility: 'public',
                        //         contentType: 'image/png',
                        //     }
                        // )
                        // await instance
                        //     .related('rentObjectFiles')
                        //     .create({
                        //         path: galleryImageName,
                        //     })
                        return [4 /*yield*/, new Promise(function (resolve) {
                                return setTimeout(resolve, 1000);
                            })];
                    case 4:
                        // await s3.put(
                        //     'rent/' + galleryImageName,
                        //     response.data,
                        //     {
                        //         visibility: 'public',
                        //         contentType: 'image/png',
                        //     }
                        // )
                        // await instance
                        //     .related('rentObjectFiles')
                        //     .create({
                        //         path: galleryImageName,
                        //     })
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _b.sent();
                        console.error(err_1);
                        return [3 /*break*/, 6];
                    case 6:
                        _i++;
                        return [3 /*break*/, 1];
                    case 7: 
                    // await instance
                    //     .related('rentObjectCharacteristic')
                    //     .create({})
                    // await instance
                    //     .related('rentObjectInfrastructure')
                    //     .create({})
                    // await instance.related('rentObjectTerm').create({})
                    return [4 /*yield*/, new Promise(function (resolve) {
                            return setTimeout(resolve, _this.timeDelay);
                        })];
                    case 8:
                        // await instance
                        //     .related('rentObjectCharacteristic')
                        //     .create({})
                        // await instance
                        //     .related('rentObjectInfrastructure')
                        //     .create({})
                        // await instance.related('rentObjectTerm').create({})
                        _b.sent();
                        _b.label = 9;
                    case 9: return [2 /*return*/, {
                            arrayPhotosUrls: arrayPhotosUrls,
                            arrayBuffersImages: arrayBuffersImages
                        }];
                }
            });
        });
    };
    ParserCian.prototype.databaseModeling = function (model, data) {
        console.log(model, data);
        throw new Error('Method not implemented.');
    };
    ParserCian.prototype.customFetchData = function (url, citys) {
        return __awaiter(this, void 0, void 0, function () {
            var loopIndex, _i, citys_1, city, _loop_1, this_1, _a, types_1, _type, error_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 9, , 10]);
                        loopIndex = 0;
                        _b.label = 1;
                    case 1:
                        if (!(loopIndex < Number.MAX_SAFE_INTEGER)) return [3 /*break*/, 8];
                        _i = 0, citys_1 = citys;
                        _b.label = 2;
                    case 2:
                        if (!(_i < citys_1.length)) return [3 /*break*/, 7];
                        city = citys_1[_i];
                        _loop_1 = function (_type) {
                            var proxies, _loop_2, page, state_1;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, this_1.getActiveProxies(url)];
                                    case 1:
                                        proxies = _c.sent();
                                        _loop_2 = function (page) {
                                            var proxy, data, config, isContinue;
                                            return __generator(this, function (_d) {
                                                switch (_d.label) {
                                                    case 0:
                                                        proxy = this_1.getRandomProxy_(proxies);
                                                        data = this_1.getJsonQuery(_type, page, city);
                                                        config = this_1.getConfig(data, proxy, city);
                                                        return [4 /*yield*/, new Promise(function (resolve, _) {
                                                                (0, axios_https_proxy_fix_1.default)(__assign({}, config))
                                                                    .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                                                    var _i, _a, item, phone, rentObjectData, result, _b, houseObj, streetObj, districtObj, _c, arrayPhotosUrls, arrayBuffersImages, outRentObject;
                                                                    return __generator(this, function (_d) {
                                                                        switch (_d.label) {
                                                                            case 0:
                                                                                if (!response.data.data.offersSerialized.length) {
                                                                                    resolve(false);
                                                                                }
                                                                                _i = 0, _a = response.data.data.offersSerialized;
                                                                                _d.label = 1;
                                                                            case 1:
                                                                                if (!(_i < _a.length)) return [3 /*break*/, 5];
                                                                                item = _a[_i];
                                                                                if (parseFloat(item.bargainTerms.agentFee) > 0 ||
                                                                                    parseFloat(item.bargainTerms.clientFee) > 0)
                                                                                    return [3 /*break*/, 4];
                                                                                phone = '7' + item.phones[0].number;
                                                                                rentObjectData = this.generateRentObjectData(item, phone);
                                                                                return [4 /*yield*/, this.fillCategoryRentObject(item, rentObjectData)
                                                                                    // Если категории нету, то пропускаем объект
                                                                                ];
                                                                            case 2:
                                                                                result = _d.sent();
                                                                                // Если категории нету, то пропускаем объект
                                                                                if (!result)
                                                                                    return [3 /*break*/, 4];
                                                                                _b = this.getGeoOfItem(item), houseObj = _b.houseObj, streetObj = _b.streetObj, districtObj = _b.districtObj;
                                                                                console.log(houseObj, streetObj, districtObj);
                                                                                // Здесь мы создаем адрес региона, адрес города в базе данных и устанавливаем его в rentObjectData
                                                                                // const { addressRegion, addressCity } = await this.setAllGeoInfo(rentObjectData, null, null, null, null, null, city, districtObj, streetObj)
                                                                                // console.log(addressRegion, addressCity)
                                                                                if (houseObj) {
                                                                                    rentObjectData.houseNumber = houseObj.title;
                                                                                }
                                                                                return [4 /*yield*/, this.downloadFile(proxies, item, false)];
                                                                            case 3:
                                                                                _c = _d.sent(), arrayPhotosUrls = _c.arrayPhotosUrls, arrayBuffersImages = _c.arrayBuffersImages;
                                                                                outRentObject = Object.assign({}, rentObjectData, {
                                                                                    photos: arrayPhotosUrls,
                                                                                    arrayBuffersImages: arrayBuffersImages[0]
                                                                                });
                                                                                console.log(__assign({}, outRentObject));
                                                                                _d.label = 4;
                                                                            case 4:
                                                                                _i++;
                                                                                return [3 /*break*/, 1];
                                                                            case 5: return [2 /*return*/];
                                                                        }
                                                                    });
                                                                }); });
                                                            })];
                                                    case 1:
                                                        isContinue = _d.sent();
                                                        if (!isContinue)
                                                            return [2 /*return*/, "break"];
                                                        return [2 /*return*/];
                                                }
                                            });
                                        };
                                        page = 1;
                                        _c.label = 2;
                                    case 2:
                                        if (!(page < 100)) return [3 /*break*/, 5];
                                        return [5 /*yield**/, _loop_2(page)];
                                    case 3:
                                        state_1 = _c.sent();
                                        if (state_1 === "break")
                                            return [3 /*break*/, 5];
                                        _c.label = 4;
                                    case 4:
                                        page++;
                                        return [3 /*break*/, 2];
                                    case 5: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a = 0, types_1 = types;
                        _b.label = 3;
                    case 3:
                        if (!(_a < types_1.length)) return [3 /*break*/, 6];
                        _type = types_1[_a];
                        return [5 /*yield**/, _loop_1(_type)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _a++;
                        return [3 /*break*/, 3];
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7:
                        loopIndex++;
                        return [3 /*break*/, 1];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/, {}];
                }
            });
        });
    };
    ParserCian.prototype.getActiveProxies = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _i, proxyList_1, item, proxy, data, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        _i = 0, proxyList_1 = proxy_1.proxyList;
                        _a.label = 1;
                    case 1:
                        if (!(_i < proxyList_1.length)) return [3 /*break*/, 6];
                        item = proxyList_1[_i];
                        proxy = {
                            host: item.split('@')[0].split(':')[0],
                            port: Number(item.split('@')[0].split(':')[1]),
                            auth: {
                                username: item.split('@')[1].split(':')[0],
                                password: item.split('@')[1].split(':')[1],
                            },
                        };
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        data = {
                            jsonQuery: {
                                _type: 'flatrent',
                                engine_version: {
                                    type: 'term',
                                    value: 2,
                                },
                                region: {
                                    type: 'terms',
                                    value: [4820],
                                },
                            },
                        };
                        return [4 /*yield*/, axios_https_proxy_fix_1.default.post(url, JSON.stringify(data), {
                                proxy: proxy,
                                timeout: 30000,
                            })];
                    case 3:
                        _a.sent();
                        result.push(proxy);
                        return [3 /*break*/, 5];
                    case 4:
                        err_2 = _a.sent();
                        if (err_2.response && err_2.response.status !== 403) {
                            result.push(proxy);
                        }
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, result];
                }
            });
        });
    };
    ParserCian.prototype.getRandomProxy_ = function (proxies) {
        return proxies[Math.floor(Math.random() * proxies.length)];
    };
    ParserCian.prototype.getJsonQuery = function (_type, page, city) {
        return {
            jsonQuery: {
                _type: _type,
                engine_version: {
                    type: 'term',
                    value: 2,
                },
                region: {
                    type: 'terms',
                    value: [city.id],
                },
                page: {
                    type: 'term',
                    value: page,
                },
                for_day: {
                    type: 'term',
                    value: '!1',
                },
                room: {
                    type: 'terms',
                    value: [1, 2, 3, 4, 5, 6],
                },
            },
        };
    };
    ParserCian.prototype.getConfig = function (data, proxy, city) {
        return {
            method: 'post',
            url: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*',
                'accept-language': 'ru-RU,ru;q=0.9',
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                'origin': "https://".concat([city.origin, 'cian', 'ru'].join('.')),
                'pragma': 'no-cache',
                'referer': "https://".concat([city.origin, 'cian', 'ru'].join('.')),
                'sec-ch-ua': '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Linux"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
            },
            data: JSON.stringify(data),
            timeout: 30000,
            proxy: proxy,
        };
    };
    ParserCian.prototype.generateRentObjectData = function (item, phone, parseSource) {
        if (parseSource === void 0) { parseSource = null; }
        return {
            title: null,
            parseSourceId: (parseSource === null || parseSource === void 0 ? void 0 : parseSource.id) || null,
            foreignId: item.cianId,
            regionId: null,
            cityId: null,
            districtId: null,
            streetId: null,
            houseNumber: null,
            name: 'Noname',
            phone: Number(phone),
            price: item.bargainTerms.price,
            objectTypeId: null,
            pledge: item.bargainTerms.deposit || null,
            src: item.fullUrl,
            area: Number(item.totalArea) || null,
            areaKitchen: Number(item.kitchenArea) || null,
            areaLiving: Number(item.livingArea) || null,
            description: item.description,
            storey: Number(item.floorNumber) || null,
            storeyNumber: Number(item.building.floorsCount) || null,
            fullObject: JSON.stringify({}),
        };
    };
    ParserCian.prototype.fillCategoryRentObject = function (item, rentObjectData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (item.category === 'flatRent') {
                    switch (true) {
                        case item.roomsCount === 1:
                            rentObjectData.objectTypeId = 1;
                            break;
                        case item.roomsCount === 2:
                            rentObjectData.objectTypeId = 2;
                            break;
                        case item.roomsCount === 3:
                            rentObjectData.objectTypeId = 3;
                            break;
                        case item.roomsCount === 4:
                            rentObjectData.objectTypeId = 4;
                            break;
                        case item.roomsCount >= 5:
                            rentObjectData.objectTypeId = 5;
                            break;
                        default:
                            // console.log(item)
                            return [2 /*return*/, false];
                    }
                }
                else if (item.category === 'houseRent') {
                    rentObjectData.objectTypeId = 11;
                }
                else if (item.category === 'cottageRent') {
                    rentObjectData.objectTypeId = 17;
                }
                else if (item.category === 'houseShareRent') {
                    rentObjectData.objectTypeId = 22;
                }
                else if (item.category === 'townhouseRent') {
                    rentObjectData.objectTypeId = 12;
                }
                else {
                    return [2 /*return*/, false];
                }
                return [2 /*return*/, true];
            });
        });
    };
    ParserCian.prototype.getGeoOfItem = function (item) {
        var houseObj = item.geo.address.find(function (el) { return el.geoType === 'house'; });
        var streetObj = item.geo.address.find(function (el) { return el.geoType === 'street'; });
        var districtObj = Array.isArray(item.geo.districts)
            ? item.geo.districts.find(function (el) {
                return el.type === 'raion' ||
                    el.type === 'mikroraion';
            })
            : null;
        return {
            houseObj: houseObj,
            streetObj: streetObj,
            districtObj: districtObj
        };
    };
    /**
     * Здесь методы, которые скорее всего не войдут в итоговую версию парсера, но на всякий случай пусть здесь будут
     */
    ParserCian.prototype.checkObjectExists = function (RentObject, item, parseSource) {
        return __awaiter(this, void 0, void 0, function () {
            var isExist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, RentObject.query()
                            .where('parse_source_id', parseSource.id)
                            .where('foreign_id', item.cianId)
                            .first()];
                    case 1:
                        isExist = !!(_a.sent());
                        return [2 /*return*/, isExist];
                }
            });
        });
    };
    ParserCian.prototype.setTitleObjectRent = function (rentObjectData, ObjectType) {
        return __awaiter(this, void 0, void 0, function () {
            var type;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!rentObjectData.title) return [3 /*break*/, 2];
                        return [4 /*yield*/, ObjectType.findOrFail(rentObjectData.objectTypeId)];
                    case 1:
                        type = _a.sent();
                        rentObjectData.title = "".concat(type.name, ", ").concat(rentObjectData.areaLiving +
                            rentObjectData.areaKitchen, " \u043C\u00B2, ").concat(rentObjectData.storey, "/").concat(rentObjectData.storeyNumber, " \u044D\u0442\u0430\u0436");
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ParserCian.prototype.setAllGeoInfo = function (rentObjectData, Region, City, District, country, city, Street, districtObj, streetObj) {
        return __awaiter(this, void 0, void 0, function () {
            var addressRegion, addressCity, existDistrict, addressDistrict, addressStreet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Region.firstOrCreate({
                            countryId: country.id,
                            name: city.region,
                        }, {
                            countryId: country.id,
                            name: city.region,
                        })];
                    case 1:
                        addressRegion = _a.sent();
                        rentObjectData.regionId = addressRegion.id;
                        return [4 /*yield*/, City.firstOrCreate({
                                regionId: addressRegion.id,
                                name: city.name,
                            }, {
                                regionId: addressRegion.id,
                                name: city.name,
                            })];
                    case 2:
                        addressCity = _a.sent();
                        rentObjectData.cityId = addressCity.id;
                        if (!(districtObj &&
                            !['ул.', 'улица', 'пр-т'].some(function (el) {
                                return districtObj.title.includes(el);
                            }))) return [3 /*break*/, 6];
                        return [4 /*yield*/, District.query()
                                .where('cityId', addressCity.id)
                                .where(function (q) {
                                q.where('name', districtObj.title).orWhereRaw("aliases LIKE \"%".concat(districtObj.title, "%\""));
                            })
                                .first()];
                    case 3:
                        existDistrict = _a.sent();
                        if (!existDistrict) return [3 /*break*/, 4];
                        rentObjectData.districtId = existDistrict.id;
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, District.create({
                            cityId: addressCity.id,
                            name: districtObj.title,
                        })];
                    case 5:
                        addressDistrict = _a.sent();
                        rentObjectData.districtId = addressDistrict.id;
                        _a.label = 6;
                    case 6:
                        if (!streetObj) return [3 /*break*/, 8];
                        return [4 /*yield*/, Street.firstOrCreate({
                                cityId: addressCity.id,
                                name: streetObj.title,
                            }, {
                                cityId: addressCity.id,
                                name: streetObj.title,
                            })];
                    case 7:
                        addressStreet = _a.sent();
                        rentObjectData.streetId = addressStreet.id;
                        _a.label = 8;
                    case 8: return [2 /*return*/, {
                            addressRegion: addressRegion,
                            addressCity: addressCity,
                        }];
                }
            });
        });
    };
    return ParserCian;
}(parser_abstract_1.Parser));
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var options, cian;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = {
                        baseUrl: "https://api.cian.ru/search-offers/v2/search-offers-desktop/",
                        timeDelay: 5000,
                        timeout: 30000,
                        cities: [
                            {
                                region: 'Москва',
                                id: 1,
                                name: 'Москва',
                                origin: 'moskva',
                            },
                            {
                                region: 'Краснодарский край',
                                id: 4820,
                                name: 'Краснодар',
                                origin: 'krasnodar',
                            },
                            {
                                region: 'Ростовская область',
                                id: 4959,
                                name: 'Ростов-на-Дону',
                                origin: 'rostov',
                            },
                        ]
                    };
                    cian = new ParserCian(options);
                    return [4 /*yield*/, cian.parse()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main();
