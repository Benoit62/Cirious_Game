<?php

session_start();
if(!empty($_POST) && $_POST['valider'] == 'connexion'){
    include('configbdd.php');
    require('function.php');

    $pseudo = securisation($_POST['pseudo']);
    $mdp = $_POST['mdp'];

    // Test si les variables ne sont pas vides
    if (!empty($pseudo) && !empty($mdp)){

        $verifcompte = $bdd->prepare('SELECT * FROM comptes WHERE pseudo = :pseudo');
        $verifcompte->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
        $verifcompte->execute();
        $resultCheck = $verifcompte->rowCount();
        // Cherche si le mail entré existe
        if ($resultCheck == 1){
            $data = $verifcompte->fetch();
            $verifcompte->closeCursor();
            $result = $data['mdp'];
            $hashedPasswordCheck = password_verify($mdp, $result);

            // Vérifie que le mot de passe crypté correspond au mot de passe entré
            if ($hashedPasswordCheck){
                $_SESSION = [];
                $_SESSION['autorisation'] = 'iseed';
                $_SESSION['id'] = $data['id'];
                $_SESSION['pseudo'] = $data['pseudo'];

                header('location: ../profil.php');
            } 
            else {
                $_SESSION = [];
                session_destroy();
                header('location: ../erreur.php?erreur=12');
            }
        }
        else {
            $_SESSION = [];
            session_destroy();
            header('location: ../erreur.php?erreur=11');
        }
    }
    else {
        $_SESSION = [];
        session_destroy();
        header('location: ../erreur.php?erreur=9');
    }
}else {header('Location: ../index.php');}
?>