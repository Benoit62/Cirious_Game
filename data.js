let data = [
    {
        tag:'tank',
        type:'struct',
        lvlMax:3,
        buildCost:40000,
        upgrade:[0,10000,20000,30000],
        money:[0,2,5,10],
        name:'Reservoir d\'eau',
        desc:'Le tank pemret de recuperer et stocker de l\'eau qui pourra être utilisé pour les cultures'
    },
    {
        tag:'solaire',
        type:'struct',
        lvlMax:3,
        buildCost:80000,
        upgrade:[0,15000,30000,50000],
        money:[0,5,15,30],
        name:'Panneau solaire',
        desc:'Le panneau solaire permet de produire d\'électricité'
    },
    {
        tag:'pig',
        type:'animal',
        lvlMax:3,
        buildCost:40000,
        upgrade:[0,20000,35000,60000],
        money:[0,3,8,20],
        name:'Cochon',
        desc:'Tout est bon dans le cochon'
    },
    {
        tag:'cow',
        type:'animal',
        lvlMax:3,
        buildCost:40000,
        upgrade:[0,20000,35000,60000],
        money:[0,3,8,20],
        name:'Vache',
        desc:'Tout est bon dans la vache'
    },
    {
        tag:'sheep',
        type:'animal',
        lvlMax:3,
        buildCost:40000,
        upgrade:[0,20000,35000,60000],
        money:[0,3,8,20],
        name:'Mouton',
        desc:'Tout est bon dans le mouton'
    },
    {
        tag:'labor',
        type:'field',
        lvlMax:1,
        buildCost:10000,
        upgrade:[0,0,0,0],
        name:'Champs',
        desc:'Savez-vous plantez des choux, à la mode, à la mode. Savez-voud planter des choux, à la mode de chez-nous'
    },
    {
        tag:'water',
        type:'field',
        lvlMax:1,
        buildCost:15000,
        upgrade:[0,0,0,0],
        name:'Rizière',
        desc:'Savez-vous plantez du riz, à la mode, à la mode. Savez-voud planter du riz, à la mode de chez-nous'
    },
    {
        tag:'house',
        type:'house',
        lvlMax:2,
        upgrade:[0,1000000,2000000],
        money:[0,10,25,60],
        name:'Maison',
        desc:'Lieu de recherche et d\'innovation'
    },

    {
        tag:'ble',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Blé',
        desc:'Miam'
    },

    {
        tag:'carrot',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Carrotes',
        desc:'Miam'
    },

    {
        tag:'mais',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Maïs',
        desc:'Miam'
    },
    {
        tag:'avoine',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Avoine',
        desc:'Miam'
    },
    {
        tag:'colza',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:4,
        name:'Colza',
        desc:'Miam'
    },
    {
        tag:'herbe',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Herbe',
        desc:'Miam'
    },
    {
        tag:'pdt',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Pommes de Terre',
        desc:'Miam'
    },
    {
        tag:'riz',
        type:'plant',
        ground:'water',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Riz',
        desc:'Miam'
    },
    {
        tag:'soja',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Soja',
        desc:'Miam'
    },
    {
        tag:'champi',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Champignons',
        desc:'Miam'
    },
    {
        tag:'lichen',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Lichens',
        desc:'Miam'
    },
    {
        tag:'saxaoul',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Saxaoul',
        desc:'Miam'
    },
    {
        tag:'tamaris',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Tamaris',
        desc:'Miam'
    },
    
];


function getByType(type) {
    return data.filter(value => type == value.type);
}

function getByTag(tag) {
    return data.filter(value => tag == value.tag);
}