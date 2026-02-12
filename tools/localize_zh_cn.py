import json
import re
from collections import Counter
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
INPUT_JSON = PROJECT_ROOT / "recipe_list.json"
OUTPUT_JSON = PROJECT_ROOT / "recipe_list.zh-CN.json"
OUTPUT_EN_BACKUP_JSON = PROJECT_ROOT / "recipe_list.en.json"
OUTPUT_MAP_JSON = PROJECT_ROOT / "translation_map.zh-CN.json"


EXACT_MAP = {
    "": "",
    "Anvil": "铁砧",
    "Knife": "小刀",
    "Bow String": "弓弦",
    "Arrowhead": "箭头",
    "Silver Arrowhead": "银箭头",
    "Static Cloud Arrowhead": "静电云箭头",
    "Explosive Arrowhead": "爆炸箭头",
    "Steam Arrowhead": "蒸汽箭头",
    "Flashbang Grenade": "闪光手雷",
    "Mustard Gas Grenade": "芥子毒气手雷",
    "Empty Canister": "空罐",
    "Empty Grenade": "空手雷",
    "Any Armor": "任意护甲",
    "Any Weapon": "任意武器",
    "Any Armor Piece": "任意护甲部件",
    "Any Shield": "任意盾牌",
    "Any": "任意",
    "PotionWaterRes": "水抗性药剂",
    "Bonedust": "骨灰",
    "Sinew": "腱筋",
    "Tormented Soul": "受难灵魂",
    "Void Essence": "虚空精华",
    "Eye": "眼球",
    "Tooth": "牙齿",
    "Pearl": "珍珠",
    "Ruby": "红宝石",
    "Silver Bar": "银锭",
    "Iron Bar": "铁锭",
    "Steel Bar": "钢锭",
    "Large Iron Bar": "大块铁锭",
    "Large Steel Bar": "大块钢锭",
    "Metal Shield": "金属盾牌",
    "Scale Armor": "鳞甲",
}


RECIPE_TYPE_MAP = {
    "Arrows": "箭矢",
    "Weapons": "武器",
    "Armor": "护甲",
    "Armor Enchant": "护甲附魔",
    "Grenades": "手雷",
    "Potions": "药剂",
    "Objects": "物品",
    "Food": "食物",
    "Runes": "符文",
    "Scrolls": "卷轴",
    "Skillbooks": "技能书",
    "Crafting": "合成",
}


SKILL_MAP = {
    "": "",
    "Crafting": "工艺",
    "Smithing": "锻造",
    "Cooking": "烹饪",
}


TOKEN_MAP = {
    "Add": "附加",
    "Boosted": "强化",
    "Value": "价值",
    "Movement": "移动",
    "Durability": "耐久",
    "Blocking": "格挡",
    "Damage": "伤害",
    "Resist": "抗性",
    "Resistance": "抗性",
    "All": "全",
    "Air": "空气",
    "Water": "水",
    "Fire": "火焰",
    "Earth": "大地",
    "Poison": "毒素",
    "Potion": "药剂",
    "Grenade": "手雷",
    "Arrow": "箭",
    "Arrowhead": "箭头",
    "Cloud": "云",
    "Static": "静电",
    "Explosive": "爆炸",
    "Flashbang": "闪光",
    "Mustard": "芥子",
    "Gas": "毒气",
    "Silver": "银",
    "Iron": "铁",
    "Steel": "钢",
    "Large": "大块",
    "Bar": "锭",
    "Crafted": "打造",
    "Two": "双",
    "Handed": "手",
    "One": "单",
    "Axe": "斧",
    "Sword": "剑",
    "Dagger": "匕首",
    "Shield": "盾牌",
    "Metal": "金属",
    "Scale": "鳞",
    "Armor": "甲",
    "String": "弦",
    "Pearl": "珍珠",
    "Ruby": "红宝石",
    "Tenebrium": "泰尼布里姆",
    "Effect": "效果",
    "Sneaking": "潜行",
    "Strength": "力量",
    "Dexterity": "敏捷",
    "Intelligence": "智力",
    "Constitution": "体质",
    "Perception": "感知",
    "Speed": "速度",
    "Debuf": "减益",
    "Debuff": "减益",
    "Bonedust": "骨灰",
    "Sinew": "腱筋",
    "Tormented": "受难",
    "Soul": "灵魂",
    "Void": "虚空",
    "Essence": "精华",
    "Empty": "空",
    "Canister": "罐",
}


MULTIWORD_REPLACEMENTS = [
    (re.compile(r"\bTwo Handed\b", re.IGNORECASE), "双手"),
    (re.compile(r"\bOne Handed\b", re.IGNORECASE), "单手"),
    (re.compile(r"\bAir Resistance Potion\b", re.IGNORECASE), "空气抗性药剂"),
    (re.compile(r"\bFire Resistance Potion\b", re.IGNORECASE), "火焰抗性药剂"),
    (re.compile(r"\bWater Resistance Potion\b", re.IGNORECASE), "水抗性药剂"),
    (re.compile(r"\bEarth Resistance Potion\b", re.IGNORECASE), "大地抗性药剂"),
    (re.compile(r"\bPoison Potion\b", re.IGNORECASE), "毒素药剂"),
]


def is_number_token(token: str) -> bool:
    return bool(re.fullmatch(r"\d+", token))


def translate_tokens(text: str) -> str:
    parts = text.split(" ")
    translated_parts = []
    for part in parts:
        if part == "+":
            translated_parts.append("+")
            continue
        if is_number_token(part):
            translated_parts.append(part)
            continue
        translated_parts.append(TOKEN_MAP.get(part, part))
    if len(translated_parts) >= 2 and is_number_token(translated_parts[-1]):
        return "".join(translated_parts[:-1]) + " " + translated_parts[-1]
    return "".join(translated_parts)


def translate_text(text: str) -> str:
    if text in EXACT_MAP:
        return EXACT_MAP[text]

    working = text
    for pattern, replacement in MULTIWORD_REPLACEMENTS:
        working = pattern.sub(replacement, working)

    m = re.fullmatch(r"Crafted (.+?) (\d+)", working)
    if m:
        return f"打造{translate_text(m.group(1))} {m.group(2)}"

    m = re.fullmatch(r"Add (.+)", working)
    if m:
        return f"附加{translate_text(m.group(1))}"

    m = re.fullmatch(r"Debuf (.+?) Potion", working)
    if m:
        return f"{translate_text(m.group(1))}减益药剂"

    if " + " in working:
        return " + ".join(translate_text(x.strip()) for x in working.split(" + "))

    return translate_tokens(working)


def localize_recipe(recipe: dict, mapping: dict) -> dict:
    out = dict(recipe)
    for key in ("Result", "Recipe Type", "Part 1", "Part 2", "Skill"):
        original = out.get(key, "")
        if key == "Recipe Type":
            translated = RECIPE_TYPE_MAP.get(original, translate_text(original))
        elif key == "Skill":
            translated = SKILL_MAP.get(original, translate_text(original))
        else:
            translated = translate_text(original)
        mapping.setdefault(original, translated)
        out[key] = translated
    return out


def main() -> None:
    raw_text = INPUT_JSON.read_text(encoding="utf-8")
    recipes = json.loads(raw_text)

    mapping: dict[str, str] = {}
    localized = [localize_recipe(r, mapping) for r in recipes]

    OUTPUT_EN_BACKUP_JSON.write_text(
        json.dumps(recipes, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    OUTPUT_JSON.write_text(
        json.dumps(localized, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    OUTPUT_MAP_JSON.write_text(
        json.dumps(dict(sorted(mapping.items(), key=lambda kv: kv[0].lower())), ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    all_values = []
    for r in localized:
        all_values.extend([r.get("Result", ""), r.get("Recipe Type", ""), r.get("Part 1", ""), r.get("Part 2", ""), r.get("Skill", "")])
    leftovers = []
    for v in all_values:
        if re.search(r"[A-Za-z]", v):
            leftovers.append(v)
    if leftovers:
        counts = Counter(leftovers)
        print("仍包含英文字符的条目（前 50 个，按出现次数降序）：")
        for text, cnt in counts.most_common(50):
            print(f"{cnt:>4}  {text}")
    else:
        print("已生成全中文 recipe_list.zh-CN.json（未检测到残留英文字符）。")


if __name__ == "__main__":
    main()

