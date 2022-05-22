let data = [
    {
        tag: 'bull',
        type: 'destroy',
        cost: 5000,
        name: 'Destruction',
        desc: 'Destruction du bâtiment',
    },


    //Structures
    {
        tag: 'tank',
        type: 'struct',
        lvlMax: 3,
        buildCost: 5000,
        upgrade: [0, 3000, 10000, 20000],
        passif: [0, 5, 10, 30],
        name: 'Reservoir d\'eau',
        desc: 'Le tank permet de recuperer et stocker de l\'eau qui pourra être utilisé pour les cultures',
        info: '',
        product: 'water_product',
    },
    {
        tag: 'solaire',
        type: 'struct',
        lvlMax: 3,
        buildCost: 10000,
        upgrade: [0, 5000, 12000, 20000],
        passif: [0, 10, 20, 50],
        name: 'Panneau solaire',
        desc: 'Le panneau solaire permet de produire de l\'électricité',
        info: '',
        product: 'electricity_product'
    },
    {
        tag: 'methane',
        type: 'struct',
        lvlMax: 3,
        buildCost: 20000,
        upgrade: [0, 15000, 28000, 50000],
        passif: [0, 50, 100, 200],
        name: 'Usine de méthanisation',
        desc: 'Produit du méthane, grande source d\'énergie',
        info: '',
        product: 'methane_product'
    },


    // Animaux
    {
        tag: 'pig',
        type: 'animal',
        lvlMax: 3,
        buildCost: 15000,
        upgrade: [0, 0, 5000, 7000, 10000],
        name: 'Cochon',
        desc: 'Production de viande',
        info: 'La population porcine mondiale est estimée à 826 millions de têtes (FAO, 1988). C\'est le porc qui, comparé aux autres espèces domestiques, qui offre la productivité la plus élevée. ',
        climat: ['europe']
    },
    {
        tag: 'cow',
        type: 'animal',
        lvlMax: 3,
        buildCost: 15000,
        upgrade: [0, 0, 5000, 7000, 10000],
        name: 'Vache',
        desc: 'Production de viande, de cuir, de lait',
        info: 'Permet de fournir de la viande, du lait cru, des peaux, un travail de traction, du fumier, du combustible, des sous-produits et l\'entretien des espaces ouverts',
        climat: ['europe', 'tropic']
    },
    {
        tag: 'sheep',
        type: 'animal',
        lvlMax: 3,
        buildCost: 15000, //moins rentable que l'elevage bovin niveau rendement 
        upgrade: [0, 0, 5000, 7000, 10000],
        name: 'Mouton',
        desc: 'Production de viande et de laine',
        info: 'En plus d\'être élevé pour leur lait,laine et viande, les moutons donnent une image positive aux paysages urbains. Ils sont un atout fort d’un point de vue touristique',
        climat: ['europe']
    },
    {
        tag: 'salmon',
        type: 'animal',
        lvlMax: 3,
        buildCost: 15000,
        upgrade: [0, 0, 5000, 7000, 10000],
        name: 'Saumon',
        desc: 'Production de viande',
        info: 'Le réel avantage de la pisciculture est la protection des ressources halieutiques mondiales qui commencent sérieusement à se raréfier',
        climat: ['polaire', 'europe']
    },
    {
        tag: 'renne',
        type: 'animal',
        lvlMax: 3,
        buildCost: 20000,
        upgrade: [0, 0, 7000, 10000, 20000],
        name: 'Renne',
        desc: 'Production de viande de cuir, et de lait',
        info: 'Elevés pour leur lait et leur viande, cette espèce est adaptée aux climats froids',
        climat: ['polaire']
    },
    {
        tag: 'bison',
        type: 'animal',
        lvlMax: 3,
        buildCost: 15000,
        upgrade: [0, 0, 5000, 7000, 10000],
        name: 'Bison',
        desc: 'Production de viande de cuir, et de lait',
        info: 'Il en existe deux espèces : bisons d\'Europe et le bisons d\'Amerique (ayant comme sous-espèce les bisons des bois et des plaines) majoritairement élevé pour sa viande ',
        climat: ['tropic', 'europe', 'polaire']
    },

    {
        tag: 'chamel',
        type: 'animal',
        lvlMax: 3,
        buildCost: 20000,
        upgrade: [0, 0, 10000, 15000, 30000],
        name: 'Chameau',
        desc: 'Production de viande de cuir, et de lait',
        info: 'les chameaux ont une grande capacité à puiser dans leurs réserves d\'énergie lorsque les ressources alimentaires se font rare. Une aubaine face au réchauffement climatique actuel et aux périodes de sécheresse dont l\'élevage européen fait face.',
        climat: ['aride']
    },

    {
        tag:'poule',
        type:'animal',
        lvlMax:3,
        buildCost:10000,
        upgrade:[0, 0,10000,15000,25000],
        name:'Poule',
        desc:'Production d\'oeufs et de viande',
        info:'Près de 107 millions de tonnes de volaille sont produites chaque année dans le monde. Le Royaume-Uni reste le premier producteur européen en 2013',
        climat:['europe']
    },




    {
        tag: 'labor',
        type: 'field',
        lvlMax: 1,
        buildCost: 5000,
        upgrade: [0, 0, 0, 0],
        name: 'Champs',
        desc: '',
        info: ''
    },
    {
        tag: 'water',
        type: 'field',
        lvlMax: 1,
        buildCost: 10000,
        upgrade: [0, 0, 0, 0],
        name: 'Rizière',
        desc: 'La rizière permet de planter du riz',
        info: ''
    },
    {
        tag: 'house',
        type: 'house',
        lvlMax: 2,
        upgrade: [0, 1, 70000, 100000],
        mult: [1, 1, 10, 15],
        name: 'Maison',
        desc: 'Lieu de recherche et d\'innovation',
        info: ''
    },


    //Plantes
    {
        tag: 'ble',
        type: 'plant',
        ground: 'labor',
        costPlant: 1200,
        money: 7000,
        maxGrow: 3,
        name: 'Blé',
        desc: 'Céréales',
        info: 'Chaque année, 650 à 685 millions de tonnes de blé sont produites, 654 à 660 millions de tonnes sont consommées',
        climat: ['europe', 'polaire', 'aride']
    },

    {
        tag: 'carrot',
        type: 'plant',
        ground: 'labor',
        costPlant: 1000,
        money: 7000,
        maxGrow: 3,
        name: 'Carottes',
        desc: 'Légumes',
        info: 'La carotte est cultivée pratiquement partout sur la planète, et elle fait partie des légumes les plus consommés sur la planète . Aujourd’hui, on dénombre pas moins de 500 variétés de carottes dans le monde',
        climat: ['europe', 'polaire', 'aride']
    },

    {
        tag: 'mais',
        type: 'plant',
        ground: 'labor',
        costPlant: 1000,
        money: 7000,
        maxGrow: 3,
        name: 'Maïs',
        desc: 'Céréale',
        info: 'Annuellement, le maïs est la céréale la plus produite dans le monde avec environ 850 millions de tonnes produites sur approximativement 162 millions d’hectares, soit un rendement moyen de 5.2 t/ha. ',
        climat: ['europe', 'tropic', 'polaire', 'aride']
    },

    {
        tag: 'avoine',
        type: 'plant',
        ground: 'labor',
        costPlant: 1000,
        money: 7000,
        maxGrow: 3,
        name: 'Avoine',
        desc: 'Céréale',
        info: 'La production mondiale d\'avoine représente près de 800 kilos par seconde, soit 25 millions de tonnes par an. L\'Union européenne est le 1er production d\'avoine',
        climat: ['europe', 'tropic', 'polaire', 'aride']
    },

    {
        tag: 'pdt',
        type: 'plant',
        ground: 'labor',
        costPlant: 1000,
        money: 7000,
        maxGrow: 3,
        name: 'Pommes de Terre',
        desc: 'Tubercules/Féculent',
        info: 'En 2011, la production de pommes de terre s\'est élevée à près de 12 000 kilos chaque seconde (compteur), soit 374 millions de tonnes. La Chine est le premier producteur mondial de pommes de terre',
        climat: ['europe', 'tropic', 'aride']
    },

    {
        tag: 'riz',
        type: 'plant',
        ground: 'water',
        costPlant: 1000,
        money: 7000,
        maxGrow: 3,
        name: 'Riz',
        desc: 'Céréale',
        info: 'La production mondiale de riz en 2016 est évaluée à 471 MT (base usiné). Les principaux pays producteurs sont la Chine, et l’Inde ',
        climat: ['tropic', 'europe']
    },

    {
        tag: 'soja',
        type: 'plant',
        ground: 'labor',
        costPlant: 1000,
        money: 7000,
        maxGrow: 4,
        name: 'Soja',
        desc: 'Légumineuse',
        info: 'La production de soja a plus que doublé au cours des 20 dernières années, atteignant 336 millions de tonnes pour la campagne 2016-17 contre 30 Mt. seulement au milieu des années 60. ',
        climat: ['europe', 'tropic']
    },

    {
        tag: 'tomato',
        type: 'plant',
        ground: 'labor',
        costPlant: 1000,
        money: 7000,
        maxGrow: 4,
        name: 'Tomate',
        desc: 'Légume-fruits',
        info: 'La production de soja a plus que doublé au cours des 20 dernières années, atteignant 336 millions de tonnes pour la campagne 2016-17 contre 30 Mt. seulement au milieu des années 60. ',
        climat: ['europe', 'polaire']
    },

    {
        tag: 'chou',
        type: 'plant',
        ground: 'labor',
        costPlant: 1000,
        money: 7000,
        maxGrow: 3,
        name: 'Chou',
        desc: 'Légume',
        info: 'Environ 70 millions de tonnes de chou sont produites chaque année, sur une surface de 3,8 millions d\'hectares, dans près de 150 pays.',
        climat: ['europe', 'tropic', 'polaire']
    },

    {
        tag: 'lettuce',
        type: 'plant',
        ground: 'labor',
        costPlant: 1000,
        money: 7000,
        maxGrow: 3,
        name: 'Laitue',
        desc: 'Légume',
        info: ' La production mondiale de laitue est d\'environ 22 millions de tonnes ',
        climat: ['polaire', 'tropic', 'europe']
    },

    {
        tag: 'oignon',
        type: 'plant',
        ground: 'labor',
        costPlant: 1000,
        money: 7000,
        maxGrow: 3,
        name: 'Oignon',
        desc: 'Plante potagère',
        info: 'La production mondiale d\'oignons représente 85 millions de tonnes. Les principaux producteurs d\'oignons sont la Chine, l\'Inde et les États-Unis. ',
        climat: ['europe', 'tropic', 'polaire', 'aride']
    },

    {
        tag: 'betterave',
        type: 'plant',
        ground: 'labor',
        costPlant: 1000,
        money: 7000,
        maxGrow: 3,
        name: 'Betterave',
        desc: 'Plante fourragère',
        info: 'En 2011, 5 069 362 hectares de betteraves à sucre ont été cultivés dans le monde, la Russie étant la première zone de production.  ',
        climat: ['europe', 'polaire', 'aride']
    },
    {
        tag: 'colza',
        type: 'plant',
        ground: 'labor',
        costPlant: 1000,
        money: 7000,
        maxGrow: 4,
        name: 'Colza',
        desc: 'Céréale',
        info: 'Plante issue d’un croisement entre un chou et une navette',
        climat: ['europe']
    },


    //Climat
    {
        tag: 'europe',
        type: 'climat',
        typeName: 'Climat',
        name: 'Tempéré',
        desc: 'Une région soumise à un climat tempéré, encore appelée région tempérée ou zone tempérée, est dans le sens commun une partie de la surface terrestre où les températures ne sont pas extrêmes, c`\'est-à-dire ni torrides, ni glaciales1, correspondant aux climats océanique, méditerranéen et subtropical humide selon la classification de Köppen. Ce terme est également employé pour désigner certaines zones dans d\'autres classifications climatiques. ',
        info: ''
    },
    {
        tag: 'aride',
        type: 'climat',
        typeName: 'Climat',
        name: 'Aride',
        desc: 'Le climat aride parfois appelé climat désertique est un climat caractérisé par une sécheresse et une aridité permanente qui dure toute l\'année, un manque important d\'eau liquide au sol et dans l\'air ambiante (on parle plus précisément d\'aridité) ce qui restreint fortement le développement de la vie animale et végétale.',
        info: ''
    },
    {
        tag: 'tropic',
        type: 'climat',
        typeName: 'Climat',
        name: 'Tropicale',
        desc: 'Le climat tropical est un type de climat présent entre les tropiques, généralement jusqu\'à 14° de latitudes nord et sud. Dans le système de classification des climats défini par Köppen, un climat tropical est un climat non aride où la température moyenne mensuelle ne descend pas en dessous de 18 °C tout au long de l\'année. Toutefois, la notion de transversalité des climats arides, unis en un groupe commun, est discutable, et il est tout à fait envisageable de considérer comme valide la notion de climats arides tropicaux (tels que ceux qui concernent le sud du Sahara et de la péninsule Arabique, par exemple, ou encore une bonne partie du nord de l\'Australie, ou la côte pacifique aride du Pérou), lesquels se distinguent clairement des climats arides tempérés ou froids (désert de Gobi, et autres). ',
        info: ''
    },
    {
        tag: 'polaire',
        type: 'climat',
        typeName: 'Climat',
        name: 'Polaire',
        desc: 'Le climat polaire est un type de climat caractérisé par des températures froides toute l\'année, sans chaleur estivale et avec des hivers glaciaux. Les températures moyennes du mois le plus chaud ne sont jamais supérieures à 10 °C, ce qui correspond à la limite des arbres. Il entraîne l\'existence d\'un pergélisol et ne permet aucune agriculture. Ce climat est caractéristique des côtes nord de l\'Amérique du Nord, de l\'Europe et de l\'Asie, ainsi que du Groenland, de l\'Arctique et de l\'Antarctique. ',
        info: ''
    },


    //Engrais
    {
        tag: 'engrais',
        type: 'fertility',
        typeName: 'Engrais',
        name: 'Engrais chimique',
        desc: 'Les engrais sont des substances organiques ou minérales destinés à apporter aux plantes des compléments nutritifs, de façon à améliorer leur croissance, à augmenter le rendement, et la qualité des cultures.',
        info: 'Efficace mais pollue le sol et les eaux',
        unlock: true,
        unlockPrice: 1000,
        fertility: 15,
        ecology: -5,
        prix: 500
    },
    {
        tag: 'vert',
        type: 'fertility',
        typeName: 'Engrais',
        name: 'Engrais vert',
        desc: 'Un engrais vert est une culture destinée à être enfouie, à l\'état vert sur place, pour améliorer la structure du sol et sa fertilité. Elle peut comporter une ou plusieurs espèces de plantes.',
        info: 'Assez efficace mais demande du travail, ne pollue pas directement',
        unlock: false,
        unlockPrice: 7000,
        fertility: 10,
        ecology: 6,
        prix: 500
    },
    {
        tag: 'fumier',
        type: 'fertility',
        typeName: 'Engrais',
        name: 'Fumier',
        desc: 'Le fumier est un matériau semi-solide composé de différents déchets de matière organique (pailles de céréales, fougères, granulés de bois, etc).',
        info: 'Engrais effiace mais selon le type de fumier et sa quantité épandue peut devenir une source de pollution des sols',
        unlock: false,
        unlockPrice: 5000,
        fertility: 12,
        ecology: 3,
        prix: 500
    },
    {
        tag: 'compost',
        type: 'fertility',
        typeName: 'Engrais',
        name: 'Compost',
        desc: 'Le compostage est un processus biologique de conversion et de valorisation des matières organiques en un produit naturel, stabilisé, hygiénique riche en composés humiques et minéraux appelé compost.',
        
        info: 'Efficace mais est difficilement trouvable en quantité suffisante pour un champ',
        unlock: false,
        unlockPrice: 1000,
        fertility: 3,
        ecology: 10,
        prix: 500
    },



    //Desherbage
    {
        tag: 'lutte_chimique',
        type: 'health',
        typeName: 'Protection des cultures',
        name: 'Lutte chimique',
        desc: 'Herbicides, insecticides, fongicides, acaricides',
        info: 'Très efficace mais forte pollution des sols',
        unlock: true,
        unlockPrice: 1000,
        health: 4,
        ecology: -8,
        prix: 500
    },
    {
        tag: 'lutte_physique',
        type: 'health',
        typeName: 'Protection des cultures',
        name: 'Lutte physique',
        desc: 'Mécanique, pneumatique, chaleur',
        info: 'Efficace mais demande de la préparation et du temps, cependant faible pollution',
        unlock: false,
        unlockPrice: 2000,
        health: 3,
        ecology: -2,
        prix: 1200
    },
    {
        tag: 'humain',
        type: 'health',
        typeName: 'Protection des cultures',
        name: 'Lutte humaine',
        desc: 'Désherbage, surveillance, expertise',
        info: 'Faible efficacité mais pas polluant',
        unlock: false,
        unlockPrice:1200,
        health: 1,
        ecology: 6,
        prix: 800
    },
    {
        tag: 'drone',
        type: 'health',
        typeName: 'Protection des cultures',
        name: 'Drone aérien',
        desc: 'Drone agricole de pulvérisation',
        info: 'Efficace et précis, il permet de cibler les zones à traiter et rejette moins de pesticides qu\'un traitement classique',
        unlock: false,
        unlockPrice: 4000,
        health: 3,
        ecology: -6,
        prix: 1000
    },
    {
        tag: 'drone2',
        type: 'health',
        typeName: 'Protection des cultures',
        name: 'Drone terrestre',
        desc: 'Sarcloir autonome, en développement',
        info: 'Très efficace car il cible précisement chaque herbe non désirée et peut tourner jour et nuit',
        unlock: false,
        unlockPrice: 6000,
        health: 5,
        ecology: 5,
        prix: 1500
    },
    {
        tag: 'lutte_bio',
        type: 'health',
        typeName: 'Protection des cultures',
        name: 'biologique',
        desc: 'Parasites, prédateurs, plantes transgéniques (OGM)',
        info: 'Moyennement efficace et demande du temps, cependant attention à la biodiversité si ce n\'est pas suffisameent controlé',
        unlock: false,
        unlockPrice:9000,
        health: 2,
        ecology: 2,
        prix: 1000
    },
    {
        tag: 'biopesticides',
        type: 'health',
        typeName: 'Protection des cultures',
        name: 'Biopesticides',
        desc: 'Extraits de plantes, bactéries et virus pathogènes, nématodes',
        info: 'Efficacité moyenne',
        unlock: false,
        unlockPrice: 10000,
        health: 3,
        ecology: 2,
        prix: 1200
    },


    //Nourriture animaux
    {
        tag: 'indus',
        type: 'meal',
        typeName: 'Nourriture pour animaux',
        name: 'Aliments industriels',
        desc: 'L\'industrie peut fournir la ration complète des animaux d\'élevage, adaptée à chaque situation. C\'est généralement le cas en élevage avicole et cunicole et c\'est très fréquent en élevage porcin. Les rations semi-complètes apportent le complément à un ou plusieurs aliments de base produits ou non sur la ferme.',
        info: 'Baisse moyenne du bonheur animal',
        unlock: true,
        unlockPrice: 10000,
        feed: 10,
        care: -4,
        prix: 500
    },
    {
        tag: 'ration',
        type: 'meal',
        typeName: 'Nourriture pour animaux',
        name: 'Ration',
        desc: 'La ration alimentaire représente la quantité d\'aliments à ingérer chaque jour pour couvrir la totalité des dépenses et assurer l\'équilibre nutritif de l\'individu',
        info: 'Faible baisse du bonheur animal',
        unlock: false,
        unlockPrice: 2000,
        feed: 30,
        care: -2,
        prix: 800
    },
    {
        tag: 'grains',
        type: 'meal',
        typeName: 'Nourriture pour animaux',
        name: 'Grains',
        desc: 'Les graines de céréales (riz, blé, avoine, orge, maïs...) fournissent dans presque tous les pays du monde la base énergétique de l\'alimentation.',
        info: 'Augmentation très faible du bonheur animal',
        unlock: false,
        unlockPrice: 3000,
        feed: 18,
        care: 4,
        prix: 1000
    },
    {
        tag: 'fourrages',
        type: 'meal',
        typeName: 'Nourriture pour animaux',
        name: 'Fourrages',
        desc: 'Plante ou mélange de plantes, utilisé pour l\'alimentation des animaux d\'élevage.',
        info: 'Alimentation nutritive et naturelle',
        unlock: false,
        unlockPrice: 2000,
        feed: 15,
        care: 6,
        prix: 1500
    },


    //Vendre
    {
        tag: 'barbare',
        type: 'sell',
        typeName: 'Abbatoire',
        name: 'Abattage non respectueux',
        desc: 'Abattoirs malheureusement trop répandus, qui privilégient la rentabilité au bien-être, parfois dénoncés grâce à certaines associations de défense animale',
        info: 'Très cruel pour les animaux',
        unlock: true,
        unlockPrice: 1000,
        money: 500,
        care: -10,
        hunger: 17
    },
    {
        tag: 'rituel',
        type: 'sell',
        typeName: 'Abbatoire',
        name: 'Abattage rituel',
        desc: 'Consiste dans la plus part des cas à égorger l\'animal alors qu\'il est encore conscient',
        info: 'Extrême cruauté',
        unlock: true,
        unlockPrice: 1000,
        money: 500,
        care: -25,
        hunger: 17
    },
    {
        tag: 'propre',
        type: 'sell',
        typeName: 'Abbatoire',
        name: 'Abattage dans le respect des normes',
        desc: 'L\'animal n\'est pas stressé à son arrivée et est correctement étourdi avant la saignée.',
        info: 'Même si cela semble cruel, c\'est le mieux pour l\'animal dans le cas où on veut l\'abattre',
        unlock: false,
        unlockPrice: 5000,
        money: 300,
        care: 0,
        hunger: 13
    },


    // Amélioration  structures
    
    {
        tag:'pompe',
        type:'water_product',
        typeName:'Gestion de l\'eau',
        name:'Eau de rivière',
        desc:'',
        info:'',
        unlock:true,
        unlockPrice:3000,
        need:'',
        passif:10
    },
    {
        tag:'forage',
        type:'water_product',
        typeName:'Gestion de l\'eau',
        name:'Forage',
        desc:'',
        info:'',
        unlock:false,
        unlockPrice:7000,
        need:'',
        passif:20
    },
    {
        tag:'rain',
        type:'water_product',
        typeName:'Gestion de l\'eau',
        name:'Eau de pluie',
        desc:'',
        info:'',
        unlock:false,
        unlockPrice:10000,
        need:'',
        passif:30
    },
    {
        tag:'irrig',
        type:'water_product',
        typeName:'Gestion de l\'eau',
        name:'Irrigation des champs',
        desc:'Utilise l\'eau de pluie et se fait de nuit pour ne pas gâcher l\'eau',
        info:'',
        unlock:false,
        unlockPrice:15000,
        need:'rain',
        passif:60
    },
    {
        tag:'light',
        type:'electricity_product',
        typeName:'Gestion de l\'eléctricité',
        name:'Eclairage de la ferme',
        desc:'',
        info:'',
        unlock:false,
        unlockPrice:1000,
        need:'',
        passif:12
    },
    {
        tag:'hybrid',
        type:'electricity_product',
        typeName:'Gestion de l\'eléctricité',
        name:'Tracteur hybride',
        desc:'',
        info:'',
        unlock:false,
        unlockPrice:3000,
        need:'light',
        passif:50
    },
    {
        tag:'h2',
        type:'methane_product',
        typeName:'Gestion du méthane',
        name:'Fabrication de dihydrogène',
        desc:'',
        info:'',
        unlock:false,
        unlockPrice:5000,
        need:'',
        passif:30
    },
    {
        tag:'h2tractor',
        type:'methane_product',
        typeName:'Gestion du méthane',
        name:'Tracteur à hydrogène',
        desc:'',
        info:'',
        unlock:false,
        unlockPrice:10000,
        need:'h2',
        passif:200
    },
];


function getByType(type) {
    return data.filter(value => type == value.type);
}

function getByTag(tag) {
    return data.filter(value => tag == value.tag);
}