<?php

if(!empty($_POST) && ($_POST['valider']) == 'inscription'){
    include('function.php');

    $pseudo = securisation($_POST['pseudo']);
    if(!empty($_POST['mail'])) {
        $mail = securisation($_POST['mail']);
    }
    else {
        $mail = ' ';
    }
    
    $mdp = $_POST['mdp'];
    $confirm_mdp = $_POST['verif_mdp'];
    $statut = 1;
    $pdp = 'images/default_pdp.png';

    include('configbdd.php');

    //var_dump($_POST);
    //echo '<br>'.$pseudo.'<br>'.$mdp.'<br>'.$confirm_mdp.'<br>'.$pdp.'<br>';

    if(!empty($pseudo) && !empty($mdp) && !empty($confirm_mdp) && taille_chaine($pseudo, 30) && taille_chaine($mdp, 256)){

        $verifpseudo = $bdd->prepare('SELECT * FROM comptes WHERE pseudo = ?');
        $verifpseudo->execute(array($identifiant));
        $pseudoexiste = $verifpseudo->rowCount();

        if($pseudoexiste == 0) {

            if($mdp == $confirm_mdp){

                $passwordhash = password_hash($mdp, PASSWORD_DEFAULT);
                
                $query = $bdd->prepare('INSERT INTO comptes (pseudo, mdp, pdp, mail) VALUES (:pseudo, :mdp, :pdp, :mail)');
                $query->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
                $query->bindValue(':mdp', $passwordhash, PDO::PARAM_STR);
                $query->bindValue(':pdp', $pdp, PDO::PARAM_STR);
                $query->bindValue(':mail', $mail, PDO::PARAM_STR);
                $insertion = $query->execute();

        
                
                if ($insertion){
                    $verifmail = $bdd->prepare('SELECT id FROM comptes WHERE pseudo = :pseudo');
                    $verifmail->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
                    $verifmail->execute();
                    $data = $verifmail->fetch();
                    $verifmail->closeCursor();
                    
                    
                    session_start();
                    $_SESSION = [];
                    $_SESSION['autorisation'] = 'iseed';
                    $_SESSION['id'] = $data['id'];
                    $_SESSION['pseudo'] = $data['pseudo'];
                    header('Location: ../profil.php');
                }else {header('Location: ../erreur.php?erreur=7');}
            }else {header('Location: ../erreur.php?erreur=6');}
        }else {header('Location: ../erreur.php?erreur=15');}
    }else {header('Location: ../erreur.php?erreur=2');}
}else {header('Location: ../index.php');}
?>
    