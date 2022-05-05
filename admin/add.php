<?php
//var_dump($_POST);
if(!empty($_POST) && ($_POST['valider']) == 'add'){

    include('../config/configbdd.php');
    include('../config/function.php');

    $type = securisation($_POST['type']);

    $longueur = rand(5, 8);
    $listeCar = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $chaine = '';
    $max = mb_strlen($listeCar, '8bit') - 1;

    switch($type) {
        case "unit":
            if(!empty($_POST['nom_unit'])) {
                $nom = securisation($_POST['nom_unit']);
                $abrg = securisation($_POST['abrg_unit']);$query = $bdd->prepare('INSERT INTO units (nom, abrg) VALUES (:nom, :abrg)');
                $query->bindValue(':nom', $nom, PDO::PARAM_STR);
                $query->bindValue(':abrg', $abrg, PDO::PARAM_STR);
                $exec = $query->execute();
                $bdd = NULL;
            }
            break;
        case "ingredient":
            if(!empty($_POST['nom_ingr'])) {
                $nom = ucfirst(securisation($_POST['nom_ingr']));
                $type_ingr = securisation($_POST['type_ingr']);

                $verifIngr = $bdd->prepare('SELECT id FROM ingredients WHERE nom = :nom');
                $verifIngr->bindValue(':nom', $nom, PDO::PARAM_STR);
                $verifIngr->execute();
                $existeIngr = $verifIngr->rowCount();

                if($existeIngr == 0){
                    if(isset($_FILES['photo_ingr']['name']) && $_FILES['photo_ingr']['name'] != ''){
                        $dossier = '../images/ingrs/';
                        $fichier = basename($_FILES['photo_ingr']['name']);
                        $taille_maxi = 1000000;
                        $taille = filesize($_FILES['photo_ingr']['tmp_name']);
                        $extensions = array('.png', '.gif', '.jpg', '.jpeg', '.PNG', '.GIF', '.JPG', '.JPEG');
                        $extension = strrchr($_FILES['photo_ingr']['name'], '.');
                        if(in_array($extension, $extensions)) { // Vérifie si l'extension est bonne
                            if($taille<$taille_maxi) {
                    
                                for ($k = 0; $k < $longueur; ++$k) {
                                    $chaine .= $listeCar[random_int(0, $max)];
                                }
                    
                                $tmp = str_replace(" ", "_", $nom);
                                
                                $chaine = $tmp.'_'.$chaine;
                    
                                $fichier = $chaine.$extension;
                    
                                $fichier = strtr($fichier, 'ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ', 'AAAAAACEEEEIIIIOOOOOUUUUYaaaaaaceeeeiiiioooooouuuuyy');
                                $fichier = preg_replace('/([^.a-z0-9]+)/i', '-', $fichier);
                                if (move_uploaded_file($_FILES['photo_ingr']['tmp_name'], $dossier . $fichier)) {
                                    $photo = "images/ingrs/$fichier";

                                    $query = $bdd->prepare('INSERT INTO ingredients (nom, type, photo) VALUES (:nom, :type, :photo)');
                                    $query->bindValue(':nom', $nom, PDO::PARAM_STR);
                                    $query->bindValue(':type', $type_ingr, PDO::PARAM_STR);
                                    $query->bindValue(':photo', $photo, PDO::PARAM_STR);
                                    $exec = $query->execute();
                                    $bdd = NULL;
                                }
                            }
                        }
                    }
                }
            }
            break;
        case "unstensile":
            if(!empty($_POST['nom_ust'])) {
                $nom = ucfirst(securisation($_POST['nom_ust']));

                $verifUst = $bdd->prepare('SELECT id FROM ustensiles WHERE nom = :nom');
                $verifUst->bindValue(':nom', $nom, PDO::PARAM_STR);
                $verifUst->execute();
                $existeUst = $verifUst->rowCount();

                if($existeUst == 0){
                    if(isset($_FILES['photo_ust']['name']) && $_FILES['photo_ust']['name'] != ''){
                        $dossier = '../images/usts/';
                        $fichier = basename($_FILES['photo_ust']['name']);
                        $taille_maxi = 1000000;
                        $taille = filesize($_FILES['photo_ust']['tmp_name']);
                        $extensions = array('.png', '.gif', '.jpg', '.jpeg', '.PNG', '.GIF', '.JPG', '.JPEG');
                        $extension = strrchr($_FILES['photo_ust']['name'], '.');
                        if(in_array($extension, $extensions)) { // Vérifie si l'extension est bonne
                            if($taille<$taille_maxi) {
                    
                                for ($k = 0; $k < $longueur; ++$k) {
                                    $chaine .= $listeCar[random_int(0, $max)];
                                }
                    
                                $tmp = str_replace(" ", "_", $nom);
                                
                                $chaine = $tmp.'_'.$chaine;
                    
                                $fichier = $chaine.$extension;
                    
                                $fichier = strtr($fichier, 'ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ', 'AAAAAACEEEEIIIIOOOOOUUUUYaaaaaaceeeeiiiioooooouuuuyy');
                                $fichier = preg_replace('/([^.a-z0-9]+)/i', '-', $fichier);
                                if (move_uploaded_file($_FILES['photo_ust']['tmp_name'], $dossier . $fichier)) {
                                    $photo = "images/usts/$fichier";

                                    $query = $bdd->prepare('INSERT INTO ustensiles (nom, photo) VALUES (:nom, :photo)');
                                    $query->bindValue(':nom', $nom, PDO::PARAM_STR);
                                    $query->bindValue(':photo', $photo, PDO::PARAM_STR);
                                    $exec = $query->execute();
                                    $bdd = NULL;
                                }
                            }
                        }
                    }
                }
            }
            break;
        case "type_ingr":
            if(!empty($_POST['nom_type_ingr'])) {
                $nom = securisation($_POST['nom_type_ingr']);
                $tag = securisation($_POST['tag_type_ingr']);
                $query = $bdd->prepare('INSERT INTO type_ingr (nom, tag) VALUES (:nom, :tag)');
                $query->bindValue(':nom', $nom, PDO::PARAM_STR);
                $query->bindValue(':tag', $tag, PDO::PARAM_STR);
                $exec = $query->execute();
                $bdd = NULL;
            }
            break;
        case "type_recipe":
            if(!empty($_POST['nom_type_recipe'])) {
                $nom = securisation($_POST['nom_type_recipe']);
                $tag = securisation($_POST['tag_type_recipe']);
                $query = $bdd->prepare('INSERT INTO type_recipe (nom, tag) VALUES (:nom, :tag)');
                $query->bindValue(':nom', $nom, PDO::PARAM_STR);
                $query->bindValue(':tag', $tag, PDO::PARAM_STR);
                $exec = $query->execute();
                $bdd = NULL;
            }
            break;
        default:
            break;
    }

    if($exec) {
        header("location: index.php");
    }
}
else {header('Location: index.php#erreur');}
?>