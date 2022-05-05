<?php

if(!empty($_POST) && ($_POST['valider']) == 'supp'){

    include('../config/configbdd.php');
    include('../config/function.php');

    $id = securisation($_POST['id']);
    $type = securisation($_POST['type']);

    if(!empty($id)){

        switch($type) {
            case "unit":
                $supp = $bdd->prepare("DELETE FROM units WHERE id = :id");
                $supp->bindValue(':id', $id, PDO::PARAM_INT);
                $supp->execute();
                $bdd = NULL;
                $dom = "unit";
                break;
            case "ingredient":
                $verif = $bdd->prepare('SELECT * FROM ingredients WHERE id = :id');
                $verif->bindValue(':id', $id, PDO::PARAM_INT);
                $verif->execute();
                $data = $verif->fetch();
                $verif->closeCursor();

                if (unlink('../'.$data['photo'])) {
                    $supp = $bdd->prepare("DELETE FROM ingredients WHERE id = :id");
                    $supp->bindValue(':id', $id, PDO::PARAM_INT);
                    $supp->execute();
                    $bdd = NULL;
                    $dom = "ingr";
                }
                break;
            case "ustensile":
                $verif = $bdd->prepare('SELECT * FROM ustensiles WHERE id = :id');
                $verif->bindValue(':id', $id, PDO::PARAM_INT);
                $verif->execute();
                $data = $verif->fetch();
                $verif->closeCursor();

                if (unlink('../'.$data['photo'])) {
                    $supp = $bdd->prepare("DELETE FROM ustensiles WHERE id = :id");
                    $supp->bindValue(':id', $id, PDO::PARAM_INT);
                    $supp->execute();
                    $bdd = NULL;
                    $dom = "ust";
                }
                break;
            case "type_ingr":
                $supp = $bdd->prepare("DELETE FROM type_ingr WHERE id = :id");
                $supp->bindValue(':id', $id, PDO::PARAM_INT);
                $supp->execute();
                $bdd = NULL;
                $dom = "type_ingr";
                break;
            case "type_recipe":
                $supp = $bdd->prepare("DELETE FROM type_recipe WHERE id = :id");
                $supp->bindValue(':id', $id, PDO::PARAM_INT);
                $supp->execute();
                $bdd = NULL;
                $dom = "type_recipe";
                break;
            default:
                break;
        }
        
        if ($supp){
            echo "<script>$('#".$dom."_".$id."').fadeOut(400);</script>";
        }
        else {

        }
    }
}
?>