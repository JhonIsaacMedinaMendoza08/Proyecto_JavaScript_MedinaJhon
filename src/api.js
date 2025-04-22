// URL base de la API de D&D 5e
const URL = "https://www.dnd5eapi.co/api";

// Diccionario de imágenes asociadas a cada raza
const raceImages = {
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
const classImages = {
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
const classArmorProficiencies = {
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
const classWeaponProficiencies = {
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

// Variable para almacenar todas las armaduras y armas disponibles
let allArmors = [];
let allWeapons = [];

// Cuando el DOM está completamente cargado, se ejecutan las funciones de carga
document.addEventListener("DOMContentLoaded", () => {
    loadOptions("races", "races");
    loadOptions("classes", "classes");
    loadOptions("spells", "ability");
    loadAllArmors("armor"); // Carga todas las armaduras pero no las muestra
    loadWeaponOptions("weapon");
    loadAccesoriesOptions("accessories");
});

// Función genérica para cargar datos desde un endpoint y llenar un <select>
async function loadOptions(endpoint, selectId) {
    try {
        const response = await fetch(`${URL}/${endpoint}`);
        const data = await response.json();
        const select = document.getElementById(selectId);

        data.results.forEach(item => {
            const option = document.createElement("option");
            option.value = item.index;
            option.textContent = item.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error(`Error loading ${selectId}: `, error);
    }
}

// Función para cargar todas las armaduras y almacenarlas en allArmors
async function loadAllArmors(selectId) {
    try {
        const response = await fetch(`${URL}/equipment-categories/armor`);
        const data = await response.json();
        const select = document.getElementById(selectId);
        
        // Guardamos todas las armaduras para filtrarlas después
        allArmors = data.equipment;
        
        // Limpiamos el select y dejamos solo la opción vacía
        select.innerHTML = '<option value=""></option>';
        
    } catch (error) {
        console.error(`Error loading armor: `, error);
    }
}

// Función para filtrar armaduras según la clase seleccionada
async function filterArmorsByClass(classIndex) {
    const armorSelect = document.getElementById("armor");
    
    // Limpiamos el select excepto la primera opción
    armorSelect.innerHTML = '<option value=""></option>';
    
    if (!classIndex) return;
    
    // Obtenemos las proficiencias de armadura para esta clase
    const allowedCategories = classArmorProficiencies[classIndex] || [];
    
    // Si la clase no puede usar armaduras, deshabilitamos el select
    if (allowedCategories.length === 0) {
        armorSelect.disabled = true;
        return;
    }
    
    armorSelect.disabled = false;
    
    // Filtramos las armaduras que coincidan con las categorías permitidas
    const filteredArmors = [];
    
    // Necesitamos obtener los detalles de cada armadura para ver su categoría
    for (const armor of allArmors) {
        try {
            const response = await fetch(`${URL}/equipment/${armor.index}`);
            const armorDetails = await response.json();
            
            // Verificamos si la categoría de esta armadura está permitida
            if (allowedCategories.includes(armorDetails.armor_category?.toLowerCase())) {
                filteredArmors.push(armor);
            }
            
            // Caso especial para escudos (que tienen su propia categoría)
            if (allowedCategories.includes("shield") && armorDetails.equipment_category?.index === "shield") {
                filteredArmors.push(armor);
            }
        } catch (error) {
            console.error(`Error fetching armor details for ${armor.index}: `, error);
        }
    }
    
    // Añadimos las armaduras filtradas al select
    filteredArmors.forEach(armor => {
        const option = document.createElement("option");
        option.value = armor.index;
        option.textContent = armor.name;
        armorSelect.appendChild(option);
    });
}



// Función para cargar accesorios desde la categoría 'adventuring-gear'
async function loadAccesoriesOptions(selectId) {
    try {
        const response = await fetch(`${URL}/equipment-categories/adventuring-gear`);
        const data = await response.json();
        const select = document.getElementById(selectId);

        data.equipment.forEach(item => {
            const option = document.createElement("option");
            option.value = item.index;
            option.textContent = item.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error(`Error loading Accesories: `, error);
    }
}

// Event listeners para mostrar información cuando se seleccionan opciones

document.getElementById("races").addEventListener("change", async (event) => {
    const raceIndex = event.target.value;
    const imageSrc = raceImages[raceIndex] || raceImages["default"];

    if (!raceIndex) return;

    try {
        const response = await fetch(`${URL}/races/${raceIndex}`);
        const data = await response.json();

        const raceInfoHTML = `
            <img src="${imageSrc}" alt="${data.name}" class="race-image" />
            <h2>${data.name}</h2>
            <p><strong>Speed:</strong> ${data.speed}</p>
            <p><strong>Alignment:</strong> ${data.alignment}</p>
            <p><strong>Age:</strong> ${data.age}</p>
            <p><strong>Size:</strong> ${data.size}</p>
            <p><strong>Size Description:</strong> ${data.size_description}</p>
            <p><strong>Language Desc:</strong> ${data.language_desc}</p>
        `;

        document.getElementById("infoCharacter").innerHTML = raceInfoHTML;

    } catch (error) {
        console.error("Error fetching race details: ", error);
    }
});

// Modificamos el event listener de clases para que también filtre armas
document.getElementById("classes").addEventListener("change", async (event) => {
    const classesIndex = event.target.value;
    const imageSource = classImages[classesIndex] || classImages["default"];

    if (!classesIndex) return;

    try {
        const response = await fetch(`${URL}/classes/${classesIndex}`);
        const data = await response.json();

        const classInfoHTML = `
            <img src="${imageSource}" alt="${data.name}" class="race-image" />
            <h2>${data.name}</h2>
            <p><strong>Hit Die:</strong> d${data.hit_die}</p>
            <p><strong>Proficiencies:</strong> ${data.proficiencies.map(p => p.name).join(", ")}</p>
            <p><strong>Saving Throws:</strong> ${data.saving_throws.map(s => s.name).join(", ")}</p>
        `;
        
        document.getElementById("infoCharacter").innerHTML = classInfoHTML;
        
        // Filtramos tanto armaduras como armas según la clase seleccionada
        filterArmorsByClass(classesIndex);
        filterWeaponsByClass(classesIndex);
        
    } catch (error) {
        console.error("Error fetching class details: ", error);
    }
});


document.getElementById("armor").addEventListener("change", async (event) => {
    const armorIndex = event.target.value;
    if (!armorIndex) return;

    try {
        const response = await fetch(`${URL}/equipment/${armorIndex}`);
        const data = await response.json();

        const armorInfoHTML = `
            <h2>${data.name}</h2>
            <p><strong>Category:</strong> ${data.armor_category}</p>
            <p><strong>Base AC:</strong> ${data.armor_class.base}</p>
            <p><strong>Dex Bonus:</strong> ${data.armor_class.dex_bonus ? "Yes" : "No"}</p>
            <p><strong>Str Minimum:</strong> ${data.str_minimum || "None"}</p>
            <p><strong>Stealth Disadvantage:</strong> ${data.stealth_disadvantage ? "Yes" : "No"}</p>
        `;

        document.getElementById("infoCharacter").innerHTML = armorInfoHTML;
    } catch (error) {
        console.error("Error fetching armor details: ", error);
    }
});

document.getElementById("weapon").addEventListener("change", async (event) => {
    const weaponIndex = event.target.value;
    if (!weaponIndex) return;

    try {
        const response = await fetch(`${URL}/equipment/${weaponIndex}`);
        const data = await response.json();

        const weaponInfoHTML = `
            <h2>${data.name}</h2>
            <p><strong>Category:</strong> ${data.weapon_category}</p>
            <p><strong>Range:</strong> ${data.range}</p>
            <p><strong>Damage:</strong> ${data.damage?.damage_dice} (${data.damage?.damage_type.name})</p>
            <p><strong>Properties:</strong> ${data.properties?.map(p => p.name).join(", ") || "None"}</p>
        `;

        document.getElementById("infoCharacter").innerHTML = weaponInfoHTML;
    } catch (error) {
        console.error("Error fetching weapon details: ", error);
    }
});

// // Función para cargar únicamente las armas desde la categoría 'weapon'
async function loadWeaponOptions(selectId) {
    try {
        const response = await fetch(`${URL}/equipment-categories/weapon`);
        const data = await response.json();
        const select = document.getElementById(selectId);
        // Guardamos todas las armas para filtrarlas después
        allWeapons = data.equipment;
        
        // Limpiamos el select y dejamos solo la opción vacía
        select.innerHTML = '<option value=""></option>';
        
    } catch (error) {
        console.error(`Error loading weapon: `, error);
    }
}

async function filterWeaponsByClass(classIndex) {
    const weaponSelect = document.getElementById("weapon");
    // Limpiamos el select excepto la primera opción
    weaponSelect.innerHTML = '<option value=""></option>';
    
    if (!classIndex) return;
    
    // Obtenemos las proficiencias de armadura para esta clase
    const allowedCategories = classWeaponProficiencies[classIndex] || [];
    if (allowedCategories.length === 0) {
        weaponSelect.disabled = true;
        return;
    }
    
    weaponSelect.disabled = false;
    weaponSelect.nextElementSibling.textContent = "Weapon:";

    // Filtramos las armaduras que coincidan con las categorías permitidas
    const filteredWeapons = [];
    // Necesitamos obtener los detalles de cada armadura para ver su categoría
    for (const weapon of allWeapons) {
        try {
            const response = await fetch(`${URL}/equipment/${weapon.index}`);
            const weaponDetails = await response.json();
            // Verificamos si la categoría de esta arma está permitida
            const weaponCategory = weaponDetails.weapon_category?.toLowerCase();
            
            // Caso especial para armas específicas (como las de bardos y pícaros)
            const isSpecificWeaponAllowed = allowedCategories.some(cat => 
                weaponDetails.name.toLowerCase().includes(cat)
            );
            
            if (allowedCategories.includes(weaponCategory) || isSpecificWeaponAllowed) {
                filteredWeapons.push(weapon);
            }
        } catch (error) {
            console.error(`Error fetching weapon details for ${weapon.index}: `, error);
        }
    }
     // Añadimos las armaduras filtradas al select
     filteredWeapons.forEach(weapon => {
        const option = document.createElement("option");
        option.value = weapon.index;
        option.textContent = weapon.name;
        weaponSelect.appendChild(option);
    });

}