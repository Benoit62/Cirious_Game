let data = [
    {
        tag:'bull',
        type:'destroy',
        cost:5000,
        name:'Destruction',
        desc:'Destruction du bâtiment',
    },


    //Structures
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
        tag:'methane',
        type:'struct',
        lvlMax:3,
        buildCost:100000,
        upgrade:[0,15000,30000,50000],
        money:[0,5,15,30],
        name:'Usine de méthanisation',
        desc:'Produit du méthane, grosse source d\'énergie',
        info:''
    },


    // Animaux
    {
        tag:'pig',
        type:'animal',
        lvlMax:3,
        buildCost:40000,
        upgrade:[0,20000,35000,60000],
        name:'Cochon',
        desc:'Tout est bon dans le cochon',
        info:'La population porcine mondiale est estimée à 826 millions de têtes (FAO, 1988). C\'est le porc qui, comparé aux autres espèces domestiques, qui offre la productivité la plus élevée. ',
        climat:['europe']
    },
    {
        tag:'cow',
        type:'animal',
        lvlMax:3,
        buildCost:40000,
        upgrade:[0,20000,35000,60000],
        name:'Vache',
        desc:'La vache kiri',
        info:'Permet de fournir de la viande, du lait cru, des peaux, un travail de traction, du fumier, du combustible, des sous-produits et l\'entretien des espaces ouverts',
        climat:['europe','tropic']
    },
    {
        tag:'sheep',
        type:'animal',
        lvlMax:3,
        buildCost:40000, //moins rentable que l'elevage bovin niveau rendement 
        upgrade:[0,20000,35000,60000],
        name:'Mouton',
        desc:'BEEEEHHHHH',
        info:'En plus d\'être élevé pour leurs lait,laine et viande, les moutons donnent une image positive aux paysages urbains. Ils sont un atout fort d’un point de vue touristique',
        climat:['europe']
    },
    {
        tag:'salmon',
        type:'animal',
        lvlMax:3,
        buildCost:30000,
        upgrade:[0,20000,35000,60000],
        name:'Saumon',
        desc:'Tout est bon dans le saumon',
        info:'Le réel avantage de la pisciculture est la protection des ressources halieutiques mondiales qui commencent sérieusement à se raréfier',
        climat:['polaire']
    },
    {
        tag:'renne',
        type:'animal',
        lvlMax:3,
        buildCost:30000,
        upgrade:[0,20000,35000,60000],
        name:'Renne',
        desc:'Les rennes des neiges',
        info:'aucune',
        climat:['polaire']
    },
    {
        tag:'bison',
        type:'animal',
        lvlMax:3,
        buildCost:30000,
        upgrade:[0,20000,35000,60000],
        name:'Bison',
        desc:'YAKARI',
        info:'Il en existe deux espèces : bisons d\'Europe et le bisons d\'Amerique (ayant comme sous-espèce les bisons des bois et des plaines) majoritairement élevé pour sa viande ',
        climat:['tropic','europe','polaire']
    },

    {
        tag:'chamel',
        type:'animal',
        lvlMax:3,
        buildCost:30000,
        upgrade:[0,20000,35000,60000],
        name:'Chameau',
        desc:'BLEUBLEU',
        info:'les chameaux ont une grande capacité à puiser dans leurs réserves d\'énergie lorsque les ressources alimentaires se font rare. Une aubaine face au réchauffement climatique actuel et aux périodes de sécheresse dont l\'élevage européen fait face.',
        climat:['desert']
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
        name:'Carottes',
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
        tag:'engrais',
        type:'fertility',
        typeName:'Engrais',
        name:'Engrais chimique',
        desc:'Les engrais sont des substances organiques ou minérales destinées à apporter aux plantes des compléments d\'éléments nutritifs, de façon à améliorer leur croissance, et à augmenter le rendement et la qualité des cultures.',
        info:'Les engrais présentent un risque de pollution de l\'eau potable.',
        unlock:true,
        unlockPrice:10000,
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
        unlockPrice:10000,
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
        unlockPrice:10000,
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
        unlockPrice:10000,
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
        unlockPrice:10000,
        health:2,
        ecology:-30,
        prix:10000
    },
    {
        tag:'lutte_physique',
        type:'health',
        typeName:'Protection des cultures',
        name:' physique',
        desc:'Mecanique, pneumatique, chaleur',
        info:'Ca pollue bof',
        unlock:false,
        unlockPrice:10000,
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
        unlockPrice:10000,
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
        unlockPrice:10000,
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
        unlockPrice:10000,
        health:1,
        ecology:10,
        prix:10000
    },
    {
        tag:'lutte_bio',
        type:'health',
        typeName:'Protection des cultures',
        name:'biologique',
        desc:'Parasites, prédateurs, plantes transgéniques (OGM)',
        info:'Attention aux OGM',
        unlock:false,
        unlockPrice:10000,
        health:2,
        ecology:0,
        prix:10000
    },
    {
        tag:'biopesticides',
        type:'health',
        typeName:'Protection des cultures',
        name:'Biopesticides',
        desc:'extraits de plantes, bactéries et virus pathogènes, nématodes',
        info:'Je sais pas',
        unlock:false,
        unlockPrice:10000,
        health:3,
        ecology:5,
        prix:10000
    },


    //Nourriture
    {
        tag:'fourrages',
        type:'meal',
        typeName:'Nourriture pour animaux',
        name:'Fourrages',
        desc:'Miam la bonne herbe',
        info:'Ca pollue fort',
        unlock:true,
        unlockPrice:10000,
        feed:20,
        care:10,
        prix:10000
    },
    {
        tag:'grains',
        type:'meal',
        typeName:'Nourriture pour animaux',
        name:'Grains',
        desc:'Les grains peuvent être moissonnés secs ou au stade « grain immature (ou humide) ». Au lieu de récolter maïs, sorgho ou céréales plantes entières avec une récolteuse-hacheuse qui produit un broyat que l\'on compacte pour faire de l\'ensilage, on récolte seulement le grain à la moissonneuse avant maturité complète (30-35 % d\'humidité pour le maïs) et on le broie pour le stocker à l\'abri de l\'air en silo hermétique (ensilage de grains). Le grain se conserve ainsi durant les mois nécessaires à sa consommation . On donne dans ce cas à l\'animal un supplément de foin pour assurer la digestion. Un bœuf de 300 kg aura besoin par jour de 6 kg de ce grain et de 10 kg de foin pour assurer sa ration alimentaire de croissance, avec un gain de 700 gr de poids vif par jour. Ce procédé, courant aujourd\'hui, ne nécessite qu\'une ensileuse à poste fixe, en plus du matériel de moisson. De plus, il permet de récolter le grain à un taux élevé d\'humidité, ce qui est important quand la récolte se fait par temps pluvieux. ',
        info:'Ca pollue fort',
        unlock:false,
        unlockPrice:10000,
        feed:20,
        care:5,
        prix:10000
    },
    {
        tag:'ration',
        type:'meal',
        typeName:'Nourriture pour animaux',
        name:'Aliments constitutifs de la ration',
        desc:'Miam la bonne herbe',
        info:'Ca pollue fort',
        unlock:false,
        unlockPrice:10000,
        feed:30,
        care:-10,
        prix:10000
    },
    {
        tag:'indus',
        type:'meal',
        typeName:'Nourriture pour animaux',
        name:'Aliments industriels complets ou semi-complets',
        desc:'L\'industrie peut fournir la ration complète des animaux d\'élevage, adaptée à chaque situation. C\'est généralement le cas en élevage avicole et cunicole et c\'est très fréquent en élevage porcin. Les rations semi-complètes apportent le complément à un ou plusieurs aliments de base produits ou non sur la ferme. Elles sont de plus en plus proposées pour les ruminants : rations sèches ou rations mash complétées par du foin.',
        info:'Ca pollue fort',
        unlock:false,
        unlockPrice:10000,
        feed:2,
        care:-30,
        prix:10000
    },


    //Vendre
    {
        tag:'barbare',
        type:'sell',
        typeName:'Abbatoire',
        name:'Abbattage avec peu de respect des normes',
        desc:'Ca fait souffrir les vaches',
        info:'Trop répandu aujourd\'hui',
        unlock:true,
        unlockPrice:10000,
        money:500,
        care:-10,
        hunger:20,
        prix:10000
    },
    {
        tag:'rituel',
        type:'sell',
        typeName:'Abbatoire',
        name:'Abbattage rituel sans étourdissement',
        desc:'Ca fait beaucoup souffrir les vaches',
        info:'Compliqué de l\'interdire',
        unlock:true,
        unlockPrice:10000,
        money:500,
        care:-10,
        hunger:20,
        prix:10000
    },
    {
        tag:'propre',
        type:'sell',
        typeName:'Abbatoire',
        name:'Abbattage dans le respect des normes',
        desc:'Ca fait pas souffrir (normalement)',
        info:'Devrait être plus controllé pour que ca soit le cas dans tous les abbatoires',
        unlock:false,
        unlockPrice:10000,
        money:500,
        care:0,
        hunger:20,
        prix:10000
    },
];


function getByType(type) {
    return data.filter(value => type == value.type);
}

function getByTag(tag) {
    return data.filter(value => tag == value.tag);
}