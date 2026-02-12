import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const inputJsonPath = path.join(projectRoot, "recipe_list.json");
const outputZhJsonPath = path.join(projectRoot, "recipe_list.zh-CN.json");
const outputEnBackupJsonPath = path.join(projectRoot, "recipe_list.en.json");
const outputMapJsonPath = path.join(projectRoot, "translation_map.zh-CN.json");

const EXACT_MAP = new Map([
  ["", ""],
  ["Anvil", "铁砧"],
  ["Knife", "小刀"],
  ["Bow String", "弓弦"],
  ["Arrowhead", "箭头"],
  ["Silver Arrowhead", "银箭头"],
  ["Static Cloud Arrowhead", "静电云箭头"],
  ["Explosive Arrowhead", "爆炸箭头"],
  ["Steam Arrowhead", "蒸汽箭头"],
  ["Flashbang Grenade", "闪光手雷"],
  ["Mustard Gas Grenade", "芥子毒气手雷"],
  ["Empty Canister", "空罐"],
  ["Empty Grenade", "空手雷"],
  ["Any Armor", "任意护甲"],
  ["Any Weapon", "任意武器"],
  ["Any Armor Piece", "任意护甲部件"],
  ["Any Shield", "任意盾牌"],
  ["Any", "任意"],
  ["PotionWaterRes", "水抗性药剂"],
  ["Bonedust", "骨灰"],
  ["Sinew", "腱筋"],
  ["Tormented Soul", "受难灵魂"],
  ["Void Essence", "虚空精华"],
  ["Eye", "眼球"],
  ["Tooth", "牙齿"],
  ["Pearl", "珍珠"],
  ["Ruby", "红宝石"],
  ["Silver Bar", "银锭"],
  ["Iron Bar", "铁锭"],
  ["Steel Bar", "钢锭"],
  ["Large Iron Bar", "大块铁锭"],
  ["Large Steel Bar", "大块钢锭"],
  ["Metal Shield", "金属盾牌"],
  ["Scale Armor", "鳞甲"],
  ["PixieDust", "仙尘"],
  ["Augmentor", "增长剂"],
  ["NeedleandThread", "针线"],
  ["Mortar and Pestle", "研钵与研杵"],
  ["SheetofPaper", "纸张"],
  ["BottleofOil", "一瓶油"],
  ["CupofMilk", "一杯牛奶"],
  ["CupofBeer", "一杯啤酒"],
  ["BottleofWine", "一瓶葡萄酒"],
  ["OilBarrel", "油桶"],
  ["BarrelLid", "桶盖"],
  ["Farhangite", "法杭草"],
  ["FannyBlossom", "鸡冠花"],
  ["Pixie Dust", "仙尘"],
  ["Barrel Lid", "桶盖"],
  ["Oil Barrel", "油桶"],
  ["Beer Barrel", "啤酒桶"],
  ["Wine Barrel", "葡萄酒桶"],
  ["Bottle of Oil", "一瓶油"],
  ["Cup of Milk", "一杯牛奶"],
  ["Cup of Beer", "一杯啤酒"],
  ["Bottle of Wine", "一瓶葡萄酒"],
  ["Cooking Pot", "烹饪锅"],
  ["Drudanae", "麻草"],
  ["Jelleyroom", "果胶菇"],
  ["Jellyroom", "果胶菇"],
  ["Penny Bun Mushroom", "硬币包蘑菇"],
  ["PennyBunMushroom", "硬币包蘑菇"],
  ["Jar of Honey", "一罐蜂蜜"],
  ["WoodChips", "木屑"],
  ["Moondust", "月尘"],
  ["Moonstone", "月长石"],
  ["Mush of Wood", "木屑糊"],
  ["Cold Mashed Potatos", "冷土豆泥"],
  ["Cup of Tea", "一杯茶"],
  ["TeaHerbs", "茶草本"],
  ["Tea Herbs", "茶草本"],
  ["Pizza Dough", "披萨面团"],
  ["Fanny Blossom", "鸡冠花"],
  ["Wood Chips", "木屑"],
  ["Bucket", "桶"],
  ["Bucket of Water", "一桶水"],
  ["Bucket of Milk", "一桶牛奶"],
  ["Mortar and Pestle | Hammer", "研钵与研杵｜锤子"],
  ["PoormansBestTorso", "穷人的最佳胸甲"],
  ["PoormansBest", "穷人的最佳"],
  ["Earth Tongue Mushroom", "地舌菇"],
  ["EarthTongueMushroom", "地舌菇"],
  ["Guepinia Mushroom", "花儿菇"],
  ["GuepiniaMushroom", "花儿菇"],
  ["Bluegill Mushroom", "蓝鳃菇"],
  ["BluegillMushroom", "蓝鳃菇"],
  ["DwarvenStew", "矮人炖菜"],
  ["ElvenStew", "精灵炖菜"],
  ["ImmunitytoFalldown", "免疫滑倒"],
  ["Immunity to Falldown", "免疫滑倒"],
  ["Stardust Herb", "星辰草"],
  ["Third Eye", "第三只眼"],
  ["Helmet Third Eye", "第三只眼头盔"],
]);

const RECIPE_TYPE_MAP = new Map([
  ["Arrows", "箭矢"],
  ["Weapons", "武器"],
  ["Armor", "护甲"],
  ["Armor Enchant", "护甲附魔"],
  ["Grenades", "手雷"],
  ["Potions", "药剂"],
  ["Objects", "物品"],
  ["Food", "食物"],
  ["Runes", "符文"],
  ["Scrolls", "卷轴"],
  ["Skillbooks", "技能书"],
  ["Crafting", "合成"],
]);

const SKILL_MAP = new Map([
  ["", ""],
  ["Crafting", "工艺"],
  ["Smithing", "锻造"],
  ["Cooking", "烹饪"],
]);

const TOKEN_MAP = new Map([
  ["Any", "任意"],
  ["Add", "附加"],
  ["Added", "附加"],
  ["Boost", "强化"],
  ["Boosted", "强化"],
  ["Value", "价值"],
  ["Movement", "移动"],
  ["Durability", "耐久"],
  ["Blocking", "格挡"],
  ["Damage", "伤害"],
  ["Resist", "抗性"],
  ["Resistance", "抗性"],
  ["All", "全"],
  ["Defence", "防御"],
  ["Defense", "防御"],
  ["Air", "空气"],
  ["Water", "水"],
  ["Fire", "火焰"],
  ["Earth", "大地"],
  ["Poison", "毒素"],
  ["Potion", "药剂"],
  ["Invisibility", "隐形"],
  ["Grenade", "手雷"],
  ["Holy", "神圣"],
  ["Arrow", "箭"],
  ["Arrowhead", "箭头"],
  ["Shaft", "箭杆"],
  ["Slowdown", "减速"],
  ["Knockdown", "击倒"],
  ["Stunning", "眩晕"],
  ["Cloud", "云"],
  ["Static", "静电"],
  ["Explosive", "爆炸"],
  ["Flashbang", "闪光"],
  ["Mustard", "芥子"],
  ["Gas", "毒气"],
  ["Silver", "银"],
  ["Iron", "铁"],
  ["Steel", "钢"],
  ["Large", "大块"],
  ["Bar", "锭"],
  ["Crafted", "打造"],
  ["Two", "双"],
  ["Handed", "手"],
  ["One", "单"],
  ["Axe", "斧"],
  ["Sword", "剑"],
  ["Dagger", "匕首"],
  ["Knife", "小刀"],
  ["Hammer", "锤子"],
  ["Crossbow", "弩"],
  ["Shield", "盾牌"],
  ["Metal", "金属"],
  ["Scale", "鳞"],
  ["Armor", "护甲"],
  ["Clothing", "衣物"],
  ["Helmet", "头盔"],
  ["Leather", "皮革"],
  ["Cloth", "布料"],
  ["Scraps", "碎片"],
  ["String", "弦"],
  ["Rope", "绳子"],
  ["Thread", "线"],
  ["Needle", "针"],
  ["Branch", "树枝"],
  ["Ring", "戒指"],
  ["Oven", "烤炉"],
  ["Barrel", "桶"],
  ["Well", "水井"],
  ["Bucket", "桶"],
  ["Dough", "面团"],
  ["Sheet", "纸张"],
  ["Paper", "纸"],
  ["Ink", "墨水"],
  ["Pot", "罐"],
  ["Jar", "罐"],
  ["Quill", "羽毛笔"],
  ["Cooking", "烹饪"],
  ["Voodoo", "巫毒"],
  ["Doll", "娃娃"],
  ["Feather", "羽毛"],
  ["Chicken", "鸡"],
  ["Foot", "脚"],
  ["Claw", "爪"],
  ["Skull", "骷髅"],
  ["Rat", "老鼠"],
  ["Tail", "尾巴"],
  ["Rabbit", "兔子"],
  ["Paw", "脚"],
  ["Starfish", "海星"],
  ["Tusk", "獠牙"],
  ["Potato", "土豆"],
  ["Apple", "苹果"],
  ["Tomato", "番茄"],
  ["Sauce", "酱"],
  ["Intestines", "肠子"],
  ["Milk", "牛奶"],
  ["Beer", "啤酒"],
  ["Wine", "葡萄酒"],
  ["Oil", "油"],
  ["Dinner", "正餐"],
  ["Lockpick", "开锁器"],
  ["Backpack", "背包"],
  ["Beehive", "蜂巢"],
  ["Joshua", "约书亚"],
  ["Spice", "香料"],
  ["Kickstarter", "众筹"],
  ["Yarn", "纱线"],
  ["Adventurer's", "冒险者的"],
  ["Bow", "弓"],
  ["Staff", "法杖"],
  ["Charming", "魅惑"],
  ["Antler", "鹿角"],
  ["Pie", "派"],
  ["Cheese", "奶酪"],
  ["Bread", "面包"],
  ["Boots", "靴子"],
  ["Figurine", "小雕像"],
  ["Portable", "便携"],
  ["Kitchen", "厨房"],
  ["Blank", "空白"],
  ["Skillbook", "技能书"],
  ["Broken", "破碎"],
  ["Glass", "玻璃杯"],
  ["Stardust", "星尘"],
  ["Telekinesis", "隔空取物"],
  ["Wheat", "小麦"],
  ["Wool", "羊毛"],
  ["Fries", "薯条"],
  ["Pumpkin", "南瓜"],
  ["Cyseal", "塞西尔"],
  ["Part", "部件"],
  ["Grip", "握柄"],
  ["Head", "斧头"],
  ["Handle", "把手"],
  ["Carving", "雕刻"],
  ["Gem", "宝石"],
  ["Blade", "刃"],
  ["Guard", "护手"],
  ["Hilt", "剑柄"],
  ["Taser", "电击"],
  ["Poisoned", "涂毒"],
  ["Fly", "蛤蟆"],
  ["Agaric", "菌"],
  ["Mushroom", "蘑菇"],
  ["Ooze", "黏液"],
  ["Mortar", "研钵"],
  ["Pestle", "研杵"],
  ["Quarterstaff", "长杖"],
  ["Piercing", "穿透"],
  ["Club", "棍棒"],
  ["Nailbomb", "钉子炸弹"],
  ["Stake", "木桩"],
  ["Shoes", "鞋子"],
  ["Pillow", "枕头"],
  ["Love", "恋爱"],
  ["Perfume", "香水"],
  ["perfume", "香水"],
  ["PerfumeBottle", "香水瓶"],
  ["perfumebottle", "香水瓶"],
  ["bottle", "瓶"],
  ["Plate", "盘子"],
  ["Porridge", "粥"],
  ["Raw", "生"],
  ["Meat", "肉"],
  ["Repair", "修理"],
  ["Rotten", "腐烂"],
  ["Eggs", "鸡蛋"],
  ["Scope", "瞄准镜"],
  ["Smokescreen", "烟幕"],
  ["Herb", "草药"],
  ["Steam", "蒸汽"],
  ["Strong", "强韧"],
  ["Whetstone", "磨刀石"],
  ["Wheel", "轮"],
  ["Bone", "骨头"],
  ["Juice", "果汁"],
  ["Orange", "橙子"],
  ["Animal", "动物"],
  ["Hide", "皮"],
  ["Spear", "长矛"],
  ["Fish", "鱼"],
  ["Food", "食物"],
  ["Rivellon", "瑞维隆"],
  ["Boiled", "煮熟"],
  ["Soup", "汤"],
  ["Cooked", "熟"],
  ["Ishmashell", "伊什玛壳"],
  ["Ore", "矿石"],
  ["Soap", "肥皂"],
  ["Key", "钥匙"],
  ["Third", "第三"],
  ["Crab", "螃蟹"],
  ["Pincer", "钳"],
  ["Board", "木板"],
  ["Washtub", "洗衣盆"],
  ["Washboard", "搓衣板"],
  ["Ice", "冰霜"],
  ["Terror", "恐惧"],
  ["Flask", "瓶"],
  ["DwarvenStew", "矮人炖菜"],
  ["ElvenStew", "精灵炖菜"],
  ["Buffalo", "水牛"],
  ["Sabre", "军刀"],
  ["Old", "旧"],
  ["Unique", "独特"],
  ["Belt", "腰带"],
  ["Torso", "胸甲"],
  ["Same", "同"],
  ["School", "学派"],
  ["Flour", "面粉"],
  ["Fuse", "引信"],
  ["Hair", "毛发"],
  ["Chemical", "化学"],
  ["Warfare", "战"],
  ["Balloon", "气球"],
  ["Water", "水"],
  ["Honey", "蜂蜜"],
  ["Eye", "眼球"],
  ["Log", "原木"],
  ["Tooth", "牙齿"],
  ["Long", "长"],
  ["Cold", "冷"],
  ["Mashed", "捣碎"],
  ["Potatos", "土豆"],
  ["Tea", "茶"],
  ["Pizza", "披萨"],
  ["Robe", "长袍"],
  ["Trethon", "特雷松"],
  ["Dye", "染料"],
  ["Dyed", "染成"],
  ["Mystery", "神秘"],
  ["Black", "黑色"],
  ["Blue", "蓝色"],
  ["Green", "绿色"],
  ["Purple", "紫色"],
  ["Red", "红色"],
  ["White", "白色"],
  ["Yellow", "黄色"],
  ["Campfire", "营火"],
  ["Dwarven", "矮人"],
  ["Elven", "精灵"],
  ["Stew", "炖菜"],
  ["Tremor", "地震"],
  ["Flask", "瓶"],
  ["Whisperwood", "轻语木"],
  ["Tongue", "舌"],
  ["Guepinia", "花儿菇"],
  ["Guepinea", "花儿菇"],
  ["Bluegill", "蓝鳃菇"],
  ["Planets", "行星"],
  ["Fiery", "炽热"],
  ["Heart", "心"],
  ["Swirling", "旋涡"],
  ["Mud", "泥"],
  ["Cluster", "集束"],
  ["Bomb", "炸弹"],
  ["Freezing", "冰冻"],
  ["Molotov", "燃烧瓶"],
  ["Golden", "黄金"],
  ["Grail", "圣杯"],
  ["DLC", "追加内容"],
  ["Random", "随机"],
  ["Novice", "新手"],
  ["Adept", "熟练"],
  ["Master", "大师"],
  ["PoormansBest", "穷人的最佳"],
  ["Poormans", "穷人的"],
  ["Best", "最佳"],
  ["Nails", "钉子"],
  ["Nine", "九"],
  ["Inch", "英寸"],
  ["Cup", "杯"],
  ["Mug", "杯"],
  ["Bottle", "瓶"],
  ["Wand", "法杖"],
  ["Wooden", "木制"],
  ["Inert", "惰性"],
  ["LOOT", "战利品"],
  ["Weapon", "武器"],
  ["Enchant", "附魔"],
  ["Pearl", "珍珠"],
  ["Ruby", "红宝石"],
  ["Tenebrium", "泰尼布里姆"],
  ["Effect", "效果"],
  ["Sneaking", "潜行"],
  ["Strength", "力量"],
  ["Dexterity", "敏捷"],
  ["Intelligence", "智力"],
  ["Constitution", "体质"],
  ["Perception", "感知"],
  ["Speed", "速度"],
  ["Minor", "初级"],
  ["Medium", "中级"],
  ["Healing", "治疗"],
  ["Debuf", "减益"],
  ["Debuff", "减益"],
  ["Bonedust", "骨灰"],
  ["Sinew", "腱筋"],
  ["Tormented", "受难"],
  ["Soul", "灵魂"],
  ["Void", "虚空"],
  ["Essence", "精华"],
  ["Empty", "空"],
  ["Canister", "罐"],
  ["Skill", "技能"],
  ["Scroll", "卷轴"],
  ["SkillScroll", "技能卷轴"],
  ["Witchcraft", "巫术"],
  ["Magic", "魔法"],
  ["Fancy", "精致"],
  ["Big", "大"],
  ["Sharp", "锋利"],
  ["Ancient", "古老"],
  ["Tattooed", "纹身"],
  ["Glowing", "发光"],
  ["Lucky", "幸运"],
  ["Super", "超级"],
  ["Amulet", "护身符"],
  ["Eerie", "诡异"],
  ["Creepy", "阴森"],
  ["and", "与"],
  ["or", "或"],
  ["of", "之"],
  ["Of", "之"],
  ["Without", "无"],
  ["with", "与"],
  ["to", "对"],
  ["&", "与"],
  ["and", "与"],
]);

const MULTIWORD_REPLACEMENTS = [
  [/\bTwo Handed\b/gi, "双手"],
  [/\bOne Handed\b/gi, "单手"],
  [/\bAir Resistance Potion\b/gi, "空气抗性药剂"],
  [/\bFire Resistance Potion\b/gi, "火焰抗性药剂"],
  [/\bWater Resistance Potion\b/gi, "水抗性药剂"],
  [/\bEarth Resistance Potion\b/gi, "大地抗性药剂"],
  [/\bPoison Potion\b/gi, "毒素药剂"],
];

function isNumberToken(token) {
  return /^\d+$/.test(token);
}

function translateTokens(text) {
  const parts = text.split(" ");
  const translated = parts.map((part) => translateToken(part));
  if (translated.length >= 2 && isNumberToken(translated[translated.length - 1])) {
    return translated.slice(0, -1).join("") + " " + translated[translated.length - 1];
  }
  return translated.join("");
}

function translateToken(token) {
  if (token === "+") return "+";
  if (isNumberToken(token)) return token;
  const plusSuffixMatch = /^(.+)\+$/.exec(token);
  if (plusSuffixMatch) return `${translateToken(plusSuffixMatch[1])}+`;
  if (/^[A-Z]$/.test(token)) return letterVariantToCn(token);
  const direct = TOKEN_MAP.get(token);
  if (direct !== undefined) return direct;

  const trailingLetterMatch = /^(.+)([A-Z])$/.exec(token);
  if (trailingLetterMatch) {
    return `${translateToken(trailingLetterMatch[1])}${letterVariantToCn(trailingLetterMatch[2])}`;
  }

  const parenSeq = parseParenSequence(token);
  if (parenSeq) {
    const base = parenSeq.base ? translateToken(parenSeq.base) : "";
    const tags = parenSeq.tags.map((t) => `（${translateToken(t)}）`).join("");
    return `${base}${tags}`;
  }

  if (token.includes("|")) {
    return token
      .split("|")
      .map((t) => translateToken(t))
      .join("｜");
  }

  if (token.includes("/")) {
    return token
      .split("/")
      .map((t) => translateToken(t))
      .join("／");
  }

  if (token.includes("_")) {
    return token
      .split("_")
      .filter(Boolean)
      .map((t) => translateToken(t))
      .join("");
  }

  if (token.includes("-")) {
    return token
      .split("-")
      .filter(Boolean)
      .map((t) => translateToken(t))
      .join("");
  }

  let working = token;
  working = working.replace(/([A-Za-z])Without([A-Za-z])/g, "$1 Without $2");
  working = working.replace(/([a-z])([A-Z])/g, "$1 $2");
  if (working.includes(" ")) {
    return working
      .split(" ")
      .filter(Boolean)
      .map((t) => translateToken(t))
      .join("");
  }

  return token;
}

function parseParenSequence(token) {
  const firstOpen = token.indexOf("(");
  if (firstOpen === -1) return null;

  const base = token.slice(0, firstOpen);
  const tags = [];
  let i = firstOpen;
  while (i < token.length && token[i] === "(") {
    const close = token.indexOf(")", i + 1);
    if (close === -1) return null;
    tags.push(token.slice(i + 1, close));
    i = close + 1;
  }
  if (i !== token.length) return null;
  return { base, tags };
}

function letterVariantToCn(letter) {
  switch (letter) {
    case "A":
      return "甲";
    case "B":
      return "乙";
    case "C":
      return "丙";
    case "D":
      return "丁";
    case "E":
      return "戊";
    case "F":
      return "己";
    case "G":
      return "庚";
    case "H":
      return "辛";
    case "I":
      return "壬";
    case "J":
      return "癸";
    default:
      if (/^[A-Z]$/.test(letter)) {
        return String.fromCharCode(letter.charCodeAt(0) - 0x41 + 0xff21);
      }
      return letter;
  }
}

function translateText(text) {
  const exact = EXACT_MAP.get(text);
  if (exact !== undefined) return exact;

  let working = text;
  working = working.replace(/\[X\]/g, "[某]");
  for (const [pattern, replacement] of MULTIWORD_REPLACEMENTS) {
    working = working.replace(pattern, replacement);
  }

  const craftedMatch = /^Crafted (.+?) (\d+)$/.exec(working);
  if (craftedMatch) {
    return `打造${translateText(craftedMatch[1])} ${craftedMatch[2]}`;
  }

  const addMatch = /^Add (.+)$/.exec(working);
  if (addMatch) {
    return `附加${translateText(addMatch[1])}`;
  }

  const debufMatch = /^Debuf (.+?) Potion$/.exec(working);
  if (debufMatch) {
    return `${translateText(debufMatch[1])}减益药剂`;
  }

  const lootWandMatch = /^LOOT_Wand_([A-Z])$/.exec(working);
  if (lootWandMatch) {
    return `战利品法杖${letterVariantToCn(lootWandMatch[1])}`;
  }

  if (working.includes(" + ")) {
    return working
      .split(" + ")
      .map((x) => translateText(x.trim()))
      .join(" + ");
  }

  return translateTokens(working);
}

function localizeRecipe(recipe, mapping) {
  const out = { ...recipe };
  for (const key of ["Result", "Recipe Type", "Part 1", "Part 2", "Skill"]) {
    const original = out[key] ?? "";
    let translated;
    if (key === "Recipe Type") {
      translated = RECIPE_TYPE_MAP.get(original) ?? translateText(original);
    } else if (key === "Skill") {
      translated = SKILL_MAP.get(original) ?? translateText(original);
    } else {
      translated = translateText(original);
    }
    if (!mapping.has(original)) mapping.set(original, translated);
    out[key] = translated;
  }
  return out;
}

function main() {
  const raw = fs.readFileSync(inputJsonPath, "utf8");
  const recipes = JSON.parse(raw);

  const mapping = new Map();
  const localized = recipes.map((r) => localizeRecipe(r, mapping));

  fs.writeFileSync(outputEnBackupJsonPath, JSON.stringify(recipes, null, 2), "utf8");
  fs.writeFileSync(outputZhJsonPath, JSON.stringify(localized, null, 2), "utf8");

  const sortedMap = Array.from(mapping.entries()).sort(([a], [b]) => a.localeCompare(b, "en"));
  fs.writeFileSync(outputMapJsonPath, JSON.stringify(Object.fromEntries(sortedMap), null, 2), "utf8");

  const leftovers = [];
  for (const r of localized) {
    for (const key of ["Result", "Recipe Type", "Part 1", "Part 2", "Skill"]) {
      const v = r[key] ?? "";
      if (/[A-Za-z]/.test(v)) leftovers.push(v);
    }
  }

  if (leftovers.length) {
    const counts = new Map();
    for (const v of leftovers) counts.set(v, (counts.get(v) ?? 0) + 1);
    const top = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 50);
    process.stdout.write("仍包含英文字符的条目（前 50 个，按出现次数降序）：\n");
    for (const [text, cnt] of top) process.stdout.write(`${String(cnt).padStart(4)}  ${text}\n`);
    process.exitCode = 2;
    return;
  }

  process.stdout.write("已生成全中文 recipe_list.zh-CN.json（未检测到残留英文字符）。\n");
}

main();
