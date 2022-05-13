let data = [
    {
        tag:'tank',
        type:'struct',
        lvlMax:3,
        buildCost:40000,
        upgrade:[0,10000,20000,30000],
        money:[0,2,5,10],
        name:'Reservoir d\'eau',
        desc:'Le tank pemret de recuperer et stocker de l\'eau qui pourra être utilisé pour les cultures',
        info:''
    },
    {
        tag:'solaire',
        type:'struct',
        lvlMax:3,
        buildCost:80000,
        upgrade:[0,15000,30000,50000],
        money:[0,5,15,30],
        name:'Panneau solaire',
        desc:'Le panneau solaire permet de produire d\'électricité',
        info:''
    },
    {
        tag:'pig',
        type:'animal',
        lvlMax:3,
        buildCost:40000,
        upgrade:[0,20000,35000,60000],
        money:[0,3,8,20],
        name:'Cochon',
        desc:'Tout est bon dans le cochon',
        info:''
    },
    {
        tag:'cow',
        type:'animal',
        lvlMax:3,
        buildCost:40000,
        upgrade:[0,20000,35000,60000],
        money:[0,3,8,20],
        name:'Vache',
        desc:'Tout est bon dans la vache',
        info:''
    },
    {
        tag:'sheep',
        type:'animal',
        lvlMax:3,
        buildCost:40000,
        upgrade:[0,20000,35000,60000],
        money:[0,3,8,20],
        name:'Mouton',
        desc:'Tout est bon dans le mouton',
        info:''
    },
    {
        tag:'labor',
        type:'field',
        lvlMax:1,
        buildCost:10000,
        upgrade:[0,0,0,0],
        name:'Champs',
        desc:'Savez-vous plantez des choux, à la mode, à la mode. Savez-voud planter des choux, à la mode de chez-nous',
        info:''
    },
    {
        tag:'water',
        type:'field',
        lvlMax:1,
        buildCost:15000,
        upgrade:[0,0,0,0],
        name:'Rizière',
        desc:'Savez-vous plantez du riz, à la mode, à la mode. Savez-voud planter du riz, à la mode de chez-nous',
        info:''
    },
    {
        tag:'house',
        type:'house',
        lvlMax:2,
        upgrade:[0,1000000,2000000],
        money:[0,10,25,60],
        name:'Maison',
        desc:'Lieu de recherche et d\'innovation',
        info:''
    },

    {
        tag:'ble',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Blé',
        desc:'Miam',
        info:'',
        climat:['europe']
    },

    {
        tag:'carrot',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Carrotes',
        desc:'La Carotte est une plante bisannuelle de la famille des Apiacées, largement cultivée pour sa racine charnue, comestible, généralement orangée, consommée comme légume. La carotte représente, après la pomme de terre, le principal légume-racine cultivé dans le monde.',
        info:'',
        climat:['europe']
    },

    {
        tag:'mais',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Maïs',
        desc:'Miam',
        info:'',
        climat:['europe', 'tropic']
    },
    {
        tag:'avoine',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Avoine',
        desc:'Miam',
        info:'',
        climat:['europe']
    },
    {
        tag:'colza',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:4,
        name:'Colza',
        desc:'Miam',
        info:'',
        climat:['europe']
    },
    {
        tag:'herbe',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Herbe',
        desc:'Miam',
        info:'',
        climat:['europe']
    },
    {
        tag:'pdt',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Pommes de Terre',
        desc:'Miam',
        info:'',
        climat:['europe']
    },
    {
        tag:'riz',
        type:'plant',
        ground:'water',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Riz',
        desc:'Miam',
        info:'',
        climat:['tropic']
    },
    {
        tag:'soja',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Soja',
        desc:'Miam',
        info:'',
        climat:['europe', 'tropic']
    },
    {
        tag:'champi',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Champignons',
        desc:'Miam',
        info:'',
        climat:['europe', 'tropic']
    },
    {
        tag:'lichen',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Lichens',
        desc:'Miam',
        info:'',
        climat:['europe']
    },
    {
        tag:'saxaoul',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Saxaoul',
        desc:'Miam',
        info:'',
        climat:['europe']
    },
    {
        tag:'tamaris',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Tamaris',
        desc:'Miam',
        info:'',
        climat:['europe']
    },
    {
        tag:'europe',
        type:'climat',
        typeName:'Climat',
        name:'Tempéré',
        desc:'Une région soumise à un climat tempéré, encore appelée région tempérée ou zone tempérée, est dans le sens commun une partie de la surface terrestre où les températures ne sont pas extrêmes, c`\'est-à-dire ni torrides, ni glaciales1, correspondant aux climats océanique, méditerranéen et subtropical humide selon la classification de Köppen. Ce terme est également employé pour désigner certaines zones dans d\'autres classifications climatiques. ',
        info:''
    },
    {
        tag:'desert',
        type:'climat',
        typeName:'Climat',
        name:'Aride',
        desc:'Le climat aride parfois appelé climat désertique est un climat caractérisé par une sécheresse et une aridité permanente qui dure toute l\'année, un manque important d\'eau liquide au sol et dans l\'air ambiante (on parle plus précisément d\'aridité) ce qui restreint fortement le développement de la vie animale et végétale.',
        info:''
    },
    {
        tag:'tropic',
        type:'climat',
        typeName:'Climat',
        name:'Tropical',
        desc:'Le climat tropical est un type de climat présent entre les tropiques, généralement jusqu\'à 14° de latitudes nord et sud. Dans le système de classification des climats défini par Köppen, un climat tropical est un climat non aride où la température moyenne mensuelle ne descend pas en dessous de 18 °C tout au long de l\'année. Toutefois, la notion de transversalité des climats arides, unis en un groupe commun, est discutable, et il est tout à fait envisageable de considérer comme valide la notion de climats arides tropicaux (tels que ceux qui concernent le sud du Sahara et de la péninsule Arabique, par exemple, ou encore une bonne partie du nord de l\'Australie, ou la côte pacifique aride du Pérou), lesquels se distinguent clairement des climats arides tempérés ou froids (désert de Gobi, et autres). ',
        info:''
    },
    {
        tag:'polaire',
        type:'climat',
        typeName:'Climat',
        name:'Polaire',
        desc:'Le climat polaire est un type de climat caractérisé par des températures froides toute l\'année, sans chaleur estivale et avec des hivers glaciaux. Les températures moyennes du mois le plus chaud ne sont jamais supérieures à 10 °C, ce qui correspond à la limite des arbres. Il entraîne l\'existence d\'un pergélisol et ne permet aucune agriculture. Ce climat est caractéristique des côtes nord de l\'Amérique du Nord, de l\'Europe et de l\'Asie, ainsi que du Groenland, de l\'Arctique et de l\'Antarctique. ',
        info:''
    },
];


function getByType(type) {
    return data.filter(value => type == value.type);
}

function getByTag(tag) {
    return data.filter(value => tag == value.tag);
}