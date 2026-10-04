export const REGION_IDS = ['au', 'jp', 'nl', 'cn', 'eg', 'br', 'ch', 'ca', 'fr', 'ke', 'gr', 'mx', 'in', 'nz', 'ma', 'no', 'kr', 'id', 'it', 'es', 'us', 'th', 'tr', 'za'];
const GENERIC_BOUNDS = [-21.5, 21.5, -14.5, 23.5];
const generic = (id, country, name, english, subtitle, lat, lon, colour, accent, continent, theme, topics, description, features) => ({ id, country, name, english, subtitle, lat, lon, colour, accent, continent, theme, topics, focus: [-6.2, 1.05, 2.7], spawn: [0, -9.5], bounds: GENERIC_BOUNDS, description, features });
export const REGIONS = {
    au: { id: 'au', country: '澳大利亚', name: '晴湾海岸', english: 'SUNNY COVE · AUSTRALIA', subtitle: '海风、木栈道与浅蓝色小屋', lat: -27, lon: 134, colour: '#edbd76', accent: '#7eb7b5', continent: 'Oceania', theme: 'coast', topics: ['uv'], focus: [-7.5, 1, -1.5], spawn: [-6, 4.8], bounds: [-21, 5, -12, 10], description: '带上观察探头，走过海边的小路。看得见的明暗，与看不见的紫外线，是一回事吗？', features: ['海岸观察园', '条纹灯塔', '彩色海滨小屋'] },
    jp: { id: 'jp', country: '日本', name: '樱庭小巷', english: 'PETAL COURT · JAPAN', subtitle: '木格窗、石板路与庭院厨房', lat: 36, lon: 138, colour: '#db9da3', accent: '#708782', continent: 'Asia', theme: 'courtyard', topics: ['food', 'hands'], focus: [7, 1, 2], spawn: [4.2, 2.8], bounds: [-3, 21, -11, 14], description: '在有木格窗的小院里做一次食物接触对照，再到洗手台比较方法与操作覆盖。风景变了，判断证据的习惯没有变。', features: ['町屋主题院落', '石桥与小池塘', '厨房与清洁工作台'] },
    nl: { id: 'nl', country: '荷兰', name: '花渠小镇', english: 'BLOOM CANAL · NETHERLANDS', subtitle: '窄屋、木桥与缓缓转动的风车', lat: 52.2, lon: 5.2, colour: '#95b7bd', accent: '#d6a381', continent: 'Europe', theme: 'canal', topics: ['balance', 'sound'], focus: [11.4, 1.2, -1.8], spawn: [11.8, -1], bounds: [1, 21.4, -14.5, 11.5], description: '沿运河找到配重台和弦音桌。移动一块配重，或拨动一根弦，让可见的变化回答你的好奇。', features: ['运河桥与码头', '郁金香花带', '风车与山墙小屋'] },
    cn: generic('cn', '中国', '江南水巷', 'JIANGNAN LANE · CHINA', '白墙、深瓦与临水小院', 31.2, 120.6, '#d9d4bf', '#719395', 'Asia', 'jiangnan', ['honey', 'food'], '从石桥走进安静的水巷，在蜜晶小院与厨房台面做两次条件对照。这里是原创微缩布景，不代表某座真实城镇。', ['白墙深瓦小院', '月洞门与石桥', '蜜晶与接触实验']),
    eg: generic('eg', '埃及', '绿洲光庭', 'OASIS LIGHT COURT · EGYPT', '砂岩、棕榈与清凉遮棚', 26.8, 30.8, '#e4c58d', '#5f9d9a', 'Africa', 'oasis', ['uv', 'shadow'], '在绿洲边缘分开观察光、影与遮挡。场景只提供生活化入口，不把任何科学规律说成某地特有。', ['棕榈绿洲', '砂岩拱廊', '光影与遮挡体验']),
    br: generic('br', '巴西', '雨林河站', 'RAINFOREST COVE · BRAZIL', '热带叶冠、河岸木台与彩色小屋', -10, -52, '#78ad7b', '#e0aa7d', 'South America', 'rainforest', ['hands', 'buoyancy'], '沿木平台走过热带花叶，在清洁台和浮沉水槽之间自由切换观察。', ['热带叶冠', '河岸木栈台', '清洁与浮沉体验']),
    ch: generic('ch', '瑞士', '山谷木舍', 'ALPINE HAMLET · SWITZERLAND', '木阳台、针叶林与山谷花坡', 46.8, 8.2, '#9fb68f', '#c98a6e', 'Europe', 'alpine', ['pulley', 'sound'], '在山舍与花坡间拉动绳轮、拨动弦桥，比较机械与声音条件。', ['阿尔卑斯木舍', '山花与针叶林', '绳轮与弦音体验']),
    ca: generic('ca', '加拿大', '枫湾湖畔', 'MAPLE BAY · CANADA', '湖岸木屋、枫林与观景码头', 56, -106, '#b87d67', '#7da6a1', 'North America', 'lakeside', ['optics', 'buoyancy'], '从枫林步道走到湖边，在光路桌和浮沉水槽中改变一个条件再比较。', ['枫林湖岸', '木屋与小码头', '光路与浮沉体验']),
    fr: generic('fr', '法国', '薰衣草庭院', 'LAVENDER COURT · FRANCE', '浅石墙、蓝灰屋顶与紫色花带', 46.5, 2.2, '#b7a9c8', '#8aa9a1', 'Europe', 'provence', ['balance', 'shadow'], '在浅色石屋与花田间探索平衡和影子的几何关系。', ['浅石小屋', '薰衣草花带', '平衡与光影体验']),
    ke: generic('ke', '肯尼亚', '金草观察营', 'GOLDEN GRASS CAMP · KENYA', '金色草地、开阔天空与观察棚', 0.2, 37.9, '#c9a66b', '#708b72', 'Africa', 'savanna', ['uv', 'pulley'], '在开阔观察营里比较遮挡路径，再到绳轮架亲手提起花篮。', ['开阔草原构图', '低矮观察棚', '紫外线与绳轮体验']),
    gr: generic('gr', '希腊', '爱琴海蓝庭', 'AEGEAN BLUE COURT · GREECE', '白墙、蓝顶与海风露台', 39, 22, '#8fb9c8', '#e6cf9d', 'Europe', 'aegean', ['optics', 'honey'], '沿白色露台来到光路桌与蜜晶角落，用相同的比较方法看两类不同现象。', ['白蓝露台', '小型海风庭院', '光路与蜜晶体验']),
    mx: generic('mx', '墨西哥', '陶土花院', 'TERRACOTTA COURT · MEXICO', '暖陶墙、彩旗与多肉花圃', 23.6, -102.5, '#d78b69', '#6d9f8f', 'North America', 'hacienda', ['food', 'shadow'], '在暖色庭院里移动纸偶和幕布，也可以做食物接触时间对照。', ['陶土庭院', '彩旗与多肉植物', '食物与光影体验']),
    in: generic('in', '印度', '阶井花园', 'STEPPED GARDEN · INDIA', '砂岩台阶、花环与清水庭院', 22.6, 79, '#d3a06e', '#7aa29b', 'Asia', 'stepwell', ['hands', 'balance'], '沿台阶花园来到清洁台和平衡架，亲手改变覆盖或力臂。', ['砂岩阶梯', '花环庭院', '清洁与平衡体验']),
    nz: generic('nz', '新西兰', '峡湾蕨谷', 'FERN FJORD · NEW ZEALAND', '蕨叶、深蓝水湾与木步道', -41, 174, '#6fa08a', '#7ca9b8', 'Oceania', 'fjord', ['buoyancy', 'sound'], '在蕨谷和水湾旁比较浮沉条件，再去拨动弦桥。', ['蕨谷步道', '峡湾色水景', '浮沉与弦音体验']),
    ma: generic('ma', '摩洛哥', '马赛克内院', 'MOSAIC RIAD · MOROCCO', '拱门、马赛克与柑橘庭院', 31.8, -7.1, '#d39b78', '#5e9f9a', 'Africa', 'riad', ['optics', 'uv'], '从拱廊进入内院，用光路桌和遮阳探头分开观察可见光与条件。', ['拱廊内院', '马赛克水池', '光路与紫外线体验']),
    no: generic('no', '挪威', '峡湾红屋港', 'FJORD HARBOUR · NORWAY', '红木屋、冷色水湾与岩坡', 61, 8, '#ba6f65', '#6d99a7', 'Europe', 'harbour', ['pulley', 'buoyancy'], '沿港边木道来到绳轮和浮沉装置，比较力、距离和排水条件。', ['红木港屋', '峡湾岩坡', '绳轮与浮沉体验']),
    kr: generic('kr', '韩国', '韩屋科学巷', 'HANOK SCIENCE LANE · KOREA', '木构屋檐、石墙与小院', 36.5, 127.8, '#b98c6d', '#7d9c91', 'Asia', 'hanok', ['hands', 'sound'], '在木构小院里先看清洁覆盖，再到弦音桌比较长度与振幅。', ['木构韩屋小院', '石墙花径', '清洁与弦音体验']),
    id: generic('id', '印度尼西亚', '稻田水台', 'RICE TERRACE · INDONESIA', '层叠绿田、竹亭与水渠', -2, 118, '#7da76c', '#d2b06e', 'Asia', 'terrace', ['food', 'honey'], '沿层叠绿田走到厨房台面和蜜晶工作桌，用对照而不是直觉判断。', ['层叠稻田', '竹亭与水渠', '食物与蜜晶体验']),
    it: generic('it', '意大利', '托斯卡纳坡庭', 'TUSCAN HILL COURT · ITALY', '陶瓦坡屋、柏树与葡萄架', 43.5, 11, '#c9926e', '#82936e', 'Europe', 'tuscan', ['honey', 'balance'], '沿暖色坡庭走过柏树与葡萄架，在蜜晶桌和平衡架之间比较不同条件。', ['陶瓦坡屋', '柏树与葡萄架', '蜜晶与平衡体验']),
    es: generic('es', '西班牙', '橙香花院', 'ORANGE COURT · SPAIN', '白墙拱廊、蓝花砖与橙树', 40.2, -3.7, '#d49a73', '#6f9ea2', 'Europe', 'iberian', ['optics', 'shadow'], '穿过橙树小院，在光路桌和纸偶舞台中移动物体，观察几何关系怎样改变。', ['白墙拱廊', '橙树与蓝花砖', '光路与光影体验']),
    us: generic('us', '美国', '红杉溪营地', 'REDWOOD CREEK · USA', '高红杉、溪边木屋与营地步道', 37.5, -119, '#8d9f77', '#b3765e', 'North America', 'redwood', ['buoyancy', 'pulley'], '在高树与溪岸之间走到浮沉水槽和绳轮架，用相同的对照方法观察两类力学现象。', ['红杉林与溪岸', '木屋营地', '浮沉与绳轮体验']),
    th: generic('th', '泰国', '莲渠水市', 'LOTUS CANAL · THAILAND', '木亭、水渠与莲叶花台', 15.8, 101, '#7fa987', '#d4a36f', 'Asia', 'lotus', ['food', 'hands'], '沿水渠木道来到厨房台和清洁台，比较接触时间与覆盖方式，不靠直觉下结论。', ['水渠木亭', '莲叶花台', '食物与清洁体验']),
    tr: generic('tr', '土耳其', '蓝瓷海峡庭', 'BOSPHORUS TILE COURT · TURKEY', '浅石拱门、蓝瓷与圆顶庭院', 39, 35, '#c79a78', '#6f9baa', 'Asia', 'bosphorus', ['optics', 'balance'], '在浅石拱廊与蓝瓷庭院里操作光路和平衡装置，比较角度、质量和力臂。', ['蓝瓷拱廊', '圆顶小亭', '光路与平衡体验']),
    za: generic('za', '南非', '海岬花原', 'CAPE FYNBOS GARDEN · SOUTH AFRICA', '海岬花丛、石坡与木屋', -30.5, 24, '#a88e77', '#7ea58b', 'Africa', 'fynbos', ['uv', 'sound'], '穿过海岬花丛，在遮阳观察点与弦音桌改变条件，分别观察不可见路径与振动。', ['海岬花原', '石坡木屋', '紫外线与弦音体验'])
};
const POSTCARD_COPY = {
    coast: ['海风里的观察台', '让灯塔、海岸与观察园一起进入画面。科学结论仍来自资料与模型，不来自风景。'],
    courtyard: ['庭院的一小段安静', '把木格窗、池塘和生活实验放进同一张明信片。'],
    canal: ['花渠与风车', '运河、山墙与风车构成旅行记忆；实验记录继续独立保存。'],
    jiangnan: ['水巷转角', '白墙、深瓦与临水小院是一幅原创微缩构图。'],
    oasis: ['绿洲的阴影', '棕榈与浅色院墙让光影关系更容易被看见。'],
    rainforest: ['雨林河站', '从木台看向热带叶冠和河岸装置。'],
    alpine: ['山谷木舍', '把木阳台、山花和科学装置收进一张旅行明信片。'],
    lakeside: ['枫湾湖畔', '湖岸木屋与枫林形成安静的观察边界。'],
    provence: ['薰衣草庭院', '浅石墙、花带与小路组成柔和的旅行记忆。'],
    savanna: ['金草观察营', '开阔天空与低矮观察棚让方向和遮挡更清楚。'],
    aegean: ['爱琴海蓝庭', '白墙与蓝色露台把几何关系放在清爽背景里。'],
    hacienda: ['陶土花院', '暖陶墙、彩旗和花圃围住一小块可操作空间。'],
    stepwell: ['阶井花园', '台阶、花环与清水庭院组成层层递进的视线。'],
    fjord: ['峡湾蕨谷', '蕨叶与深蓝水湾围住一段木步道。'],
    riad: ['马赛克内院', '拱廊、水池和柑橘庭院形成安静的中心。'],
    harbour: ['峡湾红屋港', '红木屋与冷色水湾形成清晰的港口轮廓。'],
    hanok: ['韩屋科学巷', '木构屋檐、石墙与花径把日常操作放进小院。'],
    terrace: ['稻田水台', '层叠绿田、竹亭与水渠让路线本身也有节奏。'],
    tuscan: ['托斯卡纳坡庭', '陶瓦、柏树与葡萄架形成温暖的坡地构图。'],
    iberian: ['橙香花院', '白墙拱廊、蓝花砖与橙树构成明快庭院。'],
    redwood: ['红杉溪营地', '高红杉、溪岸木屋与营火角落形成纵深。'],
    lotus: ['莲渠水市', '木亭、水渠与莲叶花台让水面成为空间中心。'],
    bosphorus: ['蓝瓷海峡庭', '浅石拱门、蓝瓷与圆顶亭形成清楚的层次。'],
    fynbos: ['海岬花原', '石坡、木屋与花原把前中后景拉开。']
};
export function regionPostcard(id) {
    const r = REGIONS[id], copy = POSTCARD_COPY[r.theme] ?? [r.name, r.subtitle];
    if (id === 'au')
        return { title: copy[0], caption: copy[1], target: [-10.1, .9, -1.1], height: 9.0, yaw: .58 };
    if (id === 'jp')
        return { title: copy[0], caption: copy[1], target: [8.2, 1.1, 1.8], height: 9.2, yaw: .60 };
    if (id === 'nl')
        return { title: copy[0], caption: copy[1], target: [8.4, 1.1, .2], height: 9.3, yaw: .58 };
    return { title: copy[0], caption: copy[1], target: [-7.2, 1.0, 2.6], height: 9.1, yaw: .58 };
}
export function isRegion(value) { return typeof value === 'string' && REGION_IDS.includes(value); }
export function geoVector(lat, lon, r = 1) { const a = lat * Math.PI / 180, b = lon * Math.PI / 180; return [r * Math.cos(a) * Math.sin(b), r * Math.sin(a), r * Math.cos(a) * Math.cos(b)]; }
export function clampLatitude(lat) { return Math.max(-75, Math.min(75, Number.isFinite(lat) ? lat : 0)); }
export function wrapLongitude(lon) { return Number.isFinite(lon) ? ((lon + 180) % 360 + 360) % 360 - 180 : 0; }
/** Unit-sphere coordinates projected from a globe-centred orthographic view. */
export function projectGeo(lat, lon, viewLat, viewLon) { const p = geoVector(lat, lon), yaw = viewLon * Math.PI / 180, e = viewLat * Math.PI / 180; return [Math.cos(yaw) * p[0] - Math.sin(yaw) * p[2], -Math.sin(e) * Math.sin(yaw) * p[0] + Math.cos(e) * p[1] - Math.sin(e) * Math.cos(yaw) * p[2], Math.cos(e) * Math.sin(yaw) * p[0] + Math.sin(e) * p[1] + Math.cos(e) * Math.cos(yaw) * p[2]]; }
export function regionContains(id, x, z, r = 0) { const [l, h, t, b] = REGIONS[id].bounds; return Number.isFinite(x) && Number.isFinite(z) && x > l + r && x < h - r && z > t + r && z < b - r; }
export function regionWater(id, x, z, r = 0) {
    if (id === 'au')
        return x > 1.2 - r;
    if (id === 'jp')
        return ((x + .9) / (1.6 + Math.max(0, r))) ** 2 + ((z - 5) / (3.3 + Math.max(0, r))) ** 2 < 1 && Math.abs(z - 4.7) > .66 - r;
    if (id === 'nl')
        return Math.abs(x - 8) < 1.3 + r && ![-7.9, 2.4].some(v => Math.abs(z - v) < .72 - r);
    // New destination water is deliberately placed at scenic edges; core science circulation remains connected.
    if (id === 'eg')
        return ((x + 16) / (2.2 + r)) ** 2 + ((z + 8) / (2.2 + r)) ** 2 < 1;
    if (id === 'br')
        return x < -17.5 + r;
    if (id === 'ca')
        return x < -16.5 + r && z > 8 - r;
    if (id === 'nz')
        return x < -17.5 + r && z > 6.5 - r;
    if (id === 'no')
        return x < -17.5 + r;
    if (id === 'gr')
        return x < -17.8 + r;
    if (id === 'ma')
        return ((x + 15) / (1.7 + r)) ** 2 + ((z - 8) / (1.7 + r)) ** 2 < 1;
    if (id === 'us')
        return x < -17.7 + r && z > 4 - r;
    if (id === 'th')
        return x < -17.6 + r && z > 1 - r;
    if (id === 'za')
        return x < -17.7 + r && z > 7 - r;
    return false;
}
export function regionWalkHeight(id, x, z) {
    if (id === 'nl' && Math.abs(x - 8) < 1.45) {
        const d = Math.min(...[-7.9, 2.4].map(v => Math.abs(z - v)));
        if (d < .82)
            return .16 + .28 * Math.max(0, 1 - ((x - 8) / 1.5) ** 2);
    }
    if (id === 'jp' && Math.abs(x + .9) < 2 && Math.abs(z - 4.7) < .8)
        return .16 + .22 * Math.max(0, 1 - ((x + .9) / 2) ** 2);
    return .16;
}