// Función para cargar todas las armaduras y almacenarlas en allArmors
async function loadWeaponOptions(selectId) {
    try {
        const response = await fetch(`${URL}/equipment-categories/weapon`);
        const data = await response.json();
        const select = document.getElementById(selectId);
        
        // Guardamos todas las armaduras para filtrarlas después
        allWeapons = data.equipment;
        
        // Limpiamos el select y dejamos solo la opción vacía
        select.innerHTML = '<option value=""></option>';
        
    } catch (error) {
        console.error(`Error loading Weapon: `, error);
    }
}

// Función para filtrar armaduras según la clase seleccionada
async function filterArmorsByClass(classIndex) {
    const weaponSelect = document.getElementById("weapon");
    
    // Limpiamos el select excepto la primera opción
    weaponSelect.innerHTML = '<option value=""></option>';
    
    if (!classIndex) return;
    
    // Obtenemos las proficiencias de armadura para esta clase
    const allowedCategories = classArmorProficiencies[classIndex] || [];
    
    // Si la clase no puede usar armaduras, deshabilitamos el select
    if (allowedCategories.length === 0) {
        weaponSelect.disabled = true;
        return;
    }
    
    weaponSelect.disabled = false;
    weaponSelect.nextElementSibling.textContent = "";
    
    // Filtramos las armaduras que coincidan con las categorías permitidas
    const filteredWeapons = [];
    
    // Necesitamos obtener los detalles de cada armadura para ver su categoría
    for (const weapon of allWeapons) {
        try {
            const response = await fetch(`${URL}/equipment/${weapon.index}`);
            const weaponDetails = await response.json();
            
            // Verificamos si la categoría de esta armadura está permitida
            if (allowedCategories.includes(weaponDetails.weapon_category?.toLowerCase())) {
                filteredWeapons.push(weapon);
            }
            
            // Caso especial para escudos (que tienen su propia categoría)
            if (allowedCategories.includes("shield") && weaponDetails.equipment_category?.index === "shield") {
                filteredWeapons.push(armor);
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
