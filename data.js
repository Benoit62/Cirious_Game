let data = [
    {
        tag:'tank',
        type:'struct',
        lvlMax:3,
        buildCost:40000,
        upgrade1:10000,
        upgrade2:20000,
        upgrade3:30000,
        money1:2,
        money2:5,
        money3:10,
        name:'Reservoir d\'eau',
        desc:'Le tank pemret de recuperer et stocker de l\'eau qui pourra être utilisé pour les cultures'
    },
    {
        tag:'pig',
        type:'animal',
        lvlMax:3,
        buildCost:40000,
        upgrade1:20000,
        upgrade2:35000,
        upgrade3:60000,
        money:{
            lvl1:3,
            lvl2:8,
            lvl3:20,
        },
        name:'Cochon',
        desc:'Tout est bon dans le cochon'
    },
    {
        tag:'cow',
        type:'animal',
        lvlMax:3,
        buildCost:40000,
        upgrade1:20000,
        upgrade2:35000,
        upgrade3:60000,
        money:{
            lvl1:3,
            lvl2:8,
            lvl3:20,
        },
        name:'Vache',
        desc:'Tout est bon dans la vache'
    },
    {
        tag:'labor',
        type:'field',
        lvlMax:1,
        buildCost:10000,
        upgrade1:0,
        upgrade2:0,
        upgrade3:0,
        money1:0,
        money2:0,
        money3:0,
        name:'Champs',
        desc:'Savez-vous plantez des choux, à la mode, à la mode. Savez-voud planter des choux, à la mode de chez-nous'
    },
    
];


function getByType(type) {
    return data.filter(value => type == value.type);
}

function getByTag(tag) {
    return data.filter(value => tag == value.tag);
}