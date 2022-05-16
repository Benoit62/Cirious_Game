let data = [
    {
        tag:'bull',
        type:'destroy',
        cost:5000,
        name:'Destruction',
        desc:'Destruction du bâtiment',
    },


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
        info:'',
        climat:['europe']
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
        info:'',
        climat:['europe']
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
        info:'',
        climat:['europe']
    },
    {
        tag:'salmon',
        type:'animal',
        lvlMax:3,
        buildCost:30000,
        upgrade:[0,20000,35000,60000],
        money:[0,3,8,20],
        name:'Saumon',
        desc:'Tout est bon dans le saumon',
        info:'',
        climat:['froid']
    },
    {
        tag:'renne',
        type:'animal',
        lvlMax:3,
        buildCost:30000,
        upgrade:[0,20000,35000,60000],
        money:[0,3,8,20],
        name:'Renne',
        desc:'Tout est bon dans le renne',
        info:'',
        climat:['froid']
    },
    {
        tag:'bison',
        type:'animal',
        lvlMax:3,
        buildCost:30000,
        upgrade:[0,20000,35000,60000],
        money:[0,3,8,20],
        name:'Bison',
        desc:'Tout est bon dans le bison',
        info:'',
        climat:['tropic']
    },
    {
        tag:'chamel',
        type:'animal',
        lvlMax:3,
        buildCost:30000,
        upgrade:[0,20000,35000,60000],
        money:[0,3,8,20],
        name:'Chameau',
        desc:'Tout est bon dans le chameau',
        info:'',
        climat:['aride']
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


    //Plantes
    {
        tag:'ble',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Blé',
        desc:'Céréales',
        info:'Chaque année, 650 à 685 millions de tonnes de blé sont produites, 654 à 660 millions de tonnes sont consommées',
        climat:['europe', 'polaire', 'desert']
    },

    {
        tag:'carrot',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Carrotes',
        desc:'Légumes',
        info:'La carotte est cultivée pratiquement partout sur la planète, et elle fait partie des légumes les plus consommés sur la planète . Aujourd’hui, on dénombre pas moins de 500 variétés de carottes dans le monde',
        climat:['europe', 'polaire' , 'desert']
    },

    {
        tag:'mais',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Maïs',
        desc:'Céréale',
        info:'Annuellement, le maïs est la céréale la plus produite dans le monde avec environ 850 millions de tonnes produites sur approximativement 162 millions d’hectares, soit un rendement moyen de 5.2 t/ha. ',
        climat:['europe', 'tropic', 'polaire', 'desert']
    },

    {
        tag:'avoine',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Avoine',
        desc:'Céréale',
        info:'La production mondiale d\'avoine représente près de 800 kilos par seconde, soit 25 millions de tonnes par an. L\'Union européenne est le 1er production d\'avoine',
        climat:['europe', 'tropic', 'polaire', 'desert']
    },
   
    {
        tag:'pdt',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Pommes de Terre',
        desc:'Tubercules/Féculent',
        info:'En 2011, la production de pommes de terre s\'est élevée à près de 12 000 kilos chaque seconde (compteur), soit 374 millions de tonnes. La Chine est le premier producteur mondial de pommes de terre',
        climat:['europe', 'tropic','desert']
    },

    {
        tag:'riz',
        type:'plant',
        ground:'water',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Riz',
        desc:'Céréale',
        info:'La production mondiale de riz en 2016 est évaluée à 471 MT (base usiné). Les principaux pays producteurs sont la Chine, et l’Inde ',
        climat:['tropic', 'europe']
    },

    {
        tag:'soja',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Soja',
        desc:'Légumineuse',
        info:'La production de soja a plus que doublé au cours des 20 dernières années, atteignant 336 millions de tonnes pour la campagne 2016-17 contre 30 Mt. seulement au milieu des années 60. ',
        climat:['europe', 'tropic']
    },

    {
        tag:'tomato',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Tomate',
        desc:'Légume-fruits',
        info:'La production de soja a plus que doublé au cours des 20 dernières années, atteignant 336 millions de tonnes pour la campagne 2016-17 contre 30 Mt. seulement au milieu des années 60. ',
        climat:['europe', 'polaire']
    }, 
    
    {
        tag:'chou',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Chou',
        desc:'Légume',
        info:'Environ 70 millions de tonnes de choux sont produites chaque année, sur une surface de 3,8 millions d\'hectares, dans près de 150 pays. ',
        climat:['europe', 'tropic', 'polaire']
    }, 
    
    {
        tag:'lettuce',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Laitue',
        desc:'Légume',
        info:' La production mondiale de laitue est d\'environ 22 millions de tonnes ',
        climat:['polaire','tropic']
    }, 
    
    {
        tag:'oignon',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Oignon',
        desc:'Plante potagère',
        info:'La production mondiale d\'oignons représente 85 millions de tonnes. Les principaux producteurs d\'oignons sont la Chine, l\'Inde et les États-Unis. ',
        climat:['europe', 'tropic', 'polaire', 'desert']
    },
    
    {
        tag:'betterave',
        type:'plant',
        ground:'labor',
        costPlant:5000,
        money:10000,
        maxGrow:3,
        name:'Betterave',
        desc:'Plante fourragère',
        info:'En 2011, 5 069 362 d\'hectares de betteraves à sucre ont été cultivés dans le monde, la Russie étant la première zone de production.  ',
        climat:['europe', 'polaire', 'desert']
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


    //Climat
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


    //Engrais
    {
        tag:'chimique',
        type:'fertility',
        typeName:'Engrais',
        name:'Engrais chimique',
        desc:'Les engrais sont des substances organiques ou minérales destinées à apporter aux plantes des compléments d\'éléments nutritifs, de façon à améliorer leur croissance, et à augmenter le rendement et la qualité des cultures.',
        info:'Les engrais présentent un risque de pollution de l\'eau potable.',
        unlock:true,
        fertility:20,
        ecology:-20,
        prix:10000
    },
    {
        tag:'vert',
        type:'fertility',
        typeName:'Engrais',
        name:'Engrais vert',
        desc:'Un engrais vert est une culture destinée à être enfouie, à l\'état vert sur place, pour améliorer la structure du sol et sa fertilité. Elle peut comporter une ou plusieurs espèces de plantes.',
        info:'Les engrais vert fissurent le sol et améliorent sa perméabilité à l\'air et à l\'eau et étouffent les "mauvaises herbes"',
        unlock:false,
        fertility:10,
        ecology:20,
        prix:10000
    },
    {
        tag:'fumier',
        type:'fertility',
        typeName:'Engrais',
        name:'Fumier',
        desc:'Le fumier est un matériau semi-solide composé de différents déchets de matière organique (pailles de céréales, fougères, granulés de bois, etc).',
        info:'L\'apport du fumier tend à améliorer l\'environnement biologique, chimique et les propriétés chimiques du sol',
        unlock:false,
        fertility:15,
        ecology:5,
        prix:10000
    },
    {
        tag:'compost',
        type:'fertility',
        typeName:'Engrais',
        name:'Compost',
        desc:'Le compostage est un processus biologique de conversion et de valorisation des matières organiques en un produit naturel, stabilisé, hygiénique riche en composés humiques et minéraux appelé compost.',
        info:'Il permet aussi de se débarrasser des carcasses et déjections d\'animaux, et traite les mauvaises odeurs liées aux déjections animales et au fumier',
        unlock:false,
        fertility:15,
        ecology:5,
        prix:10000
    },
    


    //Desherbage
    {
        tag:'lutte_chimique',
        type:'health',
        typeName:'Protection des cultures',
        name:' chimique',
        desc:'Herbicides, insecticides, fongicides, acaricides',
        info:'Ca pollue fort',
        unlock:true,
        health:2,
        ecology:-30,
        prix:10000
    },
    {
        tag:'physique',
        type:'health',
        typeName:'Protection des cultures',
        name:' physique',
        desc:'Mecanique, pneumatique, chaleur',
        info:'Ca pollue bof',
        unlock:false,
        health:3,
        ecology:5,
        prix:10000
    },
    {
        tag:'drone',
        type:'health',
        typeName:'Protection des cultures',
        name:' par drone',
        desc:'Ca vole',
        info:'Ca pollue moins bof',
        unlock:false,
        health:3,
        ecology:-5,
        prix:10000
    },
    {
        tag:'drone2',
        type:'health',
        typeName:'Protection des cultures',
        name:' par drone',
        desc:'Ca roule',
        info:'Ca pollue pas',
        unlock:false,
        health:3,
        ecology:-5,
        prix:10000
    },
    {
        tag:'humain',
        type:'health',
        typeName:'Protection des cultures',
        name:' humaine',
        desc:'Désherbage, surveillance, expertise',
        info:'Ca pollue moins bof',
        unlock:false,
        health:1,
        ecology:10,
        prix:10000
    },
    {
        tag:'biologic',
        type:'health',
        typeName:'Protection des cultures',
        name:'biologique',
        desc:'Parasites, prédateurs, plantes transgéniques (OGM)',
        info:'Attention aux OGM',
        unlock:false,
        health:2,
        ecology:0,
        prix:10000
    },
    {
        tag:'biopesticid',
        type:'health',
        typeName:'Protection des cultures',
        name:'Biopesticides',
        desc:'extraits de plantes, bactéries et virus pathogènes, nématodes',
        info:'Je sais pas',
        unlock:false,
        health:3,
        ecology:5,
        prix:10000
    },
];


function getByType(type) {
    return data.filter(value => type == value.type);
}

function getByTag(tag) {
    return data.filter(value => tag == value.tag);
}