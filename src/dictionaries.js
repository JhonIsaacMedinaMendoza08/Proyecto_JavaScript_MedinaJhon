// Diccionario de imágenes asociadas a cada raza
export const raceImages = {
    "dragonborn": "assets/races/dragonborn.png",
    "dwarf": "assets/races/dwarf.png",
    "elf": "assets/races/elf.webp",
    "gnome": "assets/races/gnome.webp",
    "half-elf": "assets/races/half-elf.png",
    "half-orc": "assets/races/orc.png",
    "halfling": "assets/races/halfling.png",
    "human": "assets/races/human.webp",
    "tiefling": "assets/races/tiefling.webp",
    "default": "assets/races/default.png"
};

// Diccionario de imágenes asociadas a cada clase
export const classImages = {
    "barbarian": "assets/class/barbarian.png",
    "bard": "assets/class/bard.png",
    "cleric": "assets/class/cleric.png",
    "druid": "assets/class/druid.png",
    "fighter": "assets/class/fighter.png",
    "monk": "assets/class/monk.png",
    "paladin": "assets/class/paladin.png",
    "ranger": "assets/class/ranger.png",
    "rogue": "assets/class/rogue.png",
    "sorcerer": "assets/class/sorcerer.png",
    "wizard": "assets/class/wizard.png",
    "warlock": "assets/class/warlock.png",
    "default": "assets/races/default.png"
};

// Mapa de qué armaduras puede usar cada clase
export const classArmorProficiencies = {
    "barbarian": ["light", "medium", "shield"],
    "bard": ["light"],
    "cleric": ["light", "medium", "shield"],
    "druid": ["light", "medium", "shield"], // Druids won't wear metal though
    "fighter": ["light", "medium", "heavy", "shield"],
    "monk": [], // Monks don't typically use armor
    "paladin": ["light", "medium", "heavy", "shield"],
    "ranger": ["light", "medium", "shield"],
    "rogue": ["light"],
    "sorcerer": [],
    "warlock": ["light"],
    "wizard": []
};
// Mapa de qué armas puede usar cada clase
export const classWeaponProficiencies = {
    "barbarian": ["simple", "martial"],
    "bard": ["simple", "hand crossbows", "longswords", "rapiers", "shortswords"],
    "cleric": ["simple"],
    "druid": ["simple", "clubs", "daggers", "darts", "javelins", "maces", "quarterstaffs", "scimitars", "sickles", "slings", "spears"],
    "fighter": ["simple", "martial"],
    "monk": ["simple", "shortswords"],
    "paladin": ["simple", "martial"],
    "ranger": ["simple", "martial"],
    "rogue": ["simple", "hand crossbows", "longswords", "rapiers", "shortswords"],
    "sorcerer": ["simple"],
    "warlock": ["simple"],
    "wizard": ["simple"]
};