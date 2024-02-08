/* eslint-disable @typescript-eslint/no-explicit-any */

import axios  from 'axios-https-proxy-fix'
import { Cian } from './types/cian.namespace';
import { proxyList } from './utils/proxy'
import { Parser } from './abstract/parser.abstract';

const types = [
    'suburbanrent', // Дом/дача
    'flatrent', // Квартира
]

class ParserCian extends Parser {
    /**
     * Основной метод parse(), отсюда все начинается
     */
    async parse() : Promise<void> {
       await  this.customFetchData("https://api.cian.ru/search-offers/v2/search-offers-desktop", this.cities)
    }
    async downloadFile
        (
            proxies: any,
            item: any,
            isExist: boolean
        )
        : Promise<{arrayPhotosUrls: string[] , arrayBuffersImages: Buffer[]}> 
        {
            const arrayPhotosUrls: string[] = []
            const arrayBuffersImages: Buffer[] = []
            if (!isExist) {
                for (const photo of item.photos) {
                    // Временная заглушка
                    if(photo === item.photos[3]) break

                    const proxy = proxies[Math.floor(Math.random() * 10)]
                    const link: string = photo.thumbnail2Url
                    arrayPhotosUrls.push(link)
                    // const galleryImageName = crypto.randomUUID() + '.png'

                    try {
                        const response = await axios({
                            method: 'get',
                            url: link,
                            responseType: 'arraybuffer',
                            proxy: proxy,
                            timeout: this.timeout,
                        })

                        arrayBuffersImages.push(response.data)

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

                        await new Promise((resolve) =>
                            setTimeout(resolve, 1_000)
                        )
                    } catch (err) {
                        console.error(err)
                    }
                }

                // await instance
                //     .related('rentObjectCharacteristic')
                //     .create({})
                // await instance
                //     .related('rentObjectInfrastructure')
                //     .create({})
                // await instance.related('rentObjectTerm').create({})

                await new Promise((resolve) =>
                    setTimeout(resolve, this.timeDelay)
                )
            }
            return {
                arrayPhotosUrls: arrayPhotosUrls,
                arrayBuffersImages: arrayBuffersImages
            }
    }
    databaseModeling(model: any, data: any): Promise<any> {
        console.log(model, data)
        throw new Error('Method not implemented.');
    }
    
    async customFetchData(url: string, citys: Cian.ParserCianCity[]): Promise<any> {
        try {
            // const parseSource = await ParseSource.findByOrFail('code', 'cian')
            // const country = await Country.findByOrFail('code', 'RU')

            for (let loopIndex = 0; loopIndex < Number.MAX_SAFE_INTEGER; loopIndex++) {
                for (const city of citys) {
                    for (const _type of types) {
                        const proxies = await this.getActiveProxies(url)
                        for (let page = 1; page < 100; page++) {
                            const proxy = this.getRandomProxy_(proxies)
                            const data = this.getJsonQuery(_type, page, city)
                            const config = this.getConfig(data, proxy, city)

                            const isContinue = await new Promise((resolve, _) => {
                                axios({
                                    ...config
                                })
                                    .then(async (response) => {
                                        if (!response.data.data.offersSerialized.length) {
                                            resolve(false)
                                        }
                                        for (const item of response.data.data.offersSerialized) {
                                            if (
                                                parseFloat(item.bargainTerms.agentFee) > 0 ||
                                                parseFloat(item.bargainTerms.clientFee) > 0
                                            ) continue

                                            // Здесь мы проверяем через модель имеется ли уже такой объект в бд
                                            // const isExist = await this.checkObjectExists(null, item, null)

                                            const phone = '7' + item.phones[0].number
                                            const rentObjectData = this.generateRentObjectData(item, phone)
                                            // Здесь мы заполняем объект rentObjectData его категории
                                            const result = await this.fillCategoryRentObject(item, rentObjectData)
                                            // Если категории нету, то пропускаем объект
                                            if(!result) continue

                                            // Здесь мы заполняем title для объекта
                                            // await this.setTitleObjectRent(rentObjectData, null)

                                            // Здесь получаем гео данные из item
                                            const { houseObj, streetObj, districtObj } = this.getGeoOfItem(item)
                                            console.log(houseObj, streetObj, districtObj)

                                            // Здесь мы создаем адрес региона, адрес города в базе данных и устанавливаем его в rentObjectData
                                            // const { addressRegion, addressCity } = await this.setAllGeoInfo(rentObjectData, null, null, null, null, null, city, districtObj, streetObj)
                                            // console.log(addressRegion, addressCity)

                                            if (houseObj) {
                                                rentObjectData.houseNumber = houseObj.title
                                            }

                                            // const instance = await RentObject.updateOrCreate(
                                            //     {
                                            //         parseSourceId: parseSource.id,
                                            //         foreignId: item.cianId,
                                            //     },
                                            //     {
                                            //         ...rentObjectData,
                                            //     }
                                            // )
                                            const { arrayPhotosUrls, arrayBuffersImages } = await this.downloadFile(proxies, item, false)
                                            const outRentObject = Object.assign({}, rentObjectData, {
                                                photos: arrayPhotosUrls,
                                                arrayBuffersImages: arrayBuffersImages[0]
                                            })

                                            console.log({...outRentObject})

                                        }
                                    })
                            })
                            if (!isContinue) break
                        }
                    }
                }

            }

        } catch (error) {
            console.log(error)
        }

        return {}
    }
    
    async getActiveProxies(url: string): Promise<any> {
        const result: any[] = []
        for (const item of proxyList) {
            const proxy = {
                host: item.split('@')[0].split(':')[0],
                port: Number(item.split('@')[0].split(':')[1]),
                auth: {
                    username: item.split('@')[1].split(':')[0],
                    password: item.split('@')[1].split(':')[1],
                },
            }
            try {
                const data = {
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
                }
                await axios.post(
                    url,
                    JSON.stringify(data),
                    {
                        proxy: proxy,
                        timeout: 30_000,
                    }
                )
    
                result.push(proxy)
            } catch (err) {
                if (err.response && err.response.status !== 403) {
                    result.push(proxy)
                }
            }
        }
        return result
    }

    private getRandomProxy_(proxies: any) {
        return proxies[Math.floor(Math.random() * proxies.length)]
    }

    private getJsonQuery(_type: any, page: any, city: Cian.ParserCianCity) {
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
        }
    }

    private getConfig(data: any, proxy: any, city: Cian.ParserCianCity) {
        return {
            method: 'post',
            url: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*',
                'accept-language': 'ru-RU,ru;q=0.9',
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                'origin': `https://${[city.origin, 'cian', 'ru'].join('.')}`,
                'pragma': 'no-cache',
                'referer': `https://${[city.origin, 'cian', 'ru'].join('.')}`,
                'sec-ch-ua':
                    '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Linux"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
                'user-agent':
                    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
            },
            data: JSON.stringify(data),
            timeout: 30_000,
            proxy: proxy,
        }
    }

    private generateRentObjectData(item: any, phone: string, parseSource: any = null) : Cian.RentObject {
        return {
            title: null,
            parseSourceId: parseSource?.id || null,
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
            storeyNumber:
                Number(item.building.floorsCount) || null,
            fullObject: JSON.stringify({}),
        }
    }

    private async fillCategoryRentObject(item: any, rentObjectData: Cian.RentObject) : Promise<boolean> {
        if (item.category === 'flatRent') {
            switch (true) {
                case item.roomsCount === 1:
                    rentObjectData.objectTypeId = 1
                    break
                case item.roomsCount === 2:
                    rentObjectData.objectTypeId = 2
                    break
                case item.roomsCount === 3:
                    rentObjectData.objectTypeId = 3
                    break
                case item.roomsCount === 4:
                    rentObjectData.objectTypeId = 4
                    break
                case item.roomsCount >= 5:
                    rentObjectData.objectTypeId = 5
                    break
                default:
                    // console.log(item)
                    return false
            }
        } else if (item.category === 'houseRent') {
            rentObjectData.objectTypeId = 11
        } else if (item.category === 'cottageRent') {
            rentObjectData.objectTypeId = 17
        } else if (item.category === 'houseShareRent') {
            rentObjectData.objectTypeId = 22
        } else if (item.category === 'townhouseRent') {
            rentObjectData.objectTypeId = 12
        } else {
            return false
        }

        return true
    }

    private getGeoOfItem(item: any) : {
        houseObj: any, 
        streetObj: any, 
        districtObj: any
    } {
        const houseObj = item.geo.address.find(
            (el: any) => el.geoType === 'house'
        )
        const streetObj = item.geo.address.find(
            (el: any) => el.geoType === 'street'
        )
        const districtObj = Array.isArray(item.geo.districts)
        ? item.geo.districts.find(
              (el: any) =>
                  el.type === 'raion' ||
                  el.type === 'mikroraion'
          )
        : null

        return {
            houseObj: houseObj,
            streetObj: streetObj,
            districtObj: districtObj
        }
    }

    /**
     * Здесь методы, которые скорее всего не войдут в итоговую версию парсера, но на всякий случай пусть здесь будут
     */

    async checkObjectExists(RentObject, item: any, parseSource: any) {
        const isExist = !!(await RentObject.query()
        .where('parse_source_id', parseSource.id)
        .where('foreign_id', item.cianId)
        .first())
        return isExist
    }

    async setTitleObjectRent(rentObjectData: Cian.RentObject, ObjectType) {
        if (!rentObjectData.title) {
            const type = await ObjectType.findOrFail(
                rentObjectData.objectTypeId
            )
            rentObjectData.title = `${type.name}, ${
                rentObjectData.areaLiving! +
                rentObjectData.areaKitchen!
            } м², ${rentObjectData.storey}/${
                rentObjectData.storeyNumber
            } этаж`
        }
    }

    async setAllGeoInfo
        (
            rentObjectData: Cian.RentObject,
            Region,
            City,
            District,
            country,
            city,
            Street,
            districtObj,
            streetObj,
        ) 
        : Promise<{addressRegion: any, addressCity: any }> 
        {
            const addressRegion = await Region.firstOrCreate(
                {
                    countryId: country.id,
                    name: city.region,
                },
                {
                    countryId: country.id,
                    name: city.region,
                }
            )
            rentObjectData.regionId = addressRegion.id

            const addressCity = await City.firstOrCreate(
                {
                    regionId: addressRegion.id,
                    name: city.name,
                },
                {
                    regionId: addressRegion.id,
                    name: city.name,
                }
            )
            rentObjectData.cityId = addressCity.id

            // Здесь мы устанаволиваем objectRent свойства districtId
            if (
                districtObj &&
                !['ул.', 'улица', 'пр-т'].some((el) =>
                    districtObj.title.includes(el)
                )
            ) {
                const existDistrict = await District.query()
                    .where('cityId', addressCity.id)
                    .where(function (q) {
                        q.where(
                            'name',
                            districtObj.title
                        ).orWhereRaw(
                            `aliases LIKE "%${districtObj.title}%"`
                        )
                    })
                    .first()
                if (existDistrict) {
                    rentObjectData.districtId = existDistrict!.id
                } else {
                    const addressDistrict = await District.create({
                        cityId: addressCity.id,
                        name: districtObj.title,
                    })
                    rentObjectData.districtId = addressDistrict.id
                }
            }

            if (streetObj) {
                const addressStreet = await Street.firstOrCreate(
                    {
                        cityId: addressCity.id,
                        name: streetObj.title,
                    },
                    {
                        cityId: addressCity.id,
                        name: streetObj.title,
                    }
                )
                rentObjectData.streetId = addressStreet.id
            }

            return {
                addressRegion: addressRegion,
                addressCity: addressCity,
            }
    }
}

async function main() : Promise<void> {
    const options: Cian.ParserOptions = {
        baseUrl: "https://api.cian.ru/search-offers/v2/search-offers-desktop/",
        timeDelay: 5_000,
        timeout: 30_000,
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
    }
    const cian = new ParserCian(options)
    await cian.parse()
}

main()
