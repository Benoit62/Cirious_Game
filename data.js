let data = [
    {
        tag:'tank',
        type:'struct',
        lvlMax:3,
        buildCost:40000,
        upgrade1:10000,
        upgrade2:20000,
        upgrade3:30000,
        money:[0,2,5,10],
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
        money:[0,3,8,20],
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
        money:[0,3,8,20],
        name:'Vache',
        desc:'Tout est bon dans la vache'
    },
    {
        tag:'sheep',
        type:'animal',
        lvlMax:3,
        buildCost:40000,
        upgrade1:20000,
        upgrade2:35000,
        upgrade3:60000,
        money:[0,3,8,20],
        name:'Mouton',
        desc:'Tout est bon dans le mouton'
    },
    {
        tag:'labor',
        type:'field',
        lvlMax:1,
        buildCost:10000,
        upgrade1:0,
        upgrade2:0,
        upgrade3:0,
        money:[0, 0],
        name:'Champs',
        desc:'Savez-vous plantez des choux, à la mode, à la mode. Savez-voud planter des choux, à la mode de chez-nous'
    },
    {
        tag:'house',
        type:'house',
        lvlMax:2,
        upgrade1:1000000,
        upgrade2:2000000,
        money:[0,10,25,60],
        name:'Maison',
        desc:'Lieu de recherche et d\'innovation'
    },
    
];


function getByType(type) {
    return data.filter(value => type == value.type);
}

function getByTag(tag) {
    return data.filter(value => tag == value.tag);
}