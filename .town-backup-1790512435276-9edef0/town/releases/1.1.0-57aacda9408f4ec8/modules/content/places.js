/** Optional scenic detours. These are not reviewed science lessons or measurement devices. */
import { terrainHeight } from '../game/landscape.js';
export const PLACE_IDS = ['greenhouse', 'waterwheel', 'lookout'];
export const places = {
    greenhouse: {
        id: 'greenhouse', title: '温室里的小窗', subtitle: '园艺小径 · 可操作的屋顶天窗', number: 'A',
        approach: [-10.1, -4.12], center: [-10.1, 2.05, -6], label: [-10.1, 4, -6], handle: [-10.1, 3.55, -6],
        instruction: '点屋顶的天窗，把它打开。再靠近看看种植床、花盆和屋顶支撑。',
        note: '这里记录的是开窗操作。光影与植物都是美术表现，不是温度、通风量或生长速度的模拟。'
    },
    waterwheel: {
        id: 'waterwheel', title: '溪边的慢水轮', subtitle: '河岸步道 · 一座可调节的演示装置', number: 'B',
        approach: [-.35, 4.7], center: [-1.35, 1.1, 4.6], label: [-1.3, 2.7, 4.4], handle: [-.68, 1.15, 4.2],
        instruction: '转动岸边的手轮，切换闸板开度。留意闸板、短水槽和水轮三个部件一起变化。',
        note: '这是预设联动的艺术化装置，不模拟真实河道水力，也不提供流量或发电量。'
    },
    lookout: {
        id: 'lookout', title: '林间的另一种视角', subtitle: '高处小径 · 从山坡辨认小镇地标', number: 'C',
        approach: [-6.65, -7.6], center: [-6.65, terrainHeight(-6.65, -8.3) + 1.05, -8.3], label: [-6.65, terrainHeight(-6.65, -8.3) + 2.6, -8.3], handle: [-6.65, terrainHeight(-6.65, -8.3) + 1.5, -8.6],
        instruction: '转动望远镜，在花园、小屋和溪流之间换一个观察方向。不用收集，也没有限时任务。',
        note: '镜头是辅助观察的游戏取景，不代表真实望远镜的光学参数。可以随时返回原来的平台。'
    }
};
export const VIEW_NAMES = ['花园的屋顶', '小屋与门廊', '溪流与木桥'];
export const VIEW_TARGETS = [[-9, 1, -1.7], [0, 1, -5], [-3.2, .6, 1]];