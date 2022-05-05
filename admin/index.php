<?php 

// Mot de passe : josetterelinkindus

require_once('../config/configbdd.php');

$query = $bdd->prepare("SELECT * FROM ingredients ORDER BY nom ASC");
$query->execute();
$ingrs = $query->fetchAll();
$query->closeCursor();

$query = $bdd->prepare("SELECT * FROM ustensiles ORDER BY nom ASC");
$query->execute();
$ustensiles = $query->fetchAll();
$query->closeCursor();


$query = $bdd->prepare("SELECT * FROM units ORDER BY nom ASC");
$query->execute();
$units = $query->fetchAll();
$query->closeCursor();

$query = $bdd->prepare("SELECT * FROM type_ingr ORDER BY nom ASC");
$query->execute();
$type_ingrs = $query->fetchAll();
$query->closeCursor();

$query = $bdd->prepare("SELECT * FROM type_recipe ORDER BY nom ASC");
$query->execute();
$type_recipes = $query->fetchAll();
$query->closeCursor();

$query2 = $bdd->prepare("SELECT * FROM type_ingr WHERE tag = :tag");

include('../config/function.php');

$bdd=NULL;

?>
<!DOCTYPE html>
<html lang="fr" dir="ltr">
    <head>
        <meta charset="utf-8">
        <meta name="description" content="Ce site vous permet de cuisiner de nombreuses recettes faciles selon les ingrédients que vous avez chez vous.">
        <title>0'FOUR - Admin</title>
        <link rel="shortcut icon" href="../images/icon2.jpg" type="image/x-icon">
        <link rel="icon" href="../images/icon2.jpg" type="image/x-icon">
        <link rel="stylesheet" href="../style.css">
        <script src="https://kit.fontawesome.com/bde92a3b82.js" crossorigin="anonymous"></script>
        <link href="https://fonts.googleapis.com/css?family=Muli&display=swap" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    </head>

    <body id="body">

        <h2 style="text-indent: 2em;">Ajouts</h2>
        <section style="padding: 0 2em; display: flex; flex-wrap: wrap; justify-content: space-around;">
            <div style="width: 30%; background-color: whitesmoke; padding: 1em 0; width: fit-content; padding: 0.5em 2em; list-style-type: none; margin-bottom: 3%;">
                <h3 style="margin-top: 0; text-align: center;">Ajout ingrédients</h3>
                <form method="POST" action="add.php" style="" enctype="multipart/form-data">
                    <div style="display: flex; flex-direction: column; margin-bottom: 10px;">
                        <label for="nom_ingr">Nom</label>
                        <input id="nom_ingr" type="text" name="nom_ingr" required>
                    </div>
                    <div style="display: flex; flex-direction: column; margin-bottom: 10px;">
                        <label for="type_ingr">Type</label>
                        <select id="type_ingr" type="text" name="type_ingr" required>
                            <option value="">--Please choose an option--</option>
                            <?php foreach($type_ingrs as $type_ingr): ?>
                                <option value="<?=$type_ingr['tag']?>"><?=$type_ingr['nom']?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column; margin-bottom: 10px;">
                        <label for="photo_ingr">Photo</label>
                        <input id="photo_ingr" type="file" accept=".jpg, .jpeg, .png, .gif" name="photo_ingr" required>
                    </div>
                    <input type="hidden" name="type" value="ingredient">
                    <button type="submit" value="add" name="valider">Envoyer</button>
                </form>
            </div>
            <div style="width: 30%; background-color: whitesmoke; padding: 1em 0; width: fit-content; padding: 0.5em 2em; list-style-type: none; margin-bottom: 3%;">
                <h3 style="margin-top: 0; text-align: center;">Ajout unités</h3>
                <form method="POST" action="add.php" style="">
                    <div style="display: flex; flex-direction: column; margin-bottom: 10px;">
                        <label for="nom_unit">Nom</label>
                        <input id="nom_unit" type="text" name="nom_unit" required>
                    </div>
                    <div style="display: flex; flex-direction: column; margin-bottom: 10px;">
                        <label for="abrg_unit">Abrégé</label>
                        <input id="abrg_unit" type="text" name="abrg_unit" required>
                    </div>
                    <input type="hidden" name="type" value="unit">
                    <button type="submit" value="add" name="valider">Envoyer</button>
                </form>
            </div>
            <div style="width: 30%; background-color: whitesmoke; padding: 1em 0; width: fit-content; padding: 0.5em 2em; list-style-type: none; margin-bottom: 3%;">
                <h3 style="margin-top: 0; text-align: center;">Ajout ustensiles</h3>
                <form method="POST" action="add.php" style="" enctype="multipart/form-data">
                    <div style="display: flex; flex-direction: column; margin-bottom: 10px;">
                        <label for="nom_ust">Nom</label>
                        <input id="nom_ust" type="text" name="nom_ust" required>
                    </div>
                    <div style="display: flex; flex-direction: column; margin-bottom: 10px;">
                        <label for="photo_ust">Photo</label>
                        <input id="photo_ust" type="file" accept=".jpg, .jpeg, .png, .gif" name="photo_ust" required>
                    </div>
                    <input type="hidden" name="type" value="unstensile">
                    <button type="submit" value="add" name="valider">Envoyer</button>
                </form>
            </div>

            <div style="width: 30%; background-color: whitesmoke; padding: 1em 0; width: fit-content; padding: 0.5em 2em; list-style-type: none; margin-bottom: 3%;">
                <h3 style="margin-top: 0; text-align: center;">Ajout types d'ingrédients</h3>
                <form method="POST" action="add.php" style="">
                    <div style="display: flex; flex-direction: column; margin-bottom: 10px;">
                        <label for="nom_type_ingr">Nom</label>
                        <input id="nom_type_ingr" type="text" name="nom_type_ingr" required>
                    </div>
                    <div style="display: flex; flex-direction: column; margin-bottom: 10px;">
                        <label for="tag_type_ingr">Tag</label>
                        <input id="tag_type_ingr" type="text" name="tag_type_ingr" required>
                    </div>
                    <input type="hidden" name="type" value="type_ingr">
                    <button type="submit" value="add" name="valider">Envoyer</button>
                </form>
            </div>

            <div style="width: 30%; background-color: whitesmoke; padding: 1em 0; width: fit-content; padding: 0.5em 2em; list-style-type: none; margin-bottom: 3%;">
                <h3 style="margin-top: 0; text-align: center;">Ajout types de recettes</h3>
                <form method="POST" action="add.php" style="">
                    <div style="display: flex; flex-direction: column; margin-bottom: 10px;">
                        <label for="nom_type_recipe">Nom</label>
                        <input id="nom_type_recipe" type="text" name="nom_type_recipe" required>
                    </div>
                    <div style="display: flex; flex-direction: column; margin-bottom: 10px;">
                        <label for="tag_type_recipe">Tag</label>
                        <input id="tag_type_recipe" type="text" name="tag_type_recipe" required>
                    </div>
                    <input type="hidden" name="type" value="type_recipe">
                    <button type="submit" value="add" name="valider">Envoyer</button>
                </form>
            </div>
        </section>

        <h2 style="text-indent: 2em;">Ingredients</h2>
        <?php if(!empty($ingrs)) { ?>
            <section class="all_comptes" style="display: flex; flex-wrap: wrap; justify-content: space-between; padding: 0 2em;">
                <?php
                    foreach($ingrs as $ingr):
                        $query2->bindValue(':tag', $ingr['type'], PDO::PARAM_STR);
                        $query2->execute();
                        $type_ingr_ingr = $query2->fetch();
                        $query2->closeCursor();
                ?>
                    <li id="ingr_<?=$ingr['id']?>" style="background-color: whitesmoke; padding: 1em 0; width: fit-content; min-width: 9%; padding: 0.5em 2em; list-style-type: none; margin-bottom: 3%">
                        <ul style="padding: 0;">
                            <li><p>Nom : <?=$ingr['nom']?></p></li>
                            <li><p>Type : <?=$type_ingr_ingr['nom']?></p></li>
                        </ul>
                        <button data-id="<?=$ingr['id']?>" data-type="ingredient" class="button_supp" style="background-color: rgb(228, 60, 60); border: none; margin: 0 auto; display: block; padding: 0.5em 1em; cursor: pointer;">Supprimer</button>
                    </li>
                <?php endforeach; ?>
            </section>
        <?php } else { ?>
            <p style="text-indent: 2em; font-size: 120%;">Aucun ingrédient</p>
        <?php } ?>
        


        <h2 style="text-indent: 2em;">Unités</h2>
        <?php if(!empty($units)) { ?>
        <section class="" style="padding: 0 2em;">
            <ul style="display: flex; flex-wrap: wrap; justify-content: space-between; padding: 0;">
                <?php foreach($units as $unit): ?>
                    <li id="unit_<?=$unit['id']?>" style="background-color: whitesmoke; padding: 1em 0; width: fit-content; min-width: 9%; padding: 0.5em 2em; list-style-type: none; margin-bottom: 3%">
                        <ul style="padding: 0;">
                            <li><p>Nom : <?=$unit['nom']?></p></li>
                            <li><p>Abrégé : <?=$unit['abrg']?></p></li>
                        </ul>
                        <button data-id="<?=$unit['id']?>" data-type="unit" class="button_supp" style="background-color: rgb(228, 60, 60); border: none; margin: 0 auto; display: block; padding: 0.5em 1em; cursor: pointer;">Supprimer</button>
                    </li>
                <?php endforeach; ?>
            </ul>
        </section>
        <?php } else { ?>
            <p style="text-indent: 2em; font-size: 120%;">Aucune unité</p>
        <?php } ?>


        <h2 style="text-indent: 2em;">Ustensiles</h2>
        <?php if(!empty($ustensiles)) { ?>
        <section class="" style="padding: 0 2em;">
            <ul style="display: flex; flex-wrap: wrap; justify-content: space-between; padding: 0;">
                <?php foreach($ustensiles as $ustensile): ?>
                    <li id="ust_<?=$ustensile['id']?>" style="background-color: whitesmoke; padding: 1em 0; width: fit-content; min-width: 9%; padding: 0.5em 2em; list-style-type: none; margin-bottom: 3%">
                        <ul style="padding: 0;">
                            <li><p>Nom : <?=$ustensile['nom']?></p></li>
                        </ul>
                        <button data-id="<?=$ustensile['id']?>" data-type="ustensile" class="button_supp" style="background-color: rgb(228, 60, 60); border: none; margin: 0 auto; display: block; padding: 0.5em 1em; cursor: pointer;">Supprimer</button>
                    </li>
                <?php endforeach; ?>
            </ul>
        </section>
        <?php } else { ?>
            <p style="text-indent: 2em; font-size: 120%;">Aucun ustensile</p>
        <?php } ?>


        <h2 style="text-indent: 2em;">Types d'ingrédients</h2>
        <?php if(!empty($type_ingrs)) { ?>
        <section class="" style="padding: 0 2em;">
            <ul style="display: flex; flex-wrap: wrap; justify-content: space-between; padding: 0;">
                <?php foreach($type_ingrs as $type_ingr): ?>
                    <li id="type_ingr_<?=$type_ingr['id']?>" style="background-color: whitesmoke; padding: 1em 0; width: fit-content; min-width: 9%; padding: 0.5em 2em; list-style-type: none; margin-bottom: 3%">
                        <ul style="padding: 0;">
                            <li><p>Nom : <?=$type_ingr['nom']?></p></li>
                            <li><p>Tag : <?=$type_ingr['tag']?></p></li>
                        </ul>
                        <button data-id="<?=$type_ingr['id']?>" data-type="type_ingr" class="button_supp" style="background-color: rgb(228, 60, 60); border: none; margin: 0 auto; display: block; padding: 0.5em 1em; cursor: pointer;">Supprimer</button>
                    </li>
                <?php endforeach; ?>
            </ul>
        </section>
        <?php } else { ?>
            <p style="text-indent: 2em; font-size: 120%;">Aucune unité</p>
        <?php } ?>


        <h2 style="text-indent: 2em;">Types de recettes</h2>
        <?php if(!empty($type_recipes)) { ?>
        <section class="" style="padding: 0 2em;">
            <ul style="display: flex; flex-wrap: wrap; justify-content: space-between; padding: 0;">
                <?php foreach($type_recipes as $type_recipe): ?>
                    <li id="type_recipe_<?=$type_recipe['id']?>" style="background-color: whitesmoke; padding: 1em 0; width: fit-content; min-width: 9%; padding: 0.5em 2em; list-style-type: none; margin-bottom: 3%">
                        <ul style="padding: 0;">
                            <li><p>Nom : <?=$type_recipe['nom']?></p></li>
                            <li><p>Tag : <?=$type_recipe['tag']?></p></li>
                        </ul>
                        <button data-id="<?=$type_recipe['id']?>" data-type="type_recipe" class="button_supp" style="background-color: rgb(228, 60, 60); border: none; margin: 0 auto; display: block; padding: 0.5em 1em; cursor: pointer;">Supprimer</button>
                    </li>
                <?php endforeach; ?>
            </ul>
        </section>
        <?php } else { ?>
            <p style="text-indent: 2em; font-size: 120%;">Aucune unité</p>
        <?php } ?>

        

        <script>
            // Suppression Message
            var x = document.getElementsByClassName("button_supp");
            for(let i of x) {
                i.addEventListener('click', sendSupp, false);
            }

            function sendSupp(evt) {

                let id = evt.target.dataset.id;
                let type = evt.target.dataset.type;
                let valider = 'supp';

                $.ajax({
                    type: 'POST',
                    url: 'supp.php',
                    data: {
                        valider:valider,
                        type:type,
                        id:id
                    },
                    success: function (response) {
                        $('#body').append(response);
                    }
                });
                
            return false;
            }


            //Message en vu
            var z = document.getElementsByClassName("button_vu");
            for(let i of z) {
                i.addEventListener('click', sendVu, false);
            }

            function sendVu(evt) {

                let id = evt.target.value;
                let valider = 'supp';

                $.ajax({
                    type: 'POST',
                    url: 'lu.php',
                    data: {
                        valider:valider,
                        id:id
                    },
                    success: function (response) {
                        evt.target.parentElement.parentElement.style.backgroundColor = "rgb(226, 240, 228)";
                        evt.target.style.display = "none";
                    }
                });
                
            return false;
            }




            // Afficher plus message
            let y = document.getElementsByClassName("afficheplus");
            for(let i of y) {
                i.addEventListener('click', afficherPlus, false);
            }

            function afficherPlus(evt) {
                console.log(evt);
                let elem = evt.target.previousElementSibling;
                elem.style.height = "auto";
                evt.target.innerHTML = "Réduire";
                evt.target.removeEventListener("click", afficherPlus, false);
                evt.target.addEventListener("click", afficherMoins, false);
            }

            function afficherMoins(evt) {
                console.log(evt);
                let elem = evt.target.previousElementSibling;
                elem.style.height = "5em";
                evt.target.innerHTML = "Afficher plus";
                evt.target.removeEventListener("click", afficherMoins, false);
                evt.target.addEventListener("click", afficherPlus, false);
            }
        </script>
    </body> 
</html>