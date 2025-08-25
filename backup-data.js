/**
 * بيانات احتياطية للتداول - Backup Trading Data
 * تحتوي على بيانات تاريخية لأزواج العملات الرئيسية للاستخدام عند عدم توفر APIs
 */

const BackupData = {
    // بيانات EUR/USD - آخر 100 شمعة (5 دقائق)
    'EUR/USD': {
        symbol: 'EUR/USD',
        interval: '5min',
        lastUpdate: '2024-01-15T10:30:00Z',
        values: [
            { datetime: '2024-01-15T10:30:00', open: 1.0952, high: 1.0958, low: 1.0950, close: 1.0955, volume: 1250 },
            { datetime: '2024-01-15T10:25:00', open: 1.0948, high: 1.0954, low: 1.0946, close: 1.0952, volume: 1180 },
            { datetime: '2024-01-15T10:20:00', open: 1.0945, high: 1.0950, low: 1.0943, close: 1.0948, volume: 1320 },
            { datetime: '2024-01-15T10:15:00', open: 1.0942, high: 1.0947, low: 1.0940, close: 1.0945, volume: 1090 },
            { datetime: '2024-01-15T10:10:00', open: 1.0938, high: 1.0944, low: 1.0936, close: 1.0942, volume: 1410 },
            { datetime: '2024-01-15T10:05:00', open: 1.0935, high: 1.0940, low: 1.0933, close: 1.0938, volume: 1275 },
            { datetime: '2024-01-15T10:00:00', open: 1.0932, high: 1.0937, low: 1.0930, close: 1.0935, volume: 1350 },
            { datetime: '2024-01-15T09:55:00', open: 1.0928, high: 1.0934, low: 1.0926, close: 1.0932, volume: 1190 },
            { datetime: '2024-01-15T09:50:00', open: 1.0925, high: 1.0930, low: 1.0923, close: 1.0928, volume: 1480 },
            { datetime: '2024-01-15T09:45:00', open: 1.0922, high: 1.0927, low: 1.0920, close: 1.0925, volume: 1220 },
            { datetime: '2024-01-15T09:40:00', open: 1.0918, high: 1.0924, low: 1.0916, close: 1.0922, volume: 1380 },
            { datetime: '2024-01-15T09:35:00', open: 1.0915, high: 1.0920, low: 1.0913, close: 1.0918, volume: 1150 },
            { datetime: '2024-01-15T09:30:00', open: 1.0912, high: 1.0917, low: 1.0910, close: 1.0915, volume: 1290 },
            { datetime: '2024-01-15T09:25:00', open: 1.0908, high: 1.0914, low: 1.0906, close: 1.0912, volume: 1420 },
            { datetime: '2024-01-15T09:20:00', open: 1.0905, high: 1.0910, low: 1.0903, close: 1.0908, volume: 1180 },
            { datetime: '2024-01-15T09:15:00', open: 1.0902, high: 1.0907, low: 1.0900, close: 1.0905, volume: 1350 },
            { datetime: '2024-01-15T09:10:00', open: 1.0898, high: 1.0904, low: 1.0896, close: 1.0902, volume: 1240 },
            { datetime: '2024-01-15T09:05:00', open: 1.0895, high: 1.0900, low: 1.0893, close: 1.0898, volume: 1460 },
            { datetime: '2024-01-15T09:00:00', open: 1.0892, high: 1.0897, low: 1.0890, close: 1.0895, volume: 1320 },
            { datetime: '2024-01-15T08:55:00', open: 1.0888, high: 1.0894, low: 1.0886, close: 1.0892, volume: 1190 },
            { datetime: '2024-01-15T08:50:00', open: 1.0885, high: 1.0890, low: 1.0883, close: 1.0888, volume: 1380 },
            { datetime: '2024-01-15T08:45:00', open: 1.0882, high: 1.0887, low: 1.0880, close: 1.0885, volume: 1250 },
            { datetime: '2024-01-15T08:40:00', open: 1.0878, high: 1.0884, low: 1.0876, close: 1.0882, volume: 1420 },
            { datetime: '2024-01-15T08:35:00', open: 1.0875, high: 1.0880, low: 1.0873, close: 1.0878, volume: 1160 },
            { datetime: '2024-01-15T08:30:00', open: 1.0872, high: 1.0877, low: 1.0870, close: 1.0875, volume: 1340 },
            { datetime: '2024-01-15T08:25:00', open: 1.0868, high: 1.0874, low: 1.0866, close: 1.0872, volume: 1280 },
            { datetime: '2024-01-15T08:20:00', open: 1.0865, high: 1.0870, low: 1.0863, close: 1.0868, volume: 1450 },
            { datetime: '2024-01-15T08:15:00', open: 1.0862, high: 1.0867, low: 1.0860, close: 1.0865, volume: 1210 },
            { datetime: '2024-01-15T08:10:00', open: 1.0858, high: 1.0864, low: 1.0856, close: 1.0862, volume: 1370 },
            { datetime: '2024-01-15T08:05:00', open: 1.0855, high: 1.0860, low: 1.0853, close: 1.0858, volume: 1190 },
            { datetime: '2024-01-15T08:00:00', open: 1.0852, high: 1.0857, low: 1.0850, close: 1.0855, volume: 1480 },
            { datetime: '2024-01-15T07:55:00', open: 1.0848, high: 1.0854, low: 1.0846, close: 1.0852, volume: 1320 },
            { datetime: '2024-01-15T07:50:00', open: 1.0845, high: 1.0850, low: 1.0843, close: 1.0848, volume: 1240 },
            { datetime: '2024-01-15T07:45:00', open: 1.0842, high: 1.0847, low: 1.0840, close: 1.0845, volume: 1390 },
            { datetime: '2024-01-15T07:40:00', open: 1.0838, high: 1.0844, low: 1.0836, close: 1.0842, volume: 1150 },
            { datetime: '2024-01-15T07:35:00', open: 1.0835, high: 1.0840, low: 1.0833, close: 1.0838, volume: 1460 },
            { datetime: '2024-01-15T07:30:00', open: 1.0832, high: 1.0837, low: 1.0830, close: 1.0835, volume: 1280 },
            { datetime: '2024-01-15T07:25:00', open: 1.0828, high: 1.0834, low: 1.0826, close: 1.0832, volume: 1350 },
            { datetime: '2024-01-15T07:20:00', open: 1.0825, high: 1.0830, low: 1.0823, close: 1.0828, volume: 1220 },
            { datetime: '2024-01-15T07:15:00', open: 1.0822, high: 1.0827, low: 1.0820, close: 1.0825, volume: 1410 },
            { datetime: '2024-01-15T07:10:00', open: 1.0818, high: 1.0824, low: 1.0816, close: 1.0822, volume: 1180 },
            { datetime: '2024-01-15T07:05:00', open: 1.0815, high: 1.0820, low: 1.0813, close: 1.0818, volume: 1340 },
            { datetime: '2024-01-15T07:00:00', open: 1.0812, high: 1.0817, low: 1.0810, close: 1.0815, volume: 1270 },
            { datetime: '2024-01-15T06:55:00', open: 1.0808, high: 1.0814, low: 1.0806, close: 1.0812, volume: 1450 },
            { datetime: '2024-01-15T06:50:00', open: 1.0805, high: 1.0810, low: 1.0803, close: 1.0808, volume: 1190 },
            { datetime: '2024-01-15T06:45:00', open: 1.0802, high: 1.0807, low: 1.0800, close: 1.0805, volume: 1380 },
            { datetime: '2024-01-15T06:40:00', open: 1.0798, high: 1.0804, low: 1.0796, close: 1.0802, volume: 1250 },
            { datetime: '2024-01-15T06:35:00', open: 1.0795, high: 1.0800, low: 1.0793, close: 1.0798, volume: 1420 },
            { datetime: '2024-01-15T06:30:00', open: 1.0792, high: 1.0797, low: 1.0790, close: 1.0795, volume: 1160 },
            { datetime: '2024-01-15T06:25:00', open: 1.0788, high: 1.0794, low: 1.0786, close: 1.0792, volume: 1340 },
            { datetime: '2024-01-15T06:20:00', open: 1.0785, high: 1.0790, low: 1.0783, close: 1.0788, volume: 1280 }
        ]
    },
    
    // بيانات GBP/USD
    'GBP/USD': {
        symbol: 'GBP/USD',
        interval: '5min',
        lastUpdate: '2024-01-15T10:30:00Z',
        values: [
            { datetime: '2024-01-15T10:30:00', open: 1.2745, high: 1.2752, low: 1.2742, close: 1.2748, volume: 980 },
            { datetime: '2024-01-15T10:25:00', open: 1.2738, high: 1.2747, low: 1.2735, close: 1.2745, volume: 1120 },
            { datetime: '2024-01-15T10:20:00', open: 1.2732, high: 1.2740, low: 1.2729, close: 1.2738, volume: 1050 },
            { datetime: '2024-01-15T10:15:00', open: 1.2725, high: 1.2734, low: 1.2722, close: 1.2732, volume: 1280 },
            { datetime: '2024-01-15T10:10:00', open: 1.2718, high: 1.2727, low: 1.2715, close: 1.2725, volume: 1150 },
            { datetime: '2024-01-15T10:05:00', open: 1.2712, high: 1.2720, low: 1.2709, close: 1.2718, volume: 1340 },
            { datetime: '2024-01-15T10:00:00', open: 1.2705, high: 1.2714, low: 1.2702, close: 1.2712, volume: 1080 },
            { datetime: '2024-01-15T09:55:00', open: 1.2698, high: 1.2707, low: 1.2695, close: 1.2705, volume: 1420 },
            { datetime: '2024-01-15T09:50:00', open: 1.2692, high: 1.2700, low: 1.2689, close: 1.2698, volume: 1190 },
            { datetime: '2024-01-15T09:45:00', open: 1.2685, high: 1.2694, low: 1.2682, close: 1.2692, volume: 1350 },
            { datetime: '2024-01-15T09:40:00', open: 1.2678, high: 1.2687, low: 1.2675, close: 1.2685, volume: 1220 },
            { datetime: '2024-01-15T09:35:00', open: 1.2672, high: 1.2680, low: 1.2669, close: 1.2678, volume: 1480 },
            { datetime: '2024-01-15T09:30:00', open: 1.2665, high: 1.2674, low: 1.2662, close: 1.2672, volume: 1110 },
            { datetime: '2024-01-15T09:25:00', open: 1.2658, high: 1.2667, low: 1.2655, close: 1.2665, volume: 1390 },
            { datetime: '2024-01-15T09:20:00', open: 1.2652, high: 1.2660, low: 1.2649, close: 1.2658, volume: 1250 },
            { datetime: '2024-01-15T09:15:00', open: 1.2645, high: 1.2654, low: 1.2642, close: 1.2652, volume: 1180 },
            { datetime: '2024-01-15T09:10:00', open: 1.2638, high: 1.2647, low: 1.2635, close: 1.2645, volume: 1420 },
            { datetime: '2024-01-15T09:05:00', open: 1.2632, high: 1.2640, low: 1.2629, close: 1.2638, volume: 1320 },
            { datetime: '2024-01-15T09:00:00', open: 1.2625, high: 1.2634, low: 1.2622, close: 1.2632, volume: 1160 },
            { datetime: '2024-01-15T08:55:00', open: 1.2618, high: 1.2627, low: 1.2615, close: 1.2625, volume: 1380 },
            { datetime: '2024-01-15T08:50:00', open: 1.2612, high: 1.2620, low: 1.2609, close: 1.2618, volume: 1240 },
            { datetime: '2024-01-15T08:45:00', open: 1.2605, high: 1.2614, low: 1.2602, close: 1.2612, volume: 1450 },
            { datetime: '2024-01-15T08:40:00', open: 1.2598, high: 1.2607, low: 1.2595, close: 1.2605, volume: 1190 },
            { datetime: '2024-01-15T08:35:00', open: 1.2592, high: 1.2600, low: 1.2589, close: 1.2598, volume: 1350 },
            { datetime: '2024-01-15T08:30:00', open: 1.2585, high: 1.2594, low: 1.2582, close: 1.2592, volume: 1280 },
            { datetime: '2024-01-15T08:25:00', open: 1.2578, high: 1.2587, low: 1.2575, close: 1.2585, volume: 1420 },
            { datetime: '2024-01-15T08:20:00', open: 1.2572, high: 1.2580, low: 1.2569, close: 1.2578, volume: 1150 },
            { datetime: '2024-01-15T08:15:00', open: 1.2565, high: 1.2574, low: 1.2562, close: 1.2572, volume: 1380 },
            { datetime: '2024-01-15T08:10:00', open: 1.2558, high: 1.2567, low: 1.2555, close: 1.2565, volume: 1220 },
            { datetime: '2024-01-15T08:05:00', open: 1.2552, high: 1.2560, low: 1.2549, close: 1.2558, volume: 1480 },
            { datetime: '2024-01-15T08:00:00', open: 1.2545, high: 1.2554, low: 1.2542, close: 1.2552, volume: 1310 },
            { datetime: '2024-01-15T07:55:00', open: 1.2538, high: 1.2547, low: 1.2535, close: 1.2545, volume: 1190 },
            { datetime: '2024-01-15T07:50:00', open: 1.2532, high: 1.2540, low: 1.2529, close: 1.2538, volume: 1420 },
            { datetime: '2024-01-15T07:45:00', open: 1.2525, high: 1.2534, low: 1.2522, close: 1.2532, volume: 1250 },
            { datetime: '2024-01-15T07:40:00', open: 1.2518, high: 1.2527, low: 1.2515, close: 1.2525, volume: 1380 },
            { datetime: '2024-01-15T07:35:00', open: 1.2512, high: 1.2520, low: 1.2509, close: 1.2518, volume: 1160 },
            { datetime: '2024-01-15T07:30:00', open: 1.2505, high: 1.2514, low: 1.2502, close: 1.2512, volume: 1450 },
            { datetime: '2024-01-15T07:25:00', open: 1.2498, high: 1.2507, low: 1.2495, close: 1.2505, volume: 1280 },
            { datetime: '2024-01-15T07:20:00', open: 1.2492, high: 1.2500, low: 1.2489, close: 1.2498, volume: 1350 },
            { datetime: '2024-01-15T07:15:00', open: 1.2485, high: 1.2494, low: 1.2482, close: 1.2492, volume: 1220 },
            { datetime: '2024-01-15T07:10:00', open: 1.2478, high: 1.2487, low: 1.2475, close: 1.2485, volume: 1410 },
            { datetime: '2024-01-15T07:05:00', open: 1.2472, high: 1.2480, low: 1.2469, close: 1.2478, volume: 1180 },
            { datetime: '2024-01-15T07:00:00', open: 1.2465, high: 1.2474, low: 1.2462, close: 1.2472, volume: 1340 },
            { datetime: '2024-01-15T06:55:00', open: 1.2458, high: 1.2467, low: 1.2455, close: 1.2465, volume: 1270 },
            { datetime: '2024-01-15T06:50:00', open: 1.2452, high: 1.2460, low: 1.2449, close: 1.2458, volume: 1450 },
            { datetime: '2024-01-15T06:45:00', open: 1.2445, high: 1.2454, low: 1.2442, close: 1.2452, volume: 1190 },
            { datetime: '2024-01-15T06:40:00', open: 1.2438, high: 1.2447, low: 1.2435, close: 1.2445, volume: 1380 },
            { datetime: '2024-01-15T06:35:00', open: 1.2432, high: 1.2440, low: 1.2429, close: 1.2438, volume: 1250 },
            { datetime: '2024-01-15T06:30:00', open: 1.2425, high: 1.2434, low: 1.2422, close: 1.2432, volume: 1420 },
            { datetime: '2024-01-15T06:25:00', open: 1.2418, high: 1.2427, low: 1.2415, close: 1.2425, volume: 1160 }
        ]
    },
    
    // بيانات USD/JPY
    'USD/JPY': {
        symbol: 'USD/JPY',
        interval: '5min',
        lastUpdate: '2024-01-15T10:30:00Z',
        values: [
            { datetime: '2024-01-15T10:30:00', open: 148.25, high: 148.42, low: 148.18, close: 148.35, volume: 1450 },
            { datetime: '2024-01-15T10:25:00', open: 148.12, high: 148.28, low: 148.05, close: 148.25, volume: 1320 },
            { datetime: '2024-01-15T10:20:00', open: 147.98, high: 148.15, low: 147.92, close: 148.12, volume: 1180 },
            { datetime: '2024-01-15T10:15:00', open: 147.85, high: 148.02, low: 147.78, close: 147.98, volume: 1380 },
            { datetime: '2024-01-15T10:10:00', open: 147.72, high: 147.88, low: 147.65, close: 147.85, volume: 1250 },
            { datetime: '2024-01-15T10:05:00', open: 147.58, high: 147.75, low: 147.52, close: 147.72, volume: 1420 },
            { datetime: '2024-01-15T10:00:00', open: 147.45, high: 147.62, low: 147.38, close: 147.58, volume: 1190 },
            { datetime: '2024-01-15T09:55:00', open: 147.32, high: 147.48, low: 147.25, close: 147.45, volume: 1350 },
            { datetime: '2024-01-15T09:50:00', open: 147.18, high: 147.35, low: 147.12, close: 147.32, volume: 1280 },
            { datetime: '2024-01-15T09:45:00', open: 147.05, high: 147.22, low: 146.98, close: 147.18, volume: 1480 },
            { datetime: '2024-01-15T09:40:00', open: 146.92, high: 147.08, low: 146.85, close: 147.05, volume: 1160 },
            { datetime: '2024-01-15T09:35:00', open: 146.78, high: 146.95, low: 146.72, close: 146.92, volume: 1340 },
            { datetime: '2024-01-15T09:30:00', open: 146.65, high: 146.82, low: 146.58, close: 146.78, volume: 1220 },
            { datetime: '2024-01-15T09:25:00', open: 146.52, high: 146.68, low: 146.45, close: 146.65, volume: 1410 },
            { datetime: '2024-01-15T09:20:00', open: 146.38, high: 146.55, low: 146.32, close: 146.52, volume: 1180 },
            { datetime: '2024-01-15T09:15:00', open: 146.25, high: 146.42, low: 146.18, close: 146.38, volume: 1380 },
            { datetime: '2024-01-15T09:10:00', open: 146.12, high: 146.28, low: 146.05, close: 146.25, volume: 1250 },
            { datetime: '2024-01-15T09:05:00', open: 145.98, high: 146.15, low: 145.92, close: 146.12, volume: 1450 },
            { datetime: '2024-01-15T09:00:00', open: 145.85, high: 146.02, low: 145.78, close: 145.98, volume: 1320 },
            { datetime: '2024-01-15T08:55:00', open: 145.72, high: 145.88, low: 145.65, close: 145.85, volume: 1190 },
            { datetime: '2024-01-15T08:50:00', open: 145.58, high: 145.75, low: 145.52, close: 145.72, volume: 1420 },
            { datetime: '2024-01-15T08:45:00', open: 145.45, high: 145.62, low: 145.38, close: 145.58, volume: 1280 },
            { datetime: '2024-01-15T08:40:00', open: 145.32, high: 145.48, low: 145.25, close: 145.45, volume: 1350 },
            { datetime: '2024-01-15T08:35:00', open: 145.18, high: 145.35, low: 145.12, close: 145.32, volume: 1160 },
            { datetime: '2024-01-15T08:30:00', open: 145.05, high: 145.22, low: 144.98, close: 145.18, volume: 1480 },
            { datetime: '2024-01-15T08:25:00', open: 144.92, high: 145.08, low: 144.85, close: 145.05, volume: 1220 },
            { datetime: '2024-01-15T08:20:00', open: 144.78, high: 144.95, low: 144.72, close: 144.92, volume: 1390 },
            { datetime: '2024-01-15T08:15:00', open: 144.65, high: 144.82, low: 144.58, close: 144.78, volume: 1250 },
            { datetime: '2024-01-15T08:10:00', open: 144.52, high: 144.68, low: 144.45, close: 144.65, volume: 1410 },
            { datetime: '2024-01-15T08:05:00', open: 144.38, high: 144.55, low: 144.32, close: 144.52, volume: 1180 },
            { datetime: '2024-01-15T08:00:00', open: 144.25, high: 144.42, low: 144.18, close: 144.38, volume: 1350 },
            { datetime: '2024-01-15T07:55:00', open: 144.12, high: 144.28, low: 144.05, close: 144.25, volume: 1270 },
            { datetime: '2024-01-15T07:50:00', open: 143.98, high: 144.15, low: 143.92, close: 144.12, volume: 1450 },
            { datetime: '2024-01-15T07:45:00', open: 143.85, high: 144.02, low: 143.78, close: 143.98, volume: 1190 },
            { datetime: '2024-01-15T07:40:00', open: 143.72, high: 143.88, low: 143.65, close: 143.85, volume: 1380 },
            { datetime: '2024-01-15T07:35:00', open: 143.58, high: 143.75, low: 143.52, close: 143.72, volume: 1250 },
            { datetime: '2024-01-15T07:30:00', open: 143.45, high: 143.62, low: 143.38, close: 143.58, volume: 1420 },
            { datetime: '2024-01-15T07:25:00', open: 143.32, high: 143.48, low: 143.25, close: 143.45, volume: 1160 },
            { datetime: '2024-01-15T07:20:00', open: 143.18, high: 143.35, low: 143.12, close: 143.32, volume: 1340 },
            { datetime: '2024-01-15T07:15:00', open: 143.05, high: 143.22, low: 142.98, close: 143.18, volume: 1280 },
            { datetime: '2024-01-15T07:10:00', open: 142.92, high: 143.08, low: 142.85, close: 143.05, volume: 1450 },
            { datetime: '2024-01-15T07:05:00', open: 142.78, high: 142.95, low: 142.72, close: 142.92, volume: 1220 },
            { datetime: '2024-01-15T07:00:00', open: 142.65, high: 142.82, low: 142.58, close: 142.78, volume: 1390 },
            { datetime: '2024-01-15T06:55:00', open: 142.52, high: 142.68, low: 142.45, close: 142.65, volume: 1180 },
            { datetime: '2024-01-15T06:50:00', open: 142.38, high: 142.55, low: 142.32, close: 142.52, volume: 1350 },
            { datetime: '2024-01-15T06:45:00', open: 142.25, high: 142.42, low: 142.18, close: 142.38, volume: 1270 },
            { datetime: '2024-01-15T06:40:00', open: 142.12, high: 142.28, low: 142.05, close: 142.25, volume: 1480 },
            { datetime: '2024-01-15T06:35:00', open: 141.98, high: 142.15, low: 141.92, close: 142.12, volume: 1190 },
            { datetime: '2024-01-15T06:30:00', open: 141.85, high: 142.02, low: 141.78, close: 141.98, volume: 1420 },
            { datetime: '2024-01-15T06:25:00', open: 141.72, high: 141.88, low: 141.65, close: 141.85, volume: 1250 }
        ]
    },
    
    // بيانات AUD/USD
    'AUD/USD': {
        symbol: 'AUD/USD',
        interval: '5min',
        lastUpdate: '2024-01-15T10:30:00Z',
        values: [
            { datetime: '2024-01-15T10:30:00', open: 0.6785, high: 0.6792, low: 0.6782, close: 0.6788, volume: 890 },
            { datetime: '2024-01-15T10:25:00', open: 0.6778, high: 0.6787, low: 0.6775, close: 0.6785, volume: 1120 },
            { datetime: '2024-01-15T10:20:00', open: 0.6772, high: 0.6780, low: 0.6769, close: 0.6778, volume: 980 },
            { datetime: '2024-01-15T10:15:00', open: 0.6765, high: 0.6774, low: 0.6762, close: 0.6772, volume: 1250 },
            { datetime: '2024-01-15T10:10:00', open: 0.6758, high: 0.6767, low: 0.6755, close: 0.6765, volume: 1080 },
            { datetime: '2024-01-15T10:05:00', open: 0.6752, high: 0.6760, low: 0.6749, close: 0.6758, volume: 1340 },
            { datetime: '2024-01-15T10:00:00', open: 0.6745, high: 0.6754, low: 0.6742, close: 0.6752, volume: 1150 },
            { datetime: '2024-01-15T09:55:00', open: 0.6738, high: 0.6747, low: 0.6735, close: 0.6745, volume: 1420 },
            { datetime: '2024-01-15T09:50:00', open: 0.6732, high: 0.6740, low: 0.6729, close: 0.6738, volume: 1190 },
            { datetime: '2024-01-15T09:45:00', open: 0.6725, high: 0.6734, low: 0.6722, close: 0.6732, volume: 1350 },
            { datetime: '2024-01-15T09:40:00', open: 0.6718, high: 0.6727, low: 0.6715, close: 0.6725, volume: 1220 },
            { datetime: '2024-01-15T09:35:00', open: 0.6712, high: 0.6720, low: 0.6709, close: 0.6718, volume: 1480 },
            { datetime: '2024-01-15T09:30:00', open: 0.6705, high: 0.6714, low: 0.6702, close: 0.6712, volume: 1110 },
            { datetime: '2024-01-15T09:25:00', open: 0.6698, high: 0.6707, low: 0.6695, close: 0.6705, volume: 1390 },
            { datetime: '2024-01-15T09:20:00', open: 0.6692, high: 0.6700, low: 0.6689, close: 0.6698, volume: 1250 },
            { datetime: '2024-01-15T09:15:00', open: 0.6685, high: 0.6694, low: 0.6682, close: 0.6692, volume: 1180 },
            { datetime: '2024-01-15T09:10:00', open: 0.6678, high: 0.6687, low: 0.6675, close: 0.6685, volume: 1420 },
            { datetime: '2024-01-15T09:05:00', open: 0.6672, high: 0.6680, low: 0.6669, close: 0.6678, volume: 1320 },
            { datetime: '2024-01-15T09:00:00', open: 0.6665, high: 0.6674, low: 0.6662, close: 0.6672, volume: 1160 },
            { datetime: '2024-01-15T08:55:00', open: 0.6658, high: 0.6667, low: 0.6655, close: 0.6665, volume: 1380 },
            { datetime: '2024-01-15T08:50:00', open: 0.6652, high: 0.6660, low: 0.6649, close: 0.6658, volume: 1240 },
            { datetime: '2024-01-15T08:45:00', open: 0.6645, high: 0.6654, low: 0.6642, close: 0.6652, volume: 1450 },
            { datetime: '2024-01-15T08:40:00', open: 0.6638, high: 0.6647, low: 0.6635, close: 0.6645, volume: 1190 },
            { datetime: '2024-01-15T08:35:00', open: 0.6632, high: 0.6640, low: 0.6629, close: 0.6638, volume: 1350 },
            { datetime: '2024-01-15T08:30:00', open: 0.6625, high: 0.6634, low: 0.6622, close: 0.6632, volume: 1280 },
            { datetime: '2024-01-15T08:25:00', open: 0.6618, high: 0.6627, low: 0.6615, close: 0.6625, volume: 1420 },
            { datetime: '2024-01-15T08:20:00', open: 0.6612, high: 0.6620, low: 0.6609, close: 0.6618, volume: 1150 },
            { datetime: '2024-01-15T08:15:00', open: 0.6605, high: 0.6614, low: 0.6602, close: 0.6612, volume: 1380 },
            { datetime: '2024-01-15T08:10:00', open: 0.6598, high: 0.6607, low: 0.6595, close: 0.6605, volume: 1220 },
            { datetime: '2024-01-15T08:05:00', open: 0.6592, high: 0.6600, low: 0.6589, close: 0.6598, volume: 1480 },
            { datetime: '2024-01-15T08:00:00', open: 0.6585, high: 0.6594, low: 0.6582, close: 0.6592, volume: 1310 },
            { datetime: '2024-01-15T07:55:00', open: 0.6578, high: 0.6587, low: 0.6575, close: 0.6585, volume: 1190 },
            { datetime: '2024-01-15T07:50:00', open: 0.6572, high: 0.6580, low: 0.6569, close: 0.6578, volume: 1420 },
            { datetime: '2024-01-15T07:45:00', open: 0.6565, high: 0.6574, low: 0.6562, close: 0.6572, volume: 1250 },
            { datetime: '2024-01-15T07:40:00', open: 0.6558, high: 0.6567, low: 0.6555, close: 0.6565, volume: 1380 },
            { datetime: '2024-01-15T07:35:00', open: 0.6552, high: 0.6560, low: 0.6549, close: 0.6558, volume: 1160 },
            { datetime: '2024-01-15T07:30:00', open: 0.6545, high: 0.6554, low: 0.6542, close: 0.6552, volume: 1450 },
            { datetime: '2024-01-15T07:25:00', open: 0.6538, high: 0.6547, low: 0.6535, close: 0.6545, volume: 1280 },
            { datetime: '2024-01-15T07:20:00', open: 0.6532, high: 0.6540, low: 0.6529, close: 0.6538, volume: 1350 },
            { datetime: '2024-01-15T07:15:00', open: 0.6525, high: 0.6534, low: 0.6522, close: 0.6532, volume: 1220 },
            { datetime: '2024-01-15T07:10:00', open: 0.6518, high: 0.6527, low: 0.6515, close: 0.6525, volume: 1410 },
            { datetime: '2024-01-15T07:05:00', open: 0.6512, high: 0.6520, low: 0.6509, close: 0.6518, volume: 1180 },
            { datetime: '2024-01-15T07:00:00', open: 0.6505, high: 0.6514, low: 0.6502, close: 0.6512, volume: 1340 },
            { datetime: '2024-01-15T06:55:00', open: 0.6498, high: 0.6507, low: 0.6495, close: 0.6505, volume: 1270 },
            { datetime: '2024-01-15T06:50:00', open: 0.6492, high: 0.6500, low: 0.6489, close: 0.6498, volume: 1450 },
            { datetime: '2024-01-15T06:45:00', open: 0.6485, high: 0.6494, low: 0.6482, close: 0.6492, volume: 1190 },
            { datetime: '2024-01-15T06:40:00', open: 0.6478, high: 0.6487, low: 0.6475, close: 0.6485, volume: 1380 },
            { datetime: '2024-01-15T06:35:00', open: 0.6472, high: 0.6480, low: 0.6469, close: 0.6478, volume: 1250 },
            { datetime: '2024-01-15T06:30:00', open: 0.6465, high: 0.6474, low: 0.6462, close: 0.6472, volume: 1420 },
            { datetime: '2024-01-15T06:25:00', open: 0.6458, high: 0.6467, low: 0.6455, close: 0.6465, volume: 1160 }
        ]
    },
    
    // بيانات USD/CAD
    'USD/CAD': {
        symbol: 'USD/CAD',
        interval: '5min',
        lastUpdate: '2024-01-15T10:30:00Z',
        values: [
            { datetime: '2024-01-15T10:30:00', open: 1.3425, high: 1.3432, low: 1.3422, close: 1.3428, volume: 1150 },
            { datetime: '2024-01-15T10:25:00', open: 1.3418, high: 1.3427, low: 1.3415, close: 1.3425, volume: 1280 },
            { datetime: '2024-01-15T10:20:00', open: 1.3412, high: 1.3420, low: 1.3409, close: 1.3418, volume: 1080 },
            { datetime: '2024-01-15T10:15:00', open: 1.3405, high: 1.3414, low: 1.3402, close: 1.3412, volume: 1340 },
            { datetime: '2024-01-15T10:10:00', open: 1.3398, high: 1.3407, low: 1.3395, close: 1.3405, volume: 1190 },
            { datetime: '2024-01-15T10:05:00', open: 1.3392, high: 1.3400, low: 1.3389, close: 1.3398, volume: 1420 },
            { datetime: '2024-01-15T10:00:00', open: 1.3385, high: 1.3394, low: 1.3382, close: 1.3392, volume: 1250 },
            { datetime: '2024-01-15T09:55:00', open: 1.3378, high: 1.3387, low: 1.3375, close: 1.3385, volume: 1380 },
            { datetime: '2024-01-15T09:50:00', open: 1.3372, high: 1.3380, low: 1.3369, close: 1.3378, volume: 1160 },
            { datetime: '2024-01-15T09:45:00', open: 1.3365, high: 1.3374, low: 1.3362, close: 1.3372, volume: 1480 },
            { datetime: '2024-01-15T09:40:00', open: 1.3358, high: 1.3367, low: 1.3355, close: 1.3365, volume: 1220 },
            { datetime: '2024-01-15T09:35:00', open: 1.3352, high: 1.3360, low: 1.3349, close: 1.3358, volume: 1350 },
            { datetime: '2024-01-15T09:30:00', open: 1.3345, high: 1.3354, low: 1.3342, close: 1.3352, volume: 1180 },
            { datetime: '2024-01-15T09:25:00', open: 1.3338, high: 1.3347, low: 1.3335, close: 1.3345, volume: 1450 },
            { datetime: '2024-01-15T09:20:00', open: 1.3332, high: 1.3340, low: 1.3329, close: 1.3338, volume: 1290 },
            { datetime: '2024-01-15T09:15:00', open: 1.3325, high: 1.3334, low: 1.3322, close: 1.3332, volume: 1380 },
            { datetime: '2024-01-15T09:10:00', open: 1.3318, high: 1.3327, low: 1.3315, close: 1.3325, volume: 1150 },
            { datetime: '2024-01-15T09:05:00', open: 1.3312, high: 1.3320, low: 1.3309, close: 1.3318, volume: 1420 },
            { datetime: '2024-01-15T09:00:00', open: 1.3305, high: 1.3314, low: 1.3302, close: 1.3312, volume: 1280 },
            { datetime: '2024-01-15T08:55:00', open: 1.3298, high: 1.3307, low: 1.3295, close: 1.3305, volume: 1350 },
            { datetime: '2024-01-15T08:50:00', open: 1.3292, high: 1.3300, low: 1.3289, close: 1.3298, volume: 1190 },
            { datetime: '2024-01-15T08:45:00', open: 1.3285, high: 1.3294, low: 1.3282, close: 1.3292, volume: 1480 },
            { datetime: '2024-01-15T08:40:00', open: 1.3278, high: 1.3287, low: 1.3275, close: 1.3285, volume: 1220 },
            { datetime: '2024-01-15T08:35:00', open: 1.3272, high: 1.3280, low: 1.3269, close: 1.3278, volume: 1380 },
            { datetime: '2024-01-15T08:30:00', open: 1.3265, high: 1.3274, low: 1.3262, close: 1.3272, volume: 1250 },
            { datetime: '2024-01-15T08:25:00', open: 1.3258, high: 1.3267, low: 1.3255, close: 1.3265, volume: 1420 },
            { datetime: '2024-01-15T08:20:00', open: 1.3252, high: 1.3260, low: 1.3249, close: 1.3258, volume: 1160 },
            { datetime: '2024-01-15T08:15:00', open: 1.3245, high: 1.3254, low: 1.3242, close: 1.3252, volume: 1340 },
            { datetime: '2024-01-15T08:10:00', open: 1.3238, high: 1.3247, low: 1.3235, close: 1.3245, volume: 1280 },
            { datetime: '2024-01-15T08:05:00', open: 1.3232, high: 1.3240, low: 1.3229, close: 1.3238, volume: 1450 },
            { datetime: '2024-01-15T08:00:00', open: 1.3225, high: 1.3234, low: 1.3222, close: 1.3232, volume: 1190 },
            { datetime: '2024-01-15T07:55:00', open: 1.3218, high: 1.3227, low: 1.3215, close: 1.3225, volume: 1380 },
            { datetime: '2024-01-15T07:50:00', open: 1.3212, high: 1.3220, low: 1.3209, close: 1.3218, volume: 1250 },
            { datetime: '2024-01-15T07:45:00', open: 1.3205, high: 1.3214, low: 1.3202, close: 1.3212, volume: 1420 },
            { datetime: '2024-01-15T07:40:00', open: 1.3198, high: 1.3207, low: 1.3195, close: 1.3205, volume: 1160 },
            { datetime: '2024-01-15T07:35:00', open: 1.3192, high: 1.3200, low: 1.3189, close: 1.3198, volume: 1350 },
            { datetime: '2024-01-15T07:30:00', open: 1.3185, high: 1.3194, low: 1.3182, close: 1.3192, volume: 1280 },
            { datetime: '2024-01-15T07:25:00', open: 1.3178, high: 1.3187, low: 1.3175, close: 1.3185, volume: 1450 },
            { datetime: '2024-01-15T07:20:00', open: 1.3172, high: 1.3180, low: 1.3169, close: 1.3178, volume: 1190 },
            { datetime: '2024-01-15T07:15:00', open: 1.3165, high: 1.3174, low: 1.3162, close: 1.3172, volume: 1420 },
            { datetime: '2024-01-15T07:10:00', open: 1.3158, high: 1.3167, low: 1.3155, close: 1.3165, volume: 1250 },
            { datetime: '2024-01-15T07:05:00', open: 1.3152, high: 1.3160, low: 1.3149, close: 1.3158, volume: 1380 },
            { datetime: '2024-01-15T07:00:00', open: 1.3145, high: 1.3154, low: 1.3142, close: 1.3152, volume: 1160 },
            { datetime: '2024-01-15T06:55:00', open: 1.3138, high: 1.3147, low: 1.3135, close: 1.3145, volume: 1480 },
            { datetime: '2024-01-15T06:50:00', open: 1.3132, high: 1.3140, low: 1.3129, close: 1.3138, volume: 1220 },
            { datetime: '2024-01-15T06:45:00', open: 1.3125, high: 1.3134, low: 1.3122, close: 1.3132, volume: 1350 },
            { datetime: '2024-01-15T06:40:00', open: 1.3118, high: 1.3127, low: 1.3115, close: 1.3125, volume: 1280 },
            { datetime: '2024-01-15T06:35:00', open: 1.3112, high: 1.3120, low: 1.3109, close: 1.3118, volume: 1450 },
            { datetime: '2024-01-15T06:30:00', open: 1.3105, high: 1.3114, low: 1.3102, close: 1.3112, volume: 1190 },
            { datetime: '2024-01-15T06:25:00', open: 1.3098, high: 1.3107, low: 1.3095, close: 1.3105, volume: 1420 }
        ]
    }
};

/**
 * مولد البيانات الاحتياطية - Backup Data Generator
 * يولد بيانات واقعية للاختبار والاستخدام عند عدم توفر APIs
 */
class BackupDataGenerator {
    constructor() {
        this.baseData = BackupData;
    }
    
    /**
     * الحصول على بيانات احتياطية لزوج عملات
     * @param {string} symbol - زوج العملات
     * @param {string} interval - الفترة الزمنية
     * @param {number} outputsize - عدد النقاط المطلوبة
     * @returns {Object} البيانات الاحتياطية
     */
    getBackupData(symbol, interval = '5min', outputsize = 50) {
        const baseSymbolData = this.baseData[symbol];
        
        if (!baseSymbolData) {
            // إذا لم يكن الزوج متوفراً، نولد بيانات عشوائية واقعية
            return this.generateRealisticData(symbol, interval, outputsize);
        }
        
        // نسخ البيانات الأساسية
        let data = JSON.parse(JSON.stringify(baseSymbolData));
        
        // تحديث البيانات لتكون حديثة
        data = this.updateDataToCurrentTime(data, interval);
        
        // تعديل عدد النقاط حسب المطلوب
        if (outputsize && outputsize < data.values.length) {
            data.values = data.values.slice(0, outputsize);
        } else if (outputsize && outputsize > data.values.length) {
            // توليد نقاط إضافية
            data.values = this.extendData(data.values, outputsize, symbol);
        }
        
        return {
            symbol: symbol,
            interval: interval,
            source: 'backup_data',
            lastUpdate: new Date().toISOString(),
            values: data.values
        };
    }
    
    /**
     * تحديث البيانات لتكون حديثة
     * @param {Object} data - البيانات الأساسية
     * @param {string} interval - الفترة الزمنية
     * @returns {Object} البيانات المحدثة
     */
    updateDataToCurrentTime(data, interval) {
        const now = new Date();
        const intervalMinutes = this.getIntervalMinutes(interval);
        
        // تحديث التواريخ لتكون حديثة
        data.values.forEach((value, index) => {
            const timeOffset = index * intervalMinutes * 60 * 1000;
            const newTime = new Date(now.getTime() - timeOffset);
            value.datetime = newTime.toISOString().slice(0, 19);
        });
        
        data.lastUpdate = now.toISOString();
        
        return data;
    }
    
    /**
     * توليد بيانات واقعية لزوج عملات غير متوفر
     * @param {string} symbol - زوج العملات
     * @param {string} interval - الفترة الزمنية
     * @param {number} outputsize - عدد النقاط
     * @returns {Object} البيانات المولدة
     */
    generateRealisticData(symbol, interval, outputsize) {
        const basePrice = this.getBasePriceForSymbol(symbol);
        const volatility = this.getVolatilityForSymbol(symbol);
        const intervalMinutes = this.getIntervalMinutes(interval);
        
        const values = [];
        const now = new Date();
        
        let currentPrice = basePrice;
        
        for (let i = 0; i < outputsize; i++) {
            const timeOffset = i * intervalMinutes * 60 * 1000;
            const candleTime = new Date(now.getTime() - timeOffset);
            
            // توليد تغيير عشوائي واقعي
            const change = (Math.random() - 0.5) * volatility * currentPrice;
            const open = currentPrice;
            const close = open + change;
            
            // توليد high و low بناءً على open و close
            const high = Math.max(open, close) + (Math.random() * volatility * currentPrice * 0.3);
            const low = Math.min(open, close) - (Math.random() * volatility * currentPrice * 0.3);
            
            // توليد حجم تداول عشوائي
            const volume = Math.floor(Math.random() * 2000) + 500;
            
            values.unshift({
                datetime: candleTime.toISOString().slice(0, 19),
                open: parseFloat(open.toFixed(5)),
                high: parseFloat(high.toFixed(5)),
                low: parseFloat(low.toFixed(5)),
                close: parseFloat(close.toFixed(5)),
                volume: volume
            });
            
            currentPrice = close;
        }
        
        return {
            symbol: symbol,
            interval: interval,
            source: 'generated_backup_data',
            lastUpdate: now.toISOString(),
            values: values
        };
    }
    
    /**
     * تمديد البيانات الموجودة
     * @param {Array} existingValues - القيم الموجودة
     * @param {number} targetSize - العدد المطلوب
     * @param {string} symbol - زوج العملات
     * @returns {Array} القيم الممددة
     */
    extendData(existingValues, targetSize, symbol) {
        if (existingValues.length >= targetSize) {
            return existingValues;
        }
        
        const additionalPoints = targetSize - existingValues.length;
        const volatility = this.getVolatilityForSymbol(symbol);
        const lastValue = existingValues[existingValues.length - 1];
        
        let currentPrice = lastValue.close;
        const lastTime = new Date(lastValue.datetime + 'Z');
        
        for (let i = 1; i <= additionalPoints; i++) {
            const newTime = new Date(lastTime.getTime() - (i * 5 * 60 * 1000)); // 5 دقائق للخلف
            
            const change = (Math.random() - 0.5) * volatility * currentPrice;
            const open = currentPrice;
            const close = open + change;
            const high = Math.max(open, close) + (Math.random() * volatility * currentPrice * 0.2);
            const low = Math.min(open, close) - (Math.random() * volatility * currentPrice * 0.2);
            const volume = Math.floor(Math.random() * 1500) + 800;
            
            existingValues.push({
                datetime: newTime.toISOString().slice(0, 19),
                open: parseFloat(open.toFixed(5)),
                high: parseFloat(high.toFixed(5)),
                low: parseFloat(low.toFixed(5)),
                close: parseFloat(close.toFixed(5)),
                volume: volume
            });
            
            currentPrice = close;
        }
        
        return existingValues;
    }
    
    /**
     * الحصول على السعر الأساسي لزوج العملات
     * @param {string} symbol - زوج العملات
     * @returns {number} السعر الأساسي
     */
    getBasePriceForSymbol(symbol) {
        const basePrices = {
            'EUR/USD': 1.0950,
            'GBP/USD': 1.2750,
            'USD/JPY': 148.00,
            'AUD/USD': 0.6780,
            'USD/CAD': 1.3420,
            'USD/CHF': 0.8950,
            'NZD/USD': 0.6250,
            'EUR/GBP': 0.8750,
            'EUR/JPY': 162.00,
            'GBP/JPY': 185.00,
            'BTC/USD': 42000,
            'ETH/USD': 2500
        };
        
        return basePrices[symbol] || 1.0000;
    }
    
    /**
     * الحصول على التذبذب لزوج العملات
     * @param {string} symbol - زوج العملات
     * @returns {number} نسبة التذبذب
     */
    getVolatilityForSymbol(symbol) {
        const volatilities = {
            'EUR/USD': 0.002,
            'GBP/USD': 0.003,
            'USD/JPY': 0.002,
            'AUD/USD': 0.004,
            'USD/CAD': 0.002,
            'USD/CHF': 0.002,
            'NZD/USD': 0.004,
            'EUR/GBP': 0.002,
            'EUR/JPY': 0.003,
            'GBP/JPY': 0.004,
            'BTC/USD': 0.05,
            'ETH/USD': 0.06
        };
        
        return volatilities[symbol] || 0.002;
    }
    
    /**
     * تحويل الفترة الزمنية إلى دقائق
     * @param {string} interval - الفترة الزمنية
     * @returns {number} عدد الدقائق
     */
    getIntervalMinutes(interval) {
        const intervals = {
            '1min': 1,
            '5min': 5,
            '15min': 15,
            '30min': 30,
            '1h': 60,
            '4h': 240,
            '1day': 1440
        };
        
        return intervals[interval] || 5;
    }
    
    /**
     * الحصول على قائمة الأزواج المدعومة
     * @returns {Array} قائمة الأزواج
     */
    getSupportedPairs() {
        return Object.keys(this.baseData).concat([
            'USD/CHF', 'NZD/USD', 'EUR/GBP', 'EUR/JPY', 'GBP/JPY',
            'AUD/JPY', 'CAD/JPY', 'CHF/JPY', 'EUR/AUD', 'GBP/AUD',
            'BTC/USD', 'ETH/USD'
        ]);
    }
}

// تصدير للاستخدام
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BackupData, BackupDataGenerator };
} else {
    window.BackupData = BackupData;
    window.BackupDataGenerator = BackupDataGenerator;
}

